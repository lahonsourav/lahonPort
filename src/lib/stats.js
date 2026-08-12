import { POSTS } from "../components/blog/posts";
import { CHANGELOG } from "./changelog";

// Keep this in sync with the number of <article> cards in Work.jsx —
// there's no shared data source for that grid to count automatically.
export const PROJECTS_SHIPPED = 11;

export const BLOG_POST_COUNT = POSTS.length;

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const daysSinceLastUpdate = () => {
  const last = new Date(`${CHANGELOG[0].date}T00:00:00`);
  const today = new Date();
  const diff = Math.floor((today - last) / MS_PER_DAY);
  return Math.max(diff, 0);
};
