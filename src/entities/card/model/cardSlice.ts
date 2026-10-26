import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Card } from './types';

interface CardState {
  current: Card | null;
}

const initialState: CardState = {
  current: null,
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCard: (state, action: PayloadAction<Card>) => {
      state.current = action.payload;
    },
    clearCard: (state) => {
      state.current = null;
    },
  },
  selectors: {
    selectCurrentCard: (state) => state.current,
  },
});

export const { setCard, clearCard } = cardSlice.actions;
export const { selectCurrentCard } = cardSlice.selectors;
export const cardReducer = cardSlice.reducer;
