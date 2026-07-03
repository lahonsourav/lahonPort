import React, { useState } from 'react';
import './mood.css';

// ─── Home screen ──────────────────────────────────────────────────────────────

function HomeScreen() {
  return (
    <div className="ics">
      <div className="ics-hdr">
        <div>
          <div className="ics-greeting">Good morning ☀️</div>
          <div className="ics-date">Saturday, 27 June 2026</div>
        </div>
        <div className="ics-hdr-icons">🌙 &nbsp;⚙</div>
      </div>

      {/* Triple-arc gauge card */}
      <div className="ics-card">
        <svg className="ics-gauge-svg" viewBox="0 0 100 54">
          <defs>
            <linearGradient id="icg-home" x1="6" y1="0" x2="94" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#f85149" />
              <stop offset="40%"  stopColor="#e3b341" />
              <stop offset="100%" stopColor="#3de081" />
            </linearGradient>
          </defs>
          {/* bg arcs */}
          <path d="M 6 50 A 44 44 0 0 1 94 50"  fill="none" stroke="#21262d" strokeWidth="3"  strokeLinecap="round" />
          <path d="M 16 50 A 34 34 0 0 1 84 50" fill="none" stroke="#21262d" strokeWidth="9"  strokeLinecap="round" />
          <path d="M 26 50 A 24 24 0 0 1 74 50" fill="none" stroke="#21262d" strokeWidth="14" strokeLinecap="round" />
          {/* filled arcs — overall 8.2 / month 7.5 / today 7.0 */}
          <path d="M 6 50 A 44 44 0 0 1 87.1 26.4"  fill="none" stroke="url(#icg-home)" strokeWidth="3"  strokeLinecap="round" />
          <path d="M 16 50 A 34 34 0 0 1 74.0 26.0" fill="none" stroke="url(#icg-home)" strokeWidth="9"  strokeLinecap="round" />
          <path d="M 26 50 A 24 24 0 0 1 64.1 30.6" fill="none" stroke="url(#icg-home)" strokeWidth="14" strokeLinecap="round" />
          <text x="50" y="41"   textAnchor="middle" fontSize="14"  fontFamily="Georgia,serif"           fill="#3de081" letterSpacing="-0.5">7.0</text>
          <text x="50" y="49.5" textAnchor="middle" fontSize="5"   fontFamily="system-ui,sans-serif"    fill="#8b949e">calm</text>
        </svg>

        <div className="ics-arc-row">
          {[
            { l: 'OVERALL', v: '8.2', h: '3px'  },
            { l: 'MONTH',   v: '7.5', h: '9px'  },
            { l: 'TODAY',   v: '7.0', h: '14px' },
          ].map(a => (
            <div key={a.l} className="ics-arc-item">
              <div className="ics-arc-bar" style={{ height: a.h }} />
              <div className="ics-arc-lbl">{a.l}</div>
              <div className="ics-arc-val">{a.v}</div>
            </div>
          ))}
        </div>

        <div className="ics-streak">🔥 12-day streak</div>
      </div>

      {/* Suggestion card */}
      <div className="ics-card ics-suggest-card">
        <div className="ics-suggest-hdr">
          <span>🌿</span>
          <span>A gentle suggestion for you</span>
        </div>
        <div className="ics-suggest-body">A short walk might help clear your head today.</div>
        <div className="ics-dot-row">
          <span className="ics-dot ics-dot-on" />
          <span className="ics-dot" />
          <span className="ics-dot" />
          <span className="ics-dot" />
        </div>
      </div>

      <div className="ics-section-lbl">TODAY'S CHECK-INS</div>

      {[
        { e: '😌', l: 'Calm',   t: 'Feeling steady and relaxed', time: '2:30 PM', c: '#3de081' },
        { e: '😄', l: 'Joyful', t: 'Great morning with coffee',   time: '9:15 AM', c: '#3de081' },
      ].map(ci => (
        <div key={ci.l} className="ics-ci-row" style={{ borderColor: ci.c + '45', background: ci.c + '0c' }}>
          <div className="ics-ci-bubble" style={{ background: ci.c + '28' }}>{ci.e}</div>
          <div className="ics-ci-body">
            <div style={{ color: ci.c, fontSize: '0.5rem', fontWeight: 600 }}>{ci.l}</div>
            <div className="ics-ci-text">{ci.t}</div>
          </div>
          <div className="ics-ci-time">{ci.time}</div>
        </div>
      ))}

      <div style={{ height: '0.4rem' }} />
    </div>
  );
}

// ─── Check-in screen ──────────────────────────────────────────────────────────

function CheckinScreen() {
  const groups = [
    { cls: 'pos', pills: [{ e: '🤩', l: 'Ecstatic' }, { e: '😇', l: 'Blissful' }, { e: '😄', l: 'Joyful' }, { e: '🎉', l: 'Excited' }] },
    { cls: 'pos', pills: [{ e: '🥰', l: 'Loved' }, { e: '🙏', l: 'Grateful' }, { e: '😜', l: 'Playful' }] },
    { cls: 'pos', pills: [{ e: '😎', l: 'Confident' }, { e: '💪', l: 'Proud' }, { e: '🔥', l: 'Motivated' }, { e: '✨', l: 'Inspired' }] },
    { cls: 'pos', pills: [{ e: '🕊️', l: 'Peaceful' }, { e: '😌', l: 'Calm' }, { e: '😊', l: 'Content' }, { e: '🌱', l: 'Hopeful' }] },
    { cls: 'neu', pills: [{ e: '🤔', l: 'Curious' }, { e: '🌙', l: 'Reflective' }] },
    { cls: 'neu', pills: [{ e: '😐', l: 'Okay' }, { e: '😑', l: 'Meh' }] },
    { cls: 'neu', pills: [{ e: '😴', l: 'Tired' }, { e: '😔', l: 'Drained' }, { e: '😶', l: 'Numb' }] },
    { cls: 'neg', pills: [{ e: '😰', l: 'Anxious' }, { e: '🤯', l: 'Overwhelmed' }] },
    { cls: 'neg', pills: [{ e: '😢', l: 'Sad' }, { e: '🫂', l: 'Lonely' }, { e: '😠', l: 'Angry' }] },
  ];

  return (
    <div className="ics">
      <div className="ics-ci-title">"How are you feeling right now?"</div>
      <div className="ics-ci-subtitle">Pick what fits right now.</div>
      <div className="ics-mood-groups">
        {groups.map((g, gi) => (
          <div key={gi} className="ics-mood-row">
            {g.pills.map(p => (
              <span key={p.l} className={`ics-mpill ics-mpill-${g.cls}`}>{p.e} {p.l}</span>
            ))}
          </div>
        ))}
      </div>
      <div style={{ height: '0.4rem' }} />
    </div>
  );
}

// ─── Insights screen ──────────────────────────────────────────────────────────

function InsightsScreen() {
  const data  = [6.2, 5.8, 7.1, 6.9, 7.4, 7.8, 7.0];
  const padL  = 20, padT = 8, innerW = 76, innerH = 58;
  const xOf   = i => padL + (i / 6) * innerW;
  const yOf   = v => padT + ((10 - v) / 9) * innerH;
  const pts   = data.map((v, i) => ({ x: xOf(i), y: yOf(v) }));
  const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  return (
    <div className="ics">
      <div className="ics-page-title">Insights</div>

      <div className="ics-stat-row">
        {[
          { v: '7.2', d: '↑ 0.4', l: 'Avg this week' },
          { v: '12 🔥',          l: 'Day streak'     },
          { v: '87 ✦',           l: 'Total entries'  },
        ].map(s => (
          <div key={s.l} className="ics-stat-tile">
            <div className="ics-stat-v">{s.v}</div>
            {s.d && <div className="ics-stat-delta">{s.d}</div>}
            <div className="ics-stat-l">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="ics-stat-row">
        {[
          { v: 'Stable', l: 'Mood stability'    },
          { v: '8d',     l: 'Best positive run' },
        ].map(s => (
          <div key={s.l} className="ics-stat-tile">
            <div className="ics-stat-v ics-stat-sm">{s.v}</div>
            <div className="ics-stat-l">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Line chart */}
      <div className="ics-card">
        <div className="ics-card-hdr">
          <span>Mood score</span>
          <div className="ics-seg">
            {['7d', '30d', '90d'].map((p, i) => (
              <span key={p} className={`ics-seg-btn${i === 0 ? ' ics-seg-on' : ''}`}>{p}</span>
            ))}
          </div>
        </div>
        <svg viewBox="0 0 100 80" width="100%">
          {[8, 5, 2].map(v => (
            <React.Fragment key={v}>
              <line x1={padL} y1={yOf(v) + 2} x2="98" y2={yOf(v) + 2} stroke="#21262d" strokeWidth="0.5" />
              <text x={padL - 2} y={yOf(v) + 4.5} fontSize="4.5" fill="#8b949e" textAnchor="end">{v}</text>
            </React.Fragment>
          ))}
          <path d={pathD} fill="none" stroke="#3de081" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={i === 6 ? '3' : '2'} fill={i === 6 ? '#c8a97e' : '#3de081'} />
          ))}
          <text x={pts[6].x} y={padT - 1} fontSize="4" fill="#c8a97e" textAnchor="middle">Today</text>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <text key={i} x={xOf(i)} y="78" fontSize="4.5" fill="#8b949e" textAnchor="middle">{d}</text>
          ))}
        </svg>
      </div>

      {/* Frequency bars */}
      <div className="ics-card">
        <div className="ics-card-hdr"><span>Mood frequency</span></div>
        <div className="ics-freq-row">
          {[
            { k: 'Calm',   c: '#3de081', h: 78 },
            { k: 'Joy',    c: '#3de081', h: 60 },
            { k: 'Motiv',  c: '#3de081', h: 48 },
            { k: 'Neut',   c: '#e3b341', h: 32 },
            { k: 'Stress', c: '#f85149', h: 18 },
            { k: 'Dark',   c: '#f85149', h: 6  },
          ].map(b => (
            <div key={b.k} className="ics-freq-col">
              <div className="ics-freq-bg">
                <div className="ics-freq-fill" style={{ height: `${b.h}%`, background: b.c }} />
              </div>
              <div className="ics-freq-lbl">{b.k}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI summary */}
      <div className="ics-ai-card">
        <div className="ics-ai-hdr">
          <span style={{ color: '#c8a97e' }}>✦</span>&nbsp;<span>AI Weekly Summary</span>
        </div>
        <div className="ics-ai-body">"Your mood has been consistently above 7 this week, with mornings as your strongest window."</div>
      </div>

      <div style={{ height: '0.4rem' }} />
    </div>
  );
}

// ─── Calendar screen ──────────────────────────────────────────────────────────

function CalendarScreen() {
  // June 2026: June 1 = Monday → Sunday column empty
  const rows = [
    [{ d: null }, { d: 1, e: '😊' }, { d: 2, e: '😌' }, { d: 3, e: '😄' }, { d: 4, e: '🙏' }, { d: 5, e: '😊' }, { d: 6, e: '😴' }],
    [{ d: 7, e: '🎉' }, { d: 8, e: '😌' }, { d: 9, e: '😰' }, { d: 10, e: '😊' }, { d: 11, e: '😄' }, { d: 12, e: '😌' }, { d: 13, e: '😊' }],
    [{ d: 14, e: '😴' }, { d: 15, e: '😌' }, { d: 16, e: '😄' }, { d: 17, e: '😊' }, { d: 18, e: '🙏' }, { d: 19, e: '😄' }, { d: 20, e: '😌' }],
    [{ d: 21, e: '🎉' }, { d: 22, e: '😊' }, { d: 23, e: '😌' }, { d: 24, e: '😄' }, { d: 25, e: '😊' }, { d: 26, e: '😊' }, { d: 27, e: '🎉' }],
    [{ d: 28 }, { d: 29 }, { d: 30 }, { d: null }, { d: null }, { d: null }, { d: null }],
  ];

  return (
    <div className="ics">
      <div className="ics-card ics-cal-card">
        <div className="ics-cal-hdr">
          <span>‹</span><span>June 2026</span><span>›</span>
        </div>
        <div className="ics-cal-dow">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={i}>{d}</span>)}
        </div>
        {rows.map((row, ri) => (
          <div key={ri} className="ics-cal-row">
            {row.map((cell, ci) => (
              <div key={ci} className={`ics-cal-cell${cell.d === 27 ? ' ics-cal-today' : ''}`}>
                {cell.d ? (
                  cell.e ? (
                    <>
                      <span className="ics-cal-emoji">{cell.e}</span>
                      <span className={`ics-cal-num${cell.d === 27 ? ' ics-cal-num-accent' : ''}`}>{cell.d}</span>
                    </>
                  ) : (
                    <span className="ics-cal-num-only">{cell.d}</span>
                  )
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="ics-tap-hint">Viewing Saturday, 27 June</div>

      {/* Day gauge */}
      <div className="ics-card" style={{ padding: '0.55rem 0.6rem' }}>
        <svg className="ics-gauge-svg ics-gauge-sm" viewBox="0 0 100 54">
          <defs>
            <linearGradient id="icg-cal" x1="6" y1="0" x2="94" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#f85149" />
              <stop offset="40%"  stopColor="#e3b341" />
              <stop offset="100%" stopColor="#3de081" />
            </linearGradient>
          </defs>
          <path d="M 6 50 A 44 44 0 0 1 94 50"  fill="none" stroke="#21262d" strokeWidth="3"  strokeLinecap="round" />
          <path d="M 16 50 A 34 34 0 0 1 84 50" fill="none" stroke="#21262d" strokeWidth="9"  strokeLinecap="round" />
          <path d="M 26 50 A 24 24 0 0 1 74 50" fill="none" stroke="#21262d" strokeWidth="14" strokeLinecap="round" />
          <path d="M 6 50 A 44 44 0 0 1 87.1 26.4"  fill="none" stroke="url(#icg-cal)" strokeWidth="3"  strokeLinecap="round" />
          <path d="M 16 50 A 34 34 0 0 1 74.0 26.0" fill="none" stroke="url(#icg-cal)" strokeWidth="9"  strokeLinecap="round" />
          <path d="M 26 50 A 24 24 0 0 1 64.1 30.6" fill="none" stroke="url(#icg-cal)" strokeWidth="14" strokeLinecap="round" />
          <text x="50" y="41"   textAnchor="middle" fontSize="14" fontFamily="Georgia,serif"        fill="#3de081" letterSpacing="-0.5">9.0</text>
          <text x="50" y="49.5" textAnchor="middle" fontSize="5"  fontFamily="system-ui,sans-serif" fill="#8b949e">joyful</text>
        </svg>
        <div className="ics-arc-row">
          {[
            { l: 'OVERALL', v: '8.2', h: '3px'  },
            { l: 'MONTH',   v: '7.5', h: '9px'  },
            { l: 'DAY',     v: '9.0', h: '14px' },
          ].map(a => (
            <div key={a.l} className="ics-arc-item">
              <div className="ics-arc-bar" style={{ height: a.h }} />
              <div className="ics-arc-lbl">{a.l}</div>
              <div className="ics-arc-val">{a.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Journal card */}
      <div className="ics-card">
        <div className="ics-jour-lbl">OVERALL ↑ Joyful</div>
        <div className="ics-jour-text">"A lovely Saturday — felt genuinely light and grateful through the afternoon..."</div>
      </div>

      <div style={{ height: '0.4rem' }} />
    </div>
  );
}

// ─── Wellbeing screen ─────────────────────────────────────────────────────────

function WellbeingScreen() {
  return (
    <div className="ics">
      <div className="ics-page-title">Wellbeing</div>

      <div className="ics-insight-bnr">
        <div className="ics-ib-icon" style={{ background: 'rgba(124,184,164,0.20)' }}>🌟</div>
        <div className="ics-ib-text">
          <div className="ics-ib-title" style={{ color: '#7cb8a4' }}>You've been doing well</div>
          <div className="ics-ib-body">Your mood has been consistently strong this week.</div>
        </div>
      </div>

      {[
        { icon: '🫁', bg: 'rgba(124,184,164,0.15)', title: 'Try a breathing exercise',  body: 'Box breathing resets your nervous system in just 2 minutes.',      btn: '▷  Start 2-min session' },
        { icon: '📋', bg: 'rgba(200,169,126,0.15)', title: 'A question to sit with',    body: "What's one thing that went well today, even if it was small?",       btn: '✏  Open journal'        },
        { icon: '💛', bg: 'rgba(227,179,65,0.12)',  title: 'Reach out to someone',      body: "Even a short message to a friend can lift your mood.",               btn: '💬  Connect'             },
      ].map(f => (
        <div key={f.title} className="ics-card ics-feat-card">
          <div className="ics-feat-top">
            <div className="ics-feat-icon" style={{ background: f.bg }}>{f.icon}</div>
            <div className="ics-feat-title">{f.title}</div>
          </div>
          <div className="ics-feat-body">{f.body}</div>
          <div className="ics-feat-btn">{f.btn}</div>
        </div>
      ))}

      <div className="ics-section-lbl">MORE EXERCISES</div>

      <div className="ics-list-card">
        {[
          { e: '🌬️', l: '4-7-8 Wind-down',       s: 'Inhale 4 · Hold 7 · Exhale 8'    },
          { e: '🌿',  l: '5-4-3-2-1 Grounding',   s: 'Anchors you in the present'       },
          { e: '🧘',  l: 'Body scan relaxation',   s: 'Progressive release, feet to face'},
          { e: '🌻',  l: 'Gratitude practice',     s: 'Three things to appreciate'       },
        ].map((ex, i, arr) => (
          <React.Fragment key={ex.l}>
            <div className="ics-ex-row">
              <div className="ics-ex-icon">{ex.e}</div>
              <div className="ics-ex-text">
                <div className="ics-ex-lbl">{ex.l}</div>
                <div className="ics-ex-sub">{ex.s}</div>
              </div>
              <div className="ics-ex-chevron">›</div>
            </div>
            {i < arr.length - 1 && <div className="ics-list-div" />}
          </React.Fragment>
        ))}
      </div>

      <div style={{ height: '0.4rem' }} />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const TABS = [
  { label: 'Home',      icon: '🏠', Comp: HomeScreen      },
  { label: 'Check-in',  icon: '✦',  Comp: CheckinScreen   },
  { label: 'Insights',  icon: '📊', Comp: InsightsScreen  },
  { label: 'Calendar',  icon: '📅', Comp: CalendarScreen  },
  { label: 'Wellbeing', icon: '💚', Comp: WellbeingScreen },
];

const Mood = () => {
  const [active, setActive] = useState(0);
  const { Comp } = TABS[active];
  return (
    <div className="ic-page">

      {/* ── Hero ── */}
      <div className="ic-hero">
        <div className="ic-hero-logo">
          <span className="ic-hero-wave">🌊</span>
          <h1 className="ic-hero-title">Innercast</h1>
        </div>
        <p className="ic-hero-sub">
          Your private mood diary. Check in daily, watch patterns emerge, feel supported.
        </p>
        <div className="ic-tags">
          {['React Native', 'Expo Router', 'SQLite', 'Claude AI'].map(t => (
            <span key={t} className="ic-tag">{t}</span>
          ))}
        </div>
      </div>

      {/* ── Interactive phone demo ── */}
      <div className="ic-demo-section">
        <div className="ic-demo-nav">
          {TABS.map((t, i) => (
            <button
              key={t.label}
              className={`ic-tab-btn${active === i ? ' ic-tab-on' : ''}`}
              onClick={() => setActive(i)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="ic-phone-wrap">
          <div className="ic-phone">
            {/* status bar */}
            <div className="ic-phone-status">
              <span>9:41</span>
              <span>⚡ 87%</span>
            </div>

            {/* scrollable screen */}
            <div className="ic-phone-content">
              <Comp />
            </div>

            {/* native tab bar */}
            <div className="ic-phone-tabs">
              {TABS.map((t, i) => (
                <button
                  key={t.label}
                  className={`ic-pt${active === i ? ' ic-pt-on' : ''}`}
                  onClick={() => setActive(i)}
                >
                  <span className="ic-pt-icon">{t.icon}</span>
                  <span className="ic-pt-lbl">{t.label}</span>
                </button>
              ))}
            </div>

            <div className="ic-phone-bar" />
          </div>
        </div>
      </div>

      {/* ── Feature highlights ── */}
      <div className="ic-features">
        {[
          {
            icon: '✦',
            title: 'AI-Generated Journals',
            body:  'Log a few moods throughout the day. At night, Claude AI synthesizes them into a thoughtful journal entry written in your voice.',
          },
          {
            icon: '📊',
            title: 'Deep Mood Insights',
            body:  'Line charts, frequency bars, day-of-week patterns, and time-of-day heatmaps across 7, 30, and 90 days.',
          },
          {
            icon: '🌿',
            title: 'Wellbeing Tools',
            body:  'Box breathing, 5-4-3-2-1 grounding, body scan, gratitude practice — gentle support built right into the app.',
          },
        ].map(f => (
          <div key={f.title} className="ic-feat">
            <div className="ic-feat-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </div>
        ))}
      </div>

      {/* ── How it works ── */}
      <div className="ic-how">
        <h2 className="ic-section-h">How it works</h2>
        <div className="ic-steps">
          {[
            { n: '01', title: 'Check in anytime', body: 'Pick from 35+ emotions — Ecstatic to Anxious. Tap a mood pill, add a private note if you want, and you\'re done. Takes under 10 seconds.' },
            { n: '02', title: 'Patterns surface', body: 'Your triple-arc gauge updates after every entry. Insights reveal your strongest time of day, top moods, and emotional trends across 7, 30, and 90 days.' },
            { n: '03', title: 'Claude writes your journal', body: 'Each night, Claude AI reads your day\'s check-ins and writes a private journal in your emotional voice — thoughtful, personal, and automatic.' },
          ].map(s => (
            <div key={s.n} className="ic-step">
              <div className="ic-step-n">{s.n}</div>
              <h3 className="ic-step-title">{s.title}</h3>
              <p className="ic-step-body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── AI Journal preview ── */}
      <div className="ic-journal-preview">
        <div className="ic-jp-label">✦ What the AI journal looks like</div>
        <div className="ic-jp-card">
          <div className="ic-jp-meta">
            <span className="ic-jp-date">Saturday, 27 June 2026</span>
            <span className="ic-jp-mood">😊 Overall: Joyful · 7.8</span>
          </div>
          <p className="ic-jp-body">
            "Today felt surprisingly light. The morning started slow — a familiar edge of anxiety creeping in before the day had properly begun — but by afternoon something had shifted. Coffee helped, maybe the walk too. Felt genuinely calm by 2 PM, and later, after talking to a friend, there was a warmth I hadn't expected. Not every day has a neat arc, but today did: from uncertain to grateful. That's enough."
          </p>
          <div className="ic-jp-checkins">
            <div className="ic-jp-ci"><span style={{color:'#f85149'}}>😰</span><span>Anxious</span><span className="ic-jp-ci-t">8:10 AM · feeling edgy before the day started</span></div>
            <div className="ic-jp-ci"><span style={{color:'#3de081'}}>😌</span><span>Calm</span><span className="ic-jp-ci-t">2:30 PM · steady after the walk</span></div>
            <div className="ic-jp-ci"><span style={{color:'#3de081'}}>😄</span><span>Joyful</span><span className="ic-jp-ci-t">7:15 PM · unexpected warmth from a good conversation</span></div>
          </div>
          <div className="ic-jp-footer">
            <span>✦ Claude AI · Generated 11:42 PM</span>
            <span>3 check-ins</span>
          </div>
        </div>
      </div>

      {/* ── Privacy ── */}
      <div className="ic-privacy">
        <h2 className="ic-section-h">Built private by default</h2>
        <p className="ic-privacy-sub">Your mood data never leaves your device unless you choose otherwise.</p>
        <div className="ic-privacy-grid">
          {[
            { icon: '🔒', title: 'All data stored locally', body: 'SQLite stores every check-in, note, and journal entry on your device. No servers. No cloud. No sync.' },
            { icon: '🤖', title: 'AI gets a summary, not your diary', body: 'Claude receives only a brief structured summary — e.g. "Calm 7.2, Anxious 4.1, note: work stress". Your raw notes stay on-device.' },
            { icon: '🔐', title: 'Every entry is encrypted', body: 'An account keeps your data tied to you — but every check-in, note, and journal is encrypted. Nothing is readable without your credentials.' },
            { icon: '✈️', title: 'Works fully offline', body: 'Check in, browse the calendar, and use wellbeing tools with no internet. The AI journal generates when you\'re connected.' },
          ].map(p => (
            <div key={p.title} className="ic-priv-card">
              <div className="ic-priv-icon">{p.icon}</div>
              <h3 className="ic-priv-title">{p.title}</h3>
              <p className="ic-priv-body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tech stack ── */}
      <div className="ic-stack">
        <h2 className="ic-section-h">Tech stack</h2>
        <div className="ic-stack-grid">
          {[
            { label: 'React Native',   sub: 'Cross-platform mobile — single codebase for Android & iOS' },
            { label: 'Expo Router',    sub: 'File-based navigation with typed tab routes'                },
            { label: 'SQLite',         sub: 'expo-sqlite — on-device local database, offline-first'      },
            { label: 'Claude AI',      sub: 'Anthropic — nightly journal generation & wellbeing insights' },
            { label: 'Expo Notifs',    sub: 'Daily check-in reminders, fully opt-in'                     },
            { label: 'TypeScript',     sub: 'Fully typed throughout — components, hooks, schemas'         },
          ].map(t => (
            <div key={t.label} className="ic-stack-item">
              <div className="ic-stack-lbl">{t.label}</div>
              <div className="ic-stack-sub">{t.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Coming soon ── */}
      <div className="ic-cta-section">
        <p className="ic-cta-label">In development</p>
        <div className="ic-coming-soon-row">
          <span className="ic-coming-pill">🤖 Android — coming soon</span>
          <span className="ic-coming-pill">🍎 iOS — coming soon</span>
        </div>
      </div>

      <div className="ic-page-footer">Copyright © 2026 lahon.in/mood</div>
    </div>
  );
};

export default Mood;
