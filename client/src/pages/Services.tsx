import { Link } from "wouter";
import { CheckCircle, ArrowRight, FileText, Building2, BookOpen, Zap, Calendar } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

const servicesDetail = [
  {
    title: "Individual Tax Returns",
    icon: FileText,
    description: "Comprehensive tax preparation for individuals. Whether you're a W-2 employee or a 1099 contractor, we ensure you get every deduction you deserve.",
    price: "Starting at $150",
    details: [
      "W-2 Employee Returns - Full year or partial year filings",
      "1099 Contractor Filing - Self-employment income reporting",
      "Itemized Deductions - Maximize your charitable, medical, and mortgage deductions",
      "Standard Deduction Filing - Quick and efficient processing",
      "Dependents & Credits - Child tax credits, education credits, and more",
      "State & Local Returns - Michigan and multi-state filing",
      "Electronic Filing - Fast processing and direct deposit",
    ],
  },
  {
    title: "Business Taxes",
    icon: Building2,
    description: "Full-service tax preparation for businesses of all sizes. We help LLCs, corporations, and partnerships stay compliant and tax-efficient.",
    price: "Starting at $350",
    details: [
      "LLC Tax Filing - Single-member and multi-member LLCs",
      "S-Corporation Returns - Form 1120-S preparation and filing",
      "C-Corporation Returns - Form 1120 preparation",
      "Partnership Returns - Form 1065 preparation",
      "Quarterly Estimated Taxes - Calculation and payment planning",
      "Business Deductions - Maximize eligible business expenses",
      "Payroll Tax Filing - Employment tax compliance",
    ],
  },
  {
    title: "Year-Round Bookkeeping",
    icon: BookOpen,
    description: "Professional bookkeeping services to keep your finances organized throughout the year. We provide clean, tax-ready books at any time.",
    price: "Starting at $200/month",
    details: [
      "Monthly Reconciliation - Bank and credit card reconciliation",
      "Expense Tracking - Categorize and monitor business expenses",
      "Financial Reports - P&L statements, balance sheets, cash flow",
      "Accounts Receivable/Payable - Track what's owed and what's due",
      "Payroll Support - Process payroll and tax withholdings",
      "Tax-Ready Records - Organized books for tax season",
      "QuickBooks Integration - Support for popular accounting software",
    ],
  },
  {
    title: "Rapid Refunds",
    icon: Zap,
    description: "Need your refund fast? Our Rapid Refund service gets you up to $7,000 advanced the same day your return is accepted by the IRS.",
    price: "Call for details",
    details: [
      "Same-Day Processing - Get your money fast",
      "Up to $7,000 Advance - Based on your expected refund",
      "Direct Deposit - Funds deposited directly to your bank",
      "No Hidden Fees - Transparent pricing",
      "Fast Approval - Quick verification process",
      "Available for All Filers - Including individuals and businesses",
    ],
  },
];

const comparisonData = [
  { feature: "Basic Individual Filing", individual: "✓", business: "✓", bookkeeping: "—", rapid: "—" },
  { feature: "Itemized Deductions", individual: "✓", business: "✓", bookkeeping: "—", rapid: "—" },
  { feature: "Self-Employment Income", individual: "✓", business: "✓", bookkeeping: "—", rapid: "—" },
  { feature: "Business Entity Filing", individual: "—", business: "✓", bookkeeping: "—", rapid: "—" },
  { feature: "Quarterly Estimates", individual: "Optional", business: "✓", bookkeeping: "—", rapid: "—" },
  { feature: "Monthly Bookkeeping", individual: "—", business: "Optional", bookkeeping: "✓", rapid: "—" },
  { feature: "Financial Reports", individual: "—", business: "Optional", bookkeeping: "✓", rapid: "—" },
  { feature: "Same-Day Refund", individual: "Optional", business: "Optional", bookkeeping: "—", rapid: "✓" },
  { feature: "Year-Round Support", individual: "✓", business: "✓", bookkeeping: "✓", rapid: "✓" },
];

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white text-center mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            From individual tax returns to year-round bookkeeping, we provide comprehensive 
            financial services tailored to your needs.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {servicesDetail.map((service, index) => (
            <div
              key={service.title}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-gold" />
                </div>
                <h2 className="text-3xl font-bold text-primary mb-3">{service.title}</h2>
                <p className="text-xl font-semibold text-gold mb-4">{service.price}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-gold mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://calendly.com/ajackstaxservice" target="_blank" rel="noopener noreferrer">
                  <Button variant="gold" size="lg">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Consultation
                  </Button>
                </a>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="bg-surface rounded-2xl p-8">
                  <img
                    src={`https://placehold.co/600x400/1a2a4a/c9a84c?text=${encodeURIComponent(service.title)}`}
                    alt={service.title}
                    className="w-full rounded-xl shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
            Service Comparison
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Find the right service for your needs
          </p>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Service Feature</th>
                  <th className="px-6 py-4 text-center">Individual Returns</th>
                  <th className="px-6 py-4 text-center">Business Taxes</th>
                  <th className="px-6 py-4 text-center">Bookkeeping</th>
                  <th className="px-6 py-4 text-center">Rapid Refunds</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonData.map((row) => (
                  <tr key={row.feature} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-gold font-semibold">{row.individual}</td>
                    <td className="px-6 py-4 text-center text-gold font-semibold">{row.business}</td>
                    <td className="px-6 py-4 text-center text-gold font-semibold">{row.bookkeeping}</td>
                    <td className="px-6 py-4 text-center text-gold font-semibold">{row.rapid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Not Sure Which Service You Need?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Schedule a free consultation and we'll help you find the right solution.
          </p>
          <a href="https://calendly.com/ajackstaxservice" target="_blank" rel="noopener noreferrer">
            <Button variant="gold" size="lg">
              <Calendar className="w-5 h-5 mr-2" />
              Free Consultation
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}