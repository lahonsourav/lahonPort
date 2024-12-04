import React from "react";
import "./ReactAlert.css";
const ReactAlert = ({ message, onClose, type }) => {
    return (
        <div className="alert_container">
            <div className={`react-alert ${type}`} >
                <p className="alertmessage">{message}</p>
                <button onClick={onClose} className="alertbtn">
                    OK
                </button>
            </div>

        </div>
    );
};

export default ReactAlert;
