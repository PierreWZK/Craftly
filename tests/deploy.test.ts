import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const exists = (path: string) => existsSync(new URL(`../${path}`, import.meta.url));

describe("mise en ligne", () => {
  it("construit une image Docker en trois étapes, avec un utilisateur non root", () => {
    const dockerfile = read("Dockerfile");
    expect(dockerfile.match(/^FROM /gm)).toHaveLength(3);
    expect(dockerfile).toMatch(/npm ci/);
    expect(dockerfile).toMatch(/npm run build/);
    expect(dockerfile).toMatch(/^USER node$/m);
    expect(dockerfile).toMatch(/CMD \["node", "server\.js"\]/);
  });

  it("place la base SQLite sur un volume persistant", () => {
    const dockerfile = read("Dockerfile");
    expect(dockerfile).toMatch(/VOLUME \["\/data"\]/);
    expect(dockerfile).toMatch(/DATABASE_PATH=\/data\/craftly\.db/);
  });

  it("n'embarque aucun secret ni base locale dans l'image", () => {
    const dockerfile = read("Dockerfile");
    expect(dockerfile).not.toMatch(/BETTER_AUTH_SECRET=\S/);
    const ignored = read(".dockerignore");
    for (const entry of ["node_modules", ".next", "data", ".env*", ".git"]) {
      expect(ignored).toContain(entry);
    }
  });

  it("documente les variables d'environnement sans valeur réelle", () => {
    expect(exists(".env.example")).toBe(true);
    const example = read(".env.example");
    for (const name of ["BETTER_AUTH_SECRET", "BETTER_AUTH_URL", "DATABASE_PATH"]) {
      expect(example).toMatch(new RegExp(`^${name}=`, "m"));
    }
    expect(example).not.toMatch(/BETTER_AUTH_SECRET=.{8,}/);
  });

  it("produit une sortie standalone pour l'image", () => {
    expect(read("next.config.mjs")).toMatch(/output: "standalone"/);
  });
});
