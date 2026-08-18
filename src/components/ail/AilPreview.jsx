import React from "react";
import { useNavigate } from "react-router-dom";
import "./ail.css";

const AilPreview = () => {
  const navigate = useNavigate();

  return (
    <section id="ail-preview">
      <h5 data-aos="fade-down">Founder of AIL</h5>

      <h2 data-aos="fade-down" data-aos-delay="100">AIL</h2>

      <div
        data-aos="fade-up"
        className="ail_preview_card"
        onClick={() => navigate("/ail")}
        role="button"
      >
        <div className="ail_glow" aria-hidden="true" />

        <span className="ail_badge">
          <span className="ail_badge_dot" />
          26 domains · live product
        </span>

        <h3 className="ail_title">
          AI writing. <span className="ail_title_accent">Pay per task,</span> not per month.
        </h3>

        <p className="ail_description">
          A chat-based writing assistant with a dedicated AI expert for 26 different tasks:
          résumés, thesis chapters, legal review, and more.
        </p>

        <span className="ail_preview_meta">
          ai.lahon.in <span className="ail_arrow">→</span>
        </span>
      </div>
    </section>
  );
};

export default AilPreview;
