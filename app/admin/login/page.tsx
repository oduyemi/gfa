"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@teispace/next-themes";
import {
  ArrowRight,
  ArrowUpRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Moon,
  Sun,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

export default function Login() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isDark = theme === "dark";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email address and password.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
          password,
          rememberMe,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to sign in. Please try again.");
      }

      router.replace("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#F5F4EF] text-[#17191F] transition-colors duration-300 dark:bg-background dark:text-foreground">
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-48 -top-56 h-[650px] w-[650px] rounded-full bg-[#DCE8FF]/70 blur-[130px] dark:bg-brand-electric/[0.07]" />

        <div className="absolute -bottom-64 right-[-8rem] h-[600px] w-[600px] rounded-full bg-[#F8EAC4]/60 blur-[140px] dark:bg-brand-gold/[0.06]" />

        <div className="absolute inset-0 opacity-[0.025] brand-grid dark:opacity-[0.025]" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col px-5 sm:px-8 lg:px-14">
        {/* Header */}
        <header className="flex items-center justify-between py-6 sm:py-8">
          <Link
            href="/"
            aria-label="Go Far Agency home"
            className="group flex items-center gap-3"
          >
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-brand-obsidian shadow-lg shadow-black/10">
              <Image
                src="/images/logo/logo.svg"
                alt=""
                width={5979}
                height={3991}
                priority
                sizes="44px"
                className="h-full w-full scale-[1.12] object-contain transition-transform duration-300 group-hover:scale-[1.2]"
              />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-tl-md bg-brand-gold" />
            </div>

            <div className="leading-none">
              <p className="font-heading text-lg font-extrabold tracking-tight text-[#17191F] dark:text-white/50">
                GO FAR<span className="text-brand-electric">.</span>
              </p>
              <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-[#777B83] dark:text-white/50">
                Agency
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-[#777B83] dark:text-white/50 sm:block">
              Internal workspace
            </span>

            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E2E0D8] bg-white/80 text-[#555B66] shadow-sm backdrop-blur-sm transition hover:border-brand-electric hover:text-brand-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-2 dark:border-border dark:bg-card dark:text-white/50 dark:shadow-none"
            >
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </div>
        </header>

        {/* Main */}
        <section className="grid flex-1 items-center gap-12 pb-12 pt-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-16 lg:pt-8">
          {/* Brand panel */}
          <div className="relative flex flex-col justify-center lg:py-10">
            <div className="mb-8 flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#1556C8] dark:text-white/40 sm:text-[11px]">
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

            <p className="mt-8 max-w-[490px] text-sm leading-7 text-[#686D76] dark:text-white/50 sm:text-base sm:leading-8">
              A shared space for the people and ideas moving Go Far Agency
              forward. Sign in to manage your work, stay connected and keep
              things moving.
            </p>

            <div className="relative mt-12 hidden max-w-[510px] sm:block">
              <div className="relative isolate flex min-h-[158px] items-center overflow-hidden rounded-2xl border border-[#E6E4DC] bg-white/75 px-7 py-6 shadow-[0_12px_40px_-30px_rgba(30,40,65,0.22)] backdrop-blur-sm dark:border-border dark:bg-card dark:shadow-none">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 opacity-40 brand-grid dark:opacity-60"
                />

                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-24 h-64 w-64 rotate-45 rounded-[3rem] border-[24px] border-brand-electric/[0.10] dark:border-brand-electric/[0.12]"
                />

                <div
                  aria-hidden="true"
                  className="absolute -right-4 -top-16 h-48 w-48 rotate-45 rounded-[2.5rem] border border-brand-gold/50 dark:border-brand-gold/40"
                />

                <div className="relative flex items-center gap-4">
                  <div>
                    <p className="font-heading text-base font-bold text-[#17191F] dark:text-brand-gold">
                      Think bigger.
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#777B83] dark:text-white/50">
                      Create with purpose. Deliver with impact.
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-5 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-brand-gold text-brand-obsidian">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:justify-self-end">
            <div className="mx-auto w-full max-w-[450px]">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-[#E8E6DF] bg-white p-6 shadow-[0_24px_80px_-32px_rgba(30,40,65,0.20)] sm:p-9 lg:p-10 dark:border-border dark:bg-card dark:shadow-premium-lg">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-electric via-brand-electric/60 to-brand-gold" />
                <div className="mb-8">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF0FF] text-[#1556C8] dark:bg-brand-electric/10 dark:text-brand-electric">
                    <LockKeyhole size={21} />
                  </div>

                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1556C8] dark:text-brand-electric">
                    GFA Workspace
                  </p>

                  <h2 className="font-heading text-3xl font-bold tracking-[-0.04em] text-[#17191F] dark:text-foreground sm:text-[2.1rem]">
                    Welcome back<span className="text-brand-gold">.</span>
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#777B83] dark:text-white/50">
                    Sign in to pick up where you left off.
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="mb-6 flex items-start gap-3 rounded-xl border border-danger/20 bg-danger-surface p-4 text-sm text-danger"
                  >
                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                    <span className="leading-6">{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-bold text-[#30343B] dark:text-foreground"
                    >
                      Email address
                    </label>

                    <div className="group relative">
                      <Mail
                        size={17}
                        aria-hidden="true"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#969AA2] transition-colors group-focus-within:text-brand-electric dark:text-white/50"
                      />

                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="username"
                        inputMode="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError("");
                        }}
                        placeholder="you@company.com"
                        required
                        disabled={loading}
                        className="h-[52px] w-full rounded-xl border border-[#E5E4DE] bg-[#FAFAF8] pl-11 pr-4 text-sm text-[#242831] outline-none transition placeholder:text-[#A5A8AE] hover:border-[#B9C9E8] focus:border-brand-electric focus:bg-white focus:ring-4 focus:ring-brand-electric/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-input dark:bg-background dark:text-foreground dark:placeholder:text-muted-foreground/50 dark:hover:border-brand-electric/40 dark:focus:bg-background"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <label
                        htmlFor="password"
                        className="text-xs font-bold text-[#30343B] dark:text-foreground"
                      >
                        Password
                      </label>

                      <Link
                        href="/admin/forgot-password"
                        className="text-xs font-semibold text-[#1556C8] transition hover:text-electric-700 hover:underline dark:text-brand-electric"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <div className="group relative">
                      <LockKeyhole
                        size={17}
                        aria-hidden="true"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#969AA2] transition-colors group-focus-within:text-brand-electric dark:text-white/50"
                      />

                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (error) setError("");
                        }}
                        placeholder="Enter your password"
                        required
                        disabled={loading}
                        className="h-[52px] w-full rounded-xl border border-[#E5E4DE] bg-[#FAFAF8] pl-11 pr-12 text-sm text-[#242831] outline-none transition placeholder:text-[#A5A8AE] hover:border-[#B9C9E8] focus:border-brand-electric focus:bg-white focus:ring-4 focus:ring-brand-electric/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-input dark:bg-background dark:text-foreground dark:placeholder:text-muted-foreground/50 dark:hover:border-brand-electric/40 dark:focus:bg-background"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                        disabled={loading}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#969AA2] transition hover:text-brand-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric disabled:opacity-50 dark:text-white/50"
                      >
                        {showPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember me */}
                  <label className="flex cursor-pointer items-center gap-3 py-1">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={loading}
                      className="h-4 w-4 cursor-pointer rounded border-[#D7D7D2] accent-brand-electric focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-2"
                    />
                    <span className="text-xs text-[#777B83] dark:text-white/50">
                      Keep me signed in
                    </span>
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-brand-electric px-5 text-sm font-bold text-white shadow-lg shadow-brand-electric/20 transition duration-200 hover:-translate-y-0.5 hover:bg-electric-700 hover:shadow-brand-electric/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle size={18} className="animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Continue to workspace
                        <ArrowRight
                          size={17}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </form>

                {/* Security note */}
                <div className="mt-8 flex items-start gap-3 border-t border-[#ECEBE6] pt-6 dark:border-border">
                  <div>
                    <p className="mt-1 text-[11px] leading-5 text-[#858994] dark:text-black/50">
                      This area is reserved for authorised Go Far Agency team
                      members.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-center text-[11px] text-[#858994] dark:text-white/50">
                Need help accessing your account?{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-[#1556C8] transition hover:underline dark:text-brand-electric"
                >
                  Get in touch
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
