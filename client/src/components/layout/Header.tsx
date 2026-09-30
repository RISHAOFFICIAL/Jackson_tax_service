import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Calendar, Upload, LogIn, GraduationCap, Shield } from "lucide-react";
import { Button } from "../ui/Button";
import { useAuth } from "../../lib/auth";
import { cn } from "../../lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-gold font-bold text-lg">JT</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-primary">Jackson Tax</span>
              <span className="text-xl font-bold text-gold"> Service</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  location === link.href
                    ? "text-gold bg-gold/10"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* Persistent CTAs */}
            <div className="flex items-center gap-2 ml-3">
              <a
                href="https://calendly.com/ajackstaxservice"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="gold" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
              </a>
              <a href="tel:313-427-4856">
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Call 313-427-4856
                </Button>
              </a>
            </div>

            {/* Auth links */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 ml-4">
                <Link href="/student-portal">
                  <Button variant="ghost" size="sm">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    {user?.name}
                  </Button>
                </Link>
                {isAdmin && (
                  <Link href="/admin">
                    <Button variant="ghost" size="sm">
                      <Shield className="w-4 h-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login" className="ml-4">
                <Button variant="ghost" size="sm">
                  <LogIn className="w-4 h-4 mr-2" />
                  Student Login
                </Button>
              </Link>
            )}
          </nav>

          {/* Action buttons (visible on tablet) */}
          <div className="hidden md:flex lg:hidden items-center space-x-2">
            <a
              href="https://calendly.com/ajackstaxservice"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="gold" size="sm">
                <Calendar className="w-4 h-4 mr-1" />
                Schedule
              </Button>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  location === link.href
                    ? "text-gold bg-gold/10"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-100 space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/student-portal"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-primary hover:bg-gray-50"
                  >
                    <GraduationCap className="w-4 h-4 inline mr-2" />
                    My Portal
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-lg text-sm font-medium text-primary hover:bg-gray-50"
                    >
                      <Shield className="w-4 h-4 inline mr-2" />
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-primary hover:bg-gray-50"
                >
                  <LogIn className="w-4 h-4 inline mr-2" />
                  Student Login
                </Link>
              )}

              <a
                href="https://calendly.com/ajackstaxservice"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="gold" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
              </a>
              <a
                href="https://kinlock.cloudtaxoffice.com/proavalon/CoreLink/Index?ReturnUrl=%2fproavalon"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Client Portal
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}