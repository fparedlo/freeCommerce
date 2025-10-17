export function getSessionStorageItem(name: string): string | null {
  const value = sessionStorage.getItem(name);
  return value ?? null;
}
