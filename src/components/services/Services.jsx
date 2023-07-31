import React, { useEffect } from "react";
import "./services.css";
import { BsCheck2 } from "react-icons/bs";
import Aos from "aos";
import "aos/dist/aos.css";
import Education from "../education/Education";
import Tilt from "react-parallax-tilt";

const Services = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section id="services">
      <h5 data-aos="fade-down">Know more</h5>
      <h2>Bio Data</h2>
      <div className="container services__container">
        <Tilt>
          <article className="service">
            <div className="service__head">
              <h3>Education</h3>
            </div>

            <Tilt>
              <ul
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration="1500"
                className="service__list"
              >
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>Standard I to V : Jatiya Vidyalaya Gogamukh, Dhemaji</p>
                </li>
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Standard VI to VIII : Jawahar Navodaya Vidyalaya, Dhemaji
                  </p>
                </li>
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>Matriculation : Kendriya Vidyalaya Gerukamukh, Dhemaji</p>
                </li>
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>Higher Secondary : Brilliant Academy, North Lakhimpur</p>
                </li>
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Took coaching classes in : Infinity Education, Lakhimpur
                  </p>
                </li>
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    B.Tech : National Institute of Technology, Silchar
                    (pursuing)
                  </p>
                </li>
              </ul>
            </Tilt>
          </article>
        </Tilt>

        <Tilt>
          <article className="service">
            <div className="service__head">
              <h3>What else I posses</h3>
            </div>

            <Tilt>
              <ul
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration="1500"
                className="service__list"
              >
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>Leadership Skill, Event management, Event Hosting</p>
                </li>
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Languages : English, Hindi, Assamese and programming
                    languages
                  </p>
                </li>
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Creative thinking, creative design, artistic mindset,
                    problem solving
                  </p>
                </li>
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Introvert with less communication skills, good at making
                    friends
                  </p>
                </li>
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Interested in Sci-Fi, Horror, Crime-suspense, thriller
                    movies
                  </p>
                </li>
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Interested in Space, black hole, time travel, parrallel
                    Universe
                  </p>
                </li>
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Photo editing and desiging ability in Photoshop and Canva
                  </p>
                </li>
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>Love animals, cats, dogs and watching cartoons</p>
                </li>
              </ul>
            </Tilt>
          </article>
        </Tilt>

        <Tilt>
          <article className="service">
            <div className="service__head">
              <h3>Experiences</h3>
            </div>

            <Tilt>
              <ul
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration="1500"
                className="service__list"
              >
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>Hosted a Freshers Event in Brilliant Academy, Lakhimpur</p>
                </li>
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Produced Beats, Mixed Mastered audio for Clients, short
                    films
                  </p>
                </li>
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>Produced background music for event teasers, </p>
                  <a
                    className="service__list-link"
                    href="https://www.facebook.com/tecnoesis.nits/"
                  >
                    Tecnoesis 2022
                  </a>
                </li>
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Painting got featured in National Art Exhibition organised
                    by ONGC
                  </p>
                </li>
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>Performed in many live shows as an Hip-Hop artist</p>
                </li>
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>Moderator of Music Club, Symphonits, NIT Silchar</p>
                </li>
              </ul>
            </Tilt>
          </article>
        </Tilt>
      </div>

      <h5 className="space" data-aos="fade-down">
        Glance of
      </h5>
      <h2 className="space-two">Education Journey</h2>

      <Education />
    </section>
  );
};

export default Services;
