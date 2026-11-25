"use client";
import { Inbox, Clock3, CheckCircle2, Mail, ArrowUpRight, Activity } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CardStats } from "@/components/admin/Cards/CardStats";


interface HeaderStatsProps {
  stats?: {
    totalEnquiries: number;
    pendingEnquiries: number;
    treatedEnquiries: number;
    totalSubscribers: number;
  };
  loading?: boolean;
}

const defaultStats: NonNullable<HeaderStatsProps["stats"]> = {
  totalEnquiries: 0,
  pendingEnquiries: 0,
  treatedEnquiries: 0,
  totalSubscribers: 0,
};

const getStats = (
  stats: NonNullable<HeaderStatsProps["stats"]>
) => [
  {
    statSubtitle: "TOTAL ENQUIRIES",
    statTitle: stats.totalEnquiries,
    statDescription: "All enquiries received",
    statIcon: <Inbox size={20} />,
    statIconColor: "bg-brand-electric/10 text-brand-electric",
  },
  {
    statSubtitle: "PENDING ENQUIRIES",
    statTitle: stats.pendingEnquiries,
    statDescription: "Awaiting your attention",
    statIcon: <Clock3 size={20} />,
    statIconColor: "bg-amber-500/10 text-amber-500",
  },
  {
    statSubtitle: "TREATED ENQUIRIES",
    statTitle: stats.treatedEnquiries,
    statDescription: "Marked as handled",
    statIcon: <CheckCircle2 size={20} />,
    statIconColor: "bg-emerald-500/10 text-emerald-500",
  },
  {
    statSubtitle: "NEWSLETTER SUBSCRIBERS",
    statTitle: stats.totalSubscribers,
    statDescription: "Total mailing-list subscriptions",
    statIcon: <Mail size={20} />,
    statIconColor: "bg-brand-gold/10 text-brand-gold",
  },
];

export const HeaderStats = ({
  stats = defaultStats,
  loading = false,
}: HeaderStatsProps) => {
  const shouldReduceMotion = useReducedMotion();
  const cards = getStats(stats);

  return (
    <section
      className="
        relative isolate overflow-hidden
        bg-[#F8F7F2]
        pb-32 pt-20 sm:pb-36 sm:pt-24 lg:pb-40 lg:pt-28
        dark:bg-[#090A0C]
      "
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="
            absolute -right-48 -top-64 h-[38rem] w-[38rem]
            rounded-full bg-[#1265F4]/[0.10] blur-[150px]
            dark:bg-[#1265F4]/[0.12]
          "
        />

        <div
          className="
            absolute -bottom-64 left-[8%] h-[32rem] w-[32rem]
            rounded-full bg-[#D99A00]/[0.07] blur-[150px]
            dark:bg-[#F4BE28]/[0.055]
          "
        />

        <div
          className="
            absolute left-[35%] top-[20%] h-80 w-80
            rounded-full bg-blue-500/[0.035] blur-[130px]
            dark:bg-blue-500/[0.045]
          "
        />

        <div
          className="
            absolute inset-0 opacity-[0.035]
            [background-image:linear-gradient(rgba(18,53,91,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(18,53,91,0.45)_1px,transparent_1px)]
            [background-size:56px_56px]
            dark:opacity-[0.025]
            dark:[background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
          "
        />

        <div
          className="
            absolute inset-0
            bg-[radial-gradient(ellipse_at_top_right,transparent_0%,rgba(248,247,242,0.35)_55%,#F8F7F2_100%)]
            dark:bg-none
          "
        />

        <div
          className="
            absolute -right-40 top-12 hidden h-[36rem] w-[36rem]
            rounded-full border border-[#12355B]/[0.09]
            lg:block dark:border-white/[0.045]
          "
        />

        <div
          className="
            absolute -right-24 top-28 hidden h-[29rem] w-[29rem]
            rounded-full border border-[#12355B]/[0.09]
            lg:block dark:border-white/[0.045]
          "
        />

        <div
          className="
            absolute -right-4 top-48 hidden h-[20rem] w-[20rem]
            rounded-full border border-brand-electric/20
            lg:block dark:border-brand-electric/[0.12]
          "
        />

        <div
          className="
            absolute right-[13%] top-[31%] hidden h-2 w-2
            rounded-full bg-[#D99A00]
            shadow-[0_0_20px_rgba(217,154,0,0.35)]
            lg:block dark:bg-brand-gold
            dark:shadow-[0_0_18px_rgba(244,190,40,0.5)]
          "
        />
      </div>

      <div className="brand-container relative z-10">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <div className="max-w-3xl">
            <div
              className="
                mb-6 inline-flex items-center gap-2.5
                rounded-full border border-[#B88716]/25
                bg-[#F4BE28]/[0.12] px-3.5 py-2
                dark:border-brand-gold/20
                dark:bg-brand-gold/[0.07]
              "
            >
              <span
                className="
                  text-[9px] font-bold uppercase tracking-[0.2em]
                  text-[#8A6200] dark:text-brand-gold
                "
              >
                GFA / Business intelligence
              </span>

              <span className="h-1 w-1 rounded-full bg-[#B88716]/70 dark:bg-brand-gold/60" />

              <span
                className="
                  text-[9px] font-medium uppercase tracking-wider
                  text-[#64748B] dark:text-white/50
                "
              >
                Admin overview
              </span>
            </div>

            <h2
              className="
                max-w-3xl font-brand-display text-[2.5rem]
                font-semibold leading-[1.06] tracking-[-0.045em]
                text-[#101827] sm:text-5xl lg:text-[3.8rem]
                dark:text-white
              "
            >
              Every connection.
              <br />

              <span className="relative inline-block">
                Every opportunity.
                <span
                  aria-hidden="true"
                  className="
                    absolute -bottom-1 left-0 h-[3px] w-[42%]
                    rounded-full bg-gradient-to-r
                    from-brand-electric to-brand-gold
                  "
                />
              </span>
            </h2>

            <p
              className="
                mt-5 max-w-xl text-sm leading-7
                text-[#536174] sm:text-base
                dark:text-white/55
              "
            >
              Everything happening behind the scenes, brought together
              in one clear view. Keep track of incoming enquiries,
              conversations, and your growing audience.
            </p>
          </div>

          <div
            className="
              relative w-full overflow-hidden rounded-2xl
              border border-[#DCE2EA] bg-white/80 p-4
              shadow-[0_12px_35px_rgba(15,23,42,0.055)]
              backdrop-blur-xl sm:max-w-[270px] lg:mb-1
              dark:border-white/10 dark:bg-white/[0.045]
              dark:shadow-none
            "
          >
            <div
              aria-hidden="true"
              className="
                absolute -right-12 -top-12 h-32 w-32
                rounded-full bg-brand-electric/[0.09] blur-3xl
                dark:bg-brand-electric/15
              "
            />

            <div className="relative flex items-center gap-3">
              <div
                className="
                  flex h-11 w-11 shrink-0 items-center
                  justify-center rounded-xl
                  border border-emerald-600/15
                  bg-emerald-50 text-emerald-700
                  dark:border-emerald-400/15
                  dark:bg-emerald-400/10 dark:text-emerald-400
                "
              >
                <Activity size={19} strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="
                    text-[9px] font-bold uppercase tracking-[0.16em]
                    text-[#7B8798] dark:text-white/40
                  "
                >
                  Workspace
                </p>

                <p className="mt-1 text-sm font-semibold text-[#152238] dark:text-white">
                  Engagement overview
                </p>
              </div>

              <ArrowUpRight
                size={17}
                className="shrink-0 text-[#8290A3] dark:text-white/35"
              />
            </div>

            <div
              className="
                mt-4 flex items-center justify-between
                border-t border-[#E5E9EF] pt-3
                dark:border-white/[0.08]
              "
            >
              <span className="text-[10px] text-[#7B8798] dark:text-white/40">
                Your GFA workspace
              </span>

              <span
                className="
                  inline-flex items-center gap-1.5
                  text-[10px] font-medium text-emerald-700
                  dark:text-emerald-400
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                Overview ready
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats section */}
        <div className="relative">
          {/* Section heading */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h3
                className="
                  text-[10px] font-bold uppercase tracking-[0.2em]
                  text-[#42536A] dark:text-white/65
                "
              >
                Engagement snapshot
              </h3>
            </div>

            <span className="text-[10px] font-medium tracking-wide text-[#8490A0] dark:text-white/35">
              ENQUIRIES <span className="mx-1 text-[#B88716] dark:text-brand-gold">/</span> AUDIENCE
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((stat, index) => (
              <motion.div
                key={stat.statSubtitle}
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 22 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : index * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  shouldReduceMotion ? undefined : { y: -5 }
                }
                className="group relative min-w-0"
              >
                <div
                  className={`absolute inset-x-5 top-0 z-20 h-[2px] rounded-full ${stat.statIconColor} opacity-70 transition-all duration-300 group-hover:inset-x-3 group-hover:opacity-100`}
                />

                <CardStats
                  statSubtitle={stat.statSubtitle}
                  statTitle={stat.statTitle}
                  statDescription={stat.statDescription}
                  statIcon={stat.statIcon}
                  statIconColor={stat.statIconColor}
                  loading={loading}
                />

                <span
                  className="
                    pointer-events-none absolute bottom-4 right-5 z-20
                    text-[9px] font-bold tracking-widest
                    text-[#64748B]/45 dark:text-white/15
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
