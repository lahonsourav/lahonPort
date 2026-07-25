import { POSTS } from "./components/blog/posts";
import resumePdf from "./assets/resume.pdf";

const PAGES = [
  { title: "Blog", url: "/blog", type: "page", keywords: "posts writing articles stories" },
  { title: "Work", url: "/work", type: "page", keywords: "projects portfolio" },
  { title: "Moksha", url: "/moksha", type: "page", keywords: "initiatives charity giving assam flood relief" },
  { title: "Assam Flood Relief", url: "/assam-flood", type: "page", keywords: "donation campaign flood assam matching" },
  { title: "Wormhole", url: "/wormhole", type: "project", keywords: "p2p encrypted messenger webrtc chat app react native" },
  { title: "Innercast", url: "/mood", type: "project", keywords: "mental health journal mood diary ai check-in" },
  { title: "LazyKit", url: "/lazykit", type: "project", keywords: "react design system component library" },
  { title: "LazyPerm", url: "/lazyperm", type: "project", keywords: "permissions rbac library" },
  { title: "Success Point Gogamukh", url: "/success-point-gogamukh", type: "project", keywords: "coaching center website nextjs" },
  { title: "Contact", url: "/contactout", type: "page", keywords: "email reach out get in touch" },
  { title: "Resume", url: resumePdf, type: "file", keywords: "cv download pdf experience" },
];

export const SEARCH_INDEX = [
  ...PAGES,
  ...POSTS.map((p) => ({
    title: p.title,
    url: `/blog/${p.slug}`,
    type: "blog",
    keywords: `${p.excerpt} ${p.tag}`,
  })),
];
