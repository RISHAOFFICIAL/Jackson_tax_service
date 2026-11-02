import { Phone, Mail, MapPin, Calendar, Award, Star, Heart, Users } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

const values = [
  {
    icon: Award,
    title: "Expertise You Can Trust",
    description: "With 5+ years of experience, we bring professional excellence to every client relationship.",
  },
  {
    icon: Heart,
    title: "Client-First Approach",
    description: "Your financial well-being is our priority. We take the time to understand your unique situation and goals.",
  },
  {
    icon: Users,
    title: "Year-Round Support",
    description: "Tax questions don't stop after April. We're here for you all year, not just during tax season.",
  },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white text-center mb-4">
            About Austin Jackson
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Professional tax preparation with a personal touch
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Photo */}
            {/* TODO: replace this monogram panel with Austin's real photo when available */}
            <div className="relative">
              <div className="aspect-square bg-surface rounded-2xl overflow-hidden shadow-xl max-w-md mx-auto">
                <div className="w-full h-full bg-gradient-to-br from-primary via-primary-light to-primary flex items-center justify-center relative">
                  <svg
                    viewBox="0 0 400 400"
                    className="absolute inset-0 h-full w-full text-gold/10"
                    aria-hidden="true"
                  >
                    <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    <circle cx="200" cy="200" r="110" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                  <div className="text-center p-8 relative">
                    <div className="w-28 h-28 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-gold/30">
                      <span className="text-4xl font-bold text-primary font-display">AJ</span>
                    </div>
                    <p className="text-white text-xl font-semibold font-display">Austin Jackson</p>
                    <p className="text-gold text-sm font-medium tracking-wide uppercase mt-1">Founder and Tax Professional</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio content */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Dedicated to Your Financial Success
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Austin Jackson founded Jackson Tax Service with a simple mission: provide expert tax 
                  preparation and financial guidance with the personal attention every client deserves.
                </p>
                <p>
                  With over 5 years of experience in tax preparation and bookkeeping, Austin has helped 
                  hundreds of individuals and businesses navigate the complexities of tax season. From 
                  simple W-2 filings to complex business returns, every client receives the same 
                  commitment to accuracy and excellence.
                </p>
                <p>
                  Based in Ferndale, Michigan, Jackson Tax Service is proud to be a local
                  business serving the metro Detroit area. We believe in building lasting relationships 
                  with our clients through transparent pricing, clear communication, and year-round support.
                </p>
                <p>
                  Whether you need help with a straightforward tax return, comprehensive bookkeeping, 
                  or strategic tax planning for your business, Austin is ready to help.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="https://calendly.com/ajackstaxservice" target="_blank" rel="noopener noreferrer">
                  <Button variant="gold" size="lg">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule a Meeting
                  </Button>
                </a>
                <a href="tel:313-427-4856">
                  <Button variant="outline" size="lg">
                    <Phone className="w-5 h-5 mr-2" />
                    Call 313-427-4856
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary text-center mb-4">
            Why Choose Jackson Tax Service?
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            What sets us apart from the rest
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="text-center hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Credentials & Affiliations
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: "Locally Owned", desc: "Independent tax practice in Ferndale, Michigan" },
              { title: "5+ Years Experience", desc: "Professional tax preparation since 2020" },
              { title: "Continuing Education", desc: "Annual tax law updates and professional training" },
              { title: "Member in Good Standing", desc: "Professional tax preparation standards" },
            ].map((cred) => (
              <div key={cred.title} className="flex items-center space-x-4 p-6 bg-surface rounded-xl">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">{cred.title}</h3>
                  <p className="text-sm text-gray-500">{cred.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Bar */}
      <section className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Phone className="w-8 h-8 text-gold mx-auto mb-3" />
              <p className="text-gray-300 text-sm">Phone</p>
              <a href="tel:313-427-4856" className="text-white font-semibold hover:text-gold transition">
                313-427-4856
              </a>
            </div>
            <div>
              <Mail className="w-8 h-8 text-gold mx-auto mb-3" />
              <p className="text-gray-300 text-sm">Email</p>
              <a href="mailto:ajackstaxservice@gmail.com" className="text-white font-semibold hover:text-gold transition break-all">
                ajackstaxservice@gmail.com
              </a>
            </div>
            <div>
              <MapPin className="w-8 h-8 text-gold mx-auto mb-3" />
              <p className="text-gray-300 text-sm">Address</p>
              <p className="text-white font-semibold">1938 Burdette, Ferndale, MI 48220</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}