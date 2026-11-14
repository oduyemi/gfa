import { AudienceSection } from "@/components/home/AudienceSection";
import { FAQSection } from "@/components/home/FAQ";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { HomeCTA } from "@/components/home/CTA";
import { HomeIntro } from "@/components/home/Intro";
import { HowItWorksPreview } from "@/components/home/HowItWorksPreview";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustStrip } from "@/components/home/TrustStrip";
import { WhyGFA } from "@/components/home/WhyGFA";


export default function Home() {
  return (
      <main>
        <Hero />
        <TrustStrip />
        <HomeIntro />
        <ServicesOverview />
        <WhyGFA />
        <HowItWorksPreview />
        <AudienceSection />
        <FeaturedProjects projects={[]} />
        <Testimonials testimonials={[]} />
        <FAQSection />
        <HomeCTA />
      </main>
  );
}
