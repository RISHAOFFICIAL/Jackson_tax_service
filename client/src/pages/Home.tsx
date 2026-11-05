import { Link } from "wouter";
import {
  FileText, Building2, BookOpen, Zap, Star, ShieldCheck, Clock, MapPin,
  CheckCircle, ChevronRight, Phone, Calendar, Upload, ArrowRight,
  GraduationCap, BadgeCheck,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Accordion } from "../components/ui/Accordion";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";

const CALENDLY = "https://calendly.com/ajackstaxservice";
const PORTAL = "https://kinlock.cloudtaxoffice.com/proavalon/CoreLink/Index?ReturnUrl=%2fproavalon";

const services = [
  {
    title: "Individual Tax Returns",
    description: "W-2 employees and 1099 contractors. Every deduction you deserve, none you don't.",
    price: "Starting at $150",
    icon: FileText,
    features: ["W-2 & 1099 filing", "Self-employment income", "Deduction optimization"],
  },
  {
    title: "Business Taxes",
    description: "LLCs, S-corps, and partnerships. Stay compliant and keep more of what you earn.",
    price: "Starting at $350",
    icon: Building2,
    features: ["Entity returns (1120, 1120-S, 1065)", "Quarterly estimates", "Year-round planning"],
  },
  {
    title: "Monthly Bookkeeping",
    description: "By our partner Lexis Sapphire Financial. Clean books every month, tax-ready year end.",
    price: "From $299/month",
    icon: BookOpen,
    features: ["Monthly reconciliation", "Expense tracking", "Simple monthly reports"],
    link: "/bookkeeping",
    linkLabel: "See bookkeeping plans",
  },
  {
    title: "Rapid Refunds",
    description: "Up to $7,000 advanced the same day your return is accepted.",
    price: "Call for details",
    icon: Zap,
    features: ["Same-day advance", "Direct deposit", "Terms and eligibility apply"],
  },
];

const trustSignals = [
  { icon: MapPin, label: "Ferndale, Michigan" },
  { icon: BadgeCheck, label: "5+ years experience" },
  { icon: Clock, label: "Same-day processing" },
  { icon: ShieldCheck, label: "Year-round support" },
];

const testimonials = [
  {
    name: "Sarah M.",
    detail: "Freelance designer, Detroit",
    content: "Austin made filing my taxes so easy. As a 1099 freelancer I was worried about getting it right, but he handled everything and found deductions I didn't know existed.",
  },
  {
    name: "James R.",
    detail: "Client for 3 years",
    content: "Three years running and I wouldn't go anywhere else. Professional, knowledgeable, and he gets me the best refund possible every single time.",
  },
  {
    name: "Maria L.",
    detail: "Small business owner",
    content: "The bookkeeping service has been a game-changer for my business. Everything is organized and tax-ready. Worth every penny.",
  },
];

const faqItems = [
  {
    question: "What documents do I need for tax preparation?",
    answer: "Bring your W-2s, 1099s, last year's return, a photo ID, Social Security numbers for dependents, and bank info for direct deposit. Anything else income or deduction related helps too.",
  },
  {
    question: "How long does it take to get my refund?",
    answer: "With e-filing and direct deposit, most refunds arrive within 21 days. Need it faster? Rapid Refund can advance up to $7,000 the same day your return is accepted.",
  },
  {
    question: "Do you work with clients outside Ferndale?",
    answer: "Yes. We serve the full metro Detroit area in person, and clients anywhere in the US virtually. Upload documents through the client portal and meet over video.",
  },
  {
    question: "What types of businesses do you work with?",
    answer: "Sole proprietors, LLCs, S-corporations, C-corporations, and partnerships. Our partner Lexis Sapphire Financial also handles monthly bookkeeping year-round.",
  },
  {
    question: "Do I have to come into the office?",
    answer: "No. Upload your documents securely through the client portal, book a virtual consultation, and we'll prepare everything remotely. In-person appointments are available in Ferndale too.",
  },
];

const steps = [
  {
    step: "01",
    title: "Share your documents",
    description: "Upload everything securely through the client portal, or bring it to our Ferndale office.",
  },
  {
    step: "02",
    title: "Austin prepares your return",
    description: "Every deduction reviewed, every credit checked. You'll approve the return before it's filed.",
  },
  {
    step: "03",
    title: "Get your refund fast",
    description: "E-filed with direct deposit, or advanced same-day with Rapid Refund up to $7,000.",
  },
];

export default function Home() {
  return (
    <div>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-primary-deep">
        <div className="absolute inset-0 hero-navy" />
        <div className="absolute inset-0 texture-diagonal" />
        <div className="absolute top-0 left-0 right-0 gold-rule-top" />
        {/* Gold glow accents */}
        <div className="absolute -top-32 left-[8%] h-96 w-96 rounded-full bg-gold/15 blur-[120px]" />
        <div className="absolute bottom-0 right-[-5%] h-[26rem] w-[26rem] rounded-full bg-gold/[0.07] blur-[110px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
            <div className="animate-hero">
              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold-light px-4 py-2 rounded-full text-sm font-semibold mb-8">
                <ShieldCheck className="w-4 h-4" />
                Serving Metro Detroit since 2020
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-[5.25rem] font-semibold leading-[1.02] tracking-tight mb-7">
                <span className="text-white">Taxes done right,</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-light italic">
                  without the stress.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl mb-10">
                Expert tax preparation and year-round bookkeeping for individuals
                and businesses in Ferndale, Michigan — and clients everywhere,
                virtually.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                  <Button variant="gold" size="lg" className="text-lg px-10 py-4">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Free Consultation
                  </Button>
                </a>
                <a href={PORTAL} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-10 py-4 border-white/25 bg-white/5 text-white hover:bg-white/10 hover:border-gold/50 backdrop-blur"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Client Portal
                  </Button>
                </a>
              </div>

              {/* Social proof */}
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gold fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-white/70">Five-star client reviews</span>
                </div>
                <span className="hidden sm:block w-px h-5 bg-white/15" />
                <a href="tel:313-427-4856" className="flex items-center gap-2 text-sm font-bold text-white hover:text-gold-light transition">
                  <Phone className="w-4 h-4 text-gold" />
                  313-427-4856
                </a>
              </div>
            </div>

            {/* Booking card — white pops against navy */}
            <div className="animate-hero" style={{ animationDelay: "150ms" }}>
              <div className="relative bg-white rounded-3xl p-8 sm:p-10 overflow-hidden shadow-[0_40px_90px_-20px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold-dark mb-4">
                    Get started
                  </p>
                  <h2 className="text-2xl sm:text-[1.75rem] font-semibold text-primary mb-3">
                    Your refund is waiting.
                  </h2>
                  <p className="text-muted mb-8 leading-relaxed">
                    Book a free consultation. We'll review your situation and
                    map out the fastest path to your refund.
                  </p>
                  <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="block mb-4">
                    <Button variant="gold" size="lg" className="w-full">
                      <Calendar className="w-5 h-5 mr-2" />
                      Schedule Online
                    </Button>
                  </a>
                  <a
                    href="tel:313-427-4856"
                    className="block text-center text-primary/70 hover:text-gold-dark font-semibold transition"
                  >
                    or call 313-427-4856
                  </a>

                  <div className="mt-8 pt-7 border-t border-line grid grid-cols-3 gap-4">
                    {[
                      { value: "5+", label: "Years serving Detroit" },
                      { value: "$7k", label: "Max same-day advance" },
                      { value: "100%", label: "Virtual-friendly" },
                    ].map((s) => (
                      <div key={s.label}>
                        <p className="text-[1.7rem] font-bold text-gold-dark font-display">{s.value}</p>
                        <p className="text-xs text-muted mt-1 leading-snug">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust signals */}
          <div className="mt-16 pt-9 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-5">
            {trustSignals.map((s) => (
              <div key={s.label} className="flex items-center gap-3.5">
                <span className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-5 h-5 text-gold-light" />
                </span>
                <span className="text-[15px] font-semibold text-white/85">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="py-24 lg:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title="Everything your taxes need, in one place"
              subtitle="Transparent pricing, no surprises. Pick what fits, or book a free consult and we'll point you the right way."
            />
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 80} className="h-full">
                <Card className="relative h-full p-7 flex flex-col overflow-hidden hover:shadow-[0_24px_60px_-20px_rgba(22,38,63,0.3)] hover:-translate-y-1.5 transition-all duration-300 group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-primary to-primary-deep border border-gold/20 flex items-center justify-center mb-5 shadow-[0_8px_20px_-8px_rgba(22,38,63,0.5)]">
                    <service.icon className="w-6 h-6 text-gold" />
                  </span>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gold-dark font-bold text-[15px] mb-3">{service.price}</p>
                  <p className="text-muted text-[15px] leading-relaxed mb-5">{service.description}</p>
                  <ul className="space-y-2.5 mb-6">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-ink/80">
                        <CheckCircle className="w-[18px] h-[18px] text-gold-dark flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {service.link && (
                    <Link
                      href={service.link}
                      className="mt-auto inline-flex items-center text-sm font-bold text-gold-dark hover:text-primary transition"
                    >
                      {service.linkLabel}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  )}
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <Link href="/services">
              <Button variant="primary" size="lg">
                Explore all services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Bookkeeping spotlight ---------- */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-primary-deep gold-hairline px-8 py-14 sm:px-14 lg:px-20">
              <div className="absolute inset-0 texture-dots opacity-70" />
              <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-gold/15 blur-[90px]" />
              <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-gold/10 blur-[80px]" />
              <div className="absolute top-0 left-0 right-0 gold-rule-top" />
              <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
                <div>
                  <p className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-gold-light mb-5">
                    <span className="h-px w-8 bg-gold-light/60" aria-hidden />
                    Partner spotlight
                  </p>
                  <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] font-semibold text-white mb-5">
                    Monthly bookkeeping,{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold">
                      handled for you.
                    </span>
                  </h2>
                  <p className="text-white/70 text-lg leading-relaxed mb-2 max-w-xl">
                    Our partner <span className="text-white font-semibold">Lexis Sapphire Financial</span> keeps
                    your books clean every month, so you always know what you made — and tax time is a
                    folder, not a shoebox.
                  </p>
                  <p className="text-gold-light font-bold text-lg mb-8">Plans from $299/month</p>
                  <div className="flex flex-wrap gap-3.5">
                    <Link href="/bookkeeping">
                      <Button variant="gold" size="lg">
                        See bookkeeping plans
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { title: "Monthly reconciliation", desc: "Every account, balanced" },
                    { title: "Simple monthly report", desc: "Know what you made" },
                    { title: "Tax-ready year end", desc: "A clean package for your preparer" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4 bg-white/[0.05] border border-gold/20 rounded-2xl p-5 backdrop-blur-sm">
                      <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white font-semibold">{item.title}</p>
                        <p className="text-white/55 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="py-24 lg:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="Three steps to your refund"
              subtitle="No paperwork marathons. No confusing portals. Just a clear path from documents to dollars."
            />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((item, i) => (
              <Reveal key={item.step} delay={i * 100} className="h-full">
                <div className="group relative h-full bg-white rounded-3xl border border-line p-8 overflow-hidden hover:shadow-[0_24px_60px_-24px_rgba(22,38,63,0.3)] hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <p className="font-display text-7xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-gold/50 to-gold/10 mb-5">{item.step}</p>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Testimonials ---------- */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Client stories"
              title="Detroit trusts Jackson Tax"
              subtitle="Real clients, real refunds, real peace of mind."
            />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 90} className="h-full">
                <Card className="relative h-full p-8 flex flex-col overflow-hidden hover:shadow-[0_24px_60px_-24px_rgba(22,38,63,0.3)] hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                  <div className="flex gap-1 mb-5" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="w-[18px] h-[18px] text-gold fill-current" />
                    ))}
                  </div>
                  <p className="text-ink/85 leading-relaxed mb-6 flex-1 text-[17px]">“{t.content}”</p>
                  <div className="flex items-center gap-3">
                    <span className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-deep border border-gold/30 flex items-center justify-center text-gold font-bold font-display text-lg">
                      {t.name.charAt(0)}
                    </span>
                    <div>
                      <p className="font-bold text-primary text-[15px]">{t.name}</p>
                      <p className="text-sm text-faint">{t.detail}</p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Join the team ---------- */}
      <section className="py-24 lg:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Careers"
                title="Want to learn the tax business?"
                subtitle="Hands-on training from Austin Jackson, year-round — not just a seasonal crash course. Earn certificates through the student portal and build a real skill."
                className="mb-8"
              />
              <div className="flex flex-wrap gap-3.5">
                <Link href="/login">
                  <Button variant="primary" size="lg">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Join the student portal
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Ask about training
                  </Button>
                </Link>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="bg-white rounded-3xl border border-line p-8 sm:p-10">
                <ul className="space-y-6">
                  {[
                    { title: "Learn by doing", desc: "Real returns, real clients, real guidance from Austin." },
                    { title: "Train year-round", desc: "Tax law changes constantly. Stay sharp all year, not just in April." },
                    { title: "Earn certificates", desc: "Document your skills through the student portal as you progress." },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-4">
                      <span className="w-11 h-11 rounded-2xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-gold-dark" />
                      </span>
                      <div>
                        <p className="font-bold text-primary">{item.title}</p>
                        <p className="text-muted text-[15px]">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="FAQ"
              title="Questions, answered"
              subtitle="Everything you need to know before you book."
            />
          </Reveal>
          <Reveal delay={80}>
            <Accordion items={faqItems} />
          </Reveal>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="relative overflow-hidden bg-primary-deep">
        <div className="absolute inset-0 hero-navy" />
        <div className="absolute inset-0 texture-diagonal" />
        <div className="absolute top-0 left-0 right-0 gold-rule-top" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-[42rem] rounded-full bg-gold/10 blur-[130px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
          <Reveal>
            <p className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.24em] text-gold-light mb-6">
              <span className="h-px w-8 bg-gold-light/60" aria-hidden />
              Free consultation
              <span className="h-px w-8 bg-gold-light/60" aria-hidden />
            </p>
            <h2 className="text-4xl sm:text-6xl font-semibold text-white mb-7 tracking-tight">
              Ready when{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-light italic">
                you are.
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-white/65 mb-11 max-w-2xl mx-auto leading-relaxed">
              Book online in under a minute, or call and talk to a real person.
              Either way, your refund gets the attention it deserves.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="lg" className="text-lg px-10 py-4">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book appointment
                </Button>
              </a>
              <a href="tel:313-427-4856">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-10 py-4 border-white/25 bg-white/5 text-white hover:bg-white/10 hover:border-gold/50 backdrop-blur"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  313-427-4856
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
