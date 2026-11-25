import { Suspense } from "react";
import type { Metadata } from "next";
import { AccountActivation } from "@/components/admin/auth/AccountActivation";


export const metadata: Metadata = {
  title: "Activate Your Account | GFA",
  description: "Verify your invitation and activate your GFA account.",
  robots: {
    index: false,
    follow: false,
  },
};



export default function ActivateAccountPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-background">
          <p className="text-sm text-muted-foreground">
            Preparing account activation...
          </p>
        </main>
      }
    >
      <AccountActivation />
    </Suspense>
  );
}