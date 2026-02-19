FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# Expose API port
EXPOSE 3000

# Run backend in dev mode with tsx watcher
CMD ["npm", "run", "dev"]
