import { cn } from "../../lib/utils";

/**
 * Signature "swash" motif — a gold rule with a centered diamond and a small
 * curl at the right end. Reused under section headings and in the hero so the
 * page reads as one designed system rather than a stack of blocks.
 */
export function Swash({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-gold", className)}
      aria-hidden="true"
    >
      <line
        x1="2"
        y1="8"
        x2="52"
        y2="8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="88"
        y1="8"
        x2="126"
        y2="8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M70 2.5 L76 8 L70 13.5 L64 8 Z" fill="currentColor" />
      <path
        d="M126 8 C 131 8, 132 5, 130 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
