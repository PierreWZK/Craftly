import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { KitEditor } from "../../components/KitEditor";
import { Logo } from "../../components/Logo";
import { SignOutButton } from "../../components/SignOutButton";
import { getAuthHandle } from "../../src/lib/auth";
import { createKit, getKit, listKits } from "../../src/lib/kits";
import { DEFAULT_KIT } from "../../src/lib/brand-kit";

export const metadata = { title: "Mes kits · Craftly", robots: { index: false } };
// Dépend de la session du visiteur : jamais pré-rendu au build.
export const dynamic = "force-dynamic";

export default async function AppPage({ searchParams }: { searchParams: Promise<{ kit?: string }> }) {
  const { auth, db } = await getAuthHandle();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/connexion");
  const userId = session.user.id;

  const { kit: requested } = await searchParams;
  const kits = listKits(db, userId);

  // Pas encore de kit : on en crée un. Kit demandé introuvable (supprimé, ou d'un autre compte) : on prend le premier.
  if (kits.length === 0) {
    const id = createKit(db, userId, { ...DEFAULT_KIT, name: "Nouveau kit", client: "", description: "" });
    redirect(`/app?kit=${id}`);
  }
  const selected = requested ? getKit(db, userId, requested) : null;
  if (!requested || !selected) redirect(`/app?kit=${kits[0].id}`);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-4 p-2 md:p-3">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-full bg-tile py-2 pl-5 pr-2 text-ink">
        <Logo size="text-[1.25rem]" />
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden sm:inline">{session.user.name}</span>
          <SignOutButton />
        </div>
      </header>
      <KitEditor key={requested} kitId={requested as string} initialKit={selected} kits={kits} />
    </main>
  );
}
