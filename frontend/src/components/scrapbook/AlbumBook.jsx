import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TONE_BG = {
  peach: "bg-peach",
  sage: "bg-sage",
  lavender: "bg-lavender",
  blush: "bg-blush",
  gold: "bg-gold",
};

export default function AlbumBook({ album }) {
  return (
    <Link to={`/albums/${album.id}`} className="group block">
      <motion.div
        whileHover={{ y: -10, rotate: -2 }}
        transition={{ type: "spring", stiffness: 260, damping: 16 }}
        className="relative"
      >
        <div
          className={`relative w-full aspect-[3/4] rounded-r-lg rounded-l-sm ${TONE_BG[album.color]} shadow-[var(--shadow-paper-lg)] flex flex-col items-center justify-center p-4 overflow-hidden`}
        >
          {/* spine */}
          <div
            className="absolute left-0 top-0 bottom-0 w-3 opacity-70"
            style={{ background: album.spineColor }}
          />
          <span className="text-6xl mb-3 drop-shadow-sm">{album.cover}</span>
          <p className="font-hand text-2xl text-cocoa-deep text-center leading-tight px-2">{album.title}</p>
          <p className="font-tape text-xs text-cocoa-deep/60 mt-1">{album.count} memories</p>
        </div>
        <div className="h-2 mx-1 bg-cocoa-deep/10 rounded-b-md blur-[1px] group-hover:opacity-60 transition-opacity" />
      </motion.div>
    </Link>
  );
}
