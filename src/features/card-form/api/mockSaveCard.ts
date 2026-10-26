import type { Card } from '@/entities/card';
import type { CardFormValues } from '../model/cardSchema';

const MOCK_DELAY_MS = 600;

// Imitates a request to the backend. The schema output already matches Card,
// so no cast is needed: if they ever drift apart, TypeScript reports it here.
export const mockSaveCard = (values: CardFormValues): Promise<Card> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(values), MOCK_DELAY_MS);
  });
