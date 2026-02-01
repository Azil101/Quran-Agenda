/**
 * Centralized logging utility
 * Replaces direct console statements with structured logging
 * Can be easily extended to send logs to external services in production
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private isDevelopment = import.meta.env.MODE === 'development';

  /**
   * Log informational messages
   */
  info(message: string, context?: Record<string, unknown>): void {
    this.log('info', message, context);
  }

  /**
   * Log warning messages
   */
  warn(message: string, context?: Record<string, unknown>): void {
    this.log('warn', message, context);
  }

  /**
   * Log error messages
   */
  error(message: string, error?: Error | unknown, context?: Record<string, unknown>): void {
    const errorContext = error instanceof Error
      ? { ...context, error: error.message, stack: error.stack }
      : { ...context, error };

    this.log('error', message, errorContext);
  }

  /**
   * Log debug messages (only in development)
   */
  debug(message: string, context?: Record<string, unknown>): void {
    if (this.isDevelopment) {
      this.log('debug', message, context);
    }
  }

  /**
   * Internal logging method
   */
  private log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
    // In development, log to console
    if (this.isDevelopment) {
      const style = this.getLogStyle(level);
      console[level === 'debug' ? 'log' : level](
        `%c[${level.toUpperCase()}] ${message}`,
        style,
        context || ''
      );
    }

    // In production, you could send logs to an external service
    // Example:
    // const entry: LogEntry = { level, message, timestamp: new Date(), context };
    // this.sendToLoggingService(entry);
  }

  /**
   * Get console style for log level
   */
  private getLogStyle(level: LogLevel): string {
    const styles: Record<LogLevel, string> = {
      info: 'color: #2196F3',
      warn: 'color: #FF9800',
      error: 'color: #F44336; font-weight: bold',
      debug: 'color: #9E9E9E',
    };
    return styles[level];
  }
}

export const logger = new Logger();
