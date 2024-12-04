import React, { useRef } from "react";
import "./askme.css";
import emailjs from "@emailjs/browser";

const AskmeHelper = () => {
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
          alert("Thank you, I'll get back to you ASAP");
        },
        (error) => {
          alert("Oho, Some error occurred, Please try again");
        }
      );

    e.target.reset(); // Reset the form after submission
  };

  return (
    <div className="askme_container">
      <div className="askme_form_container">
        <h2>Ask Me Anything</h2>
        <form ref={form} onSubmit={sendEmail} className="askme_form">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name (leave if you don't want to disclose)"
            className="askme-control-input"
          />
          
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Do you want me to display this message publicly?"
            className="askme-control-input"
          />
          
        
          <textarea
            id="message"
            name="message"
            rows="10"
            placeholder="Write Your Message"
            className="askme-control-text"
            required
          ></textarea>

          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskmeHelper;
