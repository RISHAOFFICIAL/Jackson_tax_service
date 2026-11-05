import { Link } from "wouter";
import { Phone, Mail, MapPin, Calendar, Upload } from "lucide-react";
import { Button } from "../ui/Button";

const CALENDLY = "https://calendly.com/ajackstaxservice";
const PORTAL = "https://kinlock.cloudtaxoffice.com/proavalon/CoreLink/Index?ReturnUrl=%2fproavalon";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-deep text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center">
                <span className="text-primary-deep font-bold text-base font-display">JT</span>
              </div>
              <p className="text-lg font-bold font-display">Jackson Tax Service</p>
            </div>
            <p className="text-white/60 text-[15px] leading-relaxed mb-6">
              Expert tax preparation and year-round support for individuals and
              businesses in Ferndale, Michigan and the metro Detroit area.
            </p>
            <div className="flex flex-col gap-2.5">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="sm" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </a>
              <a href={PORTAL} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/30"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Client Portal
                </Button>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-gold-light mb-5">
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "Bookkeeping", href: "/bookkeeping" },
                { label: "About Austin", href: "/about" },
                { label: "Resources", href: "/resources" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 hover:text-gold-light transition text-[15px]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-gold-light mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Individual Tax Returns", href: "/services" },
                { label: "Business Taxes", href: "/services" },
                { label: "Monthly Bookkeeping", href: "/bookkeeping" },
                { label: "Rapid Refunds", href: "/services" },
              ].map((service) => (
                <li key={service.label}>
                  <Link href={service.href} className="text-white/60 hover:text-gold-light transition text-[15px]">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-gold-light mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <a href="tel:313-427-4856" className="text-white/70 hover:text-gold-light transition text-[15px]">
                  313-427-4856
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <a href="mailto:ajackstaxservice@gmail.com" className="text-white/70 hover:text-gold-light transition text-[15px] break-all">
                  ajackstaxservice@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-[15px]">
                  1938 Burdette<br />
                  Ferndale, MI 48220
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            &copy; {currentYear} Jackson Tax Service. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/40 hover:text-gold-light transition text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/40 hover:text-gold-light transition text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
