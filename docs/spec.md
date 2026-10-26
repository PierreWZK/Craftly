# Craftly · Spec

> Jour 14 · Next.js 15, TypeScript, Tailwind CSS 4 · Coolify, `craftly.projectp.fr` · direction B « Planche » (`design/tokens.css`)

## Besoins

**Vitrine (`/`, publique)**
- Faire comprendre l'outil en quelques secondes : ce qu'il fait, pour qui (freelances, petites agences), ce qu'on obtient (`variables.css`).
- **Un exemple de charte complète** d'un client fictif : palette, typographies, tailles, boutons, champs, cartes, et son `variables.css`. C'est l'argument principal pour créer un compte.
- Une action principale : « Créer un compte ».
- **La teinte du jour** : une couleur tirée d'après la date, la même pour tous ; 5 essais pour retrouver son HEX ; après chaque essai, chaque canal (R, V, B) est indiqué juste, trop haut ou trop bas ; une partie par jour ; série 🔥 et résultat à partager. Jouable sans compte (progression dans `localStorage`).

**Comptes**
- Inscription (e-mail + mot de passe), connexion, déconnexion.
- L'éditeur et les kits sont réservés aux comptes connectés.

**Éditeur (`/app`, connecté)**
- Projet client : nom du projet, nom du client, description facultative.
- Couleurs principale, secondaire, accent, fond, texte : sélecteur natif ou HEX ; un HEX invalide est signalé et n'écrase pas la dernière valeur valide ; bouton « couleur au hasard ».
- Typographie : police des titres, police du texte, tailles titres / paragraphe / petit texte.
- Composants : rayon, boutons pleins ou contour.
- Aperçu en direct (titre, paragraphe, boutons, champs, cartes) stylé par variables CSS posées sur son conteneur.
- Export `variables.css` (`--color-primary`, `--font-heading`, `--text-base`, `--radius`…) : le texte affiché est exactement celui copié et téléchargé.
- Plusieurs kits par compte, enregistrés côté serveur.

## Choix techniques proposés

- **Auth** : Better Auth (e-mail + mot de passe, sessions en cookie httpOnly, mots de passe hachés).
- **Données** : SQLite (`better-sqlite3`) sur un volume persistant Coolify. Tables : utilisateurs et sessions (Better Auth), `kits` (`user_id`, `data` JSON, dates).
- **Logique pure dans `src/lib/`**, testée avec Vitest : validation HEX, génération CSS, tirage et notation de la teinte du jour.

## Hors périmètre

- Vérification d'e-mail, mot de passe oublié, connexion Google ou GitHub.
- Paiement et offres payantes : tout est gratuit en V1.
- Partage public d'un kit, export JSON ou Tailwind, PDF, contraste WCAG, modèles de départ.
- Classement entre joueurs de la teinte du jour.

## Risques

- **Comptes = surface d'attaque** : limiter le débit des connexions et inscriptions, valider toutes les entrées côté serveur, ne jamais exposer un kit d'un autre utilisateur (contrôle `user_id` sur chaque requête).
- **SQLite sur Coolify** : sans volume persistant, les comptes disparaissent au redéploiement. À vérifier avant la mise en ligne.
- **Délai** : 2 h 45 visées pour le MVP, déjà dépassées avec les comptes. Ordre du plan = valeur d'abord, l'éditeur avant le multi-kits.
- **Tirage du jour** : décalage de fuseau horaire ; on tire sur la date de Paris (`Europe/Paris`) pour que tout le monde ait la même couleur.
- **Polices de l'éditeur** : liste fermée de polices Google pour garder un aperçu fidèle et un CSS qui fonctionne tel quel.
