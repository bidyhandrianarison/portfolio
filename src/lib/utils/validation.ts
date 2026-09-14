const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "L'email est requis.";
  if (!EMAIL_REGEX.test(email)) return "Format d'email invalide.";
  return null;
}

export function validateMessage(message: string): string | null {
  if (!message.trim()) return "Le message est requis.";
  return null;
}
