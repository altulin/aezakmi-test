const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeZone: 'UTC',
});

export const getDateDaysAgo = (days: number): string => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
};

export const formatTime = (timestamp: number): string =>
  timeFormatter.format(timestamp);

export const formatDate = (isoDate: string): string =>
  dateFormatter.format(new Date(isoDate));
