import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <strong className="footer__logo">THANKS FOR VISITING</strong>

      <ul className="permalinks">
        <li><a href="#header">Top</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#portfolio">Projects</a></li>
        <li><a href="#experience">Skills</a></li>
        <li><a href="#bio">Bio</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="footer__copyright">
        <small>
          <a href="https://github.com/lahonsourav/lahonPort" target="_blank" rel="noreferrer">Source</a>
          {" · "}
          <a href="https://github.com/lahonsourav/lahonPort?tab=readme-ov-file#readme" target="_blank" rel="noreferrer">Credits</a>
        </small>
        <small>&copy; lahon.in 2026</small>
      </div>
    </footer>
  );
};

export default Footer;
