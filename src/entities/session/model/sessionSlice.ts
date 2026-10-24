import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { loadFromStorage } from '@/shared/lib/storage';

export type User = { email: string };
type SessionState = { user: User | null };

export const SESSION_STORAGE_KEY = 'session';

const initialState: SessionState = {
  user: loadFromStorage<User>(SESSION_STORAGE_KEY),
};

const sessionSlice = createSlice({
  name: 'session',

  initialState,

  reducers: {
    setSession: (state, action: PayloadAction<string>) => {
      state.user = { email: action.payload };
    },
    clearSession: (state) => {
      state.user = null;
    },
  },

  selectors: {
    selectIsAuthenticated: (state) => state.user !== null,
    selectUserEmail: (state) => state.user?.email ?? null,
  },
});

export const { setSession, clearSession } = sessionSlice.actions;
export const { selectIsAuthenticated, selectUserEmail } =
  sessionSlice.selectors;
export const sessionReducer = sessionSlice.reducer;
