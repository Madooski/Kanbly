import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import StoreProvider from "@/store/StoreProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kaban Smart — AI-Powered Kanban Workspace",
  description:
    "An intelligent Kanban board tailored to your professional archetype. Plan, organize, and ship with AI-powered insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Material Symbols (outlined) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#f8f9ff] text-[#0d1c2d] dark:bg-[#0d0d1a] dark:text-white">
        <StoreProvider>
          <AppProvider>{children}</AppProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
