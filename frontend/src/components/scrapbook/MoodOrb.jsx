import { motion } from "framer-motion";

export default function MoodOrb({ size = 84, emoji = "🦉", label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          background: "radial-gradient(circle at 35% 30%, #F6E9FF, #DCCEF9 60%, #C7B3EE)",
          boxShadow: "0 0 30px rgba(220,206,249,0.65), 0 8px 20px rgba(122,90,69,0.15)",
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          style={{ boxShadow: "0 0 24px 6px rgba(232,184,75,0.35)" }}
        />
        <span style={{ fontSize: size * 0.45 }}>{emoji}</span>
      </motion.div>
      {label && <p className="font-hand text-xl text-cocoa-deep">{label}</p>}
    </div>
  );
}
