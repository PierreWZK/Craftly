# Image de production Craftly : trois étapes, sortie standalone de Next.js.
# Pas de WORKDIR /app : avec la route app/app/, Next confondait / et /app.
FROM node:22-slim AS deps
WORKDIR /srv/craftly
COPY package.json package-lock.json ./
# better-sqlite3 se compile avec node-gyp : l'image slim n'a ni python ni compilateur.
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*
RUN npm ci

FROM node:22-slim AS build
WORKDIR /srv/craftly
COPY --from=deps /srv/craftly/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-slim AS run
WORKDIR /srv/craftly
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    DATABASE_PATH=/data/craftly.db
RUN mkdir -p /data && chown node:node /data
COPY --from=build --chown=node:node /srv/craftly/.next/standalone ./
COPY --from=build --chown=node:node /srv/craftly/.next/static ./.next/static
COPY --from=build --chown=node:node /srv/craftly/public ./public
USER node
# Les comptes et les kits vivent ici : le volume survit aux redéploiements.
VOLUME ["/data"]
EXPOSE 3000
CMD ["node", "server.js"]
