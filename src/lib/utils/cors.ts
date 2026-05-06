import { NextRequest, NextResponse } from "next/server";

const DEFAULT_ALLOWED_METHODS = "GET, POST, PUT, DELETE, OPTIONS";
const DEFAULT_ALLOWED_HEADERS = "Content-Type, Authorization, x-api-version, x-requested-with";
const ALLOWED_ORIGINS_ENV_KEYS = ["CORS_ALLOWED_ORIGINS", "ALLOWED_CORS_ORIGINS"] as const;

function parseAllowedOrigins() {
  const rawOrigins = ALLOWED_ORIGINS_ENV_KEYS
    .map((key) => process.env[key])
    .find((value) => value && value.trim().length > 0);

  if (!rawOrigins) {
    return new Set<string>();
  }

  return new Set(
    rawOrigins
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  );
}

function getCorsHeaders(origin: string | null) {
  const headers = new Headers({
    "Access-Control-Allow-Methods": DEFAULT_ALLOWED_METHODS,
    "Access-Control-Allow-Headers": DEFAULT_ALLOWED_HEADERS,
    Vary: "Origin",
  });

  if (origin && parseAllowedOrigins().has(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
  }

  return headers;
}

export function validateCorsRequest(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return null;
  }

  if (!parseAllowedOrigins().has(origin)) {
    return NextResponse.json(
      { message: "Origin is not allowed" },
      { status: 403, headers: getCorsHeaders(origin) },
    );
  }

  return null;
}

export function createCorsPreflightResponse(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (!origin || !parseAllowedOrigins().has(origin)) {
    return NextResponse.json(
      { message: "Origin is not allowed" },
      { status: 403, headers: getCorsHeaders(origin) },
    );
  }

  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}

export function withCorsHeaders(request: NextRequest, response: NextResponse) {
  const headers = getCorsHeaders(request.headers.get("origin"));

  headers.forEach((value, key) => {
    response.headers.set(key, value);
  });

  return response;
}
