import { useEffect, useRef } from 'react';
import { ArrowRight, Star, Check, Truck, Palette, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products, categories, testimonials, companyInfo } from '@/data';
import type { Page } from '@/App';

interface HomeProps {
  navigate: (page: Page, productId?: string) => void;
}

export default function Home({ navigate }: HomeProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-beige via-beige-light to-beige-dark" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-ash/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-ash/3 rounded-full blur-3xl" />

        <div className="container-wide relative z-10 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <Badge className="mb-6 px-4 py-1.5 bg-ash/10 text-ash border-0 font-mono text-xs tracking-wider">
                {companyInfo.tagline}
              </Badge>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-ash leading-tight mb-6">
                Crafted for
                <span className="block italic font-light">Living</span>
              </h1>
              <p className="text-ash/70 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mb-8">
                Discover furniture that tells your story. Handcrafted in Nigeria with precision, passion, and premium materials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => navigate('shop')}
                  className="bg-ash text-beige hover:bg-ash-light px-8 py-6 text-base font-medium"
                >
                  Explore Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  onClick={() => navigate('custom')}
                  variant="outline"
                  className="border-ash text-ash hover:bg-ash hover:text-beige px-8 py-6 text-base font-medium"
                >
                  Custom Design
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-ash/10">
                <div>
                  <div className="font-display text-2xl md:text-3xl font-semibold text-ash">15+</div>
                  <div className="text-ash/60 text-sm">Years Experience</div>
                </div>
                <div>
                  <div className="font-display text-2xl md:text-3xl font-semibold text-ash">5000+</div>
                  <div className="text-ash/60 text-sm">Happy Clients</div>
                </div>
                <div>
                  <div className="font-display text-2xl md:text-3xl font-semibold text-ash">100%</div>
                  <div className="text-ash/60 text-sm">Nigerian Made</div>
                </div>
              </div>
            </div>

            {/* Hero Images */}
            <div className="order-1 lg:order-2 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-8">
                  <div className="image-reveal rounded-lg overflow-hidden shadow-elevated">
                    <img
                      src="/hero-sofa.jpg"
                      alt="Luxury Sofa"
                      className="w-full h-48 md:h-64 object-cover"
                    />
                  </div>
                  <div className="image-reveal rounded-lg overflow-hidden shadow-soft">
                    <img
                      src="/hero-chair.jpg"
                      alt="Designer Chair"
                      className="w-full h-40 md:h-52 object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="image-reveal rounded-lg overflow-hidden shadow-soft">
                    <img
                      src="/hero-table.jpg"
                      alt="Dining Table"
                      className="w-full h-40 md:h-52 object-cover"
                    />
                  </div>
                  <div className="image-reveal rounded-lg overflow-hidden shadow-elevated">
                    <img
                      src="/product-bed-1.jpg"
                      alt="Luxury Bed"
                      className="w-full h-48 md:h-64 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 md:py-32 bg-beige-light">
        <div className="container-wide">
          <div className="text-center mb-16 reveal-on-scroll opacity-0">
            <span className="font-mono text-sm text-ash/60 tracking-wider uppercase">Browse by Category</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ash mt-4">
              Find Your Style
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => navigate('shop')}
                className="group relative aspect-[3/4] rounded-lg overflow-hidden reveal-on-scroll opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 custom-expo group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ash/80 via-ash/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="font-display text-lg md:text-xl font-semibold text-beige mb-1">
                    {category.name}
                  </h3>
                  <p className="text-beige/70 text-sm">{category.productCount} Products</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/featured-collection.jpg"
            alt="Featured Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ash/60" />
        </div>
        
        <div className="container-wide relative z-10">
          <div className="max-w-xl ml-auto reveal-on-scroll opacity-0">
            <div className="glass-card rounded-lg p-8 md:p-12">
              <Badge className="mb-4 bg-ash text-beige border-0">Featured Collection</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-ash mb-4">
                The Artisan Series
              </h2>
              <p className="text-ash/70 mb-6">
                Hand-stitched leather meets sustainable oak. Our flagship collection represents the pinnacle of Nigerian craftsmanship, designed for those who appreciate the finer things.
              </p>
              <ul className="space-y-3 mb-8">
                {['Premium materials', 'Lifetime warranty', 'Free white-glove delivery'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-ash/70">
                    <Check className="w-5 h-5 text-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => navigate('shop')}
                className="bg-ash text-beige hover:bg-ash-light"
              >
                Discover More
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-32 bg-beige">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 reveal-on-scroll opacity-0">
            <div>
              <span className="font-mono text-sm text-ash/60 tracking-wider uppercase">Best Sellers</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ash mt-4">
                Curated For You
              </h2>
            </div>
            <Button
              onClick={() => navigate('shop')}
              variant="outline"
              className="border-ash text-ash hover:bg-ash hover:text-beige mt-4 md:mt-0"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product, index) => (
              <div
                key={product.id}
                className="group reveal-on-scroll opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <button
                  onClick={() => navigate('product', product.id)}
                  className="block text-left w-full"
                >
                  <div className="image-reveal aspect-[3/4] rounded-lg overflow-hidden bg-beige-dark mb-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-lg font-medium text-ash group-hover:text-ash-light transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-ash/60 text-sm">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-ash">{formatPrice(product.price)}</p>
                      {product.originalPrice && (
                        <p className="text-ash/50 text-sm line-through">
                          {formatPrice(product.originalPrice)}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-32 bg-ash text-beige">
        <div className="container-wide">
          <div className="text-center mb-16 reveal-on-scroll opacity-0">
            <span className="font-mono text-sm text-beige/60 tracking-wider uppercase">What We Offer</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mt-4">
              Our Services
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Palette,
                title: 'Custom Design',
                description: 'Work with our designers to create bespoke furniture tailored to your exact specifications and style preferences.',
              },
              {
                icon: Truck,
                title: 'Delivery & Assembly',
                description: 'White-glove delivery service with professional assembly included. We handle everything from door to room.',
              },
              {
                icon: Shield,
                title: 'Corporate Solutions',
                description: 'End-to-end furnishing solutions for offices, schools, hotels, and institutions with bulk pricing.',
              },
            ].map((service, index) => (
              <div
                key={service.title}
                className="p-8 rounded-lg bg-beige/5 border border-beige/10 hover:bg-beige/10 transition-colors reveal-on-scroll opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <service.icon className="w-10 h-10 text-beige/60 mb-6" />
                <h3 className="font-display text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-beige/70 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-beige-light">
        <div className="container-wide">
          <div className="text-center mb-16 reveal-on-scroll opacity-0">
            <span className="font-mono text-sm text-ash/60 tracking-wider uppercase">Testimonials</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ash mt-4">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-beige rounded-lg p-8 shadow-soft reveal-on-scroll opacity-0"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-brand-orange text-brand-orange" />
                  ))}
                </div>
                <p className="text-ash/80 leading-relaxed mb-6">"{testimonial.content}"</p>
                <div>
                  <p className="font-display font-semibold text-ash">{testimonial.name}</p>
                  <p className="text-ash/60 text-sm">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-beige">
        <div className="container-wide">
          <div className="bg-ash rounded-2xl p-8 md:p-16 text-center reveal-on-scroll opacity-0">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-beige mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-beige/70 text-lg max-w-2xl mx-auto mb-8">
              Whether you need a single piece or a complete furnishing solution, we're here to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('shop')}
                className="bg-beige text-ash hover:bg-beige-dark px-8 py-6 text-base font-medium"
              >
                Shop Now
              </Button>
              <Button
                onClick={() => navigate('contact')}
                variant="outline"
                className="border-beige text-beige hover:bg-beige hover:text-ash px-8 py-6 text-base font-medium"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
