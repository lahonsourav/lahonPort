import React from "react";
import { useNavigate } from "react-router-dom";
import "../blog/blog.css";

const AilPreview = () => {
  const navigate = useNavigate();

  return (
    <section id="ail-preview">
      <h5 data-aos="fade-down">Founder of AIL</h5>

      <h2 data-aos="fade-down" data-aos-delay="100">AIL</h2>

      <div className="container blogpreview__list">
        <div
          data-aos="fade-up"
          className="blogpreview__row"
          onClick={() => navigate("/ail")}
          role="button"
          style={{ "--card-accent": "#3b82f6" }}
        >
          <span
            className="blog-tag blogpreview__row-tag"
            style={{ color: "#3b82f6", borderColor: "#3b82f655" }}
          >
            live product
          </span>
          <span className="blogpreview__row-title">AI writing. Pay per task, not per month.</span>
          <span className="blogpreview__row-meta">ai.lahon.in</span>
          <span className="blogpreview__row-arrow">→</span>
        </div>
      </div>

      <div
        data-aos="fade-up"
        onClick={() => navigate("/ail")}
        className="btn btn-primary blogpreview__cta"
      >
        Learn about AIL →
      </div>
    </section>
  );
};

export default AilPreview;
