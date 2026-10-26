import { describe, expect, it } from "vitest";
import { DEFAULT_KIT, buildCss } from "../src/lib/brand-kit";
import {
  exportFilename,
  exportText,
  fontsUrl,
  randomizeColor,
  setButtonStyle,
  setColor,
  setFont,
  setRadius,
  setSize,
  setText,
} from "../src/lib/editor";

describe("saisies de l'éditeur", () => {
  it("une couleur valide est appliquée, normalisée", () => {
    const { kit, error } = setColor(DEFAULT_KIT, "primary", "ABC");
    expect(error).toBeNull();
    expect(kit.colors.primary).toBe("#aabbcc");
  });

  it("une couleur invalide signale l'erreur et garde la dernière valeur valide", () => {
    const result = setColor(DEFAULT_KIT, "primary", "pas-une-couleur");
    expect(result.error).toMatch(/HEX invalide/);
    expect(result.kit).toBe(DEFAULT_KIT);
  });

  it("une police hors liste est refusée", () => {
    const result = setFont(DEFAULT_KIT, "heading", 'Arial"; } body {');
    expect(result.error).not.toBeNull();
    expect(result.kit.fonts.heading).toBe(DEFAULT_KIT.fonts.heading);
    expect(setFont(DEFAULT_KIT, "body", "Lora").kit.fonts.body).toBe("Lora");
  });

  it("une taille hors bornes est refusée, une taille valide acceptée", () => {
    expect(setSize(DEFAULT_KIT, "heading", 4).error).not.toBeNull();
    expect(setSize(DEFAULT_KIT, "heading", 56).kit.sizes.heading).toBe(56);
  });

  it("un rayon hors bornes est refusé", () => {
    expect(setRadius(DEFAULT_KIT, 999).error).not.toBeNull();
    expect(setRadius(DEFAULT_KIT, 12).kit.radius).toBe(12);
  });

  it("le style de bouton passe de plein à contour", () => {
    expect(setButtonStyle(DEFAULT_KIT, "outline").kit.buttonStyle).toBe("outline");
  });

  it("un texte trop long est refusé", () => {
    expect(setText(DEFAULT_KIT, "name", "x".repeat(81)).error).not.toBeNull();
    expect(setText(DEFAULT_KIT, "name", "x".repeat(80)).error).toBeNull();
    expect(setText(DEFAULT_KIT, "name", "Nouvelle charte").kit.name).toBe("Nouvelle charte");
  });

  it("« couleur au hasard » donne un HEX valide dans la bonne clé", () => {
    const { kit, error } = randomizeColor(DEFAULT_KIT, "accent", () => 0.5);
    expect(error).toBeNull();
    expect(kit.colors.accent).toMatch(/^#[0-9a-f]{6}$/);
    expect(kit.colors.primary).toBe(DEFAULT_KIT.colors.primary);
  });
});

describe("export", () => {
  it("le texte copié est celui qui est téléchargé : buildCss du kit", () => {
    expect(exportText(DEFAULT_KIT)).toBe(buildCss(DEFAULT_KIT));
  });

  it("le nom de fichier vient du nom du projet, sans accents ni espaces", () => {
    expect(exportFilename({ ...DEFAULT_KIT, name: "Charte Été 2026 !" })).toBe("charte-ete-2026-variables.css");
    expect(exportFilename({ ...DEFAULT_KIT, name: "   " })).toBe("craftly-variables.css");
  });
});

describe("polices du kit", () => {
  it("charge les deux polices du kit, une seule fois si elles sont identiques", () => {
    const url = fontsUrl(DEFAULT_KIT);
    expect(url).toContain("family=Fraunces");
    expect(url).toContain("family=Work+Sans");
    const same = fontsUrl({ ...DEFAULT_KIT, fonts: { heading: "Lora", body: "Lora" } });
    expect(same.match(/family=Lora/g)).toHaveLength(1);
  });
});
