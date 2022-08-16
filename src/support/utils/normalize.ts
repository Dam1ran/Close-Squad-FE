export const getNormalized = (totalValue: number, currentValue: number, normalizeValue = 100.0): number => {
  normalizeValue = Math.abs(normalizeValue);
  totalValue = Math.abs(totalValue);
  currentValue = Math.abs(currentValue);

  if (currentValue === 0) {
    return 0.0;
  }
  if (totalValue === 0 || normalizeValue === 0) {
    return normalizeValue;
  }

  return normalizeValue / (totalValue / currentValue);
};
