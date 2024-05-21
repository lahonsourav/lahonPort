import React, { useEffect } from "react";
import "./about.css";
import { TfiMicrosoftAlt } from "react-icons/tfi";
import { GiClothes } from "react-icons/gi";
import { RiComputerLine } from "react-icons/ri";

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
         
            <img className="about__me_image" src={PHOTO} alt="AboutImage" />
          
        </div>

        <div className="about__content">
          <div className="about__cards">
            <article data-aos="fade-up" className="about__card">
              <RiComputerLine className="about__icon" />
              <h5>Passionate</h5>
              <small>Web Developer</small>
            </article>

            <a
              href="https://www.assamesedress.shop/"
              data-aos="fade-up-right"
              className="about__card"
            >
              <GiClothes className="about__icon" />
              <h5>Building</h5>
              <small>Assamesedress.shop </small>
            </a>

            <article data-aos="fade-up-left" className="about__card">
              <TfiMicrosoftAlt className="about__icon" />
              <h5>Microsoft</h5>
              <small>summer intern</small>
            </article>
          </div>

          <p className="para">
            I am a Computer Science and Engineering Undergraduate of&nbsp;
            <a href="https://www.nits.ac.in/" target="_blank" rel="noreferrer">
              NIT Silchar.&nbsp;
            </a>
            I am learning full stack Web development and also trying to improve
            my problem solving skill.
            <br />
            <br />I make{" "}
            <a
              href="https://www.youtube.com/watch?v=OTNoeba54eo&ab_channel=WildWoodRecords"
              target="_blank"
              rel="noreferrer"
            >
              &nbsp;music,&nbsp;
            </a>
            <div class="muzieknootjes">
              <div class="noot-1">&#9835; &#9833;</div>
              <div class="noot-2">&#9833;</div>
              <div class="noot-3">&#9839; &#9834;</div>
              <div class="noot-4">&#9834;</div>
            </div>{" "}
            I love thinking about the Universe and Space, The huge stars, the
            gas giant Jupiter.
            <br />
            <br />I love
            <a
              href="https://lahonsourav.github.io/doggies/#/"
              target="_blank"
              rel="noreferrer"
            >
              &nbsp;Dogs&nbsp;
            </a>
            and cats, but frogs are cute too.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
