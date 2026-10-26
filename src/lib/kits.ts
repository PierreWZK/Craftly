import { randomUUID } from "node:crypto";
import type Database from "better-sqlite3";
import { BOUNDS, type BrandKit, FONTS, buildCss, parseHex } from "./brand-kit";

export type KitSummary = { id: string; name: string; client: string; updatedAt: string };

const TEXT_LIMIT = { name: 80, client: 80, description: 240 } as const;

export function createKitsTable(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS kits (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS kits_user ON kits (user_id, updated_at);
  `);
}

/** Vérifie la forme d'un kit venu de l'extérieur. Un kit qui ne passe pas n'est ni écrit, ni relu. */
export function validateKit(input: unknown): BrandKit | null {
  if (typeof input !== "object" || input === null) return null;
  const kit = input as BrandKit;
  const strings = [
    [kit.name, TEXT_LIMIT.name],
    [kit.client, TEXT_LIMIT.client],
    [kit.description, TEXT_LIMIT.description],
  ] as const;
  for (const [value, max] of strings) {
    if (typeof value !== "string" || value.length > max) return null;
  }
  const colors = kit.colors;
  if (typeof colors !== "object" || colors === null) return null;
  for (const key of ["primary", "secondary", "accent", "background", "text"] as const) {
    if (typeof colors[key] !== "string" || parseHex(colors[key]) === null) return null;
  }
  if (!kit.fonts || !(FONTS as readonly string[]).includes(kit.fonts.heading) || !(FONTS as readonly string[]).includes(kit.fonts.body)) {
    return null;
  }
  const sizes = kit.sizes;
  if (!sizes || !inRange(sizes.heading, BOUNDS.heading) || !inRange(sizes.base, BOUNDS.base) || !inRange(sizes.small, BOUNDS.small)) {
    return null;
  }
  if (!inRange(kit.radius, BOUNDS.radius)) return null;
  if (kit.buttonStyle !== "solid" && kit.buttonStyle !== "outline") return null;
  try {
    buildCss(kit);
  } catch {
    return null;
  }
  return kit;
}

function inRange(value: unknown, [min, max]: readonly [number, number]): boolean {
  return Number.isInteger(value) && (value as number) >= min && (value as number) <= max;
}

/** Crée un kit pour l'utilisateur. Refuse un kit invalide. */
export function createKit(db: Database.Database, userId: string, kit: BrandKit): string {
  const valid = validateKit(kit);
  if (valid === null) throw new TypeError("kit invalide");
  const id = randomUUID();
  db.prepare("INSERT INTO kits (id, user_id, data, updated_at) VALUES (?, ?, ?, ?)").run(
    id,
    userId,
    JSON.stringify(valid),
    new Date().toISOString(),
  );
  return id;
}

export function listKits(db: Database.Database, userId: string): KitSummary[] {
  const rows = db
    .prepare("SELECT id, data, updated_at FROM kits WHERE user_id = ? ORDER BY updated_at DESC")
    .all(userId) as { id: string; data: string; updated_at: string }[];
  return rows.flatMap((row) => {
    const kit = parseStored(row.data);
    return kit ? [{ id: row.id, name: kit.name, client: kit.client, updatedAt: row.updated_at }] : [];
  });
}

/** Renvoie le kit seulement s'il appartient à cet utilisateur et s'il est encore valide. */
export function getKit(db: Database.Database, userId: string, id: string): BrandKit | null {
  const row = db.prepare("SELECT data FROM kits WHERE id = ? AND user_id = ?").get(id, userId) as { data: string } | undefined;
  return row ? parseStored(row.data) : null;
}

export function saveKit(db: Database.Database, userId: string, id: string, kit: BrandKit): boolean {
  const valid = validateKit(kit);
  if (valid === null) return false;
  const result = db
    .prepare("UPDATE kits SET data = ?, updated_at = ? WHERE id = ? AND user_id = ?")
    .run(JSON.stringify(valid), new Date().toISOString(), id, userId);
  return result.changes === 1;
}

export function deleteKit(db: Database.Database, userId: string, id: string): boolean {
  const result = db.prepare("DELETE FROM kits WHERE id = ? AND user_id = ?").run(id, userId);
  return result.changes === 1;
}

function parseStored(data: string): BrandKit | null {
  try {
    return validateKit(JSON.parse(data));
  } catch {
    return null;
  }
}
