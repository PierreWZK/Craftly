import { ArrowDownRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import { DailyGame } from "../components/DailyGame";
import { KIT_CSS, KitPreview } from "../components/KitPreview";
import { Logo } from "../components/Logo";
import { DEFAULT_KIT } from "../src/lib/brand-kit";

const press = "transition duration-[var(--duration-hover)] active:scale-[var(--press-scale)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const pillAccent = `inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-accent-ink hover:bg-accent-hover ${press}`;
const pillDark = `inline-flex items-center justify-center gap-2 rounded-full bg-tile px-5 py-3 font-semibold text-ink hover:bg-tile-hover ${press}`;
const tile = "rounded-[var(--radius)] bg-tile p-6 text-ink md:p-8";
const label = "text-sm font-semibold text-paper-muted";
const h2 = "font-display text-xl font-extrabold leading-[0.95] tracking-[-0.04em]";

const links = [
  { href: "#exemple", text: "Exemple" },
  { href: "#export", text: "Export" },
  { href: "#jeu", text: "Teinte du jour" },
  { href: "#faq", text: "Questions" },
];

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
    <>
      <div className="bg-bg p-2 md:p-3">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 rounded-[var(--radius)] bg-paper p-2">
          <header className="flex items-center justify-between gap-4 rounded-full bg-tile py-2 pl-5 pr-2 text-ink">
            <a href="/" aria-label="Craftly, accueil">
              <Logo size="text-[1.25rem]" />
            </a>
            <nav className="hidden items-center gap-1 text-sm md:flex">
              {links.map((l) => (
                <a key={l.href} href={l.href} className={`rounded-full px-4 py-2 text-muted hover:bg-tile-hover hover:text-ink ${press}`}>
                  {l.text}
                </a>
              ))}
            </nav>
            <a href="/connexion" className={`inline-flex items-center gap-3 rounded-full bg-paper py-1.5 pl-4 pr-1.5 text-sm font-semibold text-paper-ink ${press}`}>
              Créer un compte
              <span className="h-7 w-7 rounded-full bg-accent" aria-hidden="true" />
            </a>
          </header>

          <div className="reveal flex flex-col justify-between gap-4 rounded-[var(--radius)] bg-tile px-6 py-7 text-ink md:flex-row md:items-end md:px-8">
            <h1 className="font-display text-[2.125rem] font-extrabold sm:text-xl leading-[0.95] tracking-[-0.04em]">
              Une charte client,<br />prête à coller.
            </h1>
            <p className="max-w-sm text-lg leading-snug text-muted">
              Couleurs, polices et composants d'un client, vus en direct, exportés en <code className="text-ink">variables.css</code>.
            </p>
          </div>

          <div className="relative h-[440px] overflow-hidden rounded-[var(--radius)] bg-tile md:h-[540px]">
            <Image
              src="/images/letterpress-wood-type.jpg"
              alt="Caractères d'imprimerie en bois, de toutes tailles, rangés dans une casse"
              fill
              priority
              sizes="(min-width: 1152px) 1136px, 100vw"
              className="object-cover"
            />
            <a href="#exemple" aria-label="Voir l'exemple de charte" className="absolute right-0 top-0 rounded-bl-[var(--radius-notch)] bg-paper p-2">
              <span className={`grid h-14 w-14 place-items-center rounded-full bg-tile text-ink hover:bg-accent ${press}`}>
                <ArrowDownRight className="h-6 w-6" />
              </span>
            </a>
            <div className="absolute bottom-0 left-0 w-[17rem] rounded-tr-[var(--radius-notch)] bg-paper p-2">
              <div className="rounded-[var(--radius-sm)] bg-tile p-4 text-ink">
                <p className="text-sm text-muted">{DEFAULT_KIT.client}</p>
                <div className="mt-3 flex gap-1.5" aria-hidden="true">
                  {Object.values(DEFAULT_KIT.colors).map((c) => (
                    <span key={c} className="h-8 flex-1 rounded-full" style={{ background: c }} />
                  ))}
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <a href="/connexion" className={`${pillAccent} px-3 py-2.5`}>S'inscrire</a>
                <a href="#exemple" className={`${pillDark} px-3 py-2.5`}>L'exemple</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto flex max-w-6xl flex-col gap-[var(--space-section)] px-4 py-[var(--space-section)] sm:px-6">
        <section id="exemple" className="grid gap-10 md:grid-cols-12 md:gap-6">
          <div className="reveal flex flex-col gap-8 md:col-span-5">
            <div>
              <p className={label}>Exemple</p>
              <h2 className={`${h2} mt-3`}>La charte d'un client fictif.</h2>
            </div>
            <div className="flex flex-col gap-5">
              <div className="relative aspect-[16/9] w-full max-w-sm overflow-hidden rounded-[var(--radius)] bg-white">
                <Image
                  src="/images/pantone-swatches.jpg"
                  alt="Nuancier Pantone ouvert en éventail"
                  fill
                  sizes="384px"
                  className="object-contain p-3"
                />
              </div>
              <p className="max-w-sm">
                Palette, polices, tailles, boutons, champ et carte de la {DEFAULT_KIT.client} : c'est ce que vous montrerez à
                votre client, et ce que Craftly exporte en CSS.
              </p>
              <a href="/connexion" className={`${pillAccent} self-start py-1.5 pl-5 pr-1.5`}>
                Créer la vôtre
                <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-ink text-accent" aria-hidden="true">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </div>
          </div>
          <div className="reveal md:col-span-7">
            <KitPreview />
          </div>
        </section>

        <section id="export" className="flex flex-col gap-8">
          <div className="reveal flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <p className={label}>Export</p>
            <h2 className={`${h2} md:text-right`}>
              Le variables.css,<br />prêt à coller.
            </h2>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <pre className="reveal overflow-x-auto rounded-[var(--radius)] bg-tile p-6 text-sm leading-relaxed text-ink md:p-8">
              <code>{KIT_CSS}</code>
            </pre>
            <ul className={`${tile} reveal flex flex-col gap-6`}>
              {steps.map((s) => (
                <li key={s.title}>
                  <h3 className="font-display text-lg font-extrabold leading-tight">{s.title}</h3>
                  <p className="mt-1 text-muted">{s.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="jeu" className="reveal">
          <DailyGame />
        </section>

        <section id="faq" className="flex flex-col gap-8">
          <h2 className={`${h2} reveal`}>Questions</h2>
          <div className="grid gap-2 md:grid-cols-3">
            {faq.map((f) => (
              <div key={f.q} className={`${tile} reveal flex flex-col gap-3`}>
                <h3 className="font-display text-lg font-extrabold leading-tight">{f.q}</h3>
                <p className="text-muted">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal flex flex-col items-start justify-between gap-6 rounded-[var(--radius)] bg-tile p-6 text-ink md:flex-row md:items-center md:p-10">
          <h2 className={h2}>
            Prêt à créer la charte<br />de votre client ?
          </h2>
          <a href="/connexion" className={pillAccent}>
            Créer un compte <ArrowRight className="h-4 w-4" />
          </a>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-10 text-sm sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Logo size="text-[1.125rem]" />
          <a href="https://projectp.fr/" className="font-semibold hover:text-accent">30 jours, 30 projets</a>
        </div>
        <p className="text-paper-muted">
          Photos : « Wood letterpress type », Michellecornelison, CC BY-SA 4.0 ; « Nuancier Pantone 2 », CC BY-SA 3.0 ; via Wikimedia Commons.
        </p>
      </footer>
    </>
  );
}
