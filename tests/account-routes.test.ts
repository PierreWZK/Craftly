import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

describe("routes de compte", () => {
  it("expose l'API d'authentification sous /api/auth", () => {
    const route = read("app/api/auth/[...all]/route.ts");
    expect(route).toContain("toNextJsHandler");
    expect(route).toMatch(/export async function GET/);
    expect(route).toMatch(/export async function POST/);
  });

  it("a une page d'inscription et une page de connexion", () => {
    expect(existsSync(new URL("../app/inscription/page.tsx", import.meta.url))).toBe(true);
    expect(existsSync(new URL("../app/connexion/page.tsx", import.meta.url))).toBe(true);
  });

  it("protège /app : sans session, redirection vers /connexion", () => {
    const page = read("app/app/page.tsx");
    expect(page).toContain("getSession");
    expect(page).toMatch(/redirect\("\/connexion"\)/);
  });

  it("propose la déconnexion depuis /app", () => {
    expect(read("app/app/page.tsx")).toContain("SignOutButton");
    expect(read("components/SignOutButton.tsx")).toContain("authClient.signOut");
  });

  it("ne met aucun secret en dur dans le code", () => {
    expect(read("src/lib/auth.ts")).toContain("process.env.BETTER_AUTH_SECRET");
    expect(read(".gitignore")).toMatch(/\*\.db/);
  });
});
