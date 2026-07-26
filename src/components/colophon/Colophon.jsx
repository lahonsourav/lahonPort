import React from 'react';
import './colophon.css';
import ShareButton from '../share/ShareButton';
import BackHome from '../shared/BackHome';
import PageFooter from '../shared/PageFooter';
import '../shared/PageShell.css';

const PRINCIPLES = [
  {
    n: '01',
    title: 'Restraint first',
    body: 'Cream and near-black backgrounds, muted grays for supporting text, one accent color doing all the work. Most of what you see is typography and whitespace, not decoration.',
  },
  {
    n: '02',
    title: 'One shell, many projects',
    body: "Every project page shares the same skeleton no matter how different the actual product is — a back button in the same place, a hero that ends with a share button, a footer that's always last. You can jump between wildly different projects and it still feels like one site.",
  },
  {
    n: '03',
    title: 'Personality lives in the details',
    body: 'The achievement badges, the sound toggle, the flip business card that doubles as the entire contact form, the vine that grows down the homepage as you scroll. None of it is required to use the site — all of it rewards noticing.',
  },
  {
    n: '04',
    title: 'Motion has to earn its keep',
    body: 'The timeline draws itself as you scroll past it, cards lift on hover, the business card flips instead of navigating away. Animation always answers "what did the user just do" — it never plays just because it can.',
  },
  {
    n: '05',
    title: 'The same tokens everywhere',
    body: "Every project's own accent color sits on top of one shared scale — the same spacing, radius, shadow, and type tokens, whether you're on a flood-relief campaign or a developer tool's docs. Change the theme or accent and nothing breaks, because nothing hardcodes color outside that scale.",
  },
  {
    n: '06',
    title: 'Quiet defaults',
    body: "Images lazy-load, routes are code-split so visiting one project never downloads another's code, and every interactive element gets a visible focus ring. None of this is visible when it's working — that's the point.",
  },
];

const Colophon = () => {
  return (
    <div className="cl_page page-shell">
      <BackHome />

      <div className="cl_hero">
        <h5>How this site is made</h5>
        <h1>Colophon</h1>
        <p className="cl_tagline">
          A short note on the design principles behind lahon.in — the choices that repeat
          everywhere, and why.
        </p>
        <ShareButton title="Colophon — lahon.in" className="cl_share_btn" />
      </div>

      <div className="cl_section">
        <h2 className="section-title">Design principles</h2>
        <div className="cl_principles">
          {PRINCIPLES.map((p) => (
            <div className="cl_principle" key={p.n}>
              <span className="cl_principle_n">{p.n}</span>
              <h3 className="cl_principle_title">{p.title}</h3>
              <p className="cl_principle_body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      <PageFooter>Copyright © 2026 lahon.in/colophon</PageFooter>
    </div>
  );
};

export default Colophon;
