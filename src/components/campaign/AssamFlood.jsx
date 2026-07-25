import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "../contact/contact.css";
import "./assamFlood.css";

import ReactAlert from "../../additionals/customAlerts/CustomAlert";
import assamFront from "../../images/assam-flood-front.png";
import assamBack from "../../images/assam-flood-back.png";
import donateQr from "../../images/assam-flood-qr-styled.png";

const RAISED = 7824;
const DOUBLED = RAISED * 2;
const CODE_LINE_1 = "raised = 7824";
const CODE_LINE_2 = "matched = raised * 2";

const AssamFlood = () => {
  const navigate = useNavigate();
  const form = useRef();

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [count, setCount] = useState(1);
  const [doubledCount, setDoubledCount] = useState(0);
  const [codePhase, setCodePhase] = useState("raising");
  const [typedLine1, setTypedLine1] = useState("");
  const [typedLine2, setTypedLine2] = useState("");
  const progressRef = useRef(null);

  useEffect(() => {
    let raf;
    const timers = [];
    const ease = (t) => 1 - Math.pow(1 - t, 3);

    const animateCount = (from, to, duration, onUpdate, onDone) => {
      const start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / duration, 1);
        onUpdate(Math.round(from + ease(t) * (to - from)));
        if (t < 1) {
          raf = requestAnimationFrame(step);
        } else {
          onDone?.();
        }
      };
      raf = requestAnimationFrame(step);
    };

    const typeLine = (text, setter, onDone) => {
      let i = 0;
      const tick = () => {
        i++;
        setter(text.slice(0, i));
        if (i < text.length) {
          timers.push(setTimeout(tick, 32));
        } else {
          onDone?.();
        }
      };
      tick();
    };

    const runSequence = () => {
      animateCount(1, RAISED, 1400, setCount, () => {
        timers.push(
          setTimeout(() => {
            setCodePhase("typing");
            typeLine(CODE_LINE_1, setTypedLine1, () => {
              timers.push(
                setTimeout(() => {
                  typeLine(CODE_LINE_2, setTypedLine2, () => {
                    timers.push(
                      setTimeout(() => {
                        setCodePhase("executing");
                        animateCount(0, DOUBLED, 900, setDoubledCount, () =>
                          setCodePhase("done")
                        );
                      }, 400)
                    );
                  });
                }, 250)
              );
            });
          }, 500)
        );
      });
    };

    const node = progressRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runSequence();
            io.disconnect();
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px 0px -100px 0px" }
    );

    // Wait a couple of frames before observing so the initial layout (hero
    // image, fonts) has settled — otherwise the pre-load layout can put this
    // section fully in view for a moment and fire the observer too early.
    let raf2 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => io.observe(node));
    });

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(raf2);
      timers.forEach(clearTimeout);
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_afksea8",
        "template_c7chqje",
        form.current,
        "0RwgMGfnVh-mwKq1J"
      )
      .then(
        () => {
          setAlertMessage("Got it — thank you! I'll get back to you soon.");
          setAlertType("success");
          setShowAlert(true);
        },
        () => {
          setAlertMessage("Hmm, that didn't send. Mind trying again or messaging me directly?");
          setAlertType("error");
          setShowAlert(true);
        }
      );
    e.target.reset();
  };

  const closeAlert = () => setShowAlert(false);

  return (
    <div className="af_container">
      {showAlert && (
        <ReactAlert message={alertMessage} onClose={closeAlert} type={alertType} />
      )}

      <button className="af_back" onClick={() => navigate("/")}>← Back</button>

      <div className="af_hero">
        <span className="af_eyebrow">Assam Floods · Monsoon 2026</span>
        <div className="af_art_card">
          <img src={assamFront} alt="Stand with Assam" className="af_hero_img" width="800" height="800" />
        </div>
        <span className="af_closed_badge">Donations Closed</span>
        <h1 className="af_title">Thank You For Doubling The Impact</h1>
        <p className="af_tagline">When the water rises, we rise together.</p>
        <p className="af_description">
          The campaign is now closed, and I mean it from the bottom of my heart —{" "}
          <strong>thank you</strong> to everyone who sent whatever they could. Every rupee that came
          in before the deadline was matched, out of my own pocket.*
        </p>
        <p className="af_note">* My matching contribution was capped at ₹10,000 total.</p>
      </div>

      <div className="af_section af_progress" ref={progressRef}>
        <div className="af_double_row">
          <div className="af_counter_card">
            <span className="af_counter_value">₹{count.toLocaleString("en-IN")}</span>
            <span className="af_counter_label">total raised</span>
          </div>

          <div className="af_double_terminal">
            <div className="af_double_terminal__bar">
              <span /><span /><span />
            </div>
            <div className="af_double_terminal__body">
              <div>
                <span className="af_term_prompt">$</span>{" "}
                <span className="af_term_cmd">{typedLine1}</span>
                {codePhase === "typing" && typedLine1.length < CODE_LINE_1.length && (
                  <span className="af_term_cursor">▌</span>
                )}
              </div>
              <div>
                {typedLine1.length === CODE_LINE_1.length && (
                  <>
                    <span className="af_term_prompt">$</span>{" "}
                    <span className="af_term_cmd">{typedLine2}</span>
                    {codePhase === "typing" && typedLine2.length < CODE_LINE_2.length && (
                      <span className="af_term_cursor">▌</span>
                    )}
                  </>
                )}
              </div>
              {(codePhase === "executing" || codePhase === "done") && (
                <div className="af_term_result">✓ {DOUBLED.toLocaleString("en-IN")}</div>
              )}
            </div>
          </div>

          <div className="af_counter_card af_counter_card--doubled">
            <span className="af_counter_value">₹{doubledCount.toLocaleString("en-IN")}</span>
            <span className="af_counter_label">doubled total</span>
          </div>
        </div>
      </div>

      <div className="af_section">
        <h2 className="af_section_title">How it worked</h2>
        <div className="af_steps">
          <div className="af_step">
            <span className="af_step_n">1</span>
            <p>Scan the QR and send any amount via UPI.</p>
          </div>
          <div className="af_step">
            <span className="af_step_n">2</span>
            <p>Fill in the form with your name and how much you sent.</p>
          </div>
          <div className="af_step">
            <span className="af_step_n">3</span>
            <p>Every rupee got matched — double the impact, on me.*</p>
          </div>
        </div>
      </div>

      <div className="af_section">
        <h2 className="af_section_title">Donations closed</h2>
        <div className="af_qr_card af_qr_card--closed">
          <div className="af_qr_closed_overlay">Closed</div>
          <img
            src={donateQr}
            alt="UPI QR code — donations closed"
            className="af_qr_img af_qr_img--blurred"
          />
          <p className="af_qr_upi af_qr_upi--blurred">UPI ID: <span>frustratedcollegian@oksbi</span></p>
          <p className="af_qr_hint">This campaign is no longer accepting donations. Thank you for your support!</p>
        </div>
      </div>

      <div className="af_section">
        <h2 className="af_section_title">Get in touch</h2>
        <form ref={form} className="af_form contact__form" onSubmit={sendMessage}>
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            className="form-control-input"
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Your Contact (phone or email)"
            className="form-control-input"
            required
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Your message"
            className="form-control-text"
            required
          ></textarea>
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </form>
        <p className="af_form_note">
          Missed the window or have a question about your donation? Reach out here.
        </p>
      </div>

      <div className="af_section">
        <h2 className="af_section_title">Donor list</h2>
        <p className="af_note">
          The full donor list — names, amounts, doubled totals — will be published here shortly.
        </p>
      </div>

      <div className="af_section af_print">
        <h2 className="af_section_title">Stand With Assam</h2>
        <div className="af_art_card af_art_card--wide">
          <img src={assamBack} alt="Stand with Assam — full print design" className="af_print_img" />
        </div>
      </div>
    </div>
  );
};

export default AssamFlood;
