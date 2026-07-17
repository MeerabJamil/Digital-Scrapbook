// Deterministic pseudo-random tilt so cards look hand-placed but don't
// re-shuffle on every re-render. Same id always yields the same values.
function seededRandom(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  return () => {
    h = (h * 9301 + 49297) % 233280;
    return h / 233280;
  };
}

export function useRandomTilt(id, range = 6) {
  const rand = seededRandom(String(id));
  const cardRotate = (rand() - 0.5) * range * 2;
  const tapeRotate = (rand() - 0.5) * 40;
  const tapeSide = rand() > 0.5 ? "left" : "right";
  const paperTone = ["cream", "sand", "blush", "peach"][Math.floor(rand() * 4)];
  return { cardRotate, tapeRotate, tapeSide, paperTone };
}
