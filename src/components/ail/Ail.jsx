import React from "react";
import "./ail.css";
import ShareButton from "../share/ShareButton";
import BackHome from "../shared/BackHome";
import PageFooter from "../shared/PageFooter";

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeWidth="1" />
    <polyline points="4,7 6,9 10,5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const STEPS = [
  {
    title: "Pick a domain",
    desc: "26 specialised writing domains: thesis, resume, legal review, shayari, government forms, and more.",
  },
  {
    title: "Try it free",
    desc: "Every domain gives 5 free AI responses. No credit card required. Judge the quality before spending anything.",
  },
  {
    title: "Buy what you need",
    desc: "Purchase a token-budget package for that specific task. Chat until the work is done. Tokens never expire.",
  },
];

const WHY = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "No subscription trap",
    desc: "Pay only for the task in front of you — no monthly charges draining a wallet during the months you don't need AI help.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
    title: "Unlimited revisions",
    desc: "Go back and forth as many times as needed within a token budget — no per-message charges, no revision limits.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Your data stays yours",
    desc: "Conversations are never used to train AI models. BYO API keys are encrypted at rest with AES-256-GCM.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Best-in-class models",
    desc: "Fast (Haiku), balanced (Sonnet), or most capable (Opus) — matched to the task automatically.",
  },
];

const Ail = () => {
  return (
    <div className="ail_page">
      <BackHome />

      {/* ── Hero ── */}
      <div className="ail_hero">
        <div className="ail_glow" aria-hidden="true" />

        <span className="ail_badge">
          <span className="ail_badge_dot" />
          26 domains · Founder-built, live product
        </span>

        <h1 className="ail_title">
          AI writing. <span className="ail_title_accent">Pay per task,</span> not per month.
        </h1>

        <p className="ail_description">
          AIL is a chat-based writing assistant built on Claude, with dozens of purpose-built
          modules instead of one generic chatbox: résumés, thesis chapters, legal review,
          business content, and more. Each module carries its own system prompt tuned for that
          kind of writing.
        </p>

        <div className="ail_hero_actions">
          <a href="https://ai.lahon.in" className="ail_btn ail_btn_primary" target="_blank" rel="noreferrer">
            Visit ail →
          </a>
        </div>

        <ShareButton title="AIL: AI writing, pay per task not per month" className="ail_share_btn" />

        <div className="ail_trust" style={{ marginTop: "1.75rem" }}>
          {["No subscription", "Tokens never expire", "Data never used for training"].map((t) => (
            <span key={t}>
              <CheckIcon />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="ail_stats">
        {[
          { value: "26", label: "Writing domains" },
          { value: "5", label: "Free responses / domain" },
          { value: "∞", label: "Revisions within budget" },
          { value: "₹29", label: "Starting price" },
        ].map((s) => (
          <div key={s.label}>
            <p className="ail_stat_value">{s.value}</p>
            <p className="ail_stat_label">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── How it works ── */}
      <div className="ail_section">
        <p className="ail_eyebrow">How it works</p>
        <h2 className="ail_section_title">Three steps from sign-up to done</h2>
        <div className="ail_steps">
          {STEPS.map((step, i) => (
            <div className="ail_step" key={step.title}>
              <div className="ail_step_head">
                <span className="ail_step_num">{i + 1}</span>
                <h3>{step.title}</h3>
              </div>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Why AIL ── */}
      <div className="ail_section">
        <p className="ail_eyebrow">Why AIL</p>
        <h2 className="ail_section_title">Built differently</h2>
        <p className="ail_section_subtitle">
          Not another subscription. Not a generic chatbot. A focused tool for focused work.
        </p>
        <div className="ail_grid">
          {WHY.map((item) => (
            <div className="ail_card" key={item.title}>
              <div className="ail_card_icon">{item.icon}</div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="ail_cta">
        <h2 className="ail_section_title" style={{ marginBottom: 0 }}>Start your first task today</h2>
        <p>Pick any domain, try 5 responses for free, and judge the quality before spending anything.</p>
        <a href="https://ai.lahon.in" className="ail_btn ail_btn_primary" target="_blank" rel="noreferrer">
          Visit ail →
        </a>
      </div>

      <PageFooter>Copyright © 2026 lahon.in/ail</PageFooter>
    </div>
  );
};

export default Ail;
