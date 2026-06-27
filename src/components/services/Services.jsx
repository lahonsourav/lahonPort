import React, { useEffect } from "react";
import "./services.css";
import Aos from "aos";
import "aos/dist/aos.css";
import Tilt from "react-parallax-tilt";

const Services = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section id="services">
      <h5 data-aos="fade-down">get to know me</h5>
      <h2>At A Glance</h2>
      <div className="container services__container">

        <Tilt>
          <article className="service">
            <div className="service__head">
              <h3>Academic Trail</h3>
            </div>
            <ul
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="1500"
              className="service__list"
            >
              <li><span className="svc-emoji">🏫</span><p>Class I–V · Jatiya Vidyalaya, Gogamukh, Dhemaji</p></li>
              <li><span className="svc-emoji">📚</span><p>Class VI–VIII · Jawahar Navodaya Vidyalaya, Dhemaji</p></li>
              <li><span className="svc-emoji">🎓</span><p>Matriculation · Kendriya Vidyalaya Gerukamukh, Dhemaji</p></li>
              <li><span className="svc-emoji">🏆</span><p>Higher Secondary · Brilliant Academy, North Lakhimpur</p></li>
              <li><span className="svc-emoji">⚙️</span><p>B.Tech CSE · National Institute of Technology, Silchar (2021 – 2025)</p></li>
            </ul>
          </article>
        </Tilt>

        <Tilt>
          <article className="service">
            <div className="service__head">
              <h3>Beyond The Terminal</h3>
            </div>
            <ul
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="1500"
              className="service__list"
            >
              <li><span className="svc-emoji">🚀</span><p>Space nerd — black holes, time travel, parallel universes, Fermi paradox</p></li>
              <li><span className="svc-emoji">🎬</span><p>Sci-Fi, thriller & horror movie buff</p></li>
              <li><span className="svc-emoji">🐾</span><p>Dog person. Also cats. And frogs — surprisingly</p></li>
              <li><span className="svc-emoji">🗣</span><p>Multilingual — Assamese, Hindi, English + a few programming languages</p></li>
              <li><span className="svc-emoji">🎨</span><p>Photoshop & Canva — creative design & photo editing</p></li>
              <li><span className="svc-emoji">🧠</span><p>Creative thinker with an artistic mindset & a love for problem-solving</p></li>
              <li><span className="svc-emoji">🤝</span><p>Leader, event host, natural team player</p></li>
            </ul>
          </article>
        </Tilt>

        <Tilt>
          <article className="service">
            <div className="service__head">
              <h3>Highlights</h3>
            </div>
            <ul
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="1500"
              className="service__list"
            >
              <li><span className="svc-emoji">🎤</span><p>Hosted & managed events across multiple institutes</p></li>
              <li><span className="svc-emoji">💻</span><p>Mentored people in various tech domains — web, mobile & beyond</p></li>
              <li><span className="svc-emoji">🎧</span><p>Produced background music for Tecnoesis 2022 event teasers</p></li>
              <li><span className="svc-emoji">🖼</span><p>Painting featured in National Art Exhibition organised by ONGC</p></li>
              <li><span className="svc-emoji">🎵</span><p>Released music videos & performed in live shows</p></li>
              <li><span className="svc-emoji">🎸</span><p>Head of Symphonits, Music Club — NIT Silchar</p></li>
            </ul>
          </article>
        </Tilt>

      </div>
    </section>
  );
};

export default Services;
