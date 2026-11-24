
"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Compass,
  LoaderCircle,
  MessageSquareText,
  MoveRight,
  UsersRound,
} from "lucide-react";

const services = [
  "Digital Creation",
  "Digital Execution",
  "Managed Virtual Assistance",
  "Multiple services",
  "I'm not sure yet",
];

const budgets = [
  "Not sure yet",
  "Under £500",
  "£500 – £1,000",
  "£1,000 – £2,500",
  "£2,500 – £5,000",
  "£5,000 – £10,000",
  "Above £10,000",
];

const timelines = [
  "As soon as possible",
  "Within 2–4 weeks",
  "Within 1–3 months",
  "3+ months",
  "Flexible / just exploring",
];

const creationServices = [
  "Graphic design & branding",
  "Web design & development",
  "Video editing",
  "Content creation & writing",
  "Sourcing service providers",
  "Something else",
];

const executionGoals = [
  "Increase brand awareness",
  "Generate leads",
  "Increase sales",
  "Improve online presence",
  "Build a marketing strategy",
  "Automate business processes",
  "Other",
];

const marketingChannels = [
  "Instagram",
  "Facebook",
  "Google",
  "YouTube",
  "TikTok",
  "LinkedIn",
  "Website / SEO",
  "Not currently using any",
];

const businessStages = [
  "Idea / pre-launch",
  "New business",
  "Established business",
  "Growing / scaling",
  "Rebranding / repositioning",
];

const supportTasks = [
  "Administrative support & data entry",
  "Email management",
  "Calendar & appointment management",
  "Social media scheduling",
  "Customer service",
  "Event coordination",
  "Research",
  "Reports & documentation",
  "Other",
];

const supportTypes = ["Hourly", "Package", "Not sure"];

const supportHours = [
  "Up to 10 hours",
  "10 hours",
  "20 hours",
  "30 hours",
  "More than 30 hours",
  "Flexible / unsure",
];

const steps = [
  {
    number: "01",
    title: "We start by listening.",
    description:
      "Tell us what you're working on, what you need, and what you'd like to achieve.",
    icon: MessageSquareText,
  },
  {
    number: "02",
    title: "We explore the possibilities.",
    description:
      "We'll consider your needs, the right expertise, and how we might work together.",
    icon: Compass,
  },
  {
    number: "03",
    title: "We agree on the next step.",
    description:
      "If there's a good fit, we'll discuss the scope, expectations, and way forward.",
    icon: UsersRound,
  },
];

const inputClass =
  "w-full min-h-[54px] rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/55 hover:border-foreground/25 focus:border-brand-electric focus:ring-4 focus:ring-brand-electric/10";

const labelClass =
  "mb-2.5 block text-[13px] font-semibold text-foreground";

const revealEase = [0.22, 1, 0.36, 1] as const;

type EnquiryForm = {
  fullname: string;
  email: string;
  phone: string;
  business: string;
  service: string;
  budget: string;
  timeline: string;
  businessStage: string;
  supportType: string;
  hours: string;
  message: string;
};

const initialForm: EnquiryForm = {
  fullname: "",
  email: "",
  phone: "",
  business: "",
  service: "",
  budget: "",
  timeline: "",
  businessStage: "",
  supportType: "",
  hours: "",
  message: "",
};

export const BecomeAClient = () => {
  const reducedMotion = useReducedMotion();

  const [form, setForm] = useState<EnquiryForm>(initialForm);

  const [selectedCreationServices, setSelectedCreationServices] = useState<
    string[]
  >([]);

  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedSupportTasks, setSelectedSupportTasks] = useState<string[]>(
    [],
  );

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (field: keyof EnquiryForm, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const toggleSelection = (
    value: string,
    current: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter(
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  // "Not currently using any" must be exclusive.
  const toggleChannel = (channel: string) => {
    setSelectedChannels((current) => {
      if (channel === "Not currently using any") {
        return current.includes(channel) ? [] : [channel];
      }

      const withoutNone = current.filter(
        (item) => item !== "Not currently using any",
      );

      return withoutNone.includes(channel)
        ? withoutNone.filter((item) => item !== channel)
        : [...withoutNone, channel];
    });
  };

  const resetForm = () => {
    setForm(initialForm);
    setSelectedCreationServices([]);
    setSelectedGoals([]);
    setSelectedChannels([]);
    setSelectedSupportTasks([]);
    setErrorMessage("");
  };

  const validateServiceDetails = () => {
    switch (form.service) {
      case "Digital Creation":
        if (!selectedCreationServices.length) {
          return "Please select at least one Digital Creation service.";
        }
        break;

      case "Digital Execution":
        if (!selectedGoals.length) {
          return "Please select at least one business goal.";
        }

        if (!selectedChannels.length) {
          return "Please select at least one marketing channel.";
        }

        if (!form.businessStage) {
          return "Please select your business stage.";
        }
        break;

      case "Managed Virtual Assistance":
        if (!selectedSupportTasks.length) {
          return "Please select at least one area where you need support.";
        }

        if (!form.supportType) {
          return "Please select your preferred support arrangement.";
        }
        break;
    }

    return "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateServiceDetails();

    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const payload = {
      fullname: form.fullname,
      email: form.email,
      phone: form.phone,
      company: form.business || undefined,

      service: "General Enquiry",
      serviceInterest: form.service,

      subject: `New client enquiry — ${form.service}`,
      message: form.message,

      budget: form.budget || undefined,
      timeline: form.timeline || undefined,

      // Digital Creation
      ...(form.service === "Digital Creation" && {
        creationServices: selectedCreationServices,
      }),

      // Digital Execution
      ...(form.service === "Digital Execution" && {
        goals: selectedGoals,
        channels: selectedChannels,
        businessStage: form.businessStage,
      }),

      // Managed Virtual Assistance
      ...(form.service === "Managed Virtual Assistance" && {
        supportTasks: selectedSupportTasks,
        supportType: form.supportType,
        hours: form.hours || undefined,
      }),
    };

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Unable to submit your enquiry.",
        );
      }

      resetForm();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  const reveal = {
    initial: reducedMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: {
      duration: 0.65,
      ease: revealEase,
    },
  };

  return (
    <main className="relative isolate overflow-hidden bg-background">
      <section
        id="enquiry-form"
        className="relative scroll-mt-10 py-20 sm:py-24 lg:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-48 top-20 h-[35rem] w-[35rem] rounded-full bg-brand-electric/[0.045] blur-[120px]"
        />

        <div className="brand-container relative">
          <motion.div {...reveal} className="mb-12 max-w-2xl lg:mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-electric sm:text-xs">
              A straightforward start
            </p>

            <h2 className="mt-4 font-brand-display text-3xl font-semibold leading-tight tracking-[-0.045em] text-foreground sm:text-4xl lg:text-5xl">
              A little context.
              <br />
              <span className="text-muted-foreground">
                A clearer way forward.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              Share a few details about your project. You don't need to
              have every answer yet — we'll use your enquiry as the
              starting point for a conversation.
            </p>
          </motion.div>

          <div className="grid items-stretch gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10 xl:gap-14">
            {/* LEFT: PROCESS PANEL */}
            <motion.aside
              {...reveal}
              className="flex min-w-0 lg:h-full"
            >
              <div className="relative flex w-full flex-col overflow-hidden rounded-[1.75rem] bg-[#F0EFF8] p-6 text-obsidian-900 dark:bg-[#191923] dark:text-white sm:p-8 lg:p-9">
                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-electric/10 blur-[70px]" />
                <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-brand-gold/10 blur-[75px]" />

                <div className="relative flex flex-1 flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian-900/50 dark:text-white/45">
                      What happens next
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-brand-electric dark:bg-white/10">
                      <MoveRight className="h-4 w-4" />
                    </span>
                  </div>

                  <h3 className="mt-7 max-w-sm font-brand-display text-2xl font-semibold leading-tight tracking-[-0.04em] sm:text-3xl">
                    Good partnerships begin with understanding.
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-7 text-obsidian-900/60 dark:text-white/55">
                    We take time to understand what matters to you before
                    deciding what comes next.
                  </p>

                  <div className="mt-9 flex-1 space-y-0">
                    {steps.map((step, index) => {
                      const Icon = step.icon;

                      return (
                        <div
                          key={step.number}
                          className="relative flex gap-4 pb-9 last:pb-0"
                        >
                          {index !== steps.length - 1 && (
                            <span className="absolute bottom-0 left-[18px] top-10 w-px bg-obsidian-900/15 dark:bg-white/15" />
                          )}

                          <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-obsidian-900/10 bg-white text-brand-electric dark:border-white/10 dark:bg-white/10">
                            <Icon className="h-4 w-4" />
                          </span>

                          <div className="min-w-0 pt-0.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-[10px] text-obsidian-900/40 dark:text-white/35">
                                {step.number}
                              </span>
                              <h4 className="text-sm font-semibold">
                                {step.title}
                              </h4>
                            </div>

                            <p className="mt-2 text-xs leading-6 text-obsidian-900/55 dark:text-white/50">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 border-t border-obsidian-900/10 pt-6 dark:border-white/10">
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <Check className="h-4 w-4 text-brand-electric dark:text-brand-gold" />
                      <span>Clarity before commitment.</span>
                    </div>
                    <p className="mt-2 pl-6 text-xs leading-6 text-obsidian-900/50 dark:text-white/45">
                      No unnecessary complications. Just a thoughtful
                      conversation about what comes next.
                    </p>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* RIGHT: FORM PANEL */}
            <motion.div
              {...reveal}
              transition={
                reducedMotion
                  ? undefined
                  : {
                      duration: 0.65,
                      delay: 0.1,
                      ease: revealEase,
                    }
              }
              className="flex min-w-0 lg:h-full"
            >
              <div className="flex w-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-premium-sm sm:rounded-[2rem]">
                {status === "success" ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="flex min-h-[600px] flex-1 flex-col items-center justify-center px-6 py-16 text-center sm:px-12"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 scale-150 rounded-full bg-brand-electric/10 blur-2xl" />
                      <span className="relative flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-brand-electric/10 text-brand-electric">
                        <CheckCircle2 className="h-9 w-9" />
                      </span>
                    </div>

                    <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-electric">
                      Successfully submitted
                    </p>

                    <h3 className="mt-4 max-w-md font-brand-display text-3xl font-semibold tracking-[-0.045em] text-foreground sm:text-4xl">
                      That's a great place to start.
                    </h3>

                    <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
                      Thank you for considering Go Far Agency. We've
                      received your enquiry and will be in touch to
                      discuss what comes next.
                    </p>

                    <div className="mt-9 flex items-center gap-3 rounded-full border border-border bg-background px-5 py-3 text-xs font-medium text-muted-foreground">
                      <Check className="h-4 w-4 text-brand-electric" />
                      Your enquiry has been sent
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setStatus("idle");
                        setErrorMessage("");
                      }}
                      className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-brand-electric transition hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-4"
                    >
                      Submit another enquiry
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    {/* FORM HEADING */}
                    <div className="border-b border-border px-6 py-7 sm:px-9 sm:py-9">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-electric">
                            Your project starts here
                          </p>
                          <h3 className="mt-3 font-brand-display text-2xl font-semibold tracking-[-0.04em] text-foreground sm:text-3xl">
                            Tell us a little more.
                          </h3>
                        </div>

                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-electric/10 text-brand-electric">
                          <MessageSquareText className="h-5 w-5" />
                        </span>
                      </div>

                      <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
                        The more we understand about what you're looking
                        for, the better we can make the next conversation.
                      </p>

                      <p className="mt-5 text-xs text-muted-foreground">
                        Fields marked with{" "}
                        <span className="font-semibold text-brand-electric">
                          *
                        </span>{" "}
                        are required.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-1 flex-col space-y-9 px-6 py-8 sm:px-9 sm:py-10"
                    >
                      {/* 01 — PERSONAL DETAILS */}
                      <section>
                        <div className="mb-6 flex items-center gap-3">
                          <span className="font-mono text-[10px] font-semibold text-brand-electric">
                            01
                          </span>
                          <h4 className="text-sm font-semibold text-foreground">
                            A little about you
                          </h4>
                          <span className="h-px flex-1 bg-border" />
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label htmlFor="fullname" className={labelClass}>
                              Your name
                              <span className="ml-1 text-brand-electric">*</span>
                            </label>
                            <input
                              id="fullname"
                              name="fullname"
                              type="text"
                              autoComplete="name"
                              required
                              value={form.fullname}
                              onChange={(e) =>
                                updateField("fullname", e.target.value)
                              }
                              placeholder="Full name"
                              className={inputClass}
                            />
                          </div>

                          <div>
                            <label htmlFor="email" className={labelClass}>
                              Email address
                              <span className="ml-1 text-brand-electric">*</span>
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              value={form.email}
                              onChange={(e) =>
                                updateField("email", e.target.value)
                              }
                              placeholder="you@example.com"
                              className={inputClass}
                            />
                          </div>
                        </div>

                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                          <div>
                            <label htmlFor="phone" className={labelClass}>
                              Phone number
                              <span className="ml-1 text-brand-electric">*</span>
                            </label>
                            <input
                              id="phone"
                              name="phone"
                              type="tel"
                              autoComplete="tel"
                              required
                              value={form.phone}
                              onChange={(e) =>
                                updateField("phone", e.target.value)
                              }
                              placeholder="+44 7700 900000"
                              className={inputClass}
                            />
                          </div>

                          <div>
                            <label htmlFor="business" className={labelClass}>
                              Business or brand
                              <span className="ml-1 font-normal text-muted-foreground">
                                (optional)
                              </span>
                            </label>
                            <input
                              id="business"
                              name="business"
                              type="text"
                              autoComplete="organization"
                              value={form.business}
                              onChange={(e) =>
                                updateField("business", e.target.value)
                              }
                              placeholder="Your business or brand name"
                              className={inputClass}
                            />
                          </div>
                        </div>
                      </section>

                      {/* 02 — PROJECT REQUIREMENTS */}
                      <section>
                        <div className="mb-6 flex items-center gap-3">
                          <span className="font-mono text-[10px] font-semibold text-brand-electric">
                            02
                          </span>
                          <h4 className="text-sm font-semibold text-foreground">
                            What you're looking for
                          </h4>
                          <span className="h-px flex-1 bg-border" />
                        </div>

                        <div>
                          <label htmlFor="service" className={labelClass}>
                            What do you need help with?
                            <span className="ml-1 text-brand-electric">*</span>
                          </label>

                          <div className="relative">
                            <select
                              id="service"
                              name="serviceInterest"
                              required
                              value={form.service}
                              onChange={(e) => {
                                updateField("service", e.target.value);
                                setErrorMessage("");
                                setStatus("idle");
                              }}
                              className={`${inputClass} appearance-none pr-12`}
                            >
                              <option value="" disabled>
                                Select the support you're interested in
                              </option>
                              {services.map((service) => (
                                <option key={service} value={service}>
                                  {service}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>

                        {/* DIGITAL CREATION FIELDS */}
                        {form.service === "Digital Creation" && (
                          <div className="mt-7 space-y-4">
                            <ConditionalHeading
                              title="What would you like us to create?"
                              description="Select the creative services relevant to your project."
                            />

                            <ChoiceGrid
                              options={creationServices}
                              selected={selectedCreationServices}
                              onToggle={(value) =>
                                toggleSelection(
                                  value,
                                  selectedCreationServices,
                                  setSelectedCreationServices,
                                )
                              }
                            />
                          </div>
                        )}

                        {/* DIGITAL EXECUTION FIELDS */}
                        {form.service === "Digital Execution" && (
                          <div className="mt-7 space-y-7">
                            <div className="space-y-4">
                              <ConditionalHeading
                                title="What would you like to achieve?"
                                description="Choose the goals you'd like your digital activity to support."
                              />

                              <ChoiceGrid
                                options={executionGoals}
                                selected={selectedGoals}
                                onToggle={(value) =>
                                  toggleSelection(
                                    value,
                                    selectedGoals,
                                    setSelectedGoals,
                                  )
                                }
                              />
                            </div>

                            <div className="space-y-4">
                              <ConditionalHeading
                                title="Which marketing channels do you currently use?"
                                description="Select all that apply. Choose the final option if you aren't currently using any."
                              />

                              <ChoiceGrid
                                options={marketingChannels}
                                selected={selectedChannels}
                                onToggle={toggleChannel}
                              />
                            </div>

                            <div>
                              <label
                                htmlFor="businessStage"
                                className={labelClass}
                              >
                                Where is your business currently?
                                <span className="ml-1 text-brand-electric">
                                  *
                                </span>
                              </label>

                              <div className="relative">
                                <select
                                  id="businessStage"
                                  name="businessStage"
                                  required
                                  value={form.businessStage}
                                  onChange={(e) =>
                                    updateField(
                                      "businessStage",
                                      e.target.value,
                                    )
                                  }
                                  className={`${inputClass} appearance-none pr-12`}
                                >
                                  <option value="" disabled>
                                    Select your business stage
                                  </option>
                                  {businessStages.map((stage) => (
                                    <option key={stage} value={stage}>
                                      {stage}
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* VIRTUAL ASSISTANCE FIELDS */}
                        {form.service === "Managed Virtual Assistance" && (
                          <div className="mt-7 space-y-6">
                            <div className="space-y-4">
                              <ConditionalHeading
                                title="Where could you use an extra pair of hands?"
                                description="Select the areas where you'd like support."
                              />

                              <ChoiceGrid
                                options={supportTasks}
                                selected={selectedSupportTasks}
                                onToggle={(value) =>
                                  toggleSelection(
                                    value,
                                    selectedSupportTasks,
                                    setSelectedSupportTasks,
                                  )
                                }
                              />
                            </div>

                            <div>
                              <label
                                className={labelClass}
                                htmlFor="supportType"
                              >
                                Preferred support arrangement
                                <span className="ml-1 text-brand-electric">
                                  *
                                </span>
                              </label>

                              <div className="grid gap-3 sm:grid-cols-3">
                                {supportTypes.map((type) => (
                                  <label
                                    key={type}
                                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-background p-4 transition hover:border-brand-electric/50 has-[:checked]:border-brand-electric has-[:checked]:bg-brand-electric/[0.05]"
                                  >
                                    <input
                                      type="radio"
                                      name="supportType"
                                      value={type}
                                      required
                                      checked={form.supportType === type}
                                      onChange={(e) =>
                                        updateField(
                                          "supportType",
                                          e.target.value,
                                        )
                                      }
                                      className="h-4 w-4 accent-[var(--color-brand-electric)]"
                                    />
                                    <span className="text-sm font-medium text-foreground">
                                      {type}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label
                                htmlFor="hours"
                                className={labelClass}
                              >
                                Hours you're considering
                                <span className="ml-1 font-normal text-muted-foreground">
                                  (optional)
                                </span>
                              </label>

                              <div className="relative">
                                <select
                                  id="hours"
                                  name="hours"
                                  value={form.hours}
                                  onChange={(e) =>
                                    updateField("hours", e.target.value)
                                  }
                                  className={`${inputClass} appearance-none pr-12`}
                                >
                                  <option value="">
                                    Select an option
                                  </option>
                                  {supportHours.map((hours) => (
                                    <option key={hours} value={hours}>
                                      {hours}
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="mt-5 grid gap-5 sm:grid-cols-2">
                          <div>
                            <label htmlFor="budget" className={labelClass}>
                              Estimated budget
                            </label>
                            <div className="relative">
                              <select
                                id="budget"
                                name="budget"
                                value={form.budget}
                                onChange={(e) =>
                                  updateField("budget", e.target.value)
                                }
                                className={`${inputClass} appearance-none pr-12`}
                              >
                                <option value="">Select a range</option>
                                {budgets.map((budget) => (
                                  <option key={budget} value={budget}>
                                    {budget}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="timeline" className={labelClass}>
                              When would you like to start?
                            </label>
                            <div className="relative">
                              <select
                                id="timeline"
                                name="timeline"
                                value={form.timeline}
                                onChange={(e) =>
                                  updateField("timeline", e.target.value)
                                }
                                className={`${inputClass} appearance-none pr-12`}
                              >
                                <option value="">Select a timeline</option>
                                {timelines.map((timeline) => (
                                  <option key={timeline} value={timeline}>
                                    {timeline}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </div>
                        </div>

                        <p className="mt-3 text-xs leading-5 text-muted-foreground">
                          Still working things out? You can select
                          &ldquo;I'm not sure yet&rdquo; or leave the
                          optional details blank.
                        </p>
                      </section>

                      {/* 03 — PROJECT MESSAGE */}
                      <section>
                        <div className="mb-6 flex items-center gap-3">
                          <span className="font-mono text-[10px] font-semibold text-brand-electric">
                            03
                          </span>
                          <h4 className="text-sm font-semibold text-foreground">
                            Tell us about the project
                          </h4>
                          <span className="h-px flex-1 bg-border" />
                        </div>

                        <div>
                          <label htmlFor="message" className={labelClass}>
                            What would you like us to know?
                            <span className="ml-1 text-brand-electric">*</span>
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            required
                            rows={6}
                            minLength={10}
                            value={form.message}
                            onChange={(e) =>
                              updateField("message", e.target.value)
                            }
                            placeholder="What are you working on? What would you like help with? What would a successful outcome look like?"
                            className={`${inputClass} min-h-[160px] resize-y py-4 leading-7`}
                          />
                          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                            <p className="text-xs text-muted-foreground">
                              A few sentences are enough to get started.
                            </p>
                            <p className="text-[10px] text-muted-foreground/70">
                              Minimum 10 characters
                            </p>
                          </div>
                        </div>
                      </section>

                      {/* ERROR */}
                      {status === "error" && (
                        <div
                          role="alert"
                          className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm leading-6 text-red-600 dark:text-red-400"
                        >
                          {errorMessage}
                        </div>
                      )}

                      {/* SUBMIT */}
                      <div className="mt-auto border-t border-border pt-7">
                        <button
                          type="submit"
                          disabled={status === "loading"}
                          className="group inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-full bg-brand-electric px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-electric/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-electric-700 hover:shadow-xl hover:shadow-brand-electric/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-4 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto sm:min-w-[230px]"
                        >
                          {status === "loading" ? (
                            <>
                              <LoaderCircle
                                size={17}
                                className="animate-spin"
                              />
                              Sending your enquiry...
                            </>
                          ) : (
                            <>
                              Send your enquiry
                              <ArrowRight
                                size={17}
                                className="transition-transform group-hover:translate-x-1"
                              />
                            </>
                          )}
                        </button>

                        <p className="mt-5 max-w-lg text-xs leading-6 text-muted-foreground">
                          By submitting this form, you agree to be contacted
                          by Go Far Agency regarding your enquiry.
                        </p>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

/* Reusable conditional field helpers */

function ConditionalHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h5 className="text-sm font-semibold text-foreground">{title}</h5>
      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function ChoiceGrid({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {options.map((option) => {
        const checked = selected.includes(option);

        return (
          <label
            key={option}
            className="group flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-3.5 transition-all hover:border-brand-electric/40 has-[:checked]:border-brand-electric has-[:checked]:bg-brand-electric/[0.045]"
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onToggle(option)}
              className="peer sr-only"
            />

            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-border bg-card text-transparent transition peer-checked:border-brand-electric peer-checked:bg-brand-electric peer-checked:text-white">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>

            <span className="text-sm leading-5 text-foreground transition-colors group-hover:text-brand-electric">
              {option}
            </span>
          </label>
        );
      })}
    </div>
  );
}
