export const TABLET_MAX_WIDTH = 1199.98;
export const MOBILE_MAX_WIDTH = 767.98;

export const TABLET_QUERY = `(max-width: ${TABLET_MAX_WIDTH}px)`;
export const MOBILE_QUERY = `(max-width: ${MOBILE_MAX_WIDTH}px)`;

export const matchesMedia = (query: string): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia(query).matches;
