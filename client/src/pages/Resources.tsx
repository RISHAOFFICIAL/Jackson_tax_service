import { useState } from "react";
import { Calculator, BookOpen, FileText, ArrowRight, BellRing, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";

const EMAIL = "ajackstaxservice@gmail.com";

const resources = [
  {
    icon: Calculator,
    title: "IRS Withholding Estimator",
    description: "Check whether you're having the right amount withheld — and fix it before April surprises you.",
    link: "https://www.irs.gov/individuals/tax-withholding-estimator",
  },
  {
    icon: BookOpen,
    title: "IRS Publications",
    description: "Official guides on deductions, credits, and filing requirements, straight from the source.",
    link: "https://www.irs.gov/publications",
  },
  {
    icon: FileText,
    title: "Document Checklist",
    description: "Everything to gather before your appointment, so your return gets done in one visit.",
    link: "https://www.irs.gov/individuals/checklist-for-free-tax-return-preparation",
  },
];

const tips = [
  {
    title: "Keep receipts year-round",
    desc: "A shoebox in January becomes a scramble in April. Snap a photo the day you spend — future you says thanks.",
  },
  {
    title: "Adjust withholding after life changes",
    desc: "New job, new baby, new side gig? Recheck your W-4 so you don't owe (or overpay) at filing time.",
  },
  {
    title: "Track mileage from day one",
    desc: "Freelancers and business owners: a simple mileage log is one of the easiest deductions to miss.",
  },
  {
    title: "Don't ignore IRS letters",
    desc: "Most notices are routine and fixable. Bring it to us before you reply — the wording matters.",
  },
];

export default function Resources() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Newsletter signup")}&body=${encodeURIComponent(
      `Please add ${email} to the Jackson Tax Service newsletter.`
    )}`;
    setSubscribed(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,#eef1f7_0%,#ffffff_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 lg:pt-24 lg:pb-20 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-dark mb-5 animate-hero">
            Resources
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 animate-hero">
            Tax knowledge, <span className="text-gold-dark">minus the jargon.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto animate-hero" style={{ animationDelay: "100ms" }}>
            Practical tips and trusted tools to help you make smarter money
            moves all year — not just in April.
          </p>
        </div>
      </section>

      {/* Tools */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Tools"
              title="Helpful links, vetted for you"
              subtitle="Official IRS resources we actually recommend to clients."
            />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource, i) => (
              <Reveal key={resource.title} delay={i * 90} className="h-full">
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full bg-white rounded-3xl border border-line p-8 hover:shadow-[0_20px_50px_-20px_rgba(22,38,63,0.25)] hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="w-[52px] h-[52px] rounded-2xl bg-primary flex items-center justify-center mb-6 group-hover:bg-primary-light transition-colors">
                    <resource.icon className="w-6 h-6 text-gold-light" />
                  </span>
                  <h3 className="text-xl font-semibold mb-2.5">{resource.title}</h3>
                  <p className="text-muted text-[15px] leading-relaxed mb-5">{resource.description}</p>
                  <span className="inline-flex items-center text-sm font-bold text-gold-dark group-hover:text-primary transition">
                    Open resource <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Pro tips"
              title="Four habits that save you money"
              subtitle="Small moves, big difference at tax time."
            />
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {tips.map((tip, i) => (
              <Reveal key={tip.title} delay={i * 70}>
                <div className="flex gap-5 bg-surface rounded-2xl p-6 h-full">
                  <span className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-gold-dark" />
                  </span>
                  <div>
                    <p className="font-bold text-primary mb-1.5">{tip.title}</p>
                    <p className="text-muted text-[15px] leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative overflow-hidden bg-primary-deep">
        <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_100%,#243b63_0%,#0c1729_70%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 text-center">
          <Reveal>
            <span className="w-14 h-14 rounded-2xl bg-gold/15 border border-gold/25 flex items-center justify-center mx-auto mb-6">
              <BellRing className="w-7 h-7 text-gold-light" />
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
              Tax tips in your inbox
            </h2>
            <p className="text-lg text-white/65 mb-9">
              Deadlines, deduction reminders, and plain-English tax news. No spam, ever.
            </p>
            {subscribed ? (
              <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-full px-6 py-3.5 text-white font-medium">
                <CheckCircle className="w-5 h-5 text-gold-light" />
                Your email app is opening — just hit send to subscribe.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="flex-1 px-5 py-3.5 rounded-full bg-white text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-gold"
                />
                <Button variant="gold" type="submit" size="md" className="px-8">
                  Subscribe
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
