import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";

import { GrFacebook } from "react-icons/gr";

import "./social.css";

const HeaderSocials = () => {
  return (
    <>
      <div className="connect">
        <div className="header__socials">
          <a
            href="https://www.linkedin.com/in/lahoncs/"
            target="_blank"
            rel="noreferrer"
          >
            <BsLinkedin />
          </a>

          <a
            href="https://github.com/lahonsourav"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/la_h_on/"
            target="_blank"
            rel="noreferrer"
          >
            <BsInstagram />
          </a>
          <a
            href="https://www.youtube.com/c/LAHON"
            target="_blank"
            rel="noreferrer"
          >
            <BsYoutube />
          </a>
          <a
            href="https://www.facebook.com/frustratedcollegian.lahon/"
            target="_blank"
            rel="noreferrer"
          >
            <GrFacebook />
          </a>
        </div>
      </div>
    </>
  );
};

export default HeaderSocials;
