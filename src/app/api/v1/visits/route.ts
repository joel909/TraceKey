import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const headerKeys = [
    "x-client-ip",
    "x-forwarded-for",
    "cf-connecting-ip",
    "true-client-ip",
    "x-real-ip",
  ];

  const foundIps: Record<string, string | null> = {};

  // Collect all IPs from headers
  for (const key of headerKeys) {
    const raw = req.headers.get(key);
    if (!raw) {
      foundIps[key] = null;
      continue;
    }

    // Take all IPs (in case multiple are present)
    const ips = raw.split(",").map(s => s.trim()).filter(Boolean);
    foundIps[key] = ips.join(", ");
  }

  // Detect most likely client IP from first found header
  let clientIp =
    Object.values(foundIps).find(v => v && v.length > 0) || null;

  // Development fallback — fetch both IPv6 and IPv4 from external APIs
  let ipv6: string | null = null;
  let ipv4: string | null = null;

  if (process.env.NODE_ENV === "development") {
    try {
      const res6 = await fetch("https://api64.ipify.org?format=text");
      const text6 = (await res6.text()).trim();
      if (text6 && text6.includes(":")) ipv6 = text6;
    } catch {
      ipv6 = null;
    }

    try {
      const res4 = await fetch("https://api.ipify.org?format=text");
      const text4 = (await res4.text()).trim();
      if (text4 && text4.includes(".")) ipv4 = text4;
    } catch {
      ipv4 = null;
    }

    // Use whichever was successfully fetched if no client IP was detected
    if (!clientIp) clientIp = ipv6 || ipv4 || "unknown";
  }

  // Final fallback
  if (!clientIp) clientIp = req.headers.get("x-forwarded-for") || req.ip || "unknown";

  console.log("Resolved IP info:", {
    official: clientIp,
    ipv4,
    ipv6,
    allHeaders: foundIps,
  });

  return NextResponse.json({
    officialClientIp: clientIp,
    ipv4,
    ipv6,
    allHeaderIps: foundIps,
  });
}
