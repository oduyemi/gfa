"use client";
import { ContactDialogShell } from "@/components/contact/ContactDialogShell";
import { DigitalCreationForm } from "@/components/forms/DigitalCreation";
import { DigitalExecutionForm } from "@/components/forms/DigitalExecution";
import { VirtualAssistanceForm } from "@/components/forms/VirtualAssistance";
import { GeneralContactForm } from "@/components/forms/General";

export type ContactOptionType =
  | "creation"
  | "execution"
  | "assistance"
  | "general";

interface ContactDialogProps {
  type: ContactOptionType | null;
  onClose: () => void;
}

const dialogContent = {
  creation: {
    eyebrow: "Digital Creation",
    title: "Let's create something.",
    description:
      "Tell us about the idea, project, or creative work you'd like to bring to life.",
  },
  execution: {
    eyebrow: "Digital Execution",
    title: "Let's move your business forward.",
    description:
      "Share your goals, challenges, and where you'd like your business to go.",
  },
  assistance: {
    eyebrow: "Managed Virtual Assistance",
    title: "Let's lighten the load.",
    description:
      "Tell us what you need help managing and what a little extra support would make possible.",
  },
  general: {
    eyebrow: "General Enquiry",
    title: "Let's start a conversation.",
    description:
      "Have a question, an idea, or something else in mind? Tell us a little about it. We'd love to hear from you.",
  },
};

export function ContactDialog({
  type,
  onClose,
}: ContactDialogProps) {
  if (!type) return null;

  const content = dialogContent[type];

  return (
    <ContactDialogShell
      open={Boolean(type)}
      onClose={onClose}
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
    >
      {type === "creation" && <DigitalCreationForm />}

      {type === "execution" && <DigitalExecutionForm />}

      {type === "assistance" && <VirtualAssistanceForm />}

      {type === "general" && <GeneralContactForm />}
    </ContactDialogShell>
  );
}
