import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { getMigrations } from "better-auth/db";
import { auth, authConfig } from "./auth.js";

const app = new Hono();

app.use("*", logger());

const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((o) => o.trim()).filter(Boolean)
  : ["http://localhost:5173"];

app.use(
  "*",
  cors({
    origin: corsOrigin,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.get("/", (c) =>
  c.json({ status: "ok", message: "Pokemon API is running 🚀" }),
);
app.on(["GET", "POST"], "/api/auth/**", async (c) => {
  try {
    return await auth.handler(c.req.raw);
  } catch (err) {
    console.error("[auth] error:", err);
    return c.json(
      { error: "Auth failed", message: (err as Error).message },
      500,
    );
  }
});
app.get("/api/me", async (c) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) return c.json({ error: "Unauthorized" }, 401);
  return c.json({ user: session.user });
});

const port = Number(process.env.PORT) || 3000;

async function start() {
  try {
    const { runMigrations } = await getMigrations(authConfig);
    await runMigrations();
    console.log("[auth] migrations ok");
  } catch (err) {
    console.error("[auth] migrations failed:", err);
    throw err;
  }

  serve(
    {
      fetch: app.fetch,
      port,
    },
    (info) => {
      console.log(`Server is running on http://0.0.0.0:${info.port}`);
    },
  );
}

start();
