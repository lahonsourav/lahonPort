import { POSTS } from "../components/blog/posts";
import { blockText } from "../components/blog/readingTime";
import resumePdf from "../assets/resume.pdf";

const PAGES = [
  { title: "Blog", url: "/blog", type: "page", keywords: "posts writing articles stories" },
  {
    title: "Work",
    url: "/work",
    type: "page",
    keywords:
      "everything I've built projects portfolio Wormhole Innercast AVSR Success Point Gogamukh " +
      "Assamesedress.shop Doggies Here I am LazyKit lazyperm Spend Gate audio-visual speech recognition thesis " +
      "swipe dog discovery Flutter Android e-commerce Assamese traditional attire MERN impulse buys budgets",
  },
  {
    title: "Moksha",
    url: "/moksha",
    type: "page",
    keywords:
      "initiatives charity giving Assam flood relief a small side-project of the heart release Sanskrit " +
      "help people directly no committee no overhead no paperwork double your donation matched rupee for rupee",
  },
  {
    title: "Assam Flood Relief",
    url: "/assamflood2026",
    type: "page",
    keywords:
      "donation campaign flood Assam matching double your donation drive matched rupee for rupee UPI " +
      "donations closed thank you monsoon 2026 VKFC acknowledgement Uttoron Gogamukh Lakhimpur Hip Hop",
  },
  {
    title: "Wormhole",
    url: "/wormhole",
    type: "project",
    keywords:
      "P2P peer to peer messenger messaging app exactly two people WebRTC NaCl encryption end-to-end " +
      "encrypted no accounts no cloud no servers in between Android iPhone download APK secret word " +
      "QR code scan handshake trust tunnel offline queue photos voice video calls TURN relay signaling " +
      "server privacy honest about the limits MITM man in the middle defense safety number React Native serverless",
  },
  {
    title: "Innercast",
    url: "/mood",
    type: "project",
    keywords:
      "mental health journal mood diary AI check-in private on-device 35 emotions daily Claude AI writes " +
      "journal entry box breathing 5-4-3-2-1 grounding body scan gratitude practice wellbeing tools patterns " +
      "triple-arc gauge insights trends 7 30 90 days privacy SQLite offline encrypted Expo Router push " +
      "notifications Android iOS coming soon React Native TypeScript",
  },
  {
    title: "Here I am",
    url: "/hereiam",
    type: "project",
    keywords:
      "photo sharing app parents kids family single button tap for a photo installable PWA multi-tenant " +
      "child parent owner dashboard phone OTP Twilio Verify family code polaroid reveal pin a photo " +
      "reactions per-parent view tracking push notifications VAPID trial paywall WhatsApp unlock " +
      "Express Postgres Neon S3 no build step Node",
  },
  {
    title: "LazyKit",
    url: "/lazykit",
    type: "project",
    keywords:
      "react design system component library drop an issue get a PR Claude AI GitHub repo issue to " +
      "pull request npx init GitHub Actions workflow CLAUDE.md OAuth token Claude Pro Max subscription " +
      "no pay per token API billing branch protection auto-merge npm VS Code no laptop no terminal no IDE",
  },
  {
    title: "lazyperm",
    url: "/lazyperm",
    type: "project",
    keywords:
      "permissions rbac library stop babysitting Claude Code permission prompts hook safe patterns deny " +
      "patterns git status npm test allow block sudo rm rf git push force DROP TABLE decisions log audit " +
      "npx lazyperm VS Code extension Windsurf Cursor VSCodium Open VSX marketplace",
  },
  { title: "Contact", url: "/contactout", type: "page", keywords: "email reach out get in touch" },
  { title: "Resume", url: resumePdf, type: "file", keywords: "cv download pdf experience education skills" },
  {
    title: "AVSR",
    url: "/work",
    type: "project",
    keywords:
      "audio-visual speech recognition thesis multi-modal MFCCs CNNs SVM Random Forest DNN LSTM " +
      "machine learning noisy environments accuracy",
  },
  {
    title: "Assamesedress.shop",
    url: "/work",
    type: "project",
    keywords: "e-commerce Assamese traditional attire heritage fashion MERN stack product catalogue shopping cart checkout",
  },
  {
    title: "Doggies",
    url: "/work",
    type: "project",
    keywords: "swipe based dog discovery app breeds Flutter Android gesture navigation 5minhack",
  },
  {
    title: "Spend Gate",
    url: "/work",
    type: "project",
    keywords: "spending gate impulse buys verdict buy wait 72 hours skip budgets bank export savings",
  },
];

export const SEARCH_INDEX = [
  ...PAGES,
  ...POSTS.map((p) => ({
    title: p.title,
    url: `/blog/${p.slug}`,
    type: "blog",
    keywords: `${p.excerpt} ${p.tag} ${p.content.map(blockText).join(" ")}`,
  })),
];
