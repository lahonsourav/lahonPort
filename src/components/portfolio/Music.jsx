import React, { useEffect, useState } from "react";
import "./Portfolio.css";
import Pt from './Partnership.pdf'

import PRO2 from "../../images/boijaa.jpg";
import PRO3 from "../../images/infinity.jpg";
import PRO4 from "../../images/adhorua.jpg";
import PRO5 from "../../images/pc.png";
import PRO6 from "../../images/gamusawhitelow.jpg";

import Aos from "aos";
import "aos/dist/aos.css";
import Tilt from "react-parallax-tilt";

const Music = () => {
    let time = new Date().toLocaleTimeString();
    const [currentTime, setCurrentTime] = useState(time);

    const updateTime = () => {
        let time = new Date().toLocaleTimeString();
        setCurrentTime(time);
    };

    setInterval(updateTime, 1000);

    useEffect(() => {
        Aos.init({ duration: 2000 }); <nav></nav>
    }, []);
    return (
        <section id="portfolio">
            <h5 data-aos="fade-down">Sometimes...</h5>

            <h2>I make Music</h2>

            <div className="container portfolio__container">


                <Tilt>
                    <article data-aos="zoom-in-up" className="portfolio__items">
                        <div className="portfolio__item-image">
                            <img src={PRO4} alt="" />
                        </div>
                        <h3>Adhorua Xopun (Assamese)</h3>
                        <small>
                            It's a story about the insecurities we face while dreaming big, losing hope but still pushing forward. We lose friends, miss our childhood, yet never look back.
                        </small>
                        <div className="portfolio__item-cta">
                            <a
                                href="https://youtu.be/OTNoeba54eo?si=f0UPoD8-KXVGrcyZ"
                                className="btn btn-primary"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Youtube
                            </a>

                        </div>
                    </article>
                </Tilt>


                <Tilt>
                    <article data-aos="zoom-in-up" className="portfolio__items">
                        <div className="portfolio__item-image">
                            <img src={PRO2} alt="" />
                        </div>
                        <h3>Boi Jaa (Assamese)</h3>
                        <small>
                            This love song, written and composed by me, holds a special place in my heart. It reflects my deepest emotions and is a true expression of my feelings.
                        </small>
                        <div className="portfolio__item-cta">
                            <a
                                href="https://youtu.be/SEE6_nwq43E?si=plljPf77qVS_RrSQ"
                                className="btn btn-primary"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Youtube
                            </a>

                            <a
                                href="https://open.spotify.com/track/62iWw8RvtUt99LrT2XRPAF?si=7f19cd4cd6904d35"
                                className="btn btn-primary"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Spotify
                            </a>

                        </div>
                    </article>
                </Tilt>




            </div>
        </section>
    );
};

export default Music;
