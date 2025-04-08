import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/auth-schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
