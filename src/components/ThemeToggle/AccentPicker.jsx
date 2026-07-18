import { useEffect, useRef, useState } from "react";
import { MdPalette } from "react-icons/md";
import "./AccentPicker.css";

const STORAGE_KEY = "accent";

const ACCENTS = [
  { id: "green", label: "Green", swatch: "#2ea043" },
  { id: "blue", label: "Blue", swatch: "#1f6feb" },
  { id: "purple", label: "Purple", swatch: "#8957e5" },
  { id: "pink", label: "Pink", swatch: "#db61a2" },
  { id: "orange", label: "Orange", swatch: "#c9510c" },
  { id: "red", label: "Red", swatch: "#da3633" },
];

const getInitialAccent = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return ACCENTS.some((a) => a.id === stored) ? stored : "green";
};

const AccentPicker = () => {
  const [accent, setAccent] = useState(getInitialAccent);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-accent", accent);
    localStorage.setItem(STORAGE_KEY, accent);
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
              className={`accent-picker__swatch${accent === a.id ? " accent-picker__swatch--active" : ""}`}
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
