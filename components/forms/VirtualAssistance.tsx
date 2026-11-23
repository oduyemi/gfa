"use client";
import { useContactSubmission } from "@/hooks/useContactSubmission";
import { FormField, inputClass, budgetOptions, timelineOptions } from "@/utils/contact-form";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";


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

export function VirtualAssistanceForm() {
  const { status, errorMessage, submit } = useContactSubmission();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const payload = {
      fullname: formData.get("fullname"),
      email: formData.get("email"),
      company: formData.get("company"),
      service: "Managed Virtual Assistance",
      topic: "Managed Virtual Assistance",
      supportTasks: formData.getAll("supportTasks"),
      supportType: formData.get("supportType"),
      hours: formData.get("hours"),
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
          Support is on the horizon.
        </h3>

        <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
          Thank you for telling us what you need. We'll review
          your enquiry and get back to you with the next steps.
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

      <FormField label="What do you need help with?" name="supportTasks">
        <div className="grid gap-2 sm:grid-cols-2">
          {supportTasks.map((task) => (
            <label
              key={task}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-3.5 text-sm transition hover:border-brand-electric/40 has-[:checked]:border-brand-electric has-[:checked]:bg-brand-electric/5"
            >
              <input
                type="checkbox"
                name="supportTasks"
                value={task}
                className="mt-0.5 accent-brand-electric"
              />
              <span>{task}</span>
            </label>
          ))}
        </div>
      </FormField>

      <FormField label="Preferred support arrangement" name="supportType">
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            { value: "Hourly", label: "Hourly support" },
            { value: "Package", label: "Hours package" },
            { value: "Not sure", label: "Not sure yet" },
          ].map((item) => (
            <label
              key={item.value}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-background p-3.5 text-sm transition hover:border-brand-electric/40 has-[:checked]:border-brand-electric has-[:checked]:bg-brand-electric/5"
            >
              <input
                type="radio"
                name="supportType"
                value={item.value}
                className="accent-brand-electric"
              />
              {item.label}
            </label>
          ))}
        </div>
      </FormField>

      <FormField label="Hours you're considering" name="hours" optional>
        <select
          id="hours"
          name="hours"
          defaultValue=""
          className={inputClass}
        >
          <option value="">Select an option</option>
          <option value="Up to 10 hours">Up to 10 hours</option>
          <option value="10 hours">10 hours</option>
          <option value="20 hours">20 hours</option>
          <option value="30 hours">30 hours</option>
          <option value="More than 30 hours">More than 30 hours</option>
          <option value="Flexible / unsure">Flexible / unsure</option>
        </select>
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Estimated budget" name="budget" optional>
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

        <FormField label="When would you like support?" name="timeline">
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

      <FormField label="Tell us about the support you need" name="message">
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          minLength={10}
          placeholder="What tasks would you like support with? How often? Anything else we should know?"
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
            Send support enquiry
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
