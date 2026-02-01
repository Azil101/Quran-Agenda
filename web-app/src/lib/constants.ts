/**
 * Application-wide constants
 * Centralizes magic numbers and configuration values
 */

/**
 * Quran API Configuration
 */
export const QURAN_API = {
  /** Default translation resource ID - Dr. Mustafa Khattab (The Clear Quran) */
  DEFAULT_TRANSLATION_ID: 131,

  /** Maximum number of verses in a single surah (Al-Baqarah) */
  MAX_VERSES_PER_SURAH: 286,

  /** Default verses per page for pagination */
  DEFAULT_VERSES_PER_PAGE: 50,

  /** Total number of surahs in the Quran */
  TOTAL_SURAHS: 114,

  /** Total number of juz in the Quran */
  TOTAL_JUZ: 30,

  /** Total pages in the Mushaf */
  TOTAL_MUSHAF_PAGES: 604,
} as const;

/**
 * Reciters Configuration
 */
export const RECITERS = {
  /** Default reciter slug */
  DEFAULT: 'ar.alafasy',

  /** Popular reciters list */
  POPULAR: [
    { id: 7, name: 'Mishary Rashid Alafasy', arabicName: 'مشاري العفاسي', slug: 'ar.alafasy' },
    { id: 2, name: "Abdulbasit 'Abdus-Samad", arabicName: 'عبد الباسط عبد الصمد', slug: 'ar.abdulbasitmurattal' },
    { id: 3, name: 'Abdur-Rahman as-Sudais', arabicName: 'عبد الرحمن السديس', slug: 'ar.abdurrahmaansudais' },
    { id: 5, name: 'Saad al-Ghamidi', arabicName: 'سعد الغامدي', slug: 'ar.saadalghamidi' },
    { id: 9, name: 'Mahmoud Khalil Al-Husary', arabicName: 'محمود خليل الحصري', slug: 'ar.husary' },
  ] as const,
} as const;

/**
 * Grading System Constants
 */
export const GRADES = {
  /** Numeric to letter grade thresholds */
  THRESHOLDS: {
    A: 4.5,
    B: 3.5,
    C: 2.5,
  },

  /** Letter to numeric conversion */
  LETTER_TO_STARS: {
    A: 5,
    B: 4,
    C: 3,
    INC: 1,
  } as const,

  /** Maximum stars/points */
  MAX_STARS: 5,
} as const;

/**
 * Date and Time Constants
 */
export const TIME = {
  /** Milliseconds in a day */
  MS_PER_DAY: 1000 * 60 * 60 * 24,

  /** Minutes in an hour */
  MINUTES_PER_HOUR: 60,
} as const;

/**
 * Validation Constants
 */
export const VALIDATION = {
  /** Minimum password length */
  MIN_PASSWORD_LENGTH: 6,

  /** Email regex pattern */
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

/**
 * UI Constants
 */
export const UI = {
  /** Debounce delay for search inputs (ms) */
  SEARCH_DEBOUNCE_MS: 300,

  /** Default animation duration (ms) */
  ANIMATION_DURATION_MS: 200,

  /** Spinner size variants */
  SPINNER_SIZES: {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  } as const,
} as const;

/**
 * Surahs that don't have Bismillah at the beginning
 */
export const SURAHS_WITHOUT_BISMILLAH: readonly number[] = [9];

/**
 * Surah that has Bismillah in the first verse
 */
export const SURAH_WITH_BISMILLAH_AS_VERSE = 1;
