import React from "react";
import "./contact.css";
import BusinessCard from "../businessCard/BusinessCard";
import useReveal from "../reveal/useReveal";

const Contact = () => {
  // This component is reused both embedded in Home (which already calls
  // useReveal for the whole page) and standalone at /contactout, where
  // nothing else observes its [data-aos] elements. Without this, the
  // heading and card stay stuck at opacity:0 forever when this page is
  // reached on its own (e.g. navigating here from another route).
  useReveal();

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
