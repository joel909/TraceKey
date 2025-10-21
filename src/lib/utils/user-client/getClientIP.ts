import { NextRequest } from "next/server";

/**
 * Extracts the client's IPv4 address from the request.
 * @param req NextRequest object
 * @returns IPv4 address string or "unknown" if not found
 */
export function getClientIPv4(req: NextRequest): string {
  const headerKeys = [
    "x-client-ip",
    "x-forwarded-for",
    "cf-connecting-ip",
    "true-client-ip",
    "x-real-ip",
  ];

  for (const key of headerKeys) {
    const raw = req.headers.get(key);
    if (!raw) continue;

    // Some headers may have multiple IPs (comma-separated)
    const ips = raw.split(",").map(ip => ip.trim()).filter(Boolean);

    // Return the first IPv4 we find
    const ipv4 = ips.find(ip => ip.includes("."));
    if (ipv4) return ipv4;
  }

  // Fallback to internal connection info (dev mode)
  const conn = (req as any)?._req?.socket?.remoteAddress;
  if (conn && conn.includes(".")) return conn;

  return "unknown";
}
