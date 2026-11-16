
export const siteConfig = {
    name: "Go Far Agency",
    shortName: "GFA",
    description:
      "Go Far Agency helps individuals and businesses bring ideas to life through digital creation, digital execution, and managed virtual assistance.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://gfagency.uk",
    ogImage: "/images/og/gfa-og.jpg",
  };
  
  export const defaultKeywords = [
    "Go Far Agency",
    "GFA",
    "digital services agency",
    "digital solutions",
    "digital creation",
    "digital execution",
    "virtual assistance",
    "web design and development",
    "graphic design",
    "digital marketing",
    "business support",
  ];
  
  export function absoluteUrl(path: string) {
    return new URL(path, siteConfig.url).toString();
  }
  