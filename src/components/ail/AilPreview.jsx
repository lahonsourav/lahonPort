import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import "./ail.css";

// Opens a WhatsApp chat with Ail, prefilled with "/hi" to start the bot.
const AIL_WHATSAPP_URL = "https://wa.me/916001098923?text=%2Fhi";

const AIL_LINKS = [
  { name: "A letter", host: "ailighthouse.in" },
  { name: "Ail Chat", host: "chat.ailighthouse.in" },
  { name: "Ail Files", host: "files.ailighthouse.in" },
  { name: "Ail JobApply", host: "jobapply.ailighthouse.in" },
  { name: "Ail Business", host: "business.ailighthouse.in" },
];

const AilPreview = () => {
  return (
    <section id="ail-preview">
      <h5 data-aos="fade-down">Building</h5>

      <h2 data-aos="fade-down" data-aos-delay="100">AI Lighthouse (Ail)</h2>

      <p data-aos="fade-up" className="ail_tagline">
        Pay per task. Do 1 hour of work in 1 minute.
      </p>

      <ul data-aos="fade-up" className="ail_links">
        {AIL_LINKS.map(({ name, host }) => (
          <li key={host}>
            <a
              className="ail_link"
              href={`https://${host}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="ail_link_name">{name}</span>
              <span className="ail_link_host">
                {host} <span className="ail_arrow">→</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p className="ail_whatsapp_row">
        <a
          className="ail_whatsapp_btn"
          href={AIL_WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp aria-hidden="true" />
          Ail WhatsApp
        </a>
      </p>

      <p style={{ textAlign: "center", marginTop: "0.85rem" }}>
        <Link to="/blog/building-ail" className="ail_preview_secondary">
          Read the story behind it →
        </Link>
      </p>
    </section>
  );
};

export default AilPreview;
