import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-light hover:-translate-y-0.5 hover:shadow-lg focus:ring-primary",
    secondary:
      "bg-surface text-ink hover:bg-line focus:ring-gray-300",
    outline:
      "border border-line bg-white text-primary hover:border-primary hover:bg-surface focus:ring-primary",
    ghost: "text-primary hover:bg-surface focus:ring-primary",
    gold:
      "bg-gradient-to-b from-gold-light via-gold to-gold-dark text-primary-deep hover:from-gold hover:via-gold hover:to-gold-dark hover:text-white hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(193,154,61,0.65)] focus:ring-gold shadow-[0_12px_30px_-10px_rgba(193,154,61,0.55)] font-bold",
  };
  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-9 py-4 text-lg",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
