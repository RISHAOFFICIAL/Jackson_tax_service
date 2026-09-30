import { Link } from "wouter";
import { Phone, Mail, MapPin, Calendar, Upload, Linkedin, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-lg">JT</span>
              </div>
              <div>
                <span className="text-lg font-bold text-white">Jackson Tax</span>
                <span className="text-lg font-bold text-gold"> Service</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Expert tax preparation and year-round support for individuals and businesses in 
              Ferndale, Michigan and surrounding areas.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold/20 transition">
                <Facebook className="w-5 h-5 text-gold" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold/20 transition">
                <Instagram className="w-5 h-5 text-gold" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gold/20 transition">
                <Linkedin className="w-5 h-5 text-gold" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/services" },
                { label: "About Austin", href: "/about" },
                { label: "Resources", href: "/resources" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-gold transition text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold">Services</h3>
            <ul className="space-y-3">
              {[
                "Individual Tax Returns",
                "Business Taxes",
                "Year-Round Bookkeeping",
                "Rapid Refunds",
              ].map((service) => (
                <li key={service}>
                  <Link href="/services" className="text-gray-300 hover:text-gold transition text-sm">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gold">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <a href="tel:313-427-4856" className="text-gray-300 hover:text-gold transition text-sm">
                  313-427-4856
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <a href="mailto:ajackstaxservice@gmail.com" className="text-gray-300 hover:text-gold transition text-sm break-all">
                  ajackstaxservice@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  1938 Burdette<br />
                  Ferndale, MI 48220
                </span>
              </li>
            </ul>

            <div className="mt-6 space-y-2">
              <a
                href="https://calendly.com/ajackstaxservice"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gold text-primary px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-gold-light transition w-full justify-center"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Appointment</span>
              </a>
              <a
                href="https://kinlock.cloudtaxoffice.com/proavalon/CoreLink/Index?ReturnUrl=%2fproavalon"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-white/10 text-white px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/20 transition w-full justify-center"
              >
                <Upload className="w-4 h-4" />
                <span>Client Portal</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-xs mb-4">
            <Link href="/contact" className="hover:text-gold transition">
              Website designed &amp; built by Jackson Tax Service
            </Link>
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Jackson Tax Service. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gold transition text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-gold transition text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}