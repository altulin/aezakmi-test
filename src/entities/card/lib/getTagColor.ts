const TAG_COLORS = ['purple', 'blue', 'red'] as const;

export type TagColor = (typeof TAG_COLORS)[number];

// Tags from the mockup keep their mockup colors
const KNOWN_TAG_COLORS: Record<string, TagColor> = {
  design: 'purple',
  frontend: 'blue',
  urgent: 'red',
};

// Any other tag gets a color from a hash of its name, so the same tag
// always has the same color and doesn't change when other tags are removed
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
