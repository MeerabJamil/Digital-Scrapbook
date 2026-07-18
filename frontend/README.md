# Petal & Page 

A cozy digital scrapbook & memory journal — built with React 18, Vite, Tailwind CSS v4, Framer Motion, React Router, Lucide Icons, and Recharts.

See `DESIGN_PLAN.md` for the full design system, page-by-page breakdown, and architecture notes.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/   reusable layout, ui, and scrapbook-specific components
  hooks/        useRandomTilt, useCanvasDraw
  data/         mock data powering every page
  pages/        one file per route
  App.jsx       routes
  index.css     design tokens + global styles
```

Everything runs on mock data (`src/data/mockData.js`) — no backend required to explore the UI. Swap in real API calls where each page currently imports from that file.

## Backend integration (Week 4)

This is now wired to the [scrapbook-backend](../scrapbook-backend) API for authentication, albums, and memories.

### Setup
1. Copy `.env.example` to `.env` and point `VITE_API_URL` at your running backend (defaults to `http://localhost:5000`).
2. Make sure the backend's `.env` has `CLIENT_ORIGIN=http://localhost:5173` (its default) so CORS allows this dev server.
3. Run the backend (`npm run dev` inside `scrapbook-backend/`), then run this app (`npm run dev`).

### What's connected
- **Auth**: `Login`, `Register`, `Navbar` logout, and route protection (`ProtectedRoute` redirects to `/login` if there's no session) — see `src/context/AuthContext.jsx` and `src/lib/api.js`.
- **Albums**: `Albums` (list + create) and `AlbumDetails` (single album + its memories) fetch live data.
- **Memories**: `MemoryEditor` saves a real memory (title, date, mood, cover emoji, and your written note) alongside its decorative canvas — see note below. `MemoryViewer` fetches and can delete a real memory.
- **Dashboard**: real album list and computed stats (total memories, total albums).

### What's still a preview / not yet wired
- **AI Journal, Monthly Recap, Analytics, Notifications** — these stay on mock data until the AI Memory Companion (Week 5) and Analytics/Notification features (Week 6) are built on the backend.
- **Avatar customization** — currently client-side only; the `User` schema doesn't store avatar choices yet.
- **The decorative canvas in `MemoryEditor`** (stickers, doodles, sticky notes) is a creative layer only — it isn't persisted to the backend yet. What *does* save is the metadata panel above it (title, date, mood, cover emoji, and the note you write). Persisting the full canvas layout would need a new field on the `Memory` schema (e.g. a JSON `pageElements` array) — a good candidate for a later week if it's wanted.

### Data shape notes
The backend stores `mood` as a plain string label (e.g. `"Cozy"`) and `note` as the memory's body text. `src/lib/memoryView.js` adapts a raw API memory into the richer `{ mood: { label, emoji, tone }, excerpt, date }` shape the existing components expect, using the `moods` list in `mockData.js` as the lookup table.
