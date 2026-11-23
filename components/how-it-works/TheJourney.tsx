"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ClipboardCheck,
  FileCheck2,
  MessageSquareText,
  Send,
  LayoutDashboard,
  FolderOpen,
  Activity,
  CalendarDays,
  CircleCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Make an enquiry.",
    label: "It starts with an idea",
    description:
      "Tell us what you're looking to achieve, what you need help with, your preferred timeline and your budget range. This gives us a starting point for understanding your project.",
    icon: Send,
    outcome: "You share the brief",
  },
  {
    number: "02",
    title: "Let's talk it through.",
    label: "Get on the same page",
    description:
      "Where needed, we'll arrange a short discussion with a GFA representative to clarify your requirements, explore expectations and determine the best way forward.",
    icon: MessageSquareText,
    outcome: "We align on expectations",
  },
  {
    number: "03",
    title: "Review & agree.",
    label: "Clarity before commitment",
    description:
      "We'll send you a proposal or project agreement outlining the scope, deliverables, timeline, payment information and contract. Once everything is reviewed and approved, we're ready for the next step.",
    icon: FileCheck2,
    outcome: "The project is agreed",
  },
  {
    number: "04",
    title: "Get onboarded.",
    label: "Ready for take-off",
    description:
      "We'll create your account on the GFA project portal, giving you a convenient place to check progress, access project information and stay up to date with developments throughout our work together.",
    icon: ClipboardCheck,
    outcome: "You're ready to go",
  },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, ease: "easeOut" as const },
};

export const TheJourney = () => {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion ? {} : reveal;

  return (
    <section
      id="our-process"
      className="relative overflow-hidden bg-background pb-24 sm:pb-28 lg:pb-36"
    >
      <div className="brand-container relative">
        <div className="mt-28 sm:mt-36">
          <motion.div
            {...motionProps}
            className="mb-10 flex flex-col justify-between gap-4 sm:mb-14 sm:flex-row sm:items-end"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-electric">
                The journey
              </p>
              <h3 className="mt-3 font-brand-display text-3xl font-semibold tracking-[-0.045em] text-foreground sm:text-4xl">
                Here's how it comes together.
              </h3>
            </div>

            <p className="max-w-sm text-sm leading-7 text-muted-foreground">
              Each stage has a purpose. We'll guide you through it, one step
              at a time.
            </p>
          </motion.div>

          <div className="border-y border-border">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.number}
                  initial={
                    shouldReduceMotion ? false : { opacity: 0, y: 20 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.55,
                    delay: shouldReduceMotion ? 0 : index * 0.07,
                  }}
                  className={`group grid gap-5 py-8 sm:grid-cols-[5rem_1fr_auto] sm:items-center sm:gap-7 sm:py-9 lg:grid-cols-[6.5rem_1fr_15rem] lg:gap-10 ${
                    index !== 0 ? "border-t border-border" : ""
                  }`}
                >
                  <div className="flex items-center gap-4 sm:block">
                    <span className="font-brand-display text-4xl font-semibold leading-none tracking-[-0.06em] text-brand-electric/70 transition-colors duration-300 group-hover:text-brand-electric sm:text-5xl">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground sm:hidden">
                      Step {step.number}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="mb-2 flex items-center gap-2.5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-brand-electric">
                        {step.label}
                      </span>
                    </div>

                    <h4 className="font-brand-display text-2xl font-semibold tracking-[-0.04em] text-foreground transition-colors duration-300 group-hover:text-brand-electric sm:text-3xl">
                      {step.title}
                    </h4>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 sm:justify-end">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-subtle text-brand-electric transition-colors duration-300 group-hover:bg-brand-electric group-hover:text-white">
                      <Icon size={18} strokeWidth={1.7} />
                    </span>

                    <div className="min-w-0">
                      <span className="block text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                        The outcome
                      </span>
                      <span className="mt-1 block text-xs font-semibold text-foreground">
                        {step.outcome}
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Client portal */}
        <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
        className="relative mt-28 overflow-hidden rounded-[2rem] bg-[#090A0C] text-white sm:mt-36"
        >
        <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-40 -top-40 size-[35rem] rounded-full bg-[#1265F4]/20 blur-[130px]"
        />
        <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-48 -left-32 size-[30rem] rounded-full bg-[#E7E6F7]/[0.07] blur-[120px]"
        />

        <div className="relative grid lg:grid-cols-[0.78fr_1.22fr]">
            {/* Portal introduction */}
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12 xl:p-14">
            <div className="mb-8 flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-[#1265F4] text-white shadow-lg shadow-[#1265F4]/20">
                <LayoutDashboard size={20} />
                </span>

                <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F4BE28]">
                    The GFA client portal
                </p>
                <p className="mt-1 text-xs text-white/45">
                    Your project workspace
                </p>
                </div>
            </div>

            <h3 className="max-w-lg font-brand-display text-3xl font-semibold leading-[1.08] tracking-[-0.05em] sm:text-4xl lg:text-[3.25rem]">
                A better view of
                <br />
                <span className="text-[#F4BE28]">everything in motion.</span>
            </h3>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/60">
                Your project deserves more than scattered updates and endless
                email threads. With the GFA client portal, you have a dedicated
                space to follow progress, access project files and keep up with
                what's happening.
            </p>

            <div className="mt-9 space-y-5">
                {[
                {
                    icon: Activity,
                    title: "Know where things stand",
                    description: "Follow progress and project developments.",
                },
                {
                    icon: FolderOpen,
                    title: "Find what you need",
                    description: "Keep project files and resources together.",
                },
                {
                    icon: MessageSquareText,
                    title: "Stay in the loop",
                    description: "Keep up with important project updates.",
                },
                ].map((item) => {
                const ItemIcon = item.icon;

                return (
                    <div key={item.title} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#F4BE28]">
                        <ItemIcon size={17} />
                    </span>

                    <div>
                        <p className="text-sm font-semibold text-white">
                        {item.title}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-white/45">
                        {item.description}
                        </p>
                    </div>
                    </div>
                );
                })}
            </div>

            <div className="mt-10 border-t border-white/10 pt-6">
                <div className="flex items-center gap-2 text-xs font-medium text-white/60">
                <span className="size-1.5 rounded-full bg-[#F4BE28]" />
                A more organised way to work together.
                </div>
            </div>
            </div>

            {/* Realistic dashboard preview */}
            <div className="min-w-0 p-4 sm:p-7 lg:py-10 lg:pr-10 lg:pl-4 xl:py-12 xl:pr-12">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#F8F7F2] text-[#17191F] shadow-[0_30px_100px_rgba(0,0,0,0.4)]">

                {/* Dashboard top bar */}
                <div className="flex h-14 items-center justify-between border-b border-[#E8E7E2] bg-white px-4 sm:px-5">
                <div className="flex items-center gap-2.5">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-transparent text-[10px] font-black text-white">
                    <Image
                        src="/images/logo/logo.svg"
                        alt=""
                        width={5979}
                        height={3991}
                        priority={false}
                        className="h-5 w-auto max-w-[1rem] object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    </div>

                    <span className="hidden text-[#C5C5C5] sm:inline">/</span>

                    <span className="hidden text-[10px] text-[#85858B] sm:inline">
                    Client workspace
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <span className="hidden text-[10px] text-[#85858B] sm:inline">
                    Workspace preview
                    </span>

                    <span className="flex size-7 items-center justify-center rounded-full bg-[#E7E6F7] text-[10px] font-bold text-[#34345A]">
                    C
                    </span>
                </div>
                </div>

                {/* Dashboard body */}
                <div className="grid min-h-[510px] grid-cols-[52px_1fr] sm:grid-cols-[154px_1fr]">

                {/* Sidebar */}
                <aside className="flex flex-col border-r border-[#E8E7E2] bg-white px-2 py-5 sm:px-3">
                    <p className="mb-4 hidden px-2 text-[8px] font-bold uppercase tracking-[0.16em] text-[#A2A2A8] sm:block">
                    Workspace
                    </p>

                    <div className="space-y-1">
                    {[
                        { icon: LayoutDashboard, label: "Overview", active: true },
                        { icon: Activity, label: "Progress", active: false },
                        { icon: FileCheck2, label: "Tasks", active: false },
                        { icon: FolderOpen, label: "Files", active: false },
                        { icon: MessageSquareText, label: "Updates", active: false },
                    ].map((item) => {
                        const NavIcon = item.icon;

                        return (
                        <div
                            key={item.label}
                            className={`flex items-center justify-center gap-2 rounded-lg px-2 py-2.5 sm:justify-start sm:px-3 ${
                            item.active
                                ? "bg-[#1265F4]/[0.09] text-[#1265F4]"
                                : "text-[#85858B]"
                            }`}
                        >
                            <NavIcon size={15} strokeWidth={1.8} />
                            <span className="hidden text-[10px] font-semibold sm:inline">
                            {item.label}
                            </span>
                        </div>
                        );
                    })}
                    </div>

                    <div className="mt-auto hidden border-t border-[#E8E7E2] pt-4 sm:block">
                    <p className="px-2 text-[8px] font-bold uppercase tracking-[0.15em] text-[#A2A2A8]">
                        Your agency
                    </p>
                    <div className="mt-3 flex items-center gap-2 px-2">
                        <div className="flex size-7 items-center justify-center rounded-full bg-[#090A0C] text-[9px] font-bold text-white">
                        G
                        </div>
                        <div className="min-w-0">
                        <p className="truncate text-[9px] font-bold text-[#272830]">
                            Go Far Agency
                        </p>
                        <p className="text-[8px] text-[#9999A0]">
                            Project team
                        </p>
                        </div>
                    </div>
                    </div>
                </aside>

                {/* Main dashboard */}
                <main className="min-w-0 p-3 sm:p-5 lg:p-6">
                    {/* Breadcrumb and heading */}
                    <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                        <p className="text-[8px] font-medium text-[#9999A0] sm:text-[9px]">
                        Workspace <span className="mx-1">/</span> Overview
                        </p>
                        <h4 className="mt-1.5 text-base font-bold tracking-tight text-[#17191F] sm:text-xl">
                        Project overview
                        </h4>
                    </div>

                    <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#E7E6F7] bg-[#E7E6F7]/60 px-2.5 py-1.5 text-[8px] font-semibold text-[#55527D] sm:text-[9px]">
                        <span className="size-1.5 rounded-full bg-[#1265F4]" />
                        Workspace
                    </span>
                    </div>

                    {/* Project summary */}
                    <div className="mt-5 rounded-xl border border-[#E9E8E3] bg-white p-3.5 sm:p-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                        <p className="text-[8px] font-bold uppercase tracking-[0.13em] text-[#9999A0]">
                            Current project
                        </p>
                        <p className="mt-1.5 text-sm font-bold text-[#17191F] sm:text-base">
                            Project workspace
                        </p>
                        <p className="mt-1 text-[9px] text-[#92929A]">
                            Your project information in one place
                        </p>
                        </div>

                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#1265F4]/[0.08] text-[#1265F4]">
                        <FolderOpen size={16} />
                        </span>
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#F0EFEA] pt-4 sm:grid-cols-3">
                        <div>
                        <p className="text-[8px] text-[#9999A0]">Project details</p>
                        <p className="mt-1 text-[10px] font-semibold text-[#35363D]">
                            Available
                        </p>
                        </div>
                        <div>
                        <p className="text-[8px] text-[#9999A0]">Project files</p>
                        <p className="mt-1 text-[10px] font-semibold text-[#35363D]">
                            Organised
                        </p>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                        <p className="text-[8px] text-[#9999A0]">Updates</p>
                        <p className="mt-1 text-[10px] font-semibold text-[#35363D]">
                            In your workspace
                        </p>
                        </div>
                    </div>
                    </div>

                    {/* Dashboard content grid */}
                    <div className="mt-3 grid gap-3 sm:grid-cols-[1.15fr_0.85fr]">

                    {/* Progress and milestones */}
                    <div className="rounded-xl border border-[#E9E8E3] bg-white p-3.5 sm:p-4">
                        <div className="flex items-center justify-between gap-2">
                        <p className="text-[10px] font-bold text-[#292A31]">
                            Project progress
                        </p>
                        <Activity size={14} className="text-[#1265F4]" />
                        </div>

                        <p className="mt-1.5 text-[9px] leading-5 text-[#9999A0]">
                        Follow the stages of your project.
                        </p>

                        <div className="mt-5 space-y-3.5">
                        {[
                            {
                            label: "Project brief",
                            status: "Completed",
                            width: "100%",
                            color: "bg-[#1265F4]",
                            statusColor: "text-[#1265F4]",
                            },
                            {
                            label: "Planning & preparation",
                            status: "In progress",
                            width: "65%",
                            color: "bg-[#F4BE28]",
                            statusColor: "text-[#9A7511]",
                            },
                            {
                            label: "Implementation",
                            status: "Upcoming",
                            width: "0%",
                            color: "bg-[#E7E6F7]",
                            statusColor: "text-[#9999A0]",
                            },
                        ].map((item) => (
                            <div key={item.label}>
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-[9px] font-semibold text-[#494A51]">
                                {item.label}
                                </span>
                                <span className={`text-[8px] font-semibold ${item.statusColor}`}>
                                {item.status}
                                </span>
                            </div>

                            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#F0EFEA]">
                                <div
                                className={`h-full rounded-full ${item.color}`}
                                style={{ width: item.width }}
                                />
                            </div>
                            </div>
                        ))}
                        </div>

                        <div className="mt-5 flex items-center gap-2 border-t border-[#F0EFEA] pt-3">
                        <CalendarDays size={13} className="text-[#9999A0]" />
                        <span className="text-[8px] text-[#9999A0]">
                            Milestones and updates in one view
                        </span>
                        </div>
                    </div>

                    {/* Project activity */}
                    <div className="rounded-xl border border-[#E9E8E3] bg-white p-3.5 sm:p-4">
                        <div className="flex items-center justify-between gap-2">
                        <p className="text-[10px] font-bold text-[#292A31]">
                            Recent activity
                        </p>
                        <MessageSquareText size={14} className="text-[#1265F4]" />
                        </div>

                        <div className="mt-5 space-y-4">
                        {[
                            {
                            icon: Check,
                            title: "Brief received",
                            detail: "Project information",
                            color: "bg-[#1265F4]/10 text-[#1265F4]",
                            },
                            {
                            icon: FileCheck2,
                            title: "Document shared",
                            detail: "Project resources",
                            color: "bg-[#F4BE28]/15 text-[#A17A10]",
                            },
                            {
                            icon: MessageSquareText,
                            title: "Project update",
                            detail: "Team communication",
                            color: "bg-[#E7E6F7] text-[#625F92]",
                            },
                        ].map((item, index) => {
                            const ActivityIcon = item.icon;

                            return (
                            <div key={item.title} className="flex items-start gap-2.5">
                                <span className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${item.color}`}>
                                <ActivityIcon size={13} />
                                </span>

                                <div className="min-w-0">
                                <p className="text-[9px] font-semibold text-[#3C3D44]">
                                    {item.title}
                                </p>
                                <p className="mt-1 text-[8px] leading-4 text-[#9999A0]">
                                    {item.detail}
                                </p>
                                </div>
                            </div>
                            );
                        })}
                        </div>
                    </div>
                    </div>

                    {/* Files panel */}
                    <div className="mt-3 rounded-xl border border-[#E9E8E3] bg-white p-3.5 sm:p-4">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                        <p className="text-[10px] font-bold text-[#292A31]">
                            Project resources
                        </p>
                        <p className="mt-1 text-[8px] text-[#9999A0]">
                            Important files and shared materials
                        </p>
                        </div>

                        <span className="text-[8px] font-semibold text-[#1265F4]">
                        View workspace
                        <ArrowUpRight className="ml-1 inline" size={11} />
                        </span>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="flex min-w-0 items-center gap-2 rounded-lg bg-[#F8F7F2] p-2.5">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#E7E6F7] text-[#625F92]">
                            <FileCheck2 size={13} />
                        </span>
                        <span className="truncate text-[8px] font-semibold text-[#55565D]">
                            Project documents
                        </span>
                        </div>

                        <div className="flex min-w-0 items-center gap-2 rounded-lg bg-[#F8F7F2] p-2.5">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#F4BE28]/20 text-[#98720C]">
                            <FolderOpen size={13} />
                        </span>
                        <span className="truncate text-[8px] font-semibold text-[#55565D]">
                            Shared resources
                        </span>
                        </div>
                    </div>
                    </div>
                </main>
                </div>

                {/* Dashboard footer */}
                <div className="flex items-center justify-between border-t border-[#E8E7E2] bg-white px-4 py-3 sm:px-5">
                <span className="text-[8px] text-[#9999A0]">
                    Go Far Agency / Client workspace
                </span>
                <span className="flex items-center gap-1.5 text-[8px] font-semibold text-[#1265F4]">
                    <span className="size-1.5 rounded-full bg-[#1265F4]" />
                    Illustrative preview
                </span>
                </div>
            </div>

            <p className="mt-4 text-center text-[9px] text-white/35">
                A preview of the GFA client portal experience
            </p>
            </div>
        </div>
        </motion.div>

        {/* Closing CTA */}
        <motion.div
          {...motionProps}
          className="mt-16 flex flex-col gap-6 border-b border-border pb-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <div className="flex items-center gap-2">
              <CircleCheck size={16} className="text-brand-electric" />
              <p className="text-sm font-semibold text-foreground">
                It all starts with a conversation.
              </p>
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Tell us what you're working towards. We'll help you figure out
              the next step.
            </p>
          </div>

          <Link
            href="/contact/#contact-form"
            className="group inline-flex min-h-12 w-fit shrink-0 items-center gap-3 rounded-full bg-brand-electric px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-electric-700 hover:shadow-lg"
          >
            Make an enquiry
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
