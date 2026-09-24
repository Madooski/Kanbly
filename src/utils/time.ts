export function relativeTimeAgo(dateInput: string | Date): string {
  const date = new Date(dateInput);
  const now = new Date();
  
  // Calculate difference in milliseconds
  let diffInMs = date.getTime() - now.getTime();
  
  // Is it in the past?
  const isPast = diffInMs < 0;
  
  // Work with absolute difference for magnitude
  diffInMs = Math.abs(diffInMs);
  
  // Calculate components
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  
  if (diffInDays >= 1) {
    return isPast ? `${diffInDays}d ago` : `in ${diffInDays}d`;
  } else if (diffInHours >= 1) {
    return isPast ? `${diffInHours}h ago` : `in ${diffInHours}h`;
  } else {
    return isPast ? "just now" : "shortly";
  }
}

export function relativeTimeString(dateInput: string | Date): string {
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
    return isPast ? "overdue" : "soon";
  }
}
