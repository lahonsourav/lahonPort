import React from "react";
import "./featured.css";
import ART from "../../assets/2018.jpg";
import Tilt from "react-parallax-tilt";

const featured = () => {
  return (
    <section id="featured">
      <h5 data-aos="fade-down">Featuring a </h5>
      <h2>Water Colour Painting</h2>
      <div className="container__portfolio__container">
        <Tilt>
          <div className="art__container">
            <img className="art__img" src={ART} alt="romantic evening art" />
          </div>
        </Tilt>
      </div>
    </section>
  );
};

export default featured;
