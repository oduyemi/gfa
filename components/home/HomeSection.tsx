import type { ReactNode } from "react";


type HomeSectionProps = {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  className?: string;
  children?: ReactNode;
  id?: string;
  centered?: boolean;
};


export const HomeSection = ({
  eyebrow,
  title,
  description,
  className = "",
  children,
  id,
  centered = false,
}: HomeSectionProps) => {
  const hasHeader = eyebrow || title || description;

  return (
    <section
      id={id}
      className={`relative py-20 sm:py-24 lg:py-28 ${className}`}
    >
      <div className="brand-container">
        {hasHeader && (
          <div
            className={`mb-11 max-w-2xl ${
              centered ? "mx-auto text-center" : ""
            }`}
          >
            {eyebrow && (
              <p className="brand-eyebrow mb-4">{eyebrow}</p>
            )}

            {title && (
              <h2 className="font-heading text-3xl font-semibold leading-[1.12] tracking-[-0.045em] text-foreground sm:text-4xl lg:text-[3.25rem]">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                {description}
              </p>
            )}
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
