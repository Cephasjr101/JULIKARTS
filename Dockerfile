# Build stage — devDependencies (vite, esbuild) are required to build.
FROM node:20-slim AS build
WORKDIR /app
ENV NODE_ENV=development
# node:20-slim ships npm 10.8.x which crashes with "Exit handler never called"
# on large `npm ci` runs in containers; npm 11 fixes it.
RUN npm install -g npm@11 --silent
COPY package.json package-lock.json ./
# --no-audit/--no-fund cut work and memory; retry once for transient failures.
RUN npm ci --include=dev --no-audit --no-fund --loglevel=error \
    || npm ci --include=dev --no-audit --no-fund --loglevel=error
COPY . .
RUN npm run build

# Runtime stage — the server bundle (dist/boot.js) has all npm deps inlined;
# it only needs Node built-ins plus the static frontend in dist/public.
FROM node:20-slim
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY package.json ./
# runtime.env holds the platform credentials (same content as .env, which is
# excluded from Docker build contexts as a hidden file — copied in as .env).
COPY runtime.env ./.env
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/boot.js"]
