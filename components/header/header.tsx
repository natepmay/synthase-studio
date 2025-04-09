"use client";

import { Button } from "../ui/button";
import { UserContext } from "../providers/UserContext";
import { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const { user, refresh } = useContext(UserContext);
  // TODO think about whether initials maybe should be first and last word rather than first two
  const initials = user?.name
    .split(" ")
    .slice(0, 2)
    .map((word) => word.slice(0, 1))
    .join("");

  return (
    <header className="h-20 flex justify-between bg-black pr-5 pl-5 items-center">
      <div>SYNTHASE studio</div>
      <p>User: {user?.name}</p>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.image ?? undefined} alt={user?.name} />
            <AvatarFallback className="text-black">{initials}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-5 w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/settings">
            <DropdownMenuItem className="cursor-pointer">
              Settings
            </DropdownMenuItem>
          </Link>
          <button
            className="w-full"
            onClick={() =>
              signOut({
                fetchOptions: {
                  onSuccess: () => {
                    refresh();
                    router.push("/");
                  },
                },
              })
            }
          >
            <DropdownMenuItem className="cursor-pointer">
              Log Out
            </DropdownMenuItem>
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
