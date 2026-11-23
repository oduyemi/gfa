import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import { HowItWorksHero } from "@/components/how-it-works/Hero";
import { OurProcess } from "@/components/how-it-works/OurProcess";
import { TheJourney } from "@/components/how-it-works/TheJourney";
import { HowItWorksCTA } from "@/components/how-it-works/CTA";

const pageUrl = absoluteUrl("/how-it-works");

export const metadata: Metadata = {
  title: "How It Works | Working With Go Far Agency",
  description:
    "Discover how working with Go Far Agency works, from your first enquiry and project consultation to proposals, agreements and client onboarding.",
  keywords: [
    "how Go Far Agency works",
    "working with a digital agency",
    "digital agency onboarding process",
    "creative agency process",
    "how to start a digital project",
    "digital project consultation",
    "agency project process",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "website",
    url: pageUrl,
    title: "How It Works | Working With Go Far Agency",
    description:
      "A clear, collaborative process from your first enquiry to project onboarding. See what to expect when working with Go Far Agency.",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "How It Works | Go Far Agency",
    description:
      "See how we take your project from first conversation to getting started.",
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "How It Works | Working With Go Far Agency",
    description: metadata.description,
    isPartOf: {
      "@id": `${siteConfig.url}#website`,
    },
    about: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    breadcrumb: {
      "@id": `${pageUrl}#breadcrumb`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "How It Works",
        item: pageUrl,
      },
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}

        <HowItWorksHero />
        <TheJourney />
        <OurProcess />
        <HowItWorksCTA />
    </>
  );
}