import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import "./ail.css";
import ailLogo from "../../images/ail/ail-logo-circle.png";

// Opens a WhatsApp chat with Ail, prefilled with "/hi" to start the bot.
const AIL_WHATSAPP_URL = "https://wa.me/916001098923?text=%2Fhi";

const AilPreview = () => {
  return (
    <section id="ail-preview">
      <h5 data-aos="fade-down">Building</h5>

      <h2 data-aos="fade-down" data-aos-delay="100">AIL</h2>

      <a
        data-aos="fade-up"
        className="ail_preview_card"
        href="https://ailighthouse.in"
        target="_blank"
        rel="noreferrer"
      >
        <div className="ail_glow" aria-hidden="true" />

        <span className="ail_badge">
          <span className="ail_badge_dot" />
          32 domains · desktop, mobile, CLI & WhatsApp
        </span>

        <h3 className="ail_title">
          AI writing. <span className="ail_title_accent">Pay per task,</span> not per month.
        </h3>

        <p className="ail_description">
          Built for students, professionals, content creators, and more — a dedicated AI expert
          for 32 different tasks: resumes, coding rounds, thesis chapters, dissertations, legal
          review, and beyond. Generates real PPTs, PDFs, DOCX, and Excel files — not just text —
          and pulls in live web search when a task needs current information. Tokens never
          expire, and you get manual control over how much context each conversation carries.
          Now available as a desktop app (Windows/Mac), Android app, terminal CLI, developer
          API, and on WhatsApp.
        </p>

        <span className="ail_preview_actions">
          <span className="ail_preview_meta">
            <img src={ailLogo} alt="" className="ail_logo" />
            ailighthouse.in <span className="ail_arrow">→</span>
          </span>
        </span>
      </a>

      {/* Outside the card: it's already one big link, and links can't nest. */}
      <p className="ail_whatsapp_row">
        <a
          className="ail_whatsapp_btn"
          href={AIL_WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp aria-hidden="true" />
          Ail WhatsApp
        </a>
      </p>

      <p style={{ textAlign: "center", marginTop: "0.85rem" }}>
        <Link to="/blog/building-ail" className="ail_preview_secondary">
          Read the story behind it →
        </Link>
      </p>
    </section>
  );
};

export default AilPreview;
