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

EXPOSE 5000
ENV NODE_ENV=production

CMD ["sh", "-c", "npm run db:push && node dist/index.cjs"]
