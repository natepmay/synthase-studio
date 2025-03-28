import { z } from "zod";

export const settingsFormSchema = z.object({
  displayName: z
    .string()
    .min(2, {
      message: "Display name must be at least 2 characters.",
    })
    .max(50, {
      message: "Display name must be 50 characters or fewer.",
    }),
  role: z.enum(["learner", "teacher"], {
    message: "You must select an option.",
  }),
});
