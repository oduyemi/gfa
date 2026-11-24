"use client";
import { useContactSubmission } from "@/hooks/useContactSubmission";
import { FormField, inputClass, budgetOptions, timelineOptions } from "@/utils/contact-form";
import { ArrowRight, Check, CheckCircle2, LoaderCircle, MessageSquareText, Target, TrendingUp, UserRound } from "lucide-react";


const goals = [
  "Increase brand awareness",
  "Generate leads",
  "Increase sales",
  "Improve online presence",
  "Build a marketing strategy",
  "Automate business processes",
  "Other",
];

const channels = [
  "Instagram",
  "Facebook",
  "Google",
  "YouTube",
  "TikTok",
  "LinkedIn",
  "Website / SEO",
  "Not currently using any",
];

const fieldClass = `${inputClass} rounded-xl border-border bg-background transition-all duration-200 placeholder:text-muted-foreground/60 focus:border-brand-electric focus:ring-4 focus:ring-brand-electric/10`;
const sectionHeadingClass = "font-brand-display text-xl font-semibold tracking-tight text-foreground";


export function DigitalExecutionForm() {
  const { status, errorMessage, submit } = useContactSubmission();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      fullname: formData.get("fullname"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      service: "Digital Execution",
      topic: "Digital Execution",
      goals: formData.getAll("goals"),
      channels: formData.getAll("channels"),
      businessStage: formData.get("businessStage"),
      budget: formData.get("budget"),
      timeline: formData.get("timeline"),
      subject: formData.get("subject"),
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
        title="First, let's meet you."
        description="Tell us a little about yourself and the business behind the ambition."
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

      {/* 02 — Growth priorities */}
      <FormSection
        number="02"
        icon={Target}
        title="What does growth look like?"
        description="Tell us what you're working towards. Select all the priorities that matter to your business."
      >
        <FormField label="Your business goals" name="goals">
          <div className="grid gap-3 sm:grid-cols-2">
            {goals.map((goal, index) => (
              <SelectableOption
                key={goal}
                name="goals"
                value={goal}
                number={index + 1}
              />
            ))}
          </div>
        </FormField>

        <div className="rounded-2xl border border-border bg-surface-subtle p-4 sm:p-5">
          <div className="mb-4">
            <p className="text-sm font-semibold text-foreground">
              Where are you currently showing up?
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Select the platforms and channels your business currently uses.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {channels.map((channel) => (
              <label
                key={channel}
                className="group flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border border-border bg-background px-3 py-2.5 text-xs transition-all duration-200 hover:border-brand-electric/40 has-[:checked]:border-brand-electric has-[:checked]:bg-brand-electric/[0.06] has-[:checked]:shadow-[inset_0_0_0_1px_var(--color-brand-electric)]"
              >
                <input
                  type="checkbox"
                  name="channels"
                  value={channel}
                  className="peer sr-only"
                />

                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-border text-transparent transition peer-checked:border-brand-electric peer-checked:bg-brand-electric peer-checked:text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>

                <span className="font-medium leading-4 text-foreground/80 transition-colors group-hover:text-brand-electric">
                  {channel}
                </span>
              </label>
            ))}
          </div>
        </div>
      </FormSection>

      <SectionDivider />

      {/* 03 — Business context */}
      <FormSection
        number="03"
        icon={TrendingUp}
        title="Where are you now?"
        description="A little context helps us recommend an approach that makes sense for your business."
      >
        <FormField label="Your business stage" name="businessStage">
          <select
            id="businessStage"
            name="businessStage"
            required
            defaultValue=""
            className={fieldClass}
          >
            <option value="">Select your current stage</option>
            <option value="Idea / pre-launch">Idea / pre-launch</option>
            <option value="New business">New business</option>
            <option value="Established business">Established business</option>
            <option value="Growing / scaling">Growing / scaling</option>
            <option value="Rebranding / repositioning">
              Rebranding / repositioning
            </option>
          </select>
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Monthly budget" name="budget" optional>
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

          <FormField label="When would you like to start?" name="timeline">
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
          label="Tell us about your business and goals"
          name="message"
        >
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            minLength={10}
            placeholder="What does your business do? What challenges are you facing? What would meaningful progress look like for you?"
            className={`${fieldClass} min-h-[145px] resize-y leading-7`}
          />
        </FormField>
      </FormSection>

      {/* Submission feedback */}
      {status === "error" && <FormError message={errorMessage} />}

      {/* Submit */}
      <div className="border-t border-border pt-7">
        <div className="mb-5 flex items-start gap-3">
          <div>
            <p className="text-sm font-semibold text-foreground">
              Let's make progress together.
            </p>
            <p className="mt-1 max-w-lg text-xs leading-5 text-muted-foreground">
              Your answers give us a starting point. We'll take the time to
              understand your business before recommending the next steps.
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
              Growth enquiry
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

function SelectableOption({
  name,
  value,
  number,
}: {
  name: string;
  value: string;
  number: number;
}) {
  return (
    <label className="group flex min-h-[62px] cursor-pointer items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-electric/40 hover:shadow-premium-sm has-[:checked]:border-brand-electric has-[:checked]:bg-brand-electric/[0.045] has-[:checked]:shadow-[inset_0_0_0_1px_var(--color-brand-electric)]">
      <input
        type="checkbox"
        name={name}
        value={value}
        className="peer sr-only"
      />

      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-border bg-background text-transparent transition peer-checked:border-brand-electric peer-checked:bg-brand-electric peer-checked:text-white">
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>

      <span className="min-w-0 flex-1 text-sm font-medium leading-5 text-foreground">
        {value}
      </span>

      <span className="text-[10px] font-semibold tabular-nums text-muted-foreground/50">
        {String(number).padStart(2, "0")}
      </span>
    </label>
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
        Let's get growing.
      </h3>

      <p className="relative mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
        Thanks for sharing your goals. We've received your enquiry and will be
        in touch to discuss how we can help.
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
          Send growth enquiry
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight className="h-4 w-4" />
          </span>
        </>
      )}
    </button>
  );
}
