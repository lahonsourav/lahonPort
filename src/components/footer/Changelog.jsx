import React from "react";
import { CHANGELOG } from "../../lib/changelog";

const Changelog = () => (
  <div className="changelog">
    <p className="changelog__label">Recently</p>
    <ul className="changelog__list">
      {CHANGELOG.map(({ date, text }) => (
        <li key={date + text}>
          <span className="changelog__date">{date}</span>
          <span className="changelog__text">{text}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Changelog;
