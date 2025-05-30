import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer";
import { Toaster } from "sonner";
import { UserProvider } from "@/components/providers/UserProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Synthase Studio",
  description: "Tools for learning music.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"flex flex-col min-h-screen"}>
        <UserProvider>
          <Header></Header>
          <main className="flex-1 flex items-center justify-center">
            {children}
          </main>
          <Footer></Footer>
          <Toaster richColors position="bottom-center"></Toaster>
        </UserProvider>
      </body>
    </html>
  );
}
