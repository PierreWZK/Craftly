import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { type Auth, type AuthHandle, createAuth } from "../src/lib/auth";

const PASSWORD = "motdepasse-test-1";
const EMAIL = "client@example.com";

describe("auth (SQLite, base temporaire)", () => {
  let dir: string;
  let auth: Auth;
  let handle: AuthHandle;

  beforeEach(async () => {
    dir = mkdtempSync(join(tmpdir(), "craftly-auth-"));
    handle = await createAuth({ dbPath: join(dir, "test.db"), secret: "s".repeat(40), baseURL: "http://localhost:3014" });
    auth = handle.auth;
  });

  afterEach(() => {
    handle.close();
    rmSync(dir, { recursive: true, force: true });
  });

  it("crée un compte, puis ouvre une session à la connexion", async () => {
    await auth.api.signUpEmail({ body: { email: EMAIL, password: PASSWORD, name: "Cliente" } });

    const res = await auth.api.signInEmail({
      body: { email: EMAIL, password: PASSWORD },
      asResponse: true,
    });
    const cookie = res.headers.get("set-cookie");
    expect(cookie).toContain("better-auth.session_token");

    const session = await auth.api.getSession({ headers: new Headers({ cookie: cookie!.split(";")[0] }) });
    expect(session?.user.email).toBe(EMAIL);
  });

  it("sans cookie, il n'y a pas de session", async () => {
    expect(await auth.api.getSession({ headers: new Headers() })).toBeNull();
  });

  it("refuse un mot de passe faux", async () => {
    await auth.api.signUpEmail({ body: { email: EMAIL, password: PASSWORD, name: "Cliente" } });
    await expect(auth.api.signInEmail({ body: { email: EMAIL, password: "mauvais-mot-de-passe" } })).rejects.toThrow();
  });

  it("refuse un second compte avec le même e-mail", async () => {
    await auth.api.signUpEmail({ body: { email: EMAIL, password: PASSWORD, name: "Cliente" } });
    await expect(auth.api.signUpEmail({ body: { email: EMAIL, password: PASSWORD, name: "Autre" } })).rejects.toThrow();
  });
});
