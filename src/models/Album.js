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
      type: String, // URL to a real cover image, for when photo upload is added
      default: "",
    },
    cover: {
      type: String, // emoji shown on the album "book" in the shelf view
      default: "📔",
    },
    color: {
      type: String, // theme tone used by the frontend for the album's book color + spine
      enum: ["peach", "sage", "lavender", "blush", "gold"],
      default: "peach",
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
