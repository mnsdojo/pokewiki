import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

const baseURL = process.env.BETTER_AUTH_BASE_URL ?? "http://localhost:3000";
const trustedOriginsEnv = process.env.BETTER_AUTH_TRUSTED_ORIGINS;
const trustedOrigins = trustedOriginsEnv
  ? trustedOriginsEnv
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean)
  : [baseURL, "http://localhost:5173"];

const databasePath = process.env.DATABASE_PATH ?? "./pokemon.db";
const allowCrossSiteAuth = process.env.BETTER_AUTH_ALLOW_CROSS_SITE === "true";
const isProduction = process.env.NODE_ENV === "production";

export const authConfig = {
  baseURL,
  database: new Database(databasePath),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: true,
  },
  trustedOrigins,
  secret: process.env.BETTER_AUTH_SECRET ?? "fallback-secret-key-just-for-demo",
  ...(allowCrossSiteAuth && {
    advanced: {
      disableCSRFCheck: true,
      defaultCookieAttributes: {
        sameSite: isProduction ? ("none" as const) : ("lax" as const),
        secure: isProduction,
        httpOnly: true,
        ...(isProduction && { partitioned: true }),
      },
    },
  }),
};

export const auth = betterAuth(authConfig);
