import React, { useRef, useState } from "react";
import "./askme.css";
import emailjs from "@emailjs/browser";
import ReactAlert from "../customAlerts/CustomAlert";
import { useNavigate } from "react-router-dom";


const AskmeHelper = () => {
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

  const navigate = useNavigate();

  const closeAlert = () => {
    setShowAlert(false);
    navigate("/");
  };

  return (
    <div className="askme_container">




      {showAlert && (
        <ReactAlert
          message={alertMessage}
          onClose={closeAlert}
          type={alertType}
        />
      )}
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
