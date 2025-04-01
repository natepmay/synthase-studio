"use client";

import { useState, useCallback, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { UserContext, type User } from "./UserContext";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [key, setKey] = useState(0);
  const [user, setUser] = useState({} as User | undefined);

  useEffect(() => {
    const getSession = async () => {
      const { data: session } = await authClient.getSession();
      setUser(session?.user);
    };
    getSession();
  }, [key]);

  const refresh = useCallback(() => {
    setKey((key) => key + 1);
  }, []);

  return (
    <UserContext.Provider value={{ user, refresh }} key={key}>
      {children}
    </UserContext.Provider>
  );
}
