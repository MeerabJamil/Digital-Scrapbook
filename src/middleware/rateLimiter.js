const rateLimit = require("express-rate-limit");

// generous limiter for general API traffic — mostly a safety net against
// runaway clients or accidental infinite loops on the frontend
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests. Please slow down and try again shortly." },
});

// tighter limiter specifically for auth routes, to slow down credential
// stuffing / brute force attempts on login and registration
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many auth attempts. Please try again in a few minutes." },
});

module.exports = { apiLimiter, authLimiter };
