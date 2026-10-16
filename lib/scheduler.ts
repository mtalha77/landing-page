const raw = process.env.SCHEDULER_URL?.trim() ?? "";

function withEmbed(url: string) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("embed", "true");
    return parsed.toString();
  } catch {
    return url;
  }
}

/** Public HubSpot or Calendly booking link from SCHEDULER_URL. */
export const SCHEDULER_URL = withEmbed(raw);
