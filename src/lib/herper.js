// helpers/time.js
export function formatTime(timeString) {
  // timeString expected format: "HH:MM:SS"
  if (!timeString) return "";
  return timeString.slice(0, 5); // takes "HH:MM" only
}
