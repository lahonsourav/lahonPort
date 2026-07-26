import React, { useEffect } from "react";
import "./pdfModal.css";

const PdfModal = ({ src, title, onClose }) => {
  useEffect(() => {
    if (!src) return;

    // Lock body scroll while open — plain `overflow:hidden` isn't enough on
    // iOS Safari, which still rubber-bands the page behind a fixed overlay
    // on a swipe-down-then-up gesture. Pinning position:fixed at the
    // current scroll offset (and restoring it on close) stops that.
    const scrollY = window.scrollY;
    document.body.classList.add("pdf-modal-open");
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.classList.remove("pdf-modal-open");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [src]);

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
