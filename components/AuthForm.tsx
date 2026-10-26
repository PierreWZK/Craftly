"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "../src/lib/auth-client";

type Mode = "inscription" | "connexion";

const field = "flex flex-col gap-1 text-sm";
const input = "rounded-[var(--radius)] border px-3 py-2.5 text-base";
const inputStyle = { background: "var(--color-bg)", color: "var(--color-ink)", borderColor: "var(--color-muted)" };

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    const name = String(data.get("name") ?? "");

    setPending(true);
    setError(null);
    const result =
      mode === "inscription"
        ? await authClient.signUp.email({ email, password, name })
        : await authClient.signIn.email({ email, password });
    setPending(false);

    if (result.error) {
      // Message générique : on ne dit pas si l'adresse existe déjà.
      setError(
        mode === "inscription"
          ? "Impossible de créer ce compte. Vérifiez les champs, ou essayez de vous connecter."
          : "E-mail ou mot de passe incorrect.",
      );
      return;
    }
    router.push("/app");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 rounded-[var(--radius)] bg-tile p-6 text-ink md:p-8">
      {mode === "inscription" && (
        <label className={field}>
          Nom
          <input name="name" required autoComplete="name" className={input} style={inputStyle} />
        </label>
      )}
      <label className={field}>
        E-mail
        <input name="email" type="email" required autoComplete="email" className={input} style={inputStyle} />
      </label>
      <label className={field}>
        Mot de passe{mode === "inscription" ? " (8 caractères minimum)" : ""}
        <input
          name="password"
          type="password"
          required
          minLength={mode === "inscription" ? 8 : undefined}
          autoComplete={mode === "inscription" ? "new-password" : "current-password"}
          className={input}
          style={inputStyle}
        />
      </label>
      {error && (
        <p role="alert" className="text-sm" style={{ color: "var(--color-danger)" }}>
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-[var(--radius)] bg-accent px-5 py-3 font-semibold text-accent-ink transition duration-[var(--duration-hover)] hover:bg-accent-hover active:scale-[var(--press-scale)] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {pending ? "Un instant…" : mode === "inscription" ? "Créer mon compte" : "Me connecter"}
      </button>
    </form>
  );
}
