import React, { useEffect, useState } from "react";
import "./contact.css";
import { BiMailSend } from "react-icons/bi";
import { FiPhoneCall } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";

import { useRef } from "react";
import emailjs from "@emailjs/browser";

import Aos from "aos";
import "aos/dist/aos.css";
import ReactAlert from "../../additionals/customAlerts/CustomAlert";

const Contact = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const form = useRef();

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);

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
          setAlertMessage("Got your Message, You're such a beautiful human");
          setAlertType("success");
          setShowAlert(true);
        },
        (error) => {
          setAlertMessage("Oho, The message couldn't be sent, I'll fix it");
          setAlertType("error");
          setShowAlert(true);
        }
      );
    e.target.reset();
  };
  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <section id="contact">
      {showAlert && (
        <ReactAlert
          message={alertMessage}
          onClose={closeAlert}
          type={alertType}
        />
      )}
      <h5 data-aos="fade-down">Get in Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <BiMailSend className="contact__option-icon" />
            <h4>Email</h4>
            <h5>sourav@lahon.in</h5>
            <a href="mailto:sourav@lahon.in" target="_blank" rel="noreferrer">
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

        <form ref={form} className="contact__form" onSubmit={sendEmail}>
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            className="form-control-input"
            required
          />
          <input type="email" name="email" placeholder="Your Email" className="form-control-input" />
          <textarea
            name="message"
            rows="16"
            placeholder="Write Your Message"
            className="form-control-text"
            required
          ></textarea>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
