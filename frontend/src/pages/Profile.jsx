import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import WashiTape from "../components/layout/WashiTape";
import Button from "../components/ui/Button";
import StickerBadge from "../components/ui/StickerBadge";
import { currentUser, moods } from "../data/mockData";

export default function Profile() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative bg-cream-deep paper-grain rounded-3xl shadow-[var(--shadow-paper-lg)] p-8 text-center">
        <WashiTape tone="gold" rotate={-10} className="-top-4 left-10" />
        <WashiTape tone="sage" rotate={8} className="-top-4 right-10" />

        <div className="w-28 h-28 mx-auto rounded-full bg-lavender flex items-center justify-center text-6xl shadow-[var(--shadow-paper)] mb-4">
          {currentUser.avatar}
        </div>
        <h1 className="font-hand text-5xl text-cocoa-deep mb-1">{currentUser.name}</h1>
        <p className="font-utility text-cocoa/60 mb-4">{currentUser.bio}</p>

        <div className="flex justify-center gap-2 mb-6">
          <Button as={Link} to="/avatar-setup" variant="secondary" className="text-sm"><Pencil size={14} /> Edit avatar</Button>
          <Button as={Link} to="/settings" variant="ghost" className="text-sm">Account settings</Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Memories", value: currentUser.totalMemories },
            { label: "Albums", value: currentUser.totalAlbums },
            { label: "Streak", value: `${currentUser.streak}d` },
          ].map((s) => (
            <div key={s.label} className="bg-sand rounded-xl py-4">
              <p className="font-hand text-3xl text-cocoa-deep">{s.value}</p>
              <p className="font-utility text-xs text-cocoa/60">{s.label}</p>
            </div>
          ))}
        </div>

        <div>
          <p className="font-tape text-cocoa-deep mb-2">Most-felt moods</p>
          <div className="flex justify-center gap-2 flex-wrap">
            {moods.map((m) => (
              <StickerBadge key={m.label} tone={m.tone} rotate={0}>{m.emoji} {m.label}</StickerBadge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
