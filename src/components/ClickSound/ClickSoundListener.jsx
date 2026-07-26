import { useEffect } from "react";
import { playClick } from "../../lib/sound";

// Generic click sound for (almost) every interactive element site-wide,
// via one delegated listener instead of wiring playClick() into every
// individual handler. `.btn` covers the many legacy clickable <div>s that
// predate proper button semantics; skip elements that already play their
// own distinct sound (ThemeToggle's playToggle, SoundToggle's own
// enable/disable logic).
const SOUND_SELECTOR = 'button, a, [role="button"], .btn';
const SKIP_SELECTOR = ".theme-toggle, .sound-toggle";

const ClickSoundListener = () => {
  useEffect(() => {
    const onClick = (e) => {
      const target = e.target.closest(SOUND_SELECTOR);
      if (!target || target.closest(SKIP_SELECTOR)) return;
      playClick();
    };
    // Capture phase: some libraries (e.g. react-scroll's <Link>) stop
    // propagation on their own click handler, which would otherwise
    // silently swallow this before it reaches a bubble-phase listener.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
};

export default ClickSoundListener;
