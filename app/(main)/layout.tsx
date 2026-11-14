import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { ReactNode } from "react";

export default function SiteLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}