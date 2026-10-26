import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { SESSION_STORAGE_KEY, sessionReducer } from '@/entities/session';
import { saveToStorage } from '@/shared/lib/storage';
import { baseApi } from '@/shared/api/baseApi';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

let prevSession = store.getState().session;

store.subscribe(() => {
  const { session } = store.getState();
  if (session !== prevSession) {
    prevSession = session;
    saveToStorage(SESSION_STORAGE_KEY, session.user);
  }
});
