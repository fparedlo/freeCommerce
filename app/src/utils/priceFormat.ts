const formatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

export function priceFormat(number: number) {
  return formatter.format(number);
}
