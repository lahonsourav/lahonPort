import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { POSTS } from './posts';
import './blog.css';

const TAG_COLORS = {
  life:   '#7ee787',
  tech:   '#58a6ff',
  space:  '#a371f7',
  travel: '#e3b341',
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
          {post.content.map((para, i) => {
            const spaceIdx = para.indexOf(' ');
            const first = spaceIdx === -1 ? para : para.slice(0, spaceIdx);
            const rest  = spaceIdx === -1 ? ''   : para.slice(spaceIdx);
            return (
              <p key={i}>
                <span className="blog-para-tag">{first}</span>{rest}
              </p>
            );
          })}
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
