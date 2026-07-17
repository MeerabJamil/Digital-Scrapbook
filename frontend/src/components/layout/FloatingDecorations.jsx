import { motion } from "framer-motion";

const DEFAULT_SET = ["✨", "🌸", "🍃", "⭐", "🦋", "☁️"];

/**
 * Scatters a handful of emoji decorations across the container with slow,
 * ambient drifting motion. Purely decorative — aria-hidden.
 */
export default function FloatingDecorations({ items = DEFAULT_SET, count = 8, className = "" }) {
  const decorations = Array.from({ length: count }).map((_, i) => {
    const emoji = items[i % items.length];
    const top = (i * 37) % 100;
    const left = (i * 61) % 100;
    const duration = 6 + (i % 5);
    const delay = (i % 4) * 0.6;
    const size = 16 + (i % 3) * 8;
    return { emoji, top, left, duration, delay, size, key: i };
  });

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {decorations.map((d) => (
        <motion.span
          key={d.key}
          className="absolute select-none opacity-60"
          style={{ top: `${d.top}%`, left: `${d.left}%`, fontSize: d.size }}
          animate={{
            y: [0, -16, 0],
            x: [0, 6, 0],
            rotate: [0, 8, -6, 0],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {d.emoji}
        </motion.span>
      ))}
    </div>
  );
}
