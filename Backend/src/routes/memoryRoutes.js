const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { getMemory, updateMemory, deleteMemory } = require("../controllers/memoryController");

const router = express.Router();

router.use(requireAuth);

router.get("/:id", getMemory);
router.put("/:id", updateMemory);
router.delete("/:id", deleteMemory);

module.exports = router;
