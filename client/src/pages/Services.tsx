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
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,#eef1f7_0%,#ffffff_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 lg:pt-24 lg:pb-20 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-dark mb-5 animate-hero">
            Services
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 animate-hero">
            Tax help that fits <span className="text-gold-dark">your situation.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed animate-hero" style={{ animationDelay: "100ms" }}>
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
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center rounded-3xl p-8 sm:p-12 ${
                    service.highlight
                      ? "bg-primary-deep"
                      : index % 2 === 1
                        ? "bg-surface"
                        : "bg-white border border-line"
                  }`}
                >
                  <div>
                    <span
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                        service.highlight ? "bg-gold/15" : "bg-primary"
                      }`}
                    >
                      <service.icon className={`w-7 h-7 ${service.highlight ? "text-gold-light" : "text-gold-light"}`} />
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
                  <div>
                    <ul
                      className={`rounded-2xl p-7 sm:p-8 space-y-4 ${
                        service.highlight ? "bg-white/[0.06] border border-white/10" : "bg-surface"
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
        <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_100%,#243b63_0%,#0c1729_70%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-5">
              Not sure which service you need?
            </h2>
            <p className="text-lg text-white/65 mb-9 max-w-xl mx-auto">
              Book a free consultation. We'll look at your situation and recommend
              the right fit — no pressure, no upsell.
            </p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
              <Button variant="gold" size="lg">
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
