import { useEffect, useRef, useState } from "react";
import { MdEmojiEvents } from "react-icons/md";
import { ACHIEVEMENTS, ACHIEVEMENT_EVENT, getUnlocked } from "../../lib/achievements";
import { playUnlock } from "../../lib/sound";
import "./AchievementsTray.css";

const AchievementsTray = () => {
  const [unlocked, setUnlocked] = useState(getUnlocked);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onUnlock = (e) => {
      setUnlocked(getUnlocked());
      setToast(e.detail);
      playUnlock();
      setTimeout(() => setToast(null), 4000);
    };
    window.addEventListener(ACHIEVEMENT_EVENT, onUnlock);
    return () => window.removeEventListener(ACHIEVEMENT_EVENT, onUnlock);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  return (
    <>
      <div className="achievements-tray" ref={wrapRef}>
        <button
          type="button"
          className="achievements-tray__btn"
          onClick={() => setOpen((o) => !o)}
          aria-label="Achievements"
          aria-expanded={open}
          title="Achievements"
        >
          <MdEmojiEvents />
          {unlocked.length > 0 && <span className="achievements-tray__count">{unlocked.length}</span>}
        </button>

        {open && (
          <div className="achievements-tray__panel" role="menu">
            <div className="achievements-tray__header">
              Achievements <span>{unlocked.length}/{ACHIEVEMENTS.length}</span>
            </div>
            {ACHIEVEMENTS.map((a) => {
              const isUnlocked = unlocked.includes(a.id);
              return (
                <div key={a.id} className={`achievements-tray__item${isUnlocked ? "" : " achievements-tray__item--locked"}`}>
                  <span className="achievements-tray__icon">{isUnlocked ? a.icon : "🔒"}</span>
                  <span className="achievements-tray__text">
                    <span className="achievements-tray__title">{a.title}</span>
                    <span className="achievements-tray__desc">{a.description}</span>
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {toast && (
        <div className="achievement-toast">
          <span className="achievement-toast__icon">{toast.icon}</span>
          <span className="achievement-toast__text">
            <span className="achievement-toast__title">Achievement unlocked</span>
            <span className="achievement-toast__name">{toast.title}</span>
          </span>
        </div>
      )}
    </>
  );
};

export default AchievementsTray;
