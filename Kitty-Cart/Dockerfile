FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

# Copy drizzle files for migrations
COPY drizzle ./drizzle
COPY drizzle.config.ts ./

EXPOSE 5000
ENV NODE_ENV=production

# Run migrations then start server
CMD npm run db:push && node dist/index.cjs
