import { configureStore } from '@reduxjs/toolkit';
import {
  clearSession,
  selectIsAuthenticated,
  selectUserEmail,
  sessionReducer,
  setSession,
} from './sessionSlice';

const createStore = () =>
  configureStore({ reducer: { session: sessionReducer } });

describe('sessionSlice', () => {
  it('starts logged out when storage is empty', () => {
    const store = createStore();

    expect(selectIsAuthenticated(store.getState())).toBe(false);
    expect(selectUserEmail(store.getState())).toBeNull();
  });

  it('logs in and out', () => {
    const store = createStore();

    store.dispatch(setSession('demo@example.com'));
    expect(selectIsAuthenticated(store.getState())).toBe(true);
    expect(selectUserEmail(store.getState())).toBe('demo@example.com');

    store.dispatch(clearSession());
    expect(selectIsAuthenticated(store.getState())).toBe(false);
  });
});
