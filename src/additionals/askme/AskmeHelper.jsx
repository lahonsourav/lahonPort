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
          setAlertMessage("Got your message! You're truly an amazing and wonderful soul!");
          setAlertType("success");
          setShowAlert(true);
        },
        (error) => {
          setAlertMessage("Oho, the message couldn't be sent—guess I'm not the best coder after all!");
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
            placeholder="Name (optional)"
            className="askme-control-input"
          />

          <input
            type="text"
            id="bool"
            name="bool"
            placeholder="Display this publicly (Yes/No)?"
            className="askme-control-input"
          />


          <textarea
            id="message"
            name="message"
            rows="12"
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
