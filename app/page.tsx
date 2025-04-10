"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { sendEmail } from "@/lib/actions/sendEmail";

const handleSendEmail = async (e: React.FormEvent) => {
  e.preventDefault();
  const now = new Date();
  const resp = await sendEmail({
    to: [
      {
        email: "natemay.dev@proton.me",
      },
    ],
    textBody: `Sent at ${now.toString()}`,
    subject: "Test Email",
  });
  console.log(resp);
};

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1>Home Page</h1>
      <p>
        This is a pre-release (work-in-progress) version of the Synthase Studio
        app. See the{" "}
        <a
          href="https://github.com/natepmay/synthase-studio"
          className="underline"
        >
          Github Repo
        </a>{" "}
        to follow along with its progress.
      </p>
    </main>
  );
}
