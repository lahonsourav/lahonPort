import { useCallback, useEffect, useRef, useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { hasSeenGuide, markGuideSeen } from "../../lib/guide";
import { unlock } from "../../lib/achievements";
import { playToggle, playClick } from "../../lib/sound";
import "./Guide.css";

const STEPS = [
  {
    selector: ".theme-toggle",
    title: "Light & dark",
    body: "Switch between a light and dark theme any time — it's remembered on this device.",
  },
  {
    selector: ".accent-picker__btn",
    title: "Pick a color",
    body: "Choose the accent color that runs through buttons, links, and highlights across the whole site.",
  },
  {
    selector: ".sound-toggle",
    title: "Sound",
    body: "Little click and unlock sounds — on by default, easy to mute here.",
  },
  {
    selector: ".sticky-mode-toggle",
    title: "Sticky note mode",
    body: "See the whole site as paper notes pinned to a desk. Worth a look.",
  },
  {
    selector: ".achievements-tray__btn",
    title: "Achievements",
    body: "Hidden achievements unlock as you explore the site — check your progress any time here.",
  },
];

const Guide = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (hasSeenGuide()) return;
    const t = setTimeout(() => setOpen(true), 900);
    return () => clearTimeout(t);
  }, []);

  const measure = useCallback(() => {
    const el = document.querySelector(STEPS[step].selector);
    setRect(el ? el.getBoundingClientRect() : null);
  }, [step]);

  useEffect(() => {
    if (!open) return;
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open, measure]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cardRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const finish = useCallback((completed) => {
    setOpen(false);
    markGuideSeen();
    if (completed) unlock("well-oriented");
  }, []);

  const next = useCallback(() => {
    if (step < STEPS.length - 1) {
      playClick();
      setStep((s) => s + 1);
    } else {
      finish(true);
    }
  }, [step, finish]);

  const back = useCallback(() => {
    playClick();
    setStep((s) => Math.max(0, s - 1));
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") finish(false);
      else if (e.key === "ArrowRight" || e.key === "Enter") next();
      else if (e.key === "ArrowLeft") back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, back, finish]);

  const startTour = () => {
    setStep(0);
    setOpen(true);
    playToggle();
  };

  const current = STEPS[step];

  return (
    <>
      <button
        type="button"
        className="guide-trigger"
        onClick={startTour}
        aria-label="Show site guide"
        title="Show site guide"
      >
        <BsQuestionCircle />
      </button>

      {open && (
        <div className="guide-overlay">
          <div className="guide-backdrop" onClick={() => finish(false)} />

          {rect && (
            <div
              className="guide-spotlight"
              style={{
                top: rect.top - 8,
                left: rect.left - 8,
                width: rect.width + 16,
                height: rect.height + 16,
              }}
            />
          )}

          <div
            className="guide-card"
            role="dialog"
            aria-modal="true"
            aria-label={`Site guide, step ${step + 1} of ${STEPS.length}`}
            tabIndex={-1}
            ref={cardRef}
          >
            <p className="guide-step-count">{step + 1} / {STEPS.length}</p>
            <h3>{current.title}</h3>
            <p>{current.body}</p>
            <div className="guide-actions">
              <button type="button" className="guide-skip" onClick={() => finish(false)}>
                Skip
              </button>
              <div className="guide-nav">
                {step > 0 && (
                  <button type="button" className="guide-back" onClick={back}>
                    Back
                  </button>
                )}
                <button type="button" className="guide-next" onClick={next}>
                  {step === STEPS.length - 1 ? "Done" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Guide;
