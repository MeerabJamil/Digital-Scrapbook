const TONES = {
  blush: "bg-blush text-cocoa-deep",
  sage: "bg-sage text-cocoa-deep",
  lavender: "bg-lavender text-cocoa-deep",
  peach: "bg-peach text-cocoa-deep",
  gold: "bg-gold text-cocoa-deep",
};

export default function StickerBadge({ children, tone = "blush", rotate = -4, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 font-tape text-sm px-3 py-1 rounded-full shadow-[var(--shadow-paper)] ${TONES[tone]} ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}
