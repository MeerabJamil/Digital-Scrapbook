// Matches the tones the frontend's AlbumBook component already knows how to
// render (bg-peach, bg-sage, etc). The backend only stores the tone name;
// this map derives the spine strip color so the frontend doesn't need to
// pick or persist a separate hex value itself.
const SPINE_COLORS = {
  peach: "#E8B84B",
  sage: "#AFC29B",
  lavender: "#C7B3EE",
  blush: "#DDA9AC",
  gold: "#E8B84B",
};

function spineColorFor(color) {
  return SPINE_COLORS[color] || SPINE_COLORS.peach;
}

module.exports = { SPINE_COLORS, spineColorFor };
