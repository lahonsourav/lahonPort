import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import "./ail.css";
import ailLogo from "../../images/ail/ail-logo-circle.png";

// Opens a WhatsApp chat with Ail, prefilled with "/hi" to start the bot.
const AIL_WHATSAPP_URL = "https://wa.me/916001098923?text=%2Fhi";

const AIL_LINKS = [
  { name: "A letter", label: "ailighthouse.in", href: "https://ailighthouse.in" },
  { name: "Ail Chat", label: "chat.ailighthouse.in", href: "https://chat.ailighthouse.in" },
  { name: "Ail Files", label: "files.ailighthouse.in", href: "https://files.ailighthouse.in" },
  { name: "Ail JobApply", label: "jobapply.ailighthouse.in", href: "https://jobapply.ailighthouse.in" },
  { name: "Ail Business", label: "business.ailighthouse.in", href: "https://business.ailighthouse.in" },
  { name: "Ail Collective", label: "app.ailighthouse.in", href: "https://app.ailighthouse.in" },
  { name: "Ail WhatsApp", label: "Chat on WhatsApp", href: AIL_WHATSAPP_URL, whatsapp: true },
];

const AilPreview = () => {
  return (
    <section id="ail-preview">
      <img data-aos="fade-down" src={ailLogo} alt="Ail" className="ail_logo" />

      <h5 data-aos="fade-down">Building</h5>

      <h2 data-aos="fade-down" data-aos-delay="100">AI Lighthouse (Ail)</h2>

      <p data-aos="fade-up" className="ail_tagline">
        Pay per task. Do 1 hour of work in 1 minute.
      </p>

      <ul data-aos="fade-up" className="ail_links">
        {AIL_LINKS.map(({ name, label, href, whatsapp }) => (
          <li key={href}>
            <a className="ail_link" href={href} target="_blank" rel="noreferrer">
              <span className="ail_link_name">
                {whatsapp && <FaWhatsapp className="ail_link_icon" aria-hidden="true" />}
                {name}
              </span>
              <span className="ail_link_host">
                {label} <span className="ail_arrow">→</span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <p style={{ textAlign: "center", marginTop: "0.85rem" }}>
        <Link to="/blog/building-ail" className="ail_preview_secondary">
          Read the story behind it →
        </Link>
      </p>
    </section>
  );
};

export default AilPreview;
