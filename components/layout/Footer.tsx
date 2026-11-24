"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, CheckCircle2, Mail, MoveUpRight } from "lucide-react";
import { ContactDialog } from "@/dialogs/contact-dialog";

const navigation = {
  explore: [
    { label: "Home", href: "/" },
    { label: "Our services", href: "/services" },
    { label: "How it works", href: "/how-it-works" },
  ],
  company: [
    { label: "About GFA", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Become a client", href: "/become-a-client" },
  ],
  services: [
    { label: "Digital Creation", href: "/services#digital-creation" },
    { label: "Digital Execution", href: "/services#digital-execution" },
    { label: "Managed VA", href: "/services#virtual-assistance" },
  ],
};

type NewsletterStatus = "idle" | "loading" | "success" | "error";

export const Footer = () => {
  const [dialogType, setDialogType] = useState<"creation" | "execution" | "assistance" | "general" | null>(null);
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<NewsletterStatus>("idle");
  const [newsletterError, setNewsletterError] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState("Thanks for signing up. Look out for something good in your inbox.");
  const year = 2026;

  const handleNewsletterSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || newsletterStatus === "loading") return;
    setNewsletterStatus("loading");
    setNewsletterError("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to subscribe. Please try again."
        );
      }

      setNewsletterSuccess(
        data.message ||
          "Thanks for signing up. Look out for something good in your inbox."
      );
      setNewsletterStatus("success");
      setEmail("");
    } catch (error) {
      setNewsletterStatus("error");
      setNewsletterError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);

    if (newsletterStatus === "error") {
      setNewsletterStatus("idle");
      setNewsletterError("");
    }
  };

  const linkClass =
    "group inline-flex items-center gap-2 text-sm text-obsidian-600 transition-colors duration-200 hover:text-electric-700 dark:text-white/55 dark:hover:text-brand-gold";

  const renderLinks = (
    items: { label: string; href: string }[]
  ) => (
    <ul className="mt-5 space-y-3.5">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className={linkClass}>
            {item.label}
            <ArrowUpRight
              size={13}
              className="opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
            />
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="relative isolate overflow-hidden">
      {/* Upper footer */}
      <div className="relative bg-brand-paper text-obsidian-950 dark:bg-obsidian-900 dark:text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-40 size-[32rem] rounded-full border border-brand-electric/[0.06] dark:border-white/[0.035]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-24 size-[23rem] rounded-full border border-brand-gold/15 dark:border-brand-gold/[0.08]"
        />

        <div className="brand-container relative py-12 sm:py-14 lg:py-16">
          <div className="grid gap-10 border-b border-obsidian-950/10 pb-10 dark:border-white/10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:pb-12">
            <div className="max-w-md">
              <Link
                href="/"
                aria-label="Go Far Agency home"
                className="group inline-flex items-center gap-3"
              >
                <Image
                  src="/images/logo/logo.svg"
                  alt=""
                  width={5979}
                  height={3991}
                  className="h-14 w-auto max-w-[7rem] object-contain transition-transform duration-300 group-hover:scale-105 sm:h-16"
                />

                <span className="whitespace-nowrap font-heading text-xl font-extrabold tracking-tight">
                  Go Far Agency<span className="text-brand-electric dark:text-brand-gold">.</span>
                </span>
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-7 text-obsidian-600 dark:text-white/55">
                Your extended digital team. We bring people, expertise, and
                opportunities together to help your ideas move forward.
              </p>

              <div className="mt-5 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-obsidian-500 dark:text-white/40">
                  Go far with your project
                </span>
              </div>
            </div>

            <div className="relative rounded-2xl border border-obsidian-950/[0.07] bg-white p-5 shadow-premium-sm dark:border-white/10 dark:bg-obsidian-800 dark:shadow-none sm:p-6">
              <div className="flex items-center gap-2 text-electric-700 dark:text-brand-gold">
                <Mail size={15} />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
                  Stay in the loop
                </span>
              </div>

              {newsletterStatus === "success" ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-5"
                >
                  <div className="flex size-10 items-center justify-center rounded-xl bg-success-surface text-success dark:bg-success/10 dark:text-success">
                    <CheckCircle2 size={21} />
                  </div>

                  <h3 className="mt-3 font-heading text-lg font-semibold">
                    You're on the list!
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-obsidian-500 dark:text-white/55">
                    {newsletterSuccess}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setNewsletterStatus("idle");
                      setNewsletterError("");
                    }}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-electric-700 hover:text-electric-900 dark:text-brand-gold dark:hover:text-white"
                  >
                    Add another email
                    <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="mt-3 font-brand-display text-xl font-semibold tracking-[-0.04em] sm:text-2xl">
                    Good ideas deserve to go far.
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-obsidian-500 dark:text-white/50">
                    Thoughtful insights and useful resources, every now and
                    then.
                  </p>

                  <form
                    onSubmit={handleNewsletterSubmit}
                    className="mt-5"
                  >
                    <label
                      htmlFor="footer-newsletter-email"
                      className="sr-only"
                    >
                      Your email address
                    </label>

                    <div className="flex flex-col gap-2 sm:flex-row">
                      <input
                        id="footer-newsletter-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                        disabled={newsletterStatus === "loading"}
                        value={email}
                        onChange={(event) =>
                          handleEmailChange(event.target.value)
                        }
                        placeholder="Your email address"
                        className="
                          h-12 min-w-0 flex-1 rounded-xl
                          border border-obsidian-200 bg-brand-paper
                          px-4 text-sm text-obsidian-950 outline-none
                          transition placeholder:text-obsidian-400
                          focus:border-brand-electric
                          focus:ring-2 focus:ring-brand-electric/10
                          disabled:cursor-not-allowed disabled:opacity-60
                          dark:border-white/10 dark:bg-obsidian-950
                          dark:text-white dark:placeholder:text-white/30
                        "
                      />

                      <button
                        type="submit"
                        disabled={newsletterStatus === "loading"}
                        className="
                          group inline-flex h-12 shrink-0 items-center
                          justify-center gap-2 rounded-xl
                          bg-brand-electric px-5 text-sm font-semibold
                          text-white transition hover:bg-electric-700
                          disabled:cursor-not-allowed disabled:opacity-60
                        "
                      >
                        {newsletterStatus === "loading" ? (
                          <>
                            <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            Joining...
                          </>
                        ) : (
                          <>
                            Join the list
                            <ArrowRight
                              size={15}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </>
                        )}
                      </button>
                    </div>

                    {newsletterStatus === "error" && (
                      <p
                        role="alert"
                        aria-live="assertive"
                        className="mt-2 text-sm leading-5 text-danger dark:text-danger"
                      >
                        {newsletterError}
                      </p>
                    )}
                  </form>

                  <p className="mt-3 text-[11px] leading-5 text-obsidian-400 dark:text-white/35">
                    No inbox overload. Unsubscribe whenever you like.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-9 py-10 sm:grid-cols-4 sm:gap-8 lg:py-11">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.19em] text-obsidian-400 dark:text-white/35">
                Explore
              </h3>
              {renderLinks(navigation.explore)}
            </div>

            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.19em] text-obsidian-400 dark:text-white/35">
                The agency
              </h3>
              {renderLinks(navigation.company)}
            </div>

            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.19em] text-obsidian-400 dark:text-white/35">
                What we do
              </h3>
              {renderLinks(navigation.services)}
            </div>

            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.19em] text-obsidian-400 dark:text-white/35">
                Let's connect
              </h3>

              <p className="mt-5 max-w-[15rem] text-sm leading-6 text-obsidian-500 dark:text-white/50">
                Have a project, a question, or an idea worth exploring?
              </p>

              <button
                type="button"
                onClick={() => setDialogType("general")}
                className="group mt-4 inline-flex items-center gap-3 text-sm font-bold text-electric-700 transition-colors hover:text-electric-900 dark:text-brand-gold dark:hover:text-white"
              >
                Start a conversation
                <span className="flex size-8 items-center justify-center rounded-full border border-electric-700/20 transition-all duration-300 group-hover:border-brand-electric group-hover:bg-brand-electric group-hover:text-white dark:border-brand-gold/30 dark:group-hover:border-brand-gold dark:group-hover:bg-brand-gold dark:group-hover:text-obsidian-950">
                  <MoveUpRight size={14} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Compact closing strip */}
      <div className="bg-brand-obsidian text-white">
        <div className="brand-container flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-brand-display text-xl font-semibold tracking-[-0.04em] sm:text-2xl">
              Think bigger. <span className="text-white/40">Go further.</span>
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
              Better together.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link
                href="/contact"
                className="text-[11px] font-medium text-white/45 transition hover:text-brand-gold"
              >
                Get in touch
              </Link>

              <span className="size-1 rounded-full bg-white/20" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/35">
                Made for forward motion
              </span>
            </div>

            <p className="text-[10px] text-white/30">
              © {year} Go Far Agency | All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <ContactDialog
        type={dialogType}
        onClose={() => setDialogType(null)}
      />
    </footer>
  );
};
