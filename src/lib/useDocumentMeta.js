import { useEffect } from 'react';

const META_SELECTORS = {
  description: 'meta[name="description"]',
  ogTitle: 'meta[property="og:title"]',
  ogDescription: 'meta[property="og:description"]',
  twitterTitle: 'meta[name="twitter:title"]',
  twitterDescription: 'meta[name="twitter:description"]',
};

/**
 * Overrides document.title and the description/OG/Twitter meta tags for as
 * long as the calling component is mounted, restoring the previous values on
 * unmount. index.html only ships one static set of tags, so every route
 * otherwise shares the same title/description regardless of what's on it.
 */
export default function useDocumentMeta({ title, description }) {
  useEffect(() => {
    if (!title && !description) return;

    const previousTitle = document.title;
    const previousContent = {};

    if (title) document.title = title;

    Object.entries(META_SELECTORS).forEach(([key, selector]) => {
      const isTitleTag = key === 'ogTitle' || key === 'twitterTitle';
      const value = isTitleTag ? title : description;
      if (!value) return;
      const el = document.querySelector(selector);
      if (!el) return;
      previousContent[key] = el.getAttribute('content');
      el.setAttribute('content', value);
    });

    return () => {
      document.title = previousTitle;
      Object.entries(previousContent).forEach(([key, content]) => {
        const el = document.querySelector(META_SELECTORS[key]);
        if (el && content != null) el.setAttribute('content', content);
      });
    };
  }, [title, description]);
}
