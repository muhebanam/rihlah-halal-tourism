export function formatDepartureDate(value: string): string {
  if (!value || !value.includes("-")) return value || "Flexible Dates";
  const [year, month, day] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getDestinationRating(id: string): string {
  const sum = id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return (4.5 + (sum % 5) / 10).toFixed(1);
}

export function getDestinationReviewsCount(id: string): number {
  const sum = id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return 95 + ((sum * 7) % 280);
}

