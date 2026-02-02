/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* ==========================================================================
         COLORS - Islamic-inspired palette
         ========================================================================== */
      colors: {
        // Semantic colors (CSS variable based for theme switching)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Primary - Islamic Green
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "rgb(var(--color-primary-50, 240 253 244) / <alpha-value>)",
          100: "rgb(var(--color-primary-100, 209 250 229) / <alpha-value>)",
          200: "rgb(var(--color-primary-200, 167 243 208) / <alpha-value>)",
          300: "rgb(var(--color-primary-300, 110 231 183) / <alpha-value>)",
          400: "rgb(var(--color-primary-400, 52 211 153) / <alpha-value>)",
          500: "rgb(var(--color-primary-500, 16 185 129) / <alpha-value>)",
          600: "rgb(var(--color-primary-600, 5 150 105) / <alpha-value>)",
          700: "rgb(var(--color-primary-700, 4 120 87) / <alpha-value>)",
          800: "rgb(var(--color-primary-800, 6 95 70) / <alpha-value>)",
          900: "rgb(var(--color-primary-900, 6 78 59) / <alpha-value>)",
          950: "rgb(var(--color-primary-950, 2 44 34) / <alpha-value>)",
        },

        // Secondary - Teal
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "rgb(var(--color-secondary-50, 240 253 250) / <alpha-value>)",
          100: "rgb(var(--color-secondary-100, 204 251 241) / <alpha-value>)",
          200: "rgb(var(--color-secondary-200, 153 246 228) / <alpha-value>)",
          300: "rgb(var(--color-secondary-300, 94 234 212) / <alpha-value>)",
          400: "rgb(var(--color-secondary-400, 45 212 191) / <alpha-value>)",
          500: "rgb(var(--color-secondary-500, 20 184 166) / <alpha-value>)",
          600: "rgb(var(--color-secondary-600, 13 148 136) / <alpha-value>)",
          700: "rgb(var(--color-secondary-700, 15 118 110) / <alpha-value>)",
          800: "rgb(var(--color-secondary-800, 17 94 89) / <alpha-value>)",
          900: "rgb(var(--color-secondary-900, 19 78 74) / <alpha-value>)",
          950: "rgb(var(--color-secondary-950, 4 47 46) / <alpha-value>)",
        },

        // Gold - Achievements
        gold: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
          950: "#451A03",
        },

        // Sapphire - Info/Trust
        sapphire: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
          950: "#172554",
        },

        // Success
        success: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
          950: "#052E16",
        },

        // Warning
        warning: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
          950: "#451A03",
        },

        // Error/Destructive
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
          950: "#450A0A",
        },

        // Neutral
        neutral: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
          950: "#020617",
        },

        // Muted
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        // Accent
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        // Popover
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        // Card
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      /* ==========================================================================
         TYPOGRAPHY
         ========================================================================== */
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        arabic: ['Amiri', 'Scheherazade New', 'Traditional Arabic', 'serif'],
        quran: ['KFGQPC Uthmanic Script HAFS', 'Amiri Quran', 'Amiri', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'monospace'],
      },

      fontSize: {
        // Arabic-specific sizes
        'arabic-sm': ['clamp(1.125rem, 1rem + 0.625vw, 1.375rem)', { lineHeight: '2.5' }],
        'arabic-base': ['clamp(1.5rem, 1.25rem + 1.25vw, 1.875rem)', { lineHeight: '2.5' }],
        'arabic-lg': ['clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)', { lineHeight: '2.5' }],
        'arabic-xl': ['clamp(2.25rem, 1.75rem + 2.5vw, 3.25rem)', { lineHeight: '2.5' }],
        'arabic-2xl': ['clamp(2.75rem, 2rem + 3.75vw, 4rem)', { lineHeight: '2.5' }],
      },

      /* ==========================================================================
         BORDER RADIUS
         ========================================================================== */
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      /* ==========================================================================
         SHADOWS
         ========================================================================== */
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 2px 6px -2px rgba(0, 0, 0, 0.05)',
        'glow-primary': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-gold': '0 0 20px rgba(245, 158, 11, 0.3)',
        'glow-sapphire': '0 0 20px rgba(59, 130, 246, 0.3)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 40px -15px rgba(0, 0, 0, 0.15)',
        'button': '0 1px 2px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
        'button-hover': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
      },

      /* ==========================================================================
         ANIMATIONS & KEYFRAMES
         ========================================================================== */
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.4s ease-out',
        'fade-in-down': 'fadeInDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'bounce-soft': 'bounceSoft 0.5s ease-in-out',
        'pulse-soft': 'pulseSoft 2s infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'celebration': 'celebration 0.6s ease-out',
        'progress-fill': 'progressFill 1s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        celebration: {
          '0%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.2)' },
          '50%': { transform: 'scale(1.1)' },
          '75%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-value)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(16, 185, 129, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' },
        },
      },

      /* ==========================================================================
         SPACING
         ========================================================================== */
      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
      },

      /* ==========================================================================
         TRANSITIONS
         ========================================================================== */
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },

      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },

      /* ==========================================================================
         BACKGROUNDS
         ========================================================================== */
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(180deg, rgb(240, 253, 244) 0%, rgb(255, 255, 255) 100%)',
        'islamic-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L36.18 23.82L60 30L36.18 36.18L30 60L23.82 36.18L0 30L23.82 23.82L30 0Z' fill='%2310B981' fill-opacity='0.05'/%3E%3C/svg%3E\")",
        'card-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(248, 250, 252, 1) 100%)',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
      },

      /* ==========================================================================
         ASPECT RATIOS
         ========================================================================== */
      aspectRatio: {
        'card': '4 / 3',
        'portrait': '3 / 4',
        'wide': '16 / 9',
        'ultrawide': '21 / 9',
      },

      /* ==========================================================================
         Z-INDEX
         ========================================================================== */
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'toast': '1080',
      },
    },
  },
  plugins: [],
}
