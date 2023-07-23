import React, { useEffect } from "react";
import "./Portfolio.css";

import IMG1 from "../../images/adhorua.jpg";
import IMG2 from "../../images/boijaa.jpg";
import IMG3 from "../../images/prapti.jpg";
import IMG4 from "../../images/proloy.jpg";
import IMG5 from "../../images/paap.jpg";
import IMG6 from "../../images/maa.jpg";

import PRO1 from "../../images/moksha.png";
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

      <h5 data-aos="fade-down">Some of my</h5>
      <h2>Projects</h2>
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
                Sneak peek
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
                // href="https://drive.google.com/file/d/1uCxXe7biCmFA_i6s9p7n2Y-S4xVwL_Hx/view?usp=drivesdk"
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
                <img src={PRO2} alt="" />
              </div>
            </Tilt>
            <h3>Mujhe Books Do</h3>
            <small>
              You have old books? Gimme to me, ofc for money, a book never lost
              it's legacy. (react & firebase)
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
                <img src={PRO7} alt="" />
              </div>
            </Tilt>
            <h3>25 Hour clock</h3>
            <small>
              A simple clock, but this has 25 hours in a day, using python and
              tkinter module. (Python- Tkinter)
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

      {/* part1 */}
      <h5 data-aos="fade-down">Listen to</h5>
      <h2>My Raps - Assamese</h2>
      <div class="muzieknootjes">
        <div class="noot-1">&#9835; &#9833;</div>
        <div class="noot-2">&#9833;</div>
        <div class="noot-3">&#9839; &#9834;</div>
        <div class="noot-4">&#9834;</div>
      </div>
      <div className="container portfolio__container">
        <Tilt>
          <article data-aos="zoom-in-up" className="portfolio__items">
            <Tilt>
              <div className="portfolio__item-image">
                <img src={IMG1} alt="" />
              </div>
            </Tilt>
            <h3>Adhorua Xopun</h3>
            <small>
              Never looked back, no matter how hard the situation is (ft Pincool
              & Kaustabh)
            </small>
            <div className="portfolio__item-cta">
              <a
                href="https://open.spotify.com/track/6UkRjsmUX1iAZnwBaS4JRA?si=6e2ed055a1d04ad7"
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                Spotify
              </a>
              <a
                href="https://www.youtube.com/watch?v=OTNoeba54eo&ab_channel=WildWoodRecords"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
            </div>
          </article>
        </Tilt>
        <Tilt>
          <article data-aos="zoom-in-up" className="portfolio__items">
            <div class="muzieknootjes">
              <div class="noot-1">&#9835; &#9833;</div>
              <div class="noot-2">&#9833;</div>
              <div class="noot-3">&#9839; &#9834;</div>
              <div class="noot-4">&#9834;</div>
            </div>
            <Tilt>
              <div className="portfolio__item-image">
                <img src={IMG2} alt="" />
              </div>
            </Tilt>
            <h3>Boi Jaa | Music video</h3>
            <small>A love song starring Punam (ft. Mayukh & Ripon)</small>
            <div className="portfolio__item-cta">
              <a
                href="https://open.spotify.com/track/62iWw8RvtUt99LrT2XRPAF?si=eb6df8bd8a484e9c"
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                Spotify
              </a>
              <a
                href="https://www.youtube.com/watch?v=SEE6_nwq43E&ab_channel=LAHON"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
            </div>
          </article>
        </Tilt>

        <Tilt>
          <article data-aos="zoom-in-up" className="portfolio__items">
            <Tilt>
              <div className="portfolio__item-image">
                <img src={IMG3} alt="" />
              </div>
            </Tilt>
            <h3>Prapti | Music video</h3>
            <small>
              It was a good love story, but now it's one sided (ft. Mayukh &
              Kaustabh)
            </small>
            <div className="portfolio__item-cta">
              <a
                href="https://open.spotify.com/track/4JNHpnwbVEmQhAMjtdP1I5?si=1577264cbfae4bb1"
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                Spotify
              </a>
              <a
                href="https://www.youtube.com/watch?v=-Yzg9fJV8mo&ab_channel=LAHON"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
            </div>
          </article>
        </Tilt>

        <Tilt>
          <article data-aos="zoom-in-up" className="portfolio__items">
            <div class="muzieknootjes">
              <div class="noot-1">&#9835; &#9833;</div>
              <div class="noot-2">&#9833;</div>
              <div class="noot-3">&#9839; &#9834;</div>
              <div class="noot-4">&#9834;</div>
            </div>
            <Tilt>
              {" "}
              <div className="portfolio__item-image">
                <img src={IMG4} alt="" />
              </div>
            </Tilt>
            <h3>Proloy 2.0| Music video</h3>
            <small>
              Lyrical Rap speaking the flaws of the Society (ft Nilam & Ripon)
            </small>
            <div className="portfolio__item-cta">
              <a
                href="https://open.spotify.com/track/3n9zmpy1l7iw0fNoXcs3tm?si=2d2059beb00945eb"
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                Spotify
              </a>
              <a
                href="https://www.youtube.com/watch?v=-YwHXkFhe8Q&ab_channel=LAHON"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
            </div>
          </article>
        </Tilt>

        <Tilt>
          <article data-aos="zoom-in-up" className="portfolio__items">
            <Tilt>
              {" "}
              <div className="portfolio__item-image">
                <img src={IMG5} alt="" />
              </div>
            </Tilt>
            <div class="muzieknootjes">
              <div class="noot-1">&#9835; &#9833;</div>
              <div class="noot-2">&#9833;</div>
              <div class="noot-3">&#9839; &#9834;</div>
              <div class="noot-4">&#9834;</div>
            </div>
            <h3>Paap Punyo | Music video</h3>
            <small>
              Story Telling Rap speaking about the truths of life (ft. Nilam)
            </small>
            <div className="portfolio__item-cta">
              <a
                href="https://open.spotify.com/track/065gkRrHJdedzGTWjTjMgc?si=6012245a41674e32"
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                Spotify
              </a>
              <a
                href="https://www.youtube.com/watch?v=bS7xAo-UgsI&ab_channel=LAHON"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
            </div>
          </article>
        </Tilt>

        <Tilt>
          <article data-aos="zoom-in-up" className="portfolio__items">
            <Tilt>
              {" "}
              <div className="portfolio__item-image">
                <img src={IMG6} alt="" />
              </div>
            </Tilt>
            <h3>Maa</h3>
            <small>
              A lyrical rap conveying emotions for his/her Mom - A Tribute
            </small>
            <div className="portfolio__item-cta">
              <a
                href="https://open.spotify.com/track/2KI83nuLq3Etf6yhQmEUzx?si=ea5911d2eaf14524"
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                Spotify
              </a>
              <a
                href="https://www.youtube.com/watch?v=VYTG1Z2eF1A&ab_channel=LAHON"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
            </div>
            <div class="muzieknootjes">
              <div class="noot-1">&#9835; &#9833;</div>
              <div class="noot-2">&#9833;</div>
              <div class="noot-3">&#9839; &#9834;</div>
              <div class="noot-4">&#9834;</div>
            </div>
          </article>
        </Tilt>
      </div>
    </section>
  );
};

export default Portfolio;
