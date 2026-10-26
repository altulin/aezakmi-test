const TAG_COLORS = ['purple', 'blue', 'red'] as const;

export type TagColor = (typeof TAG_COLORS)[number];

const KNOWN_TAG_COLORS: Record<string, TagColor> = {
  design: 'purple',
  frontend: 'blue',
  urgent: 'red',
};

export const getTagColor = (tag: string): TagColor => {
  const normalized = tag.trim().toLowerCase();
  const known = KNOWN_TAG_COLORS[normalized];
  if (known) {
    return known;
  }

  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
  }
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
};
