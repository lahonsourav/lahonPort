import React from "react";
import "./Portfolio.css";
import Pt from './Partnership.pdf'

import PRO4 from "../../images/doggo.jpg";
import PRO6 from "../../images/gamusawhitelow.jpg";

import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";

const isTouch = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
const MaybeTilt = ({ children, ...props }) =>
  isTouch ? <>{children}</> : <Tilt {...props}>{children}</Tilt>;

const Portfolio = () => {
  const navigate = useNavigate();

  return (
    <section id="portfolio">
      <h5 data-aos="fade-down">a selection of</h5>

      <h2>My Projects</h2>

      <div className="container portfolio__container">
        <MaybeTilt>
          <article data-aos="zoom-in-up" data-aos-delay="0" className="portfolio__items">
            <div className="portfolio__item-image lk-preview">
              <div className="lk-flow">
                <div className="lk-node">
                  <span className="lk-node-dot lk-node-dot--green" />
                  <div className="lk-node-title">issue #42</div>
                  <div className="lk-node-body">Add dark mode</div>
                </div>
                <span className="lk-step-arrow">→</span>
                <div className="lk-bot">🤖</div>
                <span className="lk-step-arrow">→</span>
                <div className="lk-node">
                  <span className="lk-node-dot lk-node-dot--purple" />
                  <div className="lk-node-title">PR #43</div>
                  <div className="lk-node-body">feat: dark mode</div>
                  <div className="lk-merged-badge">merged</div>
                </div>
              </div>
            </div>
            <h3>LazyKit</h3>
            <small>
              Drop an issue, get a PR. LazyKit wires Claude AI into your GitHub repo — open an issue from anywhere, Claude writes the code and opens a pull request. No laptop, no IDE, no claude code open, only github.
            </small>
            <div className="portfolio__item-cta">
              <div
                onClick={() => navigate("/lazykit")}
                className="btn btn-primary"
              >
                Learn More
              </div>
              <a
                href="https://www.npmjs.com/package/@slahon/lazykit"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                npm
              </a>
            </div>
          </article>
        </MaybeTilt>

        <MaybeTilt>
          <article data-aos="zoom-in-up" data-aos-delay="100" className="portfolio__items">
            <div className="portfolio__item-image mdp">
              <div className="mdp__inner">
                <div className="mdp__top">
                  <span className="mdp__greeting">Good morning ☀️</span>
                  <span className="mdp__date">Saturday · 27 June</span>
                </div>
                <svg className="mdp__gauge" viewBox="0 0 100 53">
                  <defs>
                    <linearGradient id="mdp-g" x1="6" y1="0" x2="94" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%"   stopColor="#f85149" />
                      <stop offset="40%"  stopColor="#e3b341" />
                      <stop offset="100%" stopColor="#3de081" />
                    </linearGradient>
                  </defs>
                  <path d="M 6 50 A 44 44 0 0 1 94 50"  fill="none" stroke="#21262d" strokeWidth="3"  strokeLinecap="round" />
                  <path d="M 16 50 A 34 34 0 0 1 84 50" fill="none" stroke="#21262d" strokeWidth="9"  strokeLinecap="round" />
                  <path d="M 26 50 A 24 24 0 0 1 74 50" fill="none" stroke="#21262d" strokeWidth="14" strokeLinecap="round" />
                  <path d="M 6 50 A 44 44 0 0 1 87.1 26.4"  fill="none" stroke="url(#mdp-g)" strokeWidth="3"  strokeLinecap="round" />
                  <path d="M 16 50 A 34 34 0 0 1 74.0 26.0" fill="none" stroke="url(#mdp-g)" strokeWidth="9"  strokeLinecap="round" />
                  <path d="M 26 50 A 24 24 0 0 1 64.1 30.6" fill="none" stroke="url(#mdp-g)" strokeWidth="14" strokeLinecap="round" />
                  <text x="50" y="41" textAnchor="middle" fontSize="14" fontFamily="Georgia, serif" fill="#3de081" letterSpacing="-0.5">7.0</text>
                  <text x="50" y="50" textAnchor="middle" fontSize="5.5" fontFamily="system-ui, sans-serif" fill="#8b949e">calm</text>
                </svg>
                <div className="mdp__chips">
                  <span className="mdp__chip mdp__chip--pos">😄 Joyful</span>
                  <span className="mdp__chip mdp__chip--pos">🥰 Loved</span>
                  <span className="mdp__chip mdp__chip--neu">😌 Calm</span>
                  <span className="mdp__chip mdp__chip--neu">😐 Okay</span>
                  <span className="mdp__chip mdp__chip--neg">😰 Anxious</span>
                  <span className="mdp__chip mdp__chip--neg">😢 Sad</span>
                </div>
                <div className="mdp__tip">🌿 A gentle suggestion for you</div>
              </div>
            </div>
            <h3>Innercast</h3>
            <small>
              Your private mood diary. Check in with 35+ emotions daily, get an AI-written journal each night, and explore patterns across 7, 30, and 90 days. Everything stays encrypted on your device
            </small>
            <div className="portfolio__item-cta">
              <div
                onClick={() => navigate("/mood")}
                className="btn btn-primary"
              >
                Learn More
              </div>
            </div>
          </article>
        </MaybeTilt>

        <MaybeTilt>
          <article data-aos="zoom-in-up" data-aos-delay="200" className="portfolio__items">
            <div className="portfolio__item-image avsr-preview">
              <div className="avsr-inner">
                <div className="avsr-inputs">
                  <div className="avsr-stream">
                    <div className="avsr-waveform">
                      {[3,7,12,5,9,15,6,10,4,8].map((h, i) => (
                        <span key={i} className="avsr-bar" style={{height: `${h}px`}} />
                      ))}
                    </div>
                    <span className="avsr-stream-label">audio</span>
                  </div>
                  <span className="avsr-fusion">⊕</span>
                  <div className="avsr-stream">
                    <svg viewBox="0 0 40 40" className="avsr-face">
                      <circle cx="20" cy="20" r="17" stroke="currentColor" fill="none" strokeWidth="1.5"/>
                      <circle cx="14" cy="17" r="2" fill="currentColor"/>
                      <circle cx="26" cy="17" r="2" fill="currentColor"/>
                      <path d="M 13 26 Q 20 31 27 26" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span className="avsr-stream-label">video</span>
                  </div>
                </div>
                <div className="avsr-chips">
                  <span className="avsr-chip">25% ↑ accuracy</span>
                  <span className="avsr-chip avsr-chip--blue">{"< 500ms"}</span>
                </div>
              </div>
            </div>
            <h3>AVSR</h3>
            <small>
              Multi-modal AVSR system fusing audio (MFCCs) and video (CNNs) — 25% better accuracy in noisy environments vs audio-only. Trained SVM, Random Forest, DNN & LSTM. Real-time under 500ms.
            </small>
            <div className="portfolio__item-cta">
              <a
                href="https://drive.google.com/file/d/12Yy-KGhU3uN-VXC6uvemQuQSAkR_i6Nl/view"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Thesis
              </a>
            </div>
          </article>
        </MaybeTilt>

        <MaybeTilt>
          <article data-aos="zoom-in-up" data-aos-delay="300" className="portfolio__items">
            <div className="portfolio__item-image">
              <img src={PRO6} alt="" loading="lazy" />
            </div>
            <h3>Assamesedress.shop</h3>
            <small>
              An e-commerce platform for Assamese traditional attire — bringing heritage fashion online with a full catalogue, cart, and checkout. Promotes indigenous craft to a wider audience. (MERN Stack)
            </small>
            <div className="portfolio__item-cta">
              <a
                href="https://assamesedress.shop/"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Visit
              </a>

              <a
                href={Pt} download="Gamusa_Partnership"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Partnership
              </a>
            </div>
          </article>
        </MaybeTilt>

        <MaybeTilt>
          <article data-aos="zoom-in-up" data-aos-delay="400" className="portfolio__items">
            <div className="portfolio__item-image">
              <img src={PRO4} alt="" loading="lazy" />
            </div>
            <h3>Doggies</h3>
            <small>
              A swipe-based dog discovery app with a delightfully simple UI — browse breeds, swipe left or right, and find your favourite. Built for Android with smooth gesture navigation. (Flutter, Android)
            </small>
            <div className="portfolio__item-cta">
              <a
                href="https://lahonsourav.github.io/doggies/#/"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Swipe now
              </a>
              <a
                href="https://drive.google.com/file/d/1uCxXe7biCmFA_i6s9p7n2Y-S4xVwL_Hx/view?usp=drivesdk"
                className="btn btn-primary"
                download="Doggies"
                target="_blank"
                rel="noreferrer"
              >
                Android
              </a>
            </div>
          </article>
        </MaybeTilt>
      </div>

      <h2 className="tools__heading">Tools</h2>

      <div className="container tools__container">
        <MaybeTilt>
          <article data-aos="zoom-in-up" className="portfolio__items">
            <div className="portfolio__item-image lazyperm-preview">
              <div className="lazyperm-terminal">
                <div className="lazyperm-terminal__bar">
                  <span /><span /><span />
                </div>
                <div className="lazyperm-terminal__body">
                  <span className="lp-dim">$ </span><span className="lp-cmd">git status</span>
                  <span className="lp-allow"> ✓ auto-allowed</span>
                  <br />
                  <span className="lp-dim">$ </span><span className="lp-cmd">rm -rf dist</span>
                  <span className="lp-deny"> ✗ blocked</span>
                  <br />
                  <span className="lp-dim">$ </span><span className="lp-cmd">npm run build</span>
                  <span className="lp-prompt"> ↳ prompt</span>
                </div>
              </div>
            </div>
            <h3>lazyperm</h3>
            <small>
              Eliminates repetitive permission prompts in Claude Code. Hooks into PreToolUse to auto-allow safe commands and block dangerous ones — so you only get interrupted when it actually matters.
            </small>
            <div className="portfolio__item-cta">
              <div
                onClick={() => navigate("/lazyperm")}
                className="btn btn-primary"
              >
                Learn More
              </div>
              <a
                href="https://www.npmjs.com/package/lazyperm"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                npm
              </a>
              <a
                href="https://marketplace.visualstudio.com/items?itemName=lahonsourav.lazyperm-claude"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                VS Code
              </a>
            </div>
          </article>
        </MaybeTilt>
      </div>
    </section>
  );
};

export default Portfolio;
