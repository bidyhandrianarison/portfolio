"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { validateEmail, validateMessage } from "@/lib/utils/validation";
import { trackEvent } from "@/lib/utils/analytics";

type FormStatus = "idle" | "sending" | "success" | "error";

interface ContactFormProps {
  locale: string;
}

const messages = {
  fr: {
    name: "Nom *",
    namePlaceholder: "Votre nom",
    email: "Email *",
    emailPlaceholder: "vous@exemple.com",
    message: "Message *",
    messagePlaceholder: "Votre message...",
    send: "Envoyer",
    sending: "Envoi...",
    success: "Message envoyé. Je vous réponds sous 24h.",
    error: "Une erreur est survenue. Réessayez.",
    offline: "Impossible d'envoyer. Vérifiez votre connexion.",
  },
  en: {
    name: "Name *",
    namePlaceholder: "Your name",
    email: "Email *",
    emailPlaceholder: "you@example.com",
    message: "Message *",
    messagePlaceholder: "Your message...",
    send: "Send",
    sending: "Sending...",
    success: "Message sent. I'll reply within 24h.",
    error: "Something went wrong. Please try again.",
    offline: "Cannot send. Check your connection.",
  },
} as const;

export function ContactForm({ locale }: ContactFormProps) {
  const t = messages[locale as keyof typeof messages] ?? messages.fr;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<{
    email?: string | null;
    message?: string | null;
  }>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  function handleEmailChange(value: string) {
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value, locale) }));
    if (status === "error" || status === "success") setStatus("idle");
  }

  function handleMessageChange(value: string) {
    setMessage(value);
    setErrors((prev) => ({
      ...prev,
      message: validateMessage(value, locale),
    }));
    if (status === "error" || status === "success") setStatus("idle");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const emailErr = validateEmail(email, locale);
    const messageErr = validateMessage(message, locale);
    setErrors({ email: emailErr, message: messageErr });
    if (emailErr || messageErr) {
      const firstInvalid = emailErr
        ? document.getElementById("contact-email")
        : document.getElementById("contact-message");
      firstInvalid?.focus();
      return;
    }

    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website }),
      });

      if (!res.ok) throw new Error("Send failed");

      trackEvent("contact_submit");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {status === "success" && (
        <div
          role="status"
          className="border-success-200 bg-success-50 text-success-700 dark:border-success-800 dark:bg-success-900 dark:text-success-300 rounded-lg border p-4 text-sm"
        >
          {t.success}
        </div>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="border-error-200 bg-error-50 text-error-700 dark:border-error-800 dark:bg-error-900 dark:text-error-300 rounded-lg border p-4 text-sm"
        >
          {typeof navigator !== "undefined" && !navigator.onLine
            ? t.offline
            : t.error}
        </div>
      )}

      <div>
        <label
          htmlFor="contact-name"
          className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {t.name}
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
          maxLength={200}
          className="focus:border-primary-500 focus:ring-primary-500/20 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {t.email}
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          placeholder={t.emailPlaceholder}
          maxLength={320}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="focus:border-primary-500 focus:ring-primary-500/20 w-full rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50"
        />
        {errors.email && (
          <p
            id="email-error"
            className="text-error-600 dark:text-error-400 mt-1 text-[13px]"
          >
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {t.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => handleMessageChange(e.target.value)}
          placeholder={t.messagePlaceholder}
          maxLength={5000}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="focus:border-primary-500 focus:ring-primary-500/20 w-full resize-none rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50"
        />
        {errors.message && (
          <p
            id="message-error"
            className="text-error-600 dark:text-error-400 mt-1 text-[13px]"
          >
            {errors.message}
          </p>
        )}
      </div>

      <div
        aria-hidden="true"
        className="absolute -left-[9999px] opacity-0"
        tabIndex={-1}
      >
        <label htmlFor="contact-website">Leave this empty</label>
        <input
          id="contact-website"
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Button
        type="submit"
        loading={status === "sending"}
        disabled={status === "sending"}
      >
        {status === "sending" ? t.sending : t.send}
      </Button>
    </form>
  );
}
