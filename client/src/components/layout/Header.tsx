import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Calendar, Upload, LogIn, GraduationCap, Shield } from "lucide-react";
import { Button } from "../ui/Button";
import { useAuth } from "../../lib/auth";
import { cn } from "../../lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/bookkeeping", label: "Bookkeeping" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

const CALENDLY = "https://calendly.com/ajackstaxservice";
const PORTAL = "https://kinlock.cloudtaxoffice.com/proavalon/CoreLink/Index?ReturnUrl=%2fproavalon";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-gold font-bold text-base font-display">JT</span>
            </div>
            <div className="leading-tight">
              <p className="text-[17px] font-bold text-primary font-display">Jackson Tax Service</p>
              <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-faint">
                Ferndale, Michigan
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full text-[15px] font-medium transition-colors",
                  location === link.href
                    ? "text-primary bg-surface"
                    : "text-muted hover:text-primary hover:bg-surface"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            <a href={PORTAL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Client Portal
              </Button>
            </a>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
              <Button variant="gold" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
            </a>
            {isAuthenticated ? (
              <div className="flex items-center gap-1 ml-1">
                <Link href="/student-portal">
                  <Button variant="ghost" size="sm">
                    <GraduationCap className="w-4 h-4 mr-1.5" />
                    {user?.name}
                  </Button>
                </Link>
                {isAdmin && (
                  <Link href="/admin">
                    <Button variant="ghost" size="sm">
                      <Shield className="w-4 h-4 mr-1.5" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login" className="ml-1">
                <Button variant="ghost" size="sm">
                  <LogIn className="w-4 h-4 mr-1.5" />
                  Student Login
                </Button>
              </Link>
            )}
          </div>

          {/* Tablet CTA */}
          <div className="hidden md:flex lg:hidden items-center">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
              <Button variant="gold" size="sm">
                <Calendar className="w-4 h-4 mr-1.5" />
                Book
              </Button>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 rounded-xl hover:bg-surface text-primary"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-line bg-white">
          <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-xl text-[15px] font-medium transition-colors",
                  location === link.href
                    ? "text-primary bg-surface"
                    : "text-muted hover:text-primary hover:bg-surface"
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-line space-y-2.5">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="gold" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </a>
              <a href={PORTAL} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Client Portal
                </Button>
              </a>
              <a href="tel:313-427-4856" className="block">
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Call 313-427-4856
                </Button>
              </a>
              {isAuthenticated ? (
                <>
                  <Link href="/student-portal" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-primary hover:bg-surface">
                    <GraduationCap className="w-4 h-4 inline mr-2" />
                    My Portal
                  </Link>
                  {isAdmin && (
                    <Link href="/admin" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-primary hover:bg-surface">
                      <Shield className="w-4 h-4 inline mr-2" />
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-primary hover:bg-surface">
                  <LogIn className="w-4 h-4 inline mr-2" />
                  Student Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
