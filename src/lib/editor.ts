import { BOUNDS, type BrandKit, FONTS, type FontName, buildCss, parseHex, randomColor } from "./brand-kit";

export type ColorKey = keyof BrandKit["colors"];
export type SizeKey = keyof BrandKit["sizes"];
export type Result = { kit: BrandKit; error: string | null };

export const COLOR_LABELS: Record<ColorKey, string> = {
  primary: "Principale",
  secondary: "Secondaire",
  accent: "Accent",
  background: "Fond",
  text: "Texte",
};

export const TEXT_LIMIT = { name: 80, client: 80, description: 240 } as const;

const ok = (kit: BrandKit): Result => ({ kit, error: null });
const fail = (kit: BrandKit, error: string): Result => ({ kit, error });

/** Une saisie invalide ne remplace jamais la dernière valeur valide : le kit renvoyé reste celui d'avant. */
export function setColor(kit: BrandKit, key: ColorKey, raw: string): Result {
  const hex = parseHex(raw);
  if (hex === null) return fail(kit, "HEX invalide : saisissez #rrggbb ou #rgb.");
  return ok({ ...kit, colors: { ...kit.colors, [key]: hex } });
}

export function randomizeColor(kit: BrandKit, key: ColorKey, random: () => number = Math.random): Result {
  return ok({ ...kit, colors: { ...kit.colors, [key]: randomColor(random) } });
}

export function setText(kit: BrandKit, field: keyof typeof TEXT_LIMIT, raw: string): Result {
  if (raw.length > TEXT_LIMIT[field]) return fail(kit, `${TEXT_LIMIT[field]} caractères au maximum.`);
  return ok({ ...kit, [field]: raw });
}

export function setFont(kit: BrandKit, role: "heading" | "body", name: string): Result {
  if (!(FONTS as readonly string[]).includes(name)) return fail(kit, "Cette police n'est pas dans la liste.");
  return ok({ ...kit, fonts: { ...kit.fonts, [role]: name as FontName } });
}

function inBounds(name: string, value: number, [min, max]: readonly [number, number]): string | null {
  if (!Number.isInteger(value) || value < min || value > max) return `${name} : entre ${min} et ${max}.`;
  return null;
}

export function setSize(kit: BrandKit, key: SizeKey, value: number): Result {
  const bounds = key === "heading" ? BOUNDS.heading : key === "base" ? BOUNDS.base : BOUNDS.small;
  const error = inBounds("taille", value, bounds);
  if (error) return fail(kit, error);
  return ok({ ...kit, sizes: { ...kit.sizes, [key]: value } });
}

export function setRadius(kit: BrandKit, value: number): Result {
  const error = inBounds("rayon", value, BOUNDS.radius);
  if (error) return fail(kit, error);
  return ok({ ...kit, radius: value });
}

export function setButtonStyle(kit: BrandKit, style: BrandKit["buttonStyle"]): Result {
  return ok({ ...kit, buttonStyle: style });
}

/** Le texte copié et le texte téléchargé sont tous deux issus de cette fonction. */
export function exportText(kit: BrandKit): string {
  return buildCss(kit);
}

export function exportFilename(kit: BrandKit): string {
  const slug = kit.name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${slug || "craftly"}-variables.css`;
}

/** Une seule feuille Google Fonts pour les deux polices du kit (sans doublon). */
export function fontsUrl(kit: BrandKit): string {
  const families = [...new Set([kit.fonts.heading, kit.fonts.body])];
  const params = families.map((f) => `family=${f.replace(/ /g, "+")}:wght@400;600;700;800`);
  return `https://fonts.googleapis.com/css2?${params.join("&")}&display=swap`;
}
