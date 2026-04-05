import { useState, useEffect } from 'react';
import { Menu, ShoppingBag, Heart, Search, Phone } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { useCart, useWishlist } from '@/store';
import { navItems, companyInfo } from '@/data';
import type { Page } from '@/App';

interface NavbarProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

export default function Navbar({ currentPage, navigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: Page) => {
    navigate(page);
    setIsMobileMenuOpen(false);
  };

  const isActive = (page: Page) => currentPage === page;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 custom-expo ${
        isScrolled
          ? 'bg-beige/95 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-ash rounded-sm flex items-center justify-center">
              <span className="text-beige font-display font-bold text-sm md:text-lg">A</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-lg md:text-xl font-semibold text-ash">
                Ashcone
              </span>
              <span className="font-display text-lg md:text-xl font-light text-ash ml-1">
                Luxury
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const page = item.href.replace('/', '') as Page || 'home';
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(page)}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    isActive(page)
                      ? 'text-ash'
                      : 'text-ash/70 hover:text-ash'
                  }`}
                >
                  {item.label}
                  {isActive(page) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-ash" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search */}
            <button className="hidden md:flex p-2 text-ash/70 hover:text-ash transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNavClick('shop')}
              className="hidden md:flex p-2 text-ash/70 hover:text-ash transition-colors relative"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-ash text-beige text-xs">
                  {wishlist.length}
                </Badge>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => handleNavClick('cart')}
              className="flex p-2 text-ash/70 hover:text-ash transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-ash text-beige text-xs">
                  {cartCount}
                </Badge>
              )}
            </button>

            {/* Phone */}
            <a
              href={`tel:${companyInfo.phone}`}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-ash text-beige rounded-sm text-sm font-medium hover:bg-ash-light transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us</span>
            </a>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 text-ash">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 bg-beige border-l border-ash/10">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4 border-b border-ash/10">
                    <span className="font-display text-xl font-semibold text-ash">
                      Menu
                    </span>
                  </div>
                  <nav className="flex flex-col gap-2 py-6">
                    {navItems.map((item) => {
                      const page = item.href.replace('/', '') as Page || 'home';
                      return (
                        <button
                          key={item.label}
                          onClick={() => handleNavClick(page)}
                          className={`text-left px-4 py-3 rounded-sm text-lg font-medium transition-colors ${
                            isActive(page)
                              ? 'bg-ash text-beige'
                              : 'text-ash hover:bg-ash/5'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </nav>
                  <div className="mt-auto py-6 border-t border-ash/10">
                    <a
                      href={`tel:${companyInfo.phone}`}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-ash text-beige rounded-sm font-medium"
                    >
                      <Phone className="w-5 h-5" />
                      <span>{companyInfo.phone}</span>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
