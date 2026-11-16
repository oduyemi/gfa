"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ClipboardList,
  Headset,
  Mail,
  Search,
  Users,
  Wallet,
  Clock3,
  ListTodo,
  FileText,
  CalendarCheck,
  Inbox,
} from "lucide-react";

const assistanceServices = [
  {
    number: "01",
    title: "Administration & Data Entry",
    description:
      "Keep information organised, records updated and routine administrative work under control.",
    icon: ClipboardList,
    tasks: ["Data entry", "Document organisation", "Admin support"],
  },
  {
    number: "02",
    title: "Email & Calendar Management",
    description:
      "Bring structure to your communication and schedule, so important things receive the attention they need.",
    icon: Mail,
    tasks: ["Inbox organisation", "Calendar coordination", "Appointments"],
  },
  {
    number: "03",
    title: "Social Media Management",
    description:
      "Keep your social platforms organised with consistent scheduling, publishing and day-to-day coordination.",
    icon: CalendarDays,
    tasks: ["Content scheduling", "Publishing", "Account support"],
  },
  {
    number: "04",
    title: "Customer Service & Events",
    description:
      "Stay on top of customer interactions and event details with reliable coordination and follow-through.",
    icon: Headset,
    tasks: ["Customer enquiries", "Event coordination", "Follow-ups"],
  },
  {
    number: "05",
    title: "Research & Reporting",
    description:
      "Gather relevant information, organise findings and prepare reports that help you move forward.",
    icon: Search,
    tasks: ["Information gathering", "Research summaries", "Reporting"],
  },
];

const packageBenefits = [
  "Support shaped around your agreed priorities",
  "Clearly defined tasks and working arrangements",
  "Organised updates on completed work",
  "Flexible hourly or packaged engagement",
];

const workdayItems = [
  {
    icon: Inbox,
    title: "Inbox organised",
    detail: "Communication and follow-ups",
    status: "On track",
    color: "blue",
  },
  {
    icon: CalendarCheck,
    title: "Schedule coordinated",
    detail: "Appointments and daily priorities",
    status: "Organised",
    color: "gold",
  },
  {
    icon: Users,
    title: "People connected",
    detail: "Customer and team coordination",
    status: "In order",
    color: "lilac",
  },
  {
    icon: FileText,
    title: "Records updated",
    detail: "Documents and administration",
    status: "Completed",
    color: "rose",
  },
];

const accentStyles = {
  blue: {
    icon: "bg-[#1265F4]/10 text-[#1265F4]",
    status: "text-[#1265F4]",
    dot: "bg-[#1265F4]",
  },
  gold: {
    icon: "bg-[#F4BE28]/20 text-[#98720C]",
    status: "text-[#98720C]",
    dot: "bg-[#F4BE28]",
  },
  lilac: {
    icon: "bg-[#E7E6F7] text-[#625F92]",
    status: "text-[#625F92]",
    dot: "bg-[#8B87C5]",
  },
  rose: {
    icon: "bg-[#E3D0D8]/50 text-[#986A7D]",
    status: "text-[#986A7D]",
    dot: "bg-[#C38DA5]",
  },
};

export const VirtualAssistance = () => {
  const shouldReduceMotion = useReducedMotion();

  const reveal = {
    initial: shouldReduceMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: {
      duration: shouldReduceMotion ? 0 : 0.6,
      ease: "easeOut" as const,
    },
  };

  return (
    <section
      id="virtual-assistance"
      className="relative isolate scroll-mt-24 overflow-hidden bg-background py-24 sm:py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-20 -z-10 size-[32rem] rounded-full bg-[#E7E6F7]/40 blur-[120px]"
      />

      <div className="brand-container">
        <motion.div
          {...reveal}
          className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:gap-16"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <p className="brand-eyebrow">
                03 / Managed Virtual Assistance
              </p>
            </div>

            <h2 className="max-w-3xl font-brand-display text-4xl font-semibold leading-[1.02] tracking-[-0.06em] text-foreground sm:text-5xl lg:text-[4.5rem]">
              Take care of
              <br />
              <span className="brand-gradient-text">
                business. Not busywork.
              </span>
            </h2>
          </div>

          <div className="max-w-xl lg:justify-self-end lg:pb-2">
            <p className="text-base leading-8 text-muted-foreground">
              The everyday details matter, but they don't all need your
              attention. We provide dependable virtual support that helps
              you stay organised, manage your workload and make room for
              the bigger picture.
            </p>

            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-3 text-sm font-semibold text-foreground transition-colors hover:text-brand-electric"
            >
              Find the support you need
              <span className="flex size-8 items-center justify-center rounded-full border border-border transition-all duration-300 group-hover:border-brand-electric group-hover:bg-brand-electric group-hover:text-white">
                <ArrowUpRight size={15} />
              </span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          className="relative mt-16 overflow-hidden rounded-[1.75rem] bg-[#E7E6F7] text-[#090A0C] sm:mt-20"
        >
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative z-10 flex flex-col justify-between p-7 sm:p-10 lg:p-12 xl:p-14">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#090A0C]/10 bg-white/50 px-3.5 py-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
                    Your extra pair of hands
                  </span>
                </span>

                <h3 className="mt-8 max-w-lg font-brand-display text-3xl font-semibold leading-[1.08] tracking-[-0.05em] sm:text-4xl lg:text-[3.5rem]">
                  More order in
                  <br />
                  your day.
                  <br />
                  <span className="text-[#1265F4]">
                    More room to grow.
                  </span>
                </h3>

                <p className="mt-6 max-w-md text-sm leading-7 text-[#090A0C]/65">
                  From inboxes and appointments to research and customer
                  enquiries, we help keep the important everyday tasks
                  moving, without adding more to your plate.
                </p>
              </div>

              <div className="mt-10 flex items-center gap-3 border-t border-[#090A0C]/10 pt-6">
                <span className="flex size-9 items-center justify-center rounded-full bg-[#090A0C] text-[#F4BE28]">
                  <Check size={16} />
                </span>
                <p className="text-xs font-semibold text-[#090A0C]/70">
                  Practical support. Thoughtfully organised.
                </p>
              </div>
            </div>

            {/* Task dashboard composition */}
            <div className="relative flex items-center justify-center overflow-hidden px-5 pb-8 sm:px-9 lg:px-8 lg:py-12">
              <div
                aria-hidden="true"
                className="absolute -right-24 top-1/2 size-[27rem] -translate-y-1/2 rounded-full border border-[#090A0C]/10"
              />
              <div
                aria-hidden="true"
                className="absolute -right-6 top-1/2 size-[21rem] -translate-y-1/2 rounded-full border border-[#090A0C]/10"
              />

              <div className="relative w-full max-w-[33rem] overflow-hidden rounded-2xl border border-[#090A0C]/10 bg-[#F8F7F2] shadow-[0_25px_65px_rgba(9,10,12,0.14)]">
                {/* Task board header */}
                <div className="flex items-center justify-between border-b border-[#090A0C]/10 bg-white px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-[#1265F4] text-white">
                      <ListTodo size={18} />
                    </span>
                    <div>
                      <p className="text-sm font-bold tracking-tight">
                        Daily operations
                      </p>
                      <p className="mt-0.5 text-[9px] text-[#090A0C]/45">
                        Your workday, in good order
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-[#E7E6F7] px-3 py-1.5 text-[9px] font-bold text-[#625F92]">
                    Workspace
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#090A0C]/40">
                        Areas of support
                      </p>
                      <p className="mt-1 text-base font-semibold tracking-tight">
                        The moving parts.
                      </p>
                    </div>

                    <span className="flex size-9 items-center justify-center rounded-lg bg-[#F4BE28]/25 text-[#98720C]">
                      <CalendarDays size={17} />
                    </span>
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {workdayItems.map((item) => {
                      const Icon = item.icon;
                      const style =
                        accentStyles[item.color as keyof typeof accentStyles];

                      return (
                        <div
                          key={item.title}
                          className="flex items-center gap-3 rounded-xl border border-[#090A0C]/[0.07] bg-white p-3.5 transition-all duration-300 hover:border-[#1265F4]/25 hover:shadow-sm sm:p-4"
                        >
                          <span
                            className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${style.icon}`}
                          >
                            <Icon size={18} strokeWidth={1.8} />
                          </span>

                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-[#17191F]">
                              {item.title}
                            </p>
                            <p className="mt-1 text-[10px] text-[#090A0C]/45">
                              {item.detail}
                            </p>
                          </div>

                          <span className="hidden items-center gap-1.5 sm:flex">
                            <span
                              className={`size-1.5 rounded-full ${style.dot}`}
                            />
                            <span
                              className={`text-[9px] font-semibold ${style.status}`}
                            >
                              {item.status}
                            </span>
                          </span>

                          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#1265F4]/10 text-[#1265F4] sm:hidden">
                            <Check size={12} />
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-[#090A0C] p-4 text-white">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-xs font-semibold">
                          More room for what matters.
                        </p>
                        <p className="mt-1 text-[9px] text-white/45">
                          That's the point of good support.
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight size={17} className="shrink-0 text-[#F4BE28]" />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#090A0C]/10 bg-white px-5 py-3">
                  <span className="text-[9px] text-[#090A0C]/40">
                    Managed Virtual Assistance
                  </span>
                  <span className="text-[9px] font-bold tracking-[0.12em] text-[#1265F4]">
                    GFA / SUPPORT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Services directory */}
        <div className="mt-24 sm:mt-32">
          <motion.div
            {...reveal}
            className="mb-10 grid gap-5 sm:mb-12 lg:grid-cols-[1fr_0.7fr] lg:items-end"
          >
            <div>
              <p className="brand-eyebrow mb-4">
                What we can take off your plate
              </p>

              <h3 className="max-w-2xl font-brand-display text-3xl font-semibold leading-[1.08] tracking-[-0.05em] text-foreground sm:text-4xl lg:text-5xl">
                The details don't have to
                <br className="hidden sm:block" />
                <span className="text-muted-foreground">
                  {" "}fall on you.
                </span>
              </h3>
            </div>

            <p className="max-w-md text-sm leading-7 text-muted-foreground lg:justify-self-end">
              Choose the responsibilities you need help with. We'll shape
              the support around your workload, priorities and the way you
              work.
            </p>
          </motion.div>

          <div className="grid gap-x-12 lg:grid-cols-2">
            {assistanceServices.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.article
                  key={service.number}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, y: 18 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.5,
                    delay: shouldReduceMotion ? 0 : (index % 2) * 0.08,
                  }}
                  className={`group relative border-t border-border py-7 sm:py-8 ${
                    index === assistanceServices.length - 1
                      ? "lg:col-span-2 lg:max-w-[calc(50%-1.5rem)]"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="flex shrink-0 flex-col items-center gap-3">
                      <span className="font-brand-display text-sm font-semibold tabular-nums text-brand-electric">
                        {service.number}
                      </span>

                      <span className="flex size-11 items-center justify-center rounded-xl bg-[#E7E6F7] text-[#34345A] transition-all duration-300 group-hover:bg-brand-electric group-hover:text-white">
                        <Icon size={19} strokeWidth={1.8} />
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="font-heading text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand-electric sm:text-xl">
                          {service.title}
                        </h4>

                        <ArrowUpRight
                          size={17}
                          className="shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-electric"
                        />
                      </div>

                      <p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">
                        {service.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                        {service.tasks.map((task) => (
                          <span
                            key={task}
                            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground"
                          >
                            <span className="size-1 rounded-full bg-brand-electric/60" />
                            {task}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <div className="border-t border-border" />
        </div>

        {/* Engagement model */}
        <motion.div
          {...reveal}
          className="relative mt-24 overflow-hidden rounded-[1.75rem] bg-[#090A0C] text-white sm:mt-32"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 -top-40 size-[32rem] rounded-full bg-[#1265F4]/15 blur-[100px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-40 -left-32 size-[26rem] rounded-full bg-[#E7E6F7]/[0.07] blur-[100px]"
          />

          <div className="relative grid lg:grid-cols-[0.9fr_1.1fr]">
            {/* Package overview */}
            <div className="p-7 sm:p-10 lg:p-12 xl:p-14">
              <div className="flex items-center gap-2 text-[#F4BE28]">
                <Wallet size={17} />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
                  Flexible engagement
                </span>
              </div>

              <h3 className="mt-7 max-w-md font-brand-display text-3xl font-semibold leading-[1.08] tracking-[-0.05em] sm:text-4xl lg:text-5xl">
                Support that
                <br />
                fits your workload.
              </h3>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/55">
                Whether you need occasional help or consistent operational
                support, we'll agree on an arrangement that makes sense
                for your business.
              </p>

              <div className="mt-10 flex items-end gap-3">
                <span className="font-brand-display text-6xl font-semibold leading-none tracking-[-0.07em] text-[#F4BE28] sm:text-7xl">
                  10–30
                </span>
                <span className="max-w-[6rem] pb-1.5 text-sm leading-5 text-white/55">
                  hours per package
                </span>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2">
                <Clock3 size={13} className="text-[#F4BE28]" />
                <span className="text-[10px] font-medium text-white/65">
                  Hourly support also available
                </span>
              </div>
            </div>

            {/* Engagement details */}
            <div className="border-t border-white/10 bg-white/[0.035] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12 xl:p-14">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F4BE28]">
                The working arrangement
              </p>

              <h4 className="mt-4 max-w-md font-brand-display text-2xl font-semibold leading-tight tracking-[-0.04em] sm:text-3xl">
                Clear expectations.
                <br />
                Dependable support.
              </h4>

              <p className="mt-4 max-w-md text-sm leading-7 text-white/50">
                Before we begin, we'll agree on the tasks, expected hours,
                priorities and working arrangements. Everyone knows what
                to expect from day one.
              </p>

              <div className="mt-8 space-y-4">
                {packageBenefits.map((benefit, index) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#F4BE28] text-[#090A0C]">
                      <Check size={12} strokeWidth={2.7} />
                    </span>

                    <p className="text-sm leading-6 text-white/75">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">
                    Payment is upfront.
                  </p>
                  <p className="mt-1 max-w-xs text-[11px] leading-5 text-white/40">
                    Agreed hours and responsibilities are established
                    before support begins.
                  </p>
                </div>

                <Link
                  href="/contact?service=virtual-assistance"
                  className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-[#F4BE28] px-5 py-3 text-xs font-bold text-[#090A0C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                  Discuss your support needs
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
