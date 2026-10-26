# Craftly · La charte graphique d'un client, prête à intégrer

> Jour 14 du défi **30 jours, 30 projets** · Next.js · TypeScript · Tailwind CSS · ⏳ **À venir**

Un outil pour freelances et petites agences : on saisit les couleurs, les typographies et quelques styles de composants d'un client, et **Craftly** en tire une mini-charte graphique interactive, avec un aperçu en direct et un `variables.css` prêt à coller dans le futur site.

📄 Les règles détaillées sont dans le [cahier des charges](CAHIER_DES_CHARGES.md).

## But

Faire comprendre l'outil en quelques secondes, puis faire passer le visiteur à l'action : créer son compte et commencer un kit.

## Public

Freelances et petites agences (web, design, communication) qui montent la charte graphique de leurs clients et veulent ne pas refaire les mêmes styles de base à chaque projet.

## Ce qui donne envie

**Un exemple de charte complète**, visible dès la page d'accueil : couleurs, typographies, composants et `variables.css` d'un client fictif. C'est lui qui doit convaincre de créer un compte.

## Au programme

- **Page vitrine** : présentation de l'outil, exemple de charte complète, appel à l'action « Créer un compte ».
- **Comptes** : inscription et connexion, pour retrouver ses kits.

- Projet client : nom du projet, nom du client, description facultative.
- Couleurs principale, secondaire, d'accent, de fond et de texte, en HEX ou au sélecteur natif.
- Typographie : police des titres, police du texte, tailles des titres, paragraphes et petits textes.
- Composants : rayon des bordures, boutons pleins ou contour.
- **Aperçu en direct** : titre, paragraphe, boutons, champs de formulaire et cartes, mis à jour à chaque réglage.
- Export d'un `variables.css` (couleurs, polices, tailles, rayons) : copie en un clic ou téléchargement.
- Sauvegarde du kit dans le navigateur (`localStorage`).

## Lancer en local

```bash
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # version de production
```

## Mise en ligne

Prévue sur Coolify : **https://craftly.projectp.fr**.

## Stack

Next.js · TypeScript · Tailwind CSS.

## Avant de déclarer le projet terminé

> Rappel pour Claude : à faire sur chaque projet, sans que je le redemande (détail dans les sections 9 et 10 du cahier des charges).

- **Indexation** : `robots.txt`, `sitemap.xml`, balise canonical, données structurées JSON-LD (`WebApplication` rattachée à ProjectP) et lien « 30 jours, 30 projets » vers https://projectp.fr/ dans le pied de page. Vérifier en ligne, puis me rappeler de soumettre `https://craftly.projectp.fr/sitemap.xml` dans Google Search Console.
- **Aperçu du lien** : image Open Graph stylisée 1200 × 630 aux couleurs du projet et balises `og:*` / `twitter:card`, vérifiées en ligne.
- **Vitrine** : la mise à jour de `30days30projects` (README et `projects.js`) se fait **après ma validation**.
