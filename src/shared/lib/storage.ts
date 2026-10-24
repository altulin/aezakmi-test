// Safe wrappers around localStorage: access can throw in private mode,
// when storage is full or disabled, and stored JSON may be corrupted.

export const loadFromStorage = <T>(key: string): T | null => {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? null : (JSON.parse(raw) as T);
  } catch {
    return null;
  }
};

export const saveToStorage = (key: string, value: unknown): void => {
  try {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch {
    // Storage is unavailable — the app keeps working, the state just won't persist.
  }
};
