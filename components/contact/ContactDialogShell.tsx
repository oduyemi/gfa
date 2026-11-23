"use client";
import { useEffect } from "react";
import { X } from "lucide-react";


interface ContactDialogShellProps {
  open: boolean;
  onClose: () => void;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export const ContactDialogShell = ({
  open,
  onClose,
  eyebrow,
  title,
  description,
  children,
}: ContactDialogShellProps) => {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-obsidian-900/70 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-dialog-title"
        aria-describedby="contact-dialog-description"
        className="relative flex max-h-[94dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[2rem] border border-border bg-card shadow-2xl sm:max-h-[90dvh] sm:rounded-[2rem]"
      >
        {/* Header */}
        <div className="relative shrink-0 overflow-hidden border-b border-border px-6 pb-6 pt-7 sm:px-9 sm:pb-7 sm:pt-9">
          <div className="pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-brand-electric/10 blur-[80px]" />

          <div className="relative flex items-start justify-between gap-5">
            <div>
              <p className="brand-eyebrow">{eyebrow}</p>

              <h2
                id="contact-dialog-title"
                className="mt-3 font-brand-display text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                {title}
              </h2>

              <p
                id="contact-dialog-description"
                className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground"
              >
                {description}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close enquiry dialog"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition hover:bg-surface-subtle"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Form content */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-9 sm:py-8">
          {children}
        </div>
      </div>
    </div>
  );
}
