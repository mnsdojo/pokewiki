FROM node:22-alpine

WORKDIR /app

# Build tools for native modules (e.g. better-sqlite3)
RUN apk add --no-cache python3 make g++

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Fly.io sets PORT; default for local runs
ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/index.js"]
