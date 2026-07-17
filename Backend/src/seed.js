// Populates the database with one sample user, album, and memory
// so you can confirm the schema and relationships actually work.
// Run with: npm run seed

require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");
const Album = require("./models/Album");
const Memory = require("./models/Memory");
const AIInsight = require("./models/AIInsight");
const MemoryRecap = require("./models/MemoryRecap");

async function seed() {
  await connectDB();

  // wipe existing sample data so this script can be re-run safely
  await Promise.all([
    User.deleteMany({ email: "meerab@example.com" }),
    Album.deleteMany({}),
    Memory.deleteMany({}),
    AIInsight.deleteMany({}),
    MemoryRecap.deleteMany({}),
  ]);

  const user = await User.create({
    name: "Meerab Jamil",
    email: "meerab@example.com",
    password: "password123", // hashed automatically by the User model
  });

  const album = await Album.create({
    title: "First Year in Lahore",
    coverPhoto: "https://picsum.photos/seed/lahore-cover/400/400",
    cover: "🧳",
    color: "peach",
    user: user._id,
  });

  const memory = await Memory.create({
    title: "Rooftop café near Anarkali",
    photo: "☕",
    note: "Found a tiny rooftop café near Anarkali. Sat there for two hours watching kites in the sky.",
    date: new Date("2025-08-14"),
    mood: "Content",
    album: album._id,
  });

  await AIInsight.create({
    reflectionText:
      "A quiet afternoon that asked for nothing — just rooftops, kites, and a new city starting to feel like home.",
    memory: memory._id,
  });

  await MemoryRecap.create({
    narrativeText:
      "August was quiet and unhurried — a month of settling in, marked by small discoveries and a growing sense of belonging.",
    period: "2025-08",
    user: user._id,
  });

  console.log("Seed complete:");
  console.log(`  User:   ${user.email} / password123`);
  console.log(`  Album:  ${album.title}`);
  console.log(`  Memory: ${memory.note.slice(0, 40)}...`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
