import React from 'react';
import { Link } from 'react-router-dom';
import './successpointgogamukh.css';

// ─── Reusable mock frames ───────────────────────────────────────────────────

function BrowserMock({ url, children, caption }) {
  return (
    <>
      <div className="spgp-browser">
        <div className="spgp-browser-bar">
          <span className="spgp-browser-dot" />
          <span className="spgp-browser-dot" />
          <span className="spgp-browser-dot" />
          <span className="spgp-browser-url">{url}</span>
        </div>
        <div className="spgp-browser-body">{children}</div>
      </div>
      {caption && <div className="spgp-mock-caption">{caption}</div>}
    </>
  );
}

function PhoneMock({ children, caption }) {
  return (
    <>
      <div className="spgp-phone">{children}</div>
      {caption && <div className="spgp-mock-caption">{caption}</div>}
    </>
  );
}

function FeatureGrid({ items }) {
  return (
    <div className="spgp-feature-grid">
      {items.map((f) => (
        <div key={f.title} className="spgp-feature-card">
          <div className="spgp-feature-icon">{f.icon}</div>
          <h3>{f.title}</h3>
          <p>{f.body}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

const SuccessPointGogamukh = () => {
  return (
    <div className="spgp-page">
      {/* ── Hero ── */}
      <div className="spgp-hero">
        <div className="spgp-hero-logo">
          <span className="spgp-hero-cap">🎓</span>
          <h1 className="spgp-hero-title">Success Point Gogamukh</h1>
        </div>
        <p className="spgp-hero-tagline">"Your Dreams, Our Goal"</p>
        <p className="spgp-hero-sub">
          A full digital platform for a coaching center in Gogamukh, Dhemaji, Assam —
          a public marketing site that wins new admissions, plus student, faculty,
          admin, and owner dashboards that run live online classes, enrollments,
          announcements, and billing behind the scenes. Built end-to-end: design,
          frontend, backend, database, and deployment.
        </p>
        <div className="spgp-badge-row">
          {['NEET', 'JEE', 'Assam CEE', 'Board Exam', 'SSC GD', 'ADRE', 'Assam Police'].map((b) => (
            <span key={b} className="spgp-badge">{b}</span>
          ))}
        </div>
        <div className="spgp-hero-cta">
          <a
            href="https://www.successpointgogamukh.com/"
            className="spgp-btn spgp-btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            Visit Live Site ↗
          </a>
          <Link to="/blog/building-success-point-gogamukh" className="spgp-btn spgp-btn-secondary">
            Read the Tech Deep-Dive
          </Link>
        </div>
        <div className="spgp-client-pill">
          📌 A real, in-production client project — not a template or a demo
        </div>
      </div>

      {/* ── Public website ── */}
      <div className="spgp-section">
        <h2 className="spgp-section-h">The Public Website</h2>
        <p className="spgp-section-sub">
          The front door: a fast, mobile-first marketing site built to convert a parent
          searching on their phone at night into an admission.
        </p>

        <BrowserMock url="successpointgogamukh.com" caption="Landing page — hero, exam badges, demo-class CTA, floating WhatsApp button">
          <div className="spgp-mock-relative">
            <div className="spgp-mock-nav">
              <span className="spgp-mock-brand">🎓 Success Point</span>
              <span>Courses · Contact</span>
            </div>
            <div className="spgp-mock-hero-title">Your Dreams, Our Goal</div>
            <div className="spgp-mock-hero-sub">
              School-subject tuition and competitive exam coaching for Classes IX–XII, NEET, JEE,
              and Assam government exams — right here in Gogamukh.
            </div>
            <div className="spgp-mock-cta-row">
              <span className="spgp-mock-pill spgp-mock-pill--fill">One Week Free Demo Class</span>
              <span className="spgp-mock-pill spgp-mock-pill--ghost">Admissions Open</span>
            </div>
            <div className="spgp-badge-row">
              {['NEET', 'JEE', 'Assam CEE', 'Board Exam', 'ADRE'].map((b) => (
                <span key={b} className="spgp-badge">{b}</span>
              ))}
            </div>
            <span className="spgp-mock-whatsapp">💬</span>
          </div>
        </BrowserMock>

        <div style={{ marginTop: '1.75rem' }}>
          <h3 style={{ textAlign: 'center', fontSize: '0.95rem', marginBottom: '0.9rem' }}>Programs on offer</h3>
          <div className="spgp-program-grid">
            {[
              { name: 'Classes IX & X', color: '#2dd4bf', desc: 'All subjects, foundation building, regular tests & assessments.' },
              { name: 'Classes XI & XII (PCMB)', color: '#3de081', desc: 'Physics, Chemistry, Maths, Biology — focused NEET & JEE prep.' },
              { name: 'ADRE 3.0 — Grade III & IV', color: '#f85149', desc: 'English, GK, Arithmetic, Reasoning for Assam govt. exam aspirants.' },
            ].map((p) => (
              <div key={p.name} className="spgp-program-card">
                <h4><span className="spgp-program-dot" style={{ background: p.color }} />{p.name}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '1.75rem' }}>
          <h3 style={{ textAlign: 'center', fontSize: '0.95rem', marginBottom: '0.9rem' }}>Course catalog & transparent pricing</h3>
          <div className="spgp-course-card">
            <div className="spgp-course-top">
              <span className="spgp-course-name">Class XI–XII · PCMB (NEET/JEE track)</span>
              <span><span className="spgp-price-strike">₹4,500/mo</span><span className="spgp-price-offer">₹3,800/mo</span></span>
            </div>
            <div className="spgp-course-subjects">
              {['Physics', 'Chemistry', 'Mathematics', 'Biology'].map((s) => (
                <span key={s} className="spgp-subject-chip">{s}</span>
              ))}
            </div>
            <div className="spgp-course-fine">Admission fee ₹700 · offer price shown struck-through against the original</div>
          </div>
        </div>

        <FeatureGrid
          items={[
            { icon: '🔍', title: 'Search', body: 'Search courses and subjects by name straight from the header search bar.' },
            { icon: '📝', title: 'Enrollment requests', body: 'Students submit a course/subject enrollment request with a payment receipt number; staff verify or reject it.' },
            { icon: '🗺️', title: 'SEO built-in', body: 'Per-page metadata, Open Graph/Twitter cards, JSON-LD (Course, Breadcrumb) on course pages, sitemap.xml, robots.txt, and noindex on every authenticated route.' },
            { icon: '📲', title: 'Installable PWA', body: 'A native Android/Chrome install prompt plus an iOS "Add to Home Screen" hint, and a service worker that caches the public site for offline/fast reloads.' },
            { icon: '📍', title: 'Location & contact', body: 'Address, embedded Google map, click-to-call, and a pre-filled WhatsApp deep link — always one tap away.' },
            { icon: '💬', title: 'Floating WhatsApp button', body: 'Fixed on the homepage, auto-hides when the footer scrolls into view so it never covers the footer.' },
          ]}
        />
      </div>

      {/* ── Accounts & Auth ── */}
      <div className="spgp-section">
        <div className="spgp-split">
          <div>
            <BrowserMock url="successpointgogamukh.com/login">
              <div className="spgp-otp-title">Log in with your phone</div>
              <div className="spgp-phone-input">📱 +91 93875 72757</div>
              <div className="spgp-otp-boxes">
                {['4', '8', '2', '9'].map((d, i) => (
                  <span key={i} className="spgp-otp-box">{d}</span>
                ))}
              </div>
              <div className="spgp-mock-note">OTP sent via Twilio Verify · no password, ever</div>
            </BrowserMock>
          </div>
          <div className="spgp-split-text">
            <h3>Accounts & Authentication</h3>
            <p>
              Students and admins log in with just a phone number and an SMS OTP —
              no passwords to forget or leak. Faculty get a dedicated invite/join link
              to verify their phone and complete their account.
            </p>
            <p>
              Four roles — <strong>student</strong>, <strong>faculty</strong>, <strong>admin</strong>,{' '}
              <strong>master</strong> — each land on a distinct dashboard with a distinct permission
              set. Every OTP send/verify/fail is logged with IP, user agent, and geolocation
              (city/region/country), visible to admins alongside the SMS cost per OTP.
            </p>
          </div>
        </div>
      </div>

      {/* ── Student dashboard ── */}
      <div className="spgp-section">
        <h2 className="spgp-section-h">Student Dashboard</h2>
        <p className="spgp-section-sub">
          Everything an enrolled student needs — courses, live classes, recordings, and
          notifications — in one mobile-first dashboard.
        </p>
        <PhoneMock caption="Student home — My Courses, join a live class, or catch up on a recording">
          <div className="spgp-mock-nav" style={{ marginBottom: '0.6rem' }}>
            <span className="spgp-mock-brand">My Courses</span>
            <span>👤</span>
          </div>
          <div className="spgp-course-card" style={{ padding: '0.6rem 0.7rem' }}>
            <div className="spgp-course-top">
              <span className="spgp-course-name" style={{ fontSize: '0.75rem' }}>XI–XII PCMB</span>
              <span className="spgp-mock-pill spgp-mock-pill--fill" style={{ fontSize: '0.6rem' }}>🔴 Live now</span>
            </div>
            <div className="spgp-course-fine">Enrolled 12 Jun 2026 · Recordings available</div>
          </div>
          <div className="spgp-course-card" style={{ padding: '0.6rem 0.7rem' }}>
            <div className="spgp-course-top">
              <span className="spgp-course-name" style={{ fontSize: '0.75rem' }}>ADRE 3.0</span>
            </div>
            <div className="spgp-course-fine">Enrolled 3 May 2026</div>
          </div>
          <div className="spgp-toast" style={{ marginTop: '0.6rem' }}>
            <span className="spgp-toast-icon">🔔</span>
            <div>
              <div className="spgp-toast-title">Allow Notifications</div>
              <div className="spgp-toast-body">Get notified the moment a live class starts</div>
            </div>
          </div>
        </PhoneMock>

        <div style={{ marginTop: '1.75rem' }}>
          <FeatureGrid
            items={[
              { icon: '📚', title: 'My Courses / Available Courses', body: 'Enrolled courses with enroll date and a link to recordings; browse and request enrollment in other active courses.' },
              { icon: '🎥', title: 'Online Class', body: 'Join a live class when staff have gone live, or browse recorded classes filtered by course → subject → chapter.' },
              { icon: '🔔', title: 'Push notifications', body: 'A blocking "Allow Notifications" prompt reappears until enabled; once on, get pinged the instant a class goes live or staff post an announcement.' },
            ]}
          />
        </div>
      </div>

      {/* ── Live classes ── */}
      <div className="spgp-section">
        <h2 className="spgp-section-h">Live Online Classes (Staff-run)</h2>
        <p className="spgp-section-sub">
          The centerpiece feature — faculty and admins run genuine live classes with
          curriculum structure, watermarked playback, and full attendance logs.
        </p>
        <BrowserMock url="successpointgogamukh.com/dashboard/live-class" caption="Go Live — pick Course → Subject → Chapter → Topic, paste a YouTube ID, optionally cross-link other courses">
          <div className="spgp-dash-shell" style={{ minHeight: 'auto' }}>
            <div style={{ width: '100%' }}>
              <div className="spgp-otp-title" style={{ textAlign: 'left' }}>🔴 Go Live</div>
              <div className="spgp-phone-input">▶ YouTube video ID or URL</div>
              <div className="spgp-course-subjects" style={{ marginBottom: '0.7rem' }}>
                <span className="spgp-subject-chip">XI–XII PCMB → Physics</span>
                <span className="spgp-subject-chip">Ch. Optics → Topic: Refraction</span>
              </div>
              <div className="spgp-course-fine">Cross-link to: ☑ ADRE 3.0 batch (optional)</div>
              <div className="spgp-mock-cta-row" style={{ justifyContent: 'flex-start', marginTop: '0.8rem' }}>
                <span className="spgp-mock-pill spgp-mock-pill--fill">Start Live Class</span>
                <span className="spgp-mock-pill spgp-mock-pill--ghost">End Live Class</span>
              </div>
            </div>
          </div>
        </BrowserMock>

        <div style={{ marginTop: '1.75rem' }}>
          <FeatureGrid
            items={[
              { icon: '🎬', title: 'Go Live', body: 'Staff paste a YouTube video ID/URL to start a class under a Topic; the same class can be cross-linked to reach students in other courses too.' },
              { icon: '🗂️', title: 'Curriculum management', body: 'Subjects, Chapters, and Topics are created/reused on the fly, with the ability to delete chapters, topics, and past recordings.' },
              { icon: '⏹️', title: 'End Live Class', body: 'Staff end a session and watching students are cut off automatically (polled every 4s) instead of left hanging.' },
              { icon: '🔏', title: 'Watermarked playback', body: 'The viewer\'s identity is overlaid on the video during playback as a leak deterrent.' },
              { icon: '📼', title: 'Recordings library', body: 'Every past live session becomes a browsable recording, filterable by course/subject/chapter or listed in full.' },
              { icon: '✅', title: 'Attendance (join logs)', body: 'Every successful join is recorded with student name and time — surviving even if the account is later deleted.' },
            ]}
          />
        </div>
      </div>

      {/* ── Push & Announcements ── */}
      <div className="spgp-section">
        <div className="spgp-split spgp-split--rev">
          <div>
            <div className="spgp-toast">
              <span className="spgp-toast-icon">📢</span>
              <div>
                <div className="spgp-toast-title">New batch starting — NEET 2027</div>
                <div className="spgp-toast-body">Sent to: All students enrolled in XI–XII PCMB · tap to open admission form</div>
              </div>
            </div>
            <div className="spgp-toast" style={{ marginTop: '0.6rem' }}>
              <span className="spgp-toast-icon">🔴</span>
              <div>
                <div className="spgp-toast-title">Physics — Optics is live now</div>
                <div className="spgp-toast-body">Sent automatically the moment staff go live</div>
              </div>
            </div>
          </div>
          <div className="spgp-split-text">
            <h3>Push Notifications & Announcements</h3>
            <p>
              Students opt in via the browser Push API; subscriptions are stored per device
              and pruned automatically when a device unsubscribes. Going live pushes a
              notification straight to every student enrolled in that class's course(s).
            </p>
            <p>
              Staff can also broadcast a title + message to <strong>all students</strong> or to
              students in one or more <strong>specific courses</strong>, optionally with a link —
              a form, a payment page, a resource — so tapping the notification opens that
              link instead of the dashboard. Every send is recorded in the audit log with
              recipient count and audience.
            </p>
          </div>
        </div>
      </div>

      {/* ── Admin dashboard ── */}
      <div className="spgp-section">
        <h2 className="spgp-section-h">Admin Dashboard</h2>
        <p className="spgp-section-sub">
          The operational control center — courses, students, faculty, enrollments,
          announcements, and a fully auditable trail of every change.
        </p>
        <BrowserMock url="successpointgogamukh.com/dashboard" caption="Admin dashboard — sidebar navigation across every management tool">
          <div className="spgp-dash-shell">
            <div className="spgp-sidebar">
              {['Manage Courses', 'Manage Students', 'Manage Faculty', 'Admins', 'Enrollment Requests', 'Online Class', 'Announcements', 'Development Charge', 'Audit Log', 'Login Activity'].map((item, i) => (
                <span key={item} className={`spgp-sidebar-item${i === 0 ? ' spgp-sidebar-item--active' : ''}`}>{item}</span>
              ))}
            </div>
            <div className="spgp-dash-main">
              <div className="spgp-dash-banner">⏳ Development balance due in 12 days — see Development Charge</div>
              <table className="spgp-table">
                <thead>
                  <tr><th>Course</th><th>Subjects</th><th>Fee</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr><td>XI–XII PCMB</td><td>4</td><td>₹3,800/mo</td><td>Active</td></tr>
                  <tr><td>ADRE 3.0</td><td>4</td><td>₹1,500/mo</td><td>Active</td></tr>
                  <tr><td>Classes IX–X</td><td>6</td><td>₹1,200/mo</td><td>Active</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </BrowserMock>

        <div style={{ marginTop: '1.75rem' }}>
          <FeatureGrid
            items={[
              { icon: '📘', title: 'Manage Courses', body: 'Create/edit/delete courses and subjects, set fees and offer pricing, assign or unassign faculty to subjects.' },
              { icon: '🧑‍🎓', title: 'Manage Students', body: 'View/edit student accounts, add/remove course enrollments, search & filter, delete accounts.' },
              { icon: '🧑‍🏫', title: 'Manage Faculty', body: 'View/edit faculty accounts, assign or unassign subjects, delete accounts.' },
              { icon: '🛡️', title: 'Admins', body: 'See who has admin access and their activity.' },
              { icon: '📄', title: 'Enrollment Requests', body: 'Verify receipt numbers and approve or reject pending course/subject enrollment requests.' },
              { icon: '📣', title: 'Announcements', body: 'Send push notifications to all students or specific courses, with an optional link.' },
              { icon: '💳', title: 'Development Charge', body: 'A read-only breakdown of what\'s owed to the developer vs. what\'s been paid, with a countdown/overdue banner shown site-wide.' },
              { icon: '🧾', title: 'Audit Log', body: 'An immutable, write-once trail of every course/price/enrollment/announcement change — who did what, when.' },
              { icon: '🔐', title: 'Login Activity', body: 'Every login/OTP attempt with device, location, and SMS cost.' },
            ]}
          />
        </div>
      </div>

      {/* ── Master dashboard ── */}
      <div className="spgp-section">
        <h2 className="spgp-section-h">Master Dashboard — Admin + Developer Billing</h2>
        <p className="spgp-section-sub">
          Everything an admin can do, plus the tools I use myself to track this project's
          costs and the client's payments against them.
        </p>
        <BrowserMock url="successpointgogamukh.com/dashboard/master" caption="Overview — live counts and the payment due countdown">
          <div className="spgp-stat-grid">
            {[
              { n: '412', l: 'STUDENTS' },
              { n: '9', l: 'COURSES' },
              { n: '14', l: 'FACULTY' },
              { n: '689', l: 'ENROLLMENTS' },
            ].map((s) => (
              <div key={s.l} className="spgp-stat-card">
                <div className="spgp-stat-num">{s.n}</div>
                <div className="spgp-stat-lbl">{s.l}</div>
              </div>
            ))}
          </div>
          <table className="spgp-table" style={{ marginTop: '0.9rem' }}>
            <thead>
              <tr><th>Line item</th><th>Category</th><th>Amount</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr><td>Website design & build</td><td>Development</td><td>₹45,000</td><td>Active</td></tr>
              <tr><td>Live class infrastructure</td><td>Development</td><td>₹18,000</td><td>Active</td></tr>
              <tr><td>SMS OTP (monthly)</td><td>Service</td><td>₹1,200</td><td>Active</td></tr>
            </tbody>
          </table>
        </BrowserMock>
        <div style={{ marginTop: '1.75rem' }}>
          <FeatureGrid
            items={[
              { icon: '📊', title: 'Overview', body: 'Student/course/faculty/enrollment counts and the payment due countdown banner, at a glance.' },
              { icon: '🧮', title: 'Services & Pricing', body: 'Manage the itemized cost breakdown — service vs. development line items, each active, deferred, or on-demand.' },
              { icon: '💰', title: 'Payment Tracking', body: 'Record client payments toward the total fee, see total fee / paid / pending, and set the due date that drives the countdown banner.' },
            ]}
          />
        </div>
      </div>

      {/* ── Notable technical details ── */}
      <div className="spgp-section">
        <h2 className="spgp-section-h">Under the Hood</h2>
        <p className="spgp-section-sub">
          Built on Next.js App Router with Server Actions and Prisma/PostgreSQL —
          server-driven, no client-side state management framework, no optimistic-UI
          trickery. The full engineering write-up is one click away below.
        </p>
        <div className="spgp-tech-strip">
          {[
            '⚡ Next.js — App Router',
            '🧩 Server Actions',
            '🗄️ Prisma + PostgreSQL',
            '📱 Twilio Verify — OTP',
            '🔔 Web Push — VAPID',
            '📦 PWA + Service Worker',
            '🚂 Railway deployment',
            '💱 Live USD→INR conversion',
          ].map((t) => (
            <span key={t} className="spgp-tech-chip">{t}</span>
          ))}
        </div>
      </div>

      {/* ── Deep dive link ── */}
      <div className="spgp-deepdive">
        <div className="spgp-deepdive-card">
          <div className="spgp-deepdive-icon">⚙️</div>
          <div className="spgp-deepdive-text">
            <h3>Curious how it's actually built?</h3>
            <p>
              Auth flow, database schema, the live-class polling design, push subscriptions,
              the PWA caching strategy, and the audit log — the full technical breakdown
              lives on the blog.
            </p>
          </div>
          <Link to="/blog/building-success-point-gogamukh" className="spgp-deepdive-btn">
            Read the deep-dive →
          </Link>
        </div>
      </div>

      {/* ── Final CTA ── */}
      <div className="spgp-cta-section">
        <p className="spgp-cta-label">Want something like this for your business?</p>
        <p className="spgp-cta-sub" style={{ margin: '0 auto 1.25rem' }}>
          This is what I build for real clients — a public site that converts, plus
          dashboards that run the actual operations behind it. Coaching centers, schools,
          clinics, local service businesses — if it needs a real online presence and a
          system to run day-to-day, I can build it.
        </p>
        <div className="spgp-hero-cta">
          <Link to="/#contact" className="spgp-btn spgp-btn-primary">Get in Touch</Link>
          <a
            href="https://www.successpointgogamukh.com/"
            className="spgp-btn spgp-btn-secondary"
            target="_blank"
            rel="noreferrer"
          >
            Visit Live Site ↗
          </a>
        </div>
      </div>

      <div className="spgp-page-footer">Copyright © 2026 lahon.in/success-point-gogamukh</div>
    </div>
  );
};

export default SuccessPointGogamukh;
