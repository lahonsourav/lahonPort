import { useEffect, useState } from "react";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";
import { playToggle } from "../../sound";
import { unlock } from "../../achievements";
import "./ThemeToggle.css";

const STORAGE_KEY = "theme";

const getInitialTheme = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : "light";
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
    playToggle();
    unlock("shape-shifter");
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <BsSunFill /> : <BsMoonStarsFill />}
    </button>
  );
};

export default ThemeToggle;
