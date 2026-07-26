import React, { useState, useRef } from "react";
import "./contact.css";
import { BiMailSend } from "react-icons/bi";
import { FiPhoneCall } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import emailjs from "@emailjs/browser";

import ReactAlert from "../../additionals/customAlerts/CustomAlert";
import BusinessCard from "../businessCard/BusinessCard";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const form = useRef();

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    const next = {};
    if (!data.get("name")?.trim()) next.name = "Please enter your name.";
    const email = data.get("email")?.trim();
    if (email && !EMAIL_RE.test(email)) next.email = "Please enter a valid email address.";
    if (!data.get("message")?.trim()) next.message = "Please write a message.";
    return next;
  };

  const clearError = (field) =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));

  const sendEmail = (e) => {
    e.preventDefault();

    const data = new FormData(form.current);
    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    emailjs
      .sendForm(
        "service_afksea8",
        "template_c7chqje",
        form.current,
        "0RwgMGfnVh-mwKq1J"
      )
      .then(
        (_result) => {
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

      <div className="contact__card-wrap" data-aos="zoom-in">
        <BusinessCard />
      </div>

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

        <form ref={form} className="contact__form" onSubmit={sendEmail} noValidate>
          <div className="form-field">
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              className={`form-control-input${errors.name ? " form-control--error" : ""}`}
              aria-invalid={!!errors.name}
              onChange={() => clearError("name")}
            />
            {errors.name && <p className="form-field-error">{errors.name}</p>}
          </div>

          <div className="form-field">
            <input
              type="email"
              name="email"
              placeholder="Your Email (optional)"
              className={`form-control-input${errors.email ? " form-control--error" : ""}`}
              aria-invalid={!!errors.email}
              onChange={() => clearError("email")}
            />
            {errors.email && <p className="form-field-error">{errors.email}</p>}
          </div>

          <div className="form-field">
            <textarea
              name="message"
              rows="16"
              placeholder="Write Your Message"
              className={`form-control-text${errors.message ? " form-control--error" : ""}`}
              aria-invalid={!!errors.message}
              onChange={() => clearError("message")}
            ></textarea>
            {errors.message && <p className="form-field-error">{errors.message}</p>}
          </div>

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
