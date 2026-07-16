import React, { useEffect, useRef, useState } from "react";
import "./businessCard.css";

// Reference design is a 760px-wide card — every measurement below scales
// down from that baseline to whatever width the card actually renders at.
const REF_W = 760;
const REF_H_UNIT = 12;
const REF_GAP = 18;
const REF_LGAP = 12;
const REF_LABEL_H = 12.5;

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

  const H = REF_H_UNIT * scale;
  const GAP = REF_GAP * scale;
  const LGAP = REF_LGAP * scale;
  const LABEL_H = REF_LABEL_H * scale;

  return (
    <div className="bcard-scene" ref={sceneRef}>
      <div
        className={`bcard-flip${flipped ? " bcard-flip--flipped" : ""}`}
        onClick={(e) => {
          if (e.target.closest("a")) return;
          setFlipped((f) => !f);
        }}
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
          <div className="bcard-hint">click to flip</div>
        </div>

        <div className="bcard-card bcard-card--back">
          <h1 className="bcard-name">Sourav Lahon</h1>
          <div className="bcard-rule" />
          <div className="bcard-rows">
            <div className="bcard-k">phone</div>
            <div className="bcard-v"><a href="tel:+916001098923">+91 60010 98923</a></div>

            <div className="bcard-k">e-mail</div>
            <div className="bcard-v"><a href="mailto:sourav@lahon.in">sourav@lahon.in</a></div>

            <div className="bcard-k">web</div>
            <div className="bcard-v"><a href="https://lahon.in" target="_blank" rel="noreferrer">lahon.in</a></div>
          </div>
          <div className="bcard-back-tick">&larr; flip</div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
