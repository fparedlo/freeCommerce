export function previousPrice(
  currentPrice: number,
  discountPercentage: number,
): number {
  return currentPrice / (1 - discountPercentage / 100);
}
