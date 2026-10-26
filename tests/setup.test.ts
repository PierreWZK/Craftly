import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

describe("setup", () => {
  it("expose les jetons de la direction Planche à Tailwind", () => {
    const tokens = read("design/tokens.css");
    expect(tokens).toMatch(/@theme\s*\{/);
    for (const name of ["--color-bg", "--color-ink", "--color-accent", "--font-display", "--font-text", "--radius"]) {
      expect(tokens).toContain(`${name}:`);
    }
    expect(read("app/globals.css")).toContain('@import "../design/tokens.css"');
  });

  it("n'utilise plus Plus Jakarta Sans ni le violet de la V1", () => {
    const sources = ["app/layout.tsx", "app/globals.css", "app/page.tsx", "components/Logo.tsx"].map(read).join("\n");
    expect(sources).not.toMatch(/Jakarta|5b5bf0|(bg|text|border|shadow)-brand|color-brand/i);
  });
});
