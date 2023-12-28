import React from "react";
import "./solar.css";

const Solar = () => {
  return (
    <div class="clearfix">
      <ul class="solarsystem">
        <li class="sun"></li>
        <li class="mercury">
          <span></span>
        </li>
        <li class="venus">
          <span></span>
        </li>
        <li class="earth">
          <span>
            <span class="moon"></span>
          </span>
        </li>
        <li class="mars">
          <a href="#about">
            <span>about</span>
          </a>
        </li>
        <li class="asteroids_meteorids">
          <span></span>
        </li>
        <li class="jupiter">
          <a href="#services">
            <span>bioData</span>
          </a>
        </li>
        <li class="saturn">
          <a href="#services">
            <span>
              education <span class="ring"></span>
            </span>
          </a>
        </li>
        <li class="uranus">
          <a href="#experience">
            <span>skills</span>
          </a>
        </li>
        <li class="neptune">
          <a href="#portfolio">
            <span>projects</span>
          </a>
        </li>
        <li class="pluto">
          <a href="#contact">
            <span>contact</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Solar;
