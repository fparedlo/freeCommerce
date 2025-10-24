export function previousPrice(
  currentPrice: number,
  discountPercentage: number,
): number {
  if (discountPercentage >= 100 || discountPercentage < 0) {
    return currentPrice;
  }
  return currentPrice / (1 - discountPercentage / 100);
}
