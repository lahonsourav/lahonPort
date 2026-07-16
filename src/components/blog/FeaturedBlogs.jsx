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

      <div className="container blogpreview__container">
        {featured.map(({ slug, title, date, tag, excerpt }, i) => (
          <div
            key={slug}
            data-aos="zoom-in-up"
            data-aos-delay={i * 100}
            className="blog-card"
            onClick={() => navigate(`/blog/${slug}`)}
            role="button"
            style={{ '--card-accent': TAG_COLORS[tag] ?? '#7ee787' }}
          >
            <div className="blog-card-meta">
              {tag && (
                <span
                  className="blog-tag"
                  style={{ color: TAG_COLORS[tag] ?? '#7ee787', borderColor: (TAG_COLORS[tag] ?? '#7ee787') + '55' }}
                >
                  {tag}
                </span>
              )}
              <span className="blog-date">{date}</span>
            </div>
            <h2 className="blog-card-title">{title}</h2>
            <p className="blog-card-excerpt">{excerpt}</p>
            <span className="blog-card-read">Read →</span>
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
