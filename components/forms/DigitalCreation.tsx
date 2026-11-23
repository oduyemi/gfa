"use client";
import { useContactSubmission } from "@/hooks/useContactSubmission";
import { FormField, inputClass, budgetOptions, timelineOptions } from "@/utils/contact-form";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";

const creationServices = [
  "Graphic design & branding",
  "Web design & development",
  "Video editing",
  "Content creation & writing",
  "Sourcing service providers",
  "Something else",
];

export function DigitalCreationForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const { status, errorMessage, submit } = useContactSubmission();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const selectedServices = formData.getAll("creationServices");

    const payload = {
      fullname: formData.get("fullname"),
      email: formData.get("email"),
      company: formData.get("company"),
      service: "Digital Creation",
      topic: "Digital Creation",
      creationServices: selectedServices,
      projectName: formData.get("projectName"),
      budget: formData.get("budget"),
      timeline: formData.get("timeline"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    await submit(payload);
  }

  if (status === "success") {
    return (
      <SuccessMessage
        title="Your creative enquiry is in."
        description="Thanks for sharing your project with us. We'll review the details and get back to you about the next steps."
      />
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

      <FormField label="What do you need?" name="creationServices">
        <div className="grid gap-2 sm:grid-cols-2">
          {creationServices.map((service) => (
            <label
              key={service}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-3.5 text-sm transition hover:border-brand-electric/40 has-[:checked]:border-brand-electric has-[:checked]:bg-brand-electric/5"
            >
              <input
                type="checkbox"
                name="creationServices"
                value={service}
                className="mt-0.5 accent-brand-electric"
              />
              <span>{service}</span>
            </label>
          ))}
        </div>
      </FormField>

      <FormField label="Project name" name="projectName" optional>
        <input
          id="projectName"
          name="projectName"
          placeholder="What are we creating?"
          className={inputClass}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Estimated budget" name="budget">
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

        <FormField label="Preferred timeline" name="timeline">
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

      <FormField label="Tell us about your project" name="message">
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          minLength={10}
          placeholder="Your idea, goals, what you have in mind, and any useful details..."
          className={`${inputClass} resize-y leading-7`}
        />
      </FormField>

      {status === "error" && <FormError message={errorMessage} />}

      <SubmitButton loading={status === "loading"} />
    </form>
  );
}

function SuccessMessage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-600">
        <CheckCircle2 className="h-8 w-8" />
      </div>

      <h3 className="mt-6 font-brand-display text-3xl font-semibold">
        {title}
      </h3>

      <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function FormError({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-600"
    >
      {message}
    </div>
  );
}

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-electric px-6 py-4 text-sm font-semibold text-white transition hover:bg-electric-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <>
          <LoaderCircle className="h-4 w-4 animate-spin" />
          Sending enquiry...
        </>
      ) : (
        <>
          Send creative enquiry
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </>
      )}
    </button>
  );
}
