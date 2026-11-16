"use client";
import { ThemeProvider as NextThemeProvider } from "@teispace/next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="gfa-theme"
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
