import type { Metadata } from "next";
import { Bricolage_Grotesque, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], weight: ["500", "800"], variable: "--font-bricolage" });
const schibsted = Schibsted_Grotesk({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-schibsted" });

export const metadata: Metadata = {
  title: "Craftly · La charte graphique d'un client, prête à intégrer",
  description:
    "Couleurs, typographies, composants : Craftly transforme les choix de marque d'un client en mini-charte interactive et en variables.css prêt à coller.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${bricolage.variable} ${schibsted.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
