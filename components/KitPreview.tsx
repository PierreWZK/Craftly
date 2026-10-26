import { Copy } from "lucide-react";
import { type BrandKit, DEFAULT_KIT, buildCss } from "../src/lib/brand-kit";
import { fontsUrl } from "../src/lib/editor";

// Le CSS vient du même générateur que l'éditeur : l'exemple montre exactement ce qui sera exporté.
export const KIT_CSS = buildCss(DEFAULT_KIT);

/** La charte d'un client : une grande tuile (typo, boutons, champ, carte) et une colonne de nuances. */
export function KitPreview({ kit = DEFAULT_KIT }: { kit?: BrandKit }) {
  const css = buildCss(kit).replace(":root", ".kit-preview");
  const swatches = [
    { label: "Principale", value: kit.colors.primary, ink: "#ffffff" },
    { label: "Secondaire", value: kit.colors.secondary, ink: "#1d1d1d" },
    { label: "Accent", value: kit.colors.accent, ink: "#ffffff" },
    { label: "Texte", value: kit.colors.text, ink: "#ffffff" },
  ];
  return (
    <div className="kit-preview flex gap-2" style={{ fontFamily: "var(--font-body)" }}>
      {/* Polices du client : chargées ici, car le site ne les utilise pas pour lui-même */}
      <link rel="stylesheet" href={fontsUrl(kit)} />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div
        className="relative min-w-0 flex-1 overflow-hidden rounded-[var(--radius)] p-5 pr-16 md:p-7 md:pr-20"
        style={{ background: "var(--color-background)", color: "var(--color-text)" }}
      >
        {/* Encoche : le rond se pose dans une découpe couleur de page */}
        <span className="absolute right-0 top-0 rounded-bl-[var(--radius-notch)] bg-paper p-1.5">
          <span
            className="grid h-11 w-11 place-items-center rounded-full"
            style={{ background: "var(--color-primary)", color: "#ffffff" }}
            aria-hidden="true"
          >
            <Copy className="h-4 w-4" />
          </span>
        </span>

        <p className="text-sm opacity-70">{kit.client}</p>
        <p className="mt-1" style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-heading)", fontWeight: 700, lineHeight: 1.05, color: "var(--color-primary)" }}>
          {kit.name}
        </p>
        <p className="mt-4 max-w-md" style={{ fontSize: "var(--text-base)", lineHeight: 1.5 }}>
          Le texte courant suit la police de corps, à la taille de base du kit.
        </p>
        <p className="mt-2" style={{ fontSize: "var(--text-small)", opacity: 0.75 }}>
          Petit texte, légendes et mentions.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            className="px-5 py-3 font-semibold"
            style={{
              background: "var(--color-primary)",
              color: "#ffffff",
              borderRadius: "var(--radius)",
              border: "var(--button-border) solid var(--color-accent)",
            }}
          >
            Bouton principal
          </button>
          <button
            type="button"
            className="border-2 px-5 py-3 font-semibold"
            style={{ borderColor: "var(--color-secondary)", borderRadius: "var(--radius)" }}
          >
            Bouton secondaire
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            Nom de la marque
            <input
              readOnly
              value={kit.name}
              className="px-3 py-2"
              style={{
                background: "var(--color-background)",
                borderRadius: "var(--radius)",
                border: "1px solid color-mix(in srgb, var(--color-text) 25%, var(--color-background))",
              }}
            />
          </label>
          <div className="p-4" style={{ background: "var(--color-secondary)", borderRadius: "var(--radius)" }}>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1.25rem" }}>Carte</p>
            <p className="mt-1 text-sm">Même rayon que les boutons.</p>
          </div>
        </div>
      </div>

      <ul className="flex w-16 shrink-0 flex-col gap-2 sm:w-20" aria-label="Couleurs de la charte">
        {swatches.map((s) => (
          <li
            key={s.label}
            className="flex flex-1 flex-col justify-end rounded-[var(--radius-sm)] p-2 text-[0.6875rem] leading-tight"
            style={{ background: s.value, color: s.ink }}
          >
            <span className="font-semibold">{s.label}</span>
            <span className="tabular-nums">{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
