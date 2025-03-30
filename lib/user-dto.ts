// see https://nextjs.org/blog/security-nextjs-server-components-actions
// DTO = Data Transfer Object. Ready to be consumed by the client (doesn't contain unneeded properties)

import "server-only";
import { authClient } from "@/lib/auth-client";
import { db } from "./db";
import { user } from "@/lib/auth-schema";
import { eq } from "drizzle-orm";

// this is where you'd put privacy rules like
/* 
function canSeePhoneNumber(viewer: User, team: string) {
  // Privacy rules
  return viewer.isAdmin || team === viewer.team;
}
  */

export async function getProfileDTO(slug: string) {
  const { data: session } = await authClient.getSession();

  const results = await db
    .select()
    .from(user)
    .where(eq(user.id, session!.user.id));

  const currentUser = results[0];

  return {
    name: currentUser.name,
    email: currentUser.email,
  };
}
