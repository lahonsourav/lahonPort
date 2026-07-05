import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

let initialized = false;
const initMermaid = () => {
  if (initialized) return;
  initialized = true;
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    securityLevel: 'strict',
    fontFamily: 'var(--ds-font-mono, monospace)',
    themeVariables: {
      background: '#0d1117',
      primaryColor: '#161b22',
      primaryBorderColor: '#30363d',
      primaryTextColor: '#e6edf3',
      secondaryColor: '#161b22',
      secondaryBorderColor: '#30363d',
      secondaryTextColor: '#e6edf3',
      tertiaryColor: '#0d1117',
      tertiaryBorderColor: '#30363d',
      tertiaryTextColor: '#e6edf3',
      lineColor: '#7ee787',
      textColor: '#e6edf3',
      mainBkg: '#161b22',
      nodeBorder: '#30363d',
      clusterBkg: '#0d1117',
      clusterBorder: '#30363d',
      edgeLabelBackground: '#0d1117',
      actorBkg: '#161b22',
      actorBorder: '#58a6ff',
      actorTextColor: '#e6edf3',
      actorLineColor: '#30363d',
      signalColor: '#7ee787',
      signalTextColor: '#e6edf3',
      labelBoxBkgColor: '#161b22',
      labelBoxBorderColor: '#58a6ff',
      labelTextColor: '#e6edf3',
      loopTextColor: '#e6edf3',
      noteBkgColor: '#1c2128',
      noteBorderColor: '#e3b341',
      noteTextColor: '#e6edf3',
      activationBorderColor: '#7ee787',
      activationBkgColor: '#161b22',
      sequenceNumberColor: '#0d1117',
      fontSize: '17px',
    },
    flowchart: { htmlLabels: true, curve: 'basis' },
    sequence: {
      actorMargin: 60, messageMargin: 30, boxMargin: 10,
      actorFontSize: 17, messageFontSize: 17, noteFontSize: 16,
    },
  });
};

let renderCounter = 0;

const MermaidDiagram = ({ chart }) => {
  const containerRef = useRef(null);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    initMermaid();
    const id = `mermaid-diagram-${++renderCounter}`;
    mermaid.render(id, chart)
      .then(({ svg }) => { if (!cancelled) setSvg(svg); })
      .catch((err) => { if (!cancelled) setError(err.message); });
    return () => { cancelled = true; };
  }, [chart]);

  // Mermaid renders width="100%", which shrinks text-bearing diagrams to fit
  // narrow containers (illegible on phones). Render at intrinsic size instead
  // and let the container scroll horizontally, like the table/code blocks do.
  useEffect(() => {
    const svgEl = containerRef.current?.querySelector('svg');
    if (!svgEl) return;
    const viewBox = svgEl.viewBox.baseVal;
    if (viewBox?.width) {
      svgEl.style.width = `${viewBox.width}px`;
      svgEl.style.maxWidth = 'none';
    }
  }, [svg]);

  if (error) {
    return <div className="blog-diagram-error">Diagram failed to render: {error}</div>;
  }

  return (
    <div
      ref={containerRef}
      className="blog-diagram-svg"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default MermaidDiagram;
