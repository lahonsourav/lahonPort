import React from "react";
import "./ail.css";
import ShareButton from "../share/ShareButton";
import BackHome from "../shared/BackHome";
import PageFooter from "../shared/PageFooter";
import { DOMAIN_GROUPS, STEPS, WHY, FEATURES, FAQS } from "./ailData";

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeWidth="1" />
    <polyline points="4,7 6,9 10,5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Ail = () => {
  return (
    <div className="ail_page">
      <BackHome />

      {/* ── Nav ── */}
      <nav className="ail_nav">
        <span className="ail_nav_brand">ail</span>
        <div className="ail_nav_links">
          <a href="#ail-how">How it works</a>
          <a href="#ail-domains">Domains</a>
          <a href="#ail-pricing">Pricing</a>
          <a href="#ail-features">Features</a>
          <a href="#ail-faq">FAQ</a>
        </div>
        <a href="https://ai.lahon.in" className="ail_btn ail_btn_primary" target="_blank" rel="noreferrer" style={{ padding: "0.5rem 1.1rem", fontSize: "0.82rem" }}>
          Visit ail →
        </a>
      </nav>

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
            Try for free, no card needed
          </a>
          <a href="https://ai.lahon.in" className="ail_btn ail_btn_secondary" target="_blank" rel="noreferrer">
            Bring your own API key
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
      <div className="ail_section" id="ail-how">
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

      {/* ── Domains ── */}
      <div className="ail_section" id="ail-domains">
        <p className="ail_eyebrow">Domains</p>
        <h2 className="ail_section_title">26 specialised AIs</h2>
        <p className="ail_section_subtitle">
          Not a generic chatbot. Each domain has a dedicated AI expert. Pick a task, get a specialist.
        </p>
        {DOMAIN_GROUPS.map((group) => (
          <div className="ail_domain_group" key={group.label}>
            <p className="ail_domain_group_label">{group.label}</p>
            <p className="ail_domain_group_desc">{group.desc}</p>
            <div className="ail_domain_pills">
              {group.domains.map((d) => (
                <a
                  key={d}
                  href="https://ai.lahon.in"
                  target="_blank"
                  rel="noreferrer"
                  className="ail_domain_pill"
                >
                  {d}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Pricing ── */}
      <div className="ail_section" id="ail-pricing">
        <p className="ail_eyebrow">Pricing</p>
        <h2 className="ail_section_title">Simple, honest pricing</h2>
        <p className="ail_section_subtitle">Two plans. No hidden fees. No auto-renewal. No expiry.</p>

        <div className="ail_pricing_grid">
          <div className="ail_pricing_card">
            <div>
              <p className="ail_pricing_kicker">Pay per package</p>
              <div className="ail_pricing_price">
                <strong>₹29</strong>
                <span>onwards</span>
              </div>
              <p className="ail_pricing_note">one-time · no renewal</p>
            </div>
            <ul className="ail_pricing_list">
              {[
                "Pick any domain, buy the tier you need",
                "Unlimited back-and-forth within your token budget",
                "Upload documents: PDF, Word, images",
                "Tokens never expire",
                "5 free responses per domain before purchase",
              ].map((item) => (
                <li key={item}><CheckIcon />{item}</li>
              ))}
            </ul>
            <a href="https://ai.lahon.in" className="ail_btn ail_btn_primary" target="_blank" rel="noreferrer" style={{ textAlign: "center" }}>
              Start free trial
            </a>
          </div>

          <div className="ail_pricing_card ail_pricing_card--featured">
            <span className="ail_pricing_badge">For power users</span>
            <div>
              <p className="ail_pricing_kicker">Bring your own key</p>
              <div className="ail_pricing_price">
                <strong>₹49</strong>
                <span>/ conversation</span>
              </div>
              <p className="ail_pricing_note">platform fee · use your Anthropic key</p>
            </div>
            <ul className="ail_pricing_list">
              {[
                "Connect your own Anthropic API key",
                "Unlimited messages per conversation",
                "Credits never expire",
                "3 free trial conversations",
                "Full control over model selection",
              ].map((item) => (
                <li key={item}><CheckIcon />{item}</li>
              ))}
            </ul>
            <a href="https://ai.lahon.in" className="ail_btn ail_btn_secondary" target="_blank" rel="noreferrer" style={{ textAlign: "center" }}>
              Start with BYO
            </a>
          </div>
        </div>

        <div className="ail_credit_packs">
          <p>BYO credit packs</p>
          <div className="ail_credit_packs_row">
            <span><strong>5 conversations</strong> · ₹249</span>
            <span><strong>15 conversations</strong> · ₹729</span>
            <span><strong>35 conversations</strong> · ₹1,699</span>
          </div>
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
              <div className="ail_card_icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /></svg>
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <div className="ail_section" id="ail-features">
        <p className="ail_eyebrow">Features</p>
        <h2 className="ail_section_title">More than a chat box</h2>
        <p className="ail_section_subtitle">
          Tools built into the conversation itself — no extra tabs, no separate apps.
        </p>
        <div className="ail_grid">
          {FEATURES.map((item) => (
            <div className="ail_card" key={item.title}>
              <div className="ail_card_icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="3" /></svg>
              </div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Developer API ── */}
      <div className="ail_section">
        <p className="ail_eyebrow">For developers</p>
        <h2 className="ail_section_title">Automate with the API, plug in your own retrieval</h2>
        <div className="ail_two_col">
          <div>
            <h3>API access</h3>
            <p>
              Send messages to conversations programmatically, from a script or a cron job. No
              separate API pricing — it draws from the same token budget already paid for.
            </p>
            <ul>
              {[
                "Generate a key in seconds from your dashboard",
                "Same budget, same limits, nothing new to buy",
                "Revoke a key instantly, anytime",
              ].map((item) => <li key={item}><CheckIcon />{item}</li>)}
            </ul>
          </div>
          <div>
            <h3>Bring your own RAG</h3>
            <p>
              Point ail at a retrieval endpoint and every message calls it first, injecting what
              it returns as extra context before the AI answers — documents stay wherever they're hosted.
            </p>
            <ul>
              {[
                "Any HTTPS endpoint — vector DB, search index, internal API",
                "Optional bearer token, encrypted at rest",
                "Fails open: a retriever outage never blocks a message",
              ].map((item) => <li key={item}><CheckIcon />{item}</li>)}
            </ul>
          </div>
        </div>
        <a href="https://ai.lahon.in" className="ail_btn ail_btn_primary" target="_blank" rel="noreferrer">
          Get started free →
        </a>
      </div>

      {/* ── FAQ ── */}
      <div className="ail_section" id="ail-faq">
        <p className="ail_eyebrow">FAQ</p>
        <h2 className="ail_section_title">Questions, answered</h2>
        <div className="ail_faq">
          {FAQS.map((item) => (
            <details className="ail_faq_item" key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
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
