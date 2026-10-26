export const FONTS = [
  "Bricolage Grotesque",
  "Schibsted Grotesk",
  "Fraunces",
  "Work Sans",
  "Playfair Display",
  "Lora",
  "Space Grotesk",
  "Montserrat",
] as const;

export type FontName = (typeof FONTS)[number];

export type BrandKit = {
  name: string;
  client: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: { heading: FontName; body: FontName };
  sizes: { heading: number; base: number; small: number };
  radius: number;
  buttonStyle: "solid" | "outline";
};

export const DEFAULT_KIT: BrandKit = {
  name: "Charte Vertbois",
  client: "Fromagerie Vertbois",
  description: "",
  colors: {
    primary: "#1f6f5c",
    secondary: "#f2c14e",
    accent: "#b11226",
    background: "#ffffff",
    text: "#1d1d1d",
  },
  fonts: { heading: "Fraunces", body: "Work Sans" },
  sizes: { heading: 40, base: 17, small: 14 },
  radius: 4,
  buttonStyle: "solid",
};

/** Renvoie le HEX normalisé (#rrggbb, minuscules), ou null si la saisie n'est pas un HEX valide. */
export function parseHex(input: string): string | null {
  const match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(input.trim());
  if (!match) return null;
  const digits = match[1].toLowerCase();
  const full = digits.length === 3 ? [...digits].map((c) => c + c).join("") : digits;
  return `#${full}`;
}

export function randomColor(random: () => number = Math.random): string {
  const value = Math.min(Math.floor(random() * 0x1000000), 0xffffff);
  return `#${value.toString(16).padStart(6, "0")}`;
}

const BOUNDS = {
  heading: [20, 96],
  base: [12, 24],
  small: [10, 18],
  radius: [0, 32],
} as const;

function assertInRange(name: string, value: number, [min, max]: readonly [number, number]) {
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new RangeError(`${name} hors bornes (${min}–${max}) : ${value}`);
  }
}

/**
 * Génère le variables.css du kit. Les valeurs sont validées ici, car le kit vient de la saisie
 * de l'utilisateur : une couleur ou une police hors liste ne doit jamais atteindre le CSS.
 */
export function buildCss(kit: BrandKit): string {
  const colors = Object.entries(kit.colors).map(([key, value]) => {
    const hex = parseHex(value);
    if (hex === null) throw new TypeError(`couleur invalide (${key}) : ${value}`);
    return [key, hex] as const;
  });
  for (const font of [kit.fonts.heading, kit.fonts.body]) {
    if (!(FONTS as readonly string[]).includes(font)) throw new TypeError(`police hors liste : ${font}`);
  }
  assertInRange("titres", kit.sizes.heading, BOUNDS.heading);
  assertInRange("texte", kit.sizes.base, BOUNDS.base);
  assertInRange("petit texte", kit.sizes.small, BOUNDS.small);
  assertInRange("rayon", kit.radius, BOUNDS.radius);

  const c = Object.fromEntries(colors);
  return [
    ":root {",
    `  --color-primary: ${c.primary};`,
    `  --color-secondary: ${c.secondary};`,
    `  --color-accent: ${c.accent};`,
    `  --color-background: ${c.background};`,
    `  --color-text: ${c.text};`,
    `  --font-heading: "${kit.fonts.heading}";`,
    `  --font-body: "${kit.fonts.body}";`,
    `  --text-heading: ${kit.sizes.heading}px;`,
    `  --text-base: ${kit.sizes.base}px;`,
    `  --text-small: ${kit.sizes.small}px;`,
    `  --radius: ${kit.radius}px;`,
    `  --button-border: ${kit.buttonStyle === "outline" ? "2px" : "0"};`,
    "}",
    "",
  ].join("\n");
}
