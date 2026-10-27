import { BookOpen, CheckCircle, Upload, Mail, ArrowRight, Star } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";

// TODO: paste the published Client Upload Dashboard public link here once it is
// shared. The dashboard is currently a demo preview only: nothing a visitor
// uploads there is sent or saved, so do NOT link real client documents to it
// until the live upload route is confirmed.
const CLIENT_UPLOAD_DASHBOARD_URL = "";

// Contact email for Lexis Sapphire Financial bookkeeping. This is Risha's
// current HGH Management Group address; swap in a Lexis Sapphire address
// when one exists.
const BOOKKEEPING_EMAIL = "hghmgmtgroup@gmail.com";

const tiers = [
  {
    name: "Starter",
    price: "$299",
    per: "/month",
    tagline: "For small businesses getting organized.",
    features: [
      "1 bank account, 1 card",
      "About 75 transactions a month",
      "Monthly reconciliation and report",
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
      "About 200 transactions a month",
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
    ],
    popular: false,
  },
];

const steps = [
  {
    step: "1",
    title: "Send your statements",
    description:
      "Upload your bank and card statements and receipts through our secure upload link.",
  },
  {
    step: "2",
    title: "We clean up your books",
    description:
      "Every transaction is categorized, your accounts are reconciled, and your receipts are organized.",
  },
  {
    step: "3",
    title: "You get a simple report",
    description:
      "A clear monthly report shows what you made, what you spent, and where your business stands.",
  },
];

export default function Bookkeeping() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-gold/15 text-gold px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-gold/25">
            <BookOpen className="w-4 h-4 mr-2" />
            Bookkeeping by Lexis Sapphire Financial
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Monthly Bookkeeping, Done for You, by{" "}
            <span className="text-gold">Lexis Sapphire Financial</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            I keep your books clean every month, so you always know what you
            made, and tax time is a folder, not a shoebox.
          </p>
          <p className="text-sm text-gray-400">
            Bookkeeping by Lexis Sapphire Financial, a partner of Jackson Tax
            Service.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Monthly Plans"
              title="Choose the plan that fits your business"
              subtitle="Clean books every month, in QuickBooks Online, with a simple report you can actually understand."
            />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 90} className="h-full">
                <Card
                  className={`relative h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                    tier.popular ? "border-2 border-gold" : ""
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center bg-gold text-primary text-sm font-semibold px-4 py-1.5 rounded-full">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      Most Popular
                    </span>
                  )}
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-primary mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6">{tier.tagline}</p>
                    <p className="mb-6">
                      <span className="text-5xl font-bold text-primary">
                        {tier.price}
                      </span>
                      <span className="text-gray-500 font-medium">
                        {tier.per}
                      </span>
                    </p>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-gold mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a href={`mailto:${BOOKKEEPING_EMAIL}?subject=Bookkeeping - ${tier.name} plan`}>
                      <Button
                        variant={tier.popular ? "gold" : "outline"}
                        size="lg"
                        className="w-full"
                      >
                        Choose {tier.name}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          {/* Cleanup note */}
          <Reveal className="mt-12">
            <div className="bg-surface rounded-2xl p-8 text-center max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-primary mb-3">
                Behind on your books?
              </h3>
              <p className="text-lg text-gray-600">
                One-time cleanup $500 to $1,500 before your monthly plan
                starts, depending on how many months behind you are.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="How It Works"
              title="Getting started is simple"
              subtitle="Three steps, and your books are off your plate."
            />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((item, i) => (
              <Reveal key={item.step} delay={i * 100} className="h-full">
                <Card className="text-center h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-gold font-bold text-xl font-display">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusions + CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to hand off your books?
            </h2>
            <p className="text-xl text-gray-300 mb-2 max-w-2xl mx-auto">
              No tax filing, no payroll. Just clean books you can trust, every
              month.
            </p>
            <p className="text-gray-400 mb-8">
              At year end, you get a clean package ready for your tax
              preparer.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {CLIENT_UPLOAD_DASHBOARD_URL ? (
                <a
                  href={CLIENT_UPLOAD_DASHBOARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="gold" size="lg">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload your documents
                  </Button>
                </a>
              ) : (
                <span
                  className="inline-flex items-center justify-center font-semibold rounded-lg px-8 py-4 text-lg bg-white/10 text-gray-300 cursor-not-allowed"
                  title="Secure upload link coming soon"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload your documents (link coming soon)
                </span>
              )}
              <a href={`mailto:${BOOKKEEPING_EMAIL}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white hover:text-primary"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  {BOOKKEEPING_EMAIL}
                </Button>
              </a>
            </div>
            {!CLIENT_UPLOAD_DASHBOARD_URL && (
              <p className="text-gray-400 text-sm mt-6">
                Our secure document upload link is coming soon. To get
                started today, email us at {BOOKKEEPING_EMAIL}.
              </p>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
