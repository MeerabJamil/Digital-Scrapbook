import { motion } from "framer-motion";

export default function Loading({ label = "Turning the page..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <motion.div
        className="w-16 h-20 bg-sand rounded-r-md rounded-l-sm shadow-[var(--shadow-paper)] origin-left"
        animate={{ rotateY: [0, -140, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      />
      <p className="font-hand text-2xl text-cocoa/70">{label}</p>
    </div>
  );
}
