"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "../src/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function signOut() {
    setPending(true);
    await authClient.signOut();
    router.push("/connexion");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={pending}
      className="self-start rounded-[var(--radius)] border-2 px-5 py-2.5 font-semibold transition duration-[var(--duration-hover)] active:scale-[var(--press-scale)] disabled:opacity-60"
      style={{ borderColor: "var(--color-accent)", color: "var(--color-ink)" }}
    >
      Me déconnecter
    </button>
  );
}
