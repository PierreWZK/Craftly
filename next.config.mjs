/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sortie autonome pour l'image Docker : seules les dépendances utiles sont copiées.
  output: "standalone",
  // better-sqlite3 est un module natif : Next le charge tel quel, sans le regrouper.
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
