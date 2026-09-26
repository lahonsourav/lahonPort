// Server-side proxy for the portfolio search's "no matches" fallback — API
// keys must never reach the browser bundle, so this Netlify Function is the
// only thing that ever calls Groq or Claude (see
// src/components/header/Header.jsx's HeroSearch, which POSTs here).
//
// Groq is called with a plain fetch (its API is OpenAI-compatible, so no
// SDK is worth adding for one call). Claude is called through the official
// @anthropic-ai/sdk, used only as a fallback when Groq fails or times out —
// Groq is free/fast-tier and tried first; Haiku is the paid safety net so
// this never just breaks when Groq has a bad day.
const Anthropic = require("@anthropic-ai/sdk");

const GROQ_MODEL = "openai/gpt-oss-20b";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const CLAUDE_MODEL = "claude-haiku-4-5";
const MAX_QUESTION_LENGTH = 300;

// Every real destination the AI is allowed to point someone to — kept as an
// explicit whitelist (rather than letting the model invent a URL) so a
// hallucinated path can never end up as a "link". Hand-written rather than
// imported from src/lib/searchIndex.js — that file (and the blog posts it
// pulls in) imports webpack-only asset loaders (images, a PDF) this
// function's own bundler can't resolve. Keep both in sync by hand if a
// project, page, or blog post is added or removed.
const VALID_LINKS = [
  { label: "Home / About", url: "/" },
  { label: "Work (all projects)", url: "/work" },
  { label: "Wormhole", url: "/wormhole" },
  { label: "Innercast", url: "/mood" },
  { label: "Here I am", url: "/hereiam" },
  { label: "LazyKit", url: "/lazykit" },
  { label: "lazyperm", url: "/lazyperm" },
  { label: "Moksha", url: "/moksha" },
  { label: "Assam Flood Relief", url: "/assamflood2026" },
  { label: "Travel", url: "/travel" },
  { label: "Blog (all posts)", url: "/blog" },
  { label: "Contact", url: "/contactout" },
  { label: "Blog: Building Wormhole", url: "/blog/building-wormhole-p2p-messaging" },
  { label: "Blog: Why I'm Building Innercast", url: "/blog/why-im-building-innercast" },
  { label: "Blog: Why Digitalise Your Coaching Business", url: "/blog/why-digitalise-your-coaching-business" },
  { label: "Blog: Success Point Gogamukh (technical build)", url: "/blog/building-success-point-gogamukh" },
  { label: "Blog: Coaching Center Management System", url: "/blog/coaching-center-management-system" },
  { label: "Blog: The Design Principles Behind lahon.in", url: "/blog/the-design-principles-behind-lahon-in" },
  { label: "Blog: Building AIL", url: "/blog/building-ail" },
];

const PORTFOLIO_FACTS = `
Sourav Lahon — software engineer, personal portfolio at lahon.in.

CURRENT ROLE & EXPERIENCE
- Software Engineer at BlackRock (Jul 2025-present): data transformation
  tools (Perl, Python, SQL), real-time ingestion pipelines (C#, .NET,
  Kafka), automated index creation (cut build time 30 min to 5 min).
- Data Analyst Intern at BlackRock (Jan-Jun 2025): end-to-end automation
  in Python/Pandas/Unix/Streamlit, cut deployment time 90%, automated QC
  reporting across market indexes (-80% manual effort).
- Software Engineer Intern at Microsoft (May-Jul 2024), MSAI-UX team: built
  a Response Debugger, Accessibility Debugger, and Performance Analyzer,
  -30% triage time, +50% performance.

SKILLS
- Languages & Frameworks: React, Node.js, Express, NestJS, C#, .NET, Perl,
  C++, JavaScript, React Native, Flutter.
- Data & ML: Python, Pandas, Streamlit, NLP, Machine Learning, Deep
  Learning, SVM, LSTM.
- Infra & Databases: Kafka, Docker, GitHub Actions, Unix, MongoDB, SQL,
  Redis, Cloudinary.
- Creative: FL Studio, Audacity, Premiere Pro, DaVinci Resolve, Water
  Colour, Graffiti, Ukulele, Figma, Maya 3D, MS Office.
- Personal interests (from the site's Services section): space/astronomy
  (black holes, time travel as a sci-fi concept, parallel universes, Fermi
  paradox), beat production, building dev tools.

TRAVEL (/travel — an interactive map + timeline of places visited)
- Lived in: Gogamukh, Assam (childhood, Class I-V); North Lakhimpur, Assam
  (higher secondary); Silchar, Assam (B.Tech CSE at NIT Silchar); Gurgaon,
  Haryana (current, working at BlackRock); Hyderabad, Telangana (briefly,
  May 2024, during the Microsoft internship).
- Notable trips and a couple of motorcycle trips ("bike" entries) across:
  Arunachal Pradesh (Likabali), Meghalaya (Shillong), Assam (Guwahati,
  Dibrugarh, Tinsukia, Sibsagar, Tezpur), Himachal Pradesh (Mandi, Kasol,
  Kutla, Tosh, Dharamshala, McLeod Ganj, Shimla), Uttarakhand (Kedarnath and
  Rishikesh by bike, Neelkanth Temple, Dehradun), Delhi (including a CJP
  protest), Rajasthan (Jaipur, Udaipur, Chittorgarh, Neemrana, Ajmer — several
  by bike), Uttar Pradesh (Agra, Vrindavan by bike, Varanasi, Mathura), and
  Daman & Mumbai on the west coast.
- The /travel page shows all of this as an interactive India map with a
  timeline, photos, and notes per place.

PROJECTS (page url in parentheses)
- Wormhole (/wormhole): a peer-to-peer encrypted messenger for exactly two
  people. WebRTC for the connection, NaCl (nacl.box) for end-to-end
  encryption, no accounts, no cloud, nothing stored on any server in
  between. QR-code handshake for the first-time key exchange, offline
  message queue with reconnect backoff, encrypted photo/video/voice calls
  negotiated entirely over the WebRTC DataChannel. React Native, ships for
  Android and iPhone. Full build write-up on the blog.
- Innercast (/mood): a private, on-device mental-health journal and mood
  diary. Daily AI check-in, tracks 35 emotions, guided box-breathing and
  5-4-3-2-1 grounding exercises, a triple-arc gauge for 7/30/90-day trends.
  SQLite storage, fully offline and encrypted, built with Expo Router /
  React Native / TypeScript. Android and iOS (iOS coming soon).
- Here I am (/hereiam): a single-button photo-sharing PWA for parents and
  kids — tap once, the photo lands in a shared family feed. Multi-tenant
  (child/parent/owner roles), phone OTP login via Twilio Verify, a family
  join code, a "polaroid reveal" animation, per-parent view tracking, push
  notifications (VAPID), a trial paywall with a WhatsApp unlock flow.
  Express, Postgres, Neon, S3, no build step, plain Node.
- LazyKit (/lazykit): a React design-system component library where you
  file a GitHub issue describing what you want, and Claude AI opens the
  pull request for you — no local terminal or IDE needed. Runs via a
  GitHub Actions workflow, driven by a CLAUDE.md spec, using a Claude
  Pro/Max subscription (no separate pay-per-token API billing). Ships an
  npm package and a VS Code extension listing.
- lazyperm (/lazyperm): a permissions/RBAC library and VS Code extension
  for auditing and gating what Claude Code is allowed to run — stops
  babysitting every permission prompt by defining allow/deny patterns
  (block "sudo rm -rf", "git push --force", "DROP TABLE", etc.), with a
  full decision audit log. Works with VS Code, Cursor, Windsurf, VSCodium;
  listed on the Open VSX marketplace, installable via "npx lazyperm".
- Moksha (/moksha): a small side-project of the heart — direct charity and
  relief giving (e.g. Assam flood relief), with donation matching, no
  committee, no overhead, no paperwork. The name is Sanskrit for release.
- Assam Flood Relief (/assamflood2026): the 2026 monsoon flood-relief
  donation campaign under Moksha — matched rupee-for-rupee, UPI donations,
  acknowledges VKFC, Uttoron, Gogamukh, Lakhimpur, Hip Hop contributors.
  Campaign is closed; the page is a thank-you/acknowledgement page now.
- AVSR (linked from /work): Sourav's thesis project — audio-visual speech
  recognition, multi-modal (audio + video), using MFCCs, CNNs, SVM, Random
  Forest, DNN, and LSTM to improve accuracy in noisy environments.
- Assamesedress.shop (linked from /work): a MERN-stack e-commerce site for
  Assamese traditional attire — product catalogue, shopping cart, checkout.
- Doggies (linked from /work): a Flutter/Android swipe-based dog-breed
  discovery app (gesture navigation, built at a 5-minute hackathon).
- Spend Gate (linked from /work): an impulse-purchase "cooling off" app —
  before a spend, it gives a verdict (buy / wait 72 hours / skip) tied to
  your budget, with bank-export-based savings tracking.
- Success Point Gogamukh / coaching center platform (covered on the blog,
  not a standalone page here): a full coaching-business platform — Next.js
  App Router + Server Actions, Prisma/Postgres schema for live classes,
  phone+OTP verified onboarding with bcrypt password logins, Web Push,
  offline-ready PWA, immutable audit log.

BLOG (/blog — all posts, each also individually linkable)
- "Wormhole: Engineering a Serverless, End-to-End Encrypted Messenger"
  (/blog/building-wormhole-p2p-messaging) — tag: tech. The full technical
  build of Wormhole above.
- "Why I'm Building Innercast" (/blog/why-im-building-innercast) — tag:
  life. Why a private, on-device mood diary, and the thinking behind it.
- "Why It Matters to Digitalise Your Business, Entity, and Identity"
  (/blog/why-digitalise-your-coaching-business) — tag: business. Why a
  signboard and word of mouth aren't enough for coaching centers/schools
  competing for NEET/JEE/ADRE aspirants today.
- "Success Point Gogamukh: The Full Technical Build"
  (/blog/building-success-point-gogamukh) — tag: tech. Full engineering
  breakdown of the coaching-center platform above.
- "A Complete Coaching Center Management System: Website, Dashboards, Live
  Classes, Billing" (/blog/coaching-center-management-system) — tag:
  business. Every feature of the coaching-business "operating system"
  built for Success Point Gogamukh.
- "The Design Principles Behind lahon.in"
  (/blog/the-design-principles-behind-lahon-in) — tag: tech. The design
  rules this very portfolio site follows: one token scale, one page shell,
  motion that has to earn its keep.
- "Building AIL: An AI Assistant You Pay For By The Task"
  (/blog/building-ail) — tag: tech. Why Sourav built AIL — 26 specialised
  AI domains, a prepaid token budget that never expires, no subscription.

CONTACT (/contactout)
- The Contact page shows an interactive business card: email
  (sourav@ + this site's domain), phone/WhatsApp +91 60010 98923, and a
  message form on the back of the card.

RESUME
- A downloadable resume/CV PDF is available via the site's search bar
  (search "resume" or "cv") — there is no dedicated /resume page to link to.
`.trim();

const SYSTEM_PROMPT = `You are a helpful assistant embedded in the search box on Sourav Lahon's portfolio site (lahon.in). You're only shown after someone's search didn't match anything in the site's index, so answer their question about Sourav, his work, skills, projects, blog, or how to contact him, using the facts below.

Keep answers short (2-4 sentences) and conversational, like you're pointing a visitor to the right place. If the question has nothing to do with Sourav or this portfolio, say briefly that you can only help with questions about this site.

Respond with ONLY a JSON object, no other text, in exactly this shape:
{"answer": "your 2-4 sentence answer", "links": [{"label": "short label", "url": "/path"}]}

"links" should have 0-3 entries — only pages genuinely relevant to the question, each with the EXACT "label" and "url" copied verbatim from this list (never invent a url not on this list):
${VALID_LINKS.map((l) => `- ${l.label} -> ${l.url}`).join("\n")}

If nothing on the list is relevant, return an empty links array.

Facts about Sourav and his work:
${PORTFOLIO_FACTS}`;

// Both Groq and Claude are asked for the same {answer, links} JSON shape, so
// this one parser covers both — a model occasionally wraps JSON in prose or
// a code fence despite the instruction not to, so this pulls out the first
// {...} block rather than requiring the whole string to be valid JSON.
// Falls back to treating the raw text as the answer with no links if
// nothing parseable is found, so a slightly-off model reply still degrades
// to a plain-text answer instead of a hard error.
function parseAiJson(raw) {
  const match = raw.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      const parsed = JSON.parse(match[0]);
      if (typeof parsed.answer === "string" && parsed.answer.trim()) {
        const links = Array.isArray(parsed.links)
          ? parsed.links.filter((l) => l && typeof l.url === "string" && VALID_LINKS.some((v) => v.url === l.url)).slice(0, 3)
          : [];
        return { answer: parsed.answer.trim(), links };
      }
    } catch {
      // fall through to the plain-text fallback below
    }
  }
  return raw.trim() ? { answer: raw.trim(), links: [] } : null;
}

async function askGroq(query) {
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: query },
      ],
      max_tokens: 400,
      reasoning_effort: "low",
    }),
    signal: AbortSignal.timeout(12000),
  });
  if (!res.ok) throw new Error(`Groq ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string" || !content.trim()) throw new Error("Groq returned empty content");
  const parsed = parseAiJson(content);
  if (!parsed) throw new Error("Groq returned unparseable content");
  return parsed;
}

async function askClaude(query) {
  const client = new Anthropic();
  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 400,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: query }],
  });
  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock?.text?.trim()) throw new Error("Claude returned empty content");
  const parsed = parseAiJson(textBlock.text);
  if (!parsed) throw new Error("Claude returned unparseable content");
  return parsed;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let query;
  try {
    ({ query } = JSON.parse(event.body || "{}"));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  if (!query || typeof query !== "string" || !query.trim()) {
    return { statusCode: 400, body: JSON.stringify({ error: "Question required" }) };
  }
  if (query.length > MAX_QUESTION_LENGTH) {
    return { statusCode: 400, body: JSON.stringify({ error: "Question is too long" }) };
  }
  const q = query.trim();

  let result = null;
  if (process.env.GROQ_API_KEY) {
    try {
      result = await askGroq(q);
    } catch (e) {
      console.error("Groq failed, falling back to Claude:", e);
    }
  }

  if (!result && process.env.ANTHROPIC_API_KEY) {
    try {
      result = await askClaude(q);
    } catch (e) {
      console.error("Claude fallback also failed:", e);
    }
  }

  if (!result) {
    return { statusCode: 502, body: JSON.stringify({ error: "Couldn't get an answer right now, please try again." }) };
  }

  return { statusCode: 200, body: JSON.stringify(result) };
};
