import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import { avatarOptions } from "../data/mockData";

const BG_COLORS = {
  cream: "#FFF8F1", blush: "#E9C5C5", sage: "#C8D5B9", lavender: "#DCCEF9", peach: "#FFD8BE",
};

export default function AvatarCustomization() {
  const navigate = useNavigate();
  const [species, setSpecies] = useState(avatarOptions.species[0]);
  const [hat, setHat] = useState("none");
  const [glasses, setGlasses] = useState("none");
  const [background, setBackground] = useState("lavender");
  const [expression, setExpression] = useState(avatarOptions.expressions[0]);

  const Picker = ({ label, options, value, onChange, render }) => (
    <div className="mb-5">
      <p className="font-tape text-cocoa-deep mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`btn-squish w-11 h-11 rounded-xl flex items-center justify-center text-xl border-2 transition-colors ${
              value === opt ? "border-terracotta bg-sand" : "border-transparent bg-cream-deep hover:bg-sand/70"
            }`}
          >
            {render ? render(opt) : opt === "none" ? "—" : opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <SectionHeading eyebrow="make it yours" title="Design your avatar" subtitle="This little friend will greet you every time you open your scrapbook." align="center" className="mx-auto mb-10" />

      <div className="grid lg:grid-cols-[320px_1fr] gap-8 items-start max-w-4xl mx-auto">
        <div className="flex flex-col items-center">
          <motion.div
            key={species + hat + glasses + background + expression}
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="relative w-48 h-48 rounded-full flex items-center justify-center shadow-[var(--shadow-paper-lg)] mb-4"
            style={{ background: BG_COLORS[background] }}
          >
            <span className="text-8xl">{species}</span>
            {hat !== "none" && <span className="absolute -top-3 text-4xl">{hat}</span>}
            {glasses !== "none" && <span className="absolute top-16 text-3xl">{glasses}</span>}
            <span className="absolute bottom-2 right-4 text-2xl">{expression}</span>
          </motion.div>
          <Button variant="primary" onClick={() => navigate("/dashboard")}>Looks perfect ✨</Button>
        </div>

        <div className="bg-cream-deep rounded-3xl p-6 shadow-[var(--shadow-paper)]">
          <Picker label="Choose your creature" options={avatarOptions.species} value={species} onChange={setSpecies} />
          <Picker label="Hat" options={avatarOptions.hats} value={hat} onChange={setHat} />
          <Picker label="Glasses" options={avatarOptions.glasses} value={glasses} onChange={setGlasses} />
          <Picker label="Expression" options={avatarOptions.expressions} value={expression} onChange={setExpression} />
          <div>
            <p className="font-tape text-cocoa-deep mb-2">Background</p>
            <div className="flex gap-2">
              {avatarOptions.backgrounds.map((bg) => (
                <button
                  key={bg}
                  onClick={() => setBackground(bg)}
                  aria-label={bg}
                  className={`w-9 h-9 rounded-full border-2 ${background === bg ? "border-cocoa-deep scale-110" : "border-white"} transition-transform`}
                  style={{ background: BG_COLORS[bg] }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
