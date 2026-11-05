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
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,#eef1f7_0%,#ffffff_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 lg:pt-24 lg:pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/[0.06] border border-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-7 animate-hero">
            <BookOpen className="w-4 h-4 text-gold-dark" />
            Bookkeeping by Lexis Sapphire Financial
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 animate-hero">
            Clean books, <span className="text-gold-dark">every month.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto leading-relaxed mb-4 animate-hero" style={{ animationDelay: "100ms" }}>
            “I keep your books clean every month, so you always know what you
            made — and tax time is a folder, not a shoebox.”
          </p>
          <p className="text-sm text-faint animate-hero" style={{ animationDelay: "140ms" }}>
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

          <div className="grid md:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto">
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 90} className="h-full">
                <Card
                  className={`relative h-full p-8 flex flex-col ${
                    tier.popular
                      ? "border-2 !border-gold shadow-[0_24px_60px_-24px_rgba(193,154,61,0.45)]"
                      : "hover:shadow-[0_20px_50px_-20px_rgba(22,38,63,0.25)] hover:-translate-y-1 transition-all duration-300"
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-gold text-primary-deep text-xs font-bold uppercase tracking-[0.12em] px-4 py-1.5 rounded-full whitespace-nowrap">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      Most popular
                    </span>
                  )}
                  <h3 className="text-xl font-semibold mb-1">{tier.name}</h3>
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
        <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_100%,#243b63_0%,#0c1729_70%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-gold-light px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <ShieldCheck className="w-4 h-4" />
              No tax filing · No payroll · Just clean books
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-5">
              Ready to hand off your books?
            </h2>
            <p className="text-lg text-white/65 mb-9 max-w-xl mx-auto">
              Email us to get set up in QuickBooks. We'll send your secure
              upload link and take it from there.
            </p>
            <div className="flex flex-wrap justify-center gap-3.5">
              <a
                href={`mailto:${BOOKKEEPING_EMAIL}?subject=${encodeURIComponent("QuickBooks onboarding for monthly bookkeeping")}`}
              >
                <Button variant="gold" size="lg">
                  Get set up in QuickBooks
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <a href={`mailto:${BOOKKEEPING_EMAIL}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:border-white/40"
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
