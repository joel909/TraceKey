"use client"

import { useEffect, useState } from "react";

export default function LocalizedTime({ value }: { value: string }) {
  const [formattedValue, setFormattedValue] = useState(() => {
    if (!value || value === "Unknown") {
      return "Unknown";
    }

    return "Loading...";
  });

  useEffect(() => {
    if (!value || value === "Unknown") {
      setFormattedValue("Unknown");
      return;
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
      setFormattedValue(value);
      return;
    }

    setFormattedValue(
      new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      }).format(parsedDate)
    );
  }, [value]);

  return <span title={value}>{formattedValue}</span>;
}
