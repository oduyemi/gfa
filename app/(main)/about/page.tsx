
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/seo";
import { AboutHero } from "@/components/about/Hero";
import { AboutIntro } from "@/components/about/Intro";
import { WhyGFA } from "@/components/about/WhyGFA";
import { FAQSection } from "@/components/about/FAQ";
// import { AboutBeliefs } from "@/components/about/AboutBeliefs";
// import { AboutDifference } from "@/components/about/AboutDifference";
// import { AboutAudience } from "@/components/about/AboutAudience";
// import { AboutCTA } from "@/components/about/AboutCTA";

const pageUrl = absoluteUrl("/about");

export const metadata: Metadata = {
  title: "About Go Far Agency | Your Extended Digital Team",
  description:
    "Meet Go Far Agency. We bring creative expertise, digital strategy and practical support together to help entrepreneurs, businesses and projects move forward.",

  keywords: [
    "Go Far Agency",
    "about Go Far Agency",
    "digital agency",
    "creative digital agency",
    "digital services agency",
    "digital marketing and creative services",
    "web design and development agency",
    "virtual assistance services",
    "digital project support",
  ],

  alternates: {
    canonical: pageUrl,
  },

  openGraph: {
    type: "website",
    url: pageUrl,
    title: "About Go Far Agency | Your Extended Digital Team",
    description:
      "Discover the people-first approach behind Go Far Agency and how we bring creative expertise, digital strategy and practical support together.",
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl("/images/og-about.jpg"),
        width: 1200,
        height: 630,
        alt: "Go Far Agency — Your extended digital team",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Go Far Agency",
    description:
      "Creative expertise, digital strategy and practical support for projects that deserve to go further.",
    images: [absoluteUrl("/images/og-about.jpg")],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${absoluteUrl("/")}#organization`,
  name: siteConfig.name,
  url: absoluteUrl("/"),
  description:
    "Go Far Agency brings creative services, digital expertise, strategy and practical support together to help businesses, entrepreneurs and projects move forward.",
  image: absoluteUrl("/images/og-about.jpg"),
  logo: absoluteUrl("/images/logo.png"),
  sameAs: [
    // Add GFA's official social media URLs here.
  ],
};

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: "About Go Far Agency",
  description:
    "Learn about Go Far Agency, our approach, values and the people and projects we support.",
  isPartOf: {
    "@id": `${absoluteUrl("/")}#website`,
  },
  about: {
    "@id": `${absoluteUrl("/")}#organization`,
  },
  breadcrumb: {
    "@id": `${pageUrl}#breadcrumb`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${pageUrl}#breadcrumb`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: absoluteUrl("/"),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About Us",
      item: pageUrl,
    },
  ],
};

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={webpageSchema} />
      <JsonLd data={breadcrumbSchema} />

      <main>
        <AboutHero />
        <AboutIntro />
        <WhyGFA />
        <FAQSection />
        {/* <AboutBeliefs /> */}
        {/* <AboutDifference /> */}
        {/* <AboutAudience /> */}
        {/* <AboutCTA /> */}
      </main>
    </>
  );
}