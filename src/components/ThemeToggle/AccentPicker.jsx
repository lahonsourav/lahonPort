import { useEffect, useRef, useState } from "react";
import { MdPalette } from "react-icons/md";
import "./AccentPicker.css";

const STORAGE_KEY = "accent";
const DYNAMIC_ID = "dynamic";

// Hue sweeps from blue at the top of the page to red at the bottom, and
// back again on the way up — it's a pure function of scroll position, not
// time, so reversing scroll direction reverses the color for free.
const HUE_START = 210; // blue
const HUE_END = 360; // red (travels through purple/pink on the way)

const ACCENTS = [
  { id: DYNAMIC_ID, label: "Dynamic (follows scroll)", swatch: "linear-gradient(135deg, #58a6ff, #8957e5, #db61a2, #da3633)" },
  { id: "green", label: "Green", swatch: "#2ea043" },
  { id: "blue", label: "Blue", swatch: "#1f6feb" },
  { id: "purple", label: "Purple", swatch: "#8957e5" },
  { id: "pink", label: "Pink", swatch: "#db61a2" },
  { id: "orange", label: "Orange", swatch: "#c9510c" },
  { id: "red", label: "Red", swatch: "#da3633" },
];

const getInitialAccent = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return ACCENTS.some((a) => a.id === stored) ? stored : DYNAMIC_ID;
};

const applyDynamicColors = (hue) => {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  const style = document.documentElement.style;
  if (isLight) {
    style.setProperty("--ds-green", `hsl(${hue} 75% 38%)`);
    style.setProperty("--ds-green-btn", `hsl(${hue} 75% 42%)`);
    style.setProperty("--ds-green-btn-hover", `hsl(${hue} 75% 35%)`);
    style.setProperty("--ds-green-bg", `hsl(${hue} 85% 92%)`);
  } else {
    style.setProperty("--ds-green", `hsl(${hue} 85% 78%)`);
    style.setProperty("--ds-green-btn", `hsl(${hue} 70% 38%)`);
    style.setProperty("--ds-green-btn-hover", `hsl(${hue} 70% 48%)`);
    style.setProperty("--ds-green-bg", `hsl(${hue} 45% 20%)`);
  }
};

const clearDynamicColors = () => {
  const style = document.documentElement.style;
  style.removeProperty("--ds-green");
  style.removeProperty("--ds-green-btn");
  style.removeProperty("--ds-green-btn-hover");
  style.removeProperty("--ds-green-bg");
};

const AccentPicker = () => {
  const [accent, setAccent] = useState(getInitialAccent);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-accent", accent);
    localStorage.setItem(STORAGE_KEY, accent);
    clearDynamicColors();

    if (accent !== DYNAMIC_ID) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, el.scrollTop / total)) : 0;
      applyDynamicColors(HUE_START + progress * (HUE_END - HUE_START));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    // The hue's saturation/lightness formula differs per theme, so redo
    // the current hue whenever dark/light is toggled mid-scroll.
    const themeObserver = new MutationObserver(update);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      themeObserver.disconnect();
      clearDynamicColors();
    };
  }, [accent]);

  useEffect(() => {
    if (!open) return;

    const handleOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div className="accent-picker" ref={wrapperRef}>
      <button
        type="button"
        className="accent-picker__btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="Choose accent color"
        aria-expanded={open}
        title="Choose accent color"
      >
        <MdPalette />
      </button>

      {open && (
        <div className="accent-picker__panel" role="menu">
          {ACCENTS.map((a) => (
            <button
              key={a.id}
              type="button"
              role="menuitemradio"
              aria-checked={accent === a.id}
              aria-label={a.label}
              title={a.label}
              className={`accent-picker__swatch${accent === a.id ? " accent-picker__swatch--active" : ""}${a.id === DYNAMIC_ID ? " accent-picker__swatch--dynamic" : ""}`}
              style={{ "--swatch-color": a.swatch }}
              onClick={() => {
                setAccent(a.id);
                setOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AccentPicker;
