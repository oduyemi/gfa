
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Megaphone,
  Palette,
  Headset,
  Check,
  Clock3,
  Layers3,
  Sparkles,
  PenTool,
  MousePointer2,
  MessageCircle,
  AudioLines,
} from "lucide-react";
import { HomeSection } from "./HomeSection";
import { useState } from "react";
import { ContactDialog } from "@/dialogs/contact-dialog";

const services = [
  {
    number: "01",
    label: "CREATE",
    title: "Digital Creation",
    tagline: "Design. Build. Bring your ideas to life.",
    description:
      "Have an idea? We bring the creative and technical expertise to turn it into something real.",
    offerings: [
      "Graphic design",
      "Website design & development",
      "Video editing",
      "Content creation & writing",
      "Service provider sourcing",
    ],
    model: "Project-based",
    terms: "50% deposit to get started",
    icon: Palette,
    accent: "#F4BE28",
    accentSoft: "rgba(244, 190, 40, 0.12)",
    accentText: "text-[#B1840B] dark:text-[#F4BE28]",
    artwork: "creative",
    href: "/services/#digital-creation"
  },
  {
    number: "02",
    label: "GROW",
    title: "Digital Execution",
    tagline: "Strategise. Grow. Scale.",
    description:
      "Ready to grow? We help you plan, market and improve how your business operates.",
    offerings: [
      "Instagram, Google & YouTube ads",
      "SEO",
      "Social media strategy & management",
      "Business planning & consultation",
      "Business process automation",
    ],
    model: "Monthly retainer",
    terms: "Minimum 3-month engagement",
    icon: Megaphone,
    accent: "#1265F4",
    accentSoft: "rgba(18, 101, 244, 0.10)",
    accentText: "text-[#1265F4] dark:text-[#6FA0FF]",
    artwork: "marketing",
    href: "/services/#digital-execution"
  },
  {
    number: "03",
    label: "SUPPORT",
    title: "Managed Virtual Assistance",
    tagline: "Support. Organise. Keep you moving.",
    description:
      "Need an extra pair of hands? We handle essential day-to-day tasks behind the scenes.",
    offerings: [
      "Administrative support & data entry",
      "Email & calendar management",
      "Social media scheduling & inbox support",
      "Customer service",
      "Event coordination",
      "Research & reporting",
    ],
    model: "Hourly or 10–30 hour packages",
    terms: "Upfront payment",
    icon: Headset,
    accent: "#B1849A",
    accentSoft: "rgba(227, 208, 216, 0.30)",
    accentText: "text-[#A66F84] dark:text-[#E3D0D8]",
    artwork: "assistance",
    href: "/services/#virtual-assistance"
  },
];

function CreativeVisual() {
  return (
    <div className="relative flex h-full min-h-[132px] items-center justify-between overflow-hidden px-5">
      <div
        aria-hidden
        className="absolute -right-8 -top-16 size-48 rounded-full border border-[#F4BE28]/20"
      >
        <div className="absolute inset-6 rounded-full border border-[#F4BE28]/15" />
        <div className="absolute inset-12 rounded-full border border-[#F4BE28]/10" />
      </div>

      <div className="relative z-10 flex size-[66px] items-center justify-center rounded-[1.25rem] bg-[#F4BE28] text-[#090A0C] shadow-[0_12px_30px_rgba(244,190,40,0.2)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
        <PenTool size={30} strokeWidth={1.6} />
      </div>

      <div className="relative z-10 mr-5 flex flex-col gap-2">
        <div className="flex gap-2">
          <span className="size-8 rounded-lg bg-[#1265F4]/15" />
          <span className="size-8 rounded-lg bg-[#E3D0D8]" />
          <span className="size-8 rounded-lg bg-[#F4BE28]/60" />
        </div>
        <div className="h-1.5 w-28 rounded-full bg-border" />
        <div className="h-1.5 w-20 rounded-full bg-border/60" />
      </div>

      <Sparkles
        aria-hidden
        size={19}
        className="absolute right-5 top-5 text-[#B1840B] dark:text-[#F4BE28]"
      />
    </div>
  );
}

function MarketingVisual() {
  return (
    <div className="relative flex h-full min-h-[132px] items-center justify-between overflow-hidden px-5">
      <div
        aria-hidden
        className="absolute -right-8 -top-16 size-48 rounded-full border border-[#1265F4]/20"
      >
        <div className="absolute inset-6 rounded-full border border-[#1265F4]/15" />
        <div className="absolute inset-12 rounded-full border border-[#1265F4]/10" />
      </div>

      <div className="relative z-10 flex size-[66px] items-center justify-center rounded-[1.25rem] bg-[#1265F4] text-white shadow-[0_12px_30px_rgba(18,101,244,0.2)] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105">
        <Megaphone size={30} strokeWidth={1.6} />
      </div>

      <div className="relative z-10 mr-5 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#1265F4]" />
          <span className="h-1.5 w-24 rounded-full bg-[#1265F4]/20" />
        </div>
        <div className="h-1.5 w-28 rounded-full bg-border" />
        <div className="h-1.5 w-20 rounded-full bg-border/60" />
        <div className="flex gap-1.5 pt-1">
          <span className="h-4 w-5 rounded bg-[#1265F4]/20" />
          <span className="h-4 w-5 rounded bg-[#1265F4]/40" />
          <span className="h-4 w-5 rounded bg-[#1265F4]/70" />
        </div>
      </div>

      <MousePointer2
        aria-hidden
        size={19}
        className="absolute right-5 top-5 text-[#1265F4]"
      />
    </div>
  );
}

function AssistanceVisual() {
  return (
    <div className="relative flex h-full min-h-[132px] items-center justify-between overflow-hidden px-5">
      <div
        aria-hidden
        className="absolute -right-8 -top-16 size-48 rounded-full border border-[#B1849A]/25"
      >
        <div className="absolute inset-6 rounded-full border border-[#B1849A]/15" />
        <div className="absolute inset-12 rounded-full border border-[#B1849A]/10" />
      </div>

      <div className="relative z-10 flex size-[66px] items-center justify-center rounded-[1.25rem] bg-[#E3D0D8] text-[#795565] shadow-[0_12px_30px_rgba(181,138,155,0.16)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
        <Headset size={30} strokeWidth={1.6} />
      </div>

      <div className="relative z-10 mr-5 flex flex-col gap-2">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <MessageCircle size={13} className="text-[#A66F84]" />
          <span className="h-1.5 w-16 rounded-full bg-border" />
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <AudioLines size={13} className="text-[#A66F84]" />
          <span className="h-1.5 w-12 rounded-full bg-border" />
        </div>
      </div>
    </div>
  );
}

const artwork = {
  creative: CreativeVisual,
  marketing: MarketingVisual,
  assistance: AssistanceVisual,
};

export const ServicesOverview = () => {
  const reduceMotion = useReducedMotion();
  const [dialogType, setDialogType] = useState<"creation" | "execution" | "assistance" | "general" | null>(null);


  return (
    <HomeSection
      id="services"
      eyebrow="What we do"
      title={
        <>
          The support you need.{" "}
          <span className="brand-gradient-text">Without the noise.</span>
        </>
      }
      description="From creative production and digital growth to reliable business support, we bring the right skills and people around your goals."
      className="bg-surface-subtle"
    >
      {/* Section introduction */}
      <div className="mb-8 flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-electric">
            Three ways we help
          </p>
          <h3 className="mt-2 font-brand-display text-xl font-semibold tracking-[-0.045em] text-foreground sm:text-2xl">
            What do you need help with?
          </h3>
        </div>

        <p className="max-w-[270px] text-xs leading-5 text-muted-foreground sm:text-right">
          Choose a service area. We’ll help you figure out the right next step.
        </p>
      </div>

      {/* Service cards */}
      <div className="grid items-stretch gap-5 md:grid-cols-3">
        {services.map((service, index) => {
          const Icon = service.icon;
          const Artwork = artwork[service.artwork as keyof typeof artwork];

          return (
            <motion.article
              key={service.number}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                delay: reduceMotion ? 0 : index * 0.09,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ "--service-accent": service.accent } as React.CSSProperties}
              className="group relative flex flex-col overflow-hidden rounded-[1.65rem] border border-border bg-card p-5 shadow-premium-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--service-accent)]/40 hover:shadow-premium-md sm:p-6"
            >
              <div
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ backgroundColor: service.accent }}
              />

              <div className="flex items-center justify-between">
                <span className={`font-mono text-[10px] font-bold tracking-[0.16em] ${service.accentText}`}>
                  {service.number} <span className="opacity-50">/</span> {service.label}
                </span>

                <span
                  className={`grid size-9 place-items-center rounded-full ${service.accentText}`}
                  style={{ backgroundColor: service.accentSoft }}
                >
                  <Icon size={17} strokeWidth={1.8} />
                </span>
              </div>

              <div className="mt-5 overflow-hidden rounded-[1.1rem] border border-border/70 bg-surface-subtle">
                <Artwork />
              </div>

              <div className="mt-6">
                <h3 className="max-w-[260px] font-brand-display text-[1.55rem] font-bold leading-[1.08] tracking-[-0.055em] text-foreground">
                  {service.title}
                </h3>

                <p className={`mt-2.5 text-[11px] font-bold ${service.accentText}`}>
                  {service.tagline}
                </p>

                <p className="mt-3 text-[13px] leading-[1.75] text-muted-foreground">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 border-t border-border pt-5">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    What we can do
                  </p>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {String(service.offerings.length).padStart(2, "0")} services
                  </span>
                </div>

                <ul className="space-y-3.5">
                  {service.offerings.map((offering) => (
                    <li
                      key={offering}
                      className="flex items-start gap-3 text-[13px] font-medium leading-[1.45] text-foreground"
                    >
                      <span
                        className={`mt-0.5 grid size-[17px] shrink-0 place-items-center rounded-full ${service.accentText}`}
                        style={{ backgroundColor: service.accentSoft }}
                      >
                        <Check size={10} strokeWidth={2.8} />
                      </span>
                      <span>{offering}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-7">
                <div className="rounded-xl bg-surface-subtle p-4">
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg ${service.accentText}`}
                      style={{ backgroundColor: service.accentSoft }}
                    >
                      {index === 2 ? (
                        <Clock3 size={16} />
                      ) : (
                        <Layers3 size={16} />
                      )}
                    </span>

                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground">
                        {service.model}
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                        {service.terms}
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href={service.href}
                  aria-label={`Explore ${service.title}`}
                  className={`mt-5 inline-flex items-center gap-2 text-xs font-bold text-foreground transition-colors hover:text-brand-electric ${service.accentText}`}
                >
                  Explore service
                  <span className="grid size-8 place-items-center rounded-full border border-border transition-all duration-300 group-hover:border-[var(--service-accent)] group-hover:bg-[var(--service-accent)] group-hover:text-[#090A0C]">
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Closing CTA */}
      <div className="group relative mt-8 overflow-hidden rounded-[1.65rem] border border-border bg-card px-6 py-7 sm:px-9 sm:py-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-28 size-72 rounded-full border border-brand-electric/[0.12] transition-transform duration-700 group-hover:scale-110"
        >
          <div className="absolute inset-8 rounded-full border border-brand-electric/[0.09]" />
          <div className="absolute inset-16 rounded-full border border-brand-electric/[0.07]" />
        </div>

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand-gold" />
              <p className="text-[10px] font-bold uppercase tracking-[0.19em] text-brand-electric">
                Have something else in mind?
              </p>
            </div>

            <h3 className="mt-3 font-brand-display text-2xl font-semibold leading-tight tracking-[-0.05em] text-foreground sm:text-3xl">
              Let's find the right way
              <br className="hidden sm:block" /> to move it forward.
            </h3>

            <p className="mt-2 max-w-md text-[13px] leading-relaxed text-muted-foreground">
              Tell us what you’re working on. We’ll help you find the right service or combination of support.
            </p>
          </div>

          <button
              type="button"
              onClick={() => setDialogType("general")}
            className="group/button inline-flex min-h-12 w-fit shrink-0 items-center gap-5 rounded-full bg-brand-electric px-6 text-xs font-bold text-white shadow-[0_6px_18px_rgba(18,101,244,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-electric-700 hover:shadow-[0_9px_24px_rgba(18,101,244,0.25)]"
          >
            Start a conversation
            <span className="grid size-7 place-items-center rounded-full bg-white/15">
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
              />
            </span>
          </button>
        </div>
      </div>

      <ContactDialog
      type={dialogType}
      onClose={() => setDialogType(null)}
      />
    </HomeSection>
  );
};
