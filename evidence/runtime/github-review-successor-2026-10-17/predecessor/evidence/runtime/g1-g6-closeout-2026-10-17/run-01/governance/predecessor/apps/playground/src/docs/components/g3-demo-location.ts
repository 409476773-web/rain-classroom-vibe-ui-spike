/** Demo destinations preserve their state when opened as native links. */
export function readDemoQuery(key: string, allowed: readonly string[], fallback: string) {
  const value = new URLSearchParams(window.location.hash.split("?")[1] ?? "").get(key);
  return value !== null && allowed.includes(value) ? value : fallback;
}
