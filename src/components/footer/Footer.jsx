import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer>

      <strong className="footer__logo">THANKS FOR VISITING</strong>

      <ul className="permalinks">
        <li>
          <a href="#header">Back to Top</a>
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
          <a href="#portfolio">Projects</a>
        </li>

        <li>
          {" "}
          <a href="/askme">Ask me</a>
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
          <small>&copy;&nbsp; www.lahon.in 2025</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
