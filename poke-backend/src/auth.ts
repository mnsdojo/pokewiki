import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

const baseURL = process.env.BETTER_AUTH_BASE_URL ?? "http://localhost:3000";
const trustedOriginsEnv = process.env.BETTER_AUTH_TRUSTED_ORIGINS;
const trustedOrigins = trustedOriginsEnv
  ? trustedOriginsEnv.split(",").map((o) => o.trim()).filter(Boolean)
  : [baseURL, "http://localhost:5173"];
const databasePath = process.env.DATABASE_PATH ?? "./pokemon.db";

export const auth = betterAuth({
  baseURL,
  database: new Database(databasePath),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: true,
  },
  trustedOrigins,
  secret: process.env.BETTER_AUTH_SECRET ?? "fallback-secret-key-just-for-demo",
});
