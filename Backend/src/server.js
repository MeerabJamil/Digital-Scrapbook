require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const albumRoutes = require("./routes/albumRoutes");
const memoryRoutes = require("./routes/memoryRoutes");
const { apiLimiter, authLimiter } = require("./middleware/rateLimiter");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true, // allow the auth cookie to be sent/received
  })
);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// general safety-net limiter on all API traffic, plus a tighter one
// specifically on auth to slow down brute force login/register attempts
app.use("/api", apiLimiter);
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/memories", memoryRoutes);

// fallback 404 for anything else under /api
app.use("/api", notFound);

// centralized error handler — must be registered last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
