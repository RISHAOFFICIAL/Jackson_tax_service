import React from "react";
import { Phone, Calendar } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Sticky Mobile CTA Bar (mobile only) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-gray-200 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-2 gap-2 p-2">
          <a
            href="tel:313-427-4856"
            className="flex items-center justify-center bg-primary text-white py-3 rounded-lg font-semibold text-sm"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call Now
          </a>
          <a
            href="https://calendly.com/ajackstaxservice"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gold text-primary py-3 rounded-lg font-semibold text-sm"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </a>
        </div>
      </div>
    </div>
  );
}