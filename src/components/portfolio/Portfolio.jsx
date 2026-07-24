import React, { useState } from "react";
import "./Portfolio.css";

import AssamFloodArt from "../../images/assam-flood-front.png";

import Tilt from "react-parallax-tilt";
import { useNavigate } from "react-router-dom";
import PdfModal from "../../additionals/pdfModal/PdfModal";

const isTouch = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
const MaybeTilt = ({ children, ...props }) =>
  isTouch ? <>{children}</> : <Tilt {...props}>{children}</Tilt>;

const AVSR_THESIS_URL = "https://drive.google.com/file/d/12Yy-KGhU3uN-VXC6uvemQuQSAkR_i6Nl/preview";

const Portfolio = () => {
  const navigate = useNavigate();
  const [showThesis, setShowThesis] = useState(false);

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
                onClick={() => navigate("/success-point-gogamukh")}
                className="btn btn-primary"
              >
                Learn More
              </div>
            </div>
          </article>
        </MaybeTilt>

        <MaybeTilt>
          <article data-aos="zoom-in-up" data-aos-delay="400" className="portfolio__items">
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
              <div
                onClick={() => setShowThesis(true)}
                className="btn btn-primary"
              >
                Thesis
              </div>
            </div>
          </article>
        </MaybeTilt>
      </div>

      {showThesis && (
        <PdfModal
          src={AVSR_THESIS_URL}
          title="AVSR Thesis"
          onClose={() => setShowThesis(false)}
        />
      )}

      <div className="portfolio__see-all">
        <div onClick={() => navigate("/work")} className="btn" role="button">
          See all work →
        </div>
      </div>

      <h2 className="tools__heading">For People</h2>

      <div className="container forpeople__container">
        <MaybeTilt>
          <article data-aos="zoom-in-up" className="portfolio__items">
            <div className="portfolio__item-image afp-preview">
              <img src={AssamFloodArt} alt="Stand with Assam" />
            </div>
            <h3>Assam Flood Relief</h3>
            <small>
              A "double your donation" drive for Assam's monsoon floods — scan the UPI QR, log what
              you sent, and I match it rupee for rupee out of my own pocket. Open till 25th July,
              matching capped at ₹10,000.
            </small>
            <div className="portfolio__item-cta">
              <div
                onClick={() => navigate("/assam-flood")}
                className="btn btn-primary"
              >
                Donate Now
              </div>
            </div>
          </article>
        </MaybeTilt>
      </div>
    </section>
  );
};

export default Portfolio;
