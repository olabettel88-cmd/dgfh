FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

# Install ALL dependencies (including drizzle-kit)
RUN npm ci

COPY --from=builder /app/dist ./dist

# Copy drizzle schema files
COPY db ./db
COPY drizzle.config.ts ./

EXPOSE 5000
ENV NODE_ENV=production

CMD ["sh", "-c", "npm run db:push && node dist/index.cjs"]
