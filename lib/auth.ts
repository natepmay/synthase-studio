import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db"; // your drizzle instance
import { user, session, account, verification } from "./auth-schema";
import { sendEmail } from "./actions/sendEmail";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: { user, session, account, verification },
  }),

  emailAndPassword: {
    enabled: true,
    async sendResetPassword(data, request) {
      // Send an email to the user with a link to reset their password
      try {
        const resp = await sendEmail({
          to: [
            {
              email: data.user.email,
              name: data.user.name,
            },
          ],
          templateId: 6876196,
          variables: {
            pwResetUrl: data.url,
          },
        });
        console.log("email response code: ", resp);
      } catch (error) {
        console.error("Failed to send reset password email:", error);
        // Handle the error as needed, e.g., notify the user or retry
      }
    },
  },
});
