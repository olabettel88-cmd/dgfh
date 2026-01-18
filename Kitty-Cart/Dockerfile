FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Copy built files and source (for drizzle schema)
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/shared ./shared

ENV NODE_ENV=production

# Simple single-line command
CMD ["sh", "-c", "npm run db:push && echo '=== Starting server ===' && node dist/index.cjs"]
