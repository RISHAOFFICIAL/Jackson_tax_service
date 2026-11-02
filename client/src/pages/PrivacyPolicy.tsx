import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div>
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            How Jackson Tax Service collects, uses, and protects your information.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-8">Last updated: November 2026</p>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-primary mb-3">Information We Collect</h2>
              <p>
                When you contact us, schedule an appointment, or use our client portal,
                we collect the information you provide, such as your name, email address,
                phone number, and the tax documents you share with us so we can prepare
                your return.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-3">How We Use Your Information</h2>
              <p>
                We use your information to provide tax preparation and bookkeeping services,
                communicate with you about your account, schedule appointments, and meet our
                legal and regulatory obligations. We do not sell your personal information.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-3">Protecting Your Information</h2>
              <p>
                Tax documents contain sensitive personal data. We limit access to your
                information to what is needed to serve you, and we ask that you share
                documents only through our secure client portal or other secure methods
                we provide, never by unsecured email when it can be avoided.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-3">Sharing Your Information</h2>
              <p>
                We share your information only as needed to provide our services (for
                example, e-filing your return with the IRS or a state tax authority) or
                when required by law. We do not share your information with third parties
                for their marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-3">Your Choices</h2>
              <p>
                You may ask us what personal information we hold about you, ask us to
                correct it, or ask us to delete it, subject to the recordkeeping rules
                that apply to tax preparers. Contact us at ajackstaxservice@gmail.com
                or 313-427-4856 with any privacy questions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-3">Changes to This Policy</h2>
              <p>
                We may update this policy from time to time. The current version will
                always be posted on this page.
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
