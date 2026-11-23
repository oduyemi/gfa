"use client";
import { FormEvent, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  MessageCircle,
} from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-brand-electric focus:ring-4 focus:ring-brand-electric/10";

const labelClass =
  "mb-2 block text-sm font-medium text-foreground";

export function GeneralContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });

  const updateField = (
    field: keyof typeof form,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: form.fullname,
          email: form.email,
          topic: "General",
          subject: form.subject || "General enquiry",
          message: form.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Something went wrong. Please try again.",
        );
      }

      setStatus("success");
      setForm({
        fullname: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send your enquiry. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-subtle p-7 sm:p-9">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-electric/10 blur-3xl" />

        <div className="relative">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-electric text-white shadow-lg shadow-brand-electric/20">
            <CheckCircle2 size={26} />
          </div>

          <h3 className="font-brand-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Message received.
          </h3>

          <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
            Thank you for reaching out. We&apos;ll read through your
            message and get back to you as soon as we can.
          </p>

          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-electric transition hover:gap-3"
          >
            Send another message
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Intro note */}
      <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface-subtle p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-electric/10 text-brand-electric">
          <MessageCircle size={19} />
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">
            Not quite sure where to start?
          </p>
          <p className="mt-1 text-xs leading-6 text-muted-foreground">
            That&apos;s completely fine. Tell us what&apos;s on your
            mind and we&apos;ll take it from there.
          </p>
        </div>
      </div>

      {/* Name + Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="general-fullname" className={labelClass}>
            Your name <span className="text-brand-electric">*</span>
          </label>

          <input
            id="general-fullname"
            name="fullname"
            autoComplete="name"
            required
            value={form.fullname}
            onChange={(e) => updateField("fullname", e.target.value)}
            placeholder="Your name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="general-email" className={labelClass}>
            Email address <span className="text-brand-electric">*</span>
          </label>

          <input
            id="general-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Optional subject */}
      <div>
        <label htmlFor="general-subject" className={labelClass}>
          Subject <span className="text-muted-foreground">(optional)</span>
        </label>

        <input
          id="general-subject"
          name="subject"
          value={form.subject}
          onChange={(e) => updateField("subject", e.target.value)}
          placeholder="What would you like to discuss?"
          className={inputClass}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="general-message" className={labelClass}>
          Your message <span className="text-brand-electric">*</span>
        </label>

        <textarea
          id="general-message"
          name="message"
          required
          rows={5}
          minLength={10}
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          placeholder="Share a question, an idea, a challenge, or simply tell us what's on your mind..."
          className={`${inputClass} min-h-[140px] resize-y`}
        />

        <p className="mt-2 text-xs text-muted-foreground">
          A few sentences are more than enough to get us started.
        </p>
      </div>

      {/* Error */}
      {status === "error" && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-brand-electric px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-electric-700 hover:shadow-lg hover:shadow-brand-electric/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            Sending your message...
          </>
        ) : (
          <>
            Start a conversation
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </>
        )}
      </button>

      <p className="text-center text-xs leading-5 text-muted-foreground">
        No pressure, no commitment. Just a conversation.
      </p>
    </form>
  );
}
