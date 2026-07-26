import { useState } from 'react';
import './cts.css';
import cv from "../../assets/resume.pdf";
import { useNavigate } from 'react-router-dom';
import PdfModal from "../../additionals/pdfModal/PdfModal";
import { playClick } from "../../lib/sound";

const CTA = () => {
  const navigate = useNavigate();
  const [showResume, setShowResume] = useState(false);

  return (
    <>
      <div className="cta">
        <div className="btn" onClick={() => setShowResume(true)} role="button">
          Resume
        </div>
        <div className="btn btn-primary" onClick={() => navigate("/blog")}>
          Blog
        </div>

        {showResume && (
          <PdfModal
            src={cv}
            title="Resume"
            onClose={() => setShowResume(false)}
          />
        )}
      </div>

      <button
        type="button"
        className="cta-scroll-hint"
        onClick={() => {
          playClick();
          document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="Scroll down"
      >
        scroll
        <span className="cta-scroll-chevron" aria-hidden="true">⌄</span>
      </button>
    </>
  );
};

export default CTA;
