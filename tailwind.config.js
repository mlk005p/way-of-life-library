// tailwind.config.js
// Way of Life Foundation — Digital Library
// Based on WOL Brand Guidelines v1.0

const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand Primaries (from WOL Brand Guidelines) ──────────────
        'green-nature':   '#76BE46',  // Primary interactive
        'green-forest':   '#07593E',  // Headings, navbar, dark text
        'green-lime':     '#97C936',  // Accent highlights, active sidebar
        'blue-water':     '#3EBCEB',  // Info states, focus rings
        'orange-sunrise': '#F7941D',  // CTAs, footer bar, warm highlights

        // ── Semantic Surface Tokens ───────────────────────────────────
        background: {
          DEFAULT: '#F8FDF4', // Light green-tinted page background
          page:    '#F8FDF4',
          card:    '#FFFFFF',
          subtle:  '#EEF8E6', // Hover states, zebra rows
          dark:    '#07593E', // Dark sections, sidebar
        },

        // ── Semantic Text Tokens ──────────────────────────────────────
        text: {
          primary:   '#07593E', // Body text (forest green)
          secondary: '#4A7C59', // Muted labels, captions
          inverse:   '#FFFFFF', // Text on dark backgrounds
          link:      '#76BE46', // Inline links
        },

        // ── Border Tokens ─────────────────────────────────────────────
        border: {
          DEFAULT: '#C8E6A0',
          default: '#C8E6A0',
          focus:   '#3EBCEB',
        },

        // ── Status Tokens ─────────────────────────────────────────────
        status: {
          success: '#76BE46',
          warning: '#F7941D',
          error:   '#D94F3D',
          info:    '#3EBCEB',
        },

        // ── shadcn/ui Required Tokens (mapped to WOL palette) ─────────
        input:      '#C8E6A0',
        ring:       '#3EBCEB',
        foreground: '#07593E',
        primary: {
          DEFAULT:    '#76BE46',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT:    '#EEF8E6',
          foreground: '#07593E',
        },
        destructive: {
          DEFAULT:    '#D94F3D',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT:    '#EEF8E6',
          foreground: '#4A7C59',
        },
        accent: {
          DEFAULT:    '#F7941D',
          foreground: '#FFFFFF',
        },
        popover: {
          DEFAULT:    '#FFFFFF',
          foreground: '#07593E',
        },
        card: {
          DEFAULT:    '#FFFFFF',
          foreground: '#07593E',
        },
      },

      // ── Typography ─────────────────────────────────────────────────
      fontFamily: {
        heading: ['Krub', ...fontFamily.sans],     // Displays, headings
        body:    ['Open Sans', ...fontFamily.sans], // UI, body copy
        sans:    ['Open Sans', ...fontFamily.sans], // Default override
      },

      fontSize: {
        'display': ['3rem',      { lineHeight: '1.1',  fontWeight: '700' }],
        'h1':      ['2.25rem',   { lineHeight: '1.2',  fontWeight: '700' }],
        'h2':      ['1.75rem',   { lineHeight: '1.25', fontWeight: '700' }],
        'h3':      ['1.375rem',  { lineHeight: '1.3',  fontWeight: '500' }],
        'h4':      ['1.125rem',  { lineHeight: '1.4',  fontWeight: '500' }],
        'body-lg': ['1.125rem',  { lineHeight: '1.6',  fontWeight: '400' }],
        'body':    ['1rem',      { lineHeight: '1.6',  fontWeight: '400' }],
        'body-sm': ['0.875rem',  { lineHeight: '1.5',  fontWeight: '400' }],
        'label':   ['0.75rem',   { lineHeight: '1.4',  fontWeight: '700' }],
        'overline':['0.6875rem', { lineHeight: '1.4',  fontWeight: '700' }],
      },

      letterSpacing: {
        'tighter': '-0.02em',
        'tight':   '-0.01em',   // Heading default
        'normal':   '0',
        'wide':     '0.04em',
        'wider':    '0.06em',
        'widest':   '0.1em',   // Overlines, sidebar section labels
      },

      // ── Spacing ───────────────────────────────────────────────────
      // 8px base unit — extends Tailwind defaults
      spacing: {
        '18': '4.5rem',   // 72px — topbar height
        '22': '5.5rem',   // 88px
        '60': '15rem',    // 240px — sidebar width
      },

      // ── Border Radius ─────────────────────────────────────────────
      borderRadius: {
        'none': '0',
        'sm':   '4px',   // Tags, small chips
        'md':   '8px',   // Inputs, buttons (default)
        'lg':   '12px',  // Cards, modals
        'xl':   '16px',  // Large hero cards
        '2xl':  '24px',  // Pill-style search bar
        'full': '9999px',// Avatars, badges
        // shadcn/ui
        DEFAULT: '8px',
      },

      // ── Shadows ───────────────────────────────────────────────────
      boxShadow: {
        'card':       '0 1px 4px rgba(7, 89, 62, 0.06)',
        'card-hover': '0 8px 24px rgba(7, 89, 62, 0.12)',
        'hero':       '0 8px 32px rgba(7, 89, 62, 0.25)',
        'cta':        '0 4px 14px rgba(247, 148, 29, 0.35)',
        'focus':      '0 0 0 3px rgba(62, 188, 235, 0.18)',
        'sidebar':    '2px 0 12px rgba(7, 89, 62, 0.12)',
      },

      // ── Gradients ─────────────────────────────────────────────────
      backgroundImage: {
        'gradient-growth':  'linear-gradient(135deg, #07593E 0%, #76BE46 100%)',
        'gradient-sunrise': 'linear-gradient(135deg, #F7941D 0%, #E8851A 100%)',
        'gradient-water':   'linear-gradient(180deg, #EEF8E6 0%, #FFFFFF 100%)',
        'gradient-hero':    'linear-gradient(135deg, #07593E 0%, #3EBCEB 100%)',
      },

      // ── Animation ─────────────────────────────────────────────────
      transitionDuration: {
        DEFAULT: '200ms',
        fast:    '150ms',
        slow:    '350ms',
      },

      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          from: { transform: 'translateX(-100%)' },
          to:   { transform: 'translateX(0)' },
        },
      },

      animation: {
        'fade-in':       'fade-in 200ms ease-out',
        'slide-in-left': 'slide-in-left 250ms ease-out',
      },

      // ── Layout ───────────────────────────────────────────────────
      maxWidth: {
        'container': '1280px',
      },

      screens: {
        sm:  '640px',
        md:  '768px',
        lg:  '1024px',
        xl:  '1280px',
        '2xl':'1536px',
      },

      // ── Z-Index scale ─────────────────────────────────────────────
      zIndex: {
        'sidebar': '40',
        'topbar':  '50',
        'modal':   '60',
        'toast':   '70',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),       // shadcn/ui animations
    require('@tailwindcss/typography'),   // Prose content
    require('@tailwindcss/forms'),        // Form base resets
  ],
}
