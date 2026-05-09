# Design System — Ordinacija Smile

A reference for every visual and interaction decision made across this site. Use it as the single source of truth when adding sections, touching components, or making style changes.

---

## Design Intent

The site positions Ordinacija Smile as a calm, premium dental practice — not a generic clinical template. The vocabulary borrows from high-end architecture and gallery spaces: dark backgrounds, generous white space, controlled use of a single accent colour, and motion that feels deliberate rather than decorative.

**Three guiding principles:**
1. **Restraint** — one accent colour, one display font, one motion easing curve.
2. **Legibility first** — all text meets WCAG AA contrast on its background.
3. **Progressive disclosure** — content reveals itself as the user scrolls; nothing competes for attention at once.

---

## Colour Palette

Defined as Tailwind v4 CSS custom properties in `src/index.css` under `@theme`.

| Token | Hex | Usage |
|---|---|---|
| `gold` | `#D4AF37` | Primary accent — borders, labels, highlights, CTA fills |
| `gold-bright` | `#E6C25D` | Hover state on `gold` backgrounds |
| `bg` | `#0F1A15` | Page background; deep forest green-black |
| `surface` | `#0A120E` | Elevated surface layer (cards, form section, alternating sections) |
| `pearl` | `#F8F6F0` | Body and heading text; warm off-white |
| `sage` | `#7C8B82` | Secondary text, captions, dividers; muted grey-green |

**Selection highlight:** `gold` background with `bg` text — defined in both `::selection` CSS and the `bg-gold selection:bg-gold` Tailwind class on `<main>`.

**Text glow utility** (`.text-glow`): `text-shadow: 0 0 20px rgba(212, 175, 55, 0.3)` — applied only to h1 in the hero. Do not overuse.

---

## Typography

| Role | Family | Tailwind class | Notes |
|---|---|---|---|
| Display / headings | Playfair Display (serif) | `font-heading` | Set on `h1`–`h4` via CSS base layer |
| Body / UI | Jost (sans-serif) | `font-body` | Default `body` font |

### Scale in use

| Context | Size | Class |
|---|---|---|
| Hero h1 (mobile) | 48px | `text-5xl` |
| Hero h1 (tablet) | 60px | `sm:text-6xl` |
| Hero h1 (desktop) | 96–144px | `md:text-8xl xl:text-9xl` |
| Section h2 (Craft) | 36–72px | `text-4xl md:text-5xl lg:text-7xl` |
| Section h2 (Heritage) | 30–60px | `text-3xl lg:text-6xl` |
| Studio h2 (desktop) | 48–72px | `text-5xl lg:text-7xl` |
| Concierge h2 | 36–60px | `text-4xl sm:text-5xl md:text-6xl` |
| Form inputs | 24px | `text-2xl font-heading` |
| Eyebrow / label | 10–12px | `text-[10px] sm:text-xs` |
| Body text | 18px | `text-lg` |
| Caption / footer meta | 10–11px | `text-[10px] text-[11px]` |

### Tracking conventions

| Pattern | Value | Usage |
|---|---|---|
| Eyebrow labels | `tracking-[0.28em]`–`tracking-[0.5em]` | Section openers, nav links |
| Caption / footer | `tracking-widest` / `tracking-[0.22em]` | Image captions, footer items |
| Headings | `tracking-tighter` | h1 only |
| CTA buttons | `tracking-[0.2em]` | Submit button |

**Italic** is used as a stylistic emphasis on key words within headings (e.g. *stomatologija*, *usluge*, *prostor*). Always apply it via `<span class="italic">` inside a heading tag, never to the whole heading.

---

## Spacing & Layout

- Max content width: `max-w-7xl` (80rem) on wide sections, `max-w-2xl` (42rem) on the contact form.
- Horizontal padding: `px-6` (mobile) → `sm:px-8` → `md:px-24` (desktop rich sections).
- Vertical rhythm: `py-24` (mobile) → `lg:py-[160px]` (desktop). Heritage and Exhibition use full viewport height (`min-h-[100dvh]`).
- Safe-area insets are applied on nav and back-to-top button via `env(safe-area-inset-*)` to support notched devices.

---

## Sections

### 1. ThreeHero
- WebGL canvas rendered via Three.js.
- Sits beneath the `Exhibition` section content; acts as an atmospheric background layer.
- No text of its own.

### 2. Exhibition (Hero)
- Full viewport height (`min-h-[100dvh]`).
- Background: muted YouTube embed (autoplay, muted, looped) dimmed to ~18% visibility via `bg-bg/88`.
- Reduced-motion fallback: static YouTube thumbnail with `opacity-35`.
- Vignette: inset box-shadow `inset 0 0 120px rgba(15,26,21,0.6)`.
- Content: eyebrow → h1 (`text-glow`) → subtitle.
- Animated scroll cue: bouncing vertical line + "Nastavite pregled" label.

### 3. Craft (Services)
- Split two-column layout on desktop (`lg:flex-row`), stacked on mobile.
- Left: heading + 3 service entries with discipline tag + expand line on hover.
- Right: decorative panel — gradient surface + `copper-pattern` texture + grayscale image overlay at `opacity-40 mix-blend-overlay` + large "SMILE" watermark text.
- Service items animate in sequentially with `delay: index * 0.2`.

### 4. Heritage (Philosophy)
- Full-height section. Scroll-driven opacity and scale (`useTransform` on `scrollYProgress`): fades in from 0.1 → 1 and back to 0.1, scales 0.8 → 1 → 0.8.
- Background: rotating `copper-pattern` at `opacity-10` and `scale-150`, very slow (100s/rotation).
- Single centred quote; key phrase wrapped in `<span class="italic text-gold">`.

### 5. Studio (Space Gallery)
- **Mobile** (`md:hidden`): horizontal snap-scroll gallery with `snap-x snap-mandatory`. Hidden scrollbar. `figcaption` below each image.
- **Desktop** (`hidden md:block`): sticky scroll-linked horizontal reel. Height `240vh` so the reel scrolls over two viewports. `useTransform` maps `scrollYProgress [0→1]` to `x ['0%'→'-55%']`. Images hover-scale to `1.02` with `grayscale-0` reveal.
- Images: greyscale by default, colour on hover (desktop only).

### 6. Concierge (Contact & Booking Form)
- Background: `bg-surface`.
- Centred, max-width `max-w-2xl`.
- Three fields: name (text), phone (tel), service (select).
- Field style: `bg-transparent border-b border-sage/30`, transitions to `border-gold` on focus.
- Submit: full-width gold fill button; hover shifts to `gold-bright`.
- Success state: animated swap via `AnimatePresence`; gold circle check icon + confirmation copy.
- Error states: field-level (`text-red-400/90`) + form-level alert banner (`border-red-400/40 bg-red-950/30`).
- Footer: location · phone · email, separated by a decorative `copper-pattern` strip.

---

## Navigation

- Fixed, `z-50`.
- **Mobile**: semi-transparent scrim (`bg-bg/72 backdrop-blur-md`) with a bottom border.
- **Desktop**: fully transparent (`md:bg-transparent md:backdrop-blur-none`) with `md:mix-blend-difference` — text inverts against whatever is behind it.
- Logo: "smile." in `font-heading text-2xl lowercase tracking-tighter`. Acts as scroll-to-top.
- Single CTA link: "Zakazivanje" → `#concierge`.

---

## Scroll Progress Bar

- Fixed, `top-0`, height `1px`, `bg-gold`, `z-[100]`.
- Driven by `useScroll` + `useSpring` (stiffness 100, damping 30).
- `origin-left` + `scaleX` transform.

---

## Back-to-Top Button

- Appears after 280px of scroll.
- Fixed, centred at bottom, `z-60`.
- `border border-gold/40 bg-bg/85 backdrop-blur-md`, rounded-full.
- Entrance: `opacity 0→1, y 12→0` over 220ms.
- Contains `ChevronUp` icon + "Na vrh" label.

---

## Custom Cursor

- Active only on pointer-fine devices (`@media (pointer: fine)`).
- `body.custom-cursor-on { cursor: none }` hides the native cursor.
- Component: `src/components/CustomCursor.tsx`.

---

## Motion & Animation

All animation uses **Motion for React** (`motion/react`).

| Pattern | Easing / Config |
|---|---|
| Section reveal (fade + slide) | `duration: 1.5, ease: [0.16, 1, 0.3, 1]` (expo out) |
| Staggered list items | `delay: index * 0.2` |
| Scroll-linked opacity/scale | `useTransform` + `useScroll` |
| Scroll-linked horizontal reel | `useTransform` on `scrollYProgress` |
| Infinite rotate (Heritage bg) | `duration: 100, repeat: Infinity, ease: "linear"` |
| Scroll cue bounce | `duration: 2, repeat: Infinity, ease: 'easeInOut'` |
| Spring scroll bar | `stiffness: 100, damping: 30, restDelta: 0.001` |
| Button press | `whileTap: { scale: 0.98 }` |
| Card hover | `whileHover: { scale: 1.02 }, duration: 0.45` |

**Reduced motion:** `useReducedMotion()` hook in Exhibition disables the video and substitutes a static thumbnail. Prefer `prefers-reduced-motion` awareness on any new animated element.

---

## Textures & Patterns

| Utility | Definition | Usage |
|---|---|---|
| `.copper-pattern` | Inline SVG diamond grid, `fill: #7C8B82`, `fill-opacity: 0.05`, `60px` repeat | Craft panel, Heritage bg, Concierge footer strip |

**Granite noise overlay:** fixed, full-screen `div` at `z-index: -20`, `opacity: 0.03`, using an external transparent-texture PNG. Adds micro-texture depth to the dark background without visual weight.

---

## Images

- All images are sourced from Unsplash (`auto=format&fit=crop&q=80`).
- Default treatment: `grayscale` + reduced `opacity` + `mix-blend-overlay` or `object-cover`.
- Hover treatment (Studio desktop): `grayscale-0 opacity-100 scale-105`, transition `duration-500`.
- Aspect ratios used: `aspect-[3/4]` (Studio mobile), `aspect-[4/5]` (Craft panel), unconstrained full-height (Studio desktop, `h-[min(70vh,36rem)]`).

---

## Accessibility

- All interactive elements carry `focus-visible:outline` or `focus-visible:ring` styles in gold.
- `aria-label` on icon-only buttons and iframe embeds.
- Form fields use `htmlFor` ↔ `id` linking, `aria-invalid`, and `aria-describedby` for error messages.
- Success and error messages use `role="status"` / `role="alert"` respectively.
- Minimum touch target size: `min-h-11` (44px) on mobile interactive elements.
- Language declared as expected `bs` (Bosnian) in `index.html`.

---

## File Map

```
src/
├── index.css              # Tailwind @theme tokens, base layer, utilities
├── App.tsx                # Root layout: nav, scroll bar, back-to-top, section order
├── components/
│   ├── CustomCursor.tsx   # Pointer-fine custom cursor
│   └── ThreeHero.tsx      # WebGL canvas background
└── sections/
    ├── Exhibition.tsx     # Hero: video/image bg + h1 + scroll cue
    ├── Craft.tsx          # Services: text list + decorative panel
    ├── Heritage.tsx       # Philosophy: full-height scroll-driven quote
    ├── Studio.tsx         # Space gallery: mobile snap-scroll / desktop reel
    └── Concierge.tsx      # Booking form + footer
```
