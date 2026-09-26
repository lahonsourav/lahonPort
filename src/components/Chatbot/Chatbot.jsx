import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdChatBubbleOutline, MdClose, MdSend } from "react-icons/md";
import { playClick } from "../../lib/sound";
import "./Chatbot.css";

const STORAGE_KEY = "chatbotMessages";
const GREETING = "Hey, I'm Sourav. Ask me anything about my work, projects, or blog.";

// Session-only: survives a refresh or route change, gone when the tab closes.
const loadMessages = () => {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const Chatbot = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(loadMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // storage unavailable (private mode etc.) — chat still works, just unsaved
    }
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading, error, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/.netlify/functions/search-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Only role + text go up — the links are UI-only.
        body: JSON.stringify({ messages: next.map(({ role, content }) => ({ role, content })) }),
      });
      // A non-JSON body means the function isn't being served (plain `npm start`).
      const data = await res.json().catch(() => null);
      if (!data) throw new Error("Chat isn't available right now, please try again later.");
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setMessages([...next, { role: "assistant", content: data.answer, links: data.links || [] }]);
    } catch (e) {
      setError(e.message || "Couldn't get an answer right now, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send();
    }
  };

  const clear = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <>
      {open && (
        <div className="chatbot__panel" role="dialog" aria-label="Chat with Sourav">
          <div className="chatbot__header">
            <span className="chatbot__title">Ask me anything</span>
            {messages.length > 0 && (
              <button type="button" className="chatbot__clear" onClick={clear}>
                Clear
              </button>
            )}
            <button
              type="button"
              className="chatbot__close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <MdClose />
            </button>
          </div>

          <div className="chatbot__messages" ref={listRef} aria-live="polite">
            <div className="chatbot__msg chatbot__msg--assistant">{GREETING}</div>
            {messages.map((m, i) => (
              <div key={i} className={`chatbot__msg chatbot__msg--${m.role}`}>
                <p>{m.content}</p>
                {m.links?.length > 0 && (
                  <div className="chatbot__links">
                    {m.links.map((link) => (
                      <button
                        key={link.url}
                        type="button"
                        className="chatbot__link"
                        onClick={() => {
                          playClick();
                          navigate(link.url);
                          setOpen(false);
                        }}
                      >
                        {link.label} →
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="chatbot__msg chatbot__msg--assistant chatbot__typing" aria-label="Typing">
                <span />
                <span />
                <span />
              </div>
            )}
            {error && <div className="chatbot__error">{error}</div>}
          </div>

          <div className="chatbot__composer">
            <input
              ref={inputRef}
              type="text"
              className="chatbot__input"
              placeholder="Type a message"
              value={input}
              maxLength={300}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Message"
            />
            <button
              type="button"
              className="chatbot__send"
              onClick={send}
              disabled={loading || !input.trim()}
              aria-label="Send"
            >
              <MdSend />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        className="chatbot__trigger"
        onClick={() => {
          playClick();
          setOpen((o) => !o);
        }}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        title="Chat with me"
      >
        {open ? <MdClose /> : <MdChatBubbleOutline />}
      </button>
    </>
  );
};

export default Chatbot;
