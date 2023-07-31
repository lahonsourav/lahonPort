import React, { useEffect } from "react";
import "./Portfolio.css";

import IMG1 from "../../images/adhorua.jpg";
import IMG2 from "../../images/boijaa.jpg";
import IMG3 from "../../images/prapti.jpg";
import IMG4 from "../../images/proloy.jpg";
import IMG5 from "../../images/paap.jpg";
import IMG6 from "../../images/maa.jpg";

import Aos from "aos";
import "aos/dist/aos.css";
import Tilt from "react-parallax-tilt";

const Songs = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section id="songs">
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
            <small>
              A semi classical and hip-hop fusioned love song starring Punam
              (ft. Mayukh & Ripon)
            </small>
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

export default Songs;
