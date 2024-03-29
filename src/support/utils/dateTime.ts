// eg.: 21 Aug 2022, 18:19
export const getFormattedDateTime = (date = new Date(), dateOnly = false): string =>
  new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: dateOnly ? undefined : 'short' }).format(date);

export const addSeconds = (seconds: number, date = new Date()): Date => {
  const copy = new Date(date.getTime());

  copy.setSeconds(copy.getSeconds() + seconds);

  return copy;
};
