import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const headerKeys = [
    "x-client-ip",
    "x-forwarded-for",
    "cf-connecting-ip",
    "true-client-ip",
    "x-real-ip",
  ];

  let ipv4: string | null = null;
  let ipv6: string | null = null;

  for (const key of headerKeys) {
    const raw = req.headers.get(key);
    if (!raw) continue;

    const ips = raw.split(",").map(s => s.trim());
    for (const ip of ips) {
      if (ip.includes(":")) ipv6 = ipv6 ?? ip; // IPv6 has colons
      else ipv4 = ipv4 ?? ip;
    }
  }

  const officialClientIp = ipv6 || ipv4 || req.ip || "unknown";

  console.log("officialClientIp:", officialClientIp);
  console.log("ipv4:", ipv4);
  console.log("ipv6:", ipv6);

  return NextResponse.json({
    officialClientIp,
    ipv4,
    ipv6,
  });
}
