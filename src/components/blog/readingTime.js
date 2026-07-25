const blockText = (b) =>
  typeof b === 'string'
    ? b
    : [b.text, ...(b.items ?? []), ...(b.head ?? []), ...(b.rows ?? []).flat()].filter(Boolean).join(' ');

export const readMins = (content) => Math.max(1, Math.round(content.map(blockText).join(' ').split(/\s+/).length / 200));
