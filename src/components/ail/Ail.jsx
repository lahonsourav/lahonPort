import React from "react";
import "../portfolio/lazykit.css";
import ShareButton from "../share/ShareButton";
import BackHome from "../shared/BackHome";
import PageFooter from "../shared/PageFooter";

const Ail = () => {
  return (
    <div className="lk_container">
      <BackHome />

      {/* ── Hero ── */}
      <div className="lk_hero">
        <h1 className="lk_title">AIL</h1>
        <p className="lk_tagline">AI at Lahon — a domain-specific AI writing assistant.</p>
        <p className="lk_description">
          AIL is a chat-based writing assistant built on Claude, with dozens of purpose-built
          modules instead of one generic chatbox: résumés and cover letters, thesis and research
          writing, exam prep, legal review, business content, and more. Each module carries its
          own system prompt and tools tuned for that kind of writing.
        </p>
        <div className="lk_hero_actions">
          <a href="https://ai.lahon.in" className="lk_btn lk_btn_primary" target="_blank" rel="noreferrer">
            Visit ail →
          </a>
        </div>
        <ShareButton title="AIL: AI at Lahon" className="lk_share_btn" />
      </div>

      {/* ── What it does ── */}
      <div className="lk_section">
        <h2 className="lk_section_title">What it does</h2>
        <p className="lk_section_subtitle">
          Pick a domain, describe what you need, and iterate in a normal chat interface:
        </p>
        <ul className="lk_bullet_list">
          <li>26+ domain modules, from résumé writing to legal review to thesis chapters</li>
          <li>Model tiers (Haiku / Sonnet / Opus) that scale with package tier and task complexity</li>
          <li>Attach a résumé, brief, or dataset and get feedback grounded in that document</li>
          <li>An ATS check for the résumé module: a structure/keyword-match heuristic, not a real ATS parser</li>
          <li>Bring your own Anthropic API key (BYOK) if you'd rather pay Anthropic directly</li>
        </ul>
      </div>

      {/* ── How it works ── */}
      <div className="lk_section">
        <h2 className="lk_section_title">How it works</h2>
        <p className="lk_section_subtitle">
          No subscriptions. Try a domain free, then buy a prepaid token budget for it and use it
          until it runs out — tokens don't expire.
        </p>
        <div className="lk_callout">
          <span className="lk_callout_icon">💡</span>
          <span>
            Every plan is scoped to one domain at a time, so you're only paying for the kind of
            writing you actually need help with.
          </span>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="lk_footer">
        <p>An AI writing assistant, one domain at a time.</p>
        <div className="lk_hero_actions">
          <a href="https://ai.lahon.in" className="lk_btn lk_btn_primary" target="_blank" rel="noreferrer">
            Visit ail →
          </a>
        </div>
      </div>

      <PageFooter>Copyright © 2026 lahon.in/ail</PageFooter>
    </div>
  );
};

export default Ail;
