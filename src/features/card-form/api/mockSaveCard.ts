import type { Card } from '@/entities/card';
import type { CardFormValues } from '../model/cardSchema';

const MOCK_DELAY_MS = 600;

export const mockSaveCard = (values: CardFormValues): Promise<Card> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(values), MOCK_DELAY_MS);
  });
