import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div id="background-wrap">
        <div class="bubble x1">
          <h1>H</h1>
        </div>
        <div class="bubble x2">
          <h1>Xe</h1>
        </div>
        <div class="bubble x3">
          <h1>
            N<sub>2</sub>
          </h1>
        </div>
        <div class="bubble x4">
          <h1>Cl</h1>
        </div>
        <div class="bubble x5">
          <h1>He</h1>
        </div>
        <div class="bubble x6">
          <h1>
            H<sub>2</sub>O
          </h1>
        </div>
        <div class="bubble x7">
          <h1>Ar</h1>
        </div>
        <div class="bubble x8">
          <h1>Kr</h1>
        </div>
        <div class="bubble x9">
          <h1>
            O<sub>2</sub>
          </h1>
        </div>
        <div class="bubble x10">
          <h1>Ne</h1>
        </div>
      </div>
      <strong className="footer__logo">THANKS FOR VISITING</strong>

      <ul className="permalinks">
        <li>
          <a href="#">Back to Top</a>
        </li>
        <li>
          <a href="#about">About me</a>
        </li>
        <li>
          {" "}
          <a href="#experience">Skills</a>
        </li>
        <li>
          {" "}
          <a href="#services">Bio Data</a>
        </li>
        <li>
          {" "}
          <a href="#portfolio">Projects & Songs</a>
        </li>
        <li>
          {" "}
          <a href="#testimonials">Read School Tales</a>
        </li>
        <li>
          {" "}
          <a href="#contact">Contact Me</a>
        </li>
      </ul>

      <div className="footer__copyright">
        <div className="footer__copyright__youtube">
          <small>
            <a
              href="https://github.com/lahonsourav/lahonPort"
              target="_blank"
              rel="noreferrer"
            >
              srcCode &nbsp;
            </a>
            |
            <a
              href="https://github.com/lahonsourav/lahonPort?tab=readme-ov-file#readme"
              target="_blank"
              rel="noreferrer"
            >
              &nbsp; Credits
            </a>
          </small>
          <small>&copy;&nbsp; www.lahon.in 2023</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
