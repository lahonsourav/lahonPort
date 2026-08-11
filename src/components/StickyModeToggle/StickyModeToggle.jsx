import { useEffect, useState } from "react";
import { BsStickyFill, BsSticky } from "react-icons/bs";
import { playToggle } from "../../lib/sound";
import { unlock } from "../../lib/achievements";
import "./StickyModeToggle.css";

const STORAGE_KEY = "mode";

const getInitialMode = () => {
  return localStorage.getItem(STORAGE_KEY) === "sticky" ? "sticky" : "normal";
};

const StickyModeToggle = () => {
  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    if (mode === "sticky") {
      document.documentElement.setAttribute("data-mode", "sticky");
    } else {
      document.documentElement.removeAttribute("data-mode");
    }
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((m) => (m === "sticky" ? "normal" : "sticky"));
    playToggle();
    unlock("note-taker");
  };

  return (
    <button
      type="button"
      className="sticky-mode-toggle"
      onClick={toggleMode}
      aria-pressed={mode === "sticky"}
      aria-label={mode === "sticky" ? "Turn off sticky note mode" : "Turn on sticky note mode"}
      title={mode === "sticky" ? "Turn off sticky note mode" : "Turn on sticky note mode"}
    >
      {mode === "sticky" ? <BsStickyFill /> : <BsSticky />}
    </button>
  );
};

export default StickyModeToggle;
