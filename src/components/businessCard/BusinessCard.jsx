import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./businessCard.css";
import ReactAlert from "../../additionals/customAlerts/CustomAlert";

// Reference design is a 760px-wide card — every measurement below scales
// down from that baseline to whatever width the card actually renders at.
const REF_W = 760;
const REF_H_UNIT = 12;
const REF_GAP = 18;
const REF_LGAP = 12;
const REF_LABEL_H = 12.5;

// How far (px) the page has to scroll in one direction while the card is in
// view before it flips by itself. It flips twice in total — to the back on the
// way down, back to the front on the way up — then stays put.
const SCROLL_FLIP_DISTANCE = 120;
const AUTO_FLIPS = 2;

const bracePath = (w, h, dir) => {
  const r = Math.min(h, w / 4);
  const c = w / 2;
  return dir === "up"
    ? `M0 ${h} Q0 ${h / 2} ${r} ${h / 2} L${c - r} ${h / 2} Q${c} ${h / 2} ${c} 0 Q${c} ${h / 2} ${c + r} ${h / 2} L${w - r} ${h / 2} Q${w} ${h / 2} ${w} ${h}`
    : `M0 0 Q0 ${h / 2} ${r} ${h / 2} L${c - r} ${h / 2} Q${c} ${h / 2} ${c} ${h} Q${c} ${h / 2} ${c + r} ${h / 2} L${w - r} ${h / 2} Q${w} ${h / 2} ${w} 0`;
};

const BusinessCard = () => {
  const [flipped, setFlipped] = useState(false);
  const sceneRef = useRef(null);
  const emailRef = useRef(null);
  const siteRef = useRef(null);
  const [braces, setBraces] = useState(null);
  const [scale, setScale] = useState(1);
  const autoFlips = useRef(0);

  const form = useRef();
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const measure = () => {
      const scene = sceneRef.current;
      const email = emailRef.current;
      const site = siteRef.current;
      if (!scene || !email || !site) return;

      const s = scene.offsetWidth / REF_W;
      scene.style.setProperty("--bc-scale", s);
      setScale(s);

      setBraces({
        ew: email.offsetWidth,
        eh: email.offsetHeight,
        sw: site.offsetWidth,
        sx: site.offsetLeft,
      });
    };
    measure();
    if (document.fonts?.ready) document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // While the card is on screen: scrolling DOWN past it flips it to the back,
  // and scrolling back UP flips it to the front again — then it stays put
  // (AUTO_FLIPS total). Tying the two flips to opposite directions is what
  // keeps the visitor from seeing both happen in one quick scroll. It never
  // flips under someone who is filling in the form, stops for good once the
  // visitor flips it themselves, and is skipped for reduced-motion users.
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let visible = false;
    let lastY = window.scrollY;
    let travelled = 0; // signed: + down, - up, reset whenever direction flips

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        travelled = 0;
        lastY = window.scrollY;
      },
      { threshold: 0.3 }
    );
    observer.observe(scene);

    const formInUse = () => {
      const f = form.current;
      if (!f) return false;
      if (f.contains(document.activeElement)) return true;
      return Array.from(f.elements).some((el) => el.value && el.type !== "submit");
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      if (!visible || !delta) return;
      // A change of direction restarts the count.
      travelled = Math.sign(travelled) === Math.sign(delta) ? travelled + delta : delta;

      if (autoFlips.current >= AUTO_FLIPS) return; // visitor took over
      // Flip 1 (to back) needs downward travel, flip 2 (to front) upward.
      const wantDown = autoFlips.current === 0;
      const enough = wantDown ? travelled >= SCROLL_FLIP_DISTANCE : travelled <= -SCROLL_FLIP_DISTANCE;
      if (!enough || formInUse()) return;

      travelled = 0;
      autoFlips.current += 1;
      setFlipped((f) => !f);
      if (autoFlips.current >= AUTO_FLIPS) {
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const H = REF_H_UNIT * scale;
  const GAP = REF_GAP * scale;
  const LGAP = REF_LGAP * scale;
  const LABEL_H = REF_LABEL_H * scale;

  const clearError = (field) =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));

  const validate = (data) => {
    const next = {};
    if (!data.get("name")?.trim()) next.name = "Enter your name.";
    if (!data.get("message")?.trim()) next.message = "Write a message.";
    return next;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const data = new FormData(form.current);
    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    emailjs
      .sendForm(
        "service_afksea8",
        "template_c7chqje",
        form.current,
        "0RwgMGfnVh-mwKq1J"
      )
      .then(
        () => {
          setAlertMessage("Got your Message, You're such a beautiful human");
          setAlertType("success");
          setShowAlert(true);
        },
        () => {
          setAlertMessage("Oho, The message couldn't be sent, I'll fix it");
          setAlertType("error");
          setShowAlert(true);
        }
      );
    e.target.reset();
  };

  const closeAlert = () => setShowAlert(false);

  return (
    <>
      {showAlert && (
        <ReactAlert message={alertMessage} onClose={closeAlert} type={alertType} />
      )}

      <div className="bcard-scene" ref={sceneRef}>
        <div
          className={`bcard-flip${flipped ? " bcard-flip--flipped" : ""}`}
          onClick={(e) => {
            if (e.target.closest("a, form")) return;
            autoFlips.current = AUTO_FLIPS;
            setFlipped((f) => !f);
          }}
          role="button"
        >
          <div className="bcard-card bcard-card--front">
            <div className="bcard-email" ref={emailRef}>
              <span className="bcard-user">sourav@</span>
              <span className="bcard-site" ref={siteRef}>lahon.in</span>

              {braces && (
                <>
                  <svg
                    className="bcard-brace bcard-brace--email"
                    width={braces.ew} height={H} viewBox={`0 0 ${braces.ew} ${H}`}
                    style={{ left: 0, top: braces.eh + GAP }}
                  >
                    <path d={bracePath(braces.ew, H, "down")} />
                  </svg>
                  <div
                    className="bcard-label bcard-label--email"
                    style={{ left: braces.ew / 2, top: braces.eh + GAP + H + LGAP }}
                  >
                    e-mail
                  </div>

                  <svg
                    className="bcard-brace bcard-brace--web"
                    width={braces.sw} height={H} viewBox={`0 0 ${braces.sw} ${H}`}
                    style={{ left: braces.sx, top: -GAP - H }}
                  >
                    <path d={bracePath(braces.sw, H, "up")} />
                  </svg>
                  <div
                    className="bcard-label bcard-label--web"
                    style={{ left: braces.sx + braces.sw / 2, top: -GAP - H - LGAP - LABEL_H }}
                  >
                    website
                  </div>
                </>
              )}
            </div>

            <div className="bcard-contact-row">
              <a href="tel:+916001098923">+91 60010 98923</a>
              <span className="bcard-dot">·</span>
              <a href="https://wa.me/+916001098923" target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>

            <div className="bcard-hint">click to flip</div>
          </div>

          <div className="bcard-card bcard-card--back">
            <form ref={form} className="bcard-form" onSubmit={sendEmail} noValidate>
              <div className="bcard-form-row">
                <div className="bcard-form-field">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className={`bcard-input${errors.name ? " bcard-input--error" : ""}`}
                    aria-invalid={!!errors.name}
                    onChange={() => clearError("name")}
                  />
                </div>
                <div className="bcard-form-field">
                  <input
                    type="text"
                    name="email"
                    placeholder="Email or phone"
                    className="bcard-input"
                  />
                </div>
              </div>

              <textarea
                name="message"
                rows="1"
                placeholder="Write your message"
                className={`bcard-textarea${errors.message ? " bcard-input--error" : ""}`}
                aria-invalid={!!errors.message}
                onChange={() => clearError("message")}
              />

              {(errors.name || errors.message) && (
                <p className="bcard-form-error">{errors.name || errors.message}</p>
              )}

              <button type="submit" className="bcard-send-btn">
                Send
              </button>
            </form>

            <div className="bcard-back-tick">&larr; flip</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessCard;
