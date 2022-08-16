export const normalize = (value?: string | null): string => (value ?? '').trim().toLowerCase();

export const isNotEmpty = (value?: string | null): boolean => normalize(value).length > 0;

export const isNullOrEmpty = (value?: string | null): boolean => !isNotEmpty(value);

export const isAnyEmpty = (...args: (string | undefined | null)[]): boolean =>
  args.some((s) => isNullOrEmpty(s)) || args.length === 0;
