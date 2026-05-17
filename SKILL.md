---
name: vivienbeduya-design-system
description: Use this skill when working on or extending the vivienbeduya/bisayabanter codebase — a Next.js 16 + React 19 + Sanity CMS v4 + Linaria + FlightDeck site. Covers the live design tokens (colours, type, spacing), the responsive unit system (rwd / rwm / rw), and the atoms/molecules/organisms/blocks component conventions. Read README.md and `src/app/(site)/style.linaria.global.tsx` first if you need to verify any specific token before writing code.
user-invocable: true
---

# vivienbeduya — Design System Reference

> **Source of truth:** `src/app/(site)/style.linaria.global.tsx`. Anything in this document is a mirror of what's defined there. If they disagree, the file wins — update this doc.

## Stack

| Layer | Library |
|---|---|
| Framework | Next.js 16 (App Router, Server Components default) |
| UI | React 19 |
| CMS | Sanity v4 + next-sanity 11 + FlightDeck plugin |
| Styling | **Linaria 6** (zero-runtime CSS-in-JS — `styled` from `@linaria/react`) |
| PostCSS | FlightDeck plugin with `baseBreakpoint: 768` |
| Fonts | `next/font/google` — Outfit (body) + Tilt Warp (display) |
| Smooth scroll | Lenis 1.3 |

Tokens, base styles, and global utility classes live in **one file**: `src/app/(site)/style.linaria.global.tsx`. **Do not create new global CSS files.**

---

## 1 · Colour tokens

All colours are CSS custom properties on `body`. **Never write a hex inline** — always reference a semantic token. Components must reach for `--color-*` semantic tokens only; raw palette tokens (`--deep-teal`, `--bark-800`, etc.) are referenced only inside `style.linaria.global.tsx`.

### Raw palette

| Token | Hex | OKLCH | Role |
|---|---|---|---|
| `--deep-teal` | `#00695c` | oklch(45% 0.077 188) | Mindanao inland · primary brand |
| `--deep-teal-hover` | `#005548` | oklch(40% 0.080 188) | Hover / pressed state |
| `--coastal-teal` | `#299d8f` | oklch(63% 0.088 184) | Visayas coast · accent / decorative |
| `--coastal-teal-hover` | `#1a8a7d` | oklch(58% 0.095 184) | Hover / pressed state |
| `--forest-700` | `#2e5e3e` | oklch(38% 0.070 155) | Inland green · dark surface alt |
| `--sand-200` | `#d9c6a1` | oklch(88% 0.040 78) | Beach-moment surface |
| `--sand-300` | `#c9af82` | oklch(82% 0.055 76) | Sand hover / pressed |
| `--cream-50` | `#f4f1ec` | oklch(97% 0.012 85) | Default page bg |
| `--cream-100` | `#ece8df` | oklch(95% 0.018 82) | Elevated cards |
| `--cream-200` | `#e0d9ce` | oklch(91% 0.025 80) | Hover bg · dividers |
| `--mist-50` | `#eef4f3` | oklch(96% 0.018 188) | Teal-tinted alternate section bg |
| `--mist-100` | `#e4edeb` | oklch(93% 0.025 188) | Mist hover |
| `--bark-700` | `#2c413f` | oklch(36% 0.025 185) | Secondary text · captions |
| `--bark-800` | `#0e1d1a` | oklch(24% 0.022 185) | Primary body text |
| `--bark-900` | `#050e0d` | oklch(15% 0.018 185) | Maximum contrast |
| `--stone-400` | `#a8a293` | oklch(68% 0.014 80) | Borders · muted text · hr |
| `--brick-600` | `#8b2120` | oklch(40% 0.12 20) | Error state |
| `--amber-600` | `#8a5c00` | oklch(52% 0.13 65) | Warning state |

> **Bark is text-only.** Never use any `--bark-*` token as a background. Dark surfaces must use `--color-bg-inverted` (deep teal) or `--color-bg-inverted-alt` (forest).

### Semantic tokens

#### Surfaces

| Token | Points at | Used for |
|---|---|---|
| `--color-bg` | `--cream-50` | Default page background |
| `--color-bg-elevated` | `--cream-100` | Cards on cream, modals |
| `--color-bg-recessed` | `--cream-200` | Hover backgrounds, divider zones |
| `--color-bg-mist` | `--mist-50` | Teal-tinted alternate section bg |
| `--color-bg-warm` | `--sand-200` | Beach-moment section bg |
| `--color-bg-inverted` | `--deep-teal` | Dark surfaces: header, hero, CTA bars |
| `--color-bg-inverted-alt` | `--forest-700` | Second dark surface option |

#### Text

| Token | Points at | Used for |
|---|---|---|
| `--color-fg` | `--bark-800` | Default body text on all light surfaces |
| `--color-fg-muted` | `--bark-700` | Secondary text, captions, metadata |
| `--color-fg-subtle` | `color-mix(in oklch, var(--bark-700) 55%, transparent)` | Placeholder, disabled states |
| `--color-fg-on-dark` | `--cream-50` | All text on dark / inverted surfaces |

#### Brand & interaction

| Token | Points at | Used for |
|---|---|---|
| `--color-accent` | `--deep-teal` | Primary CTA fill, focus rings |
| `--color-accent-hover` | `--deep-teal-hover` | Hover / pressed state of accent |
| `--color-link` | `--deep-teal` | Inline body-text links (AA on cream) |
| `--color-link-hover` | `--deep-teal-hover` | Inline link hover |
| `--color-tag` | `--forest-700` | Tags, eyebrows, category labels |
| `--color-highlight` | `--coastal-teal` | Decorative highlights, bilingual marks — AA-Large / decorative only |

#### Borders & rules

| Token | Points at | Used for |
|---|---|---|
| `--color-border` | `color-mix(in oklch, var(--bark-700) 14%, transparent)` | Subtle dividers, input borders |
| `--color-border-strong` | `color-mix(in oklch, var(--bark-700) 28%, transparent)` | Prominent borders |
| `--color-rule` | `--stone-400` | hr elements, section dividers |
| `--color-text-muted` | `--stone-400` | Footer muted text, copyright |

#### Status

| Token | Points at | Used for |
|---|---|---|
| `--color-error` | `--brick-600` | Form validation errors, destructive actions |
| `--color-success` | `--forest-700` | Success states |
| `--color-warning` | `--amber-600` | Warning states |
| `--color-info` | `--coastal-teal` | Informational indicators (decorative / AA-Large only) |

#### Gradients

| Token | Value | Used for |
|---|---|---|
| `--gradient-button` | `linear-gradient(90deg, var(--deep-teal), var(--coastal-teal), var(--forest-700))` | `.design` button gradient border |
| `--gradient-footer` | `linear-gradient(-45deg, var(--deep-teal), var(--coastal-teal), var(--sand-200))` | Footer animated background |

### Approved foreground / background pairings

| Background | Foreground | Contrast | WCAG | Notes |
|---|---|---|---|---|
| `--color-bg` (#f4f1ec) | `--color-fg` (#0e1d1a) | ~14:1 | AAA | Default body |
| `--color-bg` (#f4f1ec) | `--color-accent` / `--color-link` (#00695c) | ~5.3:1 | AA | CTAs, links |
| `--color-bg` (#f4f1ec) | `--color-tag` (#2e5e3e) | ~5.9:1 | AA | Tags, eyebrows |
| `--color-bg` (#f4f1ec) | `--color-highlight` (#299d8f) | ~2.8:1 | **AA-Large only** | Decorative marks |
| `--color-bg` (#f4f1ec) | `--color-error` (#8b2120) | ~7.1:1 | AAA | Error text |
| `--color-bg` (#f4f1ec) | `--color-warning` (#8a5c00) | ~5.2:1 | AA | Warning text |
| `--color-bg-inverted` (#00695c) | `--color-fg-on-dark` (#f4f1ec) | ~5.3:1 | AA | Header, dark blocks |
| `--color-bg-inverted-alt` (#2e5e3e) | `--color-fg-on-dark` (#f4f1ec) | ~5.9:1 | AA | Forest dark blocks |
| `--color-bg-warm` (#d9c6a1) | `--color-fg` (#0e1d1a) | ~9.5:1 | AAA | Sand sections |
| `--color-bg-mist` (#eef4f3) | `--color-fg` (#0e1d1a) | ~14:1 | AAA | Mist sections |

> **`--color-highlight` rule:** Coastal teal (#299d8f) fails WCAG AA for body-sized text on cream. Approve only for: inline bilingual marks, decorative pull-quote accents, icons, and text ≥ 24px or ≥ 18.7px bold.

> **Footer gradient:** No single text colour passes AA across all three animated stops. A `::before` overlay (`oklch(45% 0.077 188 / 0.55)`) is applied in `footer.tsx` to keep cream text readable throughout the animation.

---

## 2 · Typography

### Families

```css
--font-primary:   "Outfit", Arial, system-ui, "Open Sans", sans-serif;
--font-secondary: "Tilt Warp", Arial, system-ui, "Open Sans", sans-serif;
```

Loaded via `next/font/google` in `src/app/(site)/layout.tsx`:
- **Outfit** at weights 300 / 400 / 600 / 700 — body, UI, paragraphs.
- **Tilt Warp** at weight 400 — all headings (`h1`–`h6`) get `font-family: var(--font-secondary)` automatically.

### Weights

| Token | Value |
|---|---|
| `--font-weight-light` | 300 (body default) |
| `--font-weight-regular` | 400 (headings) |
| `--font-weight-bold` | 600 |

The Outfit font is loaded with weight `700` available but **no token references it** — use `600` (bold token) for emphasis; do not write `700` inline.

### Scale

Heading line-height is **`1` (global rule)**. Body line-height inherits from `body` (1.5). Always apply size via class on JSX (`className="h3"`) — **do not duplicate font-size in styled components**.

| Class / element | Desktop (`rwd`) | Mobile (`rwm`) | Line-height |
|---|---|---|---|
| `.h1` / `h1` | 59 | 36 | 1 |
| `.h2` / `h2` | 56 | 32 | 1 |
| `.h3` / `h3` | 40 | 28 | 1 |
| `.h4` / `h4` | 30 | 24 | 1 |
| `.h5` / `h5` | 24 | 20 | 1 |
| `.h6` / `h6` | 18 | 16 | 1 |
| `.p` / `p` | 17 | 14 | 1.5 (inherited) |
| `body` default | 17 | 15 | 1.5 |
| `.small` / `small` | 13 | 15 | 1 |
| Footer nav title | 14 | 14 | inherited |
| Hr / footer copyright | 13 | 13 | inherited |

**AGENTS.md describes an extended scale** (`.display-lg`, `.display`, `.p-big`, `.p-small`, `.caption`, `.cta`) for *future* Figma-token integration. Those classes are **not yet present** in `style.linaria.global.tsx`. Do not assume they exist — only use the table above.

### Editorial pattern — bilingual translation marks

EN ↔ Bisaya pairing uses the `.translation-mark` system (see `molecules/translationMark.tsx`). The translated state animates in italic with a 0.6s fade-up:

```css
.translation-mark__translated {
  font-style: italic;
  animation: translation-reveal 0.6s ease-out forwards;
}
```

Don't reinvent — wrap inline text in the existing component.

---

## 3 · Layout, spacing, breakpoints

### Breakpoint

**Single breakpoint** at **768px** (configured in `postcss.config.js`). Two PostCSS-generated media queries:

```css
@media --base-down { /* < 768px — mobile */ }
@media --base-up   { /* ≥ 768px — desktop */ }
```

There is **no tablet breakpoint**. If you need one, you must change `baseBreakpoint` in `postcss.config.js` and update `mobileBreakpoint` in `src/utils/constants.ts` together.

### Responsive units (FlightDeck PostCSS)

`rwd`, `rwm`, and `rw` are **custom units that scale linearly with the viewport** below the breakpoint. Treat them as the *only* spacing/size unit in component CSS.

| Unit | Use when | At 1440px viewport, `40rwd` ≈ |
|---|---|---|
| `rwd` | Sizes that should scale on **desktop** viewports (≥768px). | 40px at 1440 reference; scales between viewport sizes. |
| `rwm` | Sizes that should scale on **mobile** viewports (<768px). | n/a — applies in `@media --base-down`. |
| `rw` | Same value across both — use sparingly, prefer the explicit pair. | Same px regardless of viewport. |

**Pattern:** declare desktop value with `rwd` in the base block; override with `rwm` inside `@media --base-down` for mobile.

```typescript
const Block = styled.section`
  padding: 64rwd var(--theme-page-horizontal-padding);
  gap: 24rwd;

  @media --base-down {
    padding: 32rwm var(--theme-page-horizontal-padding);
    gap: 16rwm;
  }
`;
```

### Spacing scale (observed in codebase)

There is no formal token scale — but values cluster around an 8-based system. Stick to these unless you have a reason:

```
4   8   12   16   24   32   48   64
```

For padding/gap/margin, use a value from this list converted to `rwd` (desktop) and `rwm` (mobile). Do not introduce `7rwd`, `19rwd`, etc.

### Layout tokens

| Token | Desktop | Mobile | Role |
|---|---|---|---|
| `--header-height` | `72rwd` | `68rwm` | Fixed header reservation. |
| `--theme-page-horizontal-padding` | `32rwd` | `16rwm` | Page gutters. Use for every full-width block. |

`main` has `padding-bottom: 32rwd` applied globally.

### Borders & radii

- No global radius token. Observed values: **`8px`** on `.button.design` (kept in `px` because it's tiny — fine), **`6rwm`** on the same button at mobile.
- Border-bottom inputs: `1px solid var(--color-white)`.
- Hairlines: `1px solid grey` (footer top) / `border-color: #9FA6A2` (hr).

### Shadows / hover

- **Card hover:** `box-shadow: 0 4rwd 20rwd rgba(0, 0, 0, 0.2); transform: translateY(-2rwd); transition: 0.35s ease;`
- **Default `a` / `button` hover:** `color: var(--color-yellow)` (see inconsistency note).
- **`.design` button** has its own animated peek-out using `transform: translate(-4rwd, -4rwd)` on `::after` + children, reverting on `:active`.

---

## 4 · Components

### Naming + folder convention

```
src/components/
├── atoms/        # image.tsx, icon.tsx, link.tsx, altText.tsx
├── molecules/    # accordion, ctaCard, richText, sharing, postTitle, translationMark, etc.
├── organisms/    # header/{header,nav}.tsx, footer.tsx, klaviyoProvider, smoothScroll
└── blocks/       # CMS-driven blocks. registered in blocks/blocks.tsx
```

- **Atoms** = single-element wrappers (image, link, icon).
- **Molecules** = two or more atoms composed for one purpose (rich text, accordion, CTA card).
- **Organisms** = layout-level constructs (header, footer).
- **Blocks** = full-width content blocks driven by Sanity, registered in `src/components/blocks/blocks.tsx`. Add new blocks via the 6-step process in `README.md`.

### Mandatory component pattern

From `AGENTS.md`:

```tsx
"use client"; // only if needed (hooks, browser APIs)

import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import { styled } from "@linaria/react";

interface Props {
  data?: Sanity.SomeType;
  className?: string;
}

export const ComponentName = ({ data, className }: Props): JSX.Element | null => {
  if (!data) return null;

  return (
    <Wrapper className={mergeClassNames("component-name", className)}>
      {/* content */}
    </Wrapper>
  );
};

// ============================================
// STYLED COMPONENTS (always after main component)
// ============================================

const Wrapper = styled.div`
  position: relative;
`;
```

**Rules — all from AGENTS.md, enforced across the codebase:**

| Rule | Reason |
|---|---|
| **Named exports only** (default exports only for Next.js routes like `page.tsx`, `layout.tsx`, `route.ts`). | Tree-shaking + grep-ability. |
| **Explicit return types** on functions. Never `any`. | Caught in `lint-ts`. |
| **Function components**, no classes. | React 19 idiom. |
| **Early returns** on missing data (`if (!data) return null`). | Removes nested `?.` chains. |
| **Apply typography via `className`**, not by re-declaring font-size in a styled component. | One source of truth in `style.linaria.global.tsx`. |
| **Avoid mini styled components** with one or two declarations — apply via parent's nested selector instead. | Less file noise. |
| **Styled components below** the main component, separated by the comment banner. | Reading order: component first, presentation second. |
| **`mergeClassNames(...)`** to combine className strings — never raw template literals. | Handles undefined and falsy entries safely. |
| **`Sanity.*` types** are auto-generated by `yarn typegen` — never hand-write them, never use `any`. | Stay in sync with schema. |
| **Server components by default**; opt in to `"use client"` only for hooks / browser APIs / interaction state. | Performance. |
| **`data-sanity-path` and `data-sanity-editable`** on every editable element in CMS-driven components. | Live preview. |

### Established component patterns

#### Pattern A — Wrapper + nested classes (preferred over many styled subcomponents)

```tsx
// molecules/ctaCard.tsx
<Wrapper className="cta-card">
  <div className="cta-image-area">…</div>
  <div className="cta-content-area">
    <h3 className="cta-title h4">{data.title}</h3>
    <RichText data={data.content} className="cta-description" />
  </div>
</Wrapper>

const Wrapper = styled.div`
  .cta-image-area { width: 100%; height: 220rwd; }
  .cta-content-area { display: flex; flex-direction: column; gap: 16rwd; }
  .cta-title {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  @media --base-down { … }
`;
```

#### Pattern B — Stateful, multi-element card

```tsx
// blocks/articlesList/articleCard.tsx — bilingual hover swap
const [hovered, setHovered] = useState(false);
const showAlt = hovered && hasAlt;
// Two FadeLayers share a single CSS grid cell so the row height
// is the max of either content variant; opacity toggles between them.
```

This is the **bilingual card pattern** — read it before building any card that needs to show alternate text on hover.

#### Pattern C — Design button (the brand CTA)

```tsx
<Link data={{ slug }} className="violet design">Read more</Link>
```

The global `.button.design` class in `style.linaria.global.tsx` handles the gradient border, peek-out hover, and the violet variant. **Do not re-implement this button** — apply the existing classes.

Modifier classes: `.design.violet`, `.design.full-width`.

### Helper imports

```tsx
import { mergeClassNames } from "@flight-digital/flightdeck/helpers";
import useHasScrolled from "@flight-digital/flightdeck/hooks/useHasScrolled";
import useScrollDirection from "@flight-digital/flightdeck/hooks/useScrollDirection";
import SanityIcon from "@flight-digital/flightdeck/pebbles/sanityIcon";
import ThemeClasses from "@flight-digital/flightdeck/pebbles/themeClasses";
```

Path alias `@/` resolves to `src/` (via `tsconfig.json` paths). Always import internal code via `@/components/...`, never relative `../../components`.

---

## 5 · Utility classes (global, from `style.linaria.global.tsx`)

| Class | What it does |
|---|---|
| `.h1`–`.h6`, `.p`, `.small` | Typography size aliases (applies size + line-height pair). |
| `.button.design` | Brand CTA with peek-out gradient border. |
| `.button.design.violet` | Inverted-on-hover variant. |
| `.button.design.full-width` | Stretch to container. |
| `.translation-mark*` | Bilingual translation toggle + italic reveal animation. |
| `.visually-hidden` | Screen-reader-only content. |
| `.card-hidden-link` | Full-card click target. See `molecules/ctaCard.tsx`. |
| `.error-message` | Centred, red, 14rw error text. |
| `.desktop-only` | `display: none` below the breakpoint. |
| `.mobile-only` | `display: none` at and above the breakpoint. |
| `.popup-content` | Modal/popup wrapper preset. |

---

## 6 · File / folder conventions

```
src/
├── app/
│   ├── (site)/[[...slug]]/page.tsx       # dynamic page route
│   ├── (site)/[[...slug]]/not-found.tsx
│   ├── (site)/preview/page.tsx           # Sanity draft preview
│   ├── (site)/layout.tsx                 # site shell + font loading
│   ├── (site)/style.linaria.global.tsx   # ★ ALL DESIGN TOKENS LIVE HERE
│   ├── admin/[[...index]]/page.tsx       # embedded Sanity Studio
│   ├── admin/[[...index]]/studio.tsx
│   ├── api/revalidate-path/route.ts
│   ├── favicon.ico
│   ├── layout.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/{atoms,molecules,organisms,blocks}/
├── hooks/
├── lib/sanityClient.ts                   # the sanityFetch you import everywhere
├── queries/{_general,blocks,navigation,pages}.ts
├── sanity/{schemas,components,lib}/
├── templates/{page,article}.tsx          # per-page-type rendering
└── utils/constants.ts                    # blocksTypes, allPageTypes, primitiveBlocksTypes
```

**Naming:** files are `camelCase.tsx` for components, `camelCase.ts` for non-component modules. Block folders use plural names (`articlesList/`). Schemas under `src/sanity/schemas/blocks/yourBlock.ts` (singular noun).

---

## 7 · Adding new things (canonical sequences)

### A new colour
1. Add the raw token to the raw palette block in `body { }` in `src/app/(site)/style.linaria.global.tsx`.
2. Add a semantic token that points at it (or confirm an existing semantic token covers the use case).
3. Update the `SKILL.md` tables (raw palette + semantic + pairing).
4. Verify contrast for every pairing you'll ship — refuse to ship AA failures for body-sized text.

### A new typography size
1. Add the class to `style.linaria.global.tsx` (desktop block, then mobile inside `@media --base-down`).
2. If it should be available in Sanity rich text: extend `defRichTextFields` in `src/utils/constants.ts` and re-deploy GraphQL types (`yarn typegen`).
3. Apply via `className="…"` on the JSX node — never duplicate the size in a styled component.

### A new block (full pipeline — from README.md)
1. Sanity schema in `src/sanity/schemas/blocks/yourBlock.ts`.
2. Screenshot to `src/sanity/assets/`, referenced from the schema.
3. Register in `src/sanity/schemas/index.ts`.
4. Add `_type` string to `blocksTypes` array in `src/utils/constants.ts`.
5. GROQ fragment in `src/queries/blocks.ts`.
6. React component in `src/components/blocks/yourBlock.tsx` (named export, Linaria styles below).
7. Register in `src/components/blocks/blocks.tsx`.
8. Run `yarn typegen` so `Sanity.YourBlock` exists.

### A new page type
1. Schema in `src/sanity/schemas/pages/yourType.ts`.
2. Register in `src/sanity/schemas/index.ts`.
3. Add to `allPageTypes` in `src/utils/constants.ts`.
4. Extend `pageFields` in `src/queries/pages.ts`.
5. New template in `src/templates/yourType.tsx` and map in `TemplateRenderer` (otherwise it falls back to `page.tsx`).

### A new primitive block (used inside grids / containers)
1. Object schema in `src/sanity/schemas/objects/yourObject.ts`.
2. Register in `src/sanity/schemas/index.ts`.
3. Add to `primitiveBlocksTypes` in `src/utils/constants.ts`.
4. GROQ fragment to `primitiveBlocksFields` in `src/queries/blocks.ts`.
5. Component in `src/components/molecules/yourComponent.tsx`.
6. Register in `src/components/blocks/primitiveBlocks.tsx`.

---

## 8 · Hard constraints

The codebase enforces these — Cursor / agents should treat them as guardrails.

- ✅ **All sizes** in `rwd` (desktop) or `rwm` (mobile). **Never `px`** except in `1px` borders / `8px` button radius / similar hairline values that don't need to scale.
- ✅ **All colours** via `var(--color-…)`. Inline hex is a code review block.
- ✅ **All typography** via global classes (`.h1`–`.h6`, `.p`, `.small`). Styled components only set non-typography styles (colour, spacing, layout).
- ✅ **Server components by default.** `"use client"` requires a hook, ref, or DOM event handler — nothing else.
- ✅ **`mergeClassNames`** for combining classes — never raw template literals with `?` falsies.
- ✅ **`@/` import alias** — no `../../..`.
- ❌ **No emoji** in code unless the user requests them.
- ❌ **No default exports** outside Next.js routing files.
- ❌ **No `any`** — use `Sanity.*` types from `sanity-types.d.ts` (regenerated by `yarn typegen`).
- ❌ **No mini styled components.** One- or two-rule styles go on the parent via nested class selectors.
- ❌ **No new global stylesheets.** Everything global lives in `style.linaria.global.tsx`.
- ❌ **No skipping `data-sanity-*` attributes** on editable CMS-driven elements — they break live preview.

---

## 9 · Quick contrast / pairing reference

When laying out a new block, pick from this set and the result will look on-brand:

| Surface | Use for | Foreground |
|---|---|---|
| `--color-bg` (cream) | Default editorial reading | `--color-fg` |
| `--color-bg-inverted` (deep teal) | Header, hero, CTA bar | `--color-fg-on-dark` |
| `--color-bg-inverted-alt` (forest) | Second dark surface | `--color-fg-on-dark` |
| `--color-bg-warm` (sand) | Beach-moment sections | `--color-fg` |
| `--color-bg-mist` (pale teal) | Breathing alternate sections | `--color-fg` |
| Article card title (inline highlight) | Mark links / titles | `--color-fg-on-dark` on `--color-accent`, with `padding: 0 8rwd` and `box-decoration-break: clone` |
