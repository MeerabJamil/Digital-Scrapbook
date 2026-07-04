const mongoose = require("mongoose");

const aiInsightSchema = new mongoose.Schema(
  {
    reflectionText: {
      type: String,
      required: true,
      maxlength: 500,
    },
    memory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Memory",
      required: true,
      unique: true, // one reflection per memory
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AIInsight", aiInsightSchema);
