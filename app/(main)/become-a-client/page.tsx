import type { Metadata } from "next";
import { BecomeAClient } from "@/components/client/Become";
import { ClientHero } from "@/components/client/Hero";
import { ClientFAQ } from "@/components/client/FAQ";
import { CTAClient } from "@/components/client/index";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";


export const metadata: Metadata = {
  title: "Become a Client | Go Far Agency",
  description:
    "Tell us about your project, business, or ideas. Start an enquiry with Go Far Agency and find the right digital, creative, or business support.",
  alternates: {
    canonical: "/become-a-client",
  },
  openGraph: {
    title: "Become a Client | Go Far Agency",
    description:
      "Let's get your project moving. Tell us what you need and let's find a way forward.",
    url: "/become-a-client",
    type: "website",
  },
};

export default function BecomeClient() {
  return (
    <main>
      <ClientHero />
      <BecomeAClient />
      <NewsletterCTA />
      <ClientFAQ />
      <CTAClient />
    </main>

  );
}
