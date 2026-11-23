"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, MessageCircleQuestion, Sparkles } from "lucide-react";


const faqs = [
  {
    question: "What if I don't know exactly what I need?",
    answer:
      "That's absolutely fine. You don't need to have everything figured out before reaching out. Tell us what you're trying to achieve, and we'll help you explore the options and determine what makes sense.",
  },
  {
    question: "What happens after I submit an enquiry?",
    answer:
      "We'll review your enquiry and get back to you. If we need more information, we'll ask a few questions or arrange a conversation. If we're a good fit, we'll discuss the scope, timelines, fees, and next steps.",
  },
  {
    question: "Do you work with new businesses and individuals?",
    answer:
      "Yes. We work with individuals, startups, growing businesses, established teams, and people with ideas they want to bring to life. The right solution depends on what you're looking to accomplish.",
  },
  {
    question: "How does payment work?",
    answer:
      "Payment arrangements depend on the service. Digital Creation projects typically require a 50% deposit. Digital Execution is retainer-based, with a minimum engagement of three months. Managed Virtual Assistance is available through agreed hourly or package arrangements.",
  },
  {
    question: "Can I request more than one service?",
    answer:
      "Absolutely. If your project requires a combination of creative work, marketing, and ongoing support, we can discuss how the different services fit together.",
  },
  {
    question: "Do I need to sign a contract?",
    answer:
      "Before work begins, we'll agree on the scope, deliverables, payment terms, timelines, and applicable working terms so everyone has a clear understanding of the arrangement.",
  },
];

const revealEase = [0.22, 1, 0.36, 1] as const;

export const ClientFAQ = () => {
  const reducedMotion = useReducedMotion();

  const reveal = {
    initial: reducedMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: {
      duration: reducedMotion ? 0 : 0.65,
      ease: revealEase,
    },
  };

  return (
    <section className="relative isolate overflow-hidden bg-background py-20 sm:py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-0 h-[30rem] w-[30rem] rounded-full bg-brand-electric/[0.045] blur-[120px]"
      />

      <div className="brand-container relative">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 xl:gap-28">
          <motion.div {...reveal} className="flex flex-col">
            <div>
              <div className="flex items-center gap-3">
                <span className="brand-eyebrow">Good to know</span>
              </div>

              <h2 className="mt-7 max-w-md font-brand-display text-4xl font-semibold leading-[1.06] tracking-[-0.055em] text-foreground sm:text-5xl lg:text-[3.65rem]">
                Before we get
                <br />
                <span className="brand-gradient-text">things moving.</span>
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                A few answers to help you understand how we work, what to
                expect, and how to take the next step with confidence.
              </p>
            </div>

            <div className="mt-10 overflow-hidden border border-border bg-card sm:mt-14">
              <div className="flex items-center gap-3 border-b border-border px-5 py-4 sm:px-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-electric/10 text-brand-electric">
                  <MessageCircleQuestion size={17} />
                </span>
                <span className="text-xs font-semibold text-foreground">
                  Still have a question?
                </span>
              </div>

              <div className="px-5 py-5 sm:px-6 sm:py-6">
                <p className="text-sm leading-7 text-muted-foreground">
                  Every project is different. If there's something you'd
                  like to clarify before getting started, we're happy to
                  talk it through.
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-foreground">
                  <span>Clarity before commitment.</span>
                </div>
              </div>
            </div>

            <div className="mt-7 hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/60 lg:flex">
              <span>Frequently asked questions</span>
            </div>
          </motion.div>

          <motion.div
            {...reveal}
            transition={{
              ...reveal.transition,
              delay: reducedMotion ? 0 : 0.12,
            }}
            className="min-w-0"
          >
            <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Your questions, answered
              </span>
              <span className="text-xs tabular-nums text-muted-foreground">
                06 topics
              </span>
            </div>

            <div className="divide-y divide-border">
              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  className="group"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-4 py-5 text-left marker:hidden sm:gap-6 sm:py-6 [&::-webkit-details-marker]:hidden">
                    <span className="w-7 shrink-0 text-xs font-semibold tabular-nums text-brand-electric/70 dark:text-brand-gold/75">
                      0{index + 1}
                    </span>

                    <span className="min-w-0 flex-1 pr-2 text-[15px] font-semibold leading-6 text-foreground transition-colors duration-200 group-open:text-brand-electric dark:group-open:text-brand-gold sm:text-base">
                      {faq.question}
                    </span>

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-brand-electric/50 group-hover:text-brand-electric group-open:rotate-180 group-open:border-brand-electric group-open:bg-brand-electric group-open:text-white dark:group-open:border-brand-gold dark:group-open:bg-brand-gold dark:group-open:text-obsidian-900">
                      <ChevronDown size={16} />
                    </span>
                  </summary>

                  <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-open:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <div className="pb-6 pl-11 pr-12 sm:pb-7 sm:pl-[3.25rem]">
                        <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:leading-8">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-7 flex items-center justify-between gap-4 border-t border-border pt-5">
              <p className="text-xs leading-6 text-muted-foreground">
                Something else on your mind?
              </p>
              <a
                href="/contact"
                className="shrink-0 text-xs font-semibold text-foreground underline decoration-brand-electric/50 underline-offset-4 transition-colors hover:text-brand-electric dark:decoration-brand-gold/60 dark:hover:text-brand-gold"
              >
                Get in touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
