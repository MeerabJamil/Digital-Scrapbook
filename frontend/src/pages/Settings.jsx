import { useState } from "react";
import { User, Lock, Bell, Palette } from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { currentUser } from "../data/mockData";

const TABS = [
  { id: "account", label: "Account", icon: User },
  { id: "privacy", label: "Privacy", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export default function Settings() {
  const [tab, setTab] = useState("account");

  return (
    <div>
      <SectionHeading eyebrow="tidy up" title="Settings" className="mb-8" />

      <div className="flex flex-col md:flex-row gap-6">
        {/* folder tabs */}
        <div className="flex md:flex-col gap-2 md:w-56 shrink-0">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`btn-squish flex items-center gap-2 font-tape px-4 py-2.5 rounded-xl transition-colors text-left ${
                tab === id ? "bg-blush text-cocoa-deep" : "bg-cream-deep text-cocoa/60 hover:bg-sand"
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        {/* panel */}
        <div className="flex-1 bg-cream-deep rounded-3xl p-7 shadow-[var(--shadow-paper)] paper-grain">
          {tab === "account" && (
            <div className="space-y-4 max-w-sm">
              <Input id="name" label="Display name" defaultValue={currentUser.name} />
              <Input id="email" label="Email" type="email" defaultValue="wren@cozy.com" />
              <Input id="bio" label="Bio" defaultValue={currentUser.bio} />
              <Button variant="primary">Save changes</Button>
            </div>
          )}
          {tab === "privacy" && (
            <div className="space-y-4 max-w-sm">
              {["Make my profile private", "Hide mood stickers from others", "Allow AI reflections on entries"].map((label) => (
                <label key={label} className="flex items-center gap-3 font-utility text-cocoa/80">
                  <input type="checkbox" className="w-5 h-5 accent-terracotta rounded" defaultChecked />
                  {label}
                </label>
              ))}
              <Button variant="primary">Save changes</Button>
            </div>
          )}
          {tab === "notifications" && (
            <div className="space-y-4 max-w-sm">
              {["On This Day reminders", "Monthly recap ready", "AI reflections", "Streak reminders"].map((label) => (
                <label key={label} className="flex items-center gap-3 font-utility text-cocoa/80">
                  <input type="checkbox" className="w-5 h-5 accent-terracotta rounded" defaultChecked />
                  {label}
                </label>
              ))}
              <Button variant="primary">Save changes</Button>
            </div>
          )}
          {tab === "appearance" && (
            <div className="space-y-3 max-w-sm">
              <p className="font-utility text-cocoa/70 text-sm mb-3">Choose your scrapbook's color mood.</p>
              <div className="flex gap-3">
                {["#E9C5C5", "#C8D5B9", "#DCCEF9", "#FFD8BE"].map((c) => (
                  <button key={c} className="w-10 h-10 rounded-full border-2 border-white shadow-[var(--shadow-paper)]" style={{ background: c }} />
                ))}
              </div>
              <Button variant="primary" className="mt-3">Save changes</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
