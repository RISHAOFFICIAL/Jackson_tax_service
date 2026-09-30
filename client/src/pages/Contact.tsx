import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, Calendar, Upload, Send, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input, Textarea } from "../components/ui/Input";
import { Card, CardContent } from "../components/ui/Card";

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

  const onSubmit = async (data: ContactFormData) => {
    // In production, this would send to the backend API
    console.log("Contact form data:", data);
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get in touch with Jackson Tax Service. We're here to help with all your tax needs.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Have a question? Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-700 mb-2">Message Sent!</h3>
                  <p className="text-green-600">
                    Thank you for reaching out! We'll respond to your inquiry within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    error={errors.name?.message}
                    {...register("name")}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="313-427-4856"
                    error={errors.phone?.message}
                    {...register("phone")}
                  />
                  <Textarea
                    label="Message"
                    placeholder="How can we help you?"
                    error={errors.message?.message}
                    {...register("message")}
                  />
                  <Button type="submit" variant="gold" size="lg" className="w-full" disabled={isSubmitting}>
                    <Send className="w-5 h-5 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info & Quick Actions */}
            <div className="space-y-8">
              {/* Contact Information */}
              <Card>
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-xl font-bold text-primary">Contact Information</h3>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <a href="tel:313-427-4856" className="text-gold hover:text-gold-dark transition">
                        313-427-4856
                      </a>
                      <p className="text-sm text-gray-500">Mon-Fri: 9 AM - 5 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a href="mailto:ajackstaxservice@gmail.com" className="text-gold hover:text-gold-dark transition break-all">
                        ajackstaxservice@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Address</p>
                      <p className="text-gray-600">1938 Burdette</p>
                      <p className="text-gray-600">Ferndale, MI 48220</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-primary">Quick Actions</h3>
                  <a
                    href="https://calendly.com/ajackstaxservice"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="gold" size="lg" className="w-full">
                      <Calendar className="w-5 h-5 mr-2" />
                      Schedule Appointment
                    </Button>
                  </a>
                  <a
                    href="https://kinlock.cloudtaxoffice.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" size="lg" className="w-full">
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Tax Documents
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2940.5!2d-83.1342!3d42.4609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824c4b5a5b5b5b5%3A0x5b5b5b5b5b5b5b5b!2s1938+Burdette%2C+Ferndale%2C+MI+48220!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Jackson Tax Service Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}