import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { type AuthHandle, createAuth } from "../src/lib/auth";
import { type BrandKit, DEFAULT_KIT } from "../src/lib/brand-kit";
import { createKit, deleteKit, getKit, listKits, saveKit } from "../src/lib/kits";

const PASSWORD = "motdepasse-test-1";

describe("kits enregistrés", () => {
  let dir: string;
  let dbPath: string;
  let handle: AuthHandle;
  let alice: string;
  let bob: string;

  beforeEach(async () => {
    dir = mkdtempSync(join(tmpdir(), "craftly-kits-"));
    dbPath = join(dir, "test.db");
    handle = await createAuth({ dbPath, secret: "s".repeat(40), baseURL: "http://localhost:3014" });
    alice = await signUp("alice@example.com");
    bob = await signUp("bob@example.com");
  });

  afterEach(() => {
    handle.close();
    rmSync(dir, { recursive: true, force: true });
  });

  async function signUp(email: string): Promise<string> {
    const { user } = await handle.auth.api.signUpEmail({ body: { email, password: PASSWORD, name: email.split("@")[0] } });
    return user.id;
  }

  it("crée un kit, le liste et le relit à l'identique", () => {
    const id = createKit(handle.db, alice, DEFAULT_KIT);
    expect(listKits(handle.db, alice)).toEqual([
      expect.objectContaining({ id, name: DEFAULT_KIT.name, client: DEFAULT_KIT.client }),
    ]);
    expect(getKit(handle.db, alice, id)).toEqual(DEFAULT_KIT);
  });

  it("ne montre, ne modifie et ne supprime jamais le kit d'un autre utilisateur", () => {
    const id = createKit(handle.db, alice, DEFAULT_KIT);
    expect(listKits(handle.db, bob)).toEqual([]);
    expect(getKit(handle.db, bob, id)).toBeNull();
    expect(saveKit(handle.db, bob, id, { ...DEFAULT_KIT, name: "Piraté" })).toBe(false);
    expect(deleteKit(handle.db, bob, id)).toBe(false);
    expect(getKit(handle.db, alice, id)).toEqual(DEFAULT_KIT);
  });

  it("enregistre une modification et un renommage", () => {
    const id = createKit(handle.db, alice, DEFAULT_KIT);
    const renamed: BrandKit = { ...DEFAULT_KIT, name: "Nouvelle charte", radius: 12 };
    expect(saveKit(handle.db, alice, id, renamed)).toBe(true);
    expect(listKits(handle.db, alice)[0].name).toBe("Nouvelle charte");
    expect(getKit(handle.db, alice, id)).toEqual(renamed);
  });

  it("supprime un kit", () => {
    const id = createKit(handle.db, alice, DEFAULT_KIT);
    expect(deleteKit(handle.db, alice, id)).toBe(true);
    expect(listKits(handle.db, alice)).toEqual([]);
  });

  it("retrouve le kit à l'identique après fermeture et réouverture de la base", async () => {
    const id = createKit(handle.db, alice, DEFAULT_KIT);
    handle.close();
    handle = await createAuth({ dbPath, secret: "s".repeat(40), baseURL: "http://localhost:3014" });
    expect(getKit(handle.db, alice, id)).toEqual(DEFAULT_KIT);
  });

  it("refuse un kit invalide à l'écriture", () => {
    const bad = { ...DEFAULT_KIT, colors: { ...DEFAULT_KIT.colors, primary: "red;}body{x:1" } } as BrandKit;
    expect(() => createKit(handle.db, alice, bad)).toThrow();
    const id = createKit(handle.db, alice, DEFAULT_KIT);
    expect(saveKit(handle.db, alice, id, bad)).toBe(false);
    expect(getKit(handle.db, alice, id)).toEqual(DEFAULT_KIT);
  });

  it("ne renvoie pas un kit corrompu en base", () => {
    const id = createKit(handle.db, alice, DEFAULT_KIT);
    handle.db.prepare("UPDATE kits SET data = ? WHERE id = ?").run('{"colors":"pas un objet"}', id);
    expect(getKit(handle.db, alice, id)).toBeNull();
  });
});
