import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "OCD Live Votre prochain live commence ici",
  description:
    "Réservez un live commercial accompagné par OCD Live, en présentiel à Lomé ou à distance depuis votre boutique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
