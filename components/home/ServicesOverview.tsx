"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Megaphone,
  Palette,
  Headset,
  Sparkles,
  MousePointer2,
  PenTool,
  MessageCircle,
  AudioLines,
} from "lucide-react";
import { homeServices } from "./home-data";
import { HomeSection } from "./HomeSection";

const serviceVisuals = [
  {
    icon: Megaphone,
    numberColor: "text-[#1265F4]",
    iconColor: "text-[#1265F4]",
    iconBg: "bg-[#1265F4]/10",
    accent: "bg-[#1265F4]",
    label: "01 / VISIBILITY",
    visual: "marketing",
  },
  {
    icon: Palette,
    numberColor: "text-[#B1840B] dark:text-[#F4BE28]",
    iconColor: "text-[#B1840B] dark:text-[#F4BE28]",
    iconBg: "bg-[#F4BE28]/15",
    accent: "bg-[#F4BE28]",
    label: "02 / CREATION",
    visual: "creative",
  },
  {
    icon: Headset,
    numberColor: "text-[#A66F84] dark:text-[#E3D0D8]",
    iconColor: "text-[#A66F84] dark:text-[#E3D0D8]",
    iconBg: "bg-[#E3D0D8]/30",
    accent: "bg-[#E3D0D8]",
    label: "03 / SUPPORT",
    visual: "assistance",
  },
];

function MarketingVisual() {
  return (
    <div className="relative flex h-[112px] items-center">
      <div className="relative flex size-[76px] items-center justify-center rounded-[1.5rem] bg-[#1265F4] text-white shadow-[0_12px_30px_rgba(18,101,244,0.22)] transition-transform duration-500 group-hover:rotate-[-7deg] group-hover:scale-105">
        <Megaphone size={32} strokeWidth={1.5} />
      </div>

      <div className="relative ml-5 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#1265F4]" />
          <span className="h-1.5 w-20 rounded-full bg-[#1265F4]/20" />
        </div>
        <div className="h-1.5 w-28 rounded-full bg-border" />
        <div className="h-1.5 w-16 rounded-full bg-border/60" />
        <div className="mt-0.5 flex gap-1.5">
          <span className="h-5 w-5 rounded-md bg-[#1265F4]/15" />
          <span className="h-5 w-5 rounded-md bg-[#1265F4]/25" />
          <span className="h-5 w-5 rounded-md bg-[#1265F4]/40" />
        </div>
      </div>

      <div className="absolute -right-1 top-0 flex size-9 items-center justify-center rounded-full border border-border bg-background text-[#1265F4] shadow-sm transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
        <MousePointer2 size={16} />
      </div>
    </div>
  );
}

function CreativeVisual() {
  return (
    <div className="relative flex h-[112px] items-center">
      <div className="relative flex size-[76px] items-center justify-center rounded-[1.5rem] bg-[#F4BE28] text-[#090A0C] shadow-[0_12px_30px_rgba(244,190,40,0.17)] transition-transform duration-500 group-hover:rotate-[7deg] group-hover:scale-105">
        <PenTool size={31} strokeWidth={1.6} />
      </div>

      <div className="relative ml-5 grid grid-cols-3 gap-2">
        <span className="size-8 rounded-xl bg-[#1265F4]/15" />
        <span className="size-8 rounded-xl bg-[#E3D0D8]" />
        <span className="size-8 rounded-xl bg-[#F4BE28]/50" />
        <span className="col-span-2 h-2 rounded-full bg-border" />
        <span className="h-2 rounded-full bg-border/60" />
      </div>

      <div className="absolute -right-1 top-0 flex size-9 items-center justify-center rounded-full border border-border bg-background text-[#B1840B] shadow-sm transition-transform duration-500 group-hover:rotate-12">
        <Sparkles size={17} />
      </div>
    </div>
  );
}

function AssistanceVisual() {
  return (
    <div className="relative flex h-[112px] items-center">
      <div className="relative flex size-[76px] items-center justify-center rounded-[1.5rem] bg-[#E3D0D8] text-[#795565] shadow-[0_12px_30px_rgba(181,138,155,0.15)] transition-transform duration-500 group-hover:rotate-[-7deg] group-hover:scale-105">
        <Headset size={32} strokeWidth={1.6} />
      </div>

      <div className="relative ml-5 flex flex-col gap-2.5">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
          <MessageCircle size={13} className="text-[#A66F84]" />
          <span className="h-1.5 w-16 rounded-full bg-border" />
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
          <AudioLines size={13} className="text-[#A66F84]" />
          <span className="h-1.5 w-12 rounded-full bg-border" />
        </div>
      </div>

      <div className="absolute -right-1 top-0 flex size-9 items-center justify-center rounded-full border border-border bg-background text-[#A66F84] shadow-sm transition-transform duration-500 group-hover:translate-x-1">
        <ArrowRight size={16} />
      </div>
    </div>
  );
}

const serviceArtwork = [
  MarketingVisual,
  CreativeVisual,
  AssistanceVisual,
];

export const ServicesOverview = () => {
  const reduceMotion = useReducedMotion();

  return (
    <HomeSection
      id="services"
      eyebrow="What we help with"
      title={
        <>
          The support you need.{" "}
          <span className="brand-gradient-text">Without the noise.</span>
        </>
      }
      description="From building visibility to bringing ideas to life and keeping things moving, we connect you with the capabilities your goals need."
      className="bg-surface-subtle"
    >
      {/* Editorial introduction */}
      <div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-brand-electric" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-electric">
              Three ways to move forward
            </p>
          </div>

          <h3 className="mt-3 font-brand-display text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">
            Different needs. One capable partner.
          </h3>
        </div>

        <p className="max-w-[290px] text-xs leading-6 text-muted-foreground sm:text-right">
          Flexible support that meets your project where it is.
        </p>
      </div>

      {/* Service cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {homeServices.map((service, index) => {
          const visual = serviceVisuals[index] ?? serviceVisuals[0];
          const Artwork = serviceArtwork[index] ?? MarketingVisual;
          const Icon = visual.icon;

          return (
            <motion.article
              key={service.number}
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 24,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: reduceMotion ? 0 : 0.6,
                delay: reduceMotion ? 0 : index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex min-h-[390px] flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card p-6 shadow-premium-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-electric/25 hover:shadow-premium-md sm:p-7"
            >
              {/* Top metadata */}
              <div className="relative z-10 flex items-center justify-between">
                <span className={`font-mono text-[11px] font-bold tracking-[0.12em] ${visual.numberColor}`}>
                  {visual.label}
                </span>

                <span className="flex size-9 items-center justify-center rounded-full border border-border bg-surface-subtle text-muted-foreground transition-all duration-300 group-hover:border-brand-electric/30 group-hover:text-brand-electric">
                  <Icon size={16} strokeWidth={1.8} />
                </span>
              </div>

              {/* Artwork */}
              <div className="relative mt-7 overflow-hidden rounded-2xl border border-border/70 bg-surface-subtle px-4">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-7 -top-10 size-32 rounded-full border border-brand-electric/[0.09]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-1 -top-4 size-20 rounded-full border border-brand-electric/[0.07]"
                />

                <Artwork />
              </div>

              {/* Main content */}
              <div className="relative z-10 mt-auto pt-7">
                <div className={`mb-4 h-1 w-9 rounded-full ${visual.accent} transition-all duration-300 group-hover:w-16`} />

                <h3 className="font-brand-display text-[1.65rem] font-semibold tracking-[-0.055em] text-foreground sm:text-[1.85rem]">
                  {service.title}
                </h3>

                <p className="mt-3 max-w-[310px] text-[13px] leading-[1.8] text-muted-foreground">
                  {service.description}
                </p>

                <Link
                  href="/services"
                  aria-label={`Explore ${service.title}`}
                  className="mt-6 inline-flex items-center gap-3 text-xs font-bold text-foreground transition-colors hover:text-brand-electric"
                >
                  Explore service
                  <span className="flex size-8 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-brand-electric group-hover:bg-brand-electric group-hover:text-white">
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover:rotate-45"
                    />
                  </span>
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Closing CTA */}
      <div className="relative mt-7 overflow-hidden rounded-[1.5rem] border border-border bg-card px-6 py-6 sm:px-8 sm:py-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-24 size-56 rounded-full border border-brand-electric/[0.09]"
        >
          <div className="absolute inset-7 rounded-full border border-brand-electric/[0.07]" />
        </div>

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand-gold" />
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-electric">
                Need a little direction?
              </p>
            </div>

            <h3 className="mt-2 font-brand-display text-lg font-semibold tracking-[-0.04em] text-foreground sm:text-xl">
              Not sure what your project needs?
            </h3>

            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              Let&apos;s work out the right combination together.
            </p>
          </div>

          <Link
            href="/services"
            className="group inline-flex min-h-12 w-fit shrink-0 items-center gap-4 rounded-full bg-brand-electric px-5 text-xs font-bold text-white shadow-[0_6px_18px_rgba(18,101,244,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-electric-700 hover:shadow-[0_9px_24px_rgba(18,101,244,0.25)]"
          >
            Explore all services
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </HomeSection>
  );
};
