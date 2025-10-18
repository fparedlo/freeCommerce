export function formatDate(dateString: string, locale = 'en-GB'): string {
  return new Intl.DateTimeFormat(locale, { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(new Date(dateString));
}