const mongoose = require("mongoose");

const memoryRecapSchema = new mongoose.Schema(
  {
    narrativeText: {
      type: String,
      required: true,
      maxlength: 1500,
    },
    period: {
      type: String, // e.g. "2026-06" for June 2026
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// one recap per user per period, and fast lookup of "this user's recaps"
memoryRecapSchema.index({ user: 1, period: 1 }, { unique: true });

module.exports = mongoose.model("MemoryRecap", memoryRecapSchema);
