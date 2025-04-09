"use client";

import { createContext } from "react";
import { InferSelectModel } from "drizzle-orm";
import { user, userSettings } from "@/lib/auth-schema";

export type User = InferSelectModel<typeof user>;
export type UserSettings = InferSelectModel<typeof userSettings>;

type UserAndRefresh = {
  user: User | null;
  userSettings: UserSettings | null;
  refresh: () => void;
};

export const UserContext = createContext({
  user: null,
  userSettings: null,
  refresh: () => {},
} as UserAndRefresh);
