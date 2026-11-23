
import {
    Clock3,
    Layers3,
    Repeat2,
  } from "lucide-react";
  
  export const models = [
    {
      id: "digital-creation",
      number: "01",
      category: "Project-based",
      title: "Digital Creation",
      description: "For defined projects with a clear beginning and finish.",
      commitment: "50%",
      commitmentLabel: "Initial deposit",
      payment: "Project-based payment",
      paymentDescription:
        "A deposit secures your project and gets the work underway. The remaining balance follows the agreed payment schedule.",
      points: [
        "Scope and deliverables agreed upfront",
        "Clear timeline and project milestones",
        "Balance paid according to agreed terms",
      ],
      idealFor:
        "One-off creative, design and digital projects with defined deliverables.",
      href: "/contact?service=digital-creation",
      icon: Layers3,
      accent: "blue",
    },
    {
      id: "digital-execution",
      number: "02",
      category: "Retainer-based",
      title: "Digital Execution",
      description: "For ongoing strategy, implementation and growth support.",
      commitment: "03+",
      commitmentLabel: "Months minimum",
      payment: "Recurring retainer",
      paymentDescription:
        "A monthly engagement gives us the consistency to plan, execute, measure and refine the work over time.",
      points: [
        "Strategy and scope agreed together",
        "Ongoing implementation and optimisation",
        "Regular progress reviews and reporting",
      ],
      idealFor:
        "Businesses that need consistent digital support and a strategic partner.",
      href: "/contact?service=digital-execution",
      icon: Repeat2,
      accent: "gold",
    },
    {
      id: "virtual-assistance",
      number: "03",
      category: "Hourly / Packages",
      title: "Managed Virtual Assistance",
      description: "For flexible operational and administrative support.",
      commitment: "10–30",
      commitmentLabel: "Hours per package",
      payment: "Upfront payment",
      paymentDescription:
        "Choose a support package around your workload. Payment is made before the agreed support period begins.",
      points: [
        "Tasks and priorities agreed upfront",
        "Hourly support or packaged hours",
        "Payment confirmed before work begins",
      ],
      idealFor:
        "Busy founders and teams who need reliable help with day-to-day tasks.",
      href: "/contact?service=virtual-assistance",
      icon: Clock3,
      accent: "rose",
    },
  ] as const;
  
  export const process = [
    {
      number: "01",
      title: "Agree on the work",
      description: "We understand your needs and define the scope.",
    },
    {
      number: "02",
      title: "Confirm the terms",
      description: "We align on timelines, payment and expectations.",
    },
    {
      number: "03",
      title: "Get started",
      description: "Once everything is in place, work begins.",
    },
  ] as const;
  
  export const accentStyles = {
    blue: {
      text: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-500",
      soft: "bg-blue-500/10",
      border: "border-blue-500/25",
      ring: "ring-blue-500/20",
    },
    gold: {
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-400",
      soft: "bg-amber-400/10",
      border: "border-amber-400/30",
      ring: "ring-amber-400/20",
    },
    rose: {
      text: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-500",
      soft: "bg-rose-500/10",
      border: "border-rose-500/25",
      ring: "ring-rose-500/20",
    },
  } as const;
  