import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="permalinks">
        <Link to="/blog/the-design-principles-behind-lahon-in">Colophon</Link>
      </div>
      <div className="footer__copyright">
        <small>&copy; lahon.in 2026</small>
      </div>
    </footer>
  );
};

export default Footer;
