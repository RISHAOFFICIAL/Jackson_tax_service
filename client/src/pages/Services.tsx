import { Link } from "wouter";
import { CheckCircle, ArrowRight, FileText, Building2, BookOpen, Zap, Calendar } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";

const CALENDLY = "https://calendly.com/ajackstaxservice";

const servicesDetail = [
  {
    title: "Individual Tax Returns",
    icon: FileText,
    tagline: "For W-2 employees and 1099 contractors",
    description:
      "Comprehensive preparation that finds every deduction and credit you're entitled to — nothing left on the table.",
    price: "Starting at $150",
    details: [
      "W-2 and 1099 income reporting",
      "Self-employment and gig income",
      "Itemized vs. standard deduction analysis",
      "Child tax, education, and dependent credits",
      "Michigan and multi-state returns",
      "E-filing with direct deposit",
    ],
  },
  {
    title: "Business Taxes",
    icon: Building2,
    tagline: "For LLCs, corporations, and partnerships",
    description:
      "Full-service business tax preparation and planning that keeps you compliant and keeps more money in the business.",
    price: "Starting at $350",
    details: [
      "LLC, S-corp (1120-S), C-corp (1120), and partnership (1065) returns",
      "Quarterly estimated tax planning",
      "Business deduction maximization",
      "Payroll tax compliance",
      "Entity structure guidance",
      "Year-round advisory access",
    ],
  },
  {
    title: "Monthly Bookkeeping",
    icon: BookOpen,
    tagline: "By our partner, Lexis Sapphire Financial",
    description:
      "Clean books every month, so you always know what you made — and tax time is a folder, not a shoebox.",
    price: "From $299/month",
    details: [
      "Monthly bank and card reconciliation",
      "Expense categorization and tracking",
      "P&L, balance sheet, and cash flow reports",
      "Receipt capture and organization",
      "Automatic invoice reminders",
      "Tax-ready records at year end",
    ],
    link: "/bookkeeping",
    linkLabel: "See bookkeeping plans",
    highlight: true,
  },
  {
    title: "Rapid Refunds",
    icon: Zap,
    tagline: "Your money, same day",
    description:
      "Get up to $7,000 advanced the same day your return is accepted. No waiting weeks for the IRS.",
    price: "Call for details",
    details: [
      "Same-day advance up to $7,000",
      "Based on your expected refund",
      "Direct deposit to your bank",
      "Transparent terms, no hidden fees",
      "Available to individuals and businesses",
    ],
  },
];

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-deep">
        <div className="absolute inset-0 hero-navy" />
        <div className="absolute inset-0 texture-diagonal" />
        <div className="absolute top-0 left-0 right-0 gold-rule-top" />
        <div className="absolute -top-24 right-[10%] h-80 w-80 rounded-full bg-gold/12 blur-[110px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24 text-center">
          <p className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.24em] text-gold-light mb-6 animate-hero">
            <span className="h-px w-8 bg-gold-light/60" aria-hidden />
            Services
            <span className="h-px w-8 bg-gold-light/60" aria-hidden />
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-7 animate-hero tracking-tight">
            <span className="text-white">Tax help that fits</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-light italic">
              your situation.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed animate-hero" style={{ animationDelay: "100ms" }}>
            Transparent pricing, plain-English explanations, and a real person
            who picks up the phone. That's the whole pitch.
          </p>
        </div>
      </section>

      {/* Service rows */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 lg:space-y-12">
            {servicesDetail.map((service, index) => (
              <Reveal key={service.title}>
                <div
                  className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center rounded-[2rem] p-8 sm:p-12 overflow-hidden ${
                    service.highlight
                      ? "bg-primary-deep gold-hairline"
                      : index % 2 === 1
                        ? "bg-surface"
                        : "bg-white border border-line shadow-[0_16px_44px_-24px_rgba(22,38,63,0.25)]"
                  }`}
                >
                  {service.highlight && (
                    <>
                      <div className="absolute inset-0 texture-dots opacity-60" />
                      <div className="absolute top-0 left-0 right-0 gold-rule-top" />
                    </>
                  )}
                  <div className="relative">
                    <span
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-[0_10px_24px_-10px_rgba(22,38,63,0.5)] ${
                        service.highlight
                          ? "bg-gradient-to-br from-gold-light to-gold-dark border border-gold/40"
                          : "bg-gradient-to-br from-primary to-primary-deep border border-gold/20"
                      }`}
                    >
                      <service.icon className={`w-7 h-7 ${service.highlight ? "text-primary-deep" : "text-gold"}`} />
                    </span>
                    <p
                      className={`text-xs font-bold uppercase tracking-[0.2em] mb-3 ${
                        service.highlight ? "text-gold-light" : "text-gold-dark"
                      }`}
                    >
                      {service.tagline}
                    </p>
                    <h2
                      className={`text-3xl sm:text-4xl font-semibold mb-3 ${
                        service.highlight ? "text-white" : ""
                      }`}
                    >
                      {service.title}
                    </h2>
                    <p
                      className={`text-xl font-bold mb-4 ${
                        service.highlight ? "text-gold-light" : "text-gold-dark"
                      }`}
                    >
                      {service.price}
                    </p>
                    <p
                      className={`leading-relaxed mb-8 max-w-lg ${
                        service.highlight ? "text-white/65" : "text-muted"
                      }`}
                    >
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-3.5">
                      {service.link && (
                        <Link href={service.link}>
                          <Button variant="gold" size="lg">
                            {service.linkLabel}
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </Button>
                        </Link>
                      )}
                      <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant={service.highlight ? "outline" : "primary"}
                          size="lg"
                          className={service.highlight ? "border-white/25 bg-transparent text-white hover:bg-white/10" : ""}
                        >
                          <Calendar className="w-5 h-5 mr-2" />
                          Book consultation
                        </Button>
                      </a>
                    </div>
                  </div>
                  <div className="relative">
                    <ul
                      className={`rounded-2xl p-7 sm:p-8 space-y-4 ${
                        service.highlight ? "bg-white/[0.05] border border-gold/25" : "bg-surface border border-line/60"
                      }`}
                    >
                      {service.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3">
                          <CheckCircle
                            className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                              service.highlight ? "text-gold-light" : "text-gold-dark"
                            }`}
                          />
                          <span className={service.highlight ? "text-white/85" : "text-ink/85"}>
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary-deep">
        <div className="absolute inset-0 hero-navy" />
        <div className="absolute inset-0 texture-dots opacity-60" />
        <div className="absolute top-0 left-0 right-0 gold-rule-top" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl font-semibold text-white mb-6 tracking-tight">
              Not sure which{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold italic">
                service you need?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-white/65 mb-10 max-w-xl mx-auto">
              Book a free consultation. We'll look at your situation and recommend
              the right fit — no pressure, no upsell.
            </p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
              <Button variant="gold" size="lg" className="text-lg px-10 py-4">
                <Calendar className="w-5 h-5 mr-2" />
                Free consultation
              </Button>
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
