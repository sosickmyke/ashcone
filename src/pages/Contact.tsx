import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { companyInfo } from '@/data';
import { toast } from 'sonner';
import type { Page } from '@/App';

interface ContactProps {
  navigate: (page: Page, productId?: string) => void;
}

export default function Contact({ navigate: _navigate }: ContactProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your message has been sent! We will get back to you soon.');
  };

  const whatsappUrl = `https://wa.me/${companyInfo.phone.replace(/\D/g, '')}?text=Hello%20Ashcone%20Luxury,%20I'm%20interested%20in%20your%20furniture.`;

  return (
    <div className="min-h-screen bg-beige pb-20">
      {/* Header */}
      <div className="bg-beige-light border-b border-ash/10">
        <div className="container-wide py-8 md:py-12">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ash mb-4">
            Contact Us
          </h1>
          <p className="text-ash/70 max-w-xl">
            We'd love to hear from you. Reach out for inquiries, quotes, or just to say hello.
          </p>
        </div>
      </div>

      <div className="container-wide py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-white">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-display text-xl font-semibold text-ash mb-4">
                    Get in Touch
                  </h3>
                  <p className="text-ash/70 text-sm">
                    Our team is ready to assist you with any questions about our products and services.
                  </p>
                </div>

                <div className="space-y-4">
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 bg-ash/5 rounded-lg flex items-center justify-center group-hover:bg-ash group-hover:text-beige transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-ash/60 text-sm">Phone</span>
                      <p className="text-ash font-medium">{companyInfo.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${companyInfo.email}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 bg-ash/5 rounded-lg flex items-center justify-center group-hover:bg-ash group-hover:text-beige transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-ash/60 text-sm">Email</span>
                      <p className="text-ash font-medium">{companyInfo.email}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-ash/5 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-ash/60 text-sm">Address</span>
                      <p className="text-ash font-medium">{companyInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-ash/5 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-ash/60 text-sm">Hours</span>
                      <p className="text-ash font-medium">{companyInfo.hours}</p>
                    </div>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white rounded-md font-medium hover:bg-[#128C7E] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white">
              <CardContent className="p-6 md:p-10">
                <h3 className="font-display text-xl font-semibold text-ash mb-6">
                  Send us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        required
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="+234 803 123 4567"
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        placeholder="How can we help?"
                        required
                        className="bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      required
                      className="bg-white min-h-[200px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="bg-ash text-beige hover:bg-ash-light py-6"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-12">
          <Card className="bg-white overflow-hidden">
            <div className="aspect-video bg-ash/5 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-ash/30 mx-auto mb-4" />
                <p className="text-ash/60">{companyInfo.address}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-blue hover:underline text-sm mt-2 inline-block"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
