import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { user, session, account, verification } from "./auth-schema";
import { sendEmail } from "./actions/sendEmail";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: { user, session, account, verification },
  }),

  emailAndPassword: {
    enabled: true,
    async sendResetPassword(data, request) {
      try {
        const resp = await sendEmail({
          to: [
            {
              email: data.user.email,
              name: data.user.name,
            },
          ],
          templateId: 7006603,
          variables: {
            pwResetUrl: data.url,
          },
        });
        console.log("email response code: ", resp);
      } catch (error) {
        console.error("Failed to send reset password email:", error);
      }
    },
  },

  plugins: [nextCookies()],
});
