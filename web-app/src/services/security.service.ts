/**
 * Quran Agenda - Security Service
 * ================================
 *
 * Provides security utilities for the application:
 * - Input sanitization (XSS prevention)
 * - Rate limiting
 * - CSRF protection
 * - Secure session handling
 * - Content Security Policy helpers
 * - Input validation
 */

import { logger } from '../lib/logger';

// ============================================
// TYPES
// ============================================

interface RateLimitEntry {
  count: number;
  firstRequest: number;
  blocked: boolean;
}

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  blockDurationMs: number;
}

interface SanitizeOptions {
  allowedTags?: string[];
  allowedAttributes?: string[];
  maxLength?: number;
}

// ============================================
// INPUT SANITIZATION
// ============================================

export class Sanitizer {
  // HTML entities to escape
  private static readonly HTML_ENTITIES: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  };

  // Dangerous patterns that should be removed
  private static readonly DANGEROUS_PATTERNS: RegExp[] = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // onclick=, onload=, etc.
    /data:/gi, // data: URIs
    /vbscript:/gi,
    /expression\s*\(/gi, // CSS expression()
    /url\s*\(/gi, // CSS url()
  ];

  /**
   * Escape HTML entities to prevent XSS
   */
  static escapeHtml(input: string): string {
    if (!input || typeof input !== 'string') {
      return '';
    }

    return input.replace(/[&<>"'`=/]/g, (char) => this.HTML_ENTITIES[char] || char);
  }

  /**
   * Remove dangerous content from HTML
   */
  static stripDangerous(input: string): string {
    if (!input || typeof input !== 'string') {
      return '';
    }

    let result = input;

    // Remove dangerous patterns
    for (const pattern of this.DANGEROUS_PATTERNS) {
      result = result.replace(pattern, '');
    }

    return result;
  }

  /**
   * Sanitize user input for display
   * This is the primary sanitization method for user-generated content
   */
  static sanitize(input: string, options: SanitizeOptions = {}): string {
    if (!input || typeof input !== 'string') {
      return '';
    }

    const { maxLength = 10000 } = options;

    // Trim and limit length
    let result = input.trim().slice(0, maxLength);

    // Strip dangerous content
    result = this.stripDangerous(result);

    // Escape remaining HTML entities
    result = this.escapeHtml(result);

    return result;
  }

  /**
   * Sanitize a plain text field (no HTML allowed)
   */
  static sanitizeText(input: string, maxLength = 1000): string {
    if (!input || typeof input !== 'string') {
      return '';
    }

    // Remove all HTML tags
    const stripped = input.replace(/<[^>]*>/g, '');

    // Escape any remaining special chars and limit length
    return this.escapeHtml(stripped.trim().slice(0, maxLength));
  }

  /**
   * Sanitize email address
   */
  static sanitizeEmail(email: string): string {
    if (!email || typeof email !== 'string') {
      return '';
    }

    // Lowercase, trim, and remove any HTML
    const cleaned = email.toLowerCase().trim().replace(/<[^>]*>/g, '');

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleaned) || cleaned.length > 254) {
      return '';
    }

    return cleaned;
  }

  /**
   * Sanitize display name
   */
  static sanitizeName(name: string): string {
    if (!name || typeof name !== 'string') {
      return '';
    }

    // Allow only alphanumeric, spaces, and common name characters
    // This supports Arabic names as well
    const cleaned = name
      .trim()
      .slice(0, 100)
      .replace(/<[^>]*>/g, '') // Remove HTML
      .replace(/[^\p{L}\p{N}\s\-'.]/gu, ''); // Unicode letters, numbers, spaces, hyphens, apostrophes, periods

    return this.escapeHtml(cleaned);
  }

  /**
   * Sanitize URL
   */
  static sanitizeUrl(url: string): string {
    if (!url || typeof url !== 'string') {
      return '';
    }

    const trimmed = url.trim();

    // Only allow http, https, or relative URLs
    if (
      !trimmed.startsWith('http://') &&
      !trimmed.startsWith('https://') &&
      !trimmed.startsWith('/') &&
      !trimmed.startsWith('#')
    ) {
      return '';
    }

    // Block dangerous protocols
    if (/^(javascript|data|vbscript):/i.test(trimmed)) {
      return '';
    }

    try {
      // Validate it's a proper URL
      if (trimmed.startsWith('http')) {
        new URL(trimmed);
      }
      return trimmed;
    } catch {
      return '';
    }
  }

  /**
   * Sanitize number input
   */
  static sanitizeNumber(input: unknown, min = 0, max = Number.MAX_SAFE_INTEGER): number {
    const num = Number(input);

    if (isNaN(num) || !isFinite(num)) {
      return min;
    }

    return Math.max(min, Math.min(max, Math.round(num)));
  }

  /**
   * Sanitize array of strings
   */
  static sanitizeArray(arr: unknown[], maxItems = 100, maxItemLength = 1000): string[] {
    if (!Array.isArray(arr)) {
      return [];
    }

    return arr
      .slice(0, maxItems)
      .filter((item) => typeof item === 'string')
      .map((item) => this.sanitizeText(item as string, maxItemLength));
  }
}

// ============================================
// RATE LIMITING
// ============================================

export class RateLimiter {
  private static instances: Map<string, RateLimiter> = new Map();
  private limits: Map<string, RateLimitEntry> = new Map();
  private config: RateLimitConfig;

  private constructor(config: RateLimitConfig) {
    this.config = config;

    // Clean up old entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  /**
   * Get or create a rate limiter instance
   */
  static getInstance(
    name: string,
    config: RateLimitConfig = {
      maxRequests: 100,
      windowMs: 60000, // 1 minute
      blockDurationMs: 300000, // 5 minutes
    }
  ): RateLimiter {
    if (!this.instances.has(name)) {
      this.instances.set(name, new RateLimiter(config));
    }
    return this.instances.get(name)!;
  }

  /**
   * Check if a request should be allowed
   * @param key - Unique identifier (user ID, IP, etc.)
   * @returns true if request is allowed, false if rate limited
   */
  check(key: string): boolean {
    const now = Date.now();
    const entry = this.limits.get(key);

    if (!entry) {
      // First request
      this.limits.set(key, {
        count: 1,
        firstRequest: now,
        blocked: false,
      });
      return true;
    }

    // Check if blocked
    if (entry.blocked) {
      if (now - entry.firstRequest < this.config.blockDurationMs) {
        return false;
      }
      // Block expired, reset
      this.limits.set(key, {
        count: 1,
        firstRequest: now,
        blocked: false,
      });
      return true;
    }

    // Check if window expired
    if (now - entry.firstRequest > this.config.windowMs) {
      // Reset window
      this.limits.set(key, {
        count: 1,
        firstRequest: now,
        blocked: false,
      });
      return true;
    }

    // Increment count
    entry.count++;

    if (entry.count > this.config.maxRequests) {
      // Rate limit exceeded
      entry.blocked = true;
      entry.firstRequest = now; // Start block timer
      logger.warn('Rate limit exceeded', { key, count: entry.count });
      return false;
    }

    return true;
  }

  /**
   * Get remaining requests for a key
   */
  getRemaining(key: string): number {
    const entry = this.limits.get(key);
    if (!entry) {
      return this.config.maxRequests;
    }
    if (entry.blocked) {
      return 0;
    }
    return Math.max(0, this.config.maxRequests - entry.count);
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    const maxAge = Math.max(this.config.windowMs, this.config.blockDurationMs);

    for (const [key, entry] of this.limits) {
      if (now - entry.firstRequest > maxAge) {
        this.limits.delete(key);
      }
    }
  }

  /**
   * Reset a specific key (for testing or manual unblock)
   */
  reset(key: string): void {
    this.limits.delete(key);
  }
}

// ============================================
// RATE LIMIT CONFIGURATIONS
// ============================================

export const RateLimitConfigs = {
  // Authentication attempts
  AUTH: {
    maxRequests: 5,
    windowMs: 60000, // 1 minute
    blockDurationMs: 900000, // 15 minutes
  },

  // API calls
  API: {
    maxRequests: 100,
    windowMs: 60000, // 1 minute
    blockDurationMs: 60000, // 1 minute
  },

  // File uploads
  UPLOAD: {
    maxRequests: 10,
    windowMs: 60000, // 1 minute
    blockDurationMs: 300000, // 5 minutes
  },

  // Search queries
  SEARCH: {
    maxRequests: 30,
    windowMs: 60000, // 1 minute
    blockDurationMs: 60000, // 1 minute
  },
};

// ============================================
// CSRF PROTECTION
// ============================================

export class CSRFProtection {
  private static TOKEN_KEY = 'csrf_token';
  private static TOKEN_LENGTH = 32;

  /**
   * Generate a cryptographically secure CSRF token
   */
  static generateToken(): string {
    const array = new Uint8Array(this.TOKEN_LENGTH);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Get or create CSRF token for current session
   */
  static getToken(): string {
    let token = sessionStorage.getItem(this.TOKEN_KEY);

    if (!token) {
      token = this.generateToken();
      sessionStorage.setItem(this.TOKEN_KEY, token);
    }

    return token;
  }

  /**
   * Validate a CSRF token
   */
  static validateToken(token: string): boolean {
    const storedToken = sessionStorage.getItem(this.TOKEN_KEY);
    if (!storedToken || !token) {
      return false;
    }

    // Constant-time comparison to prevent timing attacks
    if (storedToken.length !== token.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < storedToken.length; i++) {
      result |= storedToken.charCodeAt(i) ^ token.charCodeAt(i);
    }

    return result === 0;
  }

  /**
   * Refresh the CSRF token
   */
  static refreshToken(): string {
    const token = this.generateToken();
    sessionStorage.setItem(this.TOKEN_KEY, token);
    return token;
  }
}

// ============================================
// SESSION SECURITY
// ============================================

export class SessionSecurity {
  private static SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
  private static LAST_ACTIVITY_KEY = 'last_activity';
  private static SESSION_ID_KEY = 'session_id';

  /**
   * Initialize session security
   */
  static initialize(): void {
    this.updateActivity();
    this.ensureSessionId();

    // Check session validity periodically
    setInterval(() => this.checkSession(), 60000);
  }

  /**
   * Update last activity timestamp
   */
  static updateActivity(): void {
    sessionStorage.setItem(this.LAST_ACTIVITY_KEY, Date.now().toString());
  }

  /**
   * Check if session is still valid
   */
  static isSessionValid(): boolean {
    const lastActivity = sessionStorage.getItem(this.LAST_ACTIVITY_KEY);

    if (!lastActivity) {
      return false;
    }

    const elapsed = Date.now() - parseInt(lastActivity, 10);
    return elapsed < this.SESSION_TIMEOUT_MS;
  }

  /**
   * Get session ID
   */
  static getSessionId(): string {
    return sessionStorage.getItem(this.SESSION_ID_KEY) || '';
  }

  /**
   * Ensure session has an ID
   */
  private static ensureSessionId(): void {
    if (!sessionStorage.getItem(this.SESSION_ID_KEY)) {
      const id = CSRFProtection.generateToken();
      sessionStorage.setItem(this.SESSION_ID_KEY, id);
    }
  }

  /**
   * Check session and trigger timeout if needed
   */
  private static checkSession(): void {
    if (!this.isSessionValid()) {
      this.onSessionTimeout();
    }
  }

  /**
   * Handle session timeout
   */
  private static onSessionTimeout(): void {
    logger.info('Session timed out due to inactivity');
    // Dispatch custom event for app to handle
    window.dispatchEvent(new CustomEvent('sessionTimeout'));
  }

  /**
   * Clear session data
   */
  static clearSession(): void {
    sessionStorage.removeItem(this.LAST_ACTIVITY_KEY);
    sessionStorage.removeItem(this.SESSION_ID_KEY);
    sessionStorage.removeItem(CSRFProtection['TOKEN_KEY']);
  }
}

// ============================================
// INPUT VALIDATION
// ============================================

export class Validator {
  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    if (!email || typeof email !== 'string') {
      return false;
    }

    // RFC 5322 compliant email regex (simplified)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  /**
   * Validate password strength
   */
  static isStrongPassword(password: string): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!password || password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (password.length > 128) {
      errors.push('Password must be less than 128 characters');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Validate display name
   */
  static isValidDisplayName(name: string): boolean {
    if (!name || typeof name !== 'string') {
      return false;
    }

    const trimmed = name.trim();
    return trimmed.length >= 2 && trimmed.length <= 100;
  }

  /**
   * Validate user role
   */
  static isValidRole(role: string): role is 'student' | 'teacher' | 'parent' {
    return ['student', 'teacher', 'parent'].includes(role);
  }

  /**
   * Validate Surah number
   */
  static isValidSurah(surah: number): boolean {
    return Number.isInteger(surah) && surah >= 1 && surah <= 114;
  }

  /**
   * Validate Ayah number (requires surah context for max)
   */
  static isValidAyah(ayah: number, maxAyahs = 286): boolean {
    return Number.isInteger(ayah) && ayah >= 1 && ayah <= maxAyahs;
  }

  /**
   * Validate Juz number
   */
  static isValidJuz(juz: number): boolean {
    return Number.isInteger(juz) && juz >= 1 && juz <= 30;
  }

  /**
   * Validate date is not in the future
   */
  static isNotFutureDate(date: Date): boolean {
    return date <= new Date();
  }

  /**
   * Validate file type
   */
  static isAllowedFileType(
    file: File,
    allowedTypes: string[]
  ): boolean {
    return allowedTypes.some((type) => {
      if (type.endsWith('/*')) {
        // Wildcard match (e.g., 'image/*')
        const category = type.slice(0, -2);
        return file.type.startsWith(category);
      }
      return file.type === type;
    });
  }

  /**
   * Validate file size
   */
  static isAllowedFileSize(file: File, maxSizeBytes: number): boolean {
    return file.size <= maxSizeBytes;
  }
}

// ============================================
// CONTENT SECURITY HELPERS
// ============================================

export class ContentSecurity {
  /**
   * Generate a nonce for inline scripts
   */
  static generateNonce(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array));
  }

  /**
   * Check if a URL is from a trusted domain
   */
  static isTrustedDomain(url: string, trustedDomains: string[]): boolean {
    try {
      const parsedUrl = new URL(url);
      return trustedDomains.some(
        (domain) =>
          parsedUrl.hostname === domain ||
          parsedUrl.hostname.endsWith(`.${domain}`)
      );
    } catch {
      return false;
    }
  }

  /**
   * Trusted domains for the application
   */
  static readonly TRUSTED_DOMAINS = [
    'quranagenda-b3f9a.firebaseapp.com',
    'quranagenda-b3f9a.web.app',
    'firebasestorage.googleapis.com',
    'api.quran.com',
    'cdn.islamic.network',
  ];
}

// ============================================
// SECURITY SERVICE (MAIN EXPORT)
// ============================================

export class SecurityService {
  private static authRateLimiter = RateLimiter.getInstance('auth', RateLimitConfigs.AUTH);
  private static apiRateLimiter = RateLimiter.getInstance('api', RateLimitConfigs.API);
  private static uploadRateLimiter = RateLimiter.getInstance('upload', RateLimitConfigs.UPLOAD);

  /**
   * Initialize security features
   */
  static initialize(): void {
    SessionSecurity.initialize();
    CSRFProtection.getToken(); // Ensure token exists
    logger.info('Security service initialized');
  }

  /**
   * Check if auth attempt is allowed (rate limiting)
   */
  static checkAuthAttempt(identifier: string): boolean {
    return this.authRateLimiter.check(identifier);
  }

  /**
   * Check if API call is allowed (rate limiting)
   */
  static checkApiCall(userId: string): boolean {
    return this.apiRateLimiter.check(userId);
  }

  /**
   * Check if upload is allowed (rate limiting)
   */
  static checkUpload(userId: string): boolean {
    return this.uploadRateLimiter.check(userId);
  }

  /**
   * Sanitize user input
   */
  static sanitize = Sanitizer.sanitize.bind(Sanitizer);
  static sanitizeText = Sanitizer.sanitizeText.bind(Sanitizer);
  static sanitizeEmail = Sanitizer.sanitizeEmail.bind(Sanitizer);
  static sanitizeName = Sanitizer.sanitizeName.bind(Sanitizer);
  static sanitizeUrl = Sanitizer.sanitizeUrl.bind(Sanitizer);
  static sanitizeNumber = Sanitizer.sanitizeNumber.bind(Sanitizer);

  /**
   * Validate input
   */
  static validate = Validator;

  /**
   * CSRF token management
   */
  static getCSRFToken = CSRFProtection.getToken.bind(CSRFProtection);
  static validateCSRFToken = CSRFProtection.validateToken.bind(CSRFProtection);

  /**
   * Session management
   */
  static updateActivity = SessionSecurity.updateActivity.bind(SessionSecurity);
  static isSessionValid = SessionSecurity.isSessionValid.bind(SessionSecurity);
  static clearSession = SessionSecurity.clearSession.bind(SessionSecurity);

  /**
   * Content security
   */
  static isTrustedDomain = ContentSecurity.isTrustedDomain.bind(ContentSecurity);
  static TRUSTED_DOMAINS = ContentSecurity.TRUSTED_DOMAINS;
}

// Export default instance
export default SecurityService;
