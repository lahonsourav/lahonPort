import React from "react";
import { Link } from "react-router-dom";
import "./ail.css";
import ailLogo from "../../images/ail/ail-logo-circle.png";

const AilPreview = () => {
  return (
    <section id="ail-preview">
      <h5 data-aos="fade-down">Founder of</h5>

      <h2 data-aos="fade-down" data-aos-delay="100">AIL</h2>

      <a
        data-aos="fade-up"
        className="ail_preview_card"
        href="https://ailighthouse.in"
        target="_blank"
        rel="noreferrer"
      >
        <div className="ail_glow" aria-hidden="true" />

        <img src={ailLogo} alt="AIL" className="ail_logo" />

        <span className="ail_badge">
          <span className="ail_badge_dot" />
          32 domains · desktop, mobile & CLI
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
          Now available as a desktop app (Windows/Mac), Android app, terminal CLI, and developer
          API.
        </p>

        <span className="ail_preview_actions">
          <span className="ail_preview_meta">
            ailighthouse.in <span className="ail_arrow">→</span>
          </span>
        </span>
      </a>

      <p style={{ textAlign: "center", marginTop: "0.85rem" }}>
        <Link to="/blog/building-ail" className="ail_preview_secondary">
          Read the story behind it →
        </Link>
      </p>
    </section>
  );
};

export default AilPreview;
