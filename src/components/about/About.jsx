import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./about.css";
import { TfiMicrosoftAlt } from "react-icons/tfi";
import { GiClothes } from "react-icons/gi";
import { RiComputerLine } from "react-icons/ri";

import PHOTO from "../../assets/mejpg.jpg";

import Aos from "aos";
import "aos/dist/aos.css";
const About = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (


    <section id="about">

      <h5 data-aos="fade-down">greetings visitor</h5>

      <h2>About me</h2>

      <div className="container about__container">
        <div data-aos="zoom-in" className="about__me__wrapper">
          <div className="about__me">
            <img className="about__me_image" src={PHOTO} alt="AboutImage" />
          </div>
          <p className="about__me__caption">// debugging life, one commit at a time</p>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <article data-aos="fade-up" className="about__card">
              <RiComputerLine className="about__icon" />
              <h5>SWE</h5>
              <small>BlackRock, Gurgaon</small>
            </article>

            <a
              href="https://gamusatogether.onrender.com" target="_blank" rel="noreferrer"
              data-aos="fade-up-right"
              className="about__card"
            >
              <GiClothes className="about__icon" />
              <h5>Building</h5>
              <small>Assamesedress.shop</small>
            </a>

            <article data-aos="fade-up-left" className="about__card">
              <TfiMicrosoftAlt className="about__icon" />
              <h5>Microsoft</h5>
              <small>SWE intern</small>
            </article>
          </div>

          <div className="para">
            <p>I am a Computer Science and Engineering Graduate of <a href="https://www.nits.ac.in/" target="_blank" rel="noreferrer">NIT Silchar</a>. Software Engineer at BlackRock — building data pipelines in C#, .NET &amp; Kafka, and automation tools in Python &amp; SQL. Ex Microsoft SWE intern. Full stack (MERN, NestJS), React Native, and ML.</p>

            <p>I make <Link to="/creative">music</Link><span className="muzieknootjes" style={{ display: "inline-block", marginLeft: "4px", verticalAlign: "middle" }}><span className="noot-1">&#9835; &#9833;</span><span className="noot-2">&#9833;</span><span className="noot-3">&#9839; &#9834;</span><span className="noot-4">&#9834;</span></span>, I love thinking about the Universe and Space, the huge stars, the gas giant Jupiter.</p>

            <p>I love <a href="https://lahonsourav.github.io/doggies/#/" target="_blank" rel="noreferrer">Dogs</a> and cats, but frogs are cute too.</p>
          </div>
        </div>
      </div>


    </section>
  );
};

export default About;
