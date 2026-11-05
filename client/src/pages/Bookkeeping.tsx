import { BookOpen, CheckCircle, Mail, ArrowRight, Star, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";

// Document uploads run through QuickBooks: every bookkeeping client is
// onboarded in QuickBooks Online, which provides the secure document link.
// There is no single public upload URL, so the page directs visitors to
// email Lexis Sapphire Financial to get set up. Do NOT link the demo Client
// Upload Dashboard preview: nothing uploaded there is sent or saved.

// Contact email for Lexis Sapphire Financial bookkeeping.
const BOOKKEEPING_EMAIL = "lexissapphire@gmail.com";

const tiers = [
  {
    name: "Starter",
    price: "$299",
    per: "/month",
    tagline: "For small businesses getting organized.",
    features: [
      "1 bank account + 1 card",
      "Up to ~75 transactions / month",
      "Monthly reconciliation",
      "Simple monthly report",
    ],
    popular: false,
  },
  {
    name: "Standard",
    price: "$499",
    per: "/month",
    tagline: "Our most popular plan for growing businesses.",
    features: [
      "Up to 3 accounts",
      "Up to ~200 transactions / month",
      "Receipt management",
      "Automatic invoice reminders",
      "15-minute monthly review call",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "$799",
    per: "/month",
    tagline: "For businesses that need a closer eye on cash.",
    features: [
      "Multiple accounts",
      "Per-job cost tracking",
      "Bill pay coordination",
      "Cash flow snapshot",
      "Priority support",
    ],
    popular: false,
  },
];

const steps = [
  {
    step: "01",
    title: "Send your statements",
    description:
      "Email us to get set up in QuickBooks Online, then share statements and receipts through your secure upload link.",
  },
  {
    step: "02",
    title: "We clean up your books",
    description:
      "Every transaction categorized, every account reconciled, every receipt organized. Done for you.",
  },
  {
    step: "03",
    title: "You get a simple report",
    description:
      "A clear monthly report shows what you made, what you spent, and exactly where your business stands.",
  },
];

export default function Bookkeeping() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-deep">
        <div className="absolute inset-0 hero-navy" />
        <div className="absolute inset-0 texture-diagonal" />
        <div className="absolute top-0 left-0 right-0 gold-rule-top" />
        <div className="absolute -top-24 left-[15%] h-80 w-80 rounded-full bg-gold/12 blur-[110px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold-light px-5 py-2.5 rounded-full text-sm font-semibold mb-8 animate-hero">
            <BookOpen className="w-4 h-4" />
            Bookkeeping by Lexis Sapphire Financial
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-7 animate-hero tracking-tight">
            <span className="text-white">Clean books,</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-light italic">
              every month.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-5 animate-hero" style={{ animationDelay: "100ms" }}>
            “I keep your books clean every month, so you always know what you
            made — and tax time is a folder, not a shoebox.”
          </p>
          <p className="text-sm text-gold-light/80 font-medium tracking-wide animate-hero" style={{ animationDelay: "140ms" }}>
            — Risha Smith, Lexis Sapphire Financial · Partner of Jackson Tax Service
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Monthly plans"
              title="Pick the plan that fits"
              subtitle="Every plan includes QuickBooks Online, monthly reconciliation, and a report you can actually understand."
            />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 90} className="h-full">
                <Card
                  className={`relative h-full p-8 flex flex-col overflow-hidden ${
                    tier.popular
                      ? "border-2 !border-gold shadow-[0_32px_80px_-24px_rgba(193,154,61,0.5)] lg:scale-[1.04] bg-white"
                      : "hover:shadow-[0_24px_60px_-20px_rgba(22,38,63,0.3)] hover:-translate-y-1.5 transition-all duration-300"
                  }`}
                >
                  {tier.popular && (
                    <>
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
                      <span className="absolute -top-0 left-1/2 -translate-x-1/2 translate-y-3 inline-flex items-center gap-1.5 bg-gradient-to-b from-gold-light to-gold text-primary-deep text-xs font-bold uppercase tracking-[0.12em] px-4 py-1.5 rounded-full whitespace-nowrap shadow-[0_8px_20px_-8px_rgba(193,154,61,0.7)]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        Most popular
                      </span>
                    </>
                  )}
                  <h3 className={`text-xl font-semibold mb-1 ${tier.popular ? "mt-4" : ""}`}>{tier.name}</h3>
                  <p className="text-muted text-sm mb-6">{tier.tagline}</p>
                  <p className="mb-7">
                    <span className="text-5xl font-semibold font-display text-primary">{tier.price}</span>
                    <span className="text-muted font-medium">{tier.per}</span>
                  </p>
                  <ul className="space-y-3.5 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-gold-dark flex-shrink-0 mt-0.5" />
                        <span className="text-ink/85 text-[15px]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`mailto:${BOOKKEEPING_EMAIL}?subject=${encodeURIComponent(`Bookkeeping — ${tier.name} plan`)}`}
                    className="mt-auto"
                  >
                    <Button variant={tier.popular ? "gold" : "outline"} size="lg" className="w-full">
                      Choose {tier.name}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </a>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <div className="max-w-3xl mx-auto bg-white border border-line rounded-3xl p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">Behind on your books?</h3>
              <p className="text-muted">
                One-time cleanup from <span className="font-bold text-primary">$500–$1,500</span> before
                your monthly plan starts, depending on how far behind you are.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="Off your plate in three steps"
              subtitle="No accounting degree required. If you can email, you can do this."
            />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((item, i) => (
              <Reveal key={item.step} delay={i * 100} className="h-full">
                <div className="h-full bg-surface rounded-3xl p-8">
                  <p className="font-display text-6xl font-semibold text-gold/25 mb-5">{item.step}</p>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust + CTA */}
      <section className="relative overflow-hidden bg-primary-deep">
        <div className="absolute inset-0 hero-navy" />
        <div className="absolute inset-0 texture-dots opacity-60" />
        <div className="absolute top-0 left-0 right-0 gold-rule-top" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold-light px-4 py-2 rounded-full text-sm font-semibold mb-7">
              <ShieldCheck className="w-4 h-4" />
              No tax filing · No payroll · Just clean books
            </div>
            <h2 className="text-4xl sm:text-5xl font-semibold text-white mb-6 tracking-tight">
              Ready to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold italic">
                hand off your books?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-white/65 mb-10 max-w-xl mx-auto">
              Email us to get set up in QuickBooks. We'll send your secure
              upload link and take it from there.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${BOOKKEEPING_EMAIL}?subject=${encodeURIComponent("QuickBooks onboarding for monthly bookkeeping")}`}
              >
                <Button variant="gold" size="lg" className="text-lg px-10 py-4">
                  Get set up in QuickBooks
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href={`mailto:${BOOKKEEPING_EMAIL}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 border-white/25 bg-white/5 text-white hover:bg-white/10 hover:border-gold/50 backdrop-blur"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  {BOOKKEEPING_EMAIL}
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
