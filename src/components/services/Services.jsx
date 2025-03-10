import React, { useEffect } from "react";
import "./services.css";
import { BsCheck2 } from "react-icons/bs";
import Aos from "aos";
import "aos/dist/aos.css";
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
                    Good communication skills, good at making friends, Team work
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
              <h3>Extra Curricular</h3>
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
                  <p>Hosted and managed Events in different Institutes.</p>
                </li>
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>Taught frontend web development to many Juniors.</p>
                </li>

                <li>
                  <BsCheck2 className="service__list-icon" />

                  <p>
                    Produced background music for{" "}
                    <span>
                      <a
                        className="service__list-link"
                        href="https://www.facebook.com/tecnoesis.nits/"
                        target="_blank" rel="noreferrer"
                      >
                        Tecnoesis 2022{" "}
                      </a>
                    </span>
                    event teasers.
                  </p>
                </li>
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    <span>
                      <a
                        className="service__list-link"
                        href="https://www.facebook.com/113369497254908/posts/406268871298301/?mibextid=98BtzZNkros8nYVe"
                        target="_blank" rel="noreferrer"
                      >
                        Painting
                      </a>
                    </span>{" "}
                    got featured in National Art Exhibition organised by ONGC.
                  </p>
                </li>

                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>
                    Released{" "}
                    <span>
                      <a
                        className="service__list-link"
                        href="https://www.youtube.com/@LAHON"
                        target="_blank" rel="noreferrer"
                      >
                        Music Videos{" "}
                      </a>
                    </span>
                    and performed in many live shows.
                  </p>
                </li>
                <li>
                  <BsCheck2 className="service__list-icon" />
                  <p>Head of Music Club, Symphonits, NIT Silchar</p>
                </li>
              </ul>
            </Tilt>
          </article>
        </Tilt>
      </div>
    </section>
  );
};

export default Services;
