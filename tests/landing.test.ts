import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const page = read("app/page.tsx");

describe("vitrine Planche", () => {
  it("a un seul titre de premier niveau", () => {
    expect(page.match(/<h1[\s>]/g)).toHaveLength(1);
  });

  it("n'a ni dégradé, ni violet, ni indigo", () => {
    expect(page).not.toMatch(/gradient/i);
    expect(page).not.toMatch(/#(5b5bf0|6366f1|8b5cf6|7c3aed|a855f7)/i);
    expect(page).not.toMatch(/violet|indigo|purple/i);
  });

  it("n'a ni ombre au repos, ni coins arrondis hors du rayon de la charte, ni police monospace", () => {
    expect(page).not.toMatch(/shadow-/);
    expect(page).not.toMatch(/rounded-(lg|xl|2xl|3xl|full)\b/);
    expect(page).not.toMatch(/font-mono/);
  });

  it("n'a ni numérotation ni libellé « Étape » au-dessus des titres", () => {
    expect(page).not.toMatch(/Étape \d|>0\d</);
  });

  it("garde l'action, la phrase d'accroche et le lien vers ProjectP", () => {
    expect(page).toContain("Créer un compte");
    expect(page).toContain("30 jours, 30 projets");
    expect(page).toContain("https://projectp.fr/");
  });

  it("monte l'exemple de charte avec buildCss, sans valeur figée", () => {
    expect(read("components/KitPreview.tsx")).toContain("buildCss(DEFAULT_KIT)");
  });
});
