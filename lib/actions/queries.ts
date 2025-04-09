"use server";

import { user, userSettings } from "../auth-schema";
import { InferSelectModel, eq } from "drizzle-orm";
import { auth } from "../auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";

type userType = InferSelectModel<typeof user>;

// TODO will need to udate this to receive both user and userSettings and route accordingly
export async function updateUser(newUserObj: Partial<userType>) {
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

export async function getExtendedLoggedInUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("Not logged in!");
  const [result] = await db
    .select()
    .from(user)
    .leftJoin(userSettings, eq(user.id, userSettings.userId));
  return {
    user: result.user,
    userSettings: result.user_settings,
  };
}
