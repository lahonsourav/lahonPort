import React, { useEffect } from "react";
import "./about.css";
import { GiPiercedHeart } from "react-icons/gi";
import { GiBurningPassion } from "react-icons/gi";
import { FaWpexplorer } from "react-icons/fa";
import PHOTO from "../../assets/mejpg.jpg";

import Aos from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const About = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section id="about">
      <div>
        <a href="#about">
          <div>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="scroll-down"
            />
          </div>
        </a>
      </div>

      <div className="needspace">
        {/* <h5>click to scroll</h5> */}
        <svg class="arrows">
          <path className="a1" d="M0 0 L30 32 L60 0"></path>
          <path className="a2" d="M0 20 L30 52 L60 20"></path>
          <path className="a3" d="M0 40 L30 72 L60 40"></path>
        </svg>
      </div>

      <h5 data-aos="fade-down">Get To Know</h5>

      <h2>About Me</h2>

      <div className="container about__container">
        <div data-aos="zoom-in" className="about__me">
          <div className="small__hole"></div>
          <div className="about__me-image">
            <div className="small__hole"></div>
            <img src={PHOTO} alt="AboutImage" />
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <article data-aos="fade-up-right" className="about__card">
              <GiPiercedHeart className="about__icon" />
              <h5>Creative</h5>
              <small>being artistic </small>
            </article>

            <article data-aos="fade-up" className="about__card">
              <GiBurningPassion className="about__icon" />
              <h5>Passionate</h5>
              <small>to learn new</small>
            </article>

            <article data-aos="fade-up-left" className="about__card">
              <FaWpexplorer className="about__icon" />
              <h5>Explorer</h5>
              <small>love exploring</small>
            </article>
          </div>

          <p className="para">
            I am a Computer Science and Engineering student of National
            Institute of Technology{" "}
            <a href="https://www.nits.ac.in/" target="_blank" rel="noreferrer">
              (NIT Silchar)&nbsp;
            </a>
            <br />
            <br />
            Along with my study I love to make Rap (Hip Hop) Music, write songs;
            I love thinking about the Universe and Space, The huge stars, the
            gas giant Jupiter
            <br />
            <br />I love{" "}
            <a
              href="https://lahonsourav.github.io/doggies/#/"
              target="_blank"
              rel="noreferrer"
            >
              Doggies&nbsp;
            </a>
            and{" "}
            <a href="https://tinder4cats.com/" target="_blank" rel="noreferrer">
              Cats&nbsp;
            </a>
            , but frog is cute too.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
