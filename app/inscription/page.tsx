import Link from "next/link";
import { AuthForm } from "../../components/AuthForm";
import { Logo } from "../../components/Logo";

export const metadata = { title: "Créer un compte · Craftly", robots: { index: false } };

export default function InscriptionPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-4 py-10">
      <Logo size="text-[1.25rem]" />
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-[2.125rem] font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-xl">Créer un compte</h1>
        <p className="text-paper-muted">Gratuit. Vos kits seront enregistrés et retrouvés à chaque connexion.</p>
      </div>
      <AuthForm mode="inscription" />
      <p className="text-sm text-paper-muted">
        Déjà inscrit ? <Link href="/connexion" className="font-semibold text-paper-ink hover:text-accent">Me connecter</Link>
      </p>
    </main>
  );
}
