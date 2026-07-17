const express = require("express");
const { requireAuth } = require("../middleware/auth");
const {
  createAlbum,
  getAlbums,
  getAlbum,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/albumController");
const { createMemory, getMemoriesForAlbum } = require("../controllers/memoryController");

const router = express.Router();

router.use(requireAuth); // every route below requires a logged in user

router.post("/", createAlbum);
router.get("/", getAlbums);
router.get("/:id", getAlbum);
router.put("/:id", updateAlbum);
router.delete("/:id", deleteAlbum);

// nested under an album, since a memory is always created/listed in that context
router.post("/:albumId/memories", createMemory);
router.get("/:albumId/memories", getMemoriesForAlbum);

module.exports = router;
