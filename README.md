# Digital Scrapbook — Backend (Week 2: Authentication & Database Design)

This covers the Week 2 deliverable from the Tynovate roadmap:
- Working authentication system (register, login, logout, session management)
- Password hashing with bcrypt, token-based sessions with JWT (sent as an httpOnly cookie)
- Full database schema: `User`, `Album`, `Memory`, `AIInsight`, `MemoryRecap`
- Indexes on the fields that will actually get queried (email lookup, album's memories, "on this day" scans)
- A seed script to validate the schema with real sample data

## Folder structure

```
scrapbook-backend/
  src/
    config/db.js           MongoDB connection
    models/                 Mongoose schemas
      User.js
      Album.js
      Memory.js
      AIInsight.js
      MemoryRecap.js
    middleware/auth.js       JWT signing + cookie helper + requireAuth guard
    controllers/authController.js   register / login / logout / me
    routes/authRoutes.js
    server.js                Express app entry point
    seed.js                  Sample-data seeder
  .env.example
  package.json
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

## What's next (Week 3 per roadmap)

Full CRUD REST endpoints for Album and Memory, built on top of this auth system and the `requireAuth` middleware already in place.
