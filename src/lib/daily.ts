import { parseHex } from "./brand-kit";

export const MAX_ATTEMPTS = 5;

export type Verdict = "juste" | "trop haut" | "trop bas";
export type Channel = "r" | "g" | "b";

const dayFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Paris",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Jour calendaire de Paris (AAAA-MM-JJ) : tout le monde joue la même couleur le même jour. */
export function parisDateKey(date: Date): string {
  return dayFormat.format(date);
}

/** Couleur du jour : FNV-1a sur la date, donc stable et sans état à stocker. */
export function colorForDay(dateKey: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < dateKey.length; i++) {
    hash ^= dateKey.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return `#${(hash & 0xffffff).toString(16).padStart(6, "0")}`;
}

function channels(hex: string): Record<Channel, number> {
  const value = parseInt(hex.slice(1), 16);
  return { r: (value >> 16) & 0xff, g: (value >> 8) & 0xff, b: value & 0xff };
}

function verdict(guess: number, target: number): Verdict {
  if (guess === target) return "juste";
  return guess > target ? "trop haut" : "trop bas";
}

/** Compare une proposition à la couleur du jour, canal par canal. */
export function evaluateGuess(target: string, guess: string) {
  const normalized = parseHex(guess);
  if (normalized === null) throw new TypeError(`HEX invalide : ${guess}`);
  const t = channels(target);
  const g = channels(normalized);
  return {
    won: normalized === target,
    channels: {
      r: verdict(g.r, t.r),
      g: verdict(g.g, t.g),
      b: verdict(g.b, t.b),
    },
  };
}

const EMOJI: Record<Verdict, string> = { juste: "🟩", "trop haut": "🔺", "trop bas": "🔻" };

/** Texte à partager : score en essais, puis une ligne par proposition. */
export function shareText(dateKey: string, attempts: number, won: boolean, rows: string[]): string {
  const score = won ? `${attempts}/${MAX_ATTEMPTS}` : `X/${MAX_ATTEMPTS}`;
  const grid = rows.map((hex) => {
    const { channels: c } = evaluateGuess(colorForDay(dateKey), hex);
    return [c.r, c.g, c.b].map((v) => EMOJI[v]).join("");
  });
  return [`Craftly · teinte du jour ${dateKey} · ${score}`, ...grid, "craftly.projectp.fr"].join("\n");
}

function previousDay(dateKey: string): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d - 1)).toISOString().slice(0, 10);
}

/** Jours gagnés consécutifs jusqu'à aujourd'hui, ou jusqu'à hier si la partie du jour n'est pas jouée. */
export function computeStreak(wonDays: string[], today: string): number {
  const won = new Set(wonDays);
  let day = won.has(today) ? today : previousDay(today);
  let streak = 0;
  while (won.has(day)) {
    streak++;
    day = previousDay(day);
  }
  return streak;
}
