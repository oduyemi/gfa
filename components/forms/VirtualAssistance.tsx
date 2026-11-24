
"use client";

import { useState } from "react";
import { useContactSubmission } from "@/hooks/useContactSubmission";
import {
  FormField,
  inputClass,
  budgetOptions,
  timelineOptions,
} from "@/utils/contact-form";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Headset,
  LoaderCircle,
  MessageSquareText,
  Package,
  Sparkles,
  UserRound,
} from "lucide-react";

const supportTasks = [
  {
    label: "Administrative support & data entry",
    description: "Keep everyday tasks and records organised.",
  },
  {
    label: "Email management",
    description: "Manage correspondence and inboxes.",
  },
  {
    label: "Calendar & appointment management",
    description: "Coordinate schedules and appointments.",
  },
  {
    label: "Social media scheduling",
    description: "Keep your content organised and on schedule.",
  },
  {
    label: "Customer service",
    description: "Help manage customer enquiries and communication.",
  },
  {
    label: "Event coordination",
    description: "Support planning and event administration.",
  },
  {
    label: "Research",
    description: "Gather information and useful insights.",
  },
  {
    label: "Reports & documentation",
    description: "Prepare, organise and maintain documents.",
  },
  {
    label: "Other",
    description: "Something else you need a hand with.",
  },
];

const supportArrangements = [
  {
    value: "Hourly",
    label: "Hourly support",
    description: "Flexible help when you need it.",
    icon: Clock3,
  },
  {
    value: "Package",
    label: "Hours package",
    description: "A defined block of support hours.",
    icon: Package,
  },
  {
    value: "Not sure",
    label: "Not sure yet",
    description: "Let's work out what suits you.",
    icon: Sparkles,
  },
];

const hoursOptions = [
  "Up to 10 hours",
  "10 hours",
  "20 hours",
  "30 hours",
  "More than 30 hours",
  "Flexible / unsure",
];

const fieldClass = `${inputClass} rounded-xl border-border bg-background transition-all duration-200 placeholder:text-muted-foreground/60 focus:border-brand-electric focus:ring-4 focus:ring-brand-electric/10`;

const sectionHeadingClass =
  "font-brand-display text-xl font-semibold tracking-tight text-foreground";

export function VirtualAssistanceForm() {
  const { status, errorMessage, submit } = useContactSubmission();
  const [taskError, setTaskError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const selectedTasks = formData.getAll("supportTasks") as string[];

    // At least one support task is required by the Enquiry model.
    if (selectedTasks.length === 0) {
      setTaskError("Please select at least one area where you need support.");
      return;
    }

    setTaskError("");

    const payload = {
      fullname: formData.get("fullname"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company") || undefined,

      service: "Managed Virtual Assistance",

      supportTasks: selectedTasks,
      supportType: formData.get("supportType"),
      hours: formData.get("hours") || undefined,

      budget: formData.get("budget") || undefined,
      timeline: formData.get("timeline") || undefined,
      subject: formData.get("subject") || undefined,
      message: formData.get("message"),
    };

    await submit(payload);
  }

  if (status === "success") {
    return <SuccessMessage />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* 01 — Contact details */}
      <FormSection
        number="01"
        icon={UserRound}
        title="Let's get acquainted."
        description="Tell us who you are and a little about the business or team that needs support."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Your name" name="fullname">
            <input
              id="fullname"
              name="fullname"
              required
              autoComplete="name"
              placeholder="Your full name"
              className={fieldClass}
            />
          </FormField>

          <FormField label="Email address" name="email">
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className={fieldClass}
            />
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Phone number" name="phone">
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+44 7700 900000"
              className={fieldClass}
            />
          </FormField>

          <FormField
            label="Business / organisation"
            name="company"
            optional
          >
            <input
              id="company"
              name="company"
              autoComplete="organization"
              placeholder="Business name"
              className={fieldClass}
            />
          </FormField>
        </div>
      </FormSection>

      <SectionDivider />

      {/* 02 — Support requirements */}
      <FormSection
        number="02"
        icon={Headset}
        title="Where could you use an extra pair of hands?"
        description="Choose the areas where you'd like support. Select as many as you need."
      >
        <FormField label="Areas of support" name="supportTasks">
          <div
            className="grid gap-3 sm:grid-cols-2"
            aria-describedby={taskError ? "supportTasks-error" : undefined}
          >
            {supportTasks.map((task, index) => (
              <label
                key={task.label}
                className="group relative flex min-h-[88px] cursor-pointer items-start gap-3.5 rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-electric/40 hover:shadow-premium-sm has-[:checked]:border-brand-electric has-[:checked]:bg-brand-electric/[0.045] has-[:checked]:shadow-[inset_0_0_0_1px_var(--color-brand-electric)]"
              >
                <input
                  type="checkbox"
                  name="supportTasks"
                  value={task.label}
                  onChange={() => setTaskError("")}
                  className="peer sr-only"
                />

                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-border bg-background text-transparent transition peer-checked:border-brand-electric peer-checked:bg-brand-electric peer-checked:text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold leading-5 text-foreground transition-colors group-hover:text-brand-electric">
                    {task.label}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                    {task.description}
                  </span>
                </span>

                <span className="absolute right-3 top-3 text-[10px] font-semibold tabular-nums text-muted-foreground/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </label>
            ))}
          </div>

          {taskError && (
            <p
              id="supportTasks-error"
              role="alert"
              className="mt-3 text-sm font-medium text-red-600"
            >
              {taskError}
            </p>
          )}
        </FormField>
      </FormSection>

      <SectionDivider />

      {/* 03 — Engagement details */}
      <FormSection
        number="03"
        icon={Package}
        title="Let's find the right arrangement."
        description="A little more detail about the level of support you're considering."
      >
        <FormField
          label="Preferred support arrangement"
          name="supportType"
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {supportArrangements.map((item) => {
              const Icon = item.icon;

              return (
                <label
                  key={item.value}
                  className="group relative flex cursor-pointer flex-col rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-electric/40 hover:shadow-premium-sm has-[:checked]:border-brand-electric has-[:checked]:bg-brand-electric/[0.045] has-[:checked]:shadow-[inset_0_0_0_1px_var(--color-brand-electric)]"
                >
                  <input
                    type="radio"
                    name="supportType"
                    value={item.value}
                    required
                    className="peer sr-only"
                  />

                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-electric/[0.08] text-brand-electric transition-colors peer-checked:bg-brand-electric peer-checked:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>

                  <span className="mt-4 text-sm font-semibold text-foreground">
                    {item.label}
                  </span>

                  <span className="mt-1 text-xs leading-5 text-muted-foreground">
                    {item.description}
                  </span>

                  <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border border-border text-transparent transition peer-checked:border-brand-electric peer-checked:bg-brand-electric peer-checked:text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                </label>
              );
            })}
          </div>
        </FormField>

        <div className="rounded-2xl border border-border bg-surface-subtle p-4 sm:p-5">
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-gold/15 text-foreground">
              <Clock3 className="h-4 w-4" />
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">
                How much support are you considering?
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Our packages are designed around 10–30 hours, with hourly
                support also available.
              </p>
            </div>
          </div>

          <FormField
            label="Hours you're considering"
            name="hours"
            optional
          >
            <select
              id="hours"
              name="hours"
              defaultValue=""
              className={fieldClass}
            >
              <option value="">Select an option</option>
              {hoursOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Estimated budget" name="budget" optional>
            <select
              id="budget"
              name="budget"
              defaultValue=""
              className={fieldClass}
            >
              <option value="">Choose a budget</option>
              {budgetOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="When would you like support?" name="timeline">
            <select
              id="timeline"
              name="timeline"
              required
              defaultValue=""
              className={fieldClass}
            >
              <option value="">Choose a timeline</option>
              {timelineOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField label="Subject" name="subject" optional>
          <input
            id="subject"
            name="subject"
            placeholder="A short summary of your enquiry"
            className={fieldClass}
          />
        </FormField>

        <FormField
          label="Tell us about the support you need"
          name="message"
        >
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            minLength={10}
            placeholder="What tasks would you like us to take care of? How often would you need support? Tell us anything else that would help us understand your day-to-day needs..."
            className={`${fieldClass} min-h-[145px] resize-y leading-7`}
          />
        </FormField>
      </FormSection>

      {/* Submission feedback */}
      {status === "error" && <FormError message={errorMessage} />}

      {/* Submission */}
      <div className="border-t border-border pt-7">
        <div className="mb-5 flex items-start gap-3">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Make room for what matters.
            </p>
            <p className="mt-1 max-w-lg text-xs leading-5 text-muted-foreground">
              Share what you need help with. We'll review your requirements
              and discuss a practical support arrangement.
            </p>
          </div>
        </div>

        <SubmitButton loading={status === "loading"} />

        <p className="mt-4 text-center text-xs text-muted-foreground">
          By submitting, you're starting a conversation with Go Far Agency.
        </p>
      </div>
    </form>
  );
}

function FormSection({
  number,
  icon: Icon,
  title,
  description,
  children,
}: {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand-electric/15 bg-brand-electric/[0.07] text-brand-electric">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-[0.18em] text-brand-electric">
              {number}
            </span>
            <span className="h-px w-7 bg-brand-electric/30" />
            <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Support enquiry
            </span>
          </div>

          <h3 className={sectionHeadingClass}>{title}</h3>

          <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <div className="space-y-5">{children}</div>
    </section>
  );
}

function SectionDivider() {
  return <div className="h-px w-full bg-border" />;
}

function SuccessMessage() {
  return (
    <div className="relative flex min-h-[440px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-border bg-card px-6 py-12 text-center">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-electric/[0.07] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-brand-gold/[0.08] blur-3xl" />

      <div className="relative flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-green-500/10 text-green-600">
        <CheckCircle2 className="h-10 w-10" strokeWidth={1.6} />
      </div>

      <span className="relative mt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-green-600">
        Enquiry received
      </span>

      <h3 className="relative mt-3 max-w-md font-brand-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Support is on the horizon.
      </h3>

      <p className="relative mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
        Thank you for telling us what you need. We'll review your enquiry and
        get back to you with the next steps.
      </p>

      <div className="relative mt-8 flex items-center gap-2 text-xs font-semibold text-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        Go Far Agency
      </div>
    </div>
  );
}

function FormError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/[0.06] px-4 py-4 text-sm text-red-600"
    >
      <MessageSquareText className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="leading-6">{message}</p>
    </div>
  );
}

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-brand-electric px-6 py-4 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(18,101,244,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-electric-700 hover:shadow-[0_12px_30px_rgba(18,101,244,0.25)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-electric/25 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
    >
      {loading ? (
        <>
          <LoaderCircle className="h-4 w-4 animate-spin" />
          Sending your enquiry...
        </>
      ) : (
        <>
          Send support enquiry
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight className="h-4 w-4" />
          </span>
        </>
      )}
    </button>
  );
}
