import { describe, expect, it } from "vitest";
import { parseHex } from "../src/lib/brand-kit";
import {
  MAX_ATTEMPTS,
  colorForDay,
  computeStreak,
  evaluateGuess,
  parisDateKey,
  shareText,
} from "../src/lib/daily";

describe("parisDateKey", () => {
  it("donne le jour de Paris, pas celui de UTC", () => {
    // 25 octobre 2026 : passage à l'heure d'hiver à 03:00 CEST, donc Paris = UTC+1
    expect(parisDateKey(new Date("2026-10-25T22:59:59Z"))).toBe("2026-10-25");
    expect(parisDateKey(new Date("2026-10-25T23:00:00Z"))).toBe("2026-10-26");
  });
});

describe("colorForDay", () => {
  it("donne la même couleur pour la même date", () => {
    expect(colorForDay("2026-10-26")).toBe(colorForDay("2026-10-26"));
  });

  it("donne une autre couleur le lendemain, et un HEX valide", () => {
    expect(colorForDay("2026-10-27")).not.toBe(colorForDay("2026-10-26"));
    const color = colorForDay("2026-10-26");
    expect(parseHex(color)).toBe(color);
  });
});

describe("evaluateGuess", () => {
  const target = "#102030";

  it("marque chaque canal juste, trop haut ou trop bas", () => {
    expect(evaluateGuess(target, "#112030")).toEqual({
      won: false,
      channels: { r: "trop haut", g: "juste", b: "juste" },
    });
    expect(evaluateGuess(target, "#0f2040")).toEqual({
      won: false,
      channels: { r: "trop bas", g: "juste", b: "trop haut" },
    });
  });

  it("gagne quand la couleur est exacte", () => {
    expect(evaluateGuess(target, "#102030").won).toBe(true);
  });
});

describe("shareText", () => {
  it("affiche le score en essais, ou X/5 en cas d'échec", () => {
    const win = shareText("2026-10-26", 2, true, ["#102030"]);
    expect(win.split("\n")[0]).toContain("2/5");
    const loss = shareText("2026-10-26", MAX_ATTEMPTS, false, []);
    expect(loss.split("\n")[0]).toContain("X/5");
  });
});

describe("computeStreak", () => {
  it("compte les jours gagnés consécutifs jusqu'à aujourd'hui", () => {
    expect(computeStreak(["2026-10-24", "2026-10-25", "2026-10-26"], "2026-10-26")).toBe(3);
  });

  it("garde la série si la partie du jour n'est pas encore jouée", () => {
    expect(computeStreak(["2026-10-24", "2026-10-25"], "2026-10-26")).toBe(2);
  });

  it("repart de zéro après un jour manqué", () => {
    expect(computeStreak(["2026-10-23", "2026-10-24"], "2026-10-26")).toBe(0);
  });
});
