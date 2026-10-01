import { Link } from "wouter";
import {
  FileText, Building2, BookOpen, Zap, Star, Shield, Clock, CalendarCheck,
  CheckCircle, ChevronRight, Phone, Calendar, Upload,
  GraduationCap, Award,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Accordion } from "../components/ui/Accordion";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Swash } from "../components/ui/Swash";

const services = [
  {
    title: "Individual Tax Returns",
    description: "W-2 employees & 1099 contractors. Maximize your refund with expert filing.",
    price: "Starting at $150",
    icon: FileText,
    features: ["W-2 & 1099 Filing", "Self-Employment", "Deduction Optimization"],
  },
  {
    title: "Business Taxes",
    description: "LLCs, corporations & partnerships. Keep your business compliant.",
    price: "Starting at $350",
    icon: Building2,
    features: ["LLC & Corporate Filing", "Quarterly Estimates", "Business Deductions"],
  },
  {
    title: "Year-Round Bookkeeping",
    description: "Professional bookkeeping to keep your finances organized all year.",
    price: "Starting at $200/month",
    icon: BookOpen,
    features: ["Monthly Reconciliation", "Expense Tracking", "Financial Reports"],
  },
  {
    title: "Rapid Refunds",
    description: "Up to $7,000 advanced the same day your return is accepted.",
    price: "Up to $7,000 advance",
    icon: Zap,
    features: ["Same-Day Processing", "Up to $7,000 Advance", "Direct Deposit"],
  },
];

const trustSignals = [
  { icon: Shield, text: "BBB Accredited" },
  { icon: Star, text: "5 Years Experience" },
  { icon: Clock, text: "Same-Day Processing" },
  { icon: CalendarCheck, text: "Year-Round Availability" },
];

const testimonials = [
  {
    name: "Sarah M.",
    content: "Austin made filing my taxes so easy! As a freelance graphic designer, I was worried about my 1099 forms, but he handled everything professionally.",
    rating: 5,
  },
  {
    name: "James R.",
    content: "I've been going to Jackson Tax Service for 3 years now. Always professional, knowledgeable, and get me the best refund possible.",
    rating: 5,
  },
  {
    name: "Maria L.",
    content: "Their bookkeeping service has been a game-changer for my small business. Everything is organized and tax-ready. Worth every penny!",
    rating: 5,
  },
];

const faqItems = [
  {
    question: "What documents do I need for tax preparation?",
    answer: "Please bring your W-2s, 1099s, last year's tax return, identification, Social Security cards for dependents, bank account info for direct deposit, and any other income or deduction documents.",
  },
  {
    question: "How long does it take to get my refund?",
    answer: "With electronic filing and direct deposit, most refunds are processed within 21 days. With our Rapid Refund service, you can get up to $7,000 advanced the same day.",
  },
  {
    question: "Do you offer year-round support?",
    answer: "Yes! We provide year-round support for all our clients. Whether you have questions about tax notices or need help with quarterly estimates, we're here to help. Call us at 313-427-4856.",
  },
  {
    question: "What types of businesses do you work with?",
    answer: "We work with all business types including sole proprietors, LLCs, S-Corporations, C-Corporations, and partnerships. We also provide bookkeeping services year-round.",
  },
  {
    question: "Do you offer virtual tax services?",
    answer: "Yes! We offer both in-person and virtual tax preparation. Upload your documents online, schedule a virtual consultation via Calendly, and we'll prepare your taxes remotely.",
  },
  {
    question: "How do I upload my tax documents?",
    answer: "You can upload your documents securely through our client portal. Simply click the 'Client Portal' button on our website and follow the instructions.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-primary overflow-hidden">
        {/* Layered designed background */}
        <div className="absolute inset-0 bg-[radial-gradient(130%_130%_at_85%_-10%,#2a3f6a_0%,#1a2a4a_45%,#0f1d38_100%)]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-[0.07]" />
        <div className="absolute -top-32 -right-24 h-[36rem] w-[36rem] rounded-full bg-gold/10 blur-[110px]" />
        <div className="absolute -bottom-44 -left-32 h-[32rem] w-[32rem] rounded-full bg-gold/5 blur-[100px]" />

        {/* Concentric "seal" rings — recurring trust motif */}
        <div className="pointer-events-none absolute right-[-10%] top-1/2 hidden -translate-y-1/2 lg:block">
          <svg viewBox="0 0 500 500" className="h-[620px] w-[620px] text-gold/15" aria-hidden="true">
            <circle cx="250" cy="250" r="245" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="250" cy="250" r="200" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="250" cy="250" r="155" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="250" cy="250" r="110" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="250" cy="250" r="65" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="250" cy="5" r="4" fill="currentColor" />
            <circle cx="495" cy="250" r="4" fill="currentColor" />
            <circle cx="250" cy="495" r="4" fill="currentColor" />
            <circle cx="5" cy="250" r="4" fill="currentColor" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-hero">
              <div className="inline-flex items-center bg-gold/15 text-gold px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-gold/25">
                <Shield className="w-4 h-4 mr-2" />
                BBB Accredited Business
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-6">
                Expert Tax Preparation,{" "}
                <span className="relative inline-block text-gold">
                  Year-Round Support
                  <Swash className="absolute -bottom-4 left-0 h-3.5 w-32" />
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
                Professional tax preparation and bookkeeping services for individuals and businesses
                in Ferndale, Michigan. Let us help you maximize your refund and stay compliant.
              </p>

              {/* Social proof — 5 stars anchored to the 3 existing 5-star client testimonials.
                  Owner will supply the real Google rating/review count later.
                  PLACEHOLDER: {{GOOGLE_RATING_COUNT}} — e.g. "4.9 ({{GOOGLE_RATING_COUNT}} reviews on Google)". */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex" aria-label="Rated 5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gold fill-current" />
                  ))}
                </div>
                <span className="text-gray-300 text-sm font-medium">
                  Five-star reviews from our clients
                </span>
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {trustSignals.map((signal) => (
                  <div key={signal.text} className="flex items-center space-x-2 text-gray-200 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                    <signal.icon className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="text-sm font-medium">{signal.text}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a href="https://calendly.com/ajackstaxservice" target="_blank" rel="noopener noreferrer">
                  <Button variant="gold" size="lg">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule a Consultation
                  </Button>
                </a>
                <a href="https://kinlock.cloudtaxoffice.com/proavalon/CoreLink/Index?ReturnUrl=%2fproavalon" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-primary">
                    <Upload className="w-5 h-5 mr-2" />
                    Client Portal
                  </Button>
                </a>
              </div>
            </div>

            {/* Hero CTA Card */}
            <div className="hidden lg:block animate-hero" style={{ animationDelay: "140ms" }}>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/15 border border-gold/25 mb-5">
                    <Phone className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Ready to Get Started?</h3>
                  <p className="text-gray-300">Call us or book online today</p>
                </div>
                <a
                  href="tel:313-427-4856"
                  className="block text-center text-2xl font-bold text-gold mb-6 hover:text-gold-light transition"
                >
                  313-427-4856
                </a>
                <a
                  href="https://calendly.com/ajackstaxservice"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gold text-primary text-center font-semibold py-4 rounded-xl hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                  Book Free Consultation
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Our Services"
              title="Our Services"
              subtitle="Comprehensive tax and financial services tailored to your needs"
            />
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 90} className="h-full">
                <Card className="group relative h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold to-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                      <service.icon className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                    <p className="text-gold font-semibold text-base mb-4">{service.price}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-gray-500">
                          <CheckCircle className="w-4 h-4 text-gold mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <Link href="/services">
              <Button variant="primary" size="lg">
                View All Services
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="How It Works"
              title="Getting Your Taxes Done Is Simple"
              subtitle="Three easy steps to get your return prepared and your refund on the way"
            />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Upload Your Documents",
                description: "Securely upload your documents through the Client Portal.",
              },
              {
                step: "2",
                title: "Austin Prepares Your Return",
                description: "Austin reviews your documents and prepares your return.",
              },
              {
                step: "3",
                title: "Get Your Refund Fast",
                description: "Get your refund fast — up to $7,000 advanced with Rapid Refund.",
              },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 100} className="h-full">
                <Card className="text-center h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-gold font-bold text-xl font-display">{item.step}</span>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join My Team Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-light to-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <SectionHeading
                align="left"
                light
                eyebrow="Join My Team"
                title="Want to Join My Team?"
                subtitle="Looking to build a career in tax preparation? Learn the tax business from the ground up with hands-on, real-world training from Austin Jackson — with year-round support and a clear path to certification."
                className="mb-6"
              />
              <ul className="space-y-4">
                {[
                  { icon: GraduationCap, text: "Hands-on training from Austin Jackson" },
                  { icon: CalendarCheck, text: "Year-round training, not just tax season" },
                  { icon: Award, text: "Earn completion certificates through the student portal" },
                ].map((item) => (
                  <li key={item.text} className="flex items-start">
                    <span className="w-10 h-10 bg-gold/15 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      <item.icon className="w-5 h-5 text-gold" />
                    </span>
                    <span className="text-gray-200 text-lg">{item.text}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120} className="lg:pl-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-3">Ready to learn?</h3>
                <p className="text-gray-300 mb-6">
                  Create a student portal account to start training today.
                </p>
                <div className="space-y-4">
                  <Link href="/login" className="block">
                    <Button variant="gold" size="lg" className="w-full">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      Join the Student Portal
                    </Button>
                  </Link>
                  <Link href="/contact" className="block">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-white/30 text-white hover:bg-white hover:text-primary"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Contact Austin
                    </Button>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Google Business Profile Embed */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Trust Matters"
              title="What Our Clients Say"
              subtitle="Check out our reviews on Google"
            />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100} className="h-full">
                <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex mb-3">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-gold fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">"{t.content}"</p>
                    <p className="font-semibold text-primary">- {t.name}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          {/* Google Map and Reviews Embed */}
          <Reveal>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">G</span>
                    </div>
                    <span className="font-semibold text-gray-700">Google Business Profile</span>
                  </div>
                  <a
                    href="https://www.google.com/maps/place/1938+Burdette,+Ferndale,+MI+48220"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View all reviews →
                  </a>
                </div>
              </div>
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2940.5!2d-83.1342!3d42.4609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824c4b5a5b5b5b5%3A0x5b5b5b5b5b5b5b5b!2s1938+Burdette%2C+Ferndale%2C+MI+48220!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "300px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Jackson Tax Service Location"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Got Questions?"
              title="Frequently Asked Questions"
              subtitle="Everything you need to know about our tax services"
            />
          </Reveal>
          <Reveal delay={80}>
            <Accordion items={faqItems} />
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <Swash className="h-3.5 w-32 mx-auto mb-6" />
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Schedule your free consultation today and let us help you achieve your financial goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://calendly.com/ajackstaxservice" target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                </Button>
              </a>
              <a href="tel:313-427-4856">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-primary">
                  <Phone className="w-5 h-5 mr-2" />
                  Call 313-427-4856
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
