import { moods } from "../data/mockData";

const DEFAULT_MOOD = { label: "Unrated", emoji: "🌤️", tone: "sand" };

// The backend only stores the mood label as a plain string (AI Memory
// Companion in Week 5 will set it automatically). The frontend components
// were designed around a richer { label, emoji, tone } object, so this
// looks up the matching entry from the shared `moods` reference list.
function moodObjectFor(label) {
  return moods.find((m) => m.label === label) || { ...DEFAULT_MOOD, label: label || "Unrated" };
}

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function toMemoryView(memory) {
  return {
    ...memory,
    id: memory._id,
    excerpt: memory.note,
    mood: moodObjectFor(memory.mood),
    date: formatDate(memory.date),
  };
}
