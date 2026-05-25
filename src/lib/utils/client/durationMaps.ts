export const DURATION_INTERVAL_MAP = {
  "24hours": "24 hours",
  "7days": "7 days",
  "30days": "30 days",
  "60days": "60 days",
  "alltime": null,
} as const;

export type DurationKey = keyof typeof DURATION_INTERVAL_MAP;

export const DEFAULT_DURATION_KEY: DurationKey = "24hours";
export const DEFAULT_DURATION_INTERVAL = DURATION_INTERVAL_MAP[DEFAULT_DURATION_KEY];

export const DURATION_OPTIONS: ReadonlyArray<{
  key: DurationKey;
  label: string;
}> = [
  { key: "24hours", label: "Last 24 hours" },
  { key: "7days", label: "Last 7 days" },
  { key: "30days", label: "Last 30 days" },
  { key: "60days", label: "Last 60 days" },
  { key: "alltime", label: "All time" },
];

const DURATION_ALIASES: Record<string, DurationKey> = {
  "24h": "24hours",
  "24hour": "24hours",
  "24hours": "24hours",
  "7d": "7days",
  "7day": "7days",
  "7days": "7days",
  "30d": "30days",
  "30day": "30days",
  "30days": "30days",
  "60d": "60days",
  "60day": "60days",
  "60days": "60days",
  "all": "alltime",
  "alltime": "alltime",
};

function compactDurationValue(value?: string | null) {
  return value?.trim().toLowerCase().replace(/[\s_-]+/g, "");
}

export function normalizeDurationKey(value?: string | null): DurationKey {
  const compactValue = compactDurationValue(value);

  if (!compactValue) {
    return DEFAULT_DURATION_KEY;
  }

  return DURATION_ALIASES[compactValue] ?? DEFAULT_DURATION_KEY;
}

export function getDurationInterval(value?: string | null): string | null {
  return DURATION_INTERVAL_MAP[normalizeDurationKey(value)];
}
