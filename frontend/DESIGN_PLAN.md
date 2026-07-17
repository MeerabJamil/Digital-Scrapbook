# Petal & Page — UI/UX Plan & Architecture

A digital scrapbook & memory journal. This document covers the design system, page-by-page layout, animation catalog, and folder structure behind the delivered React app.

## 1. Design tokens

**Color system** (defined as CSS variables in `src/index.css`, exposed to Tailwind via `@theme`):

| Token | Hex | Use |
|---|---|---|
| `--color-cream` | `#FFF8F1` | page background |
| `--color-cream-deep` | `#FBF0E4` | card / surface background |
| `--color-blush` | `#E9C5C5` | primary accent, tape, mood: Grateful |
| `--color-sage` | `#C8D5B9` | secondary accent, mood: Peaceful |
| `--color-sand` | `#F6E7D8` | tertiary surface |
| `--color-lavender` | `#DCCEF9` | AI companion, mood: Nostalgic |
| `--color-peach` | `#FFD8BE` | mood: Cozy |
| `--color-cocoa` / `--color-cocoa-deep` | `#7A5A45` / `#5C4130` | ink, headings, borders |
| `--color-terracotta` | `#C6704B` | primary buttons, links, active states |
| `--color-gold` | `#E8B84B` | mood: Joyful, highlight sticker |
| `--color-ink` | `#4A3B32` | body text |

**Typography:**
- `font-hand` (Caveat) — big handwritten headings, dates, AI reflections
- `font-tape` (Patrick Hand) — buttons, nav labels, sticker badges, eyebrows
- `font-body` (Quicksand) — default body copy
- `font-utility` (Nunito) — descriptions, captions, data-dense text

**Signature element:** every card looks "placed," not laid out — a deterministic-but-random tilt + washi tape + paper tone per item (see `useRandomTilt`), so no two memory cards are ever identical, and pages reuse a shared `paper-grain` texture instead of flat white.

## 2. Component hierarchy

```
components/
  layout/
    Navbar, AppLayout, AuthShell, Footer
    FloatingDecorations   – ambient drifting emoji layer
    WashiTape, PaperClip  – reusable decorations
  ui/
    Button, Input, Modal, SectionHeading, StickerBadge
    Loading, EmptyState
  scrapbook/
    PolaroidCard, MemoryCard, AlbumBook
    MoodOrb               – glowing AI mascot
    StickerPicker, BrushToolbar
hooks/
  useRandomTilt   – seeded per-id rotation/tape/paper-tone
  useCanvasDraw   – brush/pencil/marker/eraser + undo/redo
data/
  mockData.js     – users, albums, memories, moods, analytics, notifications
pages/
  Landing, Login, Register, ForgotPassword
  Dashboard, Albums, AlbumDetails
  MemoryEditor, MemoryViewer
  AIReflection, MonthlyRecap, Analytics
  Notifications, Profile, AvatarCustomization, Settings
  NotFound
```

## 3. Page layouts (brief)

- **Landing** — animated book-cover hero that flips open on click, feature grid, polaroid preview strip, tilted testimonial notes, gradient CTA banner.
- **Login / Register / Forgot Password** — shared `AuthShell`: a single tilted "page" card with tape in the corners, floating decorations behind it.
- **Dashboard** — greeting + streak, "On This Day" trio, floating AI companion orb with a live reflection snippet, album shelf preview, quick stats row.
- **Albums** — full shelf grid of `AlbumBook`s (book-on-shelf with spine + hover lift) and a "new album" modal.
- **Album Details** — album header + masonry of `MemoryCard`s, each with independent tilt/tape/paper tone; empty state if no memories yet.
- **Memory Editor** — the centerpiece: a fixed-size "page" canvas supporting drag-and-drop stickers/photos/notes, a real `<canvas>` freehand layer (brush/pencil/marker/eraser, color, size, opacity, undo/redo/clear), rotate/remove for the selected element, and a save confirmation toast.
- **Memory Viewer** — single entry rendered as an open journal page with mood sticker, photo, body text, and its AI reflection (if any).
- **AI Reflection** — Sage the owl (glowing `MoodOrb`) plus a feed of reflection cards.
- **Monthly Recap** — stat trio + polaroid montage + a closing note from the AI companion.
- **Analytics** — stacked mood-trend area chart + entries-per-month bar chart (Recharts), restyled with the palette/fonts.
- **Notifications** — sticky-note grid, unread dot indicator.
- **Profile** — avatar, bio, stats, most-felt moods.
- **Avatar Customization** — live circular preview + category pickers (creature, hat, glasses, expression, background).
- **Settings** — folder-tab layout: Account / Privacy / Notifications / Appearance.
- **404** — "this page fell out of the scrapbook," with a link home.

## 4. Animation catalog

| Interaction | Motion |
|---|---|
| Buttons | squish scale on `:active` (`.btn-squish`) |
| Cards | tilt-to-flat + lift on hover (Framer Motion `whileHover`) |
| Landing hero | book cover `rotateY` flip open/closed |
| Decorations | slow ambient float/rotate loop, `prefers-reduced-motion` respected |
| Page transitions | fade + rise on route change (`AppLayout`) |
| AI orb | gentle bob + pulsing glow ring |
| Loading | a single page "turning" via `rotateY` loop |
| Editor elements | spring pop-in on add, live drag via pointer events |

## 5. Notes on scope & extension points

- **Avatars** are composed from layered emoji + a colored background circle rather than illustrated art assets (none were supplied). The picker architecture (`avatarOptions` + `Picker`) is ready to swap in real SVG/PNG layers per category later without changing the page structure.
- **Memory Editor** ships a genuinely working freehand canvas (brush/pencil/marker/eraser, undo/redo, color/size/opacity) plus drag-and-drop stickers, photo placeholders, and editable sticky notes. Resize-by-corner-handle and full asset upload were left out to keep the interaction model simple; the `elements` state array is structured so both are straightforward additions.
- **AI features** (reflections, mood detection, monthly recap) are written against realistic mock data (`src/data/mockData.js`) with the exact shape a real endpoint would need to fill — swapping in a live API means replacing the imports in each page with fetched data.
- Auth pages submit straight to the relevant route (no real backend) — wire up your auth provider of choice in `Login.jsx` / `Register.jsx`'s `handleSubmit`.

## 6. Tech stack used

React 18 · Vite · Tailwind CSS v4 · Framer Motion · React Router · Lucide Icons · Recharts (for Analytics).
