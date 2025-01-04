import React, { useEffect, useState } from "react";
import "./Portfolio.css";
import Pt from './Partnership.pdf'

import PRO2 from "../../images/logojpg.jpg";
import PRO3 from "../../images/infinity.jpg";
import PRO4 from "../../images/doggo.jpg";
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
                        <h3>Doggies</h3>
                        <small>
                            Simple but beautiful UI, swipe left/right to find your favourite
                            Dog. Swipe now to find dogs. (flutter, android)
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
                </Tilt>





            </div>
        </section>
    );
};

export default Music;
