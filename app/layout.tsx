import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata: Metadata = {
  title: "Craftly · La charte graphique d'un client, prête à intégrer",
  description:
    "Couleurs, typographies, composants : Craftly transforme les choix de marque d'un client en mini-charte interactive et en variables.css prêt à coller.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${jakarta.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
