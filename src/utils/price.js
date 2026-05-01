export function parsePrice(price) {
  return Number(String(price).replace("€", "").replace(",", ".").trim()) || 0;
}
