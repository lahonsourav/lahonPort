import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch, MdSend } from "react-icons/md";
import { SEARCH_INDEX } from "../../lib/searchIndex";
import { playClick } from "../../lib/sound";
import { unlock } from "../../lib/achievements";
import "./header.css";

const PHRASES = [
  "an engineer who loves Space",
  "a beats producer & musician",
  "building tools for devs",
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 5) return "Still up? I'm";
  if (hour < 12) return "Good morning, I'm";
  if (hour < 17) return "Good afternoon, I'm";
  if (hour < 21) return "Good evening, I'm";
  return "Still up? I'm";
};

const TYPE_LABELS = {
  page: "page",
  project: "project",
  blog: "blog",
  file: "file",
};

const HeroSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const wrapRef = useRef(null);

  // "Ask AI" fallback for when the keyword search below comes up empty —
  // proxied through a Netlify Function (netlify/functions/search-ai.js) so
  // the Groq key never reaches the browser bundle.
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnswer, setAiAnswer] = useState(null);
  const [aiError, setAiError] = useState(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX
      .filter((item) => item.title.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q))
      .slice(0, 7);
  }, [query]);

  useEffect(() => setActiveIdx(0), [query]);

  // A new search invalidates whatever the AI answered for the last one.
  useEffect(() => {
    setAiAnswer(null);
    setAiError(null);
  }, [query]);

  const askAi = async () => {
    const q = query.trim();
    if (!q || aiLoading) return;
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await fetch("/.netlify/functions/search-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      // A non-JSON body (e.g. the SPA's index.html when the Netlify function
      // isn't served, like under plain `npm start`) shouldn't leak a parse error.
      const data = await res.json().catch(() => null);
      if (!data) throw new Error("AI search isn't available right now, please try again later.");
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setAiAnswer({ answer: data.answer, links: data.links || [] });
    } catch (e) {
      setAiError(e.message || "Couldn't get an answer right now, please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim()) unlock("curious");
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  const go = (item) => {
    if (!item) return;
    playClick();
    if (item.type === "file") {
      window.open(item.url, "_blank", "noreferrer");
    } else {
      navigate(item.url);
    }
    setQuery("");
    setOpen(false);
  };

  const onKeyDown = (e) => {
    // No keyword matches: the send button is showing, so Enter does the same.
    if (!results.length) {
      if (e.key === "Enter" && query.trim()) {
        e.preventDefault();
        askAi();
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[activeIdx]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="hero-search" ref={wrapRef}>
      <div className="hero-search__box">
        <MdSearch className="hero-search__icon" />
        <input
          type="text"
          className="hero-search__input"
          placeholder="Ask me anything"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          aria-label="Search the site"
        />
        {/* Only appears once typing has produced zero keyword matches —
            no "no matches" text, just a quiet way to hand the question to
            AI instead. */}
        {query.trim() && results.length === 0 && (
          <button
            type="button"
            className="hero-search__send"
            onClick={askAi}
            disabled={aiLoading}
            aria-label="Ask AI"
            title="Ask AI"
          >
            {aiLoading ? <span className="hero-search__spinner" /> : <MdSend />}
          </button>
        )}
      </div>

      {open && query.trim() && (results.length > 0 || aiAnswer || aiError) && (
        <div className="hero-search__results" role="listbox">
          {results.length > 0 ? (
            results.map((item, i) => (
              <div
                key={item.url + item.title}
                role="option"
                aria-selected={i === activeIdx}
                className={`hero-search__result${i === activeIdx ? " hero-search__result--active" : ""}`}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => go(item)}
              >
                <span className="hero-search__result-title">{item.title}</span>
                <span className="hero-search__result-type">{TYPE_LABELS[item.type]}</span>
              </div>
            ))
          ) : aiAnswer ? (
            <div className="hero-search__ai-answer">
              <p>{aiAnswer.answer}</p>
              {aiAnswer.links.length > 0 && (
                <div className="hero-search__ai-links">
                  {aiAnswer.links.map((link) => (
                    <button
                      key={link.url}
                      type="button"
                      className="hero-search__ai-link"
                      onClick={() => {
                        playClick();
                        navigate(link.url);
                        setQuery("");
                        setOpen(false);
                      }}
                    >
                      {link.label} →
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="hero-search__ai-error">{aiError}</div>
          )}
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [erasing, setErasing] = useState(false);
  const [greeting] = useState(getGreeting);

  useEffect(() => {
    const phrase = PHRASES[phraseIdx];
    let t;

    if (!erasing && charIdx < phrase.length) {
      t = setTimeout(() => {
        setDisplayed(phrase.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      }, 75);
    } else if (!erasing) {
      t = setTimeout(() => setErasing(true), 2200);
    } else if (charIdx > 0) {
      t = setTimeout(() => {
        setCharIdx(c => c - 1);
        setDisplayed(phrase.slice(0, charIdx - 1));
      }, 35);
    } else {
      setErasing(false);
      setPhraseIdx(i => (i + 1) % PHRASES.length);
    }

    return () => clearTimeout(t);
  }, [charIdx, erasing, phraseIdx]);

  return (
    <header id="header">
      <div className="header__containerpc">
        <h5>{greeting}</h5>
        <h1>
          LA<span className="h">H</span>ON
        </h1>
        <div className="wrapper2">
          <div className="typing-demo">{displayed}</div>
        </div>
        <HeroSearch />
      </div>
    </header>
  );
};

export default Header;
