import React, { useEffect } from "react";
import "./contact.css";
import { BiMailSend } from "react-icons/bi";
import { FiPhoneCall } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";

import { useRef } from "react";
import emailjs from "@emailjs/browser";

import Aos from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const handleClick2 = () => {
    alert("Thanks you, I'll get back to you soon");
  };
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_afksea8",
        "template_c7chqje",
        form.current,
        "0RwgMGfnVh-mwKq1J"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    e.target.reset();
  };
  return (
    <section id="contact">
      <h5 data-aos="fade-down">Get in Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <BiMailSend className="contact__option-icon" />
            <h4>Email</h4>
            <h5>lahoncs@gmail.com</h5>
            <a href="mailto:lahoncs@gmail.com" target="_blank" rel="noreferrer">
              Send a Mail
            </a>
          </article>
          <article className="contact__option">
            <FiPhoneCall className="contact__option-icon" />
            <h4>Call</h4>
            <h5>Not availble on working hours</h5>
            <a href="tel:+916001098923" target="_blank" rel="noreferrer">
              Dial Now
            </a>
          </article>
          <article className="contact__option">
            <BsWhatsapp className="contact__option-icon" />
            <h4>WhatsApp</h4>
            <h5>Available anytime</h5>
            <a
              href="https://wa.me/+916001098923"
              target="_blank"
              rel="noreferrer"
            >
              Send Message
            </a>
          </article>
        </div>

        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            required
          />
          <input type="email" name="email" placeholder="Your Email" />
          <textarea
            name="message"
            rows="16"
            placeholder="Write Your Message"
            required
          ></textarea>
          <button
            onClick={handleClick2}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
