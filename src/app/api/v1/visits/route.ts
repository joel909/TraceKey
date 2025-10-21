import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Check headers for client IP
  const headerKeys = [
    "x-client-ip",
    "x-forwarded-for",
    "cf-connecting-ip",
    "true-client-ip",
    "x-real-ip",
  ];

  let clientIp: string | null = null;

  for (const key of headerKeys) {
    const raw = req.headers.get(key);
    if (!raw) continue;
    const first = raw.split(",").map(s => s.trim()).find(Boolean);
    if (first) {
      clientIp = first;
      break;
    }
  }

  // DEV fallback: get public IP using external service
  if (!clientIp && process.env.NODE_ENV === "development") {
    try {
      const res = await fetch("https://api.ipify.org?format=text");
      clientIp = (await res.text()).trim();
    } catch (err) {
      console.error("Failed to fetch public IP:", err);
      clientIp = "unknown";
    }
  }

  if (!clientIp) clientIp = "unknown";

  console.log("THE IP IS:", clientIp);

  return NextResponse.json({ ip: clientIp });
}
