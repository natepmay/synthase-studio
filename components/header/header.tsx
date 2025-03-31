"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

export function Header() {
  const { data: session } = authClient.useSession();

  return (
    <header className="h-20 flex justify-between bg-black pr-5 pl-5 items-center">
      <div>SYNTHASE studio</div>
      <p>User: {session?.user.name}</p>
      <Button>Log In</Button>
    </header>
  );
}
