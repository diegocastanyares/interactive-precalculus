// Small helpers to display numbers nicely.
export const money = (n) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
export const pct = (n, digits = 1) => `${(n * 100).toFixed(digits)}%`;
