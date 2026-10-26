# 30 Days, 30 Projects

🌐 **[projectp.fr](https://projectp.fr)**

🇫🇷 [Français](#-français) · 🇬🇧 [English](#-english)

---

## 🇫🇷 Français

### Le défi

Pendant 30 jours, je code **un outil ou un site par jour**, en **2 à 3 heures environ**, avec l'aide de Claude.

Objectifs :

- **Pratiquer plusieurs langages et frameworks**, en particulier **PHP (Laravel, Symfony)** et **React**.
- **Livrer chaque jour** un projet petit mais fonctionnel, plutôt qu'un gros projet jamais terminé.
- **Finir par un portfolio** en Next.js qui référence les 30 projets.

> La liste peut évoluer en cours de route.

🌐 Tous les projets sont en ligne sur **[projectp.fr](https://projectp.fr)**.

### Organisation

Chaque projet a son propre dossier `day-XX-nom/` qui contient :

- `README.md` : description, technos, installation et lancement
- le code du projet, en ligne sur son propre sous-domaine : `https://nom.projectp.fr`

Les captures d'écran sont dans `preview-days-images/` et la page d'accueil du site lit la liste des projets dans `projects.js`.

### Mise en ligne

Le site est déployé sur Netlify (voir `netlify.toml`). À chaque déploiement, `scripts/build-site.mjs` rassemble tout le site dans `_site/` :

- les projets en HTML, CSS et JavaScript simples sont copiés tels quels ;
- les projets avec un script `build` (React, Vite…) sont construits, puis leur dossier `dist/` est copié.

Pour vérifier en local : `node scripts/build-site.mjs`, puis servir le dossier `_site/` (par exemple `npx serve _site`).

### Les 30 projets

| Jour | Projet | Techno | Statut | Démo |
|:---:|---|---|:---:|:---:|
| 01 | [Générateur de palettes avancé](./day-01-palette-generator) | JavaScript · CSS | ✅ | [🔗](https://nuance.projectp.fr/) |
| 02 | [Écho, jeux de mémoire musicaux](./day-02-memory-game) | React · Vite | ✅ | [🔗](https://echo.projectp.fr/) |
| 03 | [RiverLog, suivi de bankroll poker](./day-03-poker-bankroll) | Laravel · Blade · Chart.js | ✅ | [🔗](https://riverlog.projectp.fr/) |
| 04 | [3logy, hub geek (dev + jeux + ciné)](./day-04-geek-hub) | JavaScript · API RAWG · API TMDB | ✅ | [🔗](https://3logy.projectp.fr/) |
| 05 | [Kairos, réservation de créneaux](./day-05-booking) | Symfony · EasyAdmin | ✅ | [🔗](https://kairos.projectp.fr/) |
| 06 | [Jeu de réflexes](./day-06-reflex-game) | HTML · CSS · JS | ⏳ | — |
| 07 | [Dashboard de dépenses](./day-07-expense-dashboard) | React · Recharts | ⏳ | — |
| 08 | [Le plein moins cher, détour compris](./day-08-fuel-detour) | Laravel · Leaflet · Open data | 🚧 | — |
| 09 | [Comparateur de voitures](./day-09-car-comparator) | Symfony | ⏳ | — |
| 10 | [Calculateur de pot odds et d'outs poker](./day-10-poker-odds) | JavaScript | ⏳ | — |
| 11 | [API REST de collection de jeux](./day-11-game-collection-api) | Symfony · API Platform | ⏳ | — |
| 12 | [Compresseur d'images côté navigateur](./day-12-image-compressor) | JavaScript | ⏳ | — |
| 13 | [Radar, la santé de vos sites dans le temps](./day-13-site-health) | Laravel · API PageSpeed Insights · Chart.js | ⏳ | — |
| 14 | [Craftly, la charte graphique d'un client](./day-14-client-brand-kit) | Next.js · TypeScript · Tailwind CSS | ⏳ | — |
| 15 | [Mini-jeu de course infinie](./day-15-endless-runner) | JavaScript · Canvas | ⏳ | — |
| 16 | [Agrégateur d'actualités dev et gaming](./day-16-news-aggregator) | Next.js | ⏳ | — |
| 17 | [Gestionnaire de tournois de poker](./day-17-poker-tournaments) | Symfony | ⏳ | — |
| 18 | [Kanban avec glisser-déposer](./day-18-kanban) | React · dnd-kit | ⏳ | — |
| 19 | [Tracker de succès gaming](./day-19-achievement-tracker) | Laravel · Livewire | ⏳ | — |
| 20 | [Catalogue de jeux vidéo](./day-20-game-catalog) | Angular | ⏳ | — |
| 21 | [Visualiseur de données automobiles](./day-21-car-data-viz) | JavaScript · Chart.js | ⏳ | — |
| 22 | [Watchlist films et séries](./day-22-watchlist) | Symfony | ⏳ | — |
| 23 | [Comparaison de fichiers texte](./day-23-text-diff) | JavaScript | ⏳ | — |
| 24 | [API de statistiques de jeux vidéo](./day-24-game-stats-api) | Java · Spring Boot | ⏳ | — |
| 25 | [Puissance 4 avec IA](./day-25-connect-four) | JavaScript · Canvas | ⏳ | — |
| 26 | [Gestion de garage](./day-26-garage-manager) | Laravel · Filament | ⏳ | — |
| 27 | [Recherche plein texte de films](./day-27-movie-search) | Symfony · Meilisearch | ⏳ | — |
| 28 | [Statistiques GitHub](./day-28-github-stats) | Next.js | ⏳ | — |
| 29 | [Chat en temps réel](./day-29-realtime-chat) | Laravel · Reverb | ⏳ | — |
| 30 | [Portfolio des 30 projets](./day-30-portfolio) | Next.js | ⏳ | — |

Légende : ⏳ à faire · 🚧 en cours · ✅ terminé

---

## 🇬🇧 English

### The challenge

For 30 days, I build **one tool or website per day**, in **about 2 to 3 hours**, with the help of Claude.

Goals:

- **Practice several languages and frameworks**, with a focus on **PHP (Laravel, Symfony)** and **React**.
- **Ship every day** a small but working project, rather than one big project that never gets finished.
- **End with a portfolio** built with Next.js that lists all 30 projects.

> The list may change along the way.

🌐 All projects are live at **[projectp.fr](https://projectp.fr)**.

### Structure

Each project lives in its own `day-XX-name/` folder containing:

- `README.md`: description, stack, setup and run instructions
- the project code, live on its own subdomain: `https://name.projectp.fr`

Screenshots live in `preview-days-images/` and the site's home page reads the project list from `projects.js`.

### Deployment

The site is deployed on Netlify (see `netlify.toml`). On every deploy, `scripts/build-site.mjs` gathers the whole site into `_site/`:

- plain HTML, CSS and JavaScript projects are copied as is;
- projects with a `build` script (React, Vite…) are built, then their `dist/` folder is copied.

To check locally: `node scripts/build-site.mjs`, then serve the `_site/` folder (for example `npx serve _site`).

### The 30 projects

| Day | Project | Stack | Status | Demo |
|:---:|---|---|:---:|:---:|
| 01 | [Advanced color palette generator](./day-01-palette-generator) | JavaScript · CSS | ✅ | [🔗](https://nuance.projectp.fr/) |
| 02 | [Écho, musical memory games](./day-02-memory-game) | React · Vite | ✅ | [🔗](https://echo.projectp.fr/) |
| 03 | [RiverLog, poker bankroll tracker](./day-03-poker-bankroll) | Laravel · Blade · Chart.js | ✅ | [🔗](https://riverlog.projectp.fr/) |
| 04 | [3logy, geek hub (dev + games + movies)](./day-04-geek-hub) | JavaScript · RAWG API · TMDB API | ✅ | [🔗](https://3logy.projectp.fr/) |
| 05 | [Kairos, time slot booking](./day-05-booking) | Symfony · EasyAdmin | ✅ | [🔗](https://kairos.projectp.fr/) |
| 06 | [Reflex game](./day-06-reflex-game) | HTML · CSS · JS | ⏳ | — |
| 07 | [Expense dashboard](./day-07-expense-dashboard) | React · Recharts | ⏳ | — |
| 08 | [Cheapest fuel, detour included](./day-08-fuel-detour) | Laravel · Leaflet · Open data | 🚧 | — |
| 09 | [Car comparator](./day-09-car-comparator) | Symfony | ⏳ | — |
| 10 | [Poker pot odds and outs calculator](./day-10-poker-odds) | JavaScript | ⏳ | — |
| 11 | [Game collection REST API](./day-11-game-collection-api) | Symfony · API Platform | ⏳ | — |
| 12 | [In-browser image compressor](./day-12-image-compressor) | JavaScript | ⏳ | — |
| 13 | [Radar, website health over time](./day-13-site-health) | Laravel · PageSpeed Insights API · Chart.js | ⏳ | — |
| 14 | [Craftly, client brand kit builder](./day-14-client-brand-kit) | Next.js · TypeScript · Tailwind CSS | ⏳ | — |
| 15 | [Endless runner game](./day-15-endless-runner) | JavaScript · Canvas | ⏳ | — |
| 16 | [Dev and gaming news aggregator](./day-16-news-aggregator) | Next.js | ⏳ | — |
| 17 | [Poker tournament manager](./day-17-poker-tournaments) | Symfony | ⏳ | — |
| 18 | [Drag-and-drop Kanban board](./day-18-kanban) | React · dnd-kit | ⏳ | — |
| 19 | [Gaming achievement tracker](./day-19-achievement-tracker) | Laravel · Livewire | ⏳ | — |
| 20 | [Video game catalog](./day-20-game-catalog) | Angular | ⏳ | — |
| 21 | [Car data visualizer](./day-21-car-data-viz) | JavaScript · Chart.js | ⏳ | — |
| 22 | [Movie and TV show watchlist](./day-22-watchlist) | Symfony | ⏳ | — |
| 23 | [Text file diff tool](./day-23-text-diff) | JavaScript | ⏳ | — |
| 24 | [Video game stats API](./day-24-game-stats-api) | Java · Spring Boot | ⏳ | — |
| 25 | [Connect Four with AI](./day-25-connect-four) | JavaScript · Canvas | ⏳ | — |
| 26 | [Garage management](./day-26-garage-manager) | Laravel · Filament | ⏳ | — |
| 27 | [Full-text movie search](./day-27-movie-search) | Symfony · Meilisearch | ⏳ | — |
| 28 | [GitHub stats page](./day-28-github-stats) | Next.js | ⏳ | — |
| 29 | [Real-time chat](./day-29-realtime-chat) | Laravel · Reverb | ⏳ | — |
| 30 | [30 projects portfolio](./day-30-portfolio) | Next.js | ⏳ | — |

Legend: ⏳ to do · 🚧 in progress · ✅ done
