import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import 'remixicon/fonts/remixicon.css';
import ThemeProvider from "./providers/theme-provider";
import LayoutProvider from "./providers/layout-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Finance Tracker",
  description: "This is a full stack finance tracker application created with the help of NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider>
            <LayoutProvider>
              {children}
            </LayoutProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
