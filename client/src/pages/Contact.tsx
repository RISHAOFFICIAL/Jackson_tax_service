import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Calendar, Upload, Send, CheckCircle, Clock } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input, Textarea } from "../components/ui/Input";
import { Card, CardContent } from "../components/ui/Card";
import { Reveal } from "../components/ui/Reveal";

const CALENDLY = "https://calendly.com/ajackstaxservice";
const PORTAL = "https://kinlock.cloudtaxoffice.com/proavalon/CoreLink/Index?ReturnUrl=%2fproavalon";
const EMAIL = "ajackstaxservice@gmail.com";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Opens the visitor's email app with the message pre-addressed to us.
  // This keeps the form working with zero backend dependencies.
  const onSubmit = async (data: ContactFormData) => {
    const subject = `Website contact from ${data.name}`;
    const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nMessage:\n${data.message}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,#eef1f7_0%,#ffffff_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 lg:pt-24 lg:pb-20 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-dark mb-5 animate-hero">
            Contact
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 animate-hero">
            Let's talk about <span className="text-gold-dark">your taxes.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto animate-hero" style={{ animationDelay: "100ms" }}>
            Call, email, or send a message below. You'll hear back within one
            business day — usually much faster.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14">
            {/* Form */}
            <Reveal>
              <div className="bg-white rounded-3xl border border-line p-8 sm:p-10">
                {submitted ? (
                  <div className="text-center py-8">
                    <span className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </span>
                    <h2 className="text-2xl font-semibold mb-3">You're one tap away</h2>
                    <p className="text-muted leading-relaxed mb-6">
                      Your email app should now be open with your message addressed
                      to {EMAIL}. Just press send and we'll take it from there.
                    </p>
                    <p className="text-muted">
                      Prefer to talk?{" "}
                      <a href="tel:313-427-4856" className="font-bold text-gold-dark hover:text-primary transition">
                        Call 313-427-4856
                      </a>
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold mb-2">Send a message</h2>
                    <p className="text-muted text-[15px] mb-8">
                      Fill this out and your email app will open with everything
                      addressed to us — just hit send.
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <Input
                        label="Full name"
                        placeholder="Jane Smith"
                        error={errors.name?.message}
                        {...register("name")}
                      />
                      <div className="grid sm:grid-cols-2 gap-5">
                        <Input
                          label="Email"
                          type="email"
                          placeholder="jane@example.com"
                          error={errors.email?.message}
                          {...register("email")}
                        />
                        <Input
                          label="Phone"
                          type="tel"
                          placeholder="(313) 555-0123"
                          error={errors.phone?.message}
                          {...register("phone")}
                        />
                      </div>
                      <Textarea
                        label="How can we help?"
                        placeholder="Tell us about your tax situation..."
                        error={errors.message?.message}
                        {...register("message")}
                      />
                      <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isSubmitting}>
                        <Send className="w-5 h-5 mr-2" />
                        {isSubmitting ? "Opening your email..." : "Compose message"}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </Reveal>

            {/* Info + actions */}
            <div className="space-y-6">
              <Reveal delay={100}>
                <Card>
                  <CardContent className="p-7 space-y-6">
                    <div className="flex items-start gap-4">
                      <span className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-gold-light" />
                      </span>
                      <div>
                        <p className="font-bold text-primary">Phone</p>
                        <a href="tel:313-427-4856" className="text-gold-dark font-semibold hover:text-primary transition">
                          313-427-4856
                        </a>
                        <p className="text-sm text-faint flex items-center gap-1.5 mt-1">
                          <Clock className="w-3.5 h-3.5" /> Mon–Fri, 9 AM – 5 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-gold-light" />
                      </span>
                      <div>
                        <p className="font-bold text-primary">Email</p>
                        <a href={`mailto:${EMAIL}`} className="text-gold-dark font-semibold hover:text-primary transition break-all">
                          {EMAIL}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-gold-light" />
                      </span>
                      <div>
                        <p className="font-bold text-primary">Office</p>
                        <p className="text-muted">1938 Burdette<br />Ferndale, MI 48220</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>

              <Reveal delay={160}>
                <div className="bg-primary-deep rounded-3xl p-7">
                  <h3 className="text-lg font-semibold text-white mb-5">Skip the form</h3>
                  <div className="space-y-3">
                    <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="gold" size="lg" className="w-full">
                        <Calendar className="w-5 h-5 mr-2" />
                        Book online now
                      </Button>
                    </a>
                    <a href={PORTAL} target="_blank" rel="noopener noreferrer" className="block">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full border-white/25 bg-transparent text-white hover:bg-white/10 hover:border-white/40"
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        Upload documents
                      </Button>
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={220}>
                <div className="rounded-3xl overflow-hidden border border-line">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2940.5!2d-83.1342!3d42.4609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824c4b5a5b5b5b5%3A0x5b5b5b5b5b5b5b5b!2s1938+Burdette%2C+Ferndale%2C+MI+48220!5e0!3m2!1sen!2sus!4v1"
                    width="100%"
                    height="260"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Jackson Tax Service location map"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
