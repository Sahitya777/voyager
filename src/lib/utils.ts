export function timeElapsed(timestamp: number): string {
    const now = Math.floor(Date.now() / 1000); // current time in seconds
    const seconds = now - Number(timestamp);
  
    const intervalTypes: [number, string][] = [
      [31536000, "year"],
      [2592000, "month"],
      [86400, "day"],
      [3600, "hour"],
      [60, "minute"],
      [1, "second"],
    ];
  
    for (const [intervalSeconds, intervalName] of intervalTypes) {
      const interval = Math.floor(seconds / intervalSeconds);
      if (interval >= 1) {
        return `${interval} ${intervalName}${interval > 1 ? "s" : ""} ago`;
      }
    }
  
    return "just now";
  }

export function formatTimestamp(timestamp: number): string {
    const date = new Date(Number(timestamp) * 1000); // Convert Unix timestamp to milliseconds
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24-hour format
    };
  
    // Format the date
    const formattedDate = date
      .toLocaleString("en-US", options)
      .replace(",", "")
      .replace(",", "");
  
    return formattedDate;
  }