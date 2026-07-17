const STICKERS = ["🌸", "🍃", "✨", "⭐", "☁️", "🌼", "🦋", "🐝", "🍄", "🌙", "🎀", "📎", "🧸", "🎈", "💛", "❤️"];

export default function StickerPicker({ onPick }) {
  return (
    <div className="grid grid-cols-8 gap-1.5 bg-cream-deep rounded-2xl p-3 shadow-[var(--shadow-paper)]">
      {STICKERS.map((s) => (
        <button
          key={s}
          onClick={() => onPick(s)}
          className="btn-squish text-2xl hover:bg-sand rounded-lg p-1.5 transition-colors"
          aria-label={`Add ${s} sticker`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
