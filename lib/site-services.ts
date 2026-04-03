export const SERVICE_SLUGS = [
  "real-estate",
  "landscape",
  "roof-inspection",
  "events",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
