"use client";

import { createContext } from "react";

export type User =
  | {
      id: string;
      name: string;
      email: string;
      emailVerified: boolean;
      createdAt: Date;
      updatedAt: Date;
      image?: string | null | undefined | undefined;
    }
  | undefined;

type UserAndRefresh = {
  user: User;
  refresh: () => void;
};

export const UserContext = createContext({
  user: undefined,
  refresh: () => {},
} as UserAndRefresh);
