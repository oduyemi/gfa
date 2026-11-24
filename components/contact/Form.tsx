"use client";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {ArrowRight, ArrowUpRight, Check, CheckCircle2, LoaderCircle, Send} from "lucide-react";


const serviceInterests = [
  "Digital Creation",
  "Digital Execution",
  "Managed Virtual Assistance",
  "Multiple services",
  "I'm not sure yet",
] as const;



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

const budgets = [
  "Not decided yet",
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
  "Flexible",
  "Just exploring",
];

const steps = [
  {
    number: "01",
    title: "Tell us what you have in mind",
    description: "Share your idea, goals or current challenge.",
  },
  {
    number: "02",
    title: "We'll review your enquiry",
    description: "We'll consider what you need and how we can help.",
  },
  {
    number: "03",
    title: "Let's work out the next step",
    description: "We'll get in touch to discuss a way forward.",
  },
];

type FormState = "idle" | "loading" | "success" | "error";
type ServiceInterest = (typeof serviceInterests)[number];

const fieldClass =
  "w-full min-w-0 rounded-xl border border-border bg-background px-4 py-3.5 text-[13px] text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/50 hover:border-foreground/25 focus:border-brand-electric focus:ring-[3px] focus:ring-brand-electric/10 disabled:cursor-not-allowed disabled:opacity-60";

const labelClass =
  "mb-2.5 block text-[11px] font-bold tracking-[0.01em] text-foreground";

const RequiredMark = () => (
  <span className="ml-1 text-brand-electric">*</span>
);

const OptionalLabel = () => (
  <span className="ml-1.5 text-[10px] font-normal text-muted-foreground">
    Optional
  </span>
);

function SectionHeading({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="font-mono text-[10px] font-bold text-brand-electric">
        {number}
      </span>
      <h4 className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-foreground">
        {children}
      </h4>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function FieldGroup({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <fieldset>
      <legend className={labelClass}>
        {label}
        {required ? <RequiredMark /> : <OptionalLabel />}
      </legend>
      {children}
    </fieldset>
  );
}

function CheckboxGrid({
  name,
  options,
  selected,
  onChange,
  columns = 2,
  exclusiveOption,
}: {
  name: string;
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
  columns?: 1 | 2;
  exclusiveOption?: string;
}) {
  function toggle(option: string) {
    if (option === exclusiveOption) {
      onChange(selected.includes(option) ? [] : [option]);
      return;
    }

    const withoutExclusive = exclusiveOption
      ? selected.filter((item) => item !== exclusiveOption)
      : selected;

    onChange(
      withoutExclusive.includes(option)
        ? withoutExclusive.filter((item) => item !== option)
        : [...withoutExclusive, option],
    );
  }

  return (
    <div className={`grid gap-2 ${columns === 1 ? "grid-cols-1" : "sm:grid-cols-2"}`}>
      {options.map((option) => {
        const checked = selected.includes(option);

        return (
          <label
            key={option}
            className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 text-xs transition-colors ${
              checked
                ? "border-brand-electric/50 bg-brand-electric/[0.06] text-foreground"
                : "border-border bg-background text-muted-foreground hover:border-foreground/20"
            }`}
          >
            <input
              type="checkbox"
              name={name}
              value={option}
              checked={checked}
              onChange={() => toggle(option)}
              className="size-4 shrink-0 accent-brand-electric"
            />
            <span className="leading-5">{option}</span>
          </label>
        );
      })}
    </div>
  );
}

export const ContactForm = () => {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [serviceInterest, setServiceInterest] = useState<ServiceInterest | "">("");
  const [selectedCreationServices, setSelectedCreationServices] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedSupportTasks, setSelectedSupportTasks] = useState<string[]>([]);
  
  const formRef = useRef<HTMLFormElement>(null);
  
  function resetServiceFields() {
    setSelectedCreationServices([]);
    setSelectedGoals([]);
    setSelectedChannels([]);
    setSelectedSupportTasks([]);
  }
  
  function handleServiceChange(value: string) {
    setServiceInterest(value as ServiceInterest | "");
    resetServiceFields();
    setErrorMessage("");
    setStatus("idle");
  }
  
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    if (status === "loading") return;
  
    const form = event.currentTarget;
  
    if (!serviceInterest) {
      setStatus("error");
      setErrorMessage("Please select the service you're interested in.");
      return;
    }
  
    // Validate Digital Creation
    if (isCreation && selectedCreationServices.length === 0) {
      setStatus("error");
      setErrorMessage("Please select at least one creation service.");
      return;
    }
  
    // Validate Digital Execution
    if (isExecution) {
      if (selectedGoals.length === 0) {
        setStatus("error");
        setErrorMessage("Please select at least one business goal.");
        return;
      }
  
      if (selectedChannels.length === 0) {
        setStatus("error");
        setErrorMessage("Please select at least one marketing channel.");
        return;
      }
  
      const businessStage = form.elements.namedItem(
        "businessStage",
      ) as HTMLSelectElement | null;
  
      if (!businessStage?.value) {
        setStatus("error");
        setErrorMessage("Please select your current business stage.");
        return;
      }
    }
  
    // Validate Managed Virtual Assistance
    if (isAssistance) {
      if (selectedSupportTasks.length === 0) {
        setStatus("error");
        setErrorMessage("Please select at least one support task.");
        return;
      }
  
      const supportType = form.elements.namedItem(
        "supportType",
      ) as HTMLSelectElement | null;
  
      if (!supportType?.value) {
        setStatus("error");
        setErrorMessage("Please select your preferred support arrangement.");
        return;
      }
    }
  
    const formData = new FormData(form);
  
    const payload: Record<string, unknown> = {
      ...Object.fromEntries(formData.entries()),
      service: "General Enquiry",
      serviceInterest,
    };
  
    // FormData does not reliably capture repeated checkbox values as arrays.
    delete payload.creationServices;
    delete payload.goals;
    delete payload.channels;
    delete payload.supportTasks;
  
    // Include every applicable section.
    if (isCreation) {
      payload.creationServices = selectedCreationServices;
    }
  
    if (isExecution) {
      payload.goals = selectedGoals;
      payload.channels = selectedChannels;
    }
  
    if (isAssistance) {
      payload.supportTasks = selectedSupportTasks;
    }
  
    setStatus("loading");
    setErrorMessage("");
  
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json().catch(() => null);
  
      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message || "Something went wrong. Please try again.",
        );
      }
  
      setStatus("success");
      setServiceInterest("");
      resetServiceFields();
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your enquiry. Please try again.",
      );
    }
  }

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reduceMotion ? 0 : 0.65 },
  };

  const isMultiple = serviceInterest === "Multiple services";
  const isCreation = serviceInterest === "Digital Creation" || isMultiple;
  const isExecution = serviceInterest === "Digital Execution" || isMultiple;
  const isAssistance = serviceInterest === "Managed Virtual Assistance" || isMultiple;
  const isGeneral = serviceInterest === "I'm not sure yet";

  return (
    <section
      id="contact-form"
      className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32"
    >
      <div className="brand-container">
        <motion.div {...reveal} className="mb-12 max-w-3xl lg:mb-16">
          <div className="mb-5 flex items-center gap-3">
            <span className="size-2 rounded-full bg-brand-electric" />
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              The first step
            </span>
          </div>

          <h2 className="font-brand-display text-[clamp(2.8rem,6vw,5.25rem)] font-semibold leading-[0.96] tracking-[-0.075em] text-foreground">
            Every good project
            <span className="block brand-gradient-text">starts somewhere.</span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
            Tell us what you're thinking, what you're working towards or where
            you need a little support. We'll take it from there.
          </p>
        </motion.div>

        <div className="grid items-stretch gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8 xl:gap-10">
          <motion.aside {...reveal} className="flex min-w-0">
            <div className="relative flex w-full flex-col overflow-hidden bg-obsidian-900 p-7 text-white sm:p-9 lg:p-10 xl:p-11">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full border border-white/[0.07]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full border border-white/[0.06]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-20 size-64 rounded-full bg-brand-electric/15 blur-[80px]"
              />

              <div className="relative">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50">
                  A conversation, not a commitment
                </span>

                <h3 className="mt-8 max-w-sm font-brand-display text-3xl font-semibold leading-[1.05] tracking-[-0.055em] sm:text-4xl xl:text-[2.8rem]">
                  Let's get to know what you're building.
                </h3>

                <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
                  You don't need to have everything figured out. A little
                  context is enough to get the conversation started.
                </p>
              </div>

              <div className="relative my-9 flex-1 border-y border-white/10 py-8">
                <p className="mb-8 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">
                  What happens next
                </p>

                <div className="flex h-[calc(100%-2rem)] flex-col justify-between gap-8">
                  {steps.map((step, index) => (
                    <div key={step.number} className="relative flex gap-4">
                      {index !== steps.length - 1 && (
                        <div
                          aria-hidden="true"
                          className="absolute left-[15px] top-9 h-[calc(100%+2rem)] w-px bg-white/10"
                        />
                      )}

                      <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-obsidian-900 font-mono text-[10px] font-semibold text-brand-gold">
                        {step.number}
                      </div>

                      <div className="pt-0.5">
                        <h4 className="text-sm font-semibold text-white">
                          {step.title}
                        </h4>
                        <p className="mt-1.5 max-w-xs text-xs leading-6 text-white/45">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mt-auto">
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold">
                    <Check size={12} strokeWidth={2.5} />
                  </span>

                  <div>
                    <h4 className="text-xs font-semibold text-white">
                      Not sure where to start?
                    </h4>
                    <p className="mt-2 max-w-sm text-xs leading-6 text-white/45">
                      That's perfectly fine. Tell us about the outcome you're
                      looking for, and we'll help you find the right starting
                      point.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/35">
                    GFA
                  </span>
                  <span className="flex size-9 items-center justify-center rounded-full border border-white/15 text-brand-gold">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>

          <motion.div
            {...reveal}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion ? 0 : 0.1,
            }}
            className="flex min-w-0"
          >
            <div className="w-full border border-border bg-card shadow-premium-sm">
              {status === "success" ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex min-h-[650px] flex-col items-center justify-center px-6 py-16 text-center sm:px-12"
                >
                  <div className="relative flex size-20 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                    <CheckCircle2 size={38} strokeWidth={1.5} />
                    <span className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full border-4 border-card bg-green-500 text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  </div>

                  <span className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] text-green-600">
                    Enquiry received
                  </span>

                  <h3 className="mt-4 max-w-md font-brand-display text-3xl font-semibold leading-tight tracking-[-0.055em] text-foreground sm:text-4xl">
                    Your next step starts here.
                  </h3>

                  <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
                    Thank you for reaching out to GFA. We've received your
                    enquiry and look forward to learning more about what you
                    have in mind.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setErrorMessage("");
                    }}
                    className="mt-9 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-xs font-semibold text-foreground transition-all hover:border-foreground/30 hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-4"
                  >
                    Send another enquiry
                    <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="flex h-full flex-col p-5 sm:p-8 lg:p-9 xl:p-10"
                  aria-busy={status === "loading"}
                >
                  <div className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-border pb-7">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-electric">
                        Your enquiry
                      </span>
                      <h3 className="mt-2 font-brand-display text-2xl font-semibold tracking-[-0.05em] text-foreground sm:text-3xl">
                        Tell us a little more.
                      </h3>
                      <p className="mt-2 text-xs leading-6 text-muted-foreground">
                        Fields marked with * are required.
                      </p>
                    </div>

                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-electric/10 text-brand-electric">
                      <Send size={17} />
                    </span>
                  </div>

                  <div>
                    <SectionHeading number="01">Your details</SectionHeading>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="fullname" className={labelClass}>
                          Your name <RequiredMark />
                        </label>
                        <input
                          id="fullname"
                          name="fullname"
                          type="text"
                          autoComplete="name"
                          required
                          maxLength={100}
                          placeholder="What should we call you?"
                          className={fieldClass}
                          disabled={status === "loading"}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className={labelClass}>
                          Email address <RequiredMark />
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          maxLength={254}
                          placeholder="you@example.com"
                          className={fieldClass}
                          disabled={status === "loading"}
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className={labelClass}>
                          Phone number <RequiredMark />
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          required
                          maxLength={25}
                          placeholder="+44 7700 900000"
                          className={fieldClass}
                          disabled={status === "loading"}
                        />
                        <p className="mt-2 text-[10px] leading-5 text-muted-foreground">
                          Include your country code so we can reach you.
                        </p>
                      </div>

                      <div>
                        <label htmlFor="company" className={labelClass}>
                          Business / organisation <OptionalLabel />
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          autoComplete="organization"
                          maxLength={150}
                          placeholder="Your business or organisation"
                          className={fieldClass}
                          disabled={status === "loading"}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-9">
                    <SectionHeading number="02">Your project</SectionHeading>

                    <div>
                      <label htmlFor="serviceInterest" className={labelClass}>
                        What are you interested in? <RequiredMark />
                      </label>
                      <select
                        id="serviceInterest"
                        name="serviceInterest"
                        required
                        value={serviceInterest}
                        onChange={(event) => handleServiceChange(event.target.value)}
                        className={`${fieldClass} cursor-pointer`}
                        disabled={status === "loading"}
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        {serviceInterests.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>

                    {serviceInterest && (
                      <div className="mt-6 space-y-7">
                        {isCreation && (
                          <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <FieldGroup label="What would you like us to create?" required>
                              <CheckboxGrid
                                name="creationServices"
                                options={creationServices}
                                selected={selectedCreationServices}
                                onChange={setSelectedCreationServices}
                              />
                            </FieldGroup>

                            <div className="mt-5">
                              <label htmlFor="projectName" className={labelClass}>
                                Project name <OptionalLabel />
                              </label>
                              <input
                                id="projectName"
                                name="projectName"
                                type="text"
                                maxLength={150}
                                placeholder="Give your project a name, if you have one"
                                className={fieldClass}
                                disabled={status === "loading"}
                              />
                            </div>
                          </motion.div>
                        )}

                        {isExecution && (
                          <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                          >
                            <FieldGroup label="What would you like to achieve?" required>
                              <CheckboxGrid
                                name="goals"
                                options={executionGoals}
                                selected={selectedGoals}
                                onChange={setSelectedGoals}
                              />
                            </FieldGroup>

                            <FieldGroup label="Which marketing channels are you currently using?" required>
                              <CheckboxGrid
                                name="channels"
                                options={marketingChannels}
                                selected={selectedChannels}
                                onChange={setSelectedChannels}
                                exclusiveOption="Not currently using any"
                              />
                            </FieldGroup>

                            <div>
                              <label htmlFor="businessStage" className={labelClass}>
                                Where is your business right now? <RequiredMark />
                              </label>
                              <select
                                id="businessStage"
                                name="businessStage"
                                required
                                defaultValue=""
                                className={`${fieldClass} cursor-pointer`}
                                disabled={status === "loading"}
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
                            </div>
                          </motion.div>
                        )}

                        {isAssistance && (
                          <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                          >
                            <FieldGroup label="What would you like support with?" required>
                              <CheckboxGrid
                                name="supportTasks"
                                options={supportTasks}
                                selected={selectedSupportTasks}
                                onChange={setSelectedSupportTasks}
                              />
                            </FieldGroup>

                            <div className="grid gap-5 sm:grid-cols-2">
                              <div>
                                <label htmlFor="supportType" className={labelClass}>
                                  Preferred arrangement <RequiredMark />
                                </label>
                                <select
                                  id="supportType"
                                  name="supportType"
                                  required
                                  defaultValue=""
                                  className={`${fieldClass} cursor-pointer`}
                                  disabled={status === "loading"}
                                >
                                  <option value="" disabled>
                                    Select an arrangement
                                  </option>
                                  {supportTypes.map((type) => (
                                    <option key={type} value={type}>
                                      {type}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label htmlFor="hours" className={labelClass}>
                                  Preferred hours <OptionalLabel />
                                </label>
                                <select
                                  id="hours"
                                  name="hours"
                                  defaultValue=""
                                  className={`${fieldClass} cursor-pointer`}
                                  disabled={status === "loading"}
                                >
                                  <option value="">Select hours</option>
                                  {supportHours.map((hours) => (
                                    <option key={hours} value={hours}>
                                      {hours}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {isGeneral && (
                          <div className="border-l-2 border-brand-electric/40 bg-surface-subtle px-5 py-4">
                            <p className="text-xs font-semibold text-foreground">
                              Let's start with the bigger picture.
                            </p>
                            <p className="mt-1.5 text-xs leading-6 text-muted-foreground">
                              Tell us what you're working towards and the kinds
                              of support you think you might need. We'll help
                              you work out the right combination.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-7 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="budget" className={labelClass}>
                          Estimated budget <OptionalLabel />
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          defaultValue=""
                          className={`${fieldClass} cursor-pointer`}
                          disabled={status === "loading"}
                        >
                          <option value="">Select a range</option>
                          {budgets.map((budget) => (
                            <option key={budget} value={budget}>
                              {budget}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="timeline" className={labelClass}>
                          When would you like to begin? <OptionalLabel />
                        </label>
                        <select
                          id="timeline"
                          name="timeline"
                          defaultValue=""
                          className={`${fieldClass} cursor-pointer`}
                          disabled={status === "loading"}
                        >
                          <option value="">Select a timeline</option>
                          {timelines.map((timeline) => (
                            <option key={timeline} value={timeline}>
                              {timeline}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-5">
                      <label htmlFor="subject" className={labelClass}>
                        Subject <OptionalLabel />
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        maxLength={150}
                        placeholder="A quick summary of your enquiry"
                        className={fieldClass}
                        disabled={status === "loading"}
                      />
                    </div>
                  </div>

                  <div className="mt-9">
                    <SectionHeading number="03">Your message</SectionHeading>

                    <label htmlFor="message" className={labelClass}>
                      Tell us about your project <RequiredMark />
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      minLength={10}
                      maxLength={5000}
                      placeholder="What are you working on? What would you like help with? Share as much or as little as you know right now..."
                      className={`${fieldClass} min-h-40 resize-y leading-7`}
                      disabled={status === "loading"}
                    />

                    <p className="mt-2 text-[10px] leading-5 text-muted-foreground">
                      A few details about your goals, challenges or expectations
                      will help us understand how to assist.
                    </p>
                  </div>

                  <div className="mt-auto pt-8">
                    {status === "error" && (
                      <div
                        role="alert"
                        className="mb-6 flex gap-3 border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600"
                      >
                        <span className="mt-1 size-2 shrink-0 rounded-full bg-red-500" />
                        <p>{errorMessage}</p>
                      </div>
                    )}

                    <div className="border-t border-border pt-7">
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-electric px-7 py-4 text-sm font-bold text-white shadow-premium-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-electric-700 hover:shadow-premium-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
                      >
                        {status === "loading" ? (
                          <>
                            <LoaderCircle size={16} className="animate-spin" />
                            Sending your enquiry...
                          </>
                        ) : (
                          <>
                            Send your enquiry
                            <ArrowRight
                              size={16}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </>
                        )}
                      </button>

                      <p className="mt-5 max-w-lg text-[10px] leading-5 text-muted-foreground">
                        By submitting this form, you agree that GFA may use
                        the information provided to respond to your enquiry.
                      </p>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
