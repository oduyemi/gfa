"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, MessageCircle, Plus } from "lucide-react";
import Link from "next/link";
import { HomeSection } from "../home/HomeSection";


const faqs = [
  {
    question: "What does GFA do?",
    answer:
      "GFA brings people, expertise, and opportunities together to help businesses and organisations move important projects forward. The best starting point is a conversation about what you need.",
  },
  {
    question: "Who can work with GFA?",
    answer:
      "We welcome enquiries from founders, growing businesses, and established organisations. We take time to understand each enquiry before recommending a suitable next step.",
  },
  {
    question: "Can support be tailored to our needs?",
    answer:
      "Yes. We begin by understanding your goals and context, then explore an approach that makes sense for the work you want to accomplish.",
  },
  {
    question: "Do you have an approval process? What's that all about?",
    answer:
      "Yes, we do. Our straightforward four-stage process is designed to keep you informed, involved, and moving in the right direction. We start by discovering your goals and understanding your needs, connect you with relevant people and capabilities, collaborate to develop an approved service plan and agree on next steps, then move forward with implementation. Throughout the process, we keep you in the loop. Four stages, one shared goal: turning the right ideas into meaningful action.",
  },
  {
    question: "How do we get started?",
    answer:
      "Use the contact page or client enquiry link to tell us a little about your project. We'll use that information to guide the next conversation.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <HomeSection
      eyebrow="Frequently Asked Questions"
      title={
        <>
          Questions worth{" "}
          <span className="brand-gradient-text">answering.</span>
        </>
      }
      description="A little more clarity before we start a conversation."
      className="bg-surface-subtle"
    >
      <div className="grid items-stretch gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
        <motion.aside
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease }}
          className="group relative isolate flex min-h-[470px] flex-col justify-between overflow-hidden rounded-[2rem] bg-brand-obsidian p-7 text-white shadow-premium-md sm:p-9 lg:min-h-[560px]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute -right-20 -top-20 size-[340px] rounded-full bg-brand-electric/25 blur-[90px]" />
            <div className="absolute -bottom-28 -left-20 size-[300px] rounded-full bg-brand-gold/10 blur-[90px]" />

            <div className="absolute inset-0 opacity-[0.09] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:44px_44px]" />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 top-[22%] size-64 rounded-full border border-white/[0.08] transition-transform duration-1000 group-hover:scale-110"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-5 top-[30%] size-40 rounded-full border border-brand-electric/35"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[5.5rem] top-[39%] size-2.5 rounded-full bg-brand-gold shadow-[0_0_25px_rgba(244,190,40,0.8)]"
          />

          <div className="relative flex items-center justify-between">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.19em] text-white/70 backdrop-blur sm:text-[10px]">
              <span className="size-1.5 rounded-full bg-brand-gold" />
              We're listening
            </span>

            <span className="text-[10px] font-semibold tracking-[0.16em] text-white/35">
              LET'S TALK
            </span>
          </div>

          <div className="relative z-10 mt-16">
            <div className="grid size-14 place-items-center rounded-[18px] border border-white/15 bg-white/[0.07] text-brand-gold shadow-lg shadow-black/10 backdrop-blur-sm">
              <MessageCircle size={24} strokeWidth={1.6} />
            </div>

            <p className="mt-8 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.22em] text-white/45">
              Still have questions?
            </p>

            <h3 className="mt-4 max-w-[390px] font-brand-display text-[clamp(2.5rem,4vw,3.7rem)] font-semibold leading-[1.04] tracking-[-0.065em]">
              Let's make room for{" "}
              <span className="text-brand-gold">your big idea.</span>
            </h3>

            <p className="mt-5 max-w-[340px] text-sm leading-[1.9] text-white/55">
              Not every question has a ready-made answer. Tell us what you're
              working on, and let's figure out the next step together.
            </p>
          </div>

          <div className="relative mt-12 border-t border-white/15 pt-6">
            <Link
              href="/contact/#contact-form"
              className="group/button inline-flex min-h-[52px] w-full items-center justify-between gap-4 rounded-full bg-brand-gold px-5 text-sm font-bold text-brand-obsidian transition-all duration-300 hover:-translate-y-1 hover:bg-white sm:w-auto sm:min-w-[220px]"
            >
              <span>Talk to our team</span>
              <span className="grid size-8 place-items-center rounded-full bg-brand-obsidian/10 transition-transform duration-300 group-hover/button:translate-x-1">
                <ArrowUpRight size={17} />
              </span>
            </Link>

            <p className="mt-4 text-[10px] tracking-wide text-white/35">
              Good conversations lead to great things.
            </p>
          </div>
        </motion.aside>

        {/* FAQ area */}
        <div className="flex flex-col">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
            className="mb-5 flex items-end justify-between gap-4 border-b border-border pb-5"
          >
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-brand-electric">
                Before we begin
              </p>
              <h3 className="mt-2 font-brand-display text-2xl font-semibold tracking-[-0.045em] text-foreground sm:text-3xl">
                Take a look at our frequently asked questions.
              </h3>
            </div>

            <span className="hidden shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-[10px] font-bold tabular-nums text-muted-foreground sm:block">
              0{faqs.length} QUESTIONS
            </span>
          </motion.div>

          {/* Questions */}
          <div className="flex-1">
            {faqs.map((faq, index) => {
              const open = openIndex === index;
              const panelId = `home-faq-panel-${index}`;
              const triggerId = `home-faq-trigger-${index}`;

              return (
                <motion.article
                  key={faq.question}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: reduceMotion ? 0 : index * 0.08,
                    ease,
                  }}
                  className={`group relative border-b border-border transition-colors duration-300 ${
                    open ? "bg-card/70" : "hover:bg-card/40"
                  }`}
                >
                  {/* Active indicator */}
                  <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{ scaleY: open ? 1 : 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="absolute bottom-0 left-0 top-0 w-[3px] origin-top rounded-full bg-brand-electric"
                  />

                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex min-h-[88px] w-full items-center gap-4 px-4 py-5 text-left sm:gap-5 sm:px-5"
                  >
                    <span
                      className={`w-7 shrink-0 font-heading text-[11px] font-bold tabular-nums transition-colors duration-300 ${
                        open
                          ? "text-brand-electric"
                          : "text-muted-foreground/45"
                      }`}
                    >
                      0{index + 1}
                    </span>

                    <span
                      className={`flex-1 font-heading text-[15px] font-semibold leading-snug tracking-[-0.02em] transition-colors duration-300 sm:text-lg ${
                        open
                          ? "text-brand-electric"
                          : "text-foreground group-hover:text-brand-electric"
                      }`}
                    >
                      {faq.question}
                    </span>

                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        open
                          ? "rotate-45 border-brand-electric bg-brand-electric text-white shadow-md shadow-brand-electric/20"
                          : "border-border bg-background text-muted-foreground group-hover:border-brand-electric/40 group-hover:text-brand-electric"
                      }`}
                    >
                      <Plus size={17} strokeWidth={1.8} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={
                          reduceMotion
                            ? false
                            : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                          reduceMotion
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0 }
                        }
                        transition={{
                          duration: reduceMotion ? 0 : 0.3,
                          ease,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 pl-11 pr-5 sm:pl-[4.25rem] sm:pr-8">
                          <p className="max-w-[490px] text-[13px] leading-[1.95] text-muted-foreground sm:text-sm">
                            {faq.answer}
                          </p>

                          <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-brand-electric">
                            <Check size={12} />
                            A little more clarity
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-7 flex flex-col gap-3 rounded-2xl border border-border bg-card/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-gold/15 text-brand-gold">
                <MessageCircle size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Still have something on your mind?
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  We're happy to hear from you.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-xs font-bold text-brand-electric transition-colors hover:text-electric-700"
            >
              Get in touch
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </HomeSection>
  );
}
