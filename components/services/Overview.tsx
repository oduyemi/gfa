"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {ArrowUpRight, Check, Clock3, Layers3, PenTool, Repeat2, Wallet, Sparkles} from "lucide-react";


const services = [
  {
    id: "digital-creation",
    number: "01",
    category: "Creative production",
    title: "Digital",
    accentTitle: "Creation.",
    tagline: "Design. Build. Bring your ideas to life.",
    description:
      "From the first spark of an idea to the finished product, we turn your vision into something tangible, engaging and ready for the world.",
    icon: PenTool,
    accent: "text-brand-electric",
    accentBg: "bg-brand-electric",
    softBg: "bg-brand-electric/[0.07]",
    line: "bg-brand-electric",
    engagement: "Project-based",
    payment: "50% deposit to commence",
    duration: "Defined project scope",
    offerings: [
      "Graphic design",
      "Web design & development",
      "Video editing",
      "Content creation & writing",
      "Service provider sourcing",
    ],
    href: "#digital-creation",
    theme: "light",
    descriptor: "For ideas taking shape",
  },
  {
    id: "digital-execution",
    number: "02",
    category: "Strategy & growth",
    title: "Digital",
    accentTitle: "Execution.",
    tagline: "Strategy. Grow. Scale.",
    description:
      "We help businesses strengthen their digital presence, improve operations and put the right strategies in place for sustainable growth.",
    icon: Repeat2,
    accent: "text-brand-gold",
    accentBg: "bg-brand-gold",
    softBg: "bg-brand-gold/[0.10]",
    line: "bg-brand-gold",
    engagement: "Monthly retainer",
    payment: "Minimum 3-month engagement",
    duration: "Ongoing partnership",
    offerings: [
      "Ad management (Instagram, Google & YouTube)",
      "Business planning & consultation",
      "Business process automation",
      "Search engine optimisation (SEO)",
      "Social media strategy & management",
    ],
    href: "#digital-execution",
    theme: "dark",
    descriptor: "For businesses ready to grow",
  },
  {
    id: "virtual-assistance",
    number: "03",
    category: "Operational support",
    title: "Managed Virtual",
    accentTitle: "Assistance.",
    tagline: "Support. Organise. Keep you moving.",
    description:
      "Get dependable support for the everyday tasks that keep your business running, so you can focus on the work that needs you.",
    icon: Layers3,
    accent: "text-[#A69BEF]",
    accentBg: "bg-[#A69BEF]",
    softBg: "bg-[#A69BEF]/[0.10]",
    line: "bg-[#A69BEF]",
    engagement: "Hourly or packaged",
    payment: "10–30 hour packages · Paid upfront",
    duration: "Flexible support",
    offerings: [
      "Administration & data entry",
      "Email & calendar management",
      "Social media scheduling & inbox support",
      "Customer service & events",
      "Research & reporting",
    ],
    href: "#virtual-assistance",
    theme: "light",
    descriptor: "For the work behind the work",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export const ServicesOverview = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="service-lines"
      className="relative overflow-hidden bg-surface-subtle py-20 sm:py-24 lg:py-32"
    >
      <div className="brand-container">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease }}
          className="mb-14 lg:mb-20"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3">
                <p className="brand-eyebrow">What we bring to the table</p>
              </div>

              <h2 className="font-brand-display text-4xl font-semibold leading-[1.04] tracking-[-0.055em] text-foreground sm:text-5xl lg:text-[4.5rem]">
                The right people.
                <br />
                <span className="brand-gradient-text">
                  The right kind of support.
                </span>
              </h2>
            </div>

            <div className="max-w-md lg:pb-2">
              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                Whether you're building something new, growing a business or
                managing the day-to-day, there's a way we can help you move
                forward.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-foreground">
                <Sparkles size={15} className="text-brand-electric" />
                Three ways to work with us
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3 lg:gap-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isDark = service.theme === "dark";

            return (
              <motion.article
                key={service.id}
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 30 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.65,
                  delay: shouldReduceMotion ? 0 : index * 0.1,
                  ease,
                }}
                className={`group relative flex flex-col overflow-hidden border transition-all duration-500 ${
                  isDark
                    ? "border-obsidian-900 bg-obsidian-900 text-white"
                    : "border-border bg-card text-foreground hover:border-brand-electric/30"
                }`}
              >
                <div className={`h-1 w-full ${service.line}`} />

                <div className="flex flex-1 flex-col p-6 sm:p-7 lg:p-7 xl:p-8">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-brand-display text-5xl font-semibold tracking-[-0.07em] ${
                        isDark ? "text-white/15" : "text-foreground/10"
                      }`}
                    >
                      {service.number}
                    </span>

                    <div
                      className={`flex size-12 items-center justify-center rounded-full ${service.softBg}`}
                    >
                      <Icon
                        size={21}
                        strokeWidth={1.7}
                        className={service.accent}
                      />
                    </div>
                  </div>

                  <div className="mt-8">
                    <p
                      className={`mb-4 text-[10px] font-bold uppercase tracking-[0.18em] ${
                        isDark ? "text-white/45" : "text-muted-foreground"
                      }`}
                    >
                      {service.category}
                    </p>

                    <h3 className="min-h-[5rem] font-brand-display text-[2.15rem] font-semibold leading-[1.02] tracking-[-0.055em] sm:text-4xl">
                      {service.title}
                      <br />
                      <span className={service.accent}>
                        {service.accentTitle}
                      </span>
                    </h3>

                    <p
                      className={`mt-5 text-[11px] font-bold uppercase leading-6 tracking-[0.12em] ${
                        isDark ? "text-white/65" : "text-muted-foreground"
                      }`}
                    >
                      {service.tagline}
                    </p>

                    <p
                      className={`mt-4 min-h-[6rem] text-sm leading-7 ${
                        isDark ? "text-white/60" : "text-muted-foreground"
                      }`}
                    >
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-8 flex-1">
                    <div
                      className={`mb-2 flex items-center justify-between border-b pb-3 ${
                        isDark ? "border-white/15" : "border-border"
                      }`}
                    >
                      <p
                        className={`text-[10px] font-bold uppercase tracking-[0.16em] ${
                          isDark ? "text-white/45" : "text-muted-foreground"
                        }`}
                      >
                        What we can help with
                      </p>
                    </div>

                    <ul>
                      {service.offerings.map((offering) => (
                        <li
                          key={offering}
                          className={`flex items-start gap-3 border-b py-3 last:border-0 ${
                            isDark ? "border-white/10" : "border-border"
                          }`}
                        >
                          <Check
                            size={14}
                            strokeWidth={2.4}
                            className={`mt-1 shrink-0 ${service.accent}`}
                          />
                          <span
                            className={`text-[13px] leading-5 ${
                              isDark ? "text-white/80" : "text-foreground"
                            }`}
                          >
                            {offering}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={`mt-7 border-t pt-6 ${
                      isDark ? "border-white/15" : "border-border"
                    }`}
                  >
                    <p
                      className={`mb-4 text-[10px] font-bold uppercase tracking-[0.16em] ${
                        isDark ? "text-white/40" : "text-muted-foreground"
                      }`}
                    >
                      Engagement
                    </p>

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold">
                          {service.engagement}
                        </p>
                        <p
                          className={`mt-1 text-xs leading-5 ${
                            isDark ? "text-white/50" : "text-muted-foreground"
                          }`}
                        >
                          {service.payment}
                        </p>
                      </div>

                      <Wallet
                        size={17}
                        className={`mt-0.5 shrink-0 ${service.accent}`}
                      />
                    </div>

                    <div
                      className={`mt-3 flex items-center gap-2 text-xs ${
                        isDark ? "text-white/50" : "text-muted-foreground"
                      }`}
                    >
                      <Clock3 size={14} className={service.accent} />
                      {service.duration}
                    </div>
                  </div>

                  <Link
                    href={service.href}
                    className={`mt-7 flex items-center justify-between border px-5 py-4 text-sm font-semibold transition-all duration-300 ${
                      isDark
                        ? "border-white/15 text-white hover:border-brand-gold hover:bg-brand-gold hover:text-obsidian-900"
                        : "border-border text-foreground hover:border-obsidian-900 hover:bg-obsidian-900 hover:text-white"
                    }`}
                  >
                    Explore this service

                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease }}
          className="mt-14 border-t border-border pt-8 lg:mt-16 lg:pt-10"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-brand-display text-2xl font-semibold tracking-[-0.035em] text-foreground sm:text-3xl">
                Your project doesn't have to fit into just one box.
              </p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Need a combination of creative, strategic and operational
                support? We can bring the right pieces together around your
                goals.
              </p>
            </div>

            <Link
              href="/contact"
              className="group inline-flex w-fit shrink-0 items-center gap-3 border-b border-brand-electric pb-2 text-sm font-semibold text-foreground transition-colors hover:text-brand-electric"
            >
              Let's discuss your needs
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
