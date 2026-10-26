# Jour 14/30 — Craftly, la charte graphique d'un client, prête à intégrer

> Stack : **Next.js**, **TypeScript**, **Tailwind CSS** · hébergement **Coolify**, sous-domaine `craftly.projectp.fr`.
> Durée visée : **2 h 45** pour le MVP, les bonus ensuite.

Ce document est notre contrat : on le suit étape par étape, et toute décision qui s'en écarte est d'abord notée ici. Il s'ajuste au début de la journée.

## 1. L'idée

Un outil pour freelances et petites agences : on saisit les couleurs, les typographies et quelques styles de composants d'un client, et **Craftly** en tire une mini-charte graphique interactive, avec un aperçu en direct et un `variables.css` prêt à coller dans le futur site.

## 2. MVP — ce qui doit fonctionner à la fin

1. Projet client : nom du projet, nom du client, description facultative.
2. Couleurs principale, secondaire, d'accent, de fond et de texte, en HEX ou au sélecteur natif.
3. Typographie : police des titres, police du texte, tailles des titres, paragraphes et petits textes.
4. Composants : rayon des bordures, boutons pleins ou contour.
5. **Aperçu en direct** : titre, paragraphe, boutons, champs de formulaire et cartes, mis à jour à chaque réglage.
6. Export d'un `variables.css` (couleurs, polices, tailles, rayons) : copie en un clic ou téléchargement.
7. Sauvegarde du kit dans le navigateur (`localStorage`).
8. En ligne sur Coolify, avec un README à jour et un aperçu de lien (Open Graph).

### Périmètre volontairement limité

- Une seule page `/` : réglages à gauche, aperçu à droite.
- Pas de compte, pas d'API, pas de base de données.
- Un seul kit à la fois (plusieurs kits en bonus).

## 3. Cahier des charges fonctionnel

### Couleurs

- Un code HEX invalide est signalé et n'écrase pas la dernière valeur valide.
- Bouton « couleur au hasard ».

### Export

- Variables nommées `--color-primary`, `--font-heading`, `--text-base`, `--radius`…
- Le CSS affiché est exactement celui copié et téléchargé.

## 4. Cahier des charges technique

- Type `BrandKit` (couleurs, typographie, composants) et un kit par défaut.
- Aperçu stylé par variables CSS posées sur son conteneur, sans toucher au reste de la page.
- Génération du CSS dans `src/lib/`, testée.
- Icônes Lucide, composants maison ou shadcn/ui.
- Mise en ligne sur Coolify à chaque push sur la branche principale.

## 5. Critères de réussite

- [ ] Chaque réglage change l'aperçu immédiatement.
- [ ] Le kit est retrouvé tel quel après actualisation.
- [ ] Le `variables.css` exporté s'applique tel quel sur une page vierge.
- [ ] L'outil reste utilisable sur mobile.

## 6. Bonus facultatifs

- Contrôle du contraste WCAG entre texte et fond.
- Plusieurs kits clients.
- Export JSON ou configuration Tailwind.
- Modèles de départ : minimaliste, corporate, créatif, e-commerce.
- Aperçu clair et sombre.
- Charte en PDF ou lien de partage.

## 7. Définition du « terminé »

Le MVP fonctionne, les critères de la section 5 sont cochés, le site est en ligne sur `craftly.projectp.fr`, le README a son lien et sa capture, et la carte du projet passe à « terminé » sur la vitrine.

## 8. À me demander avant de coder

À poser **avant d'écrire le code**, et attendre ma réponse :

1. **Le jeu quotidien.** Chaque projet a un jeu du jour pour faire revenir les visiteurs : le même tirage pour tout le monde (d'après la date), une tentative par jour, une série 🔥 et un résultat à partager. Me proposer deux ou trois idées adaptées au projet, puis attendre mon choix.
2. **Le look.** Me demander une référence visuelle sur laquelle se baser (un site, une marque, une ambiance, une capture). Le site doit être original et agréable à regarder, **pas « basique »** : une vraie identité (typographie, palette, mise en page, détails, animations), pas un gabarit générique. Si je n'ai pas d'idée, me proposer deux directions et attendre mon choix.

## 9. Aperçu du lien (à faire sans me le redemander)

- Image Open Graph **1200 × 630** stylisée aux couleurs du projet : nom, accroche, technos et capture, générée avec `scripts/og/build-og.py` (ajouter le projet à la liste).
- Sur chaque page publique : `og:title`, `og:description`, `og:url`, `og:image` (adresse absolue), `og:image:width`, `og:image:height`, `og:image:alt` et `twitter:card` = `summary_large_image`.
- Vérifier en ligne que l'image répond en 200 et que les balises sont servies.

## 10. Indexation (à faire sans me le redemander)

- `robots.txt` : pages privées et routes techniques (API, JSON, admin) en `Disallow`, lien vers le sitemap.
- `sitemap.xml` : les pages publiques uniquement.
- Balise `canonical` sur chaque page publique ; `noindex` sur les pages privées.
- Données structurées JSON-LD sur l'accueil : `WebApplication`, avec `isPartOf` ProjectP (https://projectp.fr/).
- Lien « 30 jours, 30 projets » vers https://projectp.fr/ dans le pied de page.
- Site statique : ajouter le projet à `scripts/seo/apply-seo.py` et relancer le script.
- Vérifier en ligne, puis me rappeler de soumettre `https://craftly.projectp.fr/sitemap.xml` dans Google Search Console.

## 11. Vitrine 30days30projects (avec ma validation)

Une fois le projet en ligne, **me demander mon accord**, puis seulement :

- `projects.js` : l'entrée du jour 14 passe à `status: 'done'`, avec `name: 'Craftly'`, `url`, `repo`, `image` et `description`.
- `preview-days-images/day14_craftly.png` : la capture de l'accueil, en 1600 × 900.
- `README.md` : la ligne du jour 14 dans le tableau des 30 projets.
- Commit et push du dépôt `30days30projects`.
