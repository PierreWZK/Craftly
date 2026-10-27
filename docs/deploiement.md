# Mise en ligne sur Coolify · craftly.projectp.fr

## 1. Application dans Coolify

- **Source** : dépôt public `PierreWZK/Craftly`, branche **`master`**.
- **Build** : `Dockerfile` à la racine (Node 22, sortie standalone de Next.js).
- **Port exposé** : `3000`. **Domaine** : `https://craftly.projectp.fr`.
- **Healthcheck** : désactivé (`node:22-slim` n'a ni `curl` ni `wget`, le contrôle de Coolify dans le conteneur échouerait).
- **Déploiement automatique** : à chaque push sur `master`. Les branches de travail ne sont pas déployées.

## 2. Variables d'environnement

| Variable | Valeur |
|---|---|
| `BETTER_AUTH_SECRET` | généré (32 octets aléatoires, base64) et déjà saisi dans Coolify. Ne jamais le commiter. |
| `BETTER_AUTH_URL` | `https://craftly.projectp.fr` |

`NODE_ENV`, `PORT`, `HOSTNAME` et `DATABASE_PATH` (`/data/craftly.db`) sont fixés dans l'image.

Sans `BETTER_AUTH_SECRET`, le site s'affiche mais toute connexion échoue (erreur 500 sur `/api/auth` et `/app`).

## 3. Données qui survivent aux déploiements

- **Volume persistant** monté sur `/data` (contient `craftly.db` : comptes, sessions, kits).
- Utiliser un **volume Docker nommé** (« Volume Mount » dans Coolify), pas un dossier de l'hôte : l'image tourne sous l'utilisateur `node`, et un dossier de l'hôte appartient souvent à `root`, ce qui empêche SQLite d'écrire.
- Sans ce volume, chaque déploiement efface les comptes et les kits.

## 4. Vérifications après déploiement

1. `https://craftly.projectp.fr/` répond 200, le titre est « Craftly · La charte graphique d'un client, prête à intégrer ».
2. `https://craftly.projectp.fr/app` redirige vers `/connexion`.
3. Inscription, puis modification d'un kit : la modification est retrouvée après actualisation.
4. Redéployer, puis se reconnecter : le compte et le kit sont toujours là (le volume fonctionne).

## 5. Après la mise en ligne

- Étapes 5.1 (SEO) et 5.2 (favicon, image de partage) du processus.
- Google Search Console : ajouter `https://craftly.projectp.fr/` et soumettre `https://craftly.projectp.fr/sitemap.xml` une fois le sitemap en place.
