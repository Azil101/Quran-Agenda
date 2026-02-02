/**
 * QURAN AGENDA - SVG ILLUSTRATIONS LIBRARY
 * Beautiful, scalable illustrations for empty states, achievements, and decorations
 */

import React from 'react';
import { cn } from '../../lib/utils';

interface IllustrationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
  xl: 'w-48 h-48',
};

/* ==========================================================================
   EMPTY STATE ILLUSTRATIONS
   ========================================================================== */

/**
 * Empty Progress Illustration
 * Shows a friendly book with sparkles - "No progress yet"
 */
export const EmptyProgressIllustration: React.FC<IllustrationProps> = ({
  className,
  size = 'lg',
}) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Book Base */}
    <path
      d="M40 45C40 40.5817 43.5817 37 48 37H100V163H48C43.5817 163 40 159.418 40 155V45Z"
      fill="url(#bookGradientLeft)"
    />
    <path
      d="M100 37H152C156.418 37 160 40.5817 160 45V155C160 159.418 156.418 163 152 163H100V37Z"
      fill="url(#bookGradientRight)"
    />
    {/* Book Spine */}
    <rect x="97" y="37" width="6" height="126" fill="#047857" />
    {/* Book Pages Lines */}
    <path d="M55 60H90" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
    <path d="M55 75H85" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
    <path d="M55 90H88" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
    <path d="M110 60H145" stroke="#6EE7B7" strokeWidth="2" strokeLinecap="round" />
    <path d="M110 75H140" stroke="#6EE7B7" strokeWidth="2" strokeLinecap="round" />
    <path d="M110 90H143" stroke="#6EE7B7" strokeWidth="2" strokeLinecap="round" />
    {/* Sparkles */}
    <path
      d="M165 30L168 38L176 41L168 44L165 52L162 44L154 41L162 38L165 30Z"
      fill="#FCD34D"
      className="animate-pulse"
    />
    <path
      d="M35 70L37 75L42 77L37 79L35 84L33 79L28 77L33 75L35 70Z"
      fill="#FCD34D"
      className="animate-pulse"
      style={{ animationDelay: '0.3s' }}
    />
    <path
      d="M170 130L172 135L177 137L172 139L170 144L168 139L163 137L168 135L170 130Z"
      fill="#10B981"
      className="animate-pulse"
      style={{ animationDelay: '0.6s' }}
    />
    {/* Decorative Crescents */}
    <path
      d="M50 130C50 130 45 140 50 150C40 145 40 135 50 130Z"
      fill="#34D399"
      opacity="0.5"
    />
    <defs>
      <linearGradient id="bookGradientLeft" x1="40" y1="37" x2="100" y2="163" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="bookGradientRight" x1="100" y1="37" x2="160" y2="163" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="1" stopColor="#10B981" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Empty Lessons Illustration
 * Shows a clipboard with a checkmark outline
 */
export const EmptyLessonsIllustration: React.FC<IllustrationProps> = ({
  className,
  size = 'lg',
}) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Clipboard */}
    <rect x="45" y="35" width="110" height="140" rx="8" fill="url(#clipboardGradient)" />
    <rect x="70" y="25" width="60" height="20" rx="4" fill="#047857" />
    <circle cx="100" cy="35" r="6" fill="#34D399" />
    {/* Checkbox Lines */}
    <rect x="60" y="65" width="20" height="20" rx="4" stroke="#A7F3D0" strokeWidth="2" fill="none" />
    <path d="M90 70H130" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
    <path d="M90 80H120" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
    <rect x="60" y="100" width="20" height="20" rx="4" stroke="#A7F3D0" strokeWidth="2" fill="none" />
    <path d="M90 105H130" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
    <path d="M90 115H115" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
    <rect x="60" y="135" width="20" height="20" rx="4" stroke="#A7F3D0" strokeWidth="2" fill="none" />
    <path d="M90 140H125" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
    <path d="M90 150H118" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
    {/* Floating Elements */}
    <circle cx="165" cy="55" r="8" fill="#FCD34D" opacity="0.6" className="animate-float" />
    <circle cx="35" cy="90" r="5" fill="#10B981" opacity="0.6" className="animate-float" style={{ animationDelay: '0.5s' }} />
    <defs>
      <linearGradient id="clipboardGradient" x1="45" y1="35" x2="155" y2="175" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ECFDF5" />
        <stop offset="1" stopColor="#D1FAE5" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * No Students Illustration
 * Shows silhouettes with a plus sign
 */
export const EmptyStudentsIllustration: React.FC<IllustrationProps> = ({
  className,
  size = 'lg',
}) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Person 1 */}
    <circle cx="70" cy="70" r="25" fill="url(#personGradient1)" />
    <path
      d="M30 160C30 130 50 110 70 110C90 110 110 130 110 160"
      stroke="url(#personGradient1)"
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
    />
    {/* Person 2 */}
    <circle cx="130" cy="70" r="25" fill="url(#personGradient2)" opacity="0.5" />
    <path
      d="M90 160C90 130 110 110 130 110C150 110 170 130 170 160"
      stroke="url(#personGradient2)"
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
      opacity="0.5"
    />
    {/* Plus Sign */}
    <circle cx="160" cy="45" r="20" fill="#FCD34D" />
    <path d="M160 35V55" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <path d="M150 45H170" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <defs>
      <linearGradient id="personGradient1" x1="45" y1="45" x2="95" y2="95" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="personGradient2" x1="105" y1="45" x2="155" y2="95" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="1" stopColor="#10B981" />
      </linearGradient>
    </defs>
  </svg>
);

/* ==========================================================================
   ACHIEVEMENT BADGES
   ========================================================================== */

/**
 * Star Badge - For achievements
 */
export const StarBadge: React.FC<IllustrationProps & { variant?: 'gold' | 'silver' | 'bronze' }> = ({
  className,
  size = 'md',
  variant = 'gold',
}) => {
  const colors = {
    gold: { primary: '#FCD34D', secondary: '#F59E0B', tertiary: '#D97706' },
    silver: { primary: '#E2E8F0', secondary: '#94A3B8', tertiary: '#64748B' },
    bronze: { primary: '#FED7AA', secondary: '#EA580C', tertiary: '#9A3412' },
  };
  const c = colors[variant];

  return (
    <svg
      className={cn(sizeMap[size], className)}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="45" fill={`url(#badgeGradient-${variant})`} />
      <circle cx="50" cy="50" r="38" fill={c.secondary} />
      <path
        d="M50 20L58.5 37.3L77.6 40L63.8 53.4L67 72.4L50 63.5L33 72.4L36.2 53.4L22.4 40L41.5 37.3L50 20Z"
        fill={c.primary}
      />
      <defs>
        <linearGradient id={`badgeGradient-${variant}`} x1="5" y1="5" x2="95" y2="95" gradientUnits="userSpaceOnUse">
          <stop stopColor={c.primary} />
          <stop offset="1" stopColor={c.tertiary} />
        </linearGradient>
      </defs>
    </svg>
  );
};

/**
 * Quran Complete Badge - For completing Juz
 */
export const QuranCompleteBadge: React.FC<IllustrationProps> = ({
  className,
  size = 'md',
}) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Outer Ring */}
    <circle cx="50" cy="50" r="45" fill="url(#quranBadgeOuter)" />
    <circle cx="50" cy="50" r="40" fill="url(#quranBadgeInner)" />
    {/* Book Icon */}
    <path
      d="M30 35C30 33 32 31 34 31H50V69H34C32 69 30 67 30 65V35Z"
      fill="#ECFDF5"
    />
    <path
      d="M50 31H66C68 31 70 33 70 35V65C70 67 68 69 66 69H50V31Z"
      fill="#D1FAE5"
    />
    <rect x="48" y="31" width="4" height="38" fill="#047857" />
    {/* Check Mark */}
    <circle cx="70" cy="30" r="15" fill="#FCD34D" />
    <path
      d="M62 30L68 36L78 24"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="quranBadgeOuter" x1="5" y1="5" x2="95" y2="95" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="quranBadgeInner" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#059669" />
        <stop offset="1" stopColor="#10B981" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Streak Badge - For consistent practice
 */
export const StreakBadge: React.FC<IllustrationProps & { days?: number }> = ({
  className,
  size = 'md',
  days = 7,
}) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Flame Background */}
    <circle cx="50" cy="50" r="45" fill="url(#streakBg)" />
    {/* Flame */}
    <path
      d="M50 15C50 15 65 35 65 50C65 65 58 75 50 75C42 75 35 65 35 50C35 35 50 15 50 15Z"
      fill="url(#flameGradient)"
    />
    <path
      d="M50 35C50 35 58 45 58 55C58 62 54 68 50 68C46 68 42 62 42 55C42 45 50 35 50 35Z"
      fill="#FCD34D"
    />
    <path
      d="M50 48C50 48 54 52 54 58C54 62 52 65 50 65C48 65 46 62 46 58C46 52 50 48 50 48Z"
      fill="#FEFCE8"
    />
    {/* Number */}
    <text
      x="50"
      y="92"
      textAnchor="middle"
      fill="white"
      fontSize="14"
      fontWeight="bold"
    >
      {days} days
    </text>
    <defs>
      <linearGradient id="streakBg" x1="5" y1="5" x2="95" y2="95" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F97316" />
        <stop offset="1" stopColor="#DC2626" />
      </linearGradient>
      <linearGradient id="flameGradient" x1="35" y1="15" x2="65" y2="75" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FCD34D" />
        <stop offset="0.5" stopColor="#F97316" />
        <stop offset="1" stopColor="#DC2626" />
      </linearGradient>
    </defs>
  </svg>
);

/* ==========================================================================
   DASHBOARD ICONS
   ========================================================================== */

/**
 * Progress Icon
 */
export const ProgressIcon: React.FC<IllustrationProps> = ({ className, size = 'sm' }) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" opacity="0.2" />
    <path
      d="M24 4C35 4 44 13 44 24"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <circle cx="24" cy="24" r="8" fill="currentColor" />
  </svg>
);

/**
 * Quran Icon
 */
export const QuranIcon: React.FC<IllustrationProps> = ({ className, size = 'sm' }) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M8 10C8 8 10 6 12 6H24V42H12C10 42 8 40 8 38V10Z"
      fill="currentColor"
    />
    <path
      d="M24 6H36C38 6 40 8 40 10V38C40 40 38 42 36 42H24V6Z"
      fill="currentColor"
      opacity="0.7"
    />
    <rect x="22" y="6" width="4" height="36" fill="currentColor" />
    <path d="M13 14H20" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <path d="M13 20H18" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <path d="M28 14H35" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
    <path d="M28 20H33" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
  </svg>
);

/**
 * Calendar Icon
 */
export const CalendarIcon: React.FC<IllustrationProps> = ({ className, size = 'sm' }) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect x="6" y="10" width="36" height="32" rx="4" fill="currentColor" opacity="0.2" />
    <rect x="6" y="10" width="36" height="10" rx="4" fill="currentColor" />
    <rect x="14" y="4" width="4" height="10" rx="2" fill="currentColor" />
    <rect x="30" y="4" width="4" height="10" rx="2" fill="currentColor" />
    <circle cx="16" cy="28" r="3" fill="currentColor" />
    <circle cx="24" cy="28" r="3" fill="currentColor" />
    <circle cx="32" cy="28" r="3" fill="currentColor" opacity="0.5" />
    <circle cx="16" cy="36" r="3" fill="currentColor" opacity="0.5" />
    <circle cx="24" cy="36" r="3" fill="currentColor" opacity="0.5" />
  </svg>
);

/**
 * Students Icon
 */
export const StudentsIcon: React.FC<IllustrationProps> = ({ className, size = 'sm' }) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="24" cy="14" r="8" fill="currentColor" />
    <path
      d="M10 42C10 32 16 26 24 26C32 26 38 32 38 42"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="38" cy="18" r="5" fill="currentColor" opacity="0.5" />
    <path
      d="M34 42C34 35 37 31 42 31"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
      opacity="0.5"
    />
    <circle cx="10" cy="18" r="5" fill="currentColor" opacity="0.5" />
    <path
      d="M14 42C14 35 11 31 6 31"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
      opacity="0.5"
    />
  </svg>
);

/* ==========================================================================
   LOADING ILLUSTRATIONS
   ========================================================================== */

/**
 * Loading Quran Animation
 */
export const LoadingQuran: React.FC<IllustrationProps> = ({ className, size = 'md' }) => (
  <svg
    className={cn(sizeMap[size], 'animate-pulse', className)}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M20 25C20 22 23 19 26 19H50V81H26C23 81 20 78 20 75V25Z"
      fill="url(#loadingBookLeft)"
    />
    <path
      d="M50 19H74C77 19 80 22 80 25V75C80 78 77 81 74 81H50V19Z"
      fill="url(#loadingBookRight)"
    />
    <rect x="47" y="19" width="6" height="62" fill="#047857" />
    {/* Animated Lines */}
    <path d="M28 35H45" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" className="animate-pulse" />
    <path d="M28 45H42" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" className="animate-pulse" style={{ animationDelay: '0.1s' }} />
    <path d="M28 55H44" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
    <path d="M55 35H72" stroke="#6EE7B7" strokeWidth="2" strokeLinecap="round" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
    <path d="M55 45H68" stroke="#6EE7B7" strokeWidth="2" strokeLinecap="round" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
    <path d="M55 55H70" stroke="#6EE7B7" strokeWidth="2" strokeLinecap="round" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
    <defs>
      <linearGradient id="loadingBookLeft" x1="20" y1="19" x2="50" y2="81" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="loadingBookRight" x1="50" y1="19" x2="80" y2="81" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="1" stopColor="#10B981" />
      </linearGradient>
    </defs>
  </svg>
);

/* ==========================================================================
   ERROR ILLUSTRATIONS
   ========================================================================== */

/**
 * Error Illustration
 */
export const ErrorIllustration: React.FC<IllustrationProps> = ({ className, size = 'lg' }) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Cloud */}
    <ellipse cx="100" cy="90" rx="60" ry="40" fill="#FEE2E2" />
    <ellipse cx="70" cy="100" rx="30" ry="25" fill="#FEE2E2" />
    <ellipse cx="130" cy="100" rx="30" ry="25" fill="#FEE2E2" />
    {/* Face */}
    <circle cx="80" cy="80" r="5" fill="#EF4444" />
    <circle cx="120" cy="80" r="5" fill="#EF4444" />
    <path
      d="M85 105C85 105 92 95 100 95C108 95 115 105 115 105"
      stroke="#EF4444"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Lightning */}
    <path
      d="M90 130L100 150L95 150L105 175L85 145H95L85 130H90Z"
      fill="#FCD34D"
    />
    {/* X marks */}
    <path d="M35 50L45 60M45 50L35 60" stroke="#FCA5A5" strokeWidth="3" strokeLinecap="round" />
    <path d="M155 50L165 60M165 50L155 60" stroke="#FCA5A5" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/**
 * Not Found (404) Illustration
 */
export const NotFoundIllustration: React.FC<IllustrationProps> = ({ className, size = 'xl' }) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 300 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* 4 */}
    <text x="30" y="130" fontSize="80" fontWeight="bold" fill="url(#notFoundGradient)">4</text>
    {/* Magnifying Glass as 0 */}
    <circle cx="150" cy="95" r="35" stroke="url(#notFoundGradient)" strokeWidth="8" fill="none" />
    <line x1="175" y1="120" x2="200" y2="145" stroke="url(#notFoundGradient)" strokeWidth="8" strokeLinecap="round" />
    <text x="138" y="105" fontSize="30" fill="#10B981">?</text>
    {/* 4 */}
    <text x="210" y="130" fontSize="80" fontWeight="bold" fill="url(#notFoundGradient)">4</text>
    {/* Decorative Stars */}
    <path d="M50 30L53 38L61 40L53 43L50 51L47 43L39 40L47 38L50 30Z" fill="#FCD34D" />
    <path d="M250 40L252 46L258 48L252 50L250 56L248 50L242 48L248 46L250 40Z" fill="#10B981" />
    <path d="M130 170L133 178L141 180L133 183L130 191L127 183L119 180L127 178L130 170Z" fill="#34D399" />
    <defs>
      <linearGradient id="notFoundGradient" x1="30" y1="50" x2="270" y2="150" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
    </defs>
  </svg>
);

/* ==========================================================================
   CELEBRATION ILLUSTRATIONS
   ========================================================================== */

/**
 * Celebration/Confetti Illustration
 */
export const CelebrationIllustration: React.FC<IllustrationProps> = ({ className, size = 'lg' }) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Trophy */}
    <path
      d="M70 60H130V100C130 120 115 135 100 135C85 135 70 120 70 100V60Z"
      fill="url(#trophyGradient)"
    />
    <rect x="60" y="50" width="80" height="15" rx="4" fill="#FCD34D" />
    <rect x="90" y="135" width="20" height="20" fill="#D97706" />
    <rect x="75" y="155" width="50" height="10" rx="2" fill="#F59E0B" />
    {/* Handles */}
    <path
      d="M70 70C50 70 45 85 50 100C55 110 65 105 70 95"
      stroke="#FCD34D"
      strokeWidth="6"
      fill="none"
    />
    <path
      d="M130 70C150 70 155 85 150 100C145 110 135 105 130 95"
      stroke="#FCD34D"
      strokeWidth="6"
      fill="none"
    />
    {/* Star on trophy */}
    <path
      d="M100 75L105 85L116 87L108 95L110 106L100 101L90 106L92 95L84 87L95 85L100 75Z"
      fill="#FEFCE8"
    />
    {/* Confetti */}
    <rect x="30" y="30" width="8" height="8" rx="1" fill="#10B981" transform="rotate(15 30 30)" className="animate-float" />
    <rect x="160" y="40" width="10" height="10" rx="1" fill="#FCD34D" transform="rotate(-20 160 40)" className="animate-float" style={{ animationDelay: '0.2s' }} />
    <rect x="45" y="140" width="6" height="6" rx="1" fill="#F97316" transform="rotate(30 45 140)" className="animate-float" style={{ animationDelay: '0.4s' }} />
    <rect x="150" y="130" width="8" height="8" rx="1" fill="#3B82F6" transform="rotate(-10 150 130)" className="animate-float" style={{ animationDelay: '0.6s' }} />
    <circle cx="40" cy="80" r="5" fill="#EC4899" className="animate-float" style={{ animationDelay: '0.3s' }} />
    <circle cx="165" cy="90" r="4" fill="#10B981" className="animate-float" style={{ animationDelay: '0.5s' }} />
    {/* Sparkles */}
    <path d="M25 55L28 62L35 64L28 67L25 74L22 67L15 64L22 62L25 55Z" fill="#FCD34D" />
    <path d="M175 60L177 65L182 67L177 69L175 74L173 69L168 67L173 65L175 60Z" fill="#10B981" />
    <defs>
      <linearGradient id="trophyGradient" x1="70" y1="60" x2="130" y2="135" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FCD34D" />
        <stop offset="1" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
  </svg>
);

/* ==========================================================================
   DECORATIVE ELEMENTS
   ========================================================================== */

/**
 * Islamic Star Pattern
 */
export const IslamicStarPattern: React.FC<IllustrationProps> = ({ className, size = 'sm' }) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M30 0L36.18 23.82L60 30L36.18 36.18L30 60L23.82 36.18L0 30L23.82 23.82L30 0Z"
      fill="currentColor"
      opacity="0.1"
    />
    <path
      d="M30 10L34 23L47 27L34 31L30 44L26 31L13 27L26 23L30 10Z"
      fill="currentColor"
      opacity="0.2"
    />
  </svg>
);

/**
 * Crescent Moon
 */
export const CrescentMoon: React.FC<IllustrationProps> = ({ className, size = 'sm' }) => (
  <svg
    className={cn(sizeMap[size], className)}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M24 4C13 4 4 13 4 24C4 35 13 44 24 44C29 44 33.5 42 37 39C32 42 26 41 21 36C16 31 15 23 20 17C25 11 33 11 38 16C35 9 30 4 24 4Z"
      fill="currentColor"
    />
  </svg>
);

// Export all illustrations
export const Illustrations = {
  EmptyProgress: EmptyProgressIllustration,
  EmptyLessons: EmptyLessonsIllustration,
  EmptyStudents: EmptyStudentsIllustration,
  StarBadge,
  QuranCompleteBadge,
  StreakBadge,
  ProgressIcon,
  QuranIcon,
  CalendarIcon,
  StudentsIcon,
  LoadingQuran,
  Error: ErrorIllustration,
  NotFound: NotFoundIllustration,
  Celebration: CelebrationIllustration,
  IslamicStar: IslamicStarPattern,
  CrescentMoon,
};

export default Illustrations;
