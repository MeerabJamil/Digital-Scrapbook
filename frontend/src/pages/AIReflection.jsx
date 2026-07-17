import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import MoodOrb from "../components/scrapbook/MoodOrb";
import SectionHeading from "../components/ui/SectionHeading";
import WashiTape from "../components/layout/WashiTape";
import { aiReflections } from "../data/mockData";

export default function AIReflection() {
  return (
    <div>
      <div className="flex flex-col items-center text-center mb-12">
        <MoodOrb size={110} emoji="🦉" />
        <h1 className="font-hand text-5xl text-cocoa-deep mt-4 mb-2">Sage's Journal Corner</h1>
        <p className="font-utility text-cocoa/70 max-w-md">
          Every few entries, Sage reads back through your pages and leaves a little reflection — gentle, honest, occasionally too on-the-nose.
        </p>
      </div>

      <SectionHeading eyebrow="recent reflections" title="Things Sage noticed" className="mb-8" />

      <div className="space-y-6 max-w-2xl">
        {aiReflections.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative bg-cream-deep rounded-2xl p-6 shadow-[var(--shadow-paper)] paper-grain"
            style={{ rotate: `${(i % 2 === 0 ? -1 : 1)}deg` }}
          >
            <WashiTape tone={["lavender", "sage", "peach"][i % 3]} rotate={-8} className="-top-3 left-8" />
            <p className="font-tape text-terracotta text-sm mb-2">on "{r.memoryTitle}"</p>
            <p className="font-hand text-2xl text-cocoa-deep leading-snug mb-3">{r.text}</p>
            <Link to="/memory/m1" className="font-utility text-xs text-cocoa/50 hover:text-terracotta">open the memory →</Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
