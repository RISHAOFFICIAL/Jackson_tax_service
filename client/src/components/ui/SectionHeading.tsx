import { cn } from "../../lib/utils";
import { Swash } from "./Swash";

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
 * Reusable section header: small-caps eyebrow flanked by gold rules, a serif
 * display title, and the signature swash motif underneath.
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
    <div className={cn("mb-14 max-w-2xl", center && "mx-auto text-center", className)}>
      <div className={cn("flex items-center gap-3", center && "justify-center")}>
        <span className={cn("h-px w-8 bg-gold/70")} />
        <span
          className={cn(
            "text-sm font-semibold uppercase tracking-[0.22em]",
            light ? "text-gold" : "text-gold-dark"
          )}
        >
          {eyebrow}
        </span>
        <span className={cn("h-px w-8 bg-gold/70")} />
      </div>
      <h2
        className={cn(
          "mt-4 text-3xl font-bold sm:text-4xl",
          light ? "text-white" : "text-primary"
        )}
      >
        {title}
      </h2>
      <Swash className={cn("mt-4 h-3.5 w-32", center && "mx-auto")} />
      {subtitle && (
        <p className={cn("mt-5 text-lg", light ? "text-gray-300" : "text-gray-600")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
