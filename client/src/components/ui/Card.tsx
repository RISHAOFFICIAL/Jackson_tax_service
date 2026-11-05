import React from "react";
import { cn } from "../../lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export function Card({ className, children, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-2xl border border-line shadow-[0_1px_2px_rgba(22,38,63,0.05)] overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardProps) {
  return <div className={cn("px-6 py-4 border-b border-line", className)}>{children}</div>;
}

export function CardContent({ className, children }: CardProps) {
  return <div className={cn("px-6 py-4", className)}>{children}</div>;
}

export function CardFooter({ className, children }: CardProps) {
  return <div className={cn("px-6 py-4 border-t border-line", className)}>{children}</div>;
}
