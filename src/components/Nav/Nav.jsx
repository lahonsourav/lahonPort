import React from "react";
import "./nav.css";
import { BsBriefcaseFill } from "react-icons/bs";
import { MdOutlineContactPhone } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { FaCode } from "react-icons/fa";

import { Link } from "react-scroll";
import { playClick } from "../../lib/sound";

const Nav = () => {
  return (
    <nav>
      <Link
        activeClass="active"
        to="experience"
        spy={true}
        smooth={true}
        offset={-40}
        duration={600}
        onClick={playClick}
      >
        <BsBriefcaseFill />
      </Link>

      <Link
        activeClass="active"
        to="portfolio"
        spy={true}
        smooth={true}
        offset={-40}
        duration={600}
        onClick={playClick}
      >
        <FaCode />
      </Link>

      <Link
        activeClass="active"
        to="skills"
        spy={true}
        smooth={true}
        offset={-40}
        duration={600}
        onClick={playClick}
      >
        <GiSkills />
      </Link>

      <Link
        activeClass="active"
        to="contact"
        spy={true}
        smooth={true}
        offset={-40}
        duration={600}
        onClick={playClick}
      >
        <MdOutlineContactPhone />
      </Link>
    </nav>
  );
};

export default Nav;
