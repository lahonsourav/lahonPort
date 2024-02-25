import React, { useEffect } from "react";
import "./experience.css";
import { RxDimensions } from "react-icons/rx";
import { AiOutlineHtml5, AiOutlineVideoCameraAdd } from "react-icons/ai";

import { DiJavascript1 } from "react-icons/di";

import { CgCPlusPlus } from "react-icons/cg";

import { FaGuitar, FaPaintBrush, FaReact } from "react-icons/fa";

import { FaCss3Alt } from "react-icons/fa";

import { SiFlutter, SiMicrosoftoffice } from "react-icons/si";

import Aos from "aos";
import "aos/dist/aos.css";
import Tilt from "react-parallax-tilt";
import { GiMusicalNotes } from "react-icons/gi";

const Experience = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section id="experience">
      <h5 data-aos="fade-down">I am trying to learn and improve</h5>
      <h2>These Skills</h2>

      <div class="snow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1536"
          preserveAspectRatio="xMidYMax slice"
        >
          <g fill="#FFF" fillOpacity=".15" transform="translate(55 42)">
            <g id="snow-bottom-layer">
              <ellipse cx="6" cy="1009.5" rx="6" ry="5.5" />
              <ellipse cx="138" cy="1110.5" rx="6" ry="5.5" />
              <ellipse cx="398" cy="1055.5" rx="6" ry="5.5" />
              <ellipse cx="719" cy="1284.5" rx="6" ry="5.5" />
              <ellipse cx="760" cy="1155.5" rx="6" ry="5.5" />
              <ellipse cx="635" cy="1459.5" rx="6" ry="5.5" />
              <ellipse cx="478" cy="1335.5" rx="6" ry="5.5" />
              <ellipse cx="322" cy="1414.5" rx="6" ry="5.5" />
              <ellipse cx="247" cy="1234.5" rx="6" ry="5.5" />
              <ellipse cx="154" cy="1425.5" rx="6" ry="5.5" />
              <ellipse cx="731" cy="773.5" rx="6" ry="5.5" />
              <ellipse cx="599" cy="874.5" rx="6" ry="5.5" />
              <ellipse cx="339" cy="819.5" rx="6" ry="5.5" />
              <ellipse cx="239" cy="1004.5" rx="6" ry="5.5" />
              <ellipse cx="113" cy="863.5" rx="6" ry="5.5" />
              <ellipse cx="102" cy="1223.5" rx="6" ry="5.5" />
              <ellipse cx="395" cy="1155.5" rx="6" ry="5.5" />
              <ellipse cx="826" cy="943.5" rx="6" ry="5.5" />
              <ellipse cx="626" cy="1054.5" rx="6" ry="5.5" />
              <ellipse cx="887" cy="1366.5" rx="6" ry="5.5" />
              <ellipse cx="6" cy="241.5" rx="6" ry="5.5" />
              <ellipse cx="138" cy="342.5" rx="6" ry="5.5" />
              <ellipse cx="398" cy="287.5" rx="6" ry="5.5" />
              <ellipse cx="719" cy="516.5" rx="6" ry="5.5" />
              <ellipse cx="760" cy="387.5" rx="6" ry="5.5" />
              <ellipse cx="635" cy="691.5" rx="6" ry="5.5" />
              <ellipse cx="478" cy="567.5" rx="6" ry="5.5" />
              <ellipse cx="322" cy="646.5" rx="6" ry="5.5" />
              <ellipse cx="247" cy="466.5" rx="6" ry="5.5" />
              <ellipse cx="154" cy="657.5" rx="6" ry="5.5" />
              <ellipse cx="731" cy="5.5" rx="6" ry="5.5" />
              <ellipse cx="599" cy="106.5" rx="6" ry="5.5" />
              <ellipse cx="339" cy="51.5" rx="6" ry="5.5" />
              <ellipse cx="239" cy="236.5" rx="6" ry="5.5" />
              <ellipse cx="113" cy="95.5" rx="6" ry="5.5" />
              <ellipse cx="102" cy="455.5" rx="6" ry="5.5" />
              <ellipse cx="395" cy="387.5" rx="6" ry="5.5" />
              <ellipse cx="826" cy="175.5" rx="6" ry="5.5" />
              <ellipse cx="626" cy="286.5" rx="6" ry="5.5" />
              <ellipse cx="887" cy="598.5" rx="6" ry="5.5" />
            </g>
          </g>
          <g fill="#FFF" fill-opacity=".3" transform="translate(65 63)">
            <g id="snow-top-layer">
              <circle cx="8" cy="776" r="8" />
              <circle cx="189" cy="925" r="8" />
              <circle cx="548" cy="844" r="8" />
              <circle cx="685" cy="1115" r="8" />
              <circle cx="858" cy="909" r="8" />
              <circle
                cx="874"
                cy="1438"
                r="8"
                transform="rotate(180 874 1438)"
              />
              <circle
                cx="657"
                cy="1256"
                r="8"
                transform="rotate(180 657 1256)"
              />
              <circle
                cx="443"
                cy="1372"
                r="8"
                transform="rotate(180 443 1372)"
              />
              <circle
                cx="339"
                cy="1107"
                r="8"
                transform="rotate(180 339 1107)"
              />
              <circle cx="24" cy="1305" r="8" transform="rotate(180 24 1305)" />
              <circle cx="8" cy="8" r="8" />
              <circle cx="189" cy="157" r="8" />
              <circle cx="548" cy="76" r="8" />
              <circle cx="685" cy="347" r="8" />
              <circle cx="858" cy="141" r="8" />
              <circle cx="874" cy="670" r="8" transform="rotate(180 874 670)" />
              <circle cx="657" cy="488" r="8" transform="rotate(180 657 488)" />
              <circle cx="443" cy="604" r="8" transform="rotate(180 443 604)" />
              <circle cx="339" cy="339" r="8" transform="rotate(180 339 339)" />
              <circle cx="24" cy="537" r="8" transform="rotate(180 24 537)" />
            </g>
          </g>
        </svg>
      </div>

      {/* end */}

      <div className="container experience__container">
        <div data-aos="zoom-in" className="experience__frontend">
          <h3>Programming Skills</h3>
          <div data-aos="fade-right" className="experience__content">
            <Tilt>
              <article className="experience__details">
                <AiOutlineHtml5 className="experience__details-icon" />
                <div>
                  <h4>HTML, CSS</h4>
                  <small className="text-light">Intermediate</small>
                </div>
              </article>
            </Tilt>

            <Tilt>
              <article className="experience__details">
                <DiJavascript1 className="experience__details-icon" />
                <dir>
                  {" "}
                  <h4>Java Script</h4>
                  <small className="text-light">Basic</small>
                </dir>
              </article>
            </Tilt>
            <Tilt>
              <article className="experience__details">
                <CgCPlusPlus className="experience__details-icon" />
                <div>
                  <h4>Python, C, C++</h4>
                  <small className="text-light">Intermediate</small>
                </div>
              </article>
            </Tilt>
            <Tilt>
              <article className="experience__details">
                <FaCss3Alt className="experience__details-icon" />
                <div>
                  <h4>BS-CSS, TW-CSS</h4>
                  <small className="text-light">Intermediate</small>
                </div>
              </article>
            </Tilt>
            <Tilt>
              <article className="experience__details">
                <FaReact className="experience__details-icon" />
                <div>
                  <h4>MERN Stack</h4>
                  <small className="text-light">Intermediate</small>
                </div>
              </article>
            </Tilt>
            <Tilt>
              <article className="experience__details">
                <SiFlutter className="experience__details-icon" />
                <div>
                  <h4>Flutter</h4>
                  <small className="text-light">Intermediate</small>
                </div>
              </article>
            </Tilt>
          </div>
        </div>
        <div data-aos="zoom-in" className="experience backend">
          <div className="experience__frontend">
            <h3>Other Skills</h3>
            <div data-aos="fade-left" className="experience__content">
              <Tilt>
                <article className="experience__details">
                  <GiMusicalNotes className="experience__details-icon" />
                  <div>
                    <h4>Beats Prod</h4>
                    <small className="text-light">FL Studio, Audacity</small>
                  </div>
                </article>
              </Tilt>

              <Tilt>
                <article className="experience__details">
                  <FaPaintBrush className="experience__details-icon" />
                  <div>
                    <h4>Painting</h4>
                    <small className="text-light">Water Colour, Graffiti</small>
                  </div>
                </article>
              </Tilt>
              <Tilt>
                <article className="experience__details">
                  <AiOutlineVideoCameraAdd className="experience__details-icon" />
                  <div>
                    <h4>Video Editing</h4>
                    <small className="text-light">Premier Pro, Filmora</small>
                  </div>
                </article>
              </Tilt>
              <Tilt>
                <article className="experience__details">
                  <SiMicrosoftoffice className="experience__details-icon" />
                  <div>
                    <h4>MS Office</h4>
                    <small className="text-light">
                      Word, Excel, PowerPoint
                    </small>
                  </div>
                </article>
              </Tilt>
              <Tilt>
                <article className="experience__details">
                  <FaGuitar className="experience__details-icon" />
                  <div>
                    <h4>Music, Instrument</h4>
                    <small className="text-light">Hip-Hop, Ukulele</small>
                  </div>
                </article>
              </Tilt>
              <Tilt>
                <article className="experience__details">
                  <RxDimensions className="experience__details-icon" />
                  <div>
                    <h4>Designing</h4>
                    <small className="text-light">Maya 3D, Figma etc</small>
                  </div>
                </article>
              </Tilt>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
