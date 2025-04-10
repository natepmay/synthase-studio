"use client";

import { UserContext } from "../providers/UserContext";
import { useContext } from "react";
import { Dropdown } from "./avatarDropdown";
import { Button } from "../ui/button";
import Link from "next/link";

export function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="h-20 flex justify-between bg-black pr-5 pl-5 items-center">
      <div>
        SYNTHASE studio <span className="text-red-500">PRE-RELEASE</span>
      </div>
      <p>{user ? `User: ${user?.name} ` : "Logged Out "} </p>
      {user ? (
        <Dropdown />
      ) : (
        <div>
          <Link href="/sign-up">
            <Button className="ml-5">Sign Up</Button>
          </Link>
          <Link href="/sign-in">
            <Button variant="link">Sign In</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
