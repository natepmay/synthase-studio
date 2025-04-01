"use client";

import { Button } from "../ui/button";
import { UserContext } from "../providers/UserContext";
import { useContext } from "react";

export function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="h-20 flex justify-between bg-black pr-5 pl-5 items-center">
      <div>SYNTHASE studio</div>
      <p>User: {user?.name}</p>
      <Button>Log In</Button>
    </header>
  );
}
