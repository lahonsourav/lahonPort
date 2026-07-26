export const PROJECT_PATHS = ["/wormhole", "/moksha", "/lazykit", "/lazyperm"];

export const ACHIEVEMENTS = [
  { id: "shape-shifter", icon: "🌗", title: "Shape Shifter", description: "Switched between light and dark mode." },
  { id: "colorful", icon: "🎨", title: "Colorful", description: "Tried 3 different accent colors." },
  { id: "curious", icon: "🔍", title: "Curious", description: "Used the site search." },
  { id: "bookworm", icon: "📚", title: "Bookworm", description: "Read every blog post." },
  { id: "full-tour", icon: "🗺️", title: "Full Tour", description: "Visited every project page." },
  { id: "deep-diver", icon: "⬇️", title: "Deep Diver", description: "Scrolled all the way down to Contact." },
];

const STORAGE_KEY = "achievements";
export const ACHIEVEMENT_EVENT = "achievement-unlocked";

const readSet = (key) => {
  try {
    return new Set(JSON.parse(localStorage.getItem(key) || "[]"));
  } catch {
    return new Set();
  }
};

const writeSet = (key, set) => localStorage.setItem(key, JSON.stringify([...set]));

export const getUnlocked = () => [...readSet(STORAGE_KEY)];

export const isUnlocked = (id) => readSet(STORAGE_KEY).has(id);

export const unlock = (id) => {
  const unlocked = readSet(STORAGE_KEY);
  if (unlocked.has(id)) return;
  unlocked.add(id);
  writeSet(STORAGE_KEY, unlocked);
  const achievement = ACHIEVEMENTS.find((a) => a.id === id);
  if (achievement) {
    window.dispatchEvent(new CustomEvent(ACHIEVEMENT_EVENT, { detail: achievement }));
  }
};

export const trackAccentTried = (accentId) => {
  const tried = readSet("accents-tried");
  tried.add(accentId);
  writeSet("accents-tried", tried);
  if (tried.size >= 3) unlock("colorful");
};

export const trackProjectVisit = (path) => {
  if (!PROJECT_PATHS.includes(path)) return;
  const visited = readSet("projects-visited");
  visited.add(path);
  writeSet("projects-visited", visited);
  if (PROJECT_PATHS.every((p) => visited.has(p))) unlock("full-tour");
};

export const trackBlogRead = (allSlugs) => {
  const allRead = allSlugs.every((slug) => parseInt(localStorage.getItem(`blog_reads_${slug}`) || "0", 10) > 0);
  if (allRead) unlock("bookworm");
};
