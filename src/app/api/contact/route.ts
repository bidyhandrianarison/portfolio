import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message } = body;

  if (
    typeof email !== "string" ||
    typeof message !== "string" ||
    (typeof name !== "string" && typeof name !== "undefined")
  ) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
  }

  if (!email.trim() || !message.trim()) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const contactEmail = process.env.CONTACT_EMAIL;
  if (!contactEmail) {
    return NextResponse.json(
      { error: "Server not configured" },
      { status: 500 },
    );
  }

  const resend = new Resend(resendKey);
  const senderName =
    typeof name === "string" && name.trim() ? name.trim() : "Anonymous";

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: contactEmail,
      subject: `New message from ${senderName}`,
      replyTo: email,
      text: `From: ${senderName}\nEmail: ${email}\n\n${message}`,
    });
  } catch {
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
