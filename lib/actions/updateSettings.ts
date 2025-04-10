"use server";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
import { settingsFormSchema } from "../validation";
import { updateUser } from "./queries";
import { sendEmail } from "./sendEmail";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export type State = {
  errors?: {
    displayName?: string[];
    role?: string[];
    leitmotif?: string[];
  };
  message?: string | null;
};

export async function updateSettings(prevState: State, formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("Not logged in!");

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

  const { displayName, role, leitmotif } = validatedFields.data;

  console.log("Successfully received ", displayName);
  await sendEmail({
    to: [{ email: session.user.email }],
    subject: "Settings updated",
    textBody: "You updated your settings",
  });
  const result = await updateUser({ name: displayName, role, leitmotif });
  // could read result.rowCount if want to confirm sucess

  // revalidatePath("/settings");
  // either need to redirect here or return something of the type {errors, message}
  // redirect("/settings");
  return { message: "success" };
}
