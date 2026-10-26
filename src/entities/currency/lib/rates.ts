export const SELL_MARKUP = 0.02;

export const BUY_DISCOUNT = 0.015;

const rateFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
});

export const getSellRate = (rate: number): number => rate * (1 + SELL_MARKUP);

export const getBuyRate = (rate: number): number => rate * (1 - BUY_DISCOUNT);

export const formatRate = (rate: number): string => rateFormatter.format(rate);
