const TONES = {
  blush: "linear-gradient(90deg, #E9C5C5, #E2AFAF)",
  sage: "linear-gradient(90deg, #C8D5B9, #B7C8A4)",
  lavender: "linear-gradient(90deg, #DCCEF9, #CBB8EF)",
  peach: "linear-gradient(90deg, #FFD8BE, #FFC5A0)",
  gold: "linear-gradient(90deg, #F3D48A, #E8B84B)",
};

/**
 * A little strip of washi tape. Drop it near the corner of a card
 * with absolute positioning from the parent.
 */
export default function WashiTape({ tone = "blush", rotate = -8, width = 70, className = "" }) {
  return (
    <div
      className={`washi pointer-events-none absolute rounded-[2px] ${className}`}
      style={{
        background: TONES[tone] || TONES.blush,
        width,
        height: 26,
        transform: `rotate(${rotate}deg)`,
        opacity: 0.88,
      }}
    >
      <div className="w-full h-full" style={{
        backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.25) 0, rgba(255,255,255,0.25) 2px, transparent 2px, transparent 6px)"
      }} />
    </div>
  );
}
