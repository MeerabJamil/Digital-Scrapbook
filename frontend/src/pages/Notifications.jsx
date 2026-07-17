import { motion } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import EmptyState from "../components/ui/EmptyState";
import { notifications as initial } from "../data/mockData";
import { useState } from "react";

const TONES = ["bg-blush/60", "bg-sage/60", "bg-lavender/60", "bg-peach/60"];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initial);

  return (
    <div>
      <SectionHeading eyebrow="little reminders" title="Notifications" subtitle="Notes that found their way to your desk." className="mb-8" />

      {notifications.length === 0 ? (
        <EmptyState emoji="🕊️" title="All caught up" subtitle="No new notes waiting for you." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {notifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 10, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: (i % 2 === 0 ? -2 : 2) }}
              className={`relative p-5 rounded-md shadow-[var(--shadow-paper)] ${TONES[i % TONES.length]} ${!n.read ? "ring-2 ring-terracotta/40" : ""}`}
            >
              {!n.read && <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-terracotta" />}
              <p className="font-hand text-xl text-cocoa-deep leading-snug mb-2">{n.text}</p>
              <p className="font-tape text-xs text-cocoa/50">{n.time}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
