import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { POSTS } from './posts';
import { readMins } from './readingTime';
import BackHome from '../shared/BackHome';
import './blog.css';

const TAG_COLORS = {
  life:     '#7ee787',
  tech:     '#58a6ff',
  space:    '#a371f7',
  travel:   '#e3b341',
  business: '#f0883e',
};

const PostCard = ({ slug, title, date, tag, excerpt, content }) => {
  const navigate = useNavigate();
  const reads = parseInt(localStorage.getItem(`blog_reads_${slug}`) || '0', 10);
  return (
    <div className="blog-card" onClick={() => navigate(`/blog/${slug}`)} role="button" style={{ '--card-accent': TAG_COLORS[tag] ?? '#7ee787' }}>
      <div className="blog-card-meta">
        {tag && (
          <span className="blog-tag" style={{ color: TAG_COLORS[tag] ?? '#7ee787', borderColor: (TAG_COLORS[tag] ?? '#7ee787') + '55' }}>
            {tag}
          </span>
        )}
        <span className="blog-date">{date}</span>
        <span className="blog-read-time">{readMins(content)} min read</span>
        {reads > 0 && <span className="blog-reads">{reads} {reads === 1 ? 'read' : 'reads'}</span>}
      </div>
      <h2 className="blog-card-title">{title}</h2>
      <p className="blog-card-excerpt">{excerpt}</p>
      <span className="blog-card-read">Read →</span>
    </div>
  );
};

const Blog = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return POSTS;
    return POSTS.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      (p.tag ?? '').toLowerCase().includes(q)
    );
  }, [query]);

  return (
  <div className="blog-page">
    <div className="blog-topbar">
      <BackHome className="blog-back" />
    </div>
    <div className="blog-hero">
      <h1 className="blog-hero-title">Blog</h1>
      <p className="blog-hero-sub">Stories, thoughts, and things worth writing down.</p>
    </div>

    <div className="blog-content">
      {POSTS.length > 0 && (
        <div className="blog-search-wrap">
          <input
            type="text"
            className="blog-search"
            placeholder="Search posts by title, tag, or topic…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search blog posts"
          />
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="blog-list">
          {filtered.map(p => <PostCard key={p.slug} {...p} />)}
        </div>
      ) : (
        <div className="blog-empty">
          <span className="blog-empty-icon">{POSTS.length > 0 ? '🔍' : '✍️'}</span>
          <p className="blog-empty-text">
            {POSTS.length > 0 ? 'No posts match your search.' : 'First story coming soon.'}
          </p>
        </div>
      )}
    </div>
  </div>
  );
};

export default Blog;
