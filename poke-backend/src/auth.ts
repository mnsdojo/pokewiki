import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

export const auth = betterAuth({
  baseURL: "http://localhost:3000",
  database: new Database("./pokemon.db"),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: true,
  },
  trustedOrigins: ["http://localhost:5173"],
  secret: process.env.BETTER_AUTH_SECRET ?? "fallback-secret-key-just-for-demo",
});
