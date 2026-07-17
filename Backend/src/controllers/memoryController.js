const mongoose = require("mongoose");
const Memory = require("../models/Memory");
const Album = require("../models/Album");
const AIInsight = require("../models/AIInsight");

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// Memory doesn't store a user field directly — ownership is inherited
// through its album. Every route below has to prove the album belongs
// to req.user before touching (or revealing) anything about the memory.
async function findOwnedAlbum(albumId, userId) {
  if (!isValidId(albumId)) return null;
  return Album.findOne({ _id: albumId, user: userId });
}

// POST /api/albums/:albumId/memories
async function createMemory(req, res, next) {
  try {
    const { albumId } = req.params;
    const album = await findOwnedAlbum(albumId, req.user._id);
    if (!album) return res.status(404).json({ message: "Album not found." });

    const { title, photo, note, date, mood } = req.body;
    if (!title || !title.trim()) return res.status(400).json({ message: "Title is required." });
    if (!photo) return res.status(400).json({ message: "Photo is required." });
    if (!note || !note.trim()) return res.status(400).json({ message: "Note is required." });
    if (!date || isNaN(Date.parse(date))) {
      return res.status(400).json({ message: "A valid date is required." });
    }

    const memory = await Memory.create({
      title: title.trim(),
      photo,
      note: note.trim(),
      date: new Date(date),
      mood: mood || "Unrated", // AI Memory Companion overwrites this automatically in Week 5
      album: album._id,
    });

    return res.status(201).json({ message: "Memory added.", memory });
  } catch (err) {
    next(err);
  }
}

// GET /api/albums/:albumId/memories
// Sorted newest-first — matches the { album: 1, date: -1 } index already
// defined on the Memory model for this exact access pattern.
async function getMemoriesForAlbum(req, res, next) {
  try {
    const { albumId } = req.params;
    const album = await findOwnedAlbum(albumId, req.user._id);
    if (!album) return res.status(404).json({ message: "Album not found." });

    const memories = await Memory.find({ album: album._id }).sort({ date: -1 });
    return res.json({ memories });
  } catch (err) {
    next(err);
  }
}

// GET /api/memories/:id
async function getMemory(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid memory id." });

    const memory = await Memory.findById(id).populate("album");
    if (!memory || memory.album.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Memory not found." });
    }

    return res.json({ memory });
  } catch (err) {
    next(err);
  }
}

// PUT /api/memories/:id
async function updateMemory(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid memory id." });

    const memory = await Memory.findById(id).populate("album");
    if (!memory || memory.album.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Memory not found." });
    }

    const { title, photo, note, date, mood } = req.body;
    if (title !== undefined) {
      if (!title.trim()) return res.status(400).json({ message: "Title cannot be empty." });
      memory.title = title.trim();
    }
    if (photo !== undefined) memory.photo = photo;
    if (note !== undefined) {
      if (!note.trim()) return res.status(400).json({ message: "Note cannot be empty." });
      memory.note = note.trim();
    }
    if (date !== undefined) {
      if (isNaN(Date.parse(date))) return res.status(400).json({ message: "Invalid date." });
      memory.date = new Date(date);
    }
    if (mood !== undefined) memory.mood = mood;

    await memory.save();
    return res.json({ message: "Memory updated.", memory });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/memories/:id
// Also removes the linked AIInsight (if one exists) so a reflection never
// outlives the memory it was generated for.
async function deleteMemory(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid memory id." });

    const memory = await Memory.findById(id).populate("album");
    if (!memory || memory.album.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Memory not found." });
    }

    await Promise.all([AIInsight.deleteMany({ memory: memory._id }), memory.deleteOne()]);

    return res.json({ message: "Memory deleted." });
  } catch (err) {
    next(err);
  }
}

module.exports = { createMemory, getMemoriesForAlbum, getMemory, updateMemory, deleteMemory };
