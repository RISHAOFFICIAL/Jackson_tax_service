import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-primary pr-4">{item.question}</span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}