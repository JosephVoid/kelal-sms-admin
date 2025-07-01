import { Status } from "./types";

export function setStatusColor(status: Status): string {
  switch (status) {
    case "sent":
      return "#3498db"; // blue
    case "delivered":
      return "#2ecc71"; // green
    case "pending":
      return "#f1c40f"; // yellow
    case "failed":
      return "#e74c3c"; // red
    default:
      return "#bdc3c7"; // fallback: grey
  }
}

export function capitalizeFirst(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
