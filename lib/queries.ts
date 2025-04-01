import { user } from "./auth-schema";
import { InferSelectModel, eq } from "drizzle-orm";
import { auth } from "./auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";

type userType = InferSelectModel<typeof user>;

export async function updateUser(newUserObj: Partial<userType>) {
  // do I need "use server?"
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("Not logged in!");
  const result = await db
    .update(user)
    .set(newUserObj)
    .where(eq(user.id, session.user.id));
  return result;
}
