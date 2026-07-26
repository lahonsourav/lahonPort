import React, { useState } from 'react';

// Mirrors AccentPicker.jsx's applyDynamicColors() exactly, scoped to this
// widget's own state instead of writing to document.documentElement, so
// dragging the slider never touches the reader's actual site theme.
const computeColors = (hue, isLight) =>
  isLight
    ? { accent: `hsl(${hue} 75% 38%)`, accentBtn: `hsl(${hue} 75% 42%)` }
    : { accent: `hsl(${hue} 85% 78%)`, accentBtn: `hsl(${hue} 70% 38%)` };

const TokenPlayground = () => {
  const [hue, setHue] = useState(160);
  const [isLight, setIsLight] = useState(false);
  const { accent, accentBtn } = computeColors(hue, isLight);

  return (
    <div className="blog-playground">
      <div className="blog-playground-header">
        <span className="blog-playground-label">
          Try it, this runs the exact function above, live
        </span>
        <button
          type="button"
          className="blog-playground-mode"
          onClick={() => setIsLight((v) => !v)}
        >
          {isLight ? '☀️ light' : '🌙 dark'}
        </button>
      </div>

      <input
        type="range"
        min="0"
        max="360"
        value={hue}
        onChange={(e) => setHue(Number(e.target.value))}
        className="blog-playground-slider"
        aria-label="Accent hue"
      />

      <div className="blog-playground-swatches">
        <div className="blog-playground-swatch">
          <span className="blog-playground-swatch-color" style={{ background: accent }} />
          <code>--ds-green: {accent}</code>
        </div>
        <div className="blog-playground-swatch">
          <span className="blog-playground-swatch-color" style={{ background: accentBtn }} />
          <code>--ds-green-btn: {accentBtn}</code>
        </div>
      </div>
    </div>
  );
};

export default TokenPlayground;
