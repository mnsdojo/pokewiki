## PokéWiki – Local Setup Guide

This is a tiny guide to get the PokéWiki client and backend running on your machine. No AI magic needed, just a couple of commands.

---

## 1. What’s inside this repo?

- **Client**: React + Vite app in `poke-client`
- **Backend**: Node + TypeScript + Hono API in `poke-backend`
- **Docker**: `docker-compose.yml` to run both together

You can run things either **locally with Node** or **via Docker**.

---

## 2. Prerequisites

Pick one of these paths:

- **Local (no Docker)**:
  - Node.js 20+ installed (`node -v`)
  - npm 10+ (`npm -v`)

- **Docker way (recommended if you don’t want to install Node)**:
  - Docker installed and running
  - `docker-compose` available (or `docker compose` on newer Docker versions)

---

## 3. Environment variables

Right now only the backend needs an env file.

- In `poke-backend/.env` you should have:

```bash
BETTER_AUTH_BASE_URL=http://localhost:3000
```

If this file already exists (it should), you don’t need to touch it.

You may later want a client env (e.g. `VITE_API_BASE_URL`) if you start calling the API from the frontend. For now, the Docker setup already injects `VITE_API_BASE_URL` for the client container.

---

## 4. Running with Docker (one command for everything)

From the **repo root** (`/Users/pablo/dev/pokewiki` or the equivalent on your machine):

```bash
docker-compose up --build
```

What this does:

- Builds and starts the **backend** on `http://localhost:3000`
- Builds and starts the **client** on `http://localhost:5173`
- Mounts your local `poke-client` and `poke-backend` folders into the containers, so code changes are picked up by the dev servers

Then open:

- Client: `http://localhost:5173`
- API health check: `http://localhost:3000/` (should respond with a small JSON message)

To stop everything:

```bash
docker-compose down
```

If you get weird native module errors (for example mentioning `better-sqlite3` and `Exec format error`), do a clean rebuild so Docker throws away old containers and volumes:

```bash
docker-compose down --volumes
docker-compose up --build
```

---

## 5. Running locally without Docker

If you prefer to run things with your local Node install:

### 5.1 Install dependencies

From the repo root:

```bash
cd poke-backend
npm install

cd ../poke-client
npm install
```

### 5.2 Start the backend

From `poke-backend`:

```bash
npm run dev
```

This should start the API on `http://localhost:3000`.

You can test it by visiting:

- `http://localhost:3000/` – basic status JSON

### 5.3 Start the client

In another terminal, from `poke-client`:

```bash
npm run dev
```

Vite usually starts on `http://localhost:5173` (it will tell you in the terminal).

Then open:

- `http://localhost:5173`

---

## 6. Common tweaks

- **Changing ports**  
  - Backend port is set in `poke-backend/src/index.ts` (currently `3000`).  
  - Client dev port is controlled by Vite (we use `5173` by default; in Docker we explicitly set `--port 5173`).

- **Updating API base URL in the client**  
  If you start making real API calls from the frontend, add a `.env` in `poke-client`:

  ```bash
  VITE_API_BASE_URL=http://localhost:3000
  ```

  Then read it in your client code via `import.meta.env.VITE_API_BASE_URL`.

---

## 7. Build – chunk size warning

When building the client (`npm run build` in `poke-client`), Vite/Rollup may warn:

```text
(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking
- Adjust the chunk size limit via build.chunkSizeWarningLimit
```

**What we did to fix it:**

1. **Route-level code-splitting** – Page components (Home, Login, Signup, Dashboard, Reports, Not Found) are loaded with `React.lazy()` and a single `Suspense` in `App.tsx`. Only the route the user visits is fetched, so the initial bundle stays smaller.

2. **Manual chunks** – In `vite.config.ts`, `manualChunks` puts `recharts` in its own chunk. Recharts is only needed on Dashboard/Reports, so it loads with those routes instead of in the main vendor bundle.

3. **Chunk size limit** – `chunkSizeWarningLimit: 550` is set so the combined vendor chunk (React, router, TanStack Query, etc.) doesn’t trigger the warning. The largest chunk remains under the limit; raising it slightly avoids noise while we keep the above optimizations.

---

## 8. Quick recap

- **Fastest path**: `docker-compose up --build` → open `http://localhost:5173`
- **Local dev**: run `npm run dev` in both `poke-backend` and `poke-client`

If anything fails, the easiest thing to share is:

- The exact command you ran
- The error message from the terminal

That’s usually enough to debug quickly.

