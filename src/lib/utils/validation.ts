const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 320;
const MAX_MESSAGE_LENGTH = 5000;

const messages = {
  fr: {
    emailRequired: "L'email est requis.",
    emailInvalid: "Format d'email invalide.",
    emailTooLong: "L'email est trop long.",
    messageRequired: "Le message est requis.",
    messageTooLong: "Le message est trop long.",
  },
  en: {
    emailRequired: "Email is required.",
    emailInvalid: "Invalid email format.",
    emailTooLong: "Email is too long.",
    messageRequired: "Message is required.",
    messageTooLong: "Message is too long.",
  },
} as const;

export function validateEmail(
  email: string,
  locale: string = "fr",
): string | null {
  const t = messages[locale as keyof typeof messages] ?? messages.fr;
  if (!email.trim()) return t.emailRequired;
  if (email.length > MAX_EMAIL_LENGTH) return t.emailTooLong;
  if (!EMAIL_REGEX.test(email)) return t.emailInvalid;
  return null;
}

export function validateMessage(
  message: string,
  locale: string = "fr",
): string | null {
  const t = messages[locale as keyof typeof messages] ?? messages.fr;
  if (!message.trim()) return t.messageRequired;
  if (message.length > MAX_MESSAGE_LENGTH) return t.messageTooLong;
  return null;
}
