import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import { ContactHero } from "@/components/contact/Hero";
import { ContactOptions } from "@/components/contact/Options";
import { ContactForm } from "@/components/contact/Form";
import { ContactExpectations } from "@/components/contact/Expectations";
import { ContactCTA } from "@/components/contact/CTA";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";

const pageTitle = "Contact Go Far Agency | Let's Talk About Your Project";

const pageDescription =
  "Get in touch with Go Far Agency about creative projects, digital marketing, web design, development, business support, or virtual assistance. Tell us what you need and let's find a way forward.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "contact Go Far Agency",
    "digital agency contact",
    "hire a digital agency",
    "web design enquiry",
    "digital marketing enquiry",
    "creative agency consultation",
    "virtual assistant services enquiry",
    "project consultation",
  ],
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
  openGraph: {
    type: "website",
    title: pageTitle,
    description: pageDescription,
    url: absoluteUrl("/contact"),
    siteName: "Go Far Agency",
    images: [
      {
        url: absoluteUrl("/images/og-contact.jpg"),
        width: 1200,
        height: 630,
        alt: "Contact Go Far Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [absoluteUrl("/images/og-contact.jpg")],
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Go Far Agency",
  description: pageDescription,
  url: absoluteUrl("/contact"),
  mainEntity: {
    "@type": "Organization",
    name: "Go Far Agency",
    url: absoluteUrl("/"),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
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
      name: "Contact",
      item: absoluteUrl("/contact"),
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <main>
        <ContactHero />
        <ContactOptions />
        <ContactForm />
        <NewsletterCTA />
        <ContactExpectations />
        <ContactCTA />
      </main>
    </>
  );
}
