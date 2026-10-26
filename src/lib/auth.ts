import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import Database from "better-sqlite3";
import { betterAuth } from "better-auth";
import { getMigrations } from "better-auth/db/migration";
import { nextCookies } from "better-auth/next-js";

export type AuthOptions = { dbPath: string; secret: string; baseURL: string };

/** Crée l'instance d'authentification et ses tables SQLite. Testable avec une base temporaire. */
export async function createAuth({ dbPath, secret, baseURL }: AuthOptions) {
  mkdirSync(dirname(dbPath), { recursive: true });
  const db = new Database(dbPath);
  const options = {
    database: db,
    secret,
    baseURL,
    emailAndPassword: { enabled: true, minPasswordLength: 8 },
    // Anti-force brute : au plus 10 tentatives par minute et par adresse.
    rateLimit: { enabled: true, window: 60, max: 10 },
    plugins: [nextCookies()],
  };
  const { runMigrations } = await getMigrations(options);
  await runMigrations();
  return { auth: betterAuth(options), close: () => db.close() };
}

export type AuthHandle = Awaited<ReturnType<typeof createAuth>>;
export type Auth = AuthHandle["auth"];

let instance: Promise<AuthHandle> | undefined;

/** Instance partagée de l'application, configurée par l'environnement. */
export function getAuth(): Promise<Auth> {
  instance ??= createAuth(readConfig());
  return instance.then((handle) => handle.auth);
}

function readConfig(): AuthOptions {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("BETTER_AUTH_SECRET manquant : il est obligatoire en production.");
  }
  return {
    dbPath: process.env.DATABASE_PATH ?? "./data/craftly.db",
    secret: secret ?? "craftly-dev-only-secret-change-me-0123456789",
    baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3014",
  };
}
