import React from "react";
import { useNavigate } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import "../portfolio/Portfolio.css";
import "./moksha.css";

import mokshaLogo from "../../assets/mokshaligned.png";
import AssamFloodArt from "../../images/assam-flood-front.png";
import useReveal from "../reveal/useReveal";

const isTouch = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
const MaybeTilt = ({ children, ...props }) =>
  isTouch ? <>{children}</> : <Tilt {...props}>{children}</Tilt>;

const Moksha = () => {
  const navigate = useNavigate();
  useReveal();

  return (
    <div className="mk_page">
      <button className="mk_back" onClick={() => navigate("/")}>← Back</button>

      <div className="mk_hero">
        <img src={mokshaLogo} alt="Moksha" className="mk_logo" data-aos="zoom-in" />
        <h5 data-aos="fade-down">a small side-project of the heart</h5>
        <h1 data-aos="fade-down" data-aos-delay="100">Moksha</h1>
        <p className="mk_tagline" data-aos="fade-up" data-aos-delay="150">
          Sanskrit for release — from struggle, from waiting, from doing nothing.
        </p>
      </div>

      <div className="mk_mission" data-aos="fade-up">
        <p>
          Moksha is where I put money and effort directly into helping people when
          things get hard — no committee, no overhead, no paperwork. Just find
          someone who needs help, and help them.
        </p>
      </div>

      <h2 className="mk_section_heading" data-aos="fade-down">Initiatives</h2>

      <div className="container mk_initiatives">
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

      <div className="mk_cta" data-aos="fade-up">
        <p>Got an idea, or know someone who needs help?</p>
        <div onClick={() => navigate("/contactout")} className="btn btn-primary" role="button">
          Get in touch →
        </div>
      </div>
    </div>
  );
};

export default Moksha;
