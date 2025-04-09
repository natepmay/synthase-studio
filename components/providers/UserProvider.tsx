"use client";

import { useState, useCallback, useEffect } from "react";
import { UserContext, type User, type UserSettings } from "./UserContext";
import { getExtendedLoggedInUser } from "@/lib/actions/queries";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [key, setKey] = useState(0);
  const [user, setUser] = useState({
    user: null,
    userSettings: null,
  } as {
    user: User | null;
    userSettings: UserSettings | null;
  });

  useEffect(() => {
    const getSession = async () => {
      const extendedUser = await getExtendedLoggedInUser();
      console.log(extendedUser.userSettings);
      setUser(extendedUser);
    };
    getSession();
  }, [key]);

  const refresh = useCallback(() => {
    setKey((key) => key + 1);
  }, []);

  return (
    <UserContext.Provider
      value={{ user: user.user, userSettings: user.userSettings, refresh }}
      key={key}
    >
      {children}
    </UserContext.Provider>
  );
}
