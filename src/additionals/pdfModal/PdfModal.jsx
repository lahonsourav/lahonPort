import React from "react";
import "./pdfModal.css";

const PdfModal = ({ src, title, onClose }) => {
  if (!src) return null;

  return (
    <div className="pdf-modal-overlay" onClick={onClose}>
      <div className="pdf-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pdf-modal-bar">
          <span className="pdf-modal-title">{title}</span>
          <button className="pdf-modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <iframe src={src} title={title} className="pdf-modal-frame" />
      </div>
    </div>
  );
};

export default PdfModal;
