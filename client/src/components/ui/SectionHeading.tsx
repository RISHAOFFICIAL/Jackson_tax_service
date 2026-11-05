import { cn } from "../../lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  /** Set when the heading sits on a dark (navy) background. */
  light?: boolean;
  className?: string;
}

/**
 * Clean section header: small-caps gold eyebrow, serif display title,
 * and an optional subtitle. No decorative motifs — whitespace does the work.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div className={cn("mb-12 max-w-2xl lg:mb-16", center && "mx-auto text-center", className)}>
      <p
        className={cn(
          "text-xs font-bold uppercase tracking-[0.24em]",
          light ? "text-gold-light" : "text-gold-dark"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-4 text-3xl font-semibold sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]",
          light ? "text-white" : "text-primary"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-5 text-lg leading-relaxed", light ? "text-white/70" : "text-muted")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
