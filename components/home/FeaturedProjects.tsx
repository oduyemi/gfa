"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import { HomeSection } from "./HomeSection";


export type Project = {
  title: string;
  category: string;
  summary: string;
  href: string;
  image?: string;
};

type FeaturedProjectsProps = {
  projects?: Project[];
};

export const FeaturedProjects = ({ projects = [] }: FeaturedProjectsProps) => {
  const reduceMotion = useReducedMotion();

  if (!projects.length) return null;

  const featured = projects[0];
  const secondary = projects.slice(1, 2);

  return (
    <HomeSection
      eyebrow="Selected work"
      title={
        <>
          Ideas in motion.{" "}
          <span className="brand-gradient-text">Work that matters.</span>
        </>
      }
      description="A closer look at selected collaborations, challenges, and outcomes."
      className="bg-surface-subtle"
    >
      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Featured project */}
        <motion.article
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="group relative flex min-h-[500px] flex-col overflow-hidden rounded-[2rem] bg-brand-obsidian"
        >
          <div className="absolute inset-0">
            {featured.image ? (
              <Image
                src={featured.image}
                alt={`${featured.title} project`}
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            ) : (
              <div className="size-full bg-[radial-gradient(ellipse_at_75%_20%,rgba(18,101,244,0.55),transparent_38%),radial-gradient(ellipse_at_15%_85%,rgba(244,190,40,0.13),transparent_35%),linear-gradient(135deg,#090a0c,#191c23)]" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5" />
          </div>

          <div className="relative z-10 flex flex-1 flex-col justify-between p-7 text-white sm:p-10">
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-white/20 bg-black/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/85 backdrop-blur-md">
                Featured project
              </span>

              <span className="text-xs font-semibold tracking-[0.12em] text-white/60">
                01 / 02
              </span>
            </div>

            <div className="max-w-xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
                {featured.category}
              </p>

              <h3 className="font-brand-display text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                {featured.title}
              </h3>

              <p className="mt-4 max-w-lg text-sm leading-7 text-white/70">
                {featured.summary}
              </p>

              <Link
                href={featured.href}
                className="group/link mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-white px-6 text-sm font-bold text-brand-obsidian transition-colors duration-300 hover:bg-brand-gold"
              >
                View project
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </motion.article>

        {/* Supporting project */}
        {secondary.length > 0 && (
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.55,
              delay: reduceMotion ? 0 : 0.12,
              ease: "easeOut",
            }}
            className="group flex flex-col overflow-hidden rounded-[2rem] border border-border bg-card"
          >
            <Link
              href={secondary[0].href}
              aria-label={`View ${secondary[0].title} project`}
              className="relative block aspect-[5/4] overflow-hidden bg-brand-obsidian"
            >
              {secondary[0].image ? (
                <Image
                  src={secondary[0].image}
                  alt={`${secondary[0].title} project`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 35vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-[radial-gradient(circle_at_70%_25%,rgba(18,101,244,.45),transparent_35%),linear-gradient(135deg,#090a0c,#191c23)]">
                  <span className="font-brand-display text-7xl font-semibold tracking-[-0.06em] text-white/20">
                    02
                  </span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              <span className="absolute right-6 top-6 flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md transition-colors group-hover:bg-brand-electric">
                <MoveUpRight size={19} />
              </span>
            </Link>

            <div className="flex flex-1 flex-col p-7 sm:p-8">
              <p className="brand-eyebrow">
                {secondary[0].category}
              </p>

              <h3 className="mt-3 font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {secondary[0].title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {secondary[0].summary}
              </p>

              <Link
                href={secondary[0].href}
                className="mt-auto inline-flex w-fit items-center gap-2 pt-7 text-sm font-bold text-brand-electric transition-colors hover:text-electric-700"
              >
                View project
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </motion.article>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Every project begins with an idea. The right collaboration moves it forward.
        </p>

        <Link
          href="/projects"
          className="group inline-flex w-fit items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-brand-electric"
        >
          Explore more work
          <ArrowUpRight
            size={17}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </HomeSection>
  );
}
