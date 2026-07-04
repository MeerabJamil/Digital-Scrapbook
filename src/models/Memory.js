const mongoose = require("mongoose");

const memorySchema = new mongoose.Schema(
  {
    photo: {
      type: String, // URL to the uploaded photo
      required: [true, "Photo is required"],
    },
    note: {
      type: String,
      required: [true, "Note is required"],
      maxlength: 1000,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    mood: {
      type: String, // filled in automatically by the AI Memory Companion (Week 5)
      default: "Unrated",
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      required: true,
    },
  },
  { timestamps: true }
);

// album view sorts memories by date -> compound index
memorySchema.index({ album: 1, date: -1 });
// "On this day" reminders query by month/day across years -> supports that scan
memorySchema.index({ date: 1 });

module.exports = mongoose.model("Memory", memorySchema);
