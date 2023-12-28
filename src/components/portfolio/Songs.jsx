import React, { useEffect } from "react";
import "./Portfolio.css";

import IMG1 from "../../images/adhorua.jpg";
import IMG2 from "../../images/boijaa.jpg";
import IMG3 from "../../assets/2018.jpg";

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
      <h5 data-aos="fade-down">Apart from Academics</h5>
      <h2>Extra Curricular</h2>
      <div class="muzieknootjes">
        <div class="noot-1">&#9835; &#9833;</div>
        <div class="noot-2">&#9833;</div>
        <div class="noot-3">&#9839; &#9834;</div>
        <div class="noot-4">&#9834;</div>
      </div>
      <div className="container portfolio__container">
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
                <img src={IMG1} alt="" />
              </div>
            </Tilt>
            <h3>Adhorua Xopun | Music video</h3>
            <small>
              Never looked back, no matter how hard the situation is (ft Pincool
              & Kaustabh)
            </small>
            <div className="portfolio__item-cta">
              <a
                href="https://www.youtube.com/watch?v=OTNoeba54eo&ab_channel=WildWoodRecords"
                className="btn btn-primary"
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
              <a
                href="https://www.youtube.com/@LAHON"
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                View all
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
            <h3>The Evening (painting)</h3>
            <small>
              Apart from my studies I do painting. Here is a water colour
              painting.
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
      </div>
    </section>
  );
};

export default Songs;
