import { describe, expect, it } from "vitest";
import { DEFAULT_KIT, FONTS, buildCss, parseHex, randomColor } from "../src/lib/brand-kit";

describe("parseHex", () => {
  it("accepte le HEX court et long, avec ou sans #, et normalise en minuscules", () => {
    expect(parseHex("#abc")).toBe("#aabbcc");
    expect(parseHex("ABCDEF")).toBe("#abcdef");
    expect(parseHex("  #B11226 ")).toBe("#b11226");
  });

  it("rejette tout ce qui n'est pas un HEX valide", () => {
    for (const value of ["#12345", "#1234567", "red", "#gggggg", "", "#abc;color:red"]) {
      expect(parseHex(value)).toBeNull();
    }
  });
});

describe("buildCss", () => {
  const variables = [
    "--color-primary",
    "--color-secondary",
    "--color-accent",
    "--color-background",
    "--color-text",
    "--font-heading",
    "--font-body",
    "--text-heading",
    "--text-base",
    "--text-small",
    "--radius",
    "--button-border",
  ];

  it("contient chaque variable attendue, avec la valeur du kit", () => {
    const css = buildCss(DEFAULT_KIT);
    expect(css.startsWith(":root {")).toBe(true);
    for (const name of variables) {
      expect(css).toContain(`${name}:`);
    }
    expect(css).toContain(`--color-primary: ${DEFAULT_KIT.colors.primary};`);
    expect(css).toContain(`--font-heading: "${DEFAULT_KIT.fonts.heading}";`);
    expect(css).toContain(`--radius: ${DEFAULT_KIT.radius}px;`);
  });

  it("donne la même sortie pour le même kit", () => {
    expect(buildCss(DEFAULT_KIT)).toBe(buildCss(structuredClone(DEFAULT_KIT)));
  });

  it("refuse une couleur ou une police hors liste, pour qu'aucune valeur ne s'injecte dans le CSS", () => {
    const badColor = { ...DEFAULT_KIT, colors: { ...DEFAULT_KIT.colors, primary: "red;}body{x:1" } };
    expect(() => buildCss(badColor as typeof DEFAULT_KIT)).toThrow();

    const badFont = { ...DEFAULT_KIT, fonts: { ...DEFAULT_KIT.fonts, heading: 'Arial"; } body { x: 1' } };
    expect(() => buildCss(badFont as typeof DEFAULT_KIT)).toThrow();
  });

  it("refuse une taille ou un rayon hors bornes", () => {
    expect(() => buildCss({ ...DEFAULT_KIT, radius: 400 })).toThrow();
    expect(() => buildCss({ ...DEFAULT_KIT, sizes: { ...DEFAULT_KIT.sizes, heading: 4 } })).toThrow();
  });

  it("n'accepte que les polices de la liste fermée", () => {
    expect(FONTS).toContain(DEFAULT_KIT.fonts.heading);
    expect(FONTS).toContain(DEFAULT_KIT.fonts.body);
  });
});

describe("randomColor", () => {
  it("renvoie un HEX valide, déterministe avec un générateur donné", () => {
    expect(randomColor(() => 0)).toBe("#000000");
    expect(randomColor(() => 0.9999999999)).toBe("#ffffff");
    const color = randomColor();
    expect(parseHex(color)).toBe(color);
  });
});
