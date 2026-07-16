const mongoose = require("mongoose");
const Album = require("../models/Album");
const Memory = require("../models/Memory");
const AIInsight = require("../models/AIInsight");

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// POST /api/albums
async function createAlbum(req, res, next) {
  try {
    const { title, coverPhoto } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Album title is required." });
    }

    const album = await Album.create({
      title: title.trim(),
      coverPhoto: coverPhoto || "",
      user: req.user._id,
    });

    return res.status(201).json({ message: "Album created.", album });
  } catch (err) {
    next(err);
  }
}

// GET /api/albums
// Returns every album owned by the logged in user, newest first, each
// tagged with how many memories it holds so a dashboard card has something
// to show without a second round trip per album.
async function getAlbums(req, res, next) {
  try {
    const albums = await Album.find({ user: req.user._id }).sort({ createdAt: -1 });

    const albumIds = albums.map((a) => a._id);
    const counts = await Memory.aggregate([
      { $match: { album: { $in: albumIds } } },
      { $group: { _id: "$album", count: { $sum: 1 } } },
    ]);
    const countByAlbum = Object.fromEntries(counts.map((c) => [c._id.toString(), c.count]));

    const albumsWithCounts = albums.map((a) => ({
      ...a.toObject(),
      memoryCount: countByAlbum[a._id.toString()] || 0,
    }));

    return res.json({ albums: albumsWithCounts });
  } catch (err) {
    next(err);
  }
}

// GET /api/albums/:id
async function getAlbum(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid album id." });

    const album = await Album.findOne({ _id: id, user: req.user._id });
    if (!album) return res.status(404).json({ message: "Album not found." });

    return res.json({ album });
  } catch (err) {
    next(err);
  }
}

// PUT /api/albums/:id
async function updateAlbum(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid album id." });

    const { title, coverPhoto } = req.body;
    const updates = {};

    if (title !== undefined) {
      if (!title.trim()) return res.status(400).json({ message: "Album title cannot be empty." });
      updates.title = title.trim();
    }
    if (coverPhoto !== undefined) updates.coverPhoto = coverPhoto;

    const album = await Album.findOneAndUpdate({ _id: id, user: req.user._id }, updates, {
      new: true,
      runValidators: true,
    });
    if (!album) return res.status(404).json({ message: "Album not found." });

    return res.json({ message: "Album updated.", album });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/albums/:id
// Cascades: an album's memories (and each memory's AI reflection) are
// deleted along with it, so we never leave orphaned Memory/AIInsight
// documents pointing at an album that no longer exists.
async function deleteAlbum(req, res, next) {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: "Invalid album id." });

    const album = await Album.findOne({ _id: id, user: req.user._id });
    if (!album) return res.status(404).json({ message: "Album not found." });

    const memoryIds = (await Memory.find({ album: album._id }).select("_id")).map((m) => m._id);

    await Promise.all([
      AIInsight.deleteMany({ memory: { $in: memoryIds } }),
      Memory.deleteMany({ album: album._id }),
      album.deleteOne(),
    ]);

    return res.json({ message: "Album and its memories were deleted." });
  } catch (err) {
    next(err);
  }
}

module.exports = { createAlbum, getAlbums, getAlbum, updateAlbum, deleteAlbum };
