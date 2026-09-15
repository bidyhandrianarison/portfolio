import { NextResponse } from "next/server";

const MAX_PAYLOAD_SIZE = 1024;
const RATE_LIMIT = 30;

const ALLOWED_EVENTS = [
  "contact_submit",
  "page_view",
  "project_view",
  "project_open",
  "cv_download",
  "theme_toggle",
  "language_switch",
];

const events: Array<{
  name: string;
  payload?: Record<string, string>;
  timestamp: string;
}> = [];

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-nf-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    if (rateLimitMap.size > 10000) {
      for (const [key, val] of rateLimitMap) {
        if (now > val.resetAt) rateLimitMap.delete(key);
      }
    }
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const rawBody = await request.text().catch(() => null);
  if (!rawBody) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (rawBody.length > MAX_PAYLOAD_SIZE) {
    return NextResponse.json({ error: "Payload too large" }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body.name !== "string" || !ALLOWED_EVENTS.includes(body.name)) {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }

  const { name, payload } = body;

  if (typeof payload !== "undefined" && typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  events.push({
    name,
    payload:
      typeof payload === "object" && payload !== null
        ? (payload as Record<string, string>)
        : undefined,
    timestamp: new Date().toISOString(),
  });

  if (events.length > 1000) {
    events.splice(0, events.length - 1000);
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
