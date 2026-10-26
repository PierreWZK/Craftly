import { ArrowRight } from "lucide-react";
import { KitPreview } from "../components/KitPreview";
import { Logo } from "../components/Logo";

const tile = "rounded-[var(--radius)] bg-tile p-5 md:p-6";
const cta =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-accent px-6 py-3.5 font-semibold text-accent-ink transition duration-[var(--duration-hover)] hover:bg-accent-hover active:scale-[var(--press-scale)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const steps = [
  { title: "Saisissez", text: "Les couleurs du client, en HEX ou au sélecteur natif. Un HEX invalide ne remplace pas la dernière valeur valide." },
  { title: "Choisissez", text: "Les polices des titres et du texte, puis les tailles et le rayon des boutons." },
  { title: "Exportez", text: "Copiez ou téléchargez le variables.css : il s'applique tel quel sur une page vierge." },
];

const faq = [
  { q: "Est-ce gratuit ?", a: "Oui. Tout est gratuit pendant la version 1." },
  { q: "Faut-il un compte ?", a: "Pour enregistrer vos kits, oui. Cette page et l'exemple restent visibles sans compte." },
  { q: "Qui utilise Craftly ?", a: "Les freelances et les petites agences qui préparent une charte pour leurs clients." },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl">
      <header className="flex items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <a href="/" aria-label="Craftly, accueil">
          <Logo />
        </a>
        <nav className="flex items-center gap-5 text-sm text-muted">
          <a href="#exemple" className="hidden transition-colors hover:text-ink sm:inline">Exemple</a>
          <a href="#comment" className="hidden transition-colors hover:text-ink sm:inline">Comment ça marche</a>
          <a href="/connexion" className="transition-colors hover:text-ink">Connexion</a>
        </nav>
      </header>

      <main className="grid grid-cols-1 gap-2 p-2 md:grid-cols-12">
        <div className="reveal col-span-full flex h-[150px] items-center justify-center overflow-hidden rounded-[var(--radius)] bg-tile md:h-[220px]">
          <span aria-hidden="true" className="whitespace-nowrap font-display text-2xl font-extrabold leading-[0.88] tracking-[-0.05em] text-ink">
            craftly
          </span>
        </div>

        <section className={`${tile} reveal col-span-full flex flex-col justify-between gap-8 md:col-span-8`}>
          <div>
            <h1 className="font-display text-xl font-extrabold leading-[0.95] tracking-[-0.04em]">
              Une charte client, prête à coller.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Couleurs, polices et composants d'un client, vus en direct, exportés en <code className="text-ink">variables.css</code>.
            </p>
          </div>
        </section>

        <div className="reveal col-span-full flex flex-col justify-between gap-6 rounded-[var(--radius)] bg-accent p-5 text-accent-ink md:col-span-4 md:p-6">
          <p className="text-lg leading-snug">Freelances et petites agences : une charte par client, sans tout refaire.</p>
          <a href="/connexion" className={cta}>
            Créer un compte <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <section id="exemple" className="reveal col-span-full mt-10 flex flex-col gap-4 px-2 pt-6">
          <h2 className="font-display text-xl font-extrabold leading-[0.95] tracking-[-0.04em]">
            Un exemple complet, pour un client fictif.
          </h2>
          <KitPreview />
        </section>

        <section id="comment" className="reveal col-span-full mt-10 grid gap-2 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title} className={`${tile} flex flex-col gap-3`}>
              <h3 className="font-display text-lg font-extrabold leading-tight">{s.title}</h3>
              <p className="text-muted">{s.text}</p>
            </div>
          ))}
        </section>

        <section className="reveal col-span-full mt-10 grid gap-2 md:grid-cols-3">
          {faq.map((f) => (
            <div key={f.q} className={`${tile} flex flex-col gap-3`}>
              <h3 className="font-display text-lg font-extrabold leading-tight">{f.q}</h3>
              <p className="text-muted">{f.a}</p>
            </div>
          ))}
        </section>

        <section className="reveal col-span-full mt-10 flex flex-col items-start justify-between gap-6 rounded-[var(--radius)] bg-field p-6 text-field-ink md:flex-row md:items-center md:p-10">
          <h2 className="font-display text-xl font-extrabold leading-[0.95] tracking-[-0.04em]">
            Prêt à créer la charte<br />de votre client ?
          </h2>
          <a href="/connexion" className={cta}>
            Créer un compte <ArrowRight className="h-4 w-4" />
          </a>
        </section>
      </main>

      <footer className="flex flex-col items-start justify-between gap-4 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:px-6">
        <Logo size="text-[1.125rem]" />
        <a href="https://projectp.fr/" className="transition-colors hover:text-ink">30 jours, 30 projets</a>
      </footer>
    </div>
  );
}
