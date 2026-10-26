import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { KitEditor } from "../../components/KitEditor";
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
    <main className="mx-auto flex max-w-6xl flex-col gap-4 p-2 md:p-3">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-full bg-tile py-2 pl-5 pr-2 text-ink">
        <Logo size="text-[1.25rem]" />
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden sm:inline">{session.user.name}</span>
          <SignOutButton />
        </div>
      </header>
      <KitEditor />
    </main>
  );
}
