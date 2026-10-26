import { DEFAULT_KIT, buildCss } from "../src/lib/brand-kit";

// Le CSS vient du même générateur que l'éditeur : l'exemple montre exactement ce qui sera exporté.
const css = buildCss(DEFAULT_KIT).replace(":root", ".kit-preview");

// Un cran de ton au-dessus de la surface du client, pour séparer les blocs sans filet.
const tile = {
  background: "color-mix(in srgb, var(--color-text) 6%, var(--color-background))",
  color: "var(--color-text)",
  borderRadius: "var(--radius)",
};

const swatches = [
  { label: "Primaire", value: DEFAULT_KIT.colors.primary, token: "var(--color-primary)", ink: "#ffffff" },
  { label: "Secondaire", value: DEFAULT_KIT.colors.secondary, token: "var(--color-secondary)", ink: "#1d1d1d" },
  { label: "Accent", value: DEFAULT_KIT.colors.accent, token: "var(--color-accent)", ink: "#ffffff" },
  { label: "Fond", value: DEFAULT_KIT.colors.background, token: "var(--color-background)", ink: "#1d1d1d" },
  { label: "Texte", value: DEFAULT_KIT.colors.text, token: "var(--color-text)", ink: "#ffffff" },
];

export function KitPreview() {
  return (
    <div
      className="kit-preview rounded-[var(--radius)] p-2"
      style={{ background: "var(--color-background)", color: "var(--color-text)", fontFamily: "var(--font-body)" }}
    >
      {/* Polices du client : chargées ici, car le site ne les utilise pas pour lui-même */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Work+Sans:wght@400;600&display=swap"
      />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
        <div className="col-span-full flex flex-wrap items-end justify-between gap-4 p-5 md:p-6" style={tile}>
          <div>
            <p className="text-sm opacity-70">{DEFAULT_KIT.client}</p>
            <p className="mt-1 text-[1.75rem] leading-none" style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "var(--color-primary)" }}>
              {DEFAULT_KIT.name}
            </p>
          </div>
          <span className="text-sm opacity-70">Exemple : charte complète</span>
        </div>

        {swatches.map((s) => (
          <div
            key={s.label}
            className="col-span-1 flex flex-col justify-between gap-6 p-4 md:col-span-2"
            style={{ background: s.token, color: s.ink, borderRadius: "var(--radius)" }}
          >
            <span className="text-sm font-semibold">{s.label}</span>
            <span className="text-sm tabular-nums">{s.value}</span>
          </div>
        ))}

        <div className="col-span-full grid gap-2 md:col-span-7 md:grid-cols-2">
          <div className="p-5" style={tile}>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-heading)", fontWeight: 700, lineHeight: 1.05 }}>
              Un titre de la charte
            </p>
            <p className="mt-4" style={{ fontSize: "var(--text-base)", lineHeight: 1.5 }}>
              Le texte courant suit la police de corps, à la taille de base du kit.
            </p>
            <p className="mt-3" style={{ fontSize: "var(--text-small)" }}>
              Petit texte, légendes et mentions.
            </p>
          </div>
          <div className="flex flex-col gap-3 p-5" style={tile}>
            <button
              type="button"
              className="px-5 py-3 text-left font-semibold"
              style={{
                background: "var(--color-primary)",
                color: "#ffffff",
                borderRadius: "var(--radius)",
                border: "var(--button-border) solid var(--color-accent)",
                fontFamily: "var(--font-body)",
              }}
            >
              Bouton principal
            </button>
            <button
              type="button"
              className="border-2 px-5 py-3 text-left font-semibold"
              style={{ borderColor: "var(--color-secondary)", color: "var(--color-text)", borderRadius: "var(--radius)", fontFamily: "var(--font-body)" }}
            >
              Bouton secondaire
            </button>
            <label className="flex flex-col gap-1 text-sm">
              Nom de la marque
              <input
                readOnly
                value={DEFAULT_KIT.name}
                className="px-3 py-2"
                style={{ background: "var(--color-background)", color: "var(--color-text)", borderRadius: "var(--radius)", border: "1px solid color-mix(in srgb, var(--color-text) 20%, var(--color-background))" }}
              />
            </label>
          </div>
        </div>

        <div className="col-span-full p-5 md:col-span-5" style={{ background: "var(--color-secondary)", color: "var(--color-text)", borderRadius: "var(--radius)" }}>
          <p style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-heading)", fontWeight: 700, lineHeight: 1.05 }}>
            Carte
          </p>
          <p className="mt-3">Une carte posée sur la couleur secondaire, avec le même rayon que les boutons.</p>
        </div>

        <pre className="col-span-full overflow-x-auto bg-ink p-5 text-sm leading-relaxed text-bg" style={{ borderRadius: "var(--radius)" }}>
          <code>{buildCss(DEFAULT_KIT)}</code>
        </pre>
      </div>
    </div>
  );
}
