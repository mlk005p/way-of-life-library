# Way of Life Foundation — Digital Library Design System

> Version 1.0 | Based on WOL Brand Guidelines  
> Stack: Next.js 14 · TailwindCSS · shadcn/ui · Supabase

---

## 1. Design Principles

Rooted in the WOL brand's three pillars — **Educate. Empower. Enrich.** — every UI decision should feel warm, trustworthy, and purposeful. The library is a tool for community good, not a SaaS dashboard; it should feel like an open book, not a control panel.

- **Warmth over sterility** — use the orange and green palette to convey hope and growth.
- **Clarity for all literacy levels** — generous type sizes, clear hierarchy, simple labels.
- **Nature-inspired grounding** — rounded forms, leaf-like curves echoed in border radii.
- **Mobile-first** — the communities WOL serves access the web primarily on phones.

---

## 2. Color System

### Brand Palette (from Brand Guidelines)

| Token Name | Hex | Usage |
|---|---|---|
| `green-nature` | `#76BE46` | Primary interactive — buttons, links, active states |
| `green-forest` | `#07593E` | Headings, navbar, dark text on light backgrounds |
| `green-lime` | `#97C936` | Accent highlights, tags, badges |
| `blue-water` | `#3EBCEB` | Info states, secondary actions, icons |
| `orange-sunrise` | `#F7941D` | CTAs, footer bar, warm highlights, notifications |
| `black` | `#1A1A1A` | Tertiary logo background, high-contrast text |

### Extended Semantic Tokens

| Semantic Token | Maps To | Purpose |
|---|---|---|
| `color.background.page` | `#F8FDF4` | Very light green-tinted white page background |
| `color.background.card` | `#FFFFFF` | Card and panel surfaces |
| `color.background.subtle` | `#EEF8E6` | Hover states, zebra rows, sidebar tint |
| `color.background.dark` | `#07593E` | Dark sections, footer |
| `color.text.primary` | `#07593E` | Body text (forest green, not black) |
| `color.text.secondary` | `#4A7C59` | Muted labels, captions |
| `color.text.inverse` | `#FFFFFF` | Text on dark backgrounds |
| `color.text.link` | `#76BE46` | Inline links |
| `color.border.default` | `#C8E6A0` | Card borders, dividers |
| `color.border.focus` | `#3EBCEB` | Focus rings |
| `color.status.success` | `#76BE46` | Success toasts, checkmarks |
| `color.status.warning` | `#F7941D` | Warning banners |
| `color.status.error` | `#D94F3D` | Error states (not in brand, keep neutral) |
| `color.status.info` | `#3EBCEB` | Info banners |

### Gradient Tokens

```css
/* Hero / Feature backgrounds */
--gradient-growth: linear-gradient(135deg, #07593E 0%, #76BE46 100%);
--gradient-sunrise: linear-gradient(135deg, #F7941D 0%, #97C936 100%);
--gradient-water: linear-gradient(180deg, #EEF8E6 0%, #FFFFFF 100%);
```

---

## 3. Typography System

### Typefaces (from Brand Guidelines)

| Role | Family | Weights | Source |
|---|---|---|---|
| **Display / Headings** | Krub | 700 (Bold), 500 (Medium) | Google Fonts |
| **Body / UI** | Open Sans | 700, 500, 300 | Google Fonts |

### Type Scale

| Token | Size | Line Height | Weight | Family | Usage |
|---|---|---|---|---|---|
| `text-display` | 48px / 3rem | 1.1 | 700 | Krub | Hero headings |
| `text-h1` | 36px / 2.25rem | 1.2 | 700 | Krub | Page titles |
| `text-h2` | 28px / 1.75rem | 1.25 | 700 | Krub | Section headings |
| `text-h3` | 22px / 1.375rem | 1.3 | 500 | Krub | Card headings, sidebar labels |
| `text-h4` | 18px / 1.125rem | 1.4 | 500 | Krub | Sub-headings |
| `text-body-lg` | 18px / 1.125rem | 1.6 | 400 | Open Sans | Lead paragraphs |
| `text-body` | 16px / 1rem | 1.6 | 400 | Open Sans | Default body text |
| `text-body-sm` | 14px / 0.875rem | 1.5 | 400 | Open Sans | Captions, helper text |
| `text-label` | 12px / 0.75rem | 1.4 | 700 | Open Sans | Form labels, badges |
| `text-overline` | 11px / 0.6875rem | 1.4 | 700 | Open Sans | Category eyebrows, all-caps tags |

### Letter Spacing

- Headings (Krub): `letter-spacing: -0.01em`
- Overlines / labels: `letter-spacing: 0.08em` + `text-transform: uppercase`
- Body: `letter-spacing: 0`

---

## 4. Spacing & Layout

### Spacing Scale (8px base unit)

```
2px   → spacing-0.5
4px   → spacing-1
8px   → spacing-2
12px  → spacing-3
16px  → spacing-4
24px  → spacing-6
32px  → spacing-8
48px  → spacing-12
64px  → spacing-16
96px  → spacing-24
```

### Border Radius

```
none   → 0
sm     → 4px   (inputs, small tags)
md     → 8px   (cards)
lg     → 12px  (modals, large cards)
xl     → 16px  (hero panels)
full   → 9999px (pills, avatar)
```

*The leaf-curve motif → prefer `md` (8px) and `lg` (12px) over sharp corners.*

### Breakpoints

```
sm   → 640px
md   → 768px
lg   → 1024px
xl   → 1280px
2xl  → 1536px
```

### Container

```
max-width: 1280px
padding: 0 24px (mobile), 0 48px (md+)
```

---

## 5. Button Styles

### Variants

#### Primary Button
```
Background: #76BE46 (green-nature)
Text: #FFFFFF, font: Open Sans 700 14px
Padding: 10px 24px
Border-radius: 8px
Border: none
Hover: background #5FA535 (darken 10%)
Active: background #4A8A28
Focus ring: 2px solid #3EBCEB, offset 2px
Disabled: opacity 0.4
```

#### Secondary Button
```
Background: transparent
Text: #07593E
Border: 2px solid #07593E
Padding: 8px 22px (accounts for border)
Border-radius: 8px
Hover: background #EEF8E6
Active: background #C8E6A0
Focus ring: 2px solid #3EBCEB
```

#### CTA / Accent Button (Primary action per page)
```
Background: linear-gradient(135deg, #F7941D, #E8851A)
Text: #FFFFFF, font: Open Sans 700 14px
Padding: 12px 28px
Border-radius: 8px
Box-shadow: 0 4px 14px rgba(247,148,29,0.35)
Hover: box-shadow intensified, translateY(-1px)
```

#### Ghost Button
```
Background: transparent
Text: #76BE46
Border: none
Padding: 10px 20px
Hover: background #EEF8E6, text #07593E
```

#### Danger Button
```
Background: #D94F3D
Text: #FFFFFF
Border: none
Padding: 10px 24px
Border-radius: 8px
Hover: background #B83D2D
```

### Sizes

| Size | Height | Padding H | Font Size |
|---|---|---|---|
| sm | 32px | 12px | 12px |
| md (default) | 40px | 24px | 14px |
| lg | 48px | 32px | 16px |

### Icon Buttons
```
Size: 40x40px (md), 32x32px (sm)
Border-radius: 8px (square-ish) or full (round)
Same color rules as button variants above
```

---

## 6. Card Styles

### Base Card
```
Background: #FFFFFF
Border: 1px solid #C8E6A0
Border-radius: 12px
Box-shadow: 0 1px 4px rgba(7,89,62,0.06)
Padding: 24px
```

### Book Card (Primary data unit)
```
extends: Base Card
Width: 220px (grid cell)
Hover: box-shadow 0 8px 24px rgba(7,89,62,0.12), translateY(-2px)
Transition: all 200ms ease

Layout:
  - Cover image: full width, border-radius 8px 8px 0 0, aspect-ratio 3/4
  - Body padding: 16px
  - Genre tag: pill, bg #EEF8E6, text #07593E, font overline
  - Title: text-h4, Krub 500, color #07593E
  - Author: text-body-sm, Open Sans 400, color #4A7C59
  - Availability badge: right-aligned, pill
```

### Stat Card (Dashboard widgets)
```
extends: Base Card
Padding: 20px 24px
Left border accent: 4px solid #76BE46 (or orange for CTA stats)

Layout:
  - Label: text-overline, #4A7C59
  - Value: text-h1, Krub 700, #07593E
  - Delta / sub-label: text-body-sm, #4A7C59
  - Icon: top-right, 32x32px, color #76BE46 @ 20% opacity bg
```

### Profile / Borrower Card
```
extends: Base Card
Padding: 20px

Layout:
  - Avatar: 48x48px, border-radius full, bg #EEF8E6
  - Name: text-h4
  - Meta row: icon + text-body-sm
  - Action row: ghost buttons, right-aligned
```

### Featured / Hero Card
```
Background: linear-gradient(135deg, #07593E 0%, #76BE46 100%)
Border-radius: 16px
Padding: 32px
Text: #FFFFFF
Box-shadow: 0 8px 32px rgba(7,89,62,0.25)
```

---

## 7. Form Styles

### Text Input
```
Height: 40px
Background: #FFFFFF
Border: 1.5px solid #C8E6A0
Border-radius: 8px
Padding: 0 14px
Font: Open Sans 400 16px, color #07593E
Placeholder: #8FAE96

Focus:
  Border: 1.5px solid #3EBCEB
  Box-shadow: 0 0 0 3px rgba(62,188,235,0.15)
  Outline: none

Error:
  Border: 1.5px solid #D94F3D
  Box-shadow: 0 0 0 3px rgba(217,79,61,0.12)

Disabled:
  Background: #F0F7EC
  opacity: 0.6
  cursor: not-allowed
```

### Label
```
Font: Open Sans 700 12px
Color: #07593E
Letter-spacing: 0.04em
Margin-bottom: 6px
```

### Helper / Error Text
```
Font: Open Sans 400 12px
Color (helper): #4A7C59
Color (error): #D94F3D
Margin-top: 4px
```

### Textarea
```
extends: Text Input
Min-height: 100px
Padding: 12px 14px
Resize: vertical
```

### Select / Dropdown
```
extends: Text Input
Appearance: none
Background-image: chevron SVG (#76BE46)
Padding-right: 40px
```

### Checkbox
```
Size: 18x18px
Border: 2px solid #C8E6A0
Border-radius: 4px
Checked:
  Background: #76BE46
  Border-color: #76BE46
  Checkmark: white SVG
Focus: box-shadow 0 0 0 3px rgba(118,190,70,0.2)
```

### Radio
```
Size: 18x18px
Border: 2px solid #C8E6A0
Border-radius: full
Checked:
  Inner dot: #76BE46
  Border: #76BE46
```

### Search Input (Library-specific)
```
extends: Text Input
Height: 48px
Padding-left: 44px (icon slot)
Border-radius: 24px (pill — signature element for the library)
Icon: search, left-centered, #76BE46
Background: #F8FDF4
Border: 2px solid #C8E6A0
Focus:
  Border-color: #76BE46
  Background: #FFFFFF
```

### Form Group Spacing
```
Stack gap between field groups: 24px
Label to input: 6px
Input to helper: 4px
Section to section: 40px
```

---

## 8. Dashboard Styles

### Layout Structure
```
Shell:
  ├── Sidebar (240px, fixed, bg #07593E)
  └── Main content area
        ├── Topbar (64px, bg #FFFFFF, border-bottom #C8E6A0)
        └── Content (padding 32px, bg #F8FDF4)

Mobile:
  Sidebar collapses to bottom tab bar (5 tabs max)
```

### Sidebar
```
Width: 240px
Background: #07593E (forest green)
Text: #FFFFFF

Logo area:
  Height: 64px
  Padding: 16px 20px
  Border-bottom: 1px solid rgba(255,255,255,0.1)

Nav item:
  Padding: 10px 20px
  Border-radius: 8px (inset 8px from sides)
  Font: Open Sans 500 14px
  Color: rgba(255,255,255,0.75)
  Icon: 20px, same color
  Gap: 12px between icon and label

Nav item — Active:
  Background: rgba(118,190,70,0.2)
  Color: #97C936
  Icon-color: #97C936
  Left border: 3px solid #97C936

Nav item — Hover:
  Background: rgba(255,255,255,0.07)
  Color: #FFFFFF

Section label (e.g. "LIBRARY", "ADMIN"):
  Font: Open Sans 700 10px
  Letter-spacing: 0.1em
  Color: rgba(255,255,255,0.4)
  Padding: 20px 20px 6px
```

### Topbar
```
Height: 64px
Background: #FFFFFF
Border-bottom: 1px solid #C8E6A0
Padding: 0 32px
Contents: breadcrumb left | search center | [notif icon + avatar] right

Breadcrumb:
  Font: Open Sans 400 14px
  Color: #4A7C59
  Separator: / (chevron-right icon)
  Active: Open Sans 600, #07593E

Avatar:
  Size: 36px
  Border: 2px solid #76BE46
  Border-radius: full
```

### Content Area
```
Padding: 32px
Max-width: 1200px
Page title row:
  Title: text-h1
  Subtitle: text-body, #4A7C59
  Action button: primary or CTA, right-aligned
  Margin-bottom: 32px

Stat cards row:
  Grid: repeat(4, 1fr), gap 20px
  Mobile: repeat(2, 1fr)

Data tables:
  Background: #FFFFFF
  Border: 1px solid #C8E6A0
  Border-radius: 12px
  Overflow: hidden

  Header row:
    Background: #EEF8E6
    Font: Open Sans 700 12px, #4A7C59, uppercase, letter-spacing 0.06em
    Padding: 12px 20px
    Border-bottom: 1px solid #C8E6A0

  Body row:
    Padding: 14px 20px
    Border-bottom: 1px solid #F0F7EC
    Font: Open Sans 400 14px, #07593E
    Hover: background #F8FDF4

  Actions cell:
    Icon buttons, gap 4px
```

---

## 9. Navigation Styles

### Primary Nav (Topbar for public / non-authenticated pages)
```
Height: 72px
Background: #FFFFFF
Border-bottom: 1px solid #C8E6A0
Position: sticky top-0, z-index 50

Left: Logo (40px height)
Center: Nav links
Right: [Login button] or [Avatar + dropdown]

Nav link:
  Font: Open Sans 500 15px
  Color: #07593E
  Padding: 6px 16px
  Border-radius: 6px
  Hover: background #EEF8E6
  Active: color #76BE46, border-bottom 2px solid #76BE46
```

### Mobile Nav (Hamburger)
```
Drawer: slides from left
Width: 280px
Background: #07593E
Overlay: rgba(0,0,0,0.5)
Close button: top-right, white icon
Nav links: stacked, 52px tall, border-bottom rgba(255,255,255,0.08)
CTA button at bottom: full-width orange CTA
```

### Breadcrumb
```
Font: Open Sans 400 13px
Separator: › (›) in #C8E6A0
Color: #4A7C59
Last item: #07593E, font-weight 600
```

### Pagination
```
Button: 36x36px, border-radius 8px
Default: bg transparent, border 1px solid #C8E6A0, text #07593E
Active: bg #76BE46, border #76BE46, text white
Hover (inactive): bg #EEF8E6
Font: Open Sans 500 14px
Gap: 4px between buttons
```

### Tab Navigation (within pages)
```
Container: border-bottom 1px solid #C8E6A0
Tab item:
  Padding: 12px 20px
  Font: Open Sans 500 14px
  Color: #4A7C59
  Hover: color #07593E
  Active:
    Color: #07593E
    Border-bottom: 2px solid #76BE46
    Font-weight: 600
```

---

## 10. Feedback & Status Components

### Toast / Notification
```
Border-radius: 10px
Padding: 14px 16px
Max-width: 380px
Font: Open Sans 400 14px

Success: bg #EEF8E6, border-left 4px solid #76BE46, icon #76BE46
Warning: bg #FFF8EE, border-left 4px solid #F7941D, icon #F7941D
Error:   bg #FEF0EF, border-left 4px solid #D94F3D, icon #D94F3D
Info:    bg #EEF9FD, border-left 4px solid #3EBCEB, icon #3EBCEB
```

### Badge / Tag
```
Border-radius: 9999px (pill)
Padding: 2px 10px
Font: Open Sans 700 11px, uppercase, letter-spacing 0.06em

Available:   bg #EEF8E6, text #07593E
Borrowed:    bg #FFF8EE, text #C47000
Overdue:     bg #FEF0EF, text #D94F3D
New:         bg #76BE46, text #FFFFFF
```

### Empty State
```
Icon: 64px, color #C8E6A0
Title: text-h3, #07593E
Body: text-body, #4A7C59
CTA: Primary button
Centered, padding 64px
```

---

## 11. Tailwind CSS Configuration

```js
// tailwind.config.js
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
        // Brand primaries
        'green-nature':  '#76BE46',
        'green-forest':  '#07593E',
        'green-lime':    '#97C936',
        'blue-water':    '#3EBCEB',
        'orange-sunrise':'#F7941D',

        // Semantic surface tokens
        background: {
          page:   '#F8FDF4',
          card:   '#FFFFFF',
          subtle: '#EEF8E6',
          dark:   '#07593E',
        },

        // Semantic text tokens
        text: {
          primary:   '#07593E',
          secondary: '#4A7C59',
          inverse:   '#FFFFFF',
          link:      '#76BE46',
        },

        // Border tokens
        border: {
          default: '#C8E6A0',
          focus:   '#3EBCEB',
        },

        // Status tokens
        status: {
          success: '#76BE46',
          warning: '#F7941D',
          error:   '#D94F3D',
          info:    '#3EBCEB',
        },

        // shadcn/ui required tokens (mapped to WOL palette)
        border:     '#C8E6A0',
        input:      '#C8E6A0',
        ring:       '#3EBCEB',
        background: '#F8FDF4',
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

      fontFamily: {
        heading: ['Krub', ...fontFamily.sans],
        body:    ['Open Sans', ...fontFamily.sans],
        sans:    ['Open Sans', ...fontFamily.sans],
      },

      fontSize: {
        'display': ['3rem',     { lineHeight: '1.1',  fontWeight: '700' }],
        'h1':      ['2.25rem',  { lineHeight: '1.2',  fontWeight: '700' }],
        'h2':      ['1.75rem',  { lineHeight: '1.25', fontWeight: '700' }],
        'h3':      ['1.375rem', { lineHeight: '1.3',  fontWeight: '500' }],
        'h4':      ['1.125rem', { lineHeight: '1.4',  fontWeight: '500' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6',  fontWeight: '400' }],
        'body':    ['1rem',     { lineHeight: '1.6',  fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5',  fontWeight: '400' }],
        'label':   ['0.75rem',  { lineHeight: '1.4',  fontWeight: '700' }],
        'overline':['0.6875rem',{ lineHeight: '1.4',  fontWeight: '700' }],
      },

      borderRadius: {
        'none': '0',
        'sm':   '4px',
        'md':   '8px',
        'lg':   '12px',
        'xl':   '16px',
        '2xl':  '24px',
        'full': '9999px',
        // shadcn/ui DEFAULT
        DEFAULT: '8px',
      },

      boxShadow: {
        'card':      '0 1px 4px rgba(7,89,62,0.06)',
        'card-hover':'0 8px 24px rgba(7,89,62,0.12)',
        'hero':      '0 8px 32px rgba(7,89,62,0.25)',
        'cta':       '0 4px 14px rgba(247,148,29,0.35)',
        'focus':     '0 0 0 3px rgba(62,188,235,0.18)',
      },

      backgroundImage: {
        'gradient-growth':  'linear-gradient(135deg, #07593E 0%, #76BE46 100%)',
        'gradient-sunrise': 'linear-gradient(135deg, #F7941D 0%, #97C936 100%)',
        'gradient-water':   'linear-gradient(180deg, #EEF8E6 0%, #FFFFFF 100%)',
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },

      maxWidth: {
        'container': '1280px',
      },

      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
```

---

## 12. CSS Custom Properties (globals.css)

```css
/* app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=Krub:wght@300;400;500;700&family=Open+Sans:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* shadcn/ui HSL vars (required) */
    --background:    138 50% 97%;  /* #F8FDF4 */
    --foreground:    158 86% 20%;  /* #07593E */
    --card:          0   0%  100%;
    --card-foreground: 158 86% 20%;
    --popover:       0   0%  100%;
    --popover-foreground: 158 86% 20%;
    --primary:       97  50% 51%;  /* #76BE46 */
    --primary-foreground: 0 0% 100%;
    --secondary:     97  47% 93%;  /* #EEF8E6 */
    --secondary-foreground: 158 86% 20%;
    --muted:         97  47% 93%;
    --muted-foreground: 148 28% 48%; /* #4A7C59 */
    --accent:        33  93% 55%;  /* #F7941D */
    --accent-foreground: 0 0% 100%;
    --destructive:   5   68% 51%;  /* #D94F3D */
    --destructive-foreground: 0 0% 100%;
    --border:        90  48% 75%;  /* #C8E6A0 */
    --input:         90  48% 75%;
    --ring:          199 77% 58%; /* #3EBCEB */
    --radius:        0.5rem;

    /* WOL brand vars */
    --wol-green-nature:   #76BE46;
    --wol-green-forest:   #07593E;
    --wol-green-lime:     #97C936;
    --wol-blue-water:     #3EBCEB;
    --wol-orange-sunrise: #F7941D;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-body antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}

@layer components {
  /* ── Buttons ─────────────────────────────── */
  .btn-primary {
    @apply inline-flex items-center justify-center gap-2
           h-10 px-6 rounded-md
           bg-green-nature text-white font-body font-bold text-sm
           transition-all duration-200
           hover:bg-[#5FA535] active:bg-[#4A8A28]
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-water focus-visible:ring-offset-2
           disabled:opacity-40 disabled:cursor-not-allowed;
  }

  .btn-secondary {
    @apply inline-flex items-center justify-center gap-2
           h-10 px-[22px] rounded-md
           bg-transparent text-green-forest font-body font-bold text-sm
           border-2 border-green-forest
           transition-all duration-200
           hover:bg-background-subtle active:bg-border-default
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-water focus-visible:ring-offset-2
           disabled:opacity-40 disabled:cursor-not-allowed;
  }

  .btn-cta {
    @apply inline-flex items-center justify-center gap-2
           h-10 px-7 rounded-md
           bg-gradient-sunrise text-white font-body font-bold text-sm
           shadow-cta
           transition-all duration-200
           hover:shadow-hero hover:-translate-y-px
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-water focus-visible:ring-offset-2
           disabled:opacity-40 disabled:cursor-not-allowed;
  }

  .btn-ghost {
    @apply inline-flex items-center justify-center gap-2
           h-10 px-5 rounded-md
           bg-transparent text-green-nature font-body font-medium text-sm
           transition-all duration-200
           hover:bg-background-subtle hover:text-green-forest
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-water focus-visible:ring-offset-2;
  }

  /* ── Cards ───────────────────────────────── */
  .card-base {
    @apply bg-card border border-border-default rounded-lg shadow-card p-6;
  }

  .card-book {
    @apply card-base p-0 overflow-hidden
           transition-all duration-200
           hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer;
  }

  .card-stat {
    @apply card-base p-5
           border-l-4 border-l-green-nature;
  }

  .card-hero {
    @apply bg-gradient-growth text-white rounded-xl shadow-hero p-8;
  }

  /* ── Form inputs ─────────────────────────── */
  .input-base {
    @apply h-10 w-full rounded-md border border-border-default bg-card
           px-3.5 py-2 text-body text-text-primary font-body
           placeholder:text-text-secondary/60
           transition-all duration-200
           focus:outline-none focus:border-border-focus focus:shadow-focus
           disabled:bg-background-subtle disabled:opacity-60 disabled:cursor-not-allowed;
  }

  .input-search {
    @apply input-base h-12 rounded-full px-5 pl-11
           bg-background-page border-2 border-border-default
           focus:bg-card focus:border-green-nature;
  }

  .input-label {
    @apply block text-label text-text-primary tracking-wide mb-1.5;
  }

  .input-helper {
    @apply mt-1 text-body-sm text-text-secondary;
  }

  .input-error {
    @apply mt-1 text-body-sm text-status-error;
  }

  /* ── Badges ──────────────────────────────── */
  .badge-available {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-full
           text-overline uppercase tracking-wider
           bg-background-subtle text-green-forest;
  }

  .badge-borrowed {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-full
           text-overline uppercase tracking-wider
           bg-[#FFF8EE] text-[#C47000];
  }

  .badge-overdue {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-full
           text-overline uppercase tracking-wider
           bg-[#FEF0EF] text-status-error;
  }

  .badge-new {
    @apply inline-flex items-center px-2.5 py-0.5 rounded-full
           text-overline uppercase tracking-wider
           bg-green-nature text-white;
  }

  /* ── Nav sidebar ─────────────────────────── */
  .sidebar-nav-item {
    @apply flex items-center gap-3 mx-2 px-4 py-2.5 rounded-md
           font-body font-medium text-sm text-white/75
           transition-all duration-150
           hover:bg-white/[0.07] hover:text-white;
  }

  .sidebar-nav-item-active {
    @apply sidebar-nav-item
           bg-green-nature/20 text-green-lime
           border-l-[3px] border-l-green-lime -ml-[3px];
  }
}
```

---

## 13. shadcn/ui Component Overrides

### components.json
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "green",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

### Recommended shadcn/ui components to install
```bash
npx shadcn-ui@latest add button card input label textarea
npx shadcn-ui@latest add select checkbox radio-group switch
npx shadcn-ui@latest add dialog sheet drawer
npx shadcn-ui@latest add table badge avatar
npx shadcn-ui@latest add toast sonner
npx shadcn-ui@latest add tabs breadcrumb pagination
npx shadcn-ui@latest add dropdown-menu navigation-menu
npx shadcn-ui@latest add skeleton progress
npx shadcn-ui@latest add separator scroll-area
```

---

## 14. Design Tokens Quick Reference

```
PRIMARY ACTION   → green-nature  #76BE46
HEADING / BRAND  → green-forest  #07593E
ACCENT / CTA     → orange-sunrise #F7941D
INFO / FOCUS     → blue-water    #3EBCEB
PAGE BG          → #F8FDF4
CARD BG          → #FFFFFF
SUBTLE BG        → #EEF8E6
BORDER           → #C8E6A0

FONT HEADING     → Krub
FONT BODY        → Open Sans
BASE RADIUS      → 8px
BASE SHADOW      → 0 1px 4px rgba(7,89,62,0.06)
```

---

*This document is the single source of truth for all UI decisions in the WOL Digital Library. All components should be built from these tokens — no ad-hoc color or font values.*
