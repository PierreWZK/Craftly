import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Logo } from "../../components/Logo";
import { SignOutButton } from "../../components/SignOutButton";
import { getAuth } from "../../src/lib/auth";

export const metadata = { title: "Mes kits · Craftly", robots: { index: false } };
// Dépend de la session du visiteur : jamais pré-rendu au build.
export const dynamic = "force-dynamic";

export default async function AppPage() {
  const auth = await getAuth();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/connexion");

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-10">
      <Logo size="text-[1.25rem]" />
      <h1 className="font-display text-[2.125rem] font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-xl">
        Bonjour {session.user.name}
      </h1>
      <p className="rounded-[var(--radius)] bg-tile p-6 text-muted">L'éditeur de kits arrive à l'étape 6 du plan.</p>
      <SignOutButton />
    </main>
  );
}
