import type { Metadata } from "next";
import { siteConfig, absoluteUrl } from "@/lib/seo";
import { ServicesHero } from "@/components/services/Hero";
import { ServicesOverview } from "@/components/services/Overview";
import { DigitalCreation } from "@/components/services/DigitalCreation";
import { DigitalExecution } from "@/components/services/DigitalExecution";
import { VirtualAssistance } from "@/components/services/VirtualAssistance";
import { EngagementModels } from "@/components/services/EngagementModels";
import { ServicesCTA } from "@/components/services/CTA";
import { OurProcess } from "@/components/services/OurProcess";

export const metadata: Metadata = {
  title: "Digital Services | Web Design, Digital Marketing & Virtual Assistance",

  description:
    "Explore Go Far Agency's digital services: graphic design, web design and development, video editing, content creation, digital marketing, SEO, automation, and managed virtual assistance.",

  keywords: [
    "digital services",
    "digital agency",
    "web design and development",
    "graphic design services",
    "video editing services",
    "content creation services",
    "digital marketing services",
    "SEO services",
    "paid advertising",
    "business automation",
    "virtual assistant services",
    "managed virtual assistance",
    "business support services",
    "Go Far Agency",
  ],

  alternates: {
    canonical: absoluteUrl("/services"),
  },

  openGraph: {
    type: "website",
    locale: "en",
    url: absoluteUrl("/services"),
    siteName: siteConfig.name,
    title:
      "Digital Services | Web Design, Digital Marketing & Virtual Assistance",
    description:
      "From creative production to digital growth and operational support, discover how Go Far Agency helps move your projects forward.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Go Far Agency — Digital Creation, Digital Execution and Virtual Assistance",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Digital Services | Go Far Agency",
    description:
      "Digital creation, digital execution and managed virtual assistance for projects that deserve more.",
    images: [siteConfig.ogImage],
  },
};

const servicesStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Go Far Agency Digital Services",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Digital Creation",
        description:
          "Project-based creative and digital production services.",
        itemListElement: [
          "Graphic design",
          "Web design and development",
          "Video editing",
          "Content creation and writing",
          "Service-provider sourcing",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
          },
        })),
      },
      {
        "@type": "OfferCatalog",
        name: "Digital Execution",
        description:
          "Ongoing digital strategy and execution for business growth.",
        itemListElement: [
          "Advertising management",
          "Business planning and consultation",
          "Automation support",
          "SEO and paid advertising",
          "Social media management",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
          },
        })),
      },
      {
        "@type": "OfferCatalog",
        name: "Managed Virtual Assistance",
        description:
          "Flexible administrative and operational support.",
        itemListElement: [
          "Administration and data entry",
          "Email and calendar management",
          "Social media management",
          "Customer service and event support",
          "Research and reporting",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
          },
        })),
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesStructuredData).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <ServicesHero />
      <ServicesOverview />
      <DigitalCreation />
      <DigitalExecution />
      <VirtualAssistance />
      <OurProcess />
      <EngagementModels />
      <ServicesCTA />
    </main>
  );
}
