const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Album title is required"],
      trim: true,
      maxlength: 100,
    },
    coverPhoto: {
      type: String, // URL to the cover image
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } // createdAt / updatedAt
);

// every dashboard load fetches "all albums for this user" -> index it
albumSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Album", albumSchema);
