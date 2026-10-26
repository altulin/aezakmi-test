const TAG_COLORS = ['purple', 'blue', 'red'] as const;

export type TagColor = (typeof TAG_COLORS)[number];

export const getTagColor = (tag: string): TagColor => {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % TAG_COLORS.length;
  return TAG_COLORS[index];
};
