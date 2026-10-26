/** @type {import('next').NextConfig} */
const nextConfig = {
  // better-sqlite3 est un module natif : Next le charge tel quel, sans le regrouper.
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
