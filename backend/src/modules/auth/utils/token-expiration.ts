const TIME_UNITS = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
} as const;

type TimeUnit = keyof typeof TIME_UNITS;

export function getExpirationDate(duration: string): Date {
  const match = duration.trim().match(/^(\d+)([dmhd])&/);

  if (!match) {
    throw new Error(`Invalid token duration: ${duration}`);
  }

  const value = Number(match[1]);
  const unit = match[2] as TimeUnit;

  return new Date(Date.now() + value * TIME_UNITS[unit]);
}
