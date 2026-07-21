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
            <div className="portfolio__item-image whp-preview">
              <div className="whp-inner">
                <div className="whp-title-row">
                  <span className="whp-swirl">🌀</span>
                  <span className="whp-name">Wormhole</span>
                </div>
                <div className="whp-tunnel">
                  <span className="whp-phone">📱</span>
                  <span className="whp-line"><span className="whp-lock">🔒</span></span>
                  <span className="whp-phone">📱</span>
                </div>
                <div className="whp-bubbles">
                  <span className="whp-msg">hey, just us here?</span>
                  <span className="whp-msg whp-msg--me">just us. no servers 🔐</span>
                </div>
                <div className="whp-chips">
                  <span className="whp-chip">E2E encrypted</span>
                  <span className="whp-chip">P2P</span>
                  <span className="whp-chip">📞 🎥</span>
                </div>
              </div>
            </div>
            <h3>Wormhole</h3>
            <small>
              P2P messaging for exactly two people. Text, photos, and voice/video calls travel phone-to-phone over an end-to-end encrypted WebRTC tunnel — no accounts, no cloud, no servers in between. (React Native, WebRTC, NaCl)
            </small>
            <div className="portfolio__item-cta">
              <div
                onClick={() => navigate("/wormhole")}
                className="btn btn-primary"
              >
                Learn More
              </div>
              <div
                onClick={() => navigate("/blog/building-wormhole-p2p-messaging")}
                className="btn btn-primary"
              >
                Blog
              </div>
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
              Your private mood diary. Check in with 35+ emotions daily, get an AI-written journal every night, and explore mood patterns across the last 90 days, fully encrypted on device. (React Native, SQLite)
            </small>
            <div className="portfolio__item-cta">
              <div
                onClick={() => navigate("/mood")}
                className="btn btn-primary"
              >
                Learn More
              </div>
              <div
                onClick={() => navigate("/blog/why-im-building-innercast")}
                className="btn btn-primary"
              >
                Blog
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
              Multi-modal AVSR system fusing audio features (MFCCs) with video features (CNNs) for 25% better accuracy in noisy environments than audio alone. Trained SVM, Random Forest, DNN, and LSTM models, running under 500ms.
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
            <div className="portfolio__item-image spg-preview">
              <div className="spg-inner">
                <div className="spg-title-row">
                  <span className="spg-cap">🎓</span>
                  <span className="spg-name">Success Point</span>
                </div>
                <div className="spg-chips">
                  <span className="spg-chip">NEET</span>
                  <span className="spg-chip">JEE</span>
                  <span className="spg-chip">ADRE</span>
                  <span className="spg-chip">TET</span>
                </div>
                <div className="spg-badge">Admissions Open</div>
              </div>
            </div>
            <h3>Success Point Gogamukh</h3>
            <small>
              A coaching center website for Success Point Gogamukh, Assam, covering board-exam tuition for Classes IX–XII plus NEET, JEE, and state government exam prep like ADRE, TET, SSC, and Assam Police. (React, PostgreSQL)
            </small>
            <div className="portfolio__item-cta">
              <a
                href="https://www.successpointgogamukh.com/"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Visit
              </a>
              <div
                onClick={() => navigate("/blog/why-digitalise-your-coaching-business")}
                className="btn btn-primary"
              >
                Blog
              </div>
            </div>
          </article>
        </MaybeTilt>

        <MaybeTilt>
          <article data-aos="zoom-in-up" data-aos-delay="400" className="portfolio__items">
            <div className="portfolio__item-image">
              <img src={PRO6} alt="" width="1456" height="1068" loading="lazy" />
            </div>
            <h3>Assamesedress.shop</h3>
            <small>
              An e-commerce platform for Assamese traditional attire, bringing heritage fashion online with a full product catalogue, shopping cart, and checkout flow that promotes indigenous craft to a much wider audience. (MERN Stack)
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
          <article data-aos="zoom-in-up" data-aos-delay="500" className="portfolio__items">
            <div className="portfolio__item-image">
              <img src={PRO4} alt="" width="480" height="360" loading="lazy" />
            </div>
            <h3>Doggies</h3>
            <small>
              A swipe-based dog discovery app with a delightfully simple UI — browse breeds, swipe left or right, and save your favourite matches. Built for Android with smooth, native-feeling gesture navigation. (Flutter, Android)
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
                href="https://marketplace.visualstudio.com/items?itemName=lahonsourav.lazyperm-claude"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Extension
              </a>
            </div>
          </article>
        </MaybeTilt>

        <MaybeTilt>
          <article data-aos="zoom-in-up" className="portfolio__items">
            <div className="portfolio__item-image sg-preview">
              <div className="sg-inner">
                <div className="sg-brand">Spend<span className="sg-dot">·</span>Gate</div>
                <div className="sg-verdict">
                  <span className="sg-verdict-tag">Hold 72h</span>
                  <div className="sg-verdict-amt">₹18,000</div>
                  <div className="sg-meter">
                    <div className="sg-meter-fill" />
                  </div>
                </div>
              </div>
            </div>
            <h3>Spend Gate</h3>
            <small>
              A spending gate for impulse buys — type an amount, answer a few honest questions, and get a verdict: buy, wait 72 hours, or skip. Tracks budgets from your bank export and plans savings automatically.
            </small>
            <div className="portfolio__item-cta">
              <a
                href="https://lahonsourav.github.io/Spend-Gate/"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Open App
              </a>
            </div>
          </article>
        </MaybeTilt>
      </div>
    </section>
  );
};

export default Portfolio;
