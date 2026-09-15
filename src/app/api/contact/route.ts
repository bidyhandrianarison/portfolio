import { NextResponse } from "next/server";
import { Resend } from "resend";

const MAX_EMAIL_LENGTH = 320;
const MAX_NAME_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

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
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
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

function containsLineBreaks(value: string): boolean {
  return /[\r\n]/.test(value);
}

export async function POST(request: Request) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 },
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const rawBody = await request.text().catch(() => null);
  if (!rawBody || rawBody.length > MAX_MESSAGE_LENGTH * 2) {
    return NextResponse.json({ error: "Payload too large" }, { status: 400 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message, website } = body;

  if (typeof website === "string" && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (typeof email !== "string" || typeof message !== "string") {
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }

  if (typeof name !== "string" && typeof name !== "undefined") {
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }

  if (!email.trim() || !message.trim()) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (email.length > MAX_EMAIL_LENGTH) {
    return NextResponse.json({ error: "Email too long" }, { status: 400 });
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 },
    );
  }

  if (containsLineBreaks(email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 },
    );
  }

  const senderName = typeof name === "string" ? name.trim() : "";

  if (senderName.length > MAX_NAME_LENGTH) {
    return NextResponse.json({ error: "Name too long" }, { status: 400 });
  }

  if (senderName && containsLineBreaks(senderName)) {
    return NextResponse.json({ error: "Invalid name format" }, { status: 400 });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Message too long" }, { status: 400 });
  }

  const contactEmail = process.env.CONTACT_EMAIL;
  if (!contactEmail) {
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 },
    );
  }

  const resend = new Resend(resendKey);
  const displayName = senderName || "Anonymous";

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: contactEmail,
      subject: `New message from ${displayName}`,
      replyTo: email,
      text: `From: ${displayName}\nEmail: ${email}\n\n${message}`,
    });
  } catch {
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
