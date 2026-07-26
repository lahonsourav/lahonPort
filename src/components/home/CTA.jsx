import { useState } from 'react';
import './cts.css';
import cv from "../../assets/resume.pdf";
import { useNavigate } from 'react-router-dom';
import PdfModal from "../../additionals/pdfModal/PdfModal";

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
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + cv)}&embedded=true`}
            title="Resume"
            onClose={() => setShowResume(false)}
          />
        )}
      </div>

      <span className="cta-scroll-hint" aria-hidden="true">
        scroll
        <span className="cta-scroll-chevron">⌄</span>
      </span>
    </>
  );
};

export default CTA;
