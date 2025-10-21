import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Common IP headers
  const headerKeys = [
    "x-client-ip",
    "x-forwarded-for",
    "cf-connecting-ip",
    "true-client-ip",
    "x-real-ip",
  ];

  let clientIp: string | null = null;

  // Try to extract IP from headers
  for (const key of headerKeys) {
    const raw = req.headers.get(key);
    if (!raw) continue;

    // Some headers may have multiple IPs, we take the first non-empty
    const first = raw.split(",").map(s => s.trim()).find(Boolean);
    if (first) {
      clientIp = first;
      break;
    }
  }

  // Function to detect if it's IPv6
  const isIPv6 = (ip: string) => ip.includes(":") && !ip.includes(".");

  // If no IP from headers, try external APIs (preferring IPv6)
  if (!clientIp && process.env.NODE_ENV === "development") {
    try {
      // Try IPv6 lookup first
      let res = await fetch("https://api64.ipify.org?format=text");
      let text = (await res.text()).trim();
      if (text && isIPv6(text)) {
        clientIp = text;
      } else {
        // fallback to IPv4
        res = await fetch("https://api.ipify.org?format=text");
        text = (await res.text()).trim();
        if (text) clientIp = text;
      }
    } catch (err) {
      console.error("Failed to fetch IP:", err);
      clientIp = "unknown";
    }
  }

  if (!clientIp) clientIp = "unknown";

  console.log("THE IP IS:", clientIp);

  return NextResponse.json({ ip: clientIp });
}
