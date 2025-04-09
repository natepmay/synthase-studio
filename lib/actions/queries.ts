"use server";

import { user, userSettings } from "../auth-schema";
import { InferSelectModel, eq } from "drizzle-orm";
import { auth } from "../auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";

type User = InferSelectModel<typeof user>;
type UserSettings = InferSelectModel<typeof userSettings>;

export async function updateUser(newUserObj: Partial<User & UserSettings>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("Not logged in!");

  const nextUser = {} as Record<string, string | boolean | Date | null>;
  const nextUserSettings = {} as Record<string, string | boolean | Date | null>;
  Object.entries(newUserObj).forEach(([key, val]) => {
    if (Object.keys(user).includes(key)) {
      nextUser[key] = val;
    } else if (Object.keys(userSettings).includes(key)) {
      nextUserSettings[key] = val;
    } else {
      console.error("Key is not a member of user or userSettings.");
    }
  });

  await db.batch([
    db.update(user).set(nextUser).where(eq(user.id, session.user.id)),
    db
      .update(userSettings)
      .set(nextUserSettings)
      .where(eq(userSettings.userId, session.user.id)),
  ]);

  return "success";
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

export async function initializeUserSettings() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) throw new Error("Not logged in!");
  // TODO get the user role once it's part of the signup form
  const result = await db
    .insert(userSettings)
    .values({
      userId: session.user.id,
      leitmotif: "one",
      role: "learner",
    })
    .onConflictDoNothing();
  return result.rowCount;
}
