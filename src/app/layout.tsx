import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "@/global/globals.css";
import { Portal, Theme } from "@radix-ui/themes";
import { AppWrapper } from "@/context";
import { Toaster } from "react-hot-toast";
import StarBg from "@/components/StarBg";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ancients of Resonite | Active Stargates",
  description: "Resonite Stargate Network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppWrapper>
          <Theme
            appearance="dark"
            accentColor="iris"
            panelBackground="translucent"
            radius="large"
          >
            {children}
          <StarBg />
          </Theme>
        </AppWrapper>
      </body>
    </html>
  );
}
