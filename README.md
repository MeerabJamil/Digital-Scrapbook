# Digital Scrapbook — "Petal & Page" 📔

A cozy digital scrapbook & memory journal, built for the Tynovate AI + Web Development Internship 2026.

This repo holds both halves of the project:

```
Digital-Scrapbook/
  backend/     Node.js + Express + MongoDB API — auth, database, CRUD endpoints
  frontend/    React 18 + Vite + Tailwind — the "Petal & Page" scrapbook UI
```

See each folder's own `README.md` for setup instructions, API reference, and weekly progress logs.

## Quick start

**Backend:**
```bash
cd backend
npm install
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET
npm run dev             # runs at http://localhost:5000
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env    # defaults to pointing at http://localhost:5000
npm run dev              # runs at http://localhost:5173
```

Run both at the same time (two terminals) to use the full app locally.

## Weekly progress

| Week | Deliverable | Details |
|---|---|---|
| 1 | Planning & environment setup | Proposal, architecture, project skeleton |
| 2 | Authentication & database design | `backend/README.md` |
| 3 | Core backend APIs & CRUD | `backend/README.md` |
| 4 | Dashboard & frontend integration | `backend/README.md` + `frontend/README.md` |

## Project idea

An AI-powered digital scrapbook where users collect "memories" (photo + note + date) into themed albums, with an AI Memory Companion that generates gentle reflections, detects mood automatically, and writes monthly recaps — plus analytics on memory/mood trends and "on this day" reminders.
