import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { GFAPerspective } from "@/components/home/GFAPerspective";
import { HowItWorksPreview } from "@/components/home/HowItWorksPreview";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { Testimonials } from "@/components/home/Testimonials";
import { TrustStrip } from "@/components/home/TrustStrip";


export default function Home() {
  return (
      <main>
        <Hero />
        <TrustStrip />
        <ServicesOverview />
        <FeaturedProjects projects={[]} />
        <Testimonials testimonials={[]} />
        <HowItWorksPreview />
        <GFAPerspective />
      </main>
  );
}
