const dateFormat = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatDate(dateString: string): string {
  return dateFormat.format(new Date(dateString));
}
