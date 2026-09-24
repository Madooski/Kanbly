export function relativeTimeString(
  dateInput: string | Date,
  mode: "due" | "ago" = "due"
): string {
  const date = new Date(dateInput);
  const now = new Date();

  const diffInMs = date.getTime() - now.getTime();
  const isPast = diffInMs < 0;
  const absDiff = Math.abs(diffInMs);

  const diffInDays = Math.floor(absDiff / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(absDiff / (1000 * 60 * 60));

  if (diffInDays >= 1) {
    return isPast ? `${diffInDays}d ago` : `in ${diffInDays}d`;
  } else if (diffInHours >= 1) {
    return isPast ? `${diffInHours}h ago` : `in ${diffInHours}h`;
  } else {
    if (mode === "ago") {
      return isPast ? "just now" : "shortly";
    }
    return isPast ? "overdue" : "soon";
  }
}
