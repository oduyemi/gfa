export const inputClass = "w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-brand-electric focus:ring-2 focus:ring-brand-electric/10";

export const labelClass = "mb-2 block text-sm font-medium";

export const budgetOptions = [
"Not decided yet",
"Under £500",
"£500 – £1,000",
"£1,000 – £2,500",
"£2,500 – £5,000",
"£5,000 – £10,000",
"Above £10,000",
];

export const timelineOptions = [
"As soon as possible",
"Within 2–4 weeks",
"Within 1–3 months",
"Flexible",
"Just exploring",
];

export function FormField({
label,
name,
children,
optional = false,
}: {
label: string;
name: string;
children: React.ReactNode;
optional?: boolean;
}) {
return (
  <div>
    <label htmlFor={name} className={labelClass}>
      {label}
      {optional && (
        <span className="ml-1 font-normal text-muted-foreground">
          (optional)
        </span>
      )}
    </label>

    {children}
  </div>
);
}
