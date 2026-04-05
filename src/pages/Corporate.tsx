import { useState } from 'react';
import { Building2, GraduationCap, Hotel, Stethoscope, ArrowRight, Check, Users, Briefcase, Truck, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { corporateServices, companyInfo } from '@/data';
import { useCorporateRequests } from '@/store';
import { toast } from 'sonner';
import type { Page } from '@/App';

interface CorporateProps {
  navigate: (page: Page, productId?: string) => void;
}

export default function Corporate({ navigate: _navigate }: CorporateProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addRequest } = useCorporateRequests();

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    projectType: '',
    projectSize: '',
    budgetRange: '',
    timeline: '',
    requirements: '',
    location: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    addRequest({
      id: `CORP-${Date.now()}`,
      ...formData,
      status: 'new',
      createdAt: new Date(),
    });

    toast.success('Your quote request has been submitted! Our team will contact you within 24 hours.');
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      projectType: '',
      projectSize: '',
      budgetRange: '',
      timeline: '',
      requirements: '',
      location: '',
    });
  };

  const benefits = [
    {
      icon: Users,
      title: 'Dedicated Account Manager',
      description: 'Personal support throughout your project',
    },
    {
      icon: Briefcase,
      title: 'Bulk Pricing',
      description: 'Competitive rates for large orders',
    },
    {
      icon: Truck,
      title: 'Project Management',
      description: 'End-to-end delivery and installation',
    },
    {
      icon: Check,
      title: 'Custom Solutions',
      description: 'Tailored to your brand and needs',
    },
  ];

  return (
    <div className="min-h-screen bg-beige pb-20">
      {/* Hero */}
      <div className="relative bg-ash text-beige">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/corporate-office.jpg"
            alt="Corporate Office"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-wide relative z-10 py-16 md:py-24">
          <div className="max-w-2xl">
            <span className="font-mono text-sm text-beige/60 tracking-wider uppercase">
              Corporate & Contract Services
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6">
              Furnishing Solutions for Business
            </h1>
            <p className="text-beige/70 text-lg leading-relaxed mb-8">
              From offices to schools, hotels to healthcare facilities, we deliver comprehensive furniture solutions tailored to your organization's needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${companyInfo.phone}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-beige text-ash rounded-md font-medium hover:bg-beige-dark transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
              <Button
                onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="border-beige text-beige hover:bg-beige hover:text-ash"
              >
                Request Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="font-mono text-sm text-ash/60 tracking-wider uppercase">Industries We Serve</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ash mt-4">
              Our Corporate Services
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {corporateServices.map((service) => (
              <Card key={service.id} className="group hover:shadow-elevated transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-ash/5 rounded-full flex items-center justify-center group-hover:bg-ash group-hover:text-beige transition-colors">
                    {service.icon === 'Building2' && <Building2 className="w-8 h-8" />}
                    {service.icon === 'GraduationCap' && <GraduationCap className="w-8 h-8" />}
                    {service.icon === 'Hotel' && <Hotel className="w-8 h-8" />}
                    {service.icon === 'Stethoscope' && <Stethoscope className="w-8 h-8" />}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ash mb-3">
                    {service.title}
                  </h3>
                  <p className="text-ash/70 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-beige-light">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-mono text-sm text-ash/60 tracking-wider uppercase">Why Choose Us</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ash mt-4 mb-6">
                The Ashcone Corporate Advantage
              </h2>
              <p className="text-ash/70 leading-relaxed mb-8">
                Partner with Nigeria's leading furniture manufacturer for your commercial projects. We combine quality craftsmanship with professional service delivery.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-ash rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-beige" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-ash mb-1">{benefit.title}</h4>
                      <p className="text-ash/60 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="/corporate-office.jpg"
                alt="Corporate Office"
                className="rounded-lg shadow-elevated"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="font-mono text-sm text-ash/60 tracking-wider uppercase">Get Started</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ash mt-4">
                Request a Quote
              </h2>
              <p className="text-ash/70 mt-4">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>

            <Card className="bg-white">
              <CardContent className="p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Your company name"
                        required
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Contact Name *</Label>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="Your full name"
                        required
                        className="bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+234 803 123 4567"
                        required
                        className="bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="projectType">Project Type *</Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="office">Office Furnishing</SelectItem>
                          <SelectItem value="school">School/University</SelectItem>
                          <SelectItem value="hotel">Hotel/Restaurant</SelectItem>
                          <SelectItem value="healthcare">Healthcare Facility</SelectItem>
                          <SelectItem value="residential">Residential Development</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectSize">Project Size *</Label>
                      <Select
                        value={formData.projectSize}
                        onValueChange={(value) => setFormData({ ...formData, projectSize: value })}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select project size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small (1-10 units)</SelectItem>
                          <SelectItem value="medium">Medium (11-50 units)</SelectItem>
                          <SelectItem value="large">Large (51-200 units)</SelectItem>
                          <SelectItem value="enterprise">Enterprise (200+ units)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="budgetRange">Budget Range</Label>
                      <Select
                        value={formData.budgetRange}
                        onValueChange={(value) => setFormData({ ...formData, budgetRange: value })}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-5m">Under ₦5 Million</SelectItem>
                          <SelectItem value="5m-10m">₦5 Million - ₦10 Million</SelectItem>
                          <SelectItem value="10m-25m">₦10 Million - ₦25 Million</SelectItem>
                          <SelectItem value="25m-50m">₦25 Million - ₦50 Million</SelectItem>
                          <SelectItem value="over-50m">Over ₦50 Million</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeline">Project Timeline</Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="1-3-months">1-3 Months</SelectItem>
                          <SelectItem value="3-6-months">3-6 Months</SelectItem>
                          <SelectItem value="6-12-months">6-12 Months</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Project Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="City, State"
                      required
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Project Requirements *</Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="Describe your project requirements, furniture types needed, special specifications, etc."
                      required
                      className="bg-white min-h-[150px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-ash text-beige hover:bg-ash-light py-6"
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Quote'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
