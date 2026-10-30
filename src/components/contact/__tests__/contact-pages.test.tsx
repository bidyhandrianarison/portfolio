import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ContactPage from "@/app/[locale]/contact/page";
import LegalNoticePage from "@/app/[locale]/mentions-legales/page";

jest.mock("@/lib/utils/analytics", () => ({ trackEvent: jest.fn() }));

test("le formulaire conserve l'envoi et les canaux de contact", async () => {
  const originalFetch = global.fetch;
  const fetchMock = jest.fn().mockResolvedValue({ ok: true } as Response);
  global.fetch = fetchMock;
  render(await ContactPage({ params: Promise.resolve({ locale: "fr" }) }));
  fireEvent.change(screen.getByLabelText("Nom *"), {
    target: { value: "Marie" },
  });
  fireEvent.change(screen.getByLabelText("Email *"), {
    target: { value: "marie@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Message *"), {
    target: { value: "Bonjour" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Envoyer" }));
  await waitFor(() =>
    expect(screen.getByRole("status")).toHaveTextContent("Message envoyé"),
  );
  expect(fetchMock).toHaveBeenCalledWith(
    "/api/contact",
    expect.objectContaining({ method: "POST" }),
  );
  expect(
    screen.getByRole("link", { name: /bidyhandrianarison@gmail.com/ }),
  ).toHaveAttribute("href", "mailto:bidyhandrianarison@gmail.com");
  global.fetch = originalFetch;
});

test("les mentions légales conservent leur contenu bilingue", async () => {
  render(await LegalNoticePage({ params: Promise.resolve({ locale: "en" }) }));
  expect(
    screen.getByRole("heading", { name: "Legal notice" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Personal data" }),
  ).toBeInTheDocument();
  expect(screen.getByText(/Netlify, Inc/)).toBeInTheDocument();
});
