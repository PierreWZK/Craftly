"use client";

import { useState } from "react";
import { DEFAULT_KIT, FONTS, type BrandKit } from "../src/lib/brand-kit";
import {
  COLOR_LABELS,
  type ColorKey,
  type Result,
  exportFilename,
  exportText,
  randomizeColor,
  setButtonStyle,
  setColor,
  setFont,
  setRadius,
  setSize,
  setText,
} from "../src/lib/editor";
import { KitPreview } from "./KitPreview";

const label = "flex flex-col gap-1.5 text-sm font-semibold";
const input = "rounded-[var(--radius-sm)] border px-3 py-2 text-base font-normal";
const inputStyle = { background: "var(--color-bg)", color: "var(--color-ink)", borderColor: "var(--color-muted)" };
const section = "flex flex-col gap-4 border-t pt-6 first:border-t-0 first:pt-0";
const sectionStyle = { borderColor: "color-mix(in srgb, var(--color-ink) 12%, var(--color-tile))" };
const button =
  "rounded-[var(--radius)] px-4 py-2.5 font-semibold transition duration-[var(--duration-hover)] active:scale-[var(--press-scale)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const COLOR_KEYS = Object.keys(COLOR_LABELS) as ColorKey[];

export function KitEditor() {
  const [kit, setKit] = useState<BrandKit>(DEFAULT_KIT);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [copied, setCopied] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  /** Une saisie invalide signale l'erreur sur son champ, sans toucher au kit. */
  function apply(field: string, result: Result) {
    setErrors((e) => ({ ...e, [field]: result.error }));
    if (!result.error) setKit(result.kit);
  }

  function colorInput(key: ColorKey) {
    const draft = drafts[key] ?? kit.colors[key];
    return (
      <div key={key} className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="color"
            aria-label={`Couleur ${COLOR_LABELS[key].toLowerCase()}, au sélecteur`}
            value={kit.colors[key]}
            onChange={(e) => {
              setDrafts((d) => ({ ...d, [key]: e.target.value }));
              apply(`color-${key}`, setColor(kit, key, e.target.value));
            }}
            className="h-11 w-12 cursor-pointer rounded-[var(--radius-sm)] border-0 bg-transparent p-0"
          />
          <label className={`${label} min-w-0 flex-1`}>
            {COLOR_LABELS[key]}
            <input
              value={draft}
              onChange={(e) => {
                setDrafts((d) => ({ ...d, [key]: e.target.value }));
                apply(`color-${key}`, setColor(kit, key, e.target.value));
              }}
              aria-invalid={errors[`color-${key}`] ? true : undefined}
              className={`${input} w-full font-medium`}
              style={inputStyle}
            />
          </label>
          <button
            type="button"
            onClick={() => {
              const r = randomizeColor(kit, key);
              setDrafts((d) => ({ ...d, [key]: r.kit.colors[key] }));
              apply(`color-${key}`, r);
            }}
            className={`${button} border-2`}
            style={{ borderColor: "var(--color-accent)", color: "var(--color-ink)" }}
          >
            Au hasard
          </button>
        </div>
        {errors[`color-${key}`] && (
          <p role="alert" className="text-sm" style={{ color: "var(--color-danger)" }}>
            {errors[`color-${key}`]}
          </p>
        )}
      </div>
    );
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(exportText(kit));
      setCopied(true);
      setExportError(null);
    } catch {
      setExportError("Copie impossible : sélectionnez le texte ci-dessous et copiez-le.");
    }
  }

  function download() {
    const url = URL.createObjectURL(new Blob([exportText(kit)], { type: "text/css" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = exportFilename(kit);
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-2 md:grid-cols-12">
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6 rounded-[var(--radius)] bg-tile p-5 text-ink md:col-span-5 md:p-6">
        <fieldset className={section} style={sectionStyle}>
          <legend className="font-display text-lg font-extrabold">Projet</legend>
          <label className={label}>
            Nom du projet
            <input value={kit.name} onChange={(e) => apply("name", setText(kit, "name", e.target.value))} className={input} style={inputStyle} />
            {errors.name && <span role="alert" className="font-normal" style={{ color: "var(--color-danger)" }}>{errors.name}</span>}
          </label>
          <label className={label}>
            Nom du client
            <input value={kit.client} onChange={(e) => apply("client", setText(kit, "client", e.target.value))} className={input} style={inputStyle} />
            {errors.client && <span role="alert" className="font-normal" style={{ color: "var(--color-danger)" }}>{errors.client}</span>}
          </label>
          <label className={label}>
            Description (facultative)
            <textarea
              value={kit.description}
              onChange={(e) => apply("description", setText(kit, "description", e.target.value))}
              rows={2}
              className={input}
              style={inputStyle}
            />
            {errors.description && <span role="alert" className="font-normal" style={{ color: "var(--color-danger)" }}>{errors.description}</span>}
          </label>
        </fieldset>

        <fieldset className={section} style={sectionStyle}>
          <legend className="font-display text-lg font-extrabold">Couleurs</legend>
          {COLOR_KEYS.map(colorInput)}
        </fieldset>

        <fieldset className={section} style={sectionStyle}>
          <legend className="font-display text-lg font-extrabold">Typographies</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            {(["heading", "body"] as const).map((role) => (
              <label key={role} className={label}>
                {role === "heading" ? "Titres" : "Texte"}
                <select
                  value={kit.fonts[role]}
                  onChange={(e) => apply(`font-${role}`, setFont(kit, role, e.target.value))}
                  className={input}
                  style={inputStyle}
                >
                  {FONTS.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {([
              ["heading", "Titres (px)", kit.sizes.heading],
              ["base", "Texte (px)", kit.sizes.base],
              ["small", "Petit texte (px)", kit.sizes.small],
            ] as const).map(([key, text, value]) => (
              <label key={key} className={label}>
                {text}
                <input
                  type="number"
                  inputMode="numeric"
                  value={value}
                  onChange={(e) => apply(`size-${key}`, setSize(kit, key, Number(e.target.value)))}
                  className={input}
                  style={inputStyle}
                />
                {errors[`size-${key}`] && <span role="alert" className="font-normal" style={{ color: "var(--color-danger)" }}>{errors[`size-${key}`]}</span>}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={section} style={sectionStyle}>
          <legend className="font-display text-lg font-extrabold">Composants</legend>
          <label className={label}>
            Rayon des bordures (px)
            <input
              type="number"
              inputMode="numeric"
              value={kit.radius}
              onChange={(e) => apply("radius", setRadius(kit, Number(e.target.value)))}
              className={input}
              style={inputStyle}
            />
            {errors.radius && <span role="alert" className="font-normal" style={{ color: "var(--color-danger)" }}>{errors.radius}</span>}
          </label>
          <div className="flex flex-wrap gap-4 text-sm font-semibold">
            {(["solid", "outline"] as const).map((style) => (
              <label key={style} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="button-style"
                  checked={kit.buttonStyle === style}
                  onChange={() => apply("button", setButtonStyle(kit, style))}
                />
                {style === "solid" ? "Boutons pleins" : "Boutons en contour"}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={section} style={sectionStyle}>
          <legend className="font-display text-lg font-extrabold">Export</legend>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={copy} className={`${button} bg-accent text-accent-ink hover:bg-accent-hover`}>
              {copied ? "Copié !" : "Copier le CSS"}
            </button>
            <button type="button" onClick={download} className={`${button} border-2`} style={{ borderColor: "var(--color-accent)", color: "var(--color-ink)" }}>
              Télécharger le CSS
            </button>
          </div>
          <p className="break-all text-sm text-muted">Fichier : {exportFilename(kit)}</p>
          {exportError && <p role="alert" className="text-sm" style={{ color: "var(--color-danger)" }}>{exportError}</p>}
        </fieldset>
      </form>

      <div className="flex flex-col gap-4 rounded-[var(--radius)] bg-tile p-4 md:col-span-7 md:p-6">
        <p className="text-sm font-semibold text-muted">Aperçu en direct</p>
        <KitPreview kit={kit} />
        <pre className="overflow-x-auto whitespace-pre-wrap rounded-[var(--radius)] bg-bg p-4 text-sm text-ink">{exportText(kit)}</pre>
      </div>
    </div>
  );
}
