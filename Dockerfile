# Image de production Craftly : trois étapes, sortie standalone de Next.js.
FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# better-sqlite3 se compile avec node-gyp : l'image slim n'a ni python ni compilateur.
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*
RUN npm ci

FROM node:22-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-slim AS run
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    DATABASE_PATH=/data/craftly.db
RUN mkdir -p /data && chown node:node /data
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
# Les comptes et les kits vivent ici : le volume survit aux redéploiements.
VOLUME ["/data"]
EXPOSE 3000
CMD ["node", "server.js"]
