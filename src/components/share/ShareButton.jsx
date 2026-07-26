import { useState } from "react";
import { FiShare2 } from "react-icons/fi";
import "./ShareButton.css";

const ShareButton = ({ title, className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable — nothing more we can do here
    }
  };

  return (
    <button type="button" className={`share-btn ${className}`} onClick={handleShare} aria-label="Share this page">
      <FiShare2 />
      {copied ? "Copied!" : "Share"}
    </button>
  );
};

export default ShareButton;
