import React from "react";
import { useNavigate } from "react-router-dom";
import { POSTS } from "./posts";
import "./blog.css";

const TAG_COLORS = {
  life:     '#7ee787',
  tech:     '#58a6ff',
  space:    '#a371f7',
  travel:   '#e3b341',
  business: '#f0883e',
};

const blockText = (b) =>
  typeof b === 'string'
    ? b
    : [b.text, ...(b.items ?? []), ...(b.head ?? []), ...(b.rows ?? []).flat()].filter(Boolean).join(' ');

const readMins = (content) => Math.max(1, Math.round(content.map(blockText).join(' ').split(/\s+/).length / 200));

const FeaturedBlogs = () => {
  const navigate = useNavigate();
  const featured = [...POSTS]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <section id="blog-preview">
      <h5 data-aos="fade-down">fresh off the press</h5>

      <h2 data-aos="fade-down" data-aos-delay="100">From the Blog</h2>

      <div className="container blogpreview__list">
        {featured.map(({ slug, title, date, tag, content }, i) => (
          <div
            key={slug}
            data-aos="fade-up"
            data-aos-delay={i * 80}
            className="blogpreview__row"
            onClick={() => navigate(`/blog/${slug}`)}
            role="button"
            style={{ '--card-accent': TAG_COLORS[tag] ?? '#7ee787' }}
          >
            {tag && (
              <span
                className="blog-tag blogpreview__row-tag"
                style={{ color: TAG_COLORS[tag] ?? '#7ee787', borderColor: (TAG_COLORS[tag] ?? '#7ee787') + '55' }}
              >
                {tag}
              </span>
            )}
            <span className="blogpreview__row-title">{title}</span>
            <span className="blogpreview__row-meta">{date} · {readMins(content)} min</span>
            <span className="blogpreview__row-arrow">→</span>
          </div>
        ))}
      </div>

      <div
        data-aos="fade-up"
        onClick={() => navigate("/blog")}
        className="btn btn-primary blogpreview__cta"
      >
        Read more blogs
      </div>
    </section>
  );
};

export default FeaturedBlogs;
