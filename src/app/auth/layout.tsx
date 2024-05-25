import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "@/global/globals.css";
import { AppWrapper } from "@/context";
import { Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ancients of Resonite | Network Admin",
  description: "Resonite Stargate Network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Theme>
      <AppWrapper>{children}</AppWrapper>
    </Theme>
  );
}
