import React from "react";
import "./hereiam.css";
import ShareButton from "../share/ShareButton";
import BackHome from "../shared/BackHome";
import PageFooter from "../shared/PageFooter";
import "../shared/PageShell.css";

import homeShot from "../../images/hereiam/home-chooser.webp";
import childOtpShot from "../../images/hereiam/child-otp.webp";
import childPhotosShot from "../../images/hereiam/child-dashboard-photos.webp";
import childViewedShot from "../../images/hereiam/child-dashboard-viewed.webp";
import parentRoleShot from "../../images/hereiam/parent-role.webp";
import parentCodeShot from "../../images/hereiam/parent-code.webp";
import parentButtonShot from "../../images/hereiam/parent-button.webp";
import parentRevealShot from "../../images/hereiam/parent-reveal-reacted.webp";
import ownerDashboardShot from "../../images/hereiam/owner-dashboard.webp";

const Shot = ({ src, alt, caption }) => (
  <figure className="hia_shot">
    <img src={src} alt={alt} loading="lazy" />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
);

const HereIAm = () => {
  return (
    <div className="hia_container page-shell">
      <BackHome />

      {/* ── Hero ── */}
      <div className="hia_hero">
        <div className="hia_hero_text">
          <h1 className="hia_title">Here I am</h1>
          <p className="hia_tagline">One tap. A photo of your kid, wherever they are.</p>
          <p className="hia_description">
            Two installable apps sharing one backend, built for parents who just want to
            see a photo without a phone call, a text that goes unanswered, or scrolling a
            shared album looking for something recent. No live camera, no feed, no chat.
            One button. One photo, arriving.
          </p>
          <div className="hia_hero_actions">
            <a
              href="https://github.com/lahonsourav/hereiam"
              className="hia_btn hia_btn_primary"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
          <ShareButton title="Here I am: one tap, a photo of your kid" className="hia_share_btn" />
        </div>
        <div className="hia_hero_visual">
          <Shot src={homeShot} alt="Who's this? Parent or Child chooser screen" />
        </div>
      </div>

      {/* ── Three roles ── */}
      <div className="hia_section">
        <h2 className="hia_section_title">Three roles, one backend</h2>
        <p className="hia_section_subtitle">
          Built to serve any number of families, not just one — plus a private dashboard
          just for the owner to see every family and manage who's paid.
        </p>
        <div className="hia_role_grid">
          <div className="hia_role_card">
            <span className="hia_role_emoji">🧒</span>
            <h3>Child</h3>
            <p>Verifies their phone once, sets a password, and manages the photo pool their parents pull from. Free for the first 30 days.</p>
          </div>
          <div className="hia_role_card">
            <span className="hia_role_emoji">📱</span>
            <h3>Parent</h3>
            <p>One shared app, one shared family code. Unlock it once, then it's just the button, every time after.</p>
          </div>
          <div className="hia_role_card">
            <span className="hia_role_emoji">🗝️</span>
            <h3>Owner</h3>
            <p>A private dashboard to see every family that's ever signed up, and toggle who's paid once their trial ends.</p>
          </div>
        </div>
      </div>

      {/* ── Setting up as the child ── */}
      <div className="hia_section">
        <h2 className="hia_section_title">Setting up as the child</h2>
        <p className="hia_section_subtitle">Once, ever — after this, it's just phone + password.</p>
        <div className="hia_walkthrough">
          <div className="hia_walk_row">
            <div className="hia_walk_text">
              <span className="hia_step_num">1</span>
              <h3>Verify your number</h3>
              <p>
                Install the <code className="hia_inline_code">/child</code> app from your
                home screen — it won't open in a plain browser tab — then enter your phone
                number and confirm the SMS code sent to it. One SMS, ever.
              </p>
            </div>
            <Shot src={childOtpShot} alt="Verify phone number and set a password" />
          </div>

          <div className="hia_walk_row hia_walk_row--reverse">
            <div className="hia_walk_text">
              <span className="hia_step_num">2</span>
              <h3>Add photos to the pool</h3>
              <p>
                Upload a few photos, each with an optional caption. Every tap from a parent
                draws from this pool — whichever photo has been shown the fewest times,
                least-recently-shown first, so it cycles evenly instead of repeating favourites.
              </p>
            </div>
            <Shot src={childPhotosShot} alt="Photo pool shown as polaroid-style cards" />
          </div>

          <div className="hia_walk_row">
            <div className="hia_walk_text">
              <span className="hia_step_num">3</span>
              <h3>Give your parents the code</h3>
              <p>
                The dashboard shows a 6-character family code — give it to your parents once.
                Watch who's seen what and when, see reactions next to their name, and pin one
                photo to override the rotation for something time-sensitive.
              </p>
            </div>
            <Shot src={childViewedShot} alt="Dashboard showing a pinned photo, per-parent view times, and a reaction" />
          </div>
        </div>
      </div>

      {/* ── Using it as a parent ── */}
      <div className="hia_section">
        <h2 className="hia_section_title">Using it as a parent</h2>
        <p className="hia_section_subtitle">Two taps, ever. After that, just the button.</p>
        <div className="hia_walkthrough">
          <div className="hia_walk_row">
            <div className="hia_walk_text">
              <span className="hia_step_num">1</span>
              <h3>Say who you are</h3>
              <p>
                Install <code className="hia_inline_code">/parent</code>, then tap Father or
                Mother once — remembered on this phone from then on.
              </p>
            </div>
            <Shot src={parentRoleShot} alt="Choose Father or Mother" />
          </div>

          <div className="hia_walk_row hia_walk_row--reverse">
            <div className="hia_walk_text">
              <span className="hia_step_num">2</span>
              <h3>Type in the family code</h3>
              <p>The code your child gave you, typed once and remembered after that.</p>
            </div>
            <Shot src={parentCodeShot} alt="Enter the family code" />
          </div>

          <div className="hia_walk_row">
            <div className="hia_walk_text">
              <span className="hia_step_num">3</span>
              <h3>Tap for a photo</h3>
              <p>
                One button. Tap it, watch the polaroid develop, and a photo of your kid
                arrives with its caption and a timestamp.
              </p>
            </div>
            <Shot src={parentButtonShot} alt="The single tap button" />
          </div>

          <div className="hia_walk_row hia_walk_row--reverse">
            <div className="hia_walk_text">
              <span className="hia_step_num">4</span>
              <h3>React, or swipe back</h3>
              <p>
                Tap the heart to send a one-tap reaction — it shows up next to your name on
                the child's dashboard. Swiping only looks back at photos already shown this
                session; it never pulls a new one, so the button stays the only deliberate
                way to get something fresh.
              </p>
            </div>
            <Shot src={parentRevealShot} alt="A revealed photo with a heart reaction" />
          </div>
        </div>
      </div>

      {/* ── Beyond the button ── */}
      <div className="hia_section">
        <h2 className="hia_section_title">Beyond the button</h2>
        <p className="hia_section_subtitle">
          All optional, and all designed to add nothing extra for the parent tapping the button.
        </p>
        <div className="hia_feature_grid">
          <div className="hia_feature_card">
            <span className="hia_feature_icon">📌</span>
            <h3>Pin a photo</h3>
            <p>Override the rotation so every parent gets one exact photo — a new grandkid, a big update — until it's unpinned. Only one at a time.</p>
          </div>
          <div className="hia_feature_card">
            <span className="hia_feature_icon">🤍</span>
            <h3>Reactions</h3>
            <p>One tap, no typing. Shows up next to that parent's name on the photo, in the child's dashboard.</p>
          </div>
          <div className="hia_feature_card">
            <span className="hia_feature_icon">👀</span>
            <h3>Per-parent tracking</h3>
            <p>"Mom · 2 hours ago", "Dad · yesterday" — each parent's latest view is recorded separately, not one shared flag.</p>
          </div>
          <div className="hia_feature_card">
            <span className="hia_feature_icon">🔔</span>
            <h3>Notify on view</h3>
            <p>An optional push notification the moment a parent taps the button, even if the child's app isn't open.</p>
          </div>
        </div>
      </div>

      {/* ── Trial & paywall ── */}
      <div className="hia_section">
        <h2 className="hia_section_title">A 30-day trial, then a one-time unlock</h2>
        <p className="hia_section_subtitle">Enforced on the server, not just hidden in the UI — it can't be bypassed by calling the API directly.</p>
        <div className="hia_steps">
          <div className="hia_step">
            <span className="hia_step_circle">1</span>
            <div>
              <p>
                Once the free month is up, the child's app shows a{" "}
                <strong>"Buy Here I am for ₹199"</strong> screen instead of the dashboard.
                Tapping it opens WhatsApp with a prefilled message, including the family's
                phone number.
              </p>
            </div>
          </div>
          <div className="hia_step">
            <span className="hia_step_circle">2</span>
            <div>
              <p>The parent's button stops delivering photos too — otherwise a family could let the trial lapse and the parent would keep getting photos for free, forever.</p>
            </div>
          </div>
          <div className="hia_step">
            <span className="hia_step_circle">3</span>
            <div>
              <p>Once payment's received (outside the app — WhatsApp, UPI, whatever), the owner opens their dashboard, finds the family, and taps <strong>Unlock</strong>. Both apps work again immediately, no reinstall needed.</p>
            </div>
          </div>
        </div>
        <Shot src={ownerDashboardShot} alt="Owner dashboard listing a family with trial status and an Unlock toggle" />
      </div>

      {/* ── Tech ── */}
      <div className="hia_section">
        <h2 className="hia_section_title">How it's built</h2>
        <div className="hia_tech_table">
          {[
            ["Backend", "Express + Multer, Postgres via pg (hosted on Neon)"],
            ["Frontend", "Plain HTML/CSS/JS, no build step — installable PWAs, updated automatically"],
            ["Photo storage", "S3-compatible object storage in production, local disk in development"],
            ["Auth", "Phone + SMS OTP (Twilio Verify) once, bcrypt-hashed password after that"],
            ["Notifications", "Web Push, signed with a self-generated VAPID key pair — no third-party service"],
            ["Multi-tenancy", "Every row scoped to a family; every child route re-checks the signed-in session's family before touching any data"],
          ].map(([label, desc]) => (
            <div className="hia_tech_row" key={label}>
              <span className="hia_tech_label">{label}</span>
              <span className="hia_tech_desc">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="hia_footer">
        <p>📸 One tap. A photo of your kid.</p>
        <a
          href="https://github.com/lahonsourav/hereiam"
          className="hia_btn hia_btn_primary"
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub
        </a>
      </div>

      <PageFooter>Copyright © 2026 lahon.in/hereiam</PageFooter>
    </div>
  );
};

export default HereIAm;
