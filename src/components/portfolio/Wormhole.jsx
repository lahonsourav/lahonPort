import React from 'react';
import { Link } from 'react-router-dom';
import './wormhole.css';

// ─── Static phone chat demo ───────────────────────────────────────────────────

function PhoneDemo() {
  const messages = [
    { me: false, text: 'Is this thing really private?', time: '9:41' },
    { me: true,  text: 'Yep. This message went straight from my phone to yours.', time: '9:41', status: '✓✓' },
    { me: true,  text: 'No app company, no cloud, nothing in between.', time: '9:42', status: '✓✓' },
    { me: false, text: 'So who can read it?', time: '9:42' },
    { me: true,  text: 'Just us. Our phones are the only two devices that hold the keys 🔑', time: '9:43', status: '✓✓' },
    { me: false, text: 'Okay that is actually cool 🌀', time: '9:43' },
  ];

  return (
    <div className="wh-phone-wrap">
      <div className="wh-phone">
        <div className="wh-phone-status">
          <span>9:43</span>
          <span>⚡ 82%</span>
        </div>
        <div className="wh-conn-bar">
          <span className="wh-conn-dot" />
          Connected — direct line
          <span className="wh-conn-icons">📞 🎥</span>
        </div>
        <div className="wh-chat">
          {messages.map((m, i) => (
            <div key={i} className={`wh-bubble${m.me ? ' wh-bubble--me' : ''}`}>
              <span className="wh-bubble-text">{m.text}</span>
              <span className="wh-bubble-meta">
                {m.time}{m.status && <span className="wh-tick"> {m.status}</span>}
              </span>
            </div>
          ))}
        </div>
        <div className="wh-input-row">
          <span className="wh-input-cam">📷</span>
          <span className="wh-input-field">Message…</span>
          <span className="wh-input-send">➤</span>
        </div>
        <div className="wh-phone-bar" />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const Wormhole = () => {
  return (
    <div className="wh-page">

      {/* ── Hero ── */}
      <div className="wh-hero">
        <div className="wh-hero-logo">
          <span className="wh-hero-swirl">🌀</span>
          <h1 className="wh-hero-title">Wormhole</h1>
        </div>
        <p className="wh-hero-sub">
          A private line between two phones. Messages, photos, and calls travel
          straight from you to them — with no company sitting in the middle.
        </p>
        <div className="wh-tags">
          {['Two people only', 'End-to-end encrypted', 'No account needed', 'Android & iPhone'].map(t => (
            <span key={t} className="wh-tag">{t}</span>
          ))}
        </div>
        <div className="wh-hero-cta">
          <a
            href="https://drive.google.com/file/d/1B8697BYuBhqrzr1ymNnPD0rNbEFtFb_F/view?usp=drive_link"
            className="wh-download-btn"
            target="_blank"
            rel="noreferrer"
          >
            🤖 Download APK for Android
          </a>
          <span className="wh-coming-pill">🍎 iOS — coming soon</span>
        </div>
      </div>

      {/* ── The one-line idea ── */}
      <div className="wh-tunnel-strip">
        <span className="wh-tunnel-phone">📱</span>
        <span className="wh-tunnel-line">
          <span className="wh-tunnel-lock">🔒</span>
        </span>
        <span className="wh-tunnel-phone">📱</span>
      </div>
      <p className="wh-tunnel-caption">
        Think of it as a tiny wormhole connecting exactly two phones.
        Whatever goes in one side comes out the other — and nowhere else.
      </p>

      {/* ── Phone demo ── */}
      <PhoneDemo />

      {/* ── What makes it different ── */}
      <div className="wh-features">
        {[
          {
            icon: '🚫',
            title: 'No middleman',
            body: 'Most messaging apps send your words to a company’s computers first. Wormhole doesn’t. Your phones talk to each other directly, like two tin cans on a very sophisticated string.',
          },
          {
            icon: '🔐',
            title: 'Locked by default',
            body: 'Every message, photo, and call is sealed before it leaves your phone. Only your friend’s phone has the key to open it. Not us, not a server, not anyone in between.',
          },
          {
            icon: '👤',
            title: 'Nothing to sign up for',
            body: 'No phone number, no email, no account, no profile. If there’s no list of users anywhere, there’s nothing to leak, sell, or hack.',
          },
        ].map(f => (
          <div key={f.title} className="wh-feat">
            <div className="wh-feat-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </div>
        ))}
      </div>

      {/* ── How it works ── */}
      <div className="wh-how">
        <h2 className="wh-section-h">How it works — in plain words</h2>
        <div className="wh-steps">
          {[
            { n: '01', title: 'Agree on a secret word', body: 'You and your friend pick a shared room word. It’s how your phones find each other — like both walking up to the same meeting point.' },
            { n: '02', title: 'Scan each other once', body: 'When you meet, each phone shows a QR code and scans the other’s. That’s a one-time trust handshake — from then on, your phones can prove it’s really each other.' },
            { n: '03', title: 'The tunnel opens', body: 'A brief “introduction” service helps your phones locate each other, then steps out of the way. From that moment, everything flows phone-to-phone.' },
            { n: '04', title: 'Talk freely', body: 'Text, photos, voice and video calls — all through the same locked tunnel. If your friend is offline, messages wait patiently on your phone and deliver when you’re both back.' },
          ].map(s => (
            <div key={s.n} className="wh-step">
              <div className="wh-step-n">{s.n}</div>
              <h3 className="wh-step-title">{s.title}</h3>
              <p className="wh-step-body">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Privacy, honestly ── */}
      <div className="wh-privacy">
        <h2 className="wh-section-h">Private by design — and honest about it</h2>
        <p className="wh-privacy-sub">No fine print. Here’s exactly where your stuff lives and who can see what.</p>
        <div className="wh-privacy-grid">
          {[
            { icon: '🙈', title: 'We couldn’t read your messages if we wanted to', body: 'Messages are locked with keys that exist only on your two phones. There is no master key, no admin view, no “trust us.”' },
            { icon: '📱', title: 'Your history stays on your phone', body: 'Chat history is saved on your device and your friend’s device. Nowhere else. Delete the app, and it’s gone.' },
            { icon: '🤝', title: 'Trust you can check yourself', body: 'The QR scan (or a short safety number you compare out loud) proves no one slipped in between you. It’s like recognising a friend’s face instead of trusting a name tag.' },
            { icon: '⚖️', title: 'Honest about the limits', body: 'Both phones need to be online at the same time to deliver — there’s no cloud mailbox. And the brief “introduction” step means a helper computer sees that two phones connected, though never what they say.' },
          ].map(p => (
            <div key={p.title} className="wh-priv-card">
              <div className="wh-priv-icon">{p.icon}</div>
              <h3 className="wh-priv-title">{p.title}</h3>
              <p className="wh-priv-body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Little questions ── */}
      <div className="wh-faq">
        <h2 className="wh-section-h">Little questions, straight answers</h2>
        <div className="wh-faq-list">
          {[
            { q: 'What if my friend is offline?', a: 'Your message waits on your phone with a small 🕐 and sends itself the moment you’re both online. Nothing is lost.' },
            { q: 'Can a third person join the chat?', a: 'No — and that’s the point. Wormhole is built for exactly two people. No groups, no forwarding, no “added by phone number.”' },
            { q: 'Does it work between Android and iPhone?', a: 'Yes. An Android phone and an iPhone connect to each other just fine.' },
            { q: 'Photos and calls too?', a: 'Yes. Pictures, voice calls, and video calls all travel through the same locked phone-to-phone tunnel as your texts.' },
          ].map(f => (
            <div key={f.q} className="wh-faq-item">
              <div className="wh-faq-q">{f.q}</div>
              <div className="wh-faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Deep dive link ── */}
      <div className="wh-deepdive">
        <div className="wh-deepdive-card">
          <div className="wh-deepdive-icon">⚙️</div>
          <div className="wh-deepdive-text">
            <h3>Curious how it actually works under the hood?</h3>
            <p>
              WebRTC tunnels, NaCl encryption, MITM defense, offline queues, and every
              diagram from the build — the full engineering story lives on the blog.
            </p>
          </div>
          <Link to="/blog/building-wormhole-p2p-messaging" className="wh-deepdive-btn">
            Read the deep-dive →
          </Link>
        </div>
      </div>

      {/* ── Status ── */}
      <div className="wh-cta-section">
        <p className="wh-cta-label">Try it now</p>
        <div className="wh-coming-row">
          <a
            href="https://drive.google.com/file/d/1B8697BYuBhqrzr1ymNnPD0rNbEFtFb_F/view?usp=drive_link"
            className="wh-download-btn"
            target="_blank"
            rel="noreferrer"
          >
            🤖 Download APK for Android
          </a>
          <span className="wh-coming-pill">🍎 iOS — coming soon</span>
        </div>
      </div>

      <div className="wh-page-footer">Copyright © 2026 lahon.in/wormhole</div>
    </div>
  );
};

export default Wormhole;
