import { motion } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import PolaroidCard from "../components/scrapbook/PolaroidCard";
import StickerBadge from "../components/ui/StickerBadge";
import { memories, moods } from "../data/mockData";

export default function MonthlyRecap() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-5xl block mb-2">🗓️✨</span>
        <SectionHeading eyebrow="june 2026" title="Your month, pressed into one page" align="center" className="mx-auto" />
      </div>

      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        {[
          { label: "Memories kept", value: "24" },
          { label: "Most common mood", value: "Joyful 🌼" },
          { label: "Longest streak", value: "14 days 🔥" },
        ].map((s) => (
          <div key={s.label} className="bg-peach/30 rounded-2xl p-5 text-center shadow-[var(--shadow-paper)]">
            <p className="font-hand text-3xl text-cocoa-deep">{s.value}</p>
            <p className="font-utility text-xs text-cocoa/60 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {memories.slice(0, 5).map((m, i) => (
          <PolaroidCard key={m.id} emoji={m.photo} caption={m.title.split(" ").slice(0, 2).join(" ")} rotate={(i % 2 === 0 ? -1 : 1) * (4 + i)} tone={m.mood.tone} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-lavender/30 rounded-3xl p-8 text-center"
      >
        <p className="font-hand text-3xl text-cocoa-deep mb-3">A note from Sage 🦉</p>
        <p className="font-utility text-cocoa/75 max-w-lg mx-auto">
          This was a soft, joyful month for you — mornings kept showing up in your entries as little pockets of peace. Whatever you're doing lately, it's working.
        </p>
        <div className="flex justify-center gap-2 mt-5 flex-wrap">
          {moods.map((m) => (
            <StickerBadge key={m.label} tone={m.tone} rotate={0}>{m.emoji} {m.label}</StickerBadge>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
