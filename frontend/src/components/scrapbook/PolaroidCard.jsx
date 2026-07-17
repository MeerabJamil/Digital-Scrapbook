import { motion } from "framer-motion";
import WashiTape from "../layout/WashiTape";

export default function PolaroidCard({ emoji, caption, rotate = -4, tone = "blush", className = "" }) {
  return (
    <motion.div
      className={`relative bg-white p-3 pb-6 rounded-sm shadow-[var(--shadow-paper)] ${className}`}
      style={{ rotate: `${rotate}deg` }}
      whileHover={{ rotate: 0, scale: 1.04, y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <WashiTape tone={tone} rotate={rotate * -2} className="-top-3 left-1/2 -translate-x-1/2" />
      <div className="w-full aspect-square bg-sand rounded-sm flex items-center justify-center text-6xl">
        {emoji}
      </div>
      {caption && (
        <p className="font-hand text-xl text-cocoa-deep text-center mt-2 leading-none">{caption}</p>
      )}
    </motion.div>
  );
}
