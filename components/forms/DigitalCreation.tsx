"use client";
import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { FormField, inputClass, budgetOptions, timelineOptions } from "@/utils/contact-form";

const creationServices = [
  "Graphic design & branding",
  "Web design & development",
  "Video editing",
  "Content creation & writing",
  "Sourcing service providers",
  "Something else",
];

const initialForm = {
  fullname: "",
  email: "",
  phone: "",
  company: "",
  projectName: "",
  budget: "",
  timeline: "",
  subject: "",
  message: "",
};

export const DigitalCreationForm = () => {
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState(initialForm);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const toggleService = (service: string) => {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service]
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (selectedServices.length === 0) {
      setError("Please select at least one creative service.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        service: "Digital Creation",
        creationServices: selectedServices,
      };

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Something went wrong. Please try again."
        );
      }

      setSubmitted(true);
      setFormData(initialForm);
      setSelectedServices([]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "We couldn't submit your enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[520px] flex-col items-center justify-center rounded-3xl border border-border bg-card px-6 py-16 text-center"
      >
        <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-brand-electric/10 text-brand-electric">
          <CheckCircle2 size={30} />
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-electric">
          Enquiry received
        </p>

        <h3 className="max-w-md text-3xl font-semibold tracking-tight text-foreground">
          Thank you for thinking of GFA.
        </h3>

        <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
          Your project details are with us. We&apos;ll review your enquiry
          and get back to you about the next steps.
        </p>

        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition hover:text-brand-electric"
        >
          Submit another enquiry
          <ArrowRight size={16} />
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* Contact details */}
      <section>
        <div className="mb-7">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-electric">
            01 / Your details
          </p>

          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Let&apos;s get acquainted.
          </h3>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Tell us a little about yourself and how we can reach you.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Full name" name="fullname">
            <input
              id="fullname"
              name="fullname"
              type="text"
              autoComplete="name"
              required
              value={formData.fullname}
              onChange={(e) => updateField("fullname", e.target.value)}
              placeholder="Your full name"
              className={inputClass}
            />
          </FormField>

          <FormField label="Email address" name="email">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
            />
          </FormField>

          <FormField label="Phone number" name="phone">
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+44 7000 000000"
              className={inputClass}
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
              type="text"
              autoComplete="organization"
              value={formData.company}
              onChange={(e) => updateField("company", e.target.value)}
              placeholder="Your business name"
              className={inputClass}
            />
          </FormField>
        </div>
      </section>

      <div className="h-px bg-border" />

      {/* Creative services */}
      <section>
        <div className="mb-7">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-electric">
            02 / What you need
          </p>

          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            What would you like us to help create?
          </h3>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Select all the services relevant to your project.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {creationServices.map((service) => {
            const checked = selectedServices.includes(service);

            return (
              <button
                key={service}
                type="button"
                aria-pressed={checked}
                onClick={() => toggleService(service)}
                className={`flex min-h-[58px] items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                  checked
                    ? "border-brand-electric bg-brand-electric/5 text-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-brand-electric/50 hover:text-foreground"
                }`}
              >
                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-md border transition ${
                    checked
                      ? "border-brand-electric bg-brand-electric text-white"
                      : "border-border"
                  }`}
                >
                  {checked && <Check size={13} strokeWidth={3} />}
                </span>

                <span>{service}</span>
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Select at least one service.
        </p>
      </section>

      <div className="h-px bg-border" />

      {/* Project details */}
      <section>
        <div className="mb-7">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-electric">
            03 / Your project
          </p>

          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Give us a little more context.
          </h3>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            A few details will help us understand what you have in mind.
          </p>
        </div>

        <div className="space-y-5">
          <FormField label="Project name" name="projectName" optional>
            <input
              id="projectName"
              name="projectName"
              type="text"
              value={formData.projectName}
              onChange={(e) => updateField("projectName", e.target.value)}
              placeholder="Give your project a name"
              className={inputClass}
            />
          </FormField>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Estimated budget" name="budget" optional>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={(e) => updateField("budget", e.target.value)}
                className={inputClass}
              >
                <option value="">Select a budget range</option>
                {budgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Expected timeline" name="timeline" optional>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={(e) => updateField("timeline", e.target.value)}
                className={inputClass}
              >
                <option value="">Select a timeline</option>
                {timelineOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FormField>
          </div>

          <FormField label="Subject" name="subject" optional>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={(e) => updateField("subject", e.target.value)}
              placeholder="A short description of your enquiry"
              className={inputClass}
            />
          </FormField>

          <FormField label="Tell us about your project" name="message">
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) => updateField("message", e.target.value)}
              placeholder="What are you looking to create? What would success look like for you?"
              className={`${inputClass} resize-y`}
            />
          </FormField>
        </div>
      </section>

      {/* Submission */}
      <div className="border-t border-border pt-7">
        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-600"
          >
            {error}
          </div>
        )}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-xs leading-6 text-muted-foreground">
            By submitting this form, you&apos;re taking the first step
            towards making your project happen. We&apos;ll be in touch.
          </p>

          <button
            type="submit"
            disabled={isSubmitting || selectedServices.length === 0}
            className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-brand-electric px-7 text-sm font-semibold text-white transition hover:bg-electric-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle size={17} className="animate-spin" />
                Sending enquiry...
              </>
            ) : (
              <>
                Send my enquiry
                <Send size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
