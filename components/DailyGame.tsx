"use client";

import { useEffect, useState } from "react";
import { parseHex } from "../src/lib/brand-kit";
import { MAX_ATTEMPTS, colorForDay, computeStreak, evaluateGuess, parisDateKey, shareText } from "../src/lib/daily";

const STORAGE_KEY = "craftly:teinte-du-jour";

type Day = { rows: string[]; won: boolean };
type Store = Record<string, Day>;

// localStorage peut être vide, bloqué ou corrompu : on ne garde que ce qui ressemble à notre format.
function readStore(): Store {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
    if (typeof raw !== "object" || raw === null) return {};
    const store: Store = {};
    for (const [key, value] of Object.entries(raw)) {
      const day = value as Day;
      if (Array.isArray(day?.rows) && typeof day.won === "boolean") {
        store[key] = { won: day.won, rows: day.rows.filter((r) => typeof r === "string" && parseHex(r) !== null) };
      }
    }
    return store;
  } catch {
    return {};
  }
}

function writeStore(store: Store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Stockage indisponible : la partie reste jouable pour la page ouverte.
  }
}

const chip = "rounded-[var(--radius)] px-2 py-1 bg-tile";

export function DailyGame() {
  const [today, setToday] = useState<string | null>(null);
  const [store, setStore] = useState<Store>({});
  const [draft, setDraft] = useState("#808080");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setToday(parisDateKey(new Date()));
    setStore(readStore());
  }, []);

  if (today === null) {
    return <div className="min-h-[24rem] rounded-[var(--radius)] bg-tile" aria-busy="true" />;
  }

  const target = colorForDay(today);
  const day: Day = store[today] ?? { rows: [], won: false };
  const finished = day.won || day.rows.length >= MAX_ATTEMPTS;
  const results = day.rows.map((hex) => evaluateGuess(target, hex));
  const wonDays = Object.keys(store).filter((k) => store[k].won);
  const streak = computeStreak(wonDays, today);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const hex = parseHex(draft);
    if (hex === null) {
      setError("Ce n'est pas un HEX valide : saisissez #rrggbb ou #rgb.");
      return;
    }
    setError(null);
    const result = evaluateGuess(target, hex);
    const next: Day = { rows: [...day.rows, hex], won: result.won };
    const updated = { ...store, [today as string]: next };
    setStore(updated);
    writeStore(updated);
  }

  async function share() {
    const text = shareText(today as string, day.rows.length, day.won, day.rows);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setError("Copie impossible : le texte est affiché ci-dessous.");
    }
  }

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
      <div className="flex flex-col gap-4 rounded-[var(--radius)] bg-tile p-5 md:col-span-5 md:p-6">
        <h2 className="font-display text-xl font-extrabold leading-[0.95] tracking-[-0.04em]">Teinte du jour</h2>
        <p className="text-muted">
          Une couleur, la même pour tout le monde aujourd'hui. Retrouvez son HEX en {MAX_ATTEMPTS} essais : chaque canal vous
          indique s'il est juste, trop haut ou trop bas.
        </p>
        <p className="text-sm text-muted">
          {streak > 0 ? `🔥 Série : ${streak} jour${streak > 1 ? "s" : ""}` : "Gagnez pour lancer une série."}
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-[var(--radius)] bg-tile p-5 md:col-span-7 md:p-6">
        {!finished ? (
          <form onSubmit={submit} className="flex flex-wrap items-end gap-3">
            <label className="flex flex-col gap-1 text-sm">
              Votre proposition
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="w-40 rounded-[var(--radius)] border px-3 py-2 font-medium"
                style={{ background: "var(--color-bg)", color: "var(--color-ink)", borderColor: "var(--color-muted)" }}
                aria-invalid={error !== null}
                aria-describedby={error ? "daily-error" : undefined}
              />
            </label>
            <input
              type="color"
              aria-label="Choisir la couleur au sélecteur"
              value={parseHex(draft) ?? "#808080"}
              onChange={(e) => setDraft(e.target.value)}
              className="h-10 w-12 cursor-pointer rounded-[var(--radius)] border-0 bg-transparent p-0"
            />
            <button
              type="submit"
              className="rounded-[var(--radius)] bg-accent px-5 py-2.5 font-semibold text-accent-ink transition duration-[var(--duration-hover)] hover:bg-accent-hover active:scale-[var(--press-scale)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Valider · essai {day.rows.length + 1}/{MAX_ATTEMPTS}
            </button>
            {error && (
              <p id="daily-error" role="alert" className="w-full text-sm" style={{ color: "var(--color-danger)" }}>
                {error}
              </p>
            )}
          </form>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="font-display text-lg font-extrabold">
              {day.won ? `Trouvé en ${day.rows.length} essai${day.rows.length > 1 ? "s" : ""} !` : "Raté pour aujourd'hui."}
            </p>
            <div className="flex items-center gap-3 text-sm">
              <span className="h-8 w-8 rounded-[var(--radius)]" style={{ background: target }} aria-hidden="true" />
              <span>La couleur du jour : {target}</span>
            </div>
          </div>
        )}

        {day.rows.length > 0 && (
          <ol className="flex flex-col gap-2 text-sm">
            {day.rows.map((hex, i) => {
              const r = results[i];
              return (
                <li key={`${hex}-${i}`} className="flex flex-wrap items-center gap-2">
                  <span className="h-6 w-6 rounded-[var(--radius)]" style={{ background: hex }} aria-hidden="true" />
                  <span className="w-20 tabular-nums">{hex}</span>
                  {(["r", "g", "b"] as const).map((c) => (
                    <span key={c} className={chip}>
                      {c.toUpperCase()} {r.channels[c]}
                    </span>
                  ))}
                </li>
              );
            })}
          </ol>
        )}

        {finished && (
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={share}
              className="self-start rounded-[var(--radius)] border-2 px-5 py-2.5 font-semibold transition duration-[var(--duration-hover)] active:scale-[var(--press-scale)]"
              style={{ borderColor: "var(--color-accent)", color: "var(--color-ink)" }}
            >
              {copied ? "Copié !" : "Partager le résultat"}
            </button>
            {error && <p className="text-sm" role="alert">{error}</p>}
            <pre className="overflow-x-auto whitespace-pre-wrap rounded-[var(--radius)] bg-bg p-3 text-sm">
              {shareText(today, day.rows.length, day.won, day.rows)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
