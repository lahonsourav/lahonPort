import React from 'react';

const PALETTE = [
  { var: '--ds-bg', label: 'Background' },
  { var: '--ds-surface', label: 'Surface' },
  { var: '--ds-green', label: 'Accent' },
  { var: '--ds-green-btn', label: 'Accent button' },
  { var: '--ds-blue', label: 'Secondary' },
  { var: '--ds-text-muted', label: 'Muted text' },
];

// Not screenshots, these are var(--ds-*) rendered live on the page you're
// reading, so they follow the reader's actual theme/accent choice.
const LivePalette = () => (
  <div className="blog-palette">
    {PALETTE.map((t) => (
      <div className="blog-palette-swatch" key={t.var}>
        <span className="blog-palette-color" style={{ background: `var(${t.var})` }} />
        <span className="blog-palette-label">{t.label}</span>
        <code className="blog-palette-var">{t.var}</code>
      </div>
    ))}
  </div>
);

export default LivePalette;
