import React from 'react';
import { Link } from 'react-router-dom';
import './successpointgogamukh.css';

import landingShot from '../../images/spg/landing.webp';
import courseDetailShot from '../../images/spg/course-detail.webp';
import searchShot from '../../images/spg/search.webp';
import loginShot from '../../images/spg/login.webp';
import facultyJoinShot from '../../images/spg/faculty-join.webp';
import studentDashboardShot from '../../images/spg/student-dashboard.webp';
import studentRecordingsShot from '../../images/spg/student-recordings.webp';
import facultyDashboardShot from '../../images/spg/faculty-dashboard.webp';
import facultyStudentsShot from '../../images/spg/faculty-students.webp';
import goLiveShot from '../../images/spg/go-live.webp';
import adminDashboardShot from '../../images/spg/admin-dashboard.webp';
import adminCoursesShot from '../../images/spg/admin-courses.webp';
import adminStudentsShot from '../../images/spg/admin-students.webp';
import adminFacultyShot from '../../images/spg/admin-faculty.webp';
import adminEnrollmentsShot from '../../images/spg/admin-enrollments.webp';
import adminAnnouncementsShot from '../../images/spg/admin-announcements.webp';
import adminAuditLogShot from '../../images/spg/admin-audit-log.webp';
import adminLoginActivityShot from '../../images/spg/admin-login-activity.webp';
import adminDevChargeShot from '../../images/spg/admin-dev-charge.webp';
import masterOverviewShot from '../../images/spg/master-overview.webp';
import masterServicesShot from '../../images/spg/master-services.webp';
import masterPaymentsShot from '../../images/spg/master-payments.webp';

// ─── Reusable "real screenshot in a browser frame" ──────────────────────────

function Shot({ url, src, alt, caption, tall }) {
  return (
    <>
      <div className="spgp-browser">
        <div className="spgp-browser-bar">
          <span className="spgp-browser-dot" />
          <span className="spgp-browser-dot" />
          <span className="spgp-browser-dot" />
          <span className="spgp-browser-url">{url}</span>
        </div>
        <div className="spgp-browser-body spgp-browser-body--shot">
          <img className="spgp-shot-img" src={src} alt={alt} loading="lazy" />
        </div>
      </div>
      <div className="spgp-mock-caption">{caption}{tall ? ' — scroll inside the frame to see the full page' : ''}</div>
    </>
  );
}

function Gallery({ items }) {
  return (
    <div className="spgp-gallery">
      {items.map((s) => <Shot key={s.caption} {...s} />)}
    </div>
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
          announcements, and billing behind the scenes. Every screenshot below is the
          real, running application — not a mockup.
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

        <Shot
          url="successpointgogamukh.com"
          src={landingShot}
          alt="Success Point Gogamukh landing page — hero, programs, why choose us, testimonial, demo-class CTA, and location"
          caption="Landing page — hero, program cards, testimonial, demo-class CTA, contact & map"
          tall
        />

        <div style={{ marginTop: '1.75rem' }}>
          <Gallery
            items={[
              { url: 'successpointgogamukh.com/courses/…', src: courseDetailShot, alt: 'Course detail page with subjects, fees, and faculty', caption: 'Course detail — subjects, monthly/complete fees, assigned faculty' },
              { url: 'successpointgogamukh.com/search?q=…', src: searchShot, alt: 'Search results page', caption: 'Search — find a course or subject by name' },
            ]}
          />
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
        <h2 className="spgp-section-h">Accounts & Authentication</h2>
        <p className="spgp-section-sub">
          Students and admins log in with just a phone number and an SMS OTP — no
          passwords to forget or leak. Faculty get a dedicated invite/join flow.
        </p>
        <Gallery
          items={[
            { url: 'successpointgogamukh.com/login', src: loginShot, alt: 'Phone number login screen', caption: 'Student/admin login — phone + OTP, no password' },
            { url: 'successpointgogamukh.com/faculty/join', src: facultyJoinShot, alt: 'Faculty join page', caption: 'Faculty invite/join flow' },
          ]}
        />
        <div style={{ marginTop: '1.75rem' }}>
          <FeatureGrid
            items={[
              { icon: '📱', title: 'Phone + OTP, no passwords', body: 'Students and admins log in with just a phone number and an SMS OTP via Twilio Verify.' },
              { icon: '🧑‍🏫', title: 'Faculty invite flow', body: 'A separate join link lets faculty verify their phone and complete their account.' },
              { icon: '🎭', title: 'Four roles', body: 'student, faculty, admin, master — each with a distinct dashboard and permission set.' },
              { icon: '🔐', title: 'Login activity tracking', body: 'Every OTP send/verify/fail is logged with IP, user agent, and geolocation, visible to admins with SMS cost per OTP.' },
            ]}
          />
        </div>
      </div>

      {/* ── Student dashboard ── */}
      <div className="spgp-section">
        <h2 className="spgp-section-h">Student Dashboard</h2>
        <p className="spgp-section-sub">
          Everything an enrolled student needs — courses, live classes, recordings, and
          notifications — in one mobile-first dashboard.
        </p>
        <Gallery
          items={[
            { url: 'successpointgogamukh.com/dashboard/student', src: studentDashboardShot, alt: 'Student dashboard with enrolled and available courses', caption: 'Student home — My Courses + Available Courses' },
            { url: 'successpointgogamukh.com/dashboard/course-recordings/…', src: studentRecordingsShot, alt: 'Recordings and materials page', caption: 'Recordings & materials, filterable by subject/chapter/topic' },
          ]}
        />
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
        <Shot
          url="successpointgogamukh.com/dashboard/online-class"
          src={goLiveShot}
          alt="Go Live panel — course, cross-linking, subject, chapter, and topic picker with a live indicator"
          caption="Go Live — pick Course → Subject → Chapter → Topic, cross-link other courses, see what's live right now"
        />
        <div style={{ marginTop: '1.75rem' }}>
          <Gallery
            items={[
              { url: 'successpointgogamukh.com/dashboard/faculty', src: facultyDashboardShot, alt: 'Faculty dashboard with assigned subjects', caption: 'Faculty dashboard — assigned subjects, quick stats' },
              { url: 'successpointgogamukh.com/dashboard/faculty/students', src: facultyStudentsShot, alt: 'Faculty view of students', caption: "Faculty's student roster" },
            ]}
          />
        </div>
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
            <Shot
              url="successpointgogamukh.com/dashboard/admin/announcements"
              src={adminAnnouncementsShot}
              alt="Announcements composer — title, message, optional link, audience selector"
              caption="Compose and send — all students or specific courses, with an optional link"
            />
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
        <Shot
          url="successpointgogamukh.com/dashboard/admin"
          src={adminDashboardShot}
          alt="Admin dashboard home with stats and a grid of management tools"
          caption="Admin home — live stats plus every management tool, one click away"
        />

        <div style={{ marginTop: '1.75rem' }}>
          <Gallery
            items={[
              { url: 'successpointgogamukh.com/dashboard/admin/courses', src: adminCoursesShot, alt: 'Manage courses table', caption: 'Manage Courses — pricing, enrollment counts, requests, recordings' },
              { url: 'successpointgogamukh.com/dashboard/admin/students', src: adminStudentsShot, alt: 'Manage students table', caption: 'Manage Students — search, enrollment, per-student edit' },
              { url: 'successpointgogamukh.com/dashboard/admin/faculty', src: adminFacultyShot, alt: 'Manage faculty page', caption: 'Manage Faculty — subject assignments' },
              { url: 'successpointgogamukh.com/dashboard/admin/enrollments', src: adminEnrollmentsShot, alt: 'Enrollment requests page', caption: 'Enrollment Requests — verify receipts, approve/reject' },
              { url: 'successpointgogamukh.com/dashboard/admin/audit-log', src: adminAuditLogShot, alt: 'Audit log table', caption: 'Audit Log — immutable trail of every change, by actor' },
              { url: 'successpointgogamukh.com/dashboard/admin/login-activity', src: adminLoginActivityShot, alt: 'Login activity table with SMS cost', caption: 'Login Activity — device, location, SMS cost per OTP' },
              { url: 'successpointgogamukh.com/dashboard/admin/pending-fees', src: adminDevChargeShot, alt: 'Development charge breakdown', caption: 'Development Charge — read-only, what\'s owed vs. paid' },
            ]}
          />
        </div>

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
        <Shot
          url="successpointgogamukh.com/dashboard/master"
          src={masterOverviewShot}
          alt="Master dashboard overview with counts and billing tools"
          caption="Master overview — live counts, payment countdown, plus billing tools"
        />
        <div style={{ marginTop: '1.75rem' }}>
          <Gallery
            items={[
              { url: 'successpointgogamukh.com/dashboard/master/services', src: masterServicesShot, alt: 'Services and pricing breakdown', caption: 'Services & Pricing — itemized service vs. development cost breakdown' },
              { url: 'successpointgogamukh.com/dashboard/master/payments', src: masterPaymentsShot, alt: 'Payment tracking page', caption: 'Payment Tracking — record payments, set the due date' },
            ]}
          />
        </div>
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
