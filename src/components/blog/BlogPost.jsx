import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { POSTS } from './posts';
import MermaidDiagram from './MermaidDiagram';
import './blog.css';

const TAG_COLORS = {
  life:   '#7ee787',
  tech:   '#58a6ff',
  space:  '#a371f7',
  travel: '#e3b341',
};

// Posts hold either plain-string paragraphs or typed blocks
// ({ type: 'h2' | 'h3' | 'diagram' | 'table' | 'list' | 'note' }).
// 'diagram' blocks hold Mermaid syntax, rendered via MermaidDiagram.
const renderBlock = (block, i) => {
  if (typeof block === 'string') {
    const spaceIdx = block.indexOf(' ');
    const first = spaceIdx === -1 ? block : block.slice(0, spaceIdx);
    const rest  = spaceIdx === -1 ? ''    : block.slice(spaceIdx);
    return (
      <p key={i}>
        <span className="blog-para-tag">{first}</span>{rest}
      </p>
    );
  }

  switch (block.type) {
    case 'h2':
      return <h2 key={i} className="blog-h2">{block.text}</h2>;
    case 'h3':
      return <h3 key={i} className="blog-h3">{block.text}</h3>;
    case 'diagram':
      return (
        <figure key={i} className="blog-figure blog-figure--diagram">
          {block.title && <figcaption>{block.title}</figcaption>}
          <MermaidDiagram chart={block.text} />
        </figure>
      );
    case 'table':
      return (
        <div key={i} className="blog-table-wrap">
          <table className="blog-table">
            <thead>
              <tr>{block.head.map((h, hi) => <th key={hi}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'list':
      return (
        <ul key={i} className="blog-list-block">
          {block.items.map((item, li) => <li key={li}>{item}</li>)}
        </ul>
      );
    case 'note':
      return <div key={i} className="blog-note">{block.text}</div>;
    default:
      return null;
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = POSTS.find(p => p.slug === slug);

  React.useEffect(() => {
    if (!slug) return;
    const key = `blog_reads_${slug}`;
    const n = parseInt(localStorage.getItem(key) || '0', 10);
    localStorage.setItem(key, n + 1);
  }, [slug]);

  if (!post) {
    return (
      <div className="blog-page">
        <div className="blog-post-wrap">
          <button className="blog-back" onClick={() => navigate('/blog')}>← Blog</button>
          <p className="blog-not-found">Story not found.</p>
        </div>
      </div>
    );
  }

  const tagColor = TAG_COLORS[post.tag] ?? '#7ee787';

  return (
    <div className="blog-page">
      <div className="blog-post-wrap">
        <button className="blog-back" onClick={() => navigate('/blog')}>← Blog</button>

        <div className="blog-post-header">
          {post.tag && (
            <span className="blog-tag" style={{ color: tagColor, borderColor: tagColor + '55' }}>
              {post.tag}
            </span>
          )}
          <span className="blog-date">{post.date}</span>
        </div>

        <h1 className="blog-post-title">{post.title}</h1>

        <div className="blog-post-body" style={{ '--tag-color': tagColor }}>
          {post.content.map((block, i) => renderBlock(block, i))}
        </div>

        {post.projectUrl && (
          <Link to={post.projectUrl} className="blog-project-link">
            {post.projectLabel ?? 'View project →'}
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
