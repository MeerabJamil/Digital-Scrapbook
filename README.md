# Digital Scrapbook — Backend (Week 2 + Week 3)

**Week 2 deliverable — Authentication & Database Design:**
- Working authentication system (register, login, logout, session management)
- Password hashing with bcrypt, token-based sessions with JWT (sent as an httpOnly cookie)
- Full database schema: `User`, `Album`, `Memory`, `AIInsight`, `MemoryRecap`
- Indexes on the fields that will actually get queried (email lookup, album's memories, "on this day" scans)
- A seed script to validate the schema with real sample data

**Week 3 deliverable — Core Backend APIs & CRUD Operations:**
- Full CRUD REST endpoints for `Album` and `Memory`, the two entities users create and edit directly
- Every album/memory route sits behind `requireAuth` and is scoped to the logged-in user — you can never read or edit someone else's data
- Input validation on every write (required fields, valid dates, non-empty strings) with clean 400 responses
- Centralized error-handling middleware that turns Mongoose errors (bad ObjectId, failed validation, duplicate key) into consistent JSON instead of stack traces
- Basic rate limiting: a general limiter across `/api`, plus a stricter one on `/api/auth` to slow down brute-force login attempts
- Cascading deletes: removing an album removes its memories (and their AI reflections); removing a memory removes its AI reflection — no orphaned documents
- A Postman collection (`scrapbook-backend.postman_collection.json`) covering every endpoint, chained so `album_id` and `memory_id` carry over automatically between requests

## Folder structure

```
scrapbook-backend/
  src/
    config/db.js                     MongoDB connection
    models/                          Mongoose schemas
      User.js
      Album.js
      Memory.js
      AIInsight.js
      MemoryRecap.js
    middleware/
      auth.js                        JWT signing + cookie helper + requireAuth guard
      errorHandler.js                Centralized error handler + 404 fallback
      rateLimiter.js                 apiLimiter + authLimiter (express-rate-limit)
    controllers/
      authController.js              register / login / logout / me
      albumController.js             Album CRUD, scoped to req.user
      memoryController.js            Memory CRUD, ownership proven via its album
    routes/
      authRoutes.js
      albumRoutes.js                 also hosts nested POST/GET .../:albumId/memories
      memoryRoutes.js                single-memory GET/PUT/DELETE
    server.js                        Express app entry point
    seed.js                          Sample-data seeder
  .env.example
  package.json
  scrapbook-backend.postman_collection.json
```

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Copy the environment template and fill in real values:
   ```
   cp .env.example .env
   ```
   - `MONGO_URI`: your local MongoDB URL, or a MongoDB Atlas connection string
   - `JWT_SECRET`: generate one with:
     ```
     node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
     ```

3. Make sure MongoDB is running (locally, or use an Atlas cluster — no local install needed in that case).

4. (Optional) seed sample data to sanity-check the schema:
   ```
   npm run seed
   ```
   Creates a demo user `meerab@example.com` / `password123` with one album and one memory.

5. Start the server:
   ```
   npm run dev
   ```
   Server runs at `http://localhost:5000`.

## Testing the auth endpoints

Using curl (or import into Postman):

```bash
# Register
curl -c cookies.txt -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Meerab","email":"meerab@test.com","password":"password123"}'

# Login
curl -c cookies.txt -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"meerab@test.com","password":"password123"}'

# Check current session (protected route)
curl -b cookies.txt http://localhost:5000/api/auth/me

# Logout
curl -b cookies.txt -X POST http://localhost:5000/api/auth/logout
```

`-c cookies.txt` saves the session cookie; `-b cookies.txt` sends it back on later requests — that's what a browser does automatically when the frontend calls the API with `credentials: "include"`.

## Album & Memory endpoints (Week 3)

All routes below require a logged-in session (send the `token` cookie from login/register).

| Method | Route | Description |
|---|---|---|
| POST | `/api/albums` | Create an album (`title`, `coverPhoto?`) |
| GET | `/api/albums` | List the logged-in user's albums, each with a `memoryCount` |
| GET | `/api/albums/:id` | Get one album |
| PUT | `/api/albums/:id` | Update `title` and/or `coverPhoto` |
| DELETE | `/api/albums/:id` | Delete an album **and** all memories/AI insights inside it |
| POST | `/api/albums/:albumId/memories` | Add a memory to an album (`photo`, `note`, `date`, `mood?`) |
| GET | `/api/albums/:albumId/memories` | List memories in an album, newest first |
| GET | `/api/memories/:id` | Get one memory |
| PUT | `/api/memories/:id` | Update `photo` / `note` / `date` / `mood` |
| DELETE | `/api/memories/:id` | Delete a memory and its linked AI insight, if any |

Every route double-checks ownership: albums are matched against `{ _id, user: req.user._id }`, and since a `Memory` only points at an `Album` (not a `User`) directly, memory routes look up the memory's parent album first and reject anything that doesn't belong to the logged-in user — you get a `404`, not a `403`, so you can't even confirm another user's album/memory exists.

### Testing with Postman

Import `scrapbook-backend.postman_collection.json`, enable the cookie jar (Settings → General → "Automatically follow redirects" area has the cookie toggle, or just make sure "Send cookies" is on for the domain), then:
1. Run **Auth → Register** (or **Login**) once — the session cookie persists for the rest of the collection.
2. Run **Albums → Create Album** — it auto-saves the new album's id into the `album_id` collection variable.
3. Run any **Memories** request — `album_id` is already filled in, and **Create Memory** auto-saves `memory_id` the same way.

### Testing with curl

```bash
# (after registering/logging in with -c cookies.txt as shown above)

# Create an album
curl -b cookies.txt -X POST http://localhost:5000/api/albums \
  -H "Content-Type: application/json" \
  -d '{"title":"First Year in Lahore"}'

# Add a memory to it (replace ALBUM_ID)
curl -b cookies.txt -X POST http://localhost:5000/api/albums/ALBUM_ID/memories \
  -H "Content-Type: application/json" \
  -d '{"photo":"https://picsum.photos/seed/lahore1/400/400","note":"Rooftop café near Anarkali.","date":"2025-08-14"}'

# List albums / memories
curl -b cookies.txt http://localhost:5000/api/albums
curl -b cookies.txt http://localhost:5000/api/albums/ALBUM_ID/memories
```

## Weekly Progress Log

### Week 1 — Planning & Environment Setup
- Finalized project idea: Digital Scrapbook & Memory Journal
- Submitted project proposal (AI Memory Companion as the core AI feature)
- Proposal revised and strengthened per Domain Head feedback

### Week 2 — Authentication & Database Design
- Designed and implemented `User`, `Album`, `Memory`, `AIInsight`, `MemoryRecap` schemas
- Built JWT + bcrypt authentication: register, login, logout, session check (`/api/auth/me`)
- Added indexes for the actual query patterns (email lookup, album's memories, date scans)
- Wrote a seed script to validate the schema with real sample data

### Week 3 — Core Backend APIs & CRUD Operations
- Full CRUD REST endpoints for `Album` and `Memory`, both scoped to the logged-in user
- Nested routes for creating/listing memories within an album (`/api/albums/:albumId/memories`)
- Input validation on every write endpoint, with clean 400 responses
- Centralized error-handling middleware (bad ObjectIds, Mongoose validation errors, duplicate keys)
- Rate limiting: general limiter on `/api`, stricter limiter on `/api/auth`
- Cascading deletes so removing an album/memory never leaves orphaned data behind
- Postman collection covering every endpoint, chained with variables for one-pass testing

## What's next (Week 4 per roadmap)

An interactive dashboard and responsive frontend (React 18 + TailwindCSS) connected to these live endpoints — albums and memories rendered in the scrapbook-style UI already designed, with loading and error states wired to the API's JSON error shape (`{ message: "..." }`).
