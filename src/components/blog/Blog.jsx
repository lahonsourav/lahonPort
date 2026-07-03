import React from 'react';
import { useNavigate } from 'react-router-dom';
import { POSTS } from './posts';
import './blog.css';

const TAG_COLORS = {
  life:   '#7ee787',
  tech:   '#58a6ff',
  space:  '#a371f7',
  travel: '#e3b341',
};

const readMins = (content) => Math.max(1, Math.round(content.join(' ').split(/\s+/).length / 200));

const PostCard = ({ slug, title, date, tag, excerpt, content }) => {
  const navigate = useNavigate();
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
      </div>
      <h2 className="blog-card-title">{title}</h2>
      <p className="blog-card-excerpt">{excerpt}</p>
      <span className="blog-card-read">Read →</span>
    </div>
  );
};

const Blog = () => {
  const navigate = useNavigate();
  return (
  <div className="blog-page">
    <div className="blog-topbar">
      <button className="blog-back" onClick={() => navigate('/')}>← Back</button>
    </div>
    <div className="blog-hero">
      <h1 className="blog-hero-title">Blog</h1>
      <p className="blog-hero-sub">Stories, thoughts, and things worth writing down.</p>
    </div>

    <div className="blog-content">
      {POSTS.length > 0 ? (
        <div className="blog-list">
          {POSTS.map(p => <PostCard key={p.slug} {...p} />)}
        </div>
      ) : (
        <div className="blog-empty">
          <span className="blog-empty-icon">✍️</span>
          <p className="blog-empty-text">First story coming soon.</p>
        </div>
      )}
    </div>
  </div>
  );
};

export default Blog;
