export const SKILL_SELECT_EVENT = "skill-select";

// Only skills a homepage project's own description literally names —
// Wormhole and Innercast both say "(React Native, ...)", Success Point
// Gogamukh says "(React, PostgreSQL)", AVSR's text names SVM and LSTM
// directly and describes CNNs/DNNs (Deep Learning) and the overall
// approach (Machine Learning). Every project on the full /work page has
// far more tech than this; this map is deliberately just the four picks
// shown on the homepage.
export const SKILL_PROJECTS = {
  "React Native": ["wormhole", "mood"],
  React: ["spg"],
  SQL: ["spg"],
  "Machine Learning": ["avsr"],
  "Deep Learning": ["avsr"],
  SVM: ["avsr"],
  LSTM: ["avsr"],
};
