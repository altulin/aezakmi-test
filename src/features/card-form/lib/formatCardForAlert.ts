import type { Card } from '@/entities/card';

// blob: URLs are long and meaningless to a person, so images are shown by file name
export const formatCardForAlert = (card: Card): string => {
  const output = {
    ...card,
    images: card.images.map((image) => image.name),
  };
  return `Card saved (mock request):\n\n${JSON.stringify(output, null, 2)}`;
};
