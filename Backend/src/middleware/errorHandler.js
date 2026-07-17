// fallback for any /api route that doesn't match a defined endpoint
function notFound(req, res) {
  res.status(404).json({ message: "Route not found." });
}

// Centralized error handler. Controllers call next(err) instead of
// building their own try/catch response for every failure mode — this
// turns raw Mongoose errors into clean, consistent JSON instead of a
// stack trace leaking to the client.
function errorHandler(err, req, res, next) {
  console.error(err);

  // invalid ObjectId in a route param, e.g. GET /api/albums/not-a-real-id
  if (err.name === "CastError") {
    return res.status(400).json({ message: `Invalid ${err.path}: ${err.value}` });
  }

  // mongoose schema validation failed (required field missing, maxlength, etc.)
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(" ") });
  }

  // duplicate key on a unique index (e.g. two recaps for the same user + period)
  if (err.code === 11000) {
    return res.status(409).json({ message: "That record already exists." });
  }

  const status = err.statusCode || 500;
  return res.status(status).json({
    message: status === 500 ? "Something went wrong on our end." : err.message,
  });
}

module.exports = { notFound, errorHandler };
