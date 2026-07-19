# Nexrow, documentation site

A single-page documentation site for **Nexrow** (single-link USDC escrow for cross-border freelancers).

Next.js (App Router) + TypeScript + Tailwind. Static, no backend, no database.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. (If port 3000 is busy, Next will pick the next free port and print it.)

```bash
npm run build && npm run start   # production build
```

## Where to edit the content

**All copy lives in [`content/content.ts`](content/content.ts).** Nothing in `app/` or `components/` hardcodes prose, so that one file is the only place you need to touch to change what the site says.

It exports:

- `site` — product name, tagline, footer thesis line.
- `sections` — the 17 documentation sections, in sidebar order.
- `groupOrder` — the four sidebar category labels (Thesis, Product, Plan, Analysis & Pitch).

Each section is `{ id, navLabel, title, summary, group, blocks }`. A `block` is a typed, discriminated union, so TypeScript tells you if a block is malformed. Adding a `heading` to any block gives it an `h3` anchor and puts it in the right-hand "On this page" outline.

| Block `kind`  | Renders as                                            |
| ------------- | ----------------------------------------------------- |
| `lead`        | Large intro paragraph                                 |
| `prose`       | Body paragraphs                                       |
| `bullets`     | Bulleted list                                         |
| `qa`          | Numbered question and answer cards (The Ten Questions)|
| `callout`     | Admonition with a left accent border (`info`, `warning`, `key`) |
| `definitions` | Term / detail rows (goals, requirements, glossary)    |
| `cards`       | Two-up cards (personas, architecture components)      |
| `code`        | Monospace block (the state machine)                   |
| `table`       | Responsive comparison matrix, scrolls sideways on mobile |
| `dataModel`   | Field / type / notes table                            |
| `stepper`     | Numbered flow (UX flows, 14-day build map)            |
| `okr`         | Objectives with key results as stat chips             |
| `roadmap`     | Now / Next / Later badged columns                     |
| `slides`      | Numbered pitch-deck cards                             |

To add a section, append to `sections`. The sidebar, the outline, and the IntersectionObserver that drives active-section highlighting all derive from that array, so nothing else needs updating.

## Structure

```
app/
  layout.tsx      Fonts, metadata, and the no-flash theme script
  page.tsx        Assembles header, sidebar, sections, outline, footer
  globals.css     Design tokens (CSS variables) + the Nexrow gradient
  icon.svg        Favicon
components/
  Providers.tsx   Active-heading IntersectionObserver + mobile drawer state
  Header.tsx      Wordmark, theme toggle, hamburger
  Sidebar.tsx     Grouped nav, gradient active indicator
  OnThisPage.tsx  Right-hand outline, hidden below lg
  Section.tsx     Section wrapper, maps blocks to components
  blocks.tsx      Callout, QA, ComparisonTable, StatChip, Stepper, Slides, Roadmap, ...
  AnchorHeading.tsx  Headings with copy-link-on-hover
  Hero.tsx, Footer.tsx, ThemeToggle.tsx
content/content.ts   Every word on the site
lib/toc.ts           Derives heading ids and the outline from the content
```

## Theming

Light and dark share one structure. Every color is a CSS variable in `app/globals.css`; the two themes only swap values, so a new surface or text color is defined once.

- Dark mode is a `dark` class on `<html>` (Tailwind's `class` strategy).
- The preference is saved to `localStorage` under `nexrow-theme`, and falls back to `prefers-color-scheme` on a first visit.
- An inline script in `<head>` (`app/layout.tsx`) sets the class **before paint**, so there is no flash of the wrong theme.

### The brand gradient

The gradient (violet → indigo → electric blue → cyan) is the single expressive accent, defined as `.nx-gradient`, `.nx-gradient-text`, and `.nx-gradient-radial` in `globals.css`. It carries the wordmark, the hero heading, the primary CTA, the active nav indicator, section-heading rules, and the left border of key-insight callouts.

Body copy and links stay neutral or use a **solid** accent picked from the gradient, never gradient text at small sizes, so contrast holds up: `#764CFF` on white is 4.9:1 and `#9A6EFF` on `#0a0a0d` is 5.6:1, both above WCAG AA.

## Accessibility

Semantic headings, keyboard-navigable nav, a skip-to-content link, visible focus rings, `aria-current` on the active sidebar and outline links, and `prefers-reduced-motion` support. The comparison table uses real `<th>` scopes and scrolls horizontally rather than overflowing the page.

## House style

No em dashes in body copy. Use commas, colons, parentheses, or separate sentences.
