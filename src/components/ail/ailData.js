// Content ported from ail's own homepage (app/page.tsx in the ai repo) —
// same product, same facts, kept here as plain data so Ail.jsx can render
// the full page structure without depending on that repo at build time.

export const DOMAIN_GROUPS = [
  {
    label: "General",
    desc: "One flexible AI for everything else — quick questions, brainstorming, anything that doesn't need a specialist.",
    domains: ["General Chat"],
  },
  {
    label: "For students & academics",
    desc: "From thesis chapters to exam prep, each one is tuned for academic writing and citation-aware structure.",
    domains: [
      "Thesis / Dissertation", "Research Report", "Exam Prep", "School Assignments",
      "Academic Emails", "OA Coding Round", "Resume & Cover Letter", "Book Review", "Data Analysis",
    ],
  },
  {
    label: "For professionals",
    desc: "Resumes, pitches, technical docs, and interview prep — written the way hiring managers and clients expect.",
    domains: [
      "Resume & Cover Letter", "Interview Prep", "Business Content", "Technical Writing",
      "Speeches & Keynotes", "Startup Pitch", "OA Coding Round", "Data Analysis",
    ],
  },
  {
    label: "For legal, medical & government",
    desc: "Careful, disclaimer-aware drafting for sensitive documents — always meant to be reviewed by a professional before use.",
    domains: ["Legal Review", "Medical Summary", "Government Forms", "Data Analysis"],
  },
  {
    label: "For content creators",
    desc: "Captions, scripts, and bios tuned for each platform's format and audience.",
    domains: ["Social Media", "Social Bio & Branding", "Poetry & Shayari", "Podcast Scripts", "Film & Story Analysis", "WhatsApp Business"],
  },
  {
    label: "Language & culture",
    desc: "Translation and culturally-aware writing that goes beyond literal word-for-word conversion.",
    domains: ["Translation", "Matrimonial Profile"],
  },
];

export const STEPS = [
  {
    title: "Pick a domain",
    desc: "26 specialised writing domains: thesis, resume, legal review, shayari, government forms, and more.",
  },
  {
    title: "Try it free",
    desc: "Every domain gives 5 free AI responses. No credit card required. Judge the quality before spending anything.",
  },
  {
    title: "Buy what you need",
    desc: "Purchase a token-budget package for that specific task. Chat until the work is done. Tokens never expire.",
  },
];

export const WHY = [
  {
    title: "No subscription trap",
    desc: "Pay only for the task in front of you — no monthly charges draining a wallet during the months you don't need AI help.",
  },
  {
    title: "Unlimited revisions",
    desc: "Go back and forth as many times as needed within a token budget — no per-message charges, no revision limits.",
  },
  {
    title: "Your data stays yours",
    desc: "Conversations are never used to train AI models. BYO API keys are encrypted at rest with AES-256-GCM.",
  },
  {
    title: "Localised by default",
    desc: "Responds in your country's context (Indian English, Nepali laws, UAE currency) based on your location at signup.",
  },
  {
    title: "Best-in-class models",
    desc: "Fast (Haiku), balanced (Sonnet), or most capable (Opus) — matched to the task automatically.",
  },
  {
    title: "Upload your documents",
    desc: "Attach PDFs, Word files, and images. The AI reads the document and works from it directly in the conversation.",
  },
];

export const FEATURES = [
  {
    title: "Bring your own RAG",
    desc: "Connect your own retrieval endpoint and the AI pulls in private documents or a knowledge base as context before it answers — your data stays wherever you host it.",
  },
  {
    title: "ATS resume score & job match",
    desc: "For Resume & Cover Letter: a built-in checklist scores structure and phrasing, then checks how many keywords from a pasted job description already appear in the draft.",
  },
  {
    title: "One-click citations",
    desc: "For thesis, research, and academic domains: generate a properly formatted APA, MLA, or Chicago citation for any source without leaving the conversation.",
  },
  {
    title: "Control how much context you send",
    desc: "Choose how much conversation history feeds each response — low, mid, high, max, or a custom window — trading recall for lower token cost.",
  },
  {
    title: "Bring your own API key, anytime",
    desc: "Flip on a personal Anthropic key mid-conversation to pay for generation directly instead of the token budget, and turn it off just as easily.",
  },
  {
    title: "Export & share, safely",
    desc: "Download any conversation as PDF or Word, or share a read-only link that auto-expires after 24 hours.",
  },
];

export const FAQS = [
  {
    q: "What is ail?",
    a: "A pay-per-task AI writing platform. Instead of a monthly subscription you'll barely use, you buy a package for a specific task (thesis writing, resume, legal review, coding help) and the AI works within that budget.",
  },
  {
    q: "How does the token budget work?",
    a: "Each package comes with a token budget. Every message sent and every reply received consumes tokens from it. Unlimited back-and-forth until the budget runs out — no artificial revision limit.",
  },
  {
    q: "Do tokens or credits expire?",
    a: "No. Once purchased, a token budget is yours indefinitely — start a conversation today, continue it months later. Same for BYO platform credits.",
  },
  {
    q: "What is the free trial?",
    a: "Every one of the 26 domains gives 5 free AI responses to test before buying. No credit card required.",
  },
  {
    q: "What is the 'Bring Your Own Key' plan?",
    a: "Use an existing Anthropic API key and pay only a small platform fee per conversation, bought in credit packs. The key is stored encrypted and used only for that user's own requests.",
  },
  {
    q: "Which AI model powers ail?",
    a: "Best-in-class language models, tiered by package: a fast model on Basic, a smarter model on Standard, and the most capable model on Premium.",
  },
  {
    q: "Is data private and secure?",
    a: "Conversations are stored securely and never used to train any AI model. BYO API keys are encrypted with AES-256-GCM before storage.",
  },
  {
    q: "Can one package cover multiple conversations?",
    a: "Each purchase opens one conversation in that domain, so the AI keeps full context of that piece of work. A separate new project in the same domain needs a new package.",
  },
  {
    q: "What payment methods are accepted?",
    a: "Razorpay — UPI, credit/debit cards, net banking, and EMI options.",
  },
];
