import React from "react";
import "./contact.css";
import BusinessCard from "../businessCard/BusinessCard";

const Contact = () => {
  return (
    <section id="contact">
      <h5 data-aos="fade-down">Get in Touch</h5>
      <h2>Contact Me</h2>

      <div className="contact__card-wrap" data-aos="zoom-in">
        <BusinessCard />
      </div>
    </section>
  );
};

export default Contact;
