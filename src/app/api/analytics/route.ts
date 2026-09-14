import { NextResponse } from "next/server";

const events: Array<{
  name: string;
  payload?: Record<string, string>;
  timestamp: string;
}> = [];

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || typeof body.name !== "string") {
    return NextResponse.json({ error: "Invalid event" }, { status: 400 });
  }

  const { name, payload } = body;

  if (typeof payload !== "undefined" && typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  events.push({
    name,
    payload:
      typeof payload === "object" && payload !== null ? payload : undefined,
    timestamp: new Date().toISOString(),
  });

  if (events.length > 1000) {
    events.splice(0, events.length - 1000);
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ events, count: events.length });
}
