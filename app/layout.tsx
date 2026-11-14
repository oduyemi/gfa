import { ThemeProvider } from "@/components/providers/ThemeProvider";
import type { Metadata } from "next";
import { Lato, Poppins } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Go Far Agency | Your Extended Digital Team",
    template: "%s | Go Far Agency",
  },
  description:
    "Go Far Agency helps businesses and individuals move their projects forward through digital marketing, creative services and virtual assistance.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lato.variable} ${poppins.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-[#F8F7F2] font-sans text-[#090A0C] transition-colors duration-300 dark:bg-[#090A0C] dark:text-white">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}