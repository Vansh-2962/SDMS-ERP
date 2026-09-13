export const formatDate = (date: Date | string, time = false): string => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const datePart = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  })
    .format(parsedDate)
    .replace(/^(\d{2})\s/, (_, day) => `${day} `);

  if (!time) {
    return datePart;
  }

  const timePart = new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(parsedDate);

  return `${datePart}, ${timePart}`;
};
