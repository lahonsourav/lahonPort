import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./travel.css";
import ShareButton from "../share/ShareButton";
import BackHome from "../shared/BackHome";
import PageFooter from "../shared/PageFooter";
import "../shared/PageShell.css";
import { playClick } from "../../lib/sound";
import { BiReset } from "react-icons/bi";
import { BsInstagram } from "react-icons/bs";
import useReveal from "../reveal/useReveal";

import { PLACES } from "./places";
import { ISLANDS } from "./indiaOutline";
import { STATE_BORDERS } from "./stateBorders";

// Equirectangular projection, with longitude squashed by cos(23°) (India's
// mid-latitude) so the country keeps roughly its real proportions.
const MIN_LNG = 67.5;
const MAX_LNG = 98;
const MIN_LAT = 6;
const MAX_LAT = 37.6;
const SCALE = 20;
const LNG_FACTOR = Math.cos((23 * Math.PI) / 180);

const WIDTH = Math.round((MAX_LNG - MIN_LNG) * LNG_FACTOR * SCALE);
const HEIGHT = Math.round((MAX_LAT - MIN_LAT) * SCALE);

const project = (lng, lat) => [
  (lng - MIN_LNG) * LNG_FACTOR * SCALE,
  (MAX_LAT - lat) * SCALE,
];

const STATE_BORDER_PATHS = STATE_BORDERS.map(({ name, path }) => ({
  name,
  d:
    path.map(([lng, lat], i) => {
      const [x, y] = project(lng, lat);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ") + " Z",
}));

// One hue per state, spread evenly around the wheel (golden-angle step
// avoids similar hues landing next to each other). Fill is derived from the
// hue at render time so the currently-highlighted place's state can shade
// darker without needing a second, hand-kept color list.
const STATE_HUES = STATE_BORDER_PATHS.map((_, i) => Math.round((i * 137.508) % 360));

const stateFill = (hue, isActive) =>
  isActive ? `hsl(${hue}deg 55% 42% / 0.7)` : `hsl(${hue}deg 65% 75% / 0.45)`;

// places.js uses the shorter, familiar "Daman and Diu" for display, but the
// border data (merged into one UT in 2020) calls it by its full current
// name — alias it so the highlight still matches.
const STATE_NAME_ALIASES = {
  "Daman and Diu": "Dadra and Nagar Haveli and Daman and Diu",
};

// Same per-state hue the map's borders use, looked up by name — colors the
// timeline's paper tags by state without a second palette to maintain.
const STATE_HUE_BY_NAME = Object.fromEntries(
  STATE_BORDER_PATHS.map(({ name }, i) => [name, STATE_HUES[i]])
);
const stateHueFor = (state) => STATE_HUE_BY_NAME[STATE_NAME_ALIASES[state] || state];

// Order for the idle auto-cycle: round-robin North → East → West → South
// (by position relative to the map's center) instead of PLACES' own order,
// which is grouped by region and would otherwise dwell in one corner of
// the map for several cycles in a row before jumping elsewhere.
const CYCLE_ORDER = (() => {
  const buckets = { North: [], East: [], West: [], South: [] };
  PLACES.forEach((p) => {
    const [x, y] = project(p.lng, p.lat);
    const dx = x - WIDTH / 2;
    const dy = y - HEIGHT / 2;
    const dir =
      Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "East" : "West") : dy > 0 ? "South" : "North";
    buckets[dir].push(p);
  });
  const dirs = ["North", "East", "West", "South"];
  const order = [];
  let i = 0;
  while (order.length < PLACES.length) {
    const dir = dirs[i % dirs.length];
    if (buckets[dir].length) order.push(buckets[dir].shift());
    i += 1;
  }
  return order;
})();

const PLACES_WITH_IMAGES = PLACES.filter((p) => p.image);

// Strip the map/pin-only "- bike" suffix for prose contexts (gallery
// captions, timeline entries) where the pin color already says as much.
const displayName = (name) => name.replace(/ - bike$/, "");

// `visited` is either a single "Month Year" string or, for a place visited
// more than once, an array of them.
const visitedDates = (visited) => (Array.isArray(visited) ? visited : visited ? [visited] : []);

// Gallery/modal display — every visit, oldest first.
const formatVisited = (visited) => visitedDates(visited).join(" & ");

const MONTH_INDEX = {
  Jan: 0, Feb: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, Aug: 7, Sept: 8, Oct: 9, Nov: 10, Dec: 11,
};

// Chronological trip timeline, grouped by year then by month (one row per
// month), built from the same `visited` field the gallery/modal show — no
// separate data to keep in sync. A place visited twice contributes one
// timeline entry per visit.
const TIMELINE_BY_YEAR = (() => {
  const entries = PLACES_WITH_IMAGES
    .flatMap((p) => visitedDates(p.visited).map((visited) => {
      const [month, year] = visited.split(" ");
      return { ...p, month, year: Number(year), order: Number(year) * 12 + MONTH_INDEX[month] };
    }))
    .sort((a, b) => a.order - b.order);

  const byYear = new Map();
  entries.forEach((p) => {
    if (!byYear.has(p.year)) byYear.set(p.year, new Map());
    const byMonth = byYear.get(p.year);
    if (!byMonth.has(p.month)) byMonth.set(p.month, []);
    byMonth.get(p.month).push(p);
  });
  return Array.from(byYear.entries()).map(([year, byMonth]) => [year, Array.from(byMonth.entries())]);
})();

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const DRAG_THRESHOLD = 6; // px of pointer movement before a tap counts as a drag
const AUTO_CYCLE_MS = 2200;

// Polaroid drawn beside the highlighted pin. Sized in real screen pixels
// (converted to map units from the map's rendered width) so it stays readable
// on a phone, where the whole map is only ~360px wide.
const PHOTO_PX_DESKTOP = 150;
const PHOTO_PX_MOBILE = 110;
const PHOTO_ASPECT = 1.4; // height / width, incl. the polaroid's bottom margin
const PHOTO_CAPTION_PX = 22; // height of that bottom margin, where the date is written

// Clamp panning so the zoomed content always still covers the viewport.
const clampView = (scale, tx, ty) => ({
  scale,
  tx: Math.min(0, Math.max(WIDTH * (1 - scale), tx)),
  ty: Math.min(0, Math.max(HEIGHT * (1 - scale), ty)),
});

const Travel = () => {
  useReveal();

  const [hoverName, setHoverName] = useState(null);
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState({ scale: 1, tx: 0, ty: 0 });
  const [autoIndex, setAutoIndex] = useState(0);

  // While idle (nothing hovered/focused, no modal open), cycle the
  // highlighted pin so every name gets its moment — handy for spotting a
  // place buried in a crowded cluster without having to hunt for it.
  useEffect(() => {
    if (hoverName || selected) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setAutoIndex((i) => (i + 1) % CYCLE_ORDER.length);
    }, AUTO_CYCLE_MS);
    return () => clearInterval(id);
  }, [hoverName, selected]);

  const activeName = hoverName || (selected ? null : CYCLE_ORDER[autoIndex]?.name);
  const active = PLACES.find((p) => p.name === activeName);
  const activeStateName = active && (STATE_NAME_ALIASES[active.state] || active.state);

  const svgRef = useRef(null);

  // Rendered width of the map in px, so the photo can be sized in screen pixels.
  const [mapPx, setMapPx] = useState(640);
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setMapPx(svg.getBoundingClientRect().width || 640));
    ro.observe(svg);
    return () => ro.disconnect();
  }, []);

  // The photo card is one persistent element that glides between dots and
  // crossfades its picture, instead of remounting per place: `cur` is the
  // photo being shown, `prev` lingers briefly underneath so the new one can
  // fade in over it, and `glide` turns the position transition on only right
  // after the place changes (so panning/zooming the map never lags behind).
  const [photo, setPhoto] = useState({ cur: null, prev: null, n: 0 });
  const [glide, setGlide] = useState(false);
  const curPhotoRef = useRef(null);
  useEffect(() => {
    if (!active?.image || curPhotoRef.current?.name === active.name) return;
    const prev = curPhotoRef.current;
    curPhotoRef.current = active;
    // Same batch as the position change, so the glide class is already on
    // when the transform moves. The very first photo has nothing to glide from.
    // `n` counts photo changes; the card tilts the opposite way each time.
    setPhoto((p) => ({ cur: active, prev, n: p.n + 1 }));
    if (prev) setGlide(true);
  }, [active]);
  useEffect(() => {
    if (!photo.prev) return;
    const t = setTimeout(() => {
      setPhoto((p) => ({ ...p, prev: null }));
      setGlide(false);
    }, 800);
    return () => clearTimeout(t);
  }, [photo]);
  const viewRef = useRef(view);
  viewRef.current = view;
  const pointersRef = useRef(new Map()); // pointerId -> last {x, y} (client coords)
  const gestureRef = useRef(null);
  const didDragRef = useRef(false);
  const downPlaceRef = useRef(null);

  // Lock body scroll while the modal is open — plain `overflow:hidden` isn't
  // enough on iOS Safari, which still rubber-bands the page behind a fixed
  // overlay (see PdfModal for the same fix).
  useEffect(() => {
    if (!selected) return;

    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);

    const scrollY = window.scrollY;
    document.body.classList.add("tr-modal-open");
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("tr-modal-open");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [selected]);

  // Mouse wheel zoom, anchored under the cursor. Needs a non-passive native
  // listener — React's onWheel is passive, so preventDefault() there is a
  // silent no-op and the page would scroll while the map tries to zoom.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const onWheel = (e) => {
      // At rest (not zoomed), let the wheel/trackpad scroll the page as
      // normal — otherwise scrolling past the map on the way to the photo
      // gallery below would get hijacked into zooming it instead. Once
      // already zoomed in (via the +/- buttons, double-click, or a pinch),
      // wheel keeps adjusting that zoom.
      if (viewRef.current.scale <= 1) return;
      e.preventDefault();
      const rect = svg.getBoundingClientRect();
      const k = WIDTH / rect.width;
      const fx = (e.clientX - rect.left) * k;
      const fy = (e.clientY - rect.top) * k;
      const factor = e.deltaY < 0 ? 1.2 : 1 / 1.2;
      zoomAtPoint(fx, fy, viewRef.current.scale * factor);
    };

    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toFinalPoint = (clientX, clientY) => {
    const rect = svgRef.current.getBoundingClientRect();
    const k = WIDTH / rect.width;
    return { x: (clientX - rect.left) * k, y: (clientY - rect.top) * k };
  };

  // Zoom so that the content point currently under viewport point (fx, fy)
  // stays under it — i.e. zoom "into" wherever the cursor/pinch-center is.
  const zoomAtPoint = (fx, fy, nextScale) => {
    const { scale, tx, ty } = viewRef.current;
    const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextScale));
    const rawX = (fx - tx) / scale;
    const rawY = (fy - ty) / scale;
    setView(clampView(clamped, fx - clamped * rawX, fy - clamped * rawY));
  };

  const resetZoom = () => setView({ scale: 1, tx: 0, ty: 0 });

  const onPointerDown = (e) => {
    // Read the real hit-tested target *before* setPointerCapture below —
    // once the svg captures the pointer, the browser retargets the
    // resulting click (and every further pointer event) to the svg itself,
    // so a pin's own onClick never fires. Remembering which pin (if any)
    // the pointer actually started on lets onPointerUp select it manually.
    // (The photo card counts as its pin — same tap-to-open behavior.)
    const pinEl = e.target.closest && e.target.closest(".tr_pin, .tr_pin_photo");
    downPlaceRef.current = pinEl ? pinEl.dataset.place : null;

    e.currentTarget.setPointerCapture(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    didDragRef.current = false;

    if (pointersRef.current.size === 1) {
      const { x, y } = toFinalPoint(e.clientX, e.clientY);
      const { scale, tx, ty } = viewRef.current;
      gestureRef.current = {
        mode: "pan",
        grabRaw: { x: (x - tx) / scale, y: (y - ty) / scale },
        startClient: { x: e.clientX, y: e.clientY },
      };
    } else if (pointersRef.current.size === 2) {
      const pts = Array.from(pointersRef.current.values());
      const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
      const midFinal = toFinalPoint(mid.x, mid.y);
      const { scale, tx, ty } = viewRef.current;
      gestureRef.current = {
        mode: "pinch",
        rawMid: { x: (midFinal.x - tx) / scale, y: (midFinal.y - ty) / scale },
        dist0: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y),
        scale0: scale,
      };
    }
  };

  const onPointerMove = (e) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const g = gestureRef.current;
    if (!g) return;

    if (g.mode === "pan" && pointersRef.current.size === 1) {
      const dx = e.clientX - g.startClient.x;
      const dy = e.clientY - g.startClient.y;
      if (Math.hypot(dx, dy) > DRAG_THRESHOLD) didDragRef.current = true;
      if (viewRef.current.scale <= 1) return;
      const { x, y } = toFinalPoint(e.clientX, e.clientY);
      setView((v) => clampView(v.scale, x - v.scale * g.grabRaw.x, y - v.scale * g.grabRaw.y));
    } else if (g.mode === "pinch" && pointersRef.current.size === 2) {
      didDragRef.current = true;
      const pts = Array.from(pointersRef.current.values());
      const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const newScale = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, g.scale0 * (dist / g.dist0)));
      const midFinal = toFinalPoint(mid.x, mid.y);
      setView(clampView(newScale, midFinal.x - newScale * g.rawMid.x, midFinal.y - newScale * g.rawMid.y));
    }
  };

  const onPointerUp = (e) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size === 0) {
      gestureRef.current = null;
      if (!didDragRef.current && downPlaceRef.current) {
        const p = PLACES.find((pl) => pl.name === downPlaceRef.current);
        if (p) {
          // Pointer capture (needed for pinch/pan) retargets the native
          // click away from the pin, so the site-wide delegated click
          // sound (ClickSoundListener) never sees it here — play it
          // directly instead.
          playClick();
          setSelected(p);
        }
      }
      downPlaceRef.current = null;
    } else {
      const [[, p]] = pointersRef.current.entries();
      const { x, y } = toFinalPoint(p.x, p.y);
      const { scale, tx, ty } = viewRef.current;
      gestureRef.current = {
        mode: "pan",
        grabRaw: { x: (x - tx) / scale, y: (y - ty) / scale },
        startClient: { x: p.x, y: p.y },
      };
    }
  };

  const onDoubleClick = (e) => {
    if (viewRef.current.scale > 1) {
      resetZoom();
      return;
    }
    const { x, y } = toFinalPoint(e.clientX, e.clientY);
    zoomAtPoint(x, y, 2.5);
  };

  const zoomButton = (factor) => zoomAtPoint(WIDTH / 2, HEIGHT / 2, view.scale * factor);

  const onPinKey = (e, p) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      playClick();
      setSelected(p);
    }
  };

  return (
    <div className="tr_container page-shell">
      <BackHome />

      {/* ── Hero ── */}
      <div className="tr_hero">
        <h1 className="tr_title">Travel</h1>
        <p className="tr_tagline">Places I've been, pinned on the map. Click a dot for the story.</p>
        <ShareButton title="Places I've been in India" className="tr_share_btn" />
      </div>

      {/* ── Map ── */}
      <div className="tr_map_section">
        <div className="tr_map_wrap">
          <svg
            ref={svgRef}
            className={`tr_map${view.scale > 1 ? " tr_map--zoomed" : ""}`}
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            role="img"
            aria-label={`Map of India with ${PLACES.length} visited places highlighted. Pinch or scroll to zoom in for easier tapping.`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onDoubleClick={onDoubleClick}
          >
            <g transform={`translate(${view.tx.toFixed(2)} ${view.ty.toFixed(2)}) scale(${view.scale.toFixed(4)})`}>
              {STATE_BORDER_PATHS.map((s, i) => (
                <path
                  key={s.name}
                  className="tr_state_border"
                  d={s.d}
                  style={{ fill: stateFill(STATE_HUES[i], s.name === activeStateName) }}
                />
              ))}
              {ISLANDS.map(([lng, lat]) => {
                const [x, y] = project(lng, lat);
                return <circle key={`${lng},${lat}`} className="tr_island" cx={x} cy={y} r={3} />;
              })}

              {PLACES.map((p) => {
                const [x, y] = project(p.lng, p.lat);
                const isActive = p.name === activeName;
                return (
                  <g
                    key={p.name}
                    className={`tr_pin tr_pin--${p.kind}${isActive ? " tr_pin--active" : ""}`}
                    transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
                    role="button"
                    tabIndex={0}
                    aria-label={`${p.name}, ${p.state}`}
                    data-place={p.name}
                    onMouseEnter={() => setHoverName(p.name)}
                    onMouseLeave={() => setHoverName((n) => (n === p.name ? null : n))}
                    onFocus={() => setHoverName(p.name)}
                    onBlur={() => setHoverName((n) => (n === p.name ? null : n))}
                    onKeyDown={(e) => onPinKey(e, p)}
                  >
                    <circle className="tr_pin_pulse" r={7} />
                    <circle className="tr_pin_dot" r={isActive ? 7 : 5.5} />
                  </g>
                );
              })}

              {/* Label drawn last so it sits above every pin. */}
              {active && (() => {
                const [x, y] = project(active.lng, active.lat);
                const anchorEnd = x > WIDTH * 0.65;
                return (
                  <text
                    key={`label-${active.name}`}
                    className={`tr_pin_label${hoverName ? "" : " tr_pin_label--auto"}`}
                    x={anchorEnd ? x - 12 : x + 12}
                    y={y + 5}
                    textAnchor={anchorEnd ? "end" : "start"}
                  >
                    {active.name}
                  </text>
                );
              })()}

              {/* Photo of the highlighted place, pinned beside its dot. Drawn
                  at a constant on-screen size (counter-scaled by the zoom)
                  and kept inside the map edges; above the dot unless it's
                  too close to the top. It fades out (instead of vanishing)
                  when the highlighted place has no photo, and stays put at
                  its last spot meanwhile. Clicking it opens that place's
                  detail modal, like its pin does. */}
              {photo.cur && (() => {
                const shown = photo.cur;
                const [x, y] = project(shown.lng, shown.lat);
                const sx = x * view.scale + view.tx;
                const sy = y * view.scale + view.ty;
                // px -> map units at the current rendered size
                const u = WIDTH / mapPx;
                const PHOTO_W = (mapPx < 480 ? PHOTO_PX_MOBILE : PHOTO_PX_DESKTOP) * u;
                const PHOTO_H = PHOTO_W * PHOTO_ASPECT;
                const PHOTO_PAD = 6 * u;
                const PHOTO_GAP = 14 * u; // pin -> photo
                const above = sy >= PHOTO_H + PHOTO_GAP + 6 * u;
                const dx = Math.min(WIDTH - 4 * u - PHOTO_W - sx, Math.max(4 * u - sx, -PHOTO_W / 2));
                const dy = above ? -PHOTO_H - PHOTO_GAP : PHOTO_GAP;
                const imgProps = {
                  x: PHOTO_PAD,
                  y: PHOTO_PAD,
                  width: PHOTO_W - PHOTO_PAD * 2,
                  height: PHOTO_H - PHOTO_PAD - PHOTO_CAPTION_PX * u,
                  preserveAspectRatio: "xMidYMid slice",
                };
                // Month/year written in the bottom margin. Font shrinks for a
                // long string (a place visited twice) so it stays inside the card.
                const dateText = (p) => (p.visited ? formatVisited(p.visited) : "");
                const captionPx = (p) => {
                  const chars = Math.max(dateText(p).length, 1);
                  return Math.min(9, (PHOTO_W / u - 12) / (chars * 0.56));
                };
                const dateProps = (p) => ({
                  x: PHOTO_W / 2,
                  y: PHOTO_H - PHOTO_CAPTION_PX * u * 0.34,
                  textAnchor: "middle",
                  style: { fontSize: `${(captionPx(p) * u).toFixed(2)}px` },
                });
                return (
                  <g
                    className={`tr_pin_photo${glide ? " tr_pin_photo--glide" : ""}`}
                    role="button"
                    tabIndex={active?.image ? 0 : -1}
                    aria-label={`${displayName(shown.name)} photo — open details`}
                    aria-hidden={active?.image ? undefined : true}
                    data-place={shown.name}
                    onMouseEnter={() => setHoverName(shown.name)}
                    onMouseLeave={() => setHoverName((n) => (n === shown.name ? null : n))}
                    onKeyDown={(e) => onPinKey(e, shown)}
                    // Same function list every render so CSS can interpolate
                    // between places; units are px = SVG user units.
                    style={{
                      transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${(1 / view.scale).toFixed(4)}) translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`,
                      opacity: active?.image ? 1 : 0,
                      // Clickable only while it's actually showing the highlighted
                      // place; when faded out it must not block the map.
                      pointerEvents: active?.image ? "auto" : "none",
                    }}
                  >
                    <g
                      className="tr_pin_photo_tilt"
                      style={{
                        transform: `rotate(${photo.n % 2 ? -2.5 : 2.5}deg)`,
                        transformOrigin: `${(PHOTO_W / 2).toFixed(1)}px ${(PHOTO_H / 2).toFixed(1)}px`,
                      }}
                    >
                      <rect className="tr_pin_photo_card" width={PHOTO_W} height={PHOTO_H} rx={2 * u} />
                      {photo.prev && <image key={`prev-${photo.prev.name}`} href={photo.prev.image} {...imgProps} />}
                      <image key={`cur-${shown.name}`} className="tr_pin_photo_img" href={shown.image} {...imgProps} />
                      {photo.prev && (
                        <text key={`prevdate-${photo.prev.name}`} className="tr_pin_photo_date tr_pin_photo_date--out" {...dateProps(photo.prev)}>
                          {dateText(photo.prev)}
                        </text>
                      )}
                      <text key={`date-${shown.name}`} className="tr_pin_photo_date tr_pin_photo_date--in" {...dateProps(shown)}>
                        {dateText(shown)}
                      </text>
                    </g>
                  </g>
                );
              })()}
            </g>
          </svg>

          <div className="tr_zoom_controls">
            <button type="button" onClick={() => zoomButton(1.5)} aria-label="Zoom in">+</button>
            <button type="button" onClick={() => zoomButton(1 / 1.5)} aria-label="Zoom out">−</button>
            {view.scale > 1 && (
              <button type="button" className="tr_zoom_reset" onClick={resetZoom} aria-label="Reset zoom">
                <BiReset />
              </button>
            )}
          </div>

          <div className="tr_legend">
            <span><i className="tr_legend_dot tr_legend_dot--home" /> Lived</span>
            <span><i className="tr_legend_dot tr_legend_dot--trip" /> Visited</span>
            <span><i className="tr_legend_dot tr_legend_dot--bike" /> Bike trip</span>
          </div>
          <p className="tr_map_note">
            Map is not to scale; boundaries may not be accurate. Pinch, scroll, or use +/− to zoom in on crowded areas.
          </p>
        </div>
      </div>

      {PLACES_WITH_IMAGES.length > 0 && (
        <div className="tr_gallery_section">
          <h3 className="tr_gallery_heading" data-aos="fade-down">Photos</h3>
          <div className="tr_legend tr_legend--gallery" data-aos="fade-down" data-aos-delay="100">
            <span><i className="tr_legend_dot tr_legend_dot--home" /> Lived</span>
            <span><i className="tr_legend_dot tr_legend_dot--trip" /> Visited</span>
            <span><i className="tr_legend_dot tr_legend_dot--bike" /> Bike trip</span>
          </div>
          {/* Reveal the whole grid as one block, not card-by-card — each
              card already carries a permanent nth-child rotation for the
              corkboard look, and the reveal utility resets `transform` on
              enter, which would fight (and win a specificity tie against)
              that rotation if applied per card. */}
          <div className="tr_gallery" data-aos="fade-up" data-aos-delay="150">
            {PLACES_WITH_IMAGES.map((p) => (
              <button
                type="button"
                key={p.name}
                className={`tr_gallery_item tr_gallery_item--${p.kind}`}
                onClick={() => setSelected(p)}
              >
                <span className="tr_gallery_img_wrap">
                  <img src={p.image} alt={p.name} className="tr_gallery_img" loading="lazy" />
                </span>
                <span className="tr_gallery_caption">{displayName(p.name)}</span>
                {/* Only the first visit — a repeat trip belongs on the timeline, not cluttering the card. */}
                {p.visited && <span className="tr_gallery_date">{visitedDates(p.visited)[0]}</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {TIMELINE_BY_YEAR.length > 0 && (
        <div className="tr_timeline_section">
          <h3 className="tr_gallery_heading" data-aos="fade-down">Timeline</h3>
          <div className="tr_timeline">
            {TIMELINE_BY_YEAR.map(([year, months], i) => (
              <div className="tr_timeline_year_group" key={year} data-aos="fade-up" data-aos-delay={(i % 5) * 80}>
                <div className="tr_timeline_year">{year}</div>
                <div className="tr_timeline_months">
                  {months.map(([month, entries]) => (
                    <div className="tr_timeline_month_row" key={month}>
                      <span className="tr_timeline_month">{month}</span>
                      <div className="tr_timeline_entries">
                        {entries.map((p) => (
                          <button
                            type="button"
                            key={p.name}
                            className={`tr_timeline_entry tr_timeline_entry--${p.kind}`}
                            style={{ "--pill-hue": `${stateHueFor(p.state)}deg` }}
                            onClick={() => setSelected(p)}
                          >
                            <span className="tr_timeline_dot" />
                            <span className="tr_timeline_name">{displayName(p.name)}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selected && ReactDOM.createPortal(
        <div className="tr_modal_overlay" onClick={() => setSelected(null)}>
          <div className="tr_modal" onClick={(e) => e.stopPropagation()}>
            <button className="tr_modal_close" onClick={() => setSelected(null)} aria-label="Close">
              ✕
            </button>
            {selected.image && (
              <div className="tr_modal_image_wrap">
                <img src={selected.image} alt={selected.name} className="tr_modal_image" loading="lazy" />
              </div>
            )}
            <div className="tr_modal_body">
              <span className={`tr_detail_kind tr_detail_kind--${selected.kind}`}>
                {selected.kind === "home" ? "Lived here" : "Visited"}
              </span>
              <h2 className="tr_detail_name">{selected.name}</h2>
              <p className="tr_detail_state">
                {selected.state}
                {selected.visited && <span className="tr_detail_date"> · {formatVisited(selected.visited)}</span>}
              </p>
              {selected.note && <p className="tr_detail_note">{selected.note}</p>}
            </div>
          </div>
        </div>,
        document.body
      )}

      <a
        href="https://www.instagram.com/la_h_on/"
        target="_blank"
        rel="noreferrer"
        className="tr_footer_ig"
      >
        <BsInstagram /> @la_h_on
      </a>

      <PageFooter>Copyright © 2026 lahon.in/travel</PageFooter>
    </div>
  );
};

export default Travel;
