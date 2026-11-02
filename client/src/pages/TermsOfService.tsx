import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div>
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The basic terms for using our website and services.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-8">Last updated: November 2026</p>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-primary mb-3">Our Services</h2>
              <p>
                Jackson Tax Service provides tax preparation, bookkeeping, and related
                financial services. Service descriptions and prices shown on this site
                are general information; your exact services, fees, and timelines will
                be confirmed with you directly before work begins.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-3">Your Responsibilities</h2>
              <p>
                You are responsible for providing complete and accurate information and
                documents. We prepare your return based on what you give us, and you
                remain responsible for the accuracy of your filed tax return.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-3">Appointments and Payments</h2>
              <p>
                Appointment times are confirmed through our scheduling link or by phone.
                Fees are due as agreed when you engage our services. Refund advance
                products, where offered, are subject to separate terms and eligibility
                requirements that we will explain before you apply.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-3">Website Content</h2>
              <p>
                The articles, guides, and calculators linked from this site are general
                educational information, not tax advice for your specific situation.
                Tax law changes often, so confirm current rules with us or the IRS
                before acting.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-3">Limitation of Liability</h2>
              <p>
                To the extent allowed by law, our liability for any claim related to
                our services is limited to the fees you paid us for the service at
                issue.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-3">Contact Us</h2>
              <p>
                Questions about these terms? Reach us at ajackstaxservice@gmail.com
                or 313-427-4856, or visit us at 1938 Burdette, Ferndale, MI 48220.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/"
              className="inline-flex items-center text-gold font-semibold hover:text-gold-dark transition"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
