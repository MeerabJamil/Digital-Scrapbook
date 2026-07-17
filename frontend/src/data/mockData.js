export const currentUser = {
  name: "Wren",
  avatar: "🦊",
  bio: "collecting small golden moments since 2021",
  streak: 14,
  totalMemories: 128,
  totalAlbums: 9,
};

export const moods = [
  { label: "Joyful", emoji: "🌼", tone: "gold" },
  { label: "Cozy", emoji: "☕", tone: "peach" },
  { label: "Peaceful", emoji: "🍃", tone: "sage" },
  { label: "Nostalgic", emoji: "🌙", tone: "lavender" },
  { label: "Grateful", emoji: "🌸", tone: "blush" },
];

export const albums = [
  { id: "a1", title: "Sunday Mornings", cover: "☕", count: 18, color: "peach", spineColor: "#E8B84B" },
  { id: "a2", title: "Garden Diaries", cover: "🌿", count: 24, color: "sage", spineColor: "#AFC29B" },
  { id: "a3", title: "Little Trips", cover: "🧳", count: 12, color: "lavender", spineColor: "#C7B3EE" },
  { id: "a4", title: "Rainy Day Thoughts", cover: "🌧️", count: 9, color: "blush", spineColor: "#DDA9AC" },
  { id: "a5", title: "Kitchen Notes", cover: "🍯", count: 15, color: "gold", spineColor: "#E8B84B" },
  { id: "a6", title: "Old Friends", cover: "🫖", count: 21, color: "sage", spineColor: "#AFC29B" },
];

export const memories = [
  {
    id: "m1",
    albumId: "a1",
    title: "Pancakes & sunlight",
    date: "June 2, 2026",
    mood: moods[0],
    excerpt: "Woke up before the alarm for once. The kitchen smelled like cinnamon and I didn't rush anything.",
    photo: "🥞",
  },
  {
    id: "m2",
    albumId: "a2",
    title: "The tomatoes finally turned red",
    date: "June 4, 2026",
    mood: moods[2],
    excerpt: "Three months of watering and worrying and today there they were, red and warm from the sun.",
    photo: "🍅",
  },
  {
    id: "m3",
    albumId: "a3",
    title: "Train window daydreaming",
    date: "May 28, 2026",
    mood: moods[3],
    excerpt: "Fields going by in a blur. Wrote half a letter I'll probably never send.",
    photo: "🚋",
  },
  {
    id: "m4",
    albumId: "a4",
    title: "Thunder made the tea taste better",
    date: "May 20, 2026",
    mood: moods[1],
    excerpt: "Stayed in, read three chapters, let the storm do all the talking.",
    photo: "☔",
  },
  {
    id: "m5",
    albumId: "a5",
    title: "Grandma's bread recipe, attempt #4",
    date: "May 14, 2026",
    mood: moods[4],
    excerpt: "Still not quite right but closer. The kitchen remembers her better than I do.",
    photo: "🍞",
  },
  {
    id: "m6",
    albumId: "a1",
    title: "Slow coffee, no phone",
    date: "May 9, 2026",
    mood: moods[2],
    excerpt: "An hour of nothing, on purpose. Should do this more.",
    photo: "☕",
  },
];

export const onThisDay = [
  { id: "o1", year: 2024, title: "First sunflower bloomed", photo: "🌻" },
  { id: "o2", year: 2023, title: "Got caught in the best rainstorm", photo: "🌧️" },
  { id: "o3", year: 2022, title: "Baked bread for the first time", photo: "🍞" },
];

export const notifications = [
  { id: "n1", text: "Your monthly recap for June is ready to open ✨", time: "2h ago", read: false },
  { id: "n2", text: "3 years ago today: 'First sunflower bloomed' 🌻", time: "1d ago", read: false },
  { id: "n3", text: "Your AI companion left a reflection on 'Pancakes & sunlight'", time: "2d ago", read: true },
  { id: "n4", text: "You've written for 14 days in a row — keep the streak glowing!", time: "3d ago", read: true },
];

export const moodTrend = [
  { month: "Jan", joyful: 6, cozy: 4, peaceful: 3, nostalgic: 2, grateful: 5 },
  { month: "Feb", joyful: 5, cozy: 6, peaceful: 4, nostalgic: 3, grateful: 4 },
  { month: "Mar", joyful: 8, cozy: 5, peaceful: 5, nostalgic: 2, grateful: 6 },
  { month: "Apr", joyful: 7, cozy: 7, peaceful: 6, nostalgic: 4, grateful: 5 },
  { month: "May", joyful: 9, cozy: 8, peaceful: 5, nostalgic: 5, grateful: 7 },
  { month: "Jun", joyful: 10, cozy: 6, peaceful: 7, nostalgic: 3, grateful: 8 },
];

export const entriesPerMonth = [
  { month: "Jan", entries: 14 },
  { month: "Feb", entries: 11 },
  { month: "Mar", entries: 18 },
  { month: "Apr", entries: 22 },
  { month: "May", entries: 19 },
  { month: "Jun", entries: 24 },
];

export const aiReflections = [
  {
    id: "r1",
    memoryTitle: "Pancakes & sunlight",
    text: "You keep finding joy in mornings that ask nothing of you. Maybe the lesson isn't the pancakes — it's the not-rushing.",
  },
  {
    id: "r2",
    memoryTitle: "The tomatoes finally turned red",
    text: "Three months of small, unglamorous care turned into something red and warm. That's most good things, actually.",
  },
  {
    id: "r3",
    memoryTitle: "Thunder made the tea taste better",
    text: "You write your coziest entries on the loudest days. Storms seem to give you permission to slow down.",
  },
];

export const avatarOptions = {
  species: ["🦊", "🐻", "🐰", "🐼", "🐧", "🦆", "🐸", "🐹", "🐨", "🌵", "👻", "🧑‍🚀"],
  hats: ["none", "🎩", "🧢", "👒", "🎀"],
  glasses: ["none", "🕶️", "👓"],
  backgrounds: ["cream", "blush", "sage", "lavender", "peach"],
  expressions: ["😊", "🥰", "😴", "😋", "🤩"],
};
