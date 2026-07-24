import { useState } from 'react';
import './cts.css';
import cv from "../assets/resume.pdf";
import { useNavigate } from 'react-router-dom';
import PdfModal from "../additionals/pdfModal/PdfModal";

const CTA = () => {
  const navigate = useNavigate();
  const [showResume, setShowResume] = useState(false);

  return (
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
  );
};

export default CTA;
