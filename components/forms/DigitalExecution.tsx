"use client";
import { useContactSubmission } from "@/hooks/useContactSubmission";
import { FormField, inputClass, budgetOptions, timelineOptions } from "@/utils/contact-form";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";


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

export function DigitalExecutionForm() {
  const { status, errorMessage, submit } = useContactSubmission();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const payload = {
      fullname: formData.get("fullname"),
      email: formData.get("email"),
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
    return (
      <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <h3 className="mt-6 font-brand-display text-3xl font-semibold">
          Let's get growing.
        </h3>

        <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
          Thanks for sharing your goals. We've received your enquiry
          and will be in touch to discuss how we can help.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Your name" name="fullname">
          <input
            id="fullname"
            name="fullname"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={inputClass}
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
            className={inputClass}
          />
        </FormField>
      </div>

      <FormField label="Business / organisation" name="company" optional>
        <input
          id="company"
          name="company"
          placeholder="Business name"
          className={inputClass}
        />
      </FormField>

      <FormField label="What would you like to achieve?" name="goals">
        <div className="grid gap-2 sm:grid-cols-2">
          {goals.map((goal) => (
            <label
              key={goal}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-3.5 text-sm transition hover:border-brand-electric/40 has-[:checked]:border-brand-electric has-[:checked]:bg-brand-electric/5"
            >
              <input
                type="checkbox"
                name="goals"
                value={goal}
                className="mt-0.5 accent-brand-electric"
              />
              <span>{goal}</span>
            </label>
          ))}
        </div>
      </FormField>

      <FormField label="Which platforms are you currently using?" name="channels" optional>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {channels.map((channel) => (
            <label
              key={channel}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-background p-3 text-xs transition hover:border-brand-electric/40 has-[:checked]:border-brand-electric has-[:checked]:bg-brand-electric/5"
            >
              <input
                type="checkbox"
                name="channels"
                value={channel}
                className="accent-brand-electric"
              />
              <span>{channel}</span>
            </label>
          ))}
        </div>
      </FormField>

      <FormField label="Where is your business currently?" name="businessStage">
        <select
          id="businessStage"
          name="businessStage"
          defaultValue=""
          className={inputClass}
        >
          <option value="">Select an option</option>
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
            className={inputClass}
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
            defaultValue=""
            className={inputClass}
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
          placeholder="A short summary"
          className={inputClass}
        />
      </FormField>

      <FormField label="Tell us about your business and goals" name="message">
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          minLength={10}
          placeholder="What does your business do? What challenges are you facing? What would success look like?"
          className={`${inputClass} resize-y leading-7`}
        />
      </FormField>

      {status === "error" && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-600"
        >
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-electric px-6 py-4 text-sm font-semibold text-white transition hover:bg-electric-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Sending enquiry...
          </>
        ) : (
          <>
            Send growth enquiry
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
