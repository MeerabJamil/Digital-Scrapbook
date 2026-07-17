import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import WashiTape from "../layout/WashiTape";
import StickerBadge from "../ui/StickerBadge";
import { useRandomTilt } from "../../hooks/useRandomTilt";

const PAPER_TONES = {
  cream: "bg-cream-deep",
  sand: "bg-sand",
  blush: "bg-blush/40",
  peach: "bg-peach/40",
};

export default function MemoryCard({ memory }) {
  const { cardRotate, tapeRotate, tapeSide, paperTone } = useRandomTilt(memory.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: cardRotate }}
      viewport={{ once: true }}
      whileHover={{ rotate: 0, scale: 1.03, y: -6 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="relative"
    >
      <WashiTape
        tone={memory.mood.tone}
        rotate={tapeRotate}
        className={tapeSide === "left" ? "-top-3 left-4" : "-top-3 right-4"}
      />
      <Link
        to={`/memory/${memory.id}`}
        className={`block ${PAPER_TONES[paperTone]} rounded-2xl p-5 shadow-[var(--shadow-paper)] paper-grain border border-cocoa/5`}
      >
        <div className="flex items-start justify-between mb-3">
          <span className="text-4xl">{memory.photo}</span>
          <StickerBadge tone={memory.mood.tone} rotate={4}>
            {memory.mood.emoji} {memory.mood.label}
          </StickerBadge>
        </div>
        <h3 className="font-hand text-3xl text-cocoa-deep leading-tight mb-1">{memory.title}</h3>
        <p className="font-tape text-sm text-cocoa/50 mb-2">{memory.date}</p>
        <p className="font-utility text-sm text-cocoa/75 line-clamp-3">{memory.excerpt}</p>
      </Link>
    </motion.div>
  );
}
