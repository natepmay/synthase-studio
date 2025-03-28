"use server";

import { revalidatePath } from "next/cache";
import { settingsFormSchema } from "./validation";
import { redirect } from "next/navigation";

export type State = {
  errors?: {
    displayName?: string[];
    role?: string[];
    leitmotif?: string[];
  };
  message?: string | null;
};

export async function updateSettings(prevState: State, formData: FormData) {
  const validatedFields = settingsFormSchema.safeParse({
    displayName: formData.get("displayName"),
    role: formData.get("role"),
    leitmotif: formData.get("leitmotif"),
  });

  if (!validatedFields.success) {
    console.log("validation failed");
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to update settings.", // missing fields?
    };
  }

  const { displayName } = validatedFields.data;

  console.log("Successfully received ", displayName);

  // revalidatePath("/dashboard/invoices");
  // either need to redirect here or return something of the type {errors, message}
  // redirect("/settings");
  return {
    message: "You did it.",
  };
}
