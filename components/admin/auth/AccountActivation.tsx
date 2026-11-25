
"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@teispace/next-themes";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LoaderCircle,
  LockKeyhole,
  MailCheck,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
  AlertCircle,
} from "lucide-react";

type PageStatus = "initializing" | "ready" | "error";

export const AccountActivation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme, setTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const token = searchParams.get("token");
  const startedRef = useRef(false);

  const [pageStatus, setPageStatus] = useState<PageStatus>("initializing");
  const [pageMessage, setPageMessage] = useState("");

  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);

  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const [activated, setActivated] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(3);

  const isDark = theme === "dark";

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const transition = {
    duration: shouldReduceMotion ? 0 : 0.45,
    ease: "easeOut" as const,
  };

  // Validate invitation and initialise account setup.
  useEffect(() => {
    if (startedRef.current) return;

    startedRef.current = true;

    if (!token) {
      setPageStatus("error");
      setPageMessage(
        "Your activation link is invalid. Please contact your administrator for a new invitation."
      );
      return;
    }

    const startSetup = async () => {
      try {
        const response = await fetch("/api/auth/start-setup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Unable to start account activation."
          );
        }

        setPageStatus("ready");
      } catch (error) {
        setPageStatus("error");
        setPageMessage(
          error instanceof Error
            ? error.message
            : "Your activation link is invalid or has expired."
        );
      }
    };

    startSetup();
  }, [token]);

  // Verify invitation OTP.
  const handleVerifyOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOtpError("");

    if (!/^\d{6}$/.test(otp)) {
      setOtpError("Enter the six-digit verification code.");
      return;
    }

    setOtpLoading(true);

    try {
      const response = await fetch("/api/auth/verify-invitation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (typeof data.remainingAttempts === "number") {
          setRemainingAttempts(data.remainingAttempts);
        }

        throw new Error(data.error || "Unable to verify your code.");
      }

      setPasswordDialogOpen(true);
    } catch (error) {
      setOtpError(
        error instanceof Error
          ? error.message
          : "Verification failed. Please try again."
      );
    } finally {
      setOtpLoading(false);
    }
  };

  // Complete account setup.
  const handleCompleteSetup = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setPasswordError("");

    if (password.length < 12 || password.length > 128) {
      setPasswordError(
        "Your password must be between 12 and 128 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Your passwords do not match.");
      return;
    }

    setPasswordLoading(true);

    try {
      const response = await fetch("/api/auth/complete-setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to complete account setup."
        );
      }

      setPasswordDialogOpen(false);
      setActivated(true);
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setPasswordError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  // Redirect after successful activation.
  useEffect(() => {
    if (!activated) return;

    if (redirectCountdown <= 0) {
      router.replace("/login?activated=success");
      return;
    }

    const timeout = window.setTimeout(() => {
      setRedirectCountdown((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, [activated, redirectCountdown, router]);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  // Shared page shell.
  const PageShell = ({
    children,
  }: {
    children: React.ReactNode;
  }) => (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F5F4EF] text-[#17191F] transition-colors duration-300 dark:bg-background dark:text-white/40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-48 -top-56 size-[650px] rounded-full bg-[#DCE8FF]/70 blur-[130px] dark:bg-brand-electric/[0.07]" />
        <div className="absolute -bottom-64 right-[-8rem] size-[600px] rounded-full bg-[#F8EAC4]/60 blur-[140px] dark:bg-brand-gold/[0.06]" />
        <div className="absolute inset-0 opacity-[0.025] brand-grid" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col px-5 sm:px-8 lg:px-14">
        <header className="flex items-center justify-between py-6 sm:py-8">
          <Link
            href="/"
            aria-label="Go Far Agency home"
            className="group flex items-center gap-3"
          >
            <div className="relative flex size-11 items-center justify-center overflow-hidden rounded-xl bg-brand-obsidian shadow-lg shadow-black/10">
              <Image
                src="/images/logo/logo.svg"
                alt=""
                width={5979}
                height={3991}
                priority
                sizes="44px"
                className="size-full scale-[1.12] object-contain transition-transform duration-300 group-hover:scale-[1.2]"
              />
              <span className="absolute bottom-0 right-0 size-2.5 rounded-tl-md bg-brand-gold" />
            </div>

            <div className="leading-none">
              <p className="font-heading text-lg font-extrabold tracking-tight text-[#17191F] dark:text-white/50">
                GO FAR<span className="text-brand-electric">.</span>
              </p>
              <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-[#777B83] dark:text-gray-400">
                Agency
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-[#777B83] dark:text-gray-400 sm:block">
              Internal workspace
            </span>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              className="flex size-10 items-center justify-center rounded-full border border-[#E2E0D8] bg-white/80 text-[#555B66] shadow-sm backdrop-blur-sm transition hover:border-brand-electric hover:text-brand-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-2 dark:border-border dark:bg-card dark:text-gray-300 dark:shadow-none"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </header>

        {children}

        <footer className="flex flex-col gap-3 border-t border-[#E5E3DC] py-5 text-[10px] text-[#858994] dark:border-border dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Go Far Agency. All rights reserved.
          </p>

          <p className="flex items-center gap-2">
            Built to move ideas forward.
            <span className="font-bold text-[#1556C8] dark:text-brand-electric">
              GFA.
            </span>
          </p>
        </footer>
      </div>
    </main>
  );

  // Shared brand panel.
  const BrandPanel = () => (
    <div className="relative flex flex-col justify-center lg:py-10">
      <div className="mb-8 flex items-center gap-3">
        <span className="h-px w-9 bg-brand-electric" />
        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#1556C8] dark:text-brand-electric sm:text-[11px]">
          Creativity. Strategy. Execution.
        </span>
      </div>

      <h1 className="max-w-3xl font-heading text-[clamp(3.5rem,7.5vw,7rem)] font-bold leading-[0.94] tracking-[-0.075em] text-[#17191F] dark:text-white/50">
        Good ideas
        <br />
        deserve to
        <br />
        <span className="relative inline-block text-[#1556C8] dark:text-brand-electric">
          go further.
          <span className="absolute -bottom-1 left-0 h-[5px] w-[72%] rounded-full bg-brand-gold sm:h-[7px]" />
        </span>
      </h1>

      <p className="mt-8 max-w-[490px] text-sm leading-7 text-[#686D76] dark:text-gray-300 sm:text-base sm:leading-8">
        The right people, expertise and opportunities can make all the
        difference. Let's get your workspace ready so you can be part of
        what moves us forward.
      </p>

      <div className="relative mt-12 hidden max-w-[510px] sm:block">
        <div className="relative isolate flex min-h-[158px] items-center overflow-hidden rounded-2xl border border-[#E6E4DC] bg-white/75 px-7 py-6 shadow-[0_12px_40px_-30px_rgba(30,40,65,0.22)] backdrop-blur-sm dark:border-border dark:bg-card dark:shadow-none">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-40 brand-grid dark:opacity-60"
          />

          <div
            aria-hidden="true"
            className="absolute -right-10 -top-24 size-64 rotate-45 rounded-[3rem] border-[24px] border-brand-electric/[0.10] dark:border-brand-electric/[0.12]"
          />

          <div
            aria-hidden="true"
            className="absolute -right-4 -top-16 size-48 rotate-45 rounded-[2.5rem] border border-brand-gold/50"
          />

          <div className="relative flex items-center gap-4">
            <div>
              <p className="font-heading text-base font-bold text-[#17191F] dark:text-brand-gold">
                Think bigger.
              </p>
              <p className="mt-1 text-xs leading-5 text-[#777B83] dark:text-gray-300">
                Create with purpose. Deliver with impact.
              </p>
            </div>
          </div>

          <div className="absolute bottom-5 right-6 flex size-9 items-center justify-center rounded-full bg-brand-gold text-brand-obsidian">
            <ArrowUpRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );

  // Shared card heading.
  const StepHeading = ({
    eyebrow,
    title,
    description,
  }: {
    eyebrow: string;
    title: string;
    description: string;
  }) => (
    <div className="mb-8">
      <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-[#EAF0FF] text-[#1556C8] dark:bg-brand-electric/10 dark:text-brand-electric">
        <ShieldCheck size={22} />
      </div>

      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1556C8] dark:text-brand-electric">
        {eyebrow}
      </p>

      <h2 className="font-heading text-2xl font-bold tracking-[-0.04em] text-[#17191F] dark:text-white/50 sm:text-[2rem]">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-[#777B83] dark:text-gray-300">
        {description}
      </p>
    </div>
  );

  // Loading state.
  if (pageStatus === "initializing") {
    return (
      <PageShell>
        <section className="flex flex-1 items-center justify-center py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={transition}
            className="flex flex-col items-center text-center"
          >
            <div className="relative flex size-16 items-center justify-center rounded-2xl bg-brand-electric/10 text-brand-electric">
              <LoaderCircle className="size-7 animate-spin" />
            </div>

            <h1 className="mt-6 font-heading text-xl font-bold text-[#17191F] dark:text-white/50">
              Preparing your account
            </h1>

            <p className="mt-2 max-w-xs text-sm leading-6 text-[#777B83] dark:text-gray-300">
              Please wait while we verify your invitation and prepare your
              workspace.
            </p>
          </motion.div>
        </section>
      </PageShell>
    );
  }

  // Invitation error.
  if (pageStatus === "error") {
    return (
      <PageShell>
        <section className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <BrandPanel />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={transition}
            className="mx-auto w-full max-w-[450px] rounded-[1.75rem] border border-[#E8E6DF] bg-white p-7 text-center shadow-[0_24px_80px_-32px_rgba(30,40,65,0.20)] sm:p-10 dark:border-border dark:bg-card dark:shadow-premium-lg"
          >
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
              <X className="size-8" />
            </div>

            <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.22em] text-red-500">
              Account invitation
            </p>

            <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-[#17191F] dark:text-[#555555]">
              Invitation unavailable.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#686D76] dark:text-[#555555]">
              {pageMessage}
            </p>

            <div className="mt-7 rounded-xl border border-[#EAE8E1] bg-[#FAFAF8] p-4 text-left dark:border-border dark:bg-background">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-brand-electric" />
                <p className="text-xs leading-6 text-[#686D76] dark:text-black">
                  If you believe this is a mistake, please contact your
                  administrator and request a new invitation.
                </p>
              </div>
            </div>

            <Link
              href="/admin/login"
              className="mt-7 inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#1556C8] transition hover:gap-3 dark:text-brand-electric"
            >
              Return to login
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </section>
      </PageShell>
    );
  }

  // Successful activation.
  if (activated) {
    return (
      <PageShell>
        <section className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <BrandPanel />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={transition}
            className="mx-auto w-full max-w-[450px] rounded-[1.75rem] border border-[#E8E6DF] bg-white p-7 text-center shadow-[0_24px_80px_-32px_rgba(30,40,65,0.20)] sm:p-10 dark:border-border dark:bg-card dark:shadow-premium-lg"
          >
            <div className="relative mx-auto flex size-20 items-center justify-center rounded-[1.6rem] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-10" />

              <span className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full border-4 border-white bg-brand-gold text-brand-obsidian dark:border-card">
                <Check size={13} strokeWidth={3} />
              </span>
            </div>

            <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
              Account activated
            </p>

            <h2 className="mt-3 font-heading text-3xl font-bold tracking-[-0.04em] text-[#17191F] dark:text-white/50">
              You're all set.
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#686D76] dark:text-gray-300">
              Your account has been successfully activated. You can now sign
              in using your email address and new password.
            </p>

            <div className="mt-8 rounded-2xl border border-[#EAE8E1] bg-[#FAFAF8] p-5 dark:border-border dark:bg-background">
              <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[#30343B] dark:text-white/50">
                <LoaderCircle className="size-4 animate-spin text-brand-electric" />
                Redirecting to login
              </div>

              <p className="mt-2 font-heading text-3xl font-bold tabular-nums text-[#1556C8] dark:text-brand-electric">
                0{redirectCountdown}
              </p>

              <p className="mt-1 text-xs text-[#858994] dark:text-gray-400">
                seconds remaining
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.replace("/login?activated=success")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-electric px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-electric/20 transition hover:-translate-y-0.5 hover:bg-electric-700"
            >
              Continue to login
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </section>
      </PageShell>
    );
  }

  return (
    <>
      <PageShell>
        <section className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-12">
          <BrandPanel />

          {/* Verification card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={transition}
            className="mx-auto w-full max-w-[470px]"
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#858994] dark:text-gray-400">
                Account activation
              </p>

              <span className="inline-flex items-center gap-2 rounded-full border border-[#DDE6F8] bg-[#EDF3FF] px-3 py-1.5 text-[10px] font-bold text-[#1556C8] dark:border-brand-electric/20 dark:bg-brand-electric/10 dark:text-brand-electric">
                <span className="size-1.5 rounded-full bg-brand-electric" />
                Step 01 of 02
              </span>
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-[#E8E6DF] bg-white shadow-[0_24px_80px_-32px_rgba(30,40,65,0.20)] dark:border-border dark:bg-card dark:shadow-premium-lg">
              <div className="h-1 bg-[#E9EDF5] dark:bg-border">
                <div className="h-full w-1/2 rounded-r-full bg-brand-electric" />
              </div>

              <div className="p-6 sm:p-9">
                <StepHeading
                  eyebrow="Verify your invitation"
                  title="Let's confirm it's you."
                  description="Enter the six-digit verification code sent to your email address to activate your account."
                />

                <div className="mb-8 flex items-start gap-4 rounded-2xl border border-[#E8ECF5] bg-[#F5F7FC] p-4 dark:border-border dark:bg-background">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#E5EDFF] text-[#1556C8] dark:bg-brand-electric/10 dark:text-brand-electric">
                    <MailCheck size={21} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#30343B] dark:text-gray-100">
                      Check your inbox
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#777B83] dark:text-gray-300">
                      Your invitation email contains your unique verification
                      code. Enter it below to continue.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleVerifyOtp}>
                  <div className="mb-3 flex items-center justify-between">
                    <label
                      htmlFor="invitation-otp"
                      className="text-sm font-bold text-[#30343B] dark:text-gray-100"
                    >
                      Verification code
                    </label>

                    <span className="text-[10px] font-medium uppercase tracking-wider text-[#858994] dark:text-gray-400">
                      6 digits
                    </span>
                  </div>

                  <input
                    id="invitation-otp"
                    name="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    value={otp}
                    onChange={(event) => {
                      setOtp(
                        event.target.value.replace(/\D/g, "").slice(0, 6)
                      );
                      setOtpError("");
                    }}
                    placeholder="000000"
                    disabled={otpLoading}
                    required
                    className="h-[68px] w-full rounded-2xl border border-[#E1E2E5] bg-[#FAFAF8] px-4 text-center font-mono text-2xl font-bold tracking-[0.65em] text-[#17191F] outline-none transition placeholder:text-[#C5C7CB] hover:border-[#B9C9E8] focus:border-brand-electric focus:bg-white focus:ring-4 focus:ring-brand-electric/10 disabled:opacity-60 dark:border-input dark:bg-background dark:text-white/50 dark:placeholder:text-gray-600 dark:focus:bg-background sm:text-3xl"
                  />

                  {/* OTP progress */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <span
                          key={index}
                          className={`h-1 w-5 rounded-full transition-colors ${
                            otp.length > index
                              ? "bg-brand-electric"
                              : "bg-[#E5E5E0] dark:bg-border"
                          }`}
                        />
                      ))}
                    </div>

                    <span className="text-[10px] font-medium tabular-nums text-[#858994] dark:text-gray-400">
                      {otp.length}/6 entered
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    {otpError && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-500/15 bg-red-500/[0.06] p-3 text-sm text-red-600 dark:text-red-400"
                      >
                        <AlertCircle className="mt-0.5 size-4 shrink-0" />
                        <span>{otpError}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {remainingAttempts !== null && (
                    <p className="mt-3 text-xs text-[#777B83] dark:text-gray-300">
                      {remainingAttempts} verification{" "}
                      {remainingAttempts === 1 ? "attempt" : "attempts"}{" "}
                      remaining.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={otpLoading || otp.length !== 6}
                    className="group mt-7 flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-brand-electric px-5 text-sm font-bold text-white shadow-lg shadow-brand-electric/20 transition hover:-translate-y-0.5 hover:bg-electric-700 hover:shadow-brand-electric/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {otpLoading ? (
                      <>
                        <LoaderCircle className="size-4 animate-spin" />
                        Verifying code...
                      </>
                    ) : (
                      <>
                        Verify invitation
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-7 flex items-start gap-3 border-t border-[#ECEBE6] pt-6 dark:border-border">
                  <ShieldCheck className="mt-0.5 size-[18px] shrink-0 text-[#B58A16] dark:text-brand-gold" />
                  <p className="text-[11px] leading-5 text-[#777B83] dark:text-gray-300">
                    Your invitation is protected. If you have trouble
                    verifying your account, contact your administrator for
                    assistance.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-[11px] text-[#858994] dark:text-gray-400">
              Secure account activation
              <span className="mx-2 text-brand-gold">•</span>
              Go Far Agency
            </p>
          </motion.div>
        </section>
      </PageShell>

      {/* Password setup dialog */}
      <AnimatePresence>
        {passwordDialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#090A0C]/70 px-4 py-8 backdrop-blur-md"
            onMouseDown={(event) => {
              if (
                event.target === event.currentTarget &&
                !passwordLoading
              ) {
                setPasswordDialogOpen(false);
              }
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : 24,
                scale: shouldReduceMotion ? 1 : 0.97,
              }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : 16,
                scale: shouldReduceMotion ? 1 : 0.98,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.25,
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="password-dialog-title"
              className="relative my-auto w-full max-w-[460px] overflow-hidden rounded-[1.75rem] border border-[#E8E6DF] bg-white shadow-2xl dark:border-border dark:bg-card"
            >
              <div className="h-1 bg-gradient-to-r from-brand-electric via-brand-electric/60 to-brand-gold" />

              <div className="p-6 sm:p-9">
                <div className="mb-7 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 size={13} />
                    Verification successful
                  </span>

                  <button
                    type="button"
                    onClick={() => setPasswordDialogOpen(false)}
                    disabled={passwordLoading}
                    aria-label="Close password setup dialog"
                    className="flex size-9 items-center justify-center rounded-full text-[#858994] transition hover:bg-[#F0F0EC] hover:text-[#17191F] disabled:opacity-50 dark:text-gray-400 dark:hover:bg-surface-subtle dark:hover:text-foreground"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-[#EAF0FF] text-[#1556C8] dark:bg-brand-electric/10 dark:text-brand-electric">
                  <KeyRound className="size-6" />
                </div>

                <h2
                  id="password-dialog-title"
                  className="font-heading text-2xl font-bold tracking-[-0.04em] text-[#17191F] dark:text-white/50 sm:text-[1.8rem]"
                >
                  Create your password.
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#777B83] dark:text-gray-300">
                  One last step. Choose a secure password to complete your
                  account activation.
                </p>

                <form
                  onSubmit={handleCompleteSetup}
                  className="mt-7 space-y-5"
                >
                  {/* New password */}
                  <div>
                    <label
                      htmlFor="new-password"
                      className="mb-2 block text-xs font-bold text-[#30343B] dark:text-gray-100"
                    >
                      New password
                    </label>

                    <div className="group relative">
                      <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#969AA2] transition-colors group-focus-within:text-brand-electric dark:text-gray-400" />

                      <input
                        id="new-password"
                        name="new-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value);
                          setPasswordError("");
                        }}
                        minLength={12}
                        maxLength={128}
                        required
                        disabled={passwordLoading}
                        placeholder="Enter a new password"
                        className="h-[52px] w-full rounded-xl border border-[#E5E4DE] bg-[#FAFAF8] pl-11 pr-12 text-sm text-[#242831] outline-none transition placeholder:text-[#A5A8AE] hover:border-[#B9C9E8] focus:border-brand-electric focus:bg-white focus:ring-4 focus:ring-brand-electric/10 disabled:opacity-60 dark:border-input dark:bg-background dark:text-white/50 dark:placeholder:text-gray-400 dark:focus:bg-background"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                        disabled={passwordLoading}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#969AA2] transition hover:text-brand-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric dark:text-gray-400"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>

                    <p className="mt-2 text-[11px] text-[#858994] dark:text-gray-400">
                      Use between 12 and 128 characters.
                    </p>
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="mb-2 block text-xs font-bold text-[#30343B] dark:text-gray-100"
                    >
                      Confirm password
                    </label>

                    <div className="group relative">
                      <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#969AA2] transition-colors group-focus-within:text-brand-electric dark:text-gray-400" />

                      <input
                        id="confirm-password"
                        name="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(event) => {
                          setConfirmPassword(event.target.value);
                          setPasswordError("");
                        }}
                        maxLength={128}
                        required
                        disabled={passwordLoading}
                        placeholder="Confirm your password"
                        className="h-[52px] w-full rounded-xl border border-[#E5E4DE] bg-[#FAFAF8] pl-11 pr-12 text-sm text-[#242831] outline-none transition placeholder:text-[#A5A8AE] hover:border-[#B9C9E8] focus:border-brand-electric focus:bg-white focus:ring-4 focus:ring-brand-electric/10 disabled:opacity-60 dark:border-input dark:bg-background dark:text-white/50 dark:placeholder:text-gray-400 dark:focus:bg-background"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword((current) => !current)
                        }
                        aria-label={
                          showConfirmPassword
                            ? "Hide confirm password"
                            : "Show confirm password"
                        }
                        aria-pressed={showConfirmPassword}
                        disabled={passwordLoading}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#969AA2] transition hover:text-brand-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric dark:text-gray-400"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Password feedback */}
                  <AnimatePresence mode="wait">
                    {passwordError && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        role="alert"
                        className="flex items-start gap-2.5 rounded-xl border border-red-500/15 bg-red-500/[0.06] p-3 text-sm text-red-600 dark:text-red-400"
                      >
                        <AlertCircle className="mt-0.5 size-4 shrink-0" />
                        <span>{passwordError}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {password && confirmPassword && (
                    <p
                      className={`flex items-center gap-2 text-xs font-medium ${
                        password === confirmPassword
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-[#858994] dark:text-gray-400"
                      }`}
                    >
                      {password === confirmPassword ? (
                        <>
                          <Check className="size-4" />
                          Passwords match.
                        </>
                      ) : (
                        <>
                          <AlertCircle className="size-4" />
                          Passwords do not match yet.
                        </>
                      )}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={
                      passwordLoading ||
                      password.length < 12 ||
                      password.length > 128 ||
                      password !== confirmPassword
                    }
                    className="group flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-brand-electric px-5 text-sm font-bold text-white shadow-lg shadow-brand-electric/20 transition hover:-translate-y-0.5 hover:bg-electric-700 hover:shadow-brand-electric/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {passwordLoading ? (
                      <>
                        <LoaderCircle className="size-4 animate-spin" />
                        Activating account...
                      </>
                    ) : (
                      <>
                        Activate my account
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 flex items-start gap-3 border-t border-[#ECEBE6] pt-5 dark:border-border">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#B58A16] dark:text-brand-gold" />
                  <p className="text-[11px] leading-5 text-[#777B83] dark:text-gray-300">
                    Choose a password that is unique to your account. Your
                    credentials are handled securely.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
