export function cleanText(text = "") {
  return String(text).replace(/[&<>"']/g, (char) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[char];
  });
}

export function memberInitials(fullName = "") {
  const parts = String(fullName).trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  const first = parts[0][0] || "";
  const last = parts[parts.length - 1][0] || "";
  return `${first}${last}`.toUpperCase();
}

export function makeSearchRegex(text = "") {
  const safe = String(text)
    .trim()
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!safe) return null;
  return new RegExp(safe, "i");
}

export function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getSunday(date) {
  const newDate = new Date(date);
  newDate.setHours(12, 0, 0, 0);

  const day = newDate.getDay();
  newDate.setDate(newDate.getDate() - day);

  return newDate;
}

export function addDays(date, days) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

export function prettySunday(date) {
  const text = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);

  return text.charAt(0).toUpperCase() + text.slice(1);
}
