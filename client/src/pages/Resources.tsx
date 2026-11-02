import { useState } from "react";
import { Calculator, BookOpen, FileText, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

const resources = [
  {
    icon: Calculator,
    title: "Tax Calculator",
    description: "Estimate your tax refund or amount owed with the IRS Tax Withholding Estimator.",
    link: "https://www.irs.gov/individuals/tax-withholding-estimator",
  },
  {
    icon: BookOpen,
    title: "Tax Guides",
    description: "Official IRS publications covering tax basics, deductions, and filing requirements.",
    link: "https://www.irs.gov/publications",
  },
  {
    icon: FileText,
    title: "Document Checklist",
    description: "The IRS checklist of what documents to bring for a smooth tax preparation experience.",
    link: "https://www.irs.gov/individuals/checklist-for-free-tax-return-preparation",
  },
];

export default function Resources() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = "Newsletter signup";
    const body = `Please add ${email} to the Jackson Tax Service newsletter.`;
    window.location.href = `mailto:ajackstaxservice@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Tax Resources
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Educational content, tax tips, and tools to help you make informed financial decisions.
          </p>
        </div>
      </section>

      {/* Resources Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">
            Helpful Tools & Guides
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <Card key={resource.title} className="hover:shadow-xl transition-shadow group">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <resource.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold font-semibold text-sm hover:text-gold-dark transition inline-flex items-center"
                  >
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated With Tax Tips
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Subscribe to our newsletter for the latest tax news, tips, and updates.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-gold"
            />
            <Button variant="gold" type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
