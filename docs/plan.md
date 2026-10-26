# Craftly · Plan

> Reprise après `/clear` : relire ce fichier, `docs/spec.md` et `design/tokens.css`. Cocher chaque étape une fois validée.
> Pour chaque étape : tests d'abord, puis code ; `npm test -- --silent` passe ; une capture Playwright mobile + desktop en fin d'étape d'interface ; commit proposé puis confirmé.

## 1. [x] Setup
Vitest installé, `npm test` = `vitest run`. `design/tokens.css` branché dans `app/globals.css` (thème Tailwind), polices Bricolage Grotesque + Schibsted Grotesk via `next/font`, Plus Jakarta et le violet retirés.
**Terminé quand** `npm test -- --silent` passe (un test de fumée) et `npm run build` réussit.

## 2. [x] Le cœur : `src/lib/`
Type `BrandKit`, kit par défaut, `parseHex` (valide / normalise), `randomColor`, `buildCss(kit)`.
**Terminé quand** les tests couvrent : HEX court et long, HEX invalide rejeté, CSS généré contenant chaque variable attendue, sortie identique pour un même kit.

## 3. [x] Vitrine « Planche »
Refonte de `/` avec les tokens : héros en tuiles (nom en bandeau, phrase, action carmin « Créer un compte »), exemple de charte complète d'un client fictif rendu par `buildCss`, fonctionnement en trois temps, gratuit, FAQ, appel final, pied de page avec lien « 30 jours, 30 projets ». Apparitions au scroll légères.
**Terminé quand** aucune barre de défilement horizontale à 375 px et à 1440 px, aucun violet ni dégradé, capture mobile + desktop.

## 4. [ ] La teinte du jour
`src/lib/daily.ts` : couleur tirée de la date de Paris, notation par canal, texte à partager. Tuile de jeu sur la vitrine : 5 essais, une partie par jour, série 🔥 dans `localStorage`, bouton partager.
**Terminé quand** les tests prouvent : même date = même couleur, date suivante = autre couleur, indices justes / trop haut / trop bas corrects ; une partie rejouée après actualisation reste terminée.

## 5. [ ] Comptes
Better Auth + SQLite (`better-sqlite3`), pages `/inscription` et `/connexion`, déconnexion, `/app` redirige vers `/connexion` sans session. Limite de débit sur l'auth.
**Terminé quand** un test d'intégration crée un compte, se connecte et reçoit une session ; `/app` sans cookie renvoie une redirection.

## 6. [ ] Éditeur
`/app` : réglages à gauche, aperçu à droite (variables CSS posées sur son conteneur), HEX invalide signalé sans écraser la valeur, couleur au hasard, export : copie et téléchargement de `variables.css`.
**Terminé quand** chaque réglage change l'aperçu immédiatement, le texte copié = le texte téléchargé = `buildCss(kit)`, l'outil reste utilisable à 375 px ; capture mobile + desktop.

## 7. [ ] Kits enregistrés
Table `kits`, liste des kits du compte, créer / ouvrir / renommer / supprimer, sauvegarde automatique.
**Terminé quand** un kit retrouvé tel quel après actualisation et reconnexion ; un test prouve qu'un utilisateur ne peut ni lire ni modifier le kit d'un autre.

## 8. [ ] Mise en ligne
`Dockerfile` (sortie `standalone`), volume persistant pour SQLite, variables `BETTER_AUTH_SECRET` et `BETTER_AUTH_URL` sur Coolify, déploiement de la branche principale.
**Terminé quand** `https://craftly.projectp.fr` répond 200, un compte créé survit à un redéploiement.

Ensuite : étapes 5.1 (SEO), 5.2 (favicon, image de partage) et 5.3 (finition, revue, PR) du processus.
