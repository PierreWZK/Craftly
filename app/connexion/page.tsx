import Link from "next/link";
import { AuthForm } from "../../components/AuthForm";
import { Logo } from "../../components/Logo";

export const metadata = { title: "Connexion · Craftly", robots: { index: false } };

export default function ConnexionPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-4 py-10">
      <Logo size="text-[1.25rem]" />
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-[2.125rem] font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-xl">Connexion</h1>
        <p className="text-paper-muted">Retrouvez vos kits clients.</p>
      </div>
      <AuthForm mode="connexion" />
      <p className="text-sm text-paper-muted">
        Pas encore de compte ? <Link href="/inscription" className="font-semibold text-paper-ink hover:text-accent">Créer un compte</Link>
      </p>
    </main>
  );
}
