const User = require("../models/User");
const { signToken, sendTokenCookie } = require("../middleware/auth");

// POST /api/auth/register
async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are all required." });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const user = await User.create({ name, email, password });
    const token = signToken(user._id);
    sendTokenCookie(res, token);

    return res.status(201).json({
      message: "Account created.",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({ message: "Registration failed.", error: err.message });
  }
}

// POST /api/auth/login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // password has select:false on the schema, so we ask for it explicitly here
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }

    const token = signToken(user._id);
    sendTokenCookie(res, token);

    return res.json({
      message: "Logged in.",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({ message: "Login failed.", error: err.message });
  }
}

// POST /api/auth/logout
function logout(req, res) {
  res.clearCookie("token");
  return res.json({ message: "Logged out." });
}

// GET /api/auth/me  (used by the frontend to check if a session is active)
function me(req, res) {
  return res.json({
    user: { id: req.user._id, name: req.user.name, email: req.user.email },
  });
}

module.exports = { register, login, logout, me };
