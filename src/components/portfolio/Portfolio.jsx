import React, { useEffect } from "react";
import "./Portfolio.css";

import PRO2 from "../../images/logojpg.png";
import PRO3 from "../../images/infinity.jpg";
import PRO4 from "../../images/doggo.png";
import PRO5 from "../../images/pc.png";
import PRO6 from "../../images/gamusawhitelow.png";
import PRO7 from "../../images/clock.png";

import Aos from "aos";
import "aos/dist/aos.css";
import Tilt from "react-parallax-tilt";

const Portfolio = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section id="portfolio">
      {/*partition2*/}

      <h5 data-aos="fade-down">Technical Works</h5>
      <h2>My Projects</h2>
      <div className="container portfolio__container">
        <Tilt>
          <article data-aos="zoom-in-up" className="portfolio__items">
            <Tilt>
              <div className="portfolio__item-image">
                <img src={PRO6} alt="" />
              </div>
            </Tilt>
            <h3>Gamusa Gogamukh</h3>
            <small>
              A fashion E-commerce websites for Assamese Traditional Attire,
              bringing out the tradition (MERN stack)
            </small>
            <div className="portfolio__item-cta">
              <a
                href="https://youtu.be/KGK4eelpi5Y"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                SneakPeek
              </a>
              <a
                href="https://www.gamusagogamukh.in/"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Shop Now
              </a>
            </div>
          </article>
        </Tilt>

        <Tilt>
          <article data-aos="zoom-in-up" className="portfolio__items">
            <Tilt>
              <div className="portfolio__item-image">
                <img src={PRO2} alt="" />
              </div>
            </Tilt>
            <h3>Mujhe Books Do</h3>
            <small>
              You have old books? You can sell those here and buy books from
              here. A book never lost it's legacy. (react & firebase)
            </small>
            <div className="portfolio__item-cta">
              <a
                href="https://mujhebooksdo.netlify.app"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Visit Now
              </a>
            </div>
          </article>
        </Tilt>

        <Tilt>
          <article data-aos="zoom-in-up" className="portfolio__items">
            <Tilt>
              <div className="portfolio__item-image">
                <img src={PRO3} alt="" />
              </div>
            </Tilt>
            <h3>Infinity Education</h3>
            <small>
              A premium coaching institute for one stop solution for Board,
              JEE-mains & Advanced, NEET etc. (ongoing...)
            </small>
            <div className="portfolio__item-cta">
              <a
                href="https://infinityeducation.netlify.app/"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Inspect
              </a>
            </div>
          </article>
        </Tilt>

        <Tilt>
          <article data-aos="zoom-in-up" className="portfolio__items">
            <Tilt>
              <div className="portfolio__item-image">
                <img src={PRO4} alt="" />
              </div>
            </Tilt>
            <h3>Doggies</h3>
            <small>
              Simple but beautiful UI, swipe left/right to find your favourite
              Doggo. Swipe now to find doggos. (flutter, android)
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
                Download
              </a>
            </div>
          </article>
        </Tilt>

        <Tilt>
          <article data-aos="zoom-in-up" className="portfolio__items">
            <Tilt>
              <div className="portfolio__item-image">
                <img src={PRO5} alt="" />
              </div>
            </Tilt>
            <h3>The Computer</h3>
            <small>
              React three.js integration of an existing 3d Model. The model is
              modified in Maya and integrated with three.js module.
            </small>
            <div className="portfolio__item-cta">
              <a
                href="https://pclahon.netlify.app/"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Explore
              </a>
            </div>
          </article>
        </Tilt>

        <Tilt>
          <article data-aos="zoom-in-up" className="portfolio__items">
            <Tilt>
              <div className="portfolio__item-image">
                <img src={PRO7} alt="" />
              </div>
            </Tilt>
            <h3>25 Hour clock</h3>
            <small>
              A simple clock, but this has 25 hours in a day, using python and
              tkinter module. Click watch to watch the integration. (Python-
              Tkinter)
            </small>
            <div className="portfolio__item-cta">
              <a
                href="https://youtu.be/w02_4Ryra8E"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Watch
              </a>

              <a
                href="https://github.com/lahonsourav/25-hours-in-a-day"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                Code
              </a>
            </div>
          </article>
        </Tilt>
      </div>
    </section>
  );
};

export default Portfolio;
