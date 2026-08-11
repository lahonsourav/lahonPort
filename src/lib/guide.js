const STORAGE_KEY = "guideSeen";

export const hasSeenGuide = () => localStorage.getItem(STORAGE_KEY) === "true";

export const markGuideSeen = () => localStorage.setItem(STORAGE_KEY, "true");
