import { Award, Users, Target, Heart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Page } from '@/App';

interface AboutProps {
  navigate: (page: Page) => void;
}

export default function About({ navigate }: AboutProps) {
  const values = [
    {
      icon: Award,
      title: 'Quality Craftsmanship',
      description: 'Every piece is handcrafted by skilled artisans using premium materials and time-tested techniques.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'We listen to your needs and work closely with you to create furniture that exceeds expectations.',
    },
    {
      icon: Target,
      title: 'Precision & Detail',
      description: 'From design to delivery, we pay attention to every detail to ensure perfection.',
    },
    {
      icon: Heart,
      title: 'Made with Passion',
      description: 'Furniture making is our craft and our passion. We put our heart into every piece we create.',
    },
  ];

  const milestones = [
    { year: '2009', title: 'Founded', description: 'Ashcone Luxury was established in Lagos' },
    { year: '2012', title: 'First Corporate Contract', description: 'Furnished our first major office building' },
    { year: '2015', title: 'Factory Expansion', description: 'Opened our state-of-the-art manufacturing facility' },
    { year: '2018', title: 'National Reach', description: 'Started delivering across all 36 states' },
    { year: '2022', title: '1000th Project', description: 'Celebrated completion of our 1000th project' },
    { year: '2024', title: 'Industry Leader', description: 'Recognized as Nigeria\'s premier furniture manufacturer' },
  ];

  return (
    <div className="min-h-screen bg-beige pb-20">
      {/* Hero */}
      <div className="bg-ash text-beige">
        <div className="container-wide py-16 md:py-24">
          <div className="max-w-3xl">
            <span className="font-mono text-sm text-beige/60 tracking-wider uppercase">About Us</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold mt-4 mb-6">
              Crafting Nigerian Excellence Since 2009
            </h1>
            <p className="text-beige/70 text-lg leading-relaxed">
              Ashcone Luxury is Nigeria's premier furniture manufacturer, dedicated to creating exceptional pieces that combine traditional craftsmanship with contemporary design.
            </p>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-mono text-sm text-ash/60 tracking-wider uppercase">Our Story</span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ash mt-4 mb-6">
                From Small Workshop to Industry Leader
              </h2>
              <div className="space-y-4 text-ash/70 leading-relaxed">
                <p>
                  What began as a small furniture workshop in Lagos has grown into one of Nigeria's most respected furniture manufacturers. Founded in 2009 by a team of passionate craftsmen, Ashcone Luxury was built on a simple principle: create furniture that combines exceptional quality with timeless design.
                </p>
                <p>
                  Over the years, we've had the privilege of furnishing homes, offices, schools, and institutions across Nigeria. Each project has taught us something new and helped us refine our craft.
                </p>
                <p>
                  Today, our state-of-the-art manufacturing facility employs over 200 skilled artisans who share our commitment to excellence. We source the finest materials locally and internationally, ensuring every piece that leaves our factory meets our exacting standards.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/hero-sofa.jpg"
                alt="Craftsmanship"
                className="rounded-lg shadow-soft mt-8"
              />
              <img
                src="/manifesto-detail.jpg"
                alt="Detail"
                className="rounded-lg shadow-soft"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-beige-light">
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="font-mono text-sm text-ash/60 tracking-wider uppercase">What We Stand For</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ash mt-4">
              Our Values
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-ash rounded-lg flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-beige" />
                </div>
                <h3 className="font-display text-xl font-semibold text-ash mb-3">
                  {value.title}
                </h3>
                <p className="text-ash/70 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="text-center mb-16">
            <span className="font-mono text-sm text-ash/60 tracking-wider uppercase">Our Journey</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ash mt-4">
              Milestones
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-ash/20" />
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-start gap-8 mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="hidden md:block flex-1" />
                  <div className="w-8 h-8 bg-ash rounded-full flex items-center justify-center relative z-10 flex-shrink-0">
                    <Check className="w-4 h-4 text-beige" />
                  </div>
                  <div className="flex-1 md:text-left">
                    <span className="font-mono text-sm text-brand-orange font-medium">
                      {milestone.year}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-ash mt-1 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-ash/70">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-ash text-beige">
        <div className="container-wide text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
            Be Part of Our Story
          </h2>
          <p className="text-beige/70 max-w-xl mx-auto mb-8">
            Whether you're furnishing your home or outfitting an entire office building, we'd love to work with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('shop')}
              className="bg-beige text-ash hover:bg-beige-dark"
            >
              Shop Collection
            </Button>
            <Button
              onClick={() => navigate('contact')}
              variant="outline"
              className="border-beige text-beige hover:bg-beige hover:text-ash"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
