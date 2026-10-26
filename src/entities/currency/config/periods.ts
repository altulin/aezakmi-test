export const PERIODS = {
  '1W': 7,
  '1M': 30,
  '3M': 90,
  '6M': 180,
  '1Y': 365,
} as const;

export type Period = keyof typeof PERIODS;

export const DEFAULT_PERIOD: Period = '1M';

export const PERIOD_LABELS: Record<Period, string> = {
  '1W': 'Weekly dynamics',
  '1M': 'Monthly dynamics',
  '3M': '3-month dynamics',
  '6M': '6-month dynamics',
  '1Y': 'Yearly dynamics',
};

export const isPeriod = (value: unknown): value is Period => {
  return (
    typeof value === 'string' &&
    Object.prototype.hasOwnProperty.call(PERIODS, value)
  );
};
