import React from "react";
import { useNavigate } from "react-router-dom";
import "../blog/blog.css";

const MokshaPreview = () => {
  const navigate = useNavigate();

  return (
    <section id="moksha-preview">
      <h5 data-aos="fade-down">a side project of my heart</h5>

      <h2 data-aos="fade-down" data-aos-delay="100">Moksha</h2>

      <div className="container blogpreview__list">
        <div
          data-aos="fade-up"
          className="blogpreview__row"
          onClick={() => navigate("/assamflood2026")}
          role="button"
          style={{ "--card-accent": "#f0883e" }}
        >
          <span
            className="blog-tag blogpreview__row-tag"
            style={{ color: "#f0883e", borderColor: "#f0883e55" }}
          >
            relief
          </span>
          <span className="blogpreview__row-title">Assam Flood Relief</span>
          <span className="blogpreview__row-meta">closed · 2x match</span>
          <span className="blogpreview__row-arrow">→</span>
        </div>
      </div>

      <div
        data-aos="fade-up"
        onClick={() => navigate("/moksha")}
        className="btn btn-primary blogpreview__cta"
      >
        Learn about Moksha →
      </div>
    </section>
  );
};

export default MokshaPreview;
