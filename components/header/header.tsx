import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="h-20 flex justify-between bg-black pr-5 pl-5 items-center">
      <div>SYNTHASE studio</div>
      <Button>Log In</Button>
    </header>
  );
}
