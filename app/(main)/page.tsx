import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { GFAPerspective } from "@/components/home/GFAPerspective";
import { HowItWorksPreview } from "@/components/home/HowItWorksPreview";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustStrip } from "@/components/home/TrustStrip";
import { NewsletterCTA } from "@/components/shared/NewsletterCTA";


export default function Home() {
  const handleNewsletterSubscribe = async (email: string) => {
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(
        data.message || "Unable to subscribe. Please try again."
      );
    }
  };
  return (
      <main>
        <Hero />
        <TrustStrip />
        <ServicesOverview />
        <FeaturedProjects projects={[]} />
        <Testimonials testimonials={[]} />
        <NewsletterCTA />
        <HowItWorksPreview />
        <GFAPerspective />
      </main>
  );
}
