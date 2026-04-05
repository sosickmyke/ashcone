import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { companyInfo } from '@/data';
import type { Page } from '@/App';

interface FooterProps {
  navigate: (page: Page) => void;
}

export default function Footer({ navigate }: FooterProps) {
  const quickLinks = [
    { label: 'Home', page: 'home' as Page },
    { label: 'Shop', page: 'shop' as Page },
    { label: 'Custom Furniture', page: 'custom' as Page },
    { label: 'Corporate Services', page: 'corporate' as Page },
    { label: 'Projects', page: 'projects' as Page },
    { label: 'About Us', page: 'about' as Page },
    { label: 'Contact', page: 'contact' as Page },
  ];

  const services = [
    'Home Furniture',
    'Office Furniture',
    'School Furniture',
    'Custom Design',
    'Bulk Orders',
    'Furniture Contracts',
  ];

  const handleLinkClick = (page: Page) => {
    navigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-ash text-beige">
      {/* Main Footer */}
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-beige rounded-sm flex items-center justify-center">
                <span className="text-ash font-display font-bold text-lg">A</span>
              </div>
              <div>
                <span className="font-display text-xl font-semibold">Ashcone</span>
                <span className="font-display text-xl font-light ml-1">Luxury</span>
              </div>
            </div>
            <p className="text-beige/70 text-sm leading-relaxed mb-6">
              {companyInfo.description}
            </p>
            <div className="flex gap-3">
              <a
                href={`https://instagram.com/${companyInfo.social.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-beige/10 flex items-center justify-center hover:bg-beige/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={`https://facebook.com/${companyInfo.social.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-beige/10 flex items-center justify-center hover:bg-beige/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`https://twitter.com/${companyInfo.social.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-beige/10 flex items-center justify-center hover:bg-beige/20 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={`https://linkedin.com/company/${companyInfo.social.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-beige/10 flex items-center justify-center hover:bg-beige/20 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.page)}
                    className="text-beige/70 hover:text-beige text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-beige/70 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-beige/50 mt-0.5 flex-shrink-0" />
                <span className="text-beige/70 text-sm">{companyInfo.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="flex items-center gap-3 text-beige/70 hover:text-beige text-sm transition-colors"
                >
                  <Phone className="w-5 h-5 text-beige/50 flex-shrink-0" />
                  {companyInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="flex items-center gap-3 text-beige/70 hover:text-beige text-sm transition-colors"
                >
                  <Mail className="w-5 h-5 text-beige/50 flex-shrink-0" />
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-beige/50 mt-0.5 flex-shrink-0" />
                <span className="text-beige/70 text-sm">{companyInfo.hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-beige/10">
        <div className="container-wide py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-beige/50 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <button className="text-beige/50 hover:text-beige text-sm transition-colors">
                Privacy Policy
              </button>
              <button className="text-beige/50 hover:text-beige text-sm transition-colors">
                Terms of Service
              </button>
              <button 
                onClick={() => handleLinkClick('admin')}
                className="text-beige/50 hover:text-beige text-sm transition-colors"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
