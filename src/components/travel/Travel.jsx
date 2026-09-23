import React, { useMemo, useState } from "react";
import "./travel.css";
import ShareButton from "../share/ShareButton";
import BackHome from "../shared/BackHome";
import PageFooter from "../shared/PageFooter";
import "../shared/PageShell.css";

import { PLACES } from "./places";
import { MAINLAND, ISLANDS } from "./indiaOutline";

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

const OUTLINE_PATH =
  MAINLAND.map(([lng, lat], i) => {
    const [x, y] = project(lng, lat);
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ") + " Z";

const Travel = () => {
  const [activeName, setActiveName] = useState(PLACES[0]?.name ?? null);
  const active = PLACES.find((p) => p.name === activeName);

  const byState = useMemo(() => {
    const groups = {};
    PLACES.forEach((p) => {
      (groups[p.state] = groups[p.state] || []).push(p);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, []);

  const onPinKey = (e, name) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveName(name);
    }
  };

  return (
    <div className="tr_container page-shell">
      <BackHome />

      {/* ── Hero ── */}
      <div className="tr_hero">
        <h1 className="tr_title">Travel</h1>
        <p className="tr_tagline">Places I've been, pinned on the map.</p>
        <div className="tr_stats">
          <div className="tr_stat">
            <span className="tr_stat_num">{PLACES.length}</span>
            <span className="tr_stat_label">{PLACES.length === 1 ? "place" : "places"}</span>
          </div>
          <div className="tr_stat">
            <span className="tr_stat_num">{byState.length}</span>
            <span className="tr_stat_label">{byState.length === 1 ? "state" : "states"}</span>
          </div>
        </div>
        <ShareButton title="Places I've been in India" className="tr_share_btn" />
      </div>

      {/* ── Map + details ── */}
      <div className="tr_map_section">
        <div className="tr_map_wrap">
          <svg
            className="tr_map"
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            role="img"
            aria-label={`Map of India with ${PLACES.length} visited places highlighted`}
          >
            <path className="tr_land" d={OUTLINE_PATH} />
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
                  aria-pressed={isActive}
                  onClick={() => setActiveName(p.name)}
                  onMouseEnter={() => setActiveName(p.name)}
                  onFocus={() => setActiveName(p.name)}
                  onKeyDown={(e) => onPinKey(e, p.name)}
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
                  className="tr_pin_label"
                  x={anchorEnd ? x - 12 : x + 12}
                  y={y + 5}
                  textAnchor={anchorEnd ? "end" : "start"}
                >
                  {active.name}
                </text>
              );
            })()}
          </svg>
          <div className="tr_legend">
            <span><i className="tr_legend_dot tr_legend_dot--home" /> Lived</span>
            <span><i className="tr_legend_dot tr_legend_dot--trip" /> Visited</span>
          </div>
        </div>

        <aside className="tr_side">
          {active && (
            <div className="tr_detail" aria-live="polite">
              <span className="tr_detail_kind">{active.kind === "home" ? "Lived here" : "Visited"}</span>
              <h2 className="tr_detail_name">{active.name}</h2>
              <p className="tr_detail_state">{active.state}</p>
              {active.note && <p className="tr_detail_note">{active.note}</p>}
            </div>
          )}

          <div className="tr_list">
            {byState.map(([state, places]) => (
              <div className="tr_list_group" key={state}>
                <h3 className="tr_list_state">{state}</h3>
                <div className="tr_list_items">
                  {places.map((p) => (
                    <button
                      type="button"
                      key={p.name}
                      className={`tr_chip${p.name === activeName ? " tr_chip--active" : ""}`}
                      onClick={() => setActiveName(p.name)}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <PageFooter>Copyright © 2026 lahon.in/travel</PageFooter>
    </div>
  );
};

export default Travel;
