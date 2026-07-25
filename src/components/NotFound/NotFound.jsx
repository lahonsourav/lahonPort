import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="nf_page">
      <p className="nf_code">404</p>
      <h1 className="nf_title">Lost in the wormhole</h1>
      <p className="nf_text">
        This page doesn't exist — or it moved and I forgot to update the link.
      </p>
      <button className="btn btn-primary nf_home" onClick={() => navigate("/")}>
        Back to home
      </button>
    </div>
  );
};

export default NotFound;
