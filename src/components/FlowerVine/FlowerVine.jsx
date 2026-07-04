import { useEffect, useRef, useState } from "react";
import "./FlowerVine.css";

const S = "#7ee787";
const W = "0.55"; /* local stroke width — flowers are scaled ~3x, so renders ~1.6px */

/* ── Helpers ── */
const polar = (r, deg) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [r * Math.cos(rad), r * Math.sin(rad)];
};

// Almond petal pointing up from origin
const petalD = (len, w) =>
  `M 0,0 Q ${-w},${-(len * 0.45)} 0,${-len} Q ${w},${-(len * 0.45)} 0,0`;

// Circle as path so getTotalLength() works
const circleD = (r) =>
  `M 0,${-r} A ${r},${r} 0 1,0 0,${r} A ${r},${r} 0 1,0 0,${-r} Z`;

/* ── Flower designs (local units, ~r24; scaled up at render) ── */

// 1. Classic 6-petal lotus
const Lotus6 = () => (
  <g>
    {[0, 60, 120, 180, 240, 300].map((a) => (
      <path key={a} className="vf-path" transform={`rotate(${a})`}
        d={petalD(22, 5.5)} fill="none" stroke={S} strokeWidth={W} strokeLinecap="round" />
    ))}
    {[30, 90, 150, 210, 270, 330].map((a) => (
      <path key={`s${a}`} className="vf-path" transform={`rotate(${a})`}
        d={petalD(13, 3)} fill="none" stroke={S} strokeWidth={W} strokeLinecap="round" />
    ))}
    <path className="vf-path" d={circleD(5.5)} fill="none" stroke={S} strokeWidth={W} />
    {[30, 90, 150, 210, 270, 330].map((a) => {
      const [x, y] = polar(18, a);
      return <circle key={`d${a}`} className="vf-dot" cx={x} cy={y} r="1.3" fill={S} />;
    })}
  </g>
);

// 2. Mandala — concentric rings + radial spokes
const Mandala = () => (
  <g>
    <path className="vf-path" d={circleD(23)} fill="none" stroke={S} strokeWidth={W} />
    <path className="vf-path" d={circleD(14)} fill="none" stroke={S} strokeWidth={W} />
    <path className="vf-path" d={circleD(6)} fill="none" stroke={S} strokeWidth={W} />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
      const [x1, y1] = polar(14, a);
      const [x2, y2] = polar(23, a);
      return <path key={a} className="vf-path" d={`M ${x1},${y1} L ${x2},${y2}`}
        fill="none" stroke={S} strokeWidth={W} />;
    })}
    {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((a) => {
      const [x, y] = polar(18.5, a);
      return <circle key={a} className="vf-dot" cx={x} cy={y} r="1.3" fill={S} />;
    })}
  </g>
);

// 3. 8-petal lotus with outer ring
const Lotus8 = () => (
  <g>
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
      <path key={a} className="vf-path" transform={`rotate(${a})`}
        d={petalD(21, 4.5)} fill="none" stroke={S} strokeWidth={W} strokeLinecap="round" />
    ))}
    {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((a) => (
      <path key={`i${a}`} className="vf-path" transform={`rotate(${a})`}
        d={petalD(12, 2.5)} fill="none" stroke={S} strokeWidth={W} strokeLinecap="round" />
    ))}
    <path className="vf-path" d={circleD(5)} fill="none" stroke={S} strokeWidth={W} />
    <path className="vf-path" d={circleD(23)} fill="none" stroke={S} strokeWidth={W} />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
      const [x, y] = polar(23, a);
      return <circle key={`d${a}`} className="vf-dot" cx={x} cy={y} r="1.3" fill={S} />;
    })}
  </g>
);

// 4. Paisley-inspired — 6 teardrop petals + inner diamond
const Paisley = () => (
  <g>
    {[0, 60, 120, 180, 240, 300].map((a) => (
      <path key={a} className="vf-path" transform={`rotate(${a})`}
        d={petalD(19, 5)} fill="none" stroke={S} strokeWidth={W} strokeLinecap="round" />
    ))}
    <path className="vf-path" d="M 0,-12 L 7,0 L 0,12 L -7,0 Z"
      fill="none" stroke={S} strokeWidth={W} strokeLinejoin="round" />
    <path className="vf-path" d={circleD(4.5)} fill="none" stroke={S} strokeWidth={W} />
    {[30, 90, 150, 210, 270, 330].map((a) => {
      const [x, y] = polar(20, a);
      return <circle key={a} className="vf-dot" cx={x} cy={y} r="1.1" fill={S} />;
    })}
  </g>
);

/* ── "LAHON" written as ONE continuous stroke ──
   Letters connect along the baseline; the A crossbar and H legs are
   drawn by retracing the pen over the same segment, so the line never lifts. */
const LAHON_D = [
  "M 0,-14 L 0,0 L 8,0", // L
  "L 10,0 L 14,-14 L 18,0 L 16,-7 L 12,-7 L 16,-7 L 18,0", // A (crossbar via retrace)
  "L 22,0 L 22,-14 L 22,-7 L 30,-7 L 30,-14 L 30,0", // H (legs via retrace)
  "L 38,0 A 4,7 0 0 1 38,-14 A 4,7 0 0 1 38,0", // O (full loop, in and out at the base)
  "L 44,0 L 44,-14 L 52,0 L 52,-14", // N
].join(" ");

const LahonText = () => (
  <g transform="translate(-26, 7)">
    <path className="vf-path vf-signature" d={LAHON_D} fill="none"
      stroke={S} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

// Finale: big lotus with the LAHON signature beneath it
const Finale = () => (
  <g>
    <g transform="scale(3.4)">
      <Lotus8 />
    </g>
    <g transform="translate(0, 122) scale(1.9)">
      <LahonText />
    </g>
  </g>
);

/* Flower cycle for the section gaps */
const GAP_FLOWERS = [Lotus6, Mandala, Lotus8, Paisley, Lotus6];

const FlowerVine = () => {
  const wrapRef = useRef(null);
  const stemRef = useRef(null);
  const [layout, setLayout] = useState({
    w: 0,
    h: 0,
    eduTop: 0,
    eduBottom: 0,
    eduAxisX: 0,
    gaps: [],
  });

  const { w, h, eduTop, eduBottom, eduAxisX, gaps } = layout;
  const cx = w / 2;
  const amp = Math.min(w * 0.2, 300); /* lateral sweep between flowers */
  const mobile = w > 0 && w <= 768;

  // Flowers sit centered in the open gaps between sections, on the stem
  // itself — sized to fit their gap. The finale gets its own reserved space.
  // On mobile, the flower right below the timeline shifts slightly left so
  // the stem flows into it naturally from the timeline's left-side axis.
  const finaleY = h - 170;
  const flowers =
    w > 0 && h > 0 && eduBottom > eduTop
      ? gaps.map((g, i) => ({
          y: g.y,
          x:
            mobile && g.y > eduBottom && (i === 0 || gaps[i - 1].y < eduTop)
              ? cx - w * 0.17
              : cx,
          /* flower DIAMETER ≈ 55% of its gap (local radius is ~24 units) */
          scale: Math.max(1.4, Math.min(3.0, (g.size * 0.55) / 48)),
          Component: GAP_FLOWERS[i % GAP_FLOWERS.length],
        }))
      : [];

  // Stem route: down the side lane at the top, converging to the center
  // inside the first open gap, straight through the timeline axis, then
  // sweeping side to side between the centered gap flowers. On mobile the
  // sweeps span nearly the full page width.
  const sweepAmp = mobile ? w * 0.38 : amp;
  const laneX = mobile ? cx + w * 0.38 : cx + Math.min(w * 0.35, 560);
  let stemD = "";
  if (flowers.length) {
    const pts = [[laneX, 0]];
    // hold the side lane until just above the first flower's gap
    pts.push([laneX, Math.max(0, flowers[0].y - 170)]);
    let side = -1;
    flowers.forEach((f, i) => {
      pts.push([f.x, f.y]);
      if (f.y < eduTop) {
        // After the flower above the timeline, run straight down its axis
        // (centered on desktop, left-aligned on mobile)
        pts.push([eduAxisX, eduTop + 10], [eduAxisX, eduBottom - 10]);
      } else {
        const nextY = i < flowers.length - 1 ? flowers[i + 1].y : finaleY;
        if (nextY - f.y > 500) {
          // Swing sideways quickly after the flower so the stem clears the
          // next section's centered headings instead of cutting through them
          pts.push([cx + side * sweepAmp, Math.min(f.y + 170, (f.y + nextY) / 2)]);
          side = -side;
        }
      }
    });
    pts.push([cx, finaleY]);

    stemD = `M ${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      const ym = (y0 + y1) / 2;
      stemD += ` C ${x0},${ym} ${x1},${ym} ${x1},${y1}`;
    }
  }

  // Measure the wrapper, the timeline axis, and the gaps between sections
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const wrapRect = el.getBoundingClientRect();
      const rel = (r) => ({ top: r.top - wrapRect.top, bottom: r.bottom - wrapRect.top });
      const q = (sel) => {
        const s = document.querySelector(sel);
        return s ? rel(s.getBoundingClientRect()) : null;
      };
      const secs = ["#about", "#experience", "#skills", "#portfolio", "#bio", "#contact"]
        .map(q)
        .filter(Boolean);
      const gapList = [];
      for (let i = 1; i < secs.length; i++) {
        const size = secs[i].top - secs[i - 1].bottom;
        if (size > 60) {
          gapList.push({ y: (secs[i - 1].bottom + secs[i].top) / 2, size });
        }
      }
      const tl = document.querySelector(".edu__timeline");
      const tlRect = tl ? tl.getBoundingClientRect() : null;
      // The timeline's vertical line is centered on desktop, but sits at
      // left: calc(25px + 1rem) on mobile (≤768px)
      const isMobile = window.innerWidth <= 768;
      setLayout({
        w: el.offsetWidth,
        h: el.offsetHeight,
        eduTop: tlRect ? tlRect.top - wrapRect.top : 0,
        eduBottom: tlRect ? tlRect.bottom - wrapRect.top : 0,
        eduAxisX: tlRect
          ? tlRect.left - wrapRect.left + (isMobile ? 41 : tlRect.width / 2)
          : 0,
        gaps: gapList,
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Prepare stroke lengths + scroll-driven draw
  useEffect(() => {
    const el = wrapRef.current;
    const stem = stemRef.current;
    if (!el || !stem || !stemD) return;

    const stemLen = stem.getTotalLength();
    stem.style.strokeDasharray = stemLen;
    stem.style.strokeDashoffset = stemLen;

    el.querySelectorAll(".vf-path").forEach((path) => {
      if (typeof path.getTotalLength === "function") {
        const len = path.getTotalLength();
        path.style.strokeDasharray = len;
        if (!path.closest(".vf-flower--bloomed")) {
          path.style.strokeDashoffset = len;
        }
      }
    });

    // The stem's lateral sweeps add length, so equal length-steps don't
    // advance the tip evenly down the page. Build a y → length lookup so
    // the tip can track a fixed viewport anchor (60% of viewport height).
    const SAMPLES = 300;
    const lut = [];
    for (let i = 0; i <= SAMPLES; i++) {
      const len = (stemLen * i) / SAMPLES;
      lut.push({ len, y: stem.getPointAtLength(len).y });
    }
    const lengthAtY = (y) => {
      if (y <= lut[0].y) return 0;
      if (y >= lut[lut.length - 1].y) return stemLen;
      let lo = 0;
      let hi = lut.length - 1;
      while (lo < hi - 1) {
        const mid = (lo + hi) >> 1;
        if (lut[mid].y <= y) lo = mid;
        else hi = mid;
      }
      const a = lut[lo];
      const b = lut[hi];
      const t = (y - a.y) / (b.y - a.y || 1);
      return a.len + t * (b.len - a.len);
    };

    const flowerEls = el.querySelectorAll(".vf-flower");
    let ticking = false;
    let lastLen = -1;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      // y-position of the tip within the wrapper: 60% down the viewport
      const tipY = viewH * 0.6 - rect.top;
      const drawnLen = lengthAtY(Math.max(0, Math.min(rect.height, tipY)));
      // Skip repainting the (page-sized) SVG when nothing changed
      if (Math.abs(drawnLen - lastLen) < 0.5) return;
      lastLen = drawnLen;
      stem.style.strokeDashoffset = stemLen - drawnLen;

      flowerEls.forEach((flower) => {
        const frac = parseFloat(flower.dataset.frac);
        flower.classList.toggle("vf-flower--bloomed", tipY >= frac * rect.height);
      });
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [stemD]);

  return (
    <div className="flower-vine" ref={wrapRef} aria-hidden="true">
      {flowers.length > 0 && (
        <svg
          className="flower-vine__svg"
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
        >
          <path
            ref={stemRef}
            className="vf-stem"
            d={stemD}
            fill="none"
            stroke={S}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {flowers.map(({ x, y, scale, Component }, i) => (
            <g
              key={i}
              className="vf-flower"
              data-frac={(y / h).toFixed(4)}
              transform={`translate(${x}, ${y}) scale(${scale})`}
            >
              <Component />
            </g>
          ))}
          <g
            className="vf-flower"
            data-frac={(finaleY / h).toFixed(4)}
            transform={`translate(${cx}, ${finaleY})`}
          >
            <Finale />
          </g>
        </svg>
      )}
    </div>
  );
};

export default FlowerVine;
