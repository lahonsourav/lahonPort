import React from "react";
import "./nav.css";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { MdOutlineContactPhone } from "react-icons/md";
import { GiSkills } from "react-icons/gi";
import { FaCode } from "react-icons/fa";

import { Link } from "react-scroll";

const Nav = () => {
  return (
    <nav>
      <Link
        activeClass="active"
        to="about"
        spy={true}
        smooth={true}
        offset={100}
        duration={20}
      >
        <AiOutlineUser />
      </Link>

      <Link
        activeClass="active"
        to="experience"
        spy={true}
        smooth={true}
        offset={-40}
        duration={20}
      >
        <GiSkills />
      </Link>

      <Link
        activeClass="active"
        to="portfolio"
        spy={true}
        smooth={true}
        offset={-40}
        duration={20}
      >
        <FaCode />
      </Link>

      <Link
        activeClass="active"
        to="services"
        spy={true}
        smooth={true}
        offset={-40}
        duration={20}
      >
        <BsFillJournalBookmarkFill />
      </Link>

      <Link
        activeClass="active"
        to="contact"
        spy={true}
        smooth={true}
        offset={-40}
        duration={20}
      >
        <MdOutlineContactPhone />
      </Link>
    </nav>
  );
};

export default Nav;
