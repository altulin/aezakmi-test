import { configureStore } from '@reduxjs/toolkit';

import { SESSION_STORAGE_KEY, sessionReducer } from '@/entities/session';
import { saveToStorage } from '@/shared/lib/storage';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
});

// Persist the session: write to localStorage only when the slice actually changed.
// Reference comparison works because RTK returns the same object for an untouched slice.
let prevSession = store.getState().session;

store.subscribe(() => {
  const { session } = store.getState();
  if (session !== prevSession) {
    prevSession = session;
    saveToStorage(SESSION_STORAGE_KEY, session.user);
  }
});
