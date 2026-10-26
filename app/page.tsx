import {
  ArrowRight, Check, Download, LayoutGrid, Palette, Play, Zap, Type, Shapes, Boxes,
  FileDown, ArrowLeft,
} from "lucide-react";
import { Logo, LogoMark } from "../components/Logo";

const nav = ["Fonctionnalités", "Tarifs", "Ressources"];

const features = [
  { icon: Palette, title: "Identité visuelle complète", text: "Logo, couleurs, typographies, éléments graphiques et plus encore." },
  { icon: LayoutGrid, title: "Composants prêts à l'emploi", text: "Boutons, formulaires, cartes… utilisables dans vos projets." },
  { icon: Download, title: "Export facile", text: "Copiez ou téléchargez votre variables.css en un clic." },
  { icon: Zap, title: "Gain de temps", text: "Concentrez-vous sur la création, on s'occupe du reste." },
];

const checklist = [
  "Saisissez les couleurs du client, en HEX ou au sélecteur",
  "Choisissez les typographies et leurs tailles",
  "Réglez les rayons et le style des boutons",
  "Exportez un variables.css prêt à coller",
];

const palette = [
  { hex: "#B11226", name: "Primaire", bg: "bg-accent" },
  { hex: "#12A58A", name: "Secondaire", bg: "bg-[#1f6f5c]" },
  { hex: "#F8B42A", name: "Accent", bg: "bg-[#f2c14e]" },
  { hex: "#E7E7EC", name: "Neutre", bg: "bg-tile" },
  { hex: "#161A2E", name: "Texte", bg: "bg-bg" },
];

const btn =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Showcase />
        <Cta />
      </main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
      <a href="/" aria-label="Craftly, accueil"><Logo /></a>
      <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
        <a href="/" className="border-b-2 border-accent pb-1 font-semibold text-accent">Accueil</a>
        {nav.map((n) => (
          <a key={n} href={`#${n.toLowerCase()}`} className="pb-1 transition-colors hover:text-ink">{n}</a>
        ))}
      </nav>
      <div className="flex items-center gap-5">
        <a href="#" className="hidden text-sm text-muted transition-colors hover:text-ink sm:block">Se connecter</a>
        <a href="#commencer" className={`${btn} bg-accent px-4 py-2.5 text-sm text-white hover:bg-accent-hover`}>
          Commencer<span className="hidden sm:inline"> gratuitement</span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-16">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full bg-tile px-3 py-1.5 text-sm font-semibold text-accent">
          <Shapes className="h-4 w-4" /> Craftly Brand
        </span>
        <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
          Créez la charte graphique de vos clients, <span className="text-accent">simplement.</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
          Craftly aide freelances et petites agences à poser couleurs, typographies et composants d'un client,
          à les voir en direct, puis à exporter un <code className="font-semibold text-ink">variables.css</code> prêt à intégrer.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-6">
          <a href="#commencer" className={`${btn} bg-accent px-6 py-3.5 text-white hover:bg-accent-hover`}>
            Commencer gratuitement <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#fonctionnalités" className="group inline-flex items-center gap-2 text-sm font-semibold text-ink">
            <Play className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /> Voir la démo
          </a>
        </div>
      </div>
      <HeroVisual />
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:pr-28">
      <div className="rounded-2xl border border-tile bg-tile p-3">
        <div className="rounded-xl bg-bg p-5 text-white">
          <div className="flex items-center justify-between text-xs text-white/70">
            <span className="flex items-center gap-1.5 text-base font-bold text-white"><LogoMark className="h-5 w-5" /> Craftly</span>
            Brand Kit
          </div>
          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-lg font-bold">Charte graphique</p>
              <p className="mt-1 max-w-[16rem] text-xs leading-relaxed text-white/70">Une identité visuelle moderne et cohérente pour une marque forte.</p>
            </div>
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-tile text-ink"><LogoMark className="h-8 w-8" /></div>
          </div>
        </div>
        <div className="mt-3 rounded-xl border border-tile p-4">
          <p className="text-xs font-semibold">Couleurs principales</p>
          <div className="mt-3 flex gap-2.5">
            {["bg-accent", "bg-[#3b6fb6]", "bg-[#1f6f5c]", "bg-tile", "bg-bg"].map((c) => (
              <span key={c} className={`h-10 flex-1 rounded-lg ${c} transition-transform duration-200 hover:-translate-y-1`} />
            ))}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-tile p-4">
            <p className="text-xs font-semibold">Typographies</p>
            <p className="mt-2 font-bold">Bricolage Grotesque</p>
            <p className="mt-1 text-[10px] leading-snug text-muted">Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk<br />1234567890</p>
          </div>
          <div className="rounded-xl border border-tile p-4">
            <p className="text-xs font-semibold">Logo</p>
            <div className="mt-3"><Logo size="text-xl" /></div>
          </div>
        </div>
      </div>

      {/* vignettes flottantes, seulement sur grand écran */}
      <div className="absolute -right-2 top-16 hidden w-36 rotate-6 rounded-xl border border-tile bg-tile p-4 lg:block">
        <Logo size="text-lg" />
      </div>
      <div className="absolute -right-6 top-48 hidden gap-2 rounded-xl border border-tile bg-tile p-3 lg:flex">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-bg text-white"><LogoMark className="h-6 w-6" /></span>
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-tile text-muted"><LogoMark className="h-6 w-6" /></span>
      </div>
      <div className="absolute -right-4 bottom-0 hidden h-36 w-24 -rotate-3 overflow-hidden rounded-xl border border-tile bg-tile lg:block">
        <span className="absolute -right-6 -top-4 h-20 w-14 rotate-[25deg] rounded-full bg-accent/80" />
        <span className="absolute -left-4 top-14 h-16 w-16 rounded-full bg-bg" />
        <span className="absolute -right-5 bottom-0 h-16 w-16 rounded-full bg-[#1f6f5c]" />
      </div>
      <p className="absolute -right-6 -top-10 hidden rotate-[-8deg] font-display text-xl leading-tight text-muted lg:block">
        Votre marque,<br />clé en main ↓
      </p>
    </div>
  );
}

function Features() {
  return (
    <section id="fonctionnalités" className="border-y border-tile bg-tile">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-0">
        {features.map(({ icon: Icon, title, text }, i) => (
          <div key={title} className={`reveal lg:px-8 ${i ? "lg:border-l lg:border-tile" : "lg:pl-0"}`}>
            <span className="grid h-11 w-11 place-items-center rounded-full bg-bg text-ink"><Icon className="h-5 w-5" /></span>
            <h2 className="mt-5 font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Showcase() {
  const side = [
    { icon: Shapes, label: "Brand Kit", active: true },
    { icon: Palette, label: "Couleurs" },
    { icon: Type, label: "Typographies" },
    { icon: Boxes, label: "Composants" },
    { icon: FileDown, label: "Export" },
  ];
  return (
    <section id="ressources" className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-[1.15fr_1fr]">
      <div className="reveal flex overflow-hidden rounded-2xl border border-tile bg-tile">
        <aside className="hidden w-44 shrink-0 border-r border-tile p-4 sm:block">
          <Logo size="text-base" />
          <ul className="mt-6 space-y-1 text-xs">
            {side.map(({ icon: Icon, label, active }) => (
              <li key={label} className={`flex items-center gap-2 rounded-lg px-2.5 py-2 ${active ? "bg-tile font-semibold text-accent" : "text-muted"}`}>
                <Icon className="h-3.5 w-3.5" /> {label}
              </li>
            ))}
          </ul>
          <div className="mt-24 rounded-lg border border-tile p-2.5 text-[10px] text-muted">
            Projet actuel<p className="text-xs font-semibold text-ink">Boulangerie Léon</p>
          </div>
        </aside>
        <div className="min-w-0 flex-1 p-5">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 rounded-full border border-tile px-2.5 py-1 text-muted"><ArrowLeft className="h-3 w-3" /> Retour</span>
            <span className="rounded-full border border-tile px-3 py-1 font-semibold">Modifier</span>
          </div>
          <h3 className="mt-5 text-lg font-bold">Couleurs</h3>
          <p className="text-xs text-muted">Une palette harmonieuse et prête à l'emploi.</p>
          <div className="mt-4 rounded-xl border border-tile p-4">
            <p className="text-xs font-semibold">Couleurs principales</p>
            <div className="mt-3 grid grid-cols-5 gap-2.5">
              {palette.map((p) => (
                <div key={p.hex}>
                  <span className={`block h-10 rounded-lg ${p.bg}`} />
                  <p className="mt-2 text-[10px] font-semibold">{p.hex}</p>
                  <p className="truncate text-[10px] text-muted">{p.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 rounded-xl border border-tile p-4">
            <p className="text-xs font-semibold">variables.css</p>
            <pre className="mt-2 overflow-x-auto rounded-lg bg-bg p-3 text-[11px] leading-relaxed text-white/85">
{`:root {
  --color-primary: #B11226;
  --font-heading: "Bricolage Grotesque";
  --radius: 12px;
}`}
            </pre>
          </div>
        </div>
      </div>

      <div className="reveal">
        <span className="rounded-full bg-tile px-3 py-1.5 text-sm font-semibold text-accent">Tout-en-un</span>
        <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          Une charte graphique complète en <span className="text-accent">quelques minutes</span>
        </h2>
        <p className="mt-5 leading-relaxed text-muted">
          Chaque réglage met l'aperçu à jour : titre, paragraphe, boutons, champs et cartes. Vous montrez le rendu au client,
          puis vous collez le CSS dans son futur site.
        </p>
        <ul className="mt-7 space-y-3.5">
          {checklist.map((c) => (
            <li key={c} className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-white"><Check className="h-3 w-3" strokeWidth={3} /></span>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section id="commencer" className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="reveal relative overflow-hidden rounded-2xl bg-bg px-6 py-10 text-white sm:px-10">
        <span className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-accent/70" aria-hidden="true" />
        <span className="absolute -bottom-24 right-10 h-48 w-48 rounded-full bg-[#1f6f5c]/80" aria-hidden="true" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-white/70">Prêt à créer la charte de votre client ?</p>
            <h2 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">Votre identité visuelle<br />n'attend plus que vous.</h2>
            <p className="mt-3 text-sm text-white/70">Gratuit, sans compte : tout reste dans votre navigateur.</p>
          </div>
          <div className="flex flex-wrap items-center gap-6 lg:mr-40">
            <a href="#" className={`${btn} bg-accent px-6 py-3.5 text-white hover:bg-accent-hover`}>
              Commencer gratuitement <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#tarifs" className="text-sm font-semibold text-white/90 hover:text-white">Voir les tarifs</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 sm:px-6 md:flex-row md:justify-between">
      <Logo size="text-xl" />
      <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted">
        {nav.map((n) => <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-ink">{n}</a>)}
        <a href="https://projectp.fr/" className="hover:text-ink">30 jours, 30 projets</a>
      </nav>
      <p className="text-sm text-muted">Jour 14 · ProjectP</p>
    </footer>
  );
}
