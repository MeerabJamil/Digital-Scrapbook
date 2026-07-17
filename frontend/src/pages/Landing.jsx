import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import FloatingDecorations from "../components/layout/FloatingDecorations";
import WashiTape from "../components/layout/WashiTape";
import PolaroidCard from "../components/scrapbook/PolaroidCard";
import Footer from "../components/layout/Footer";

const FEATURES = [
  { icon: "📷", title: "Drag-and-decorate editor", text: "Photos, washi tape, stickers, and freehand doodles — arrange your page exactly how you picture it." },
  { icon: "🦉", title: "AI memory companion", text: "A gentle little assistant that reflects back what your entries are quietly telling you." },
  { icon: "🌙", title: "Mood detection", text: "Every entry gets a mood sticker, so your scrapbook becomes a map of how you've felt." },
  { icon: "🗓️", title: "On This Day", text: "Old memories resurface right when you need the reminder that time is doing something good." },
  { icon: "📊", title: "Monthly recaps", text: "A beautifully laid-out summary page arrives each month, like a letter from your past self." },
  { icon: "🦊", title: "Pick your avatar", text: "Foxes, capybaras, tiny ghosts — dress up your profile to feel as cozy as your journal." },
];

const TESTIMONIALS = [
  { quote: "It's the first journal app that didn't feel like homework. I actually want to open it.", name: "Mika, plant hoarder & Tuesday poet" },
  { quote: "The AI reflections genuinely surprised me a few times. In a good way.", name: "Dev, professional overthinker" },
  { quote: "I stopped buying physical scrapbook supplies. This scratches the exact same itch.", name: "Sana, digital hoarder of small joys" },
];

export default function Landing() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="min-h-screen bg-cream paper-grain relative overflow-hidden">
      <FloatingDecorations count={10} className="fixed" />

      {/* nav */}
      <header className="relative z-10 max-w-6xl mx-auto flex items-center justify-between px-6 py-6">
        <span className="font-hand text-3xl text-cocoa-deep">📔 Petal & Page</span>
        <div className="flex items-center gap-3">
          <Link to="/login" className="font-tape text-cocoa-deep hover:text-terracotta transition-colors">Log in</Link>
          <Button as={Link} to="/register" variant="primary">Start scrapbooking</Button>
        </div>
      </header>

      {/* hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-8 pb-24 text-center flex flex-col items-center">
        <span className="font-tape text-terracotta bg-blush/50 px-4 py-1 rounded-full text-sm mb-5">a digital scrapbook & memory journal</span>
        <h1 className="font-hand text-6xl md:text-8xl text-cocoa-deep leading-[0.95] mb-6">
          Every little moment,<br />pressed onto a page
        </h1>
        <p className="font-utility text-cocoa/70 max-w-xl mb-9 text-lg">
          Petal & Page is where your memories get to feel handmade again — photos, doodles, stickers, and a gentle AI that notices the patterns in your days.
        </p>
        <div className="flex gap-4 mb-16">
          <Button as={Link} to="/register" variant="primary">Open my scrapbook</Button>
          <Button variant="ghost" onClick={() => setOpened((o) => !o)}>See how it works</Button>
        </div>

        {/* animated scrapbook opening */}
        <div className="relative w-full max-w-2xl mx-auto" style={{ perspective: 1600 }}>
          <div className="relative h-80 md:h-96">
            {/* right page (base) */}
            <div className="absolute inset-0 bg-cream-deep rounded-2xl shadow-[var(--shadow-paper-lg)] paper-grain flex items-center justify-center overflow-hidden">
              <div className="grid grid-cols-2 gap-4 p-8 w-full h-full items-center">
                <PolaroidCard emoji="🌻" caption="june" rotate={-6} tone="gold" />
                <PolaroidCard emoji="☕" caption="today" rotate={5} tone="sage" />
              </div>
            </div>
            {/* cover, flips open */}
            <motion.div
              className="absolute inset-0 rounded-2xl shadow-[var(--shadow-paper-lg)] flex flex-col items-center justify-center gap-3"
              style={{
                background: "linear-gradient(135deg, #E9C5C5, #DCCEF9)",
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
              }}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: opened ? -140 : 0 }}
              transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
            >
              <span className="text-6xl">📔</span>
              <p className="font-hand text-3xl text-cocoa-deep">tap to open</p>
              <button
                onClick={() => setOpened((o) => !o)}
                className="absolute inset-0"
                aria-label="Open scrapbook preview"
              />
            </motion.div>
            <WashiTape tone="peach" rotate={-10} className="-top-4 left-8 z-20" width={90} />
            <WashiTape tone="lavender" rotate={12} className="-top-3 right-10 z-20" width={80} />
          </div>
        </div>
      </section>

      {/* features */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <SectionHeading
          eyebrow="what's inside"
          title="Built for keeping, not just logging"
          subtitle="Every tool here exists to make revisiting your memories feel like something you want to do."
          align="center"
          className="mx-auto mb-12"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08 }}
              whileHover={{ y: -6, rotate: i % 2 === 0 ? -1 : 1 }}
              className="bg-cream-deep rounded-2xl p-6 shadow-[var(--shadow-paper)] paper-grain relative"
            >
              <span className="text-4xl mb-3 block">{f.icon}</span>
              <h3 className="font-hand text-2xl text-cocoa-deep mb-1">{f.title}</h3>
              <p className="font-utility text-sm text-cocoa/70">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* screenshot / preview strip */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <SectionHeading eyebrow="a peek inside" title="Pages that feel lived-in" align="center" className="mx-auto mb-10" />
        <div className="flex flex-wrap justify-center gap-6">
          <PolaroidCard emoji="🥞" caption="pancakes & sunlight" rotate={-6} tone="blush" />
          <PolaroidCard emoji="🍅" caption="finally red" rotate={4} tone="sage" />
          <PolaroidCard emoji="🚋" caption="daydreaming" rotate={-3} tone="lavender" />
          <PolaroidCard emoji="🍞" caption="attempt #4" rotate={7} tone="peach" />
        </div>
      </section>

      {/* testimonials */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <SectionHeading eyebrow="from the community" title="Handwritten kind words" align="center" className="mx-auto mb-10" />
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-sand rounded-2xl p-6 shadow-[var(--shadow-paper)]"
              style={{ rotate: `${(i - 1) * 2}deg` }}
            >
              <WashiTape tone={["blush", "sage", "lavender"][i]} rotate={-8} className="-top-3 left-6" />
              <p className="font-hand text-2xl text-cocoa-deep leading-snug mb-4">"{t.quote}"</p>
              <p className="font-tape text-sm text-cocoa/60">— {t.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-br from-blush via-peach to-lavender rounded-3xl p-12 shadow-[var(--shadow-paper-lg)] relative overflow-hidden">
          <FloatingDecorations count={5} items={["✨", "🌸"]} />
          <h2 className="font-hand text-5xl text-cocoa-deep mb-4">Ready to start your first page?</h2>
          <p className="font-utility text-cocoa/70 mb-7 max-w-md mx-auto">It only takes a minute, and your first memory is already waiting to be pressed onto paper.</p>
          <Button as={Link} to="/register" variant="primary" className="text-xl">Create my scrapbook — free</Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
