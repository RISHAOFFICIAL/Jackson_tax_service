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
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,#eef1f7_0%,#ffffff_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 lg:pt-24 lg:pb-20 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-dark mb-5 animate-hero">
            About
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 animate-hero">
            Meet Austin Jackson
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto animate-hero" style={{ animationDelay: "100ms" }}>
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
                <div className="aspect-[4/5] rounded-3xl bg-primary-deep overflow-hidden relative">
                  <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_0%,#243b63_0%,#0c1729_75%)]" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center">
                    <span className="w-24 h-24 rounded-full bg-gold flex items-center justify-center mb-6">
                      <span className="text-3xl font-bold text-primary-deep font-display">AJ</span>
                    </span>
                    <p className="text-white text-2xl font-semibold font-display">Austin Jackson</p>
                    <p className="text-gold-light text-xs font-bold uppercase tracking-[0.2em] mt-2">
                      Founder & Tax Professional
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white border border-line rounded-2xl shadow-[0_20px_50px_-20px_rgba(22,38,63,0.3)] px-6 py-4">
                  <p className="text-2xl font-bold text-primary font-display">5+</p>
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
                <div className="h-full bg-white rounded-3xl border border-line p-8">
                  <span className="w-[52px] h-[52px] rounded-2xl bg-primary flex items-center justify-center mb-6">
                    <value.icon className="w-6 h-6 text-gold-light" />
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
      <section className="bg-primary-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
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
