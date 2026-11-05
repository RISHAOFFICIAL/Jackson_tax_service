import { Phone, Mail, MapPin, Calendar, Award, HeartHandshake, CalendarCheck } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";

const CALENDLY = "https://calendly.com/ajackstaxservice";

const values = [
  {
    icon: Award,
    title: "Expertise you can trust",
    description: "5+ years of professional tax preparation. Every return reviewed line by line before it's filed.",
  },
  {
    icon: HeartHandshake,
    title: "A real relationship",
    description: "You're not a number here. Austin learns your situation and remembers it next year.",
  },
  {
    icon: CalendarCheck,
    title: "Here all year",
    description: "Tax questions don't stop in April. Neither do we — notices, estimates, planning, anytime.",
  },
];

const credentials = [
  { title: "Locally owned", desc: "Independent practice in Ferndale, Michigan" },
  { title: "5+ years experience", desc: "Serving individuals and businesses since 2020" },
  { title: "Continuing education", desc: "Annual tax law updates and professional training" },
  { title: "E-file provider", desc: "Fast electronic filing with direct deposit" },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary-deep">
        <div className="absolute inset-0 hero-navy" />
        <div className="absolute inset-0 texture-diagonal" />
        <div className="absolute top-0 left-0 right-0 gold-rule-top" />
        <div className="absolute -top-24 right-[12%] h-80 w-80 rounded-full bg-gold/12 blur-[110px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24 text-center">
          <p className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.24em] text-gold-light mb-6 animate-hero">
            <span className="h-px w-8 bg-gold-light/60" aria-hidden />
            About
            <span className="h-px w-8 bg-gold-light/60" aria-hidden />
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-7 animate-hero tracking-tight text-white">
            Meet{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-light italic">
              Austin Jackson
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto animate-hero" style={{ animationDelay: "100ms" }}>
            The person behind Jackson Tax Service — and the reason Detroit
            keeps coming back every tax season.
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
            {/* Photo placeholder — replace with Austin's real photo when available */}
            <Reveal>
              <div className="relative max-w-md mx-auto w-full">
                <div className="aspect-[4/5] rounded-[2rem] bg-primary-deep overflow-hidden relative gold-hairline">
                  <div className="absolute inset-0 hero-navy" />
                  <div className="absolute inset-0 texture-dots opacity-50" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                    <span className="w-28 h-28 rounded-full bg-gradient-to-b from-gold-light to-gold-dark flex items-center justify-center mb-6 shadow-[0_16px_40px_-12px_rgba(193,154,61,0.6)] ring-4 ring-gold/20">
                      <span className="text-4xl font-bold text-primary-deep font-display">AJ</span>
                    </span>
                    <p className="text-white text-3xl font-semibold font-display">Austin Jackson</p>
                    <p className="text-gold-light text-xs font-bold uppercase tracking-[0.22em] mt-3">
                      Founder & Tax Professional
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white border border-gold/30 rounded-2xl shadow-[0_24px_60px_-20px_rgba(22,38,63,0.35)] px-6 py-4">
                  <p className="text-3xl font-bold text-gold-dark font-display">5+</p>
                  <p className="text-xs text-muted font-medium">years serving Detroit</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
                Big-firm expertise, neighborly service.
              </h2>
              <div className="space-y-5 text-muted leading-relaxed text-[17px]">
                <p>
                  Austin Jackson founded Jackson Tax Service on a simple belief: expert
                  tax help shouldn't feel intimidating, rushed, or overpriced. Every
                  client gets the same careful attention, whether it's a straightforward
                  W-2 or a multi-entity business return.
                </p>
                <p>
                  Based in Ferndale, Michigan, Austin has spent 5+ years helping
                  individuals, freelancers, and small businesses across metro Detroit
                  navigate tax season with confidence — and stay ahead of it the
                  other eleven months of the year.
                </p>
                <p>
                  Transparent pricing. Plain-English explanations. A direct line to
                  the person preparing your return. That's the Jackson Tax way.
                </p>
              </div>
              <div className="mt-9 flex flex-wrap gap-3.5">
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
                  <Button variant="gold" size="lg">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule a meeting
                  </Button>
                </a>
                <a href="tel:313-427-4856">
                  <Button variant="outline" size="lg">
                    <Phone className="w-5 h-5 mr-2" />
                    313-427-4856
                  </Button>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Why Jackson Tax"
              title="What makes us different"
              subtitle="Three things every client can count on."
            />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 90} className="h-full">
                <div className="group relative h-full bg-white rounded-3xl border border-line p-8 overflow-hidden hover:shadow-[0_24px_60px_-24px_rgba(22,38,63,0.3)] hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="w-[56px] h-[56px] rounded-2xl bg-gradient-to-br from-primary to-primary-deep border border-gold/20 flex items-center justify-center mb-6 shadow-[0_10px_24px_-10px_rgba(22,38,63,0.5)]">
                    <value.icon className="w-6 h-6 text-gold" />
                  </span>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted leading-relaxed">{value.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Credentials"
              title="Qualified and accountable"
            />
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {credentials.map((cred, i) => (
              <Reveal key={cred.title} delay={i * 70}>
                <div className="flex items-center gap-5 bg-surface rounded-2xl p-6">
                  <span className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-gold-dark" />
                  </span>
                  <div>
                    <p className="font-bold text-primary">{cred.title}</p>
                    <p className="text-sm text-muted">{cred.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="relative overflow-hidden bg-primary-deep">
        <div className="absolute inset-0 texture-diagonal" />
        <div className="absolute top-0 left-0 right-0 gold-rule-top" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: Phone, label: "Phone", value: "313-427-4856", href: "tel:313-427-4856" },
              { icon: Mail, label: "Email", value: "ajackstaxservice@gmail.com", href: "mailto:ajackstaxservice@gmail.com" },
              { icon: MapPin, label: "Office", value: "1938 Burdette, Ferndale, MI 48220", href: undefined },
            ].map((item) => (
              <div key={item.label}>
                <item.icon className="w-7 h-7 text-gold-light mx-auto mb-3" />
                <p className="text-white/50 text-xs font-bold uppercase tracking-[0.18em] mb-1.5">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-white font-semibold hover:text-gold-light transition break-all">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-white font-semibold">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
