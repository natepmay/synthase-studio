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
  const handleCreateUser = async () => {
    await authClient.signUp.email(
      {
        email: "nathaniel.p.may+test@gmail.com", // user email address
        password: "abcd8jflswWkdjs", // user password -> min 8 characters by default
        name: "nater", // user display name
      },
      {
        onRequest: () => {
          //show loading
        },
        onSuccess: () => {
          //redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );
  };

  const handleForgetPw = async () => {
    const { data, error } = await authClient.forgetPassword({
      email: "natemay.dev@proton.me",
      redirectTo: "/reset-password",
    });
    console.log("data? ", data?.status);
  };

  const handleConfirmPwReset = async () => {
    const resp = await sendEmail({
      to: [
        {
          name: "Nate",
          email: "natemay.dev@proton.me",
        },
      ],
      templateId: 6876201,
    });
  };

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <Button onClick={handleCreateUser} variant="outline">
        Create User
      </Button>
      <Button onClick={handleSendEmail}>Send Email</Button>
      <Button onClick={handleForgetPw}>Forget Password</Button>
      <Button onClick={handleConfirmPwReset}>Confirm PW Reset</Button>
      <h1>Here is the content.</h1>
    </main>
  );
}
