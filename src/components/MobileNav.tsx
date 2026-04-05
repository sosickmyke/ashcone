import { Home, ShoppingBag, Sofa, Building2, User } from 'lucide-react';
import type { Page } from '@/App';

interface MobileNavProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

export default function MobileNav({ currentPage, navigate }: MobileNavProps) {
  const navItems = [
    { icon: Home, label: 'Home', page: 'home' as Page },
    { icon: ShoppingBag, label: 'Shop', page: 'shop' as Page },
    { icon: Sofa, label: 'Custom', page: 'custom' as Page },
    { icon: Building2, label: 'Corporate', page: 'corporate' as Page },
    { icon: User, label: 'Contact', page: 'contact' as Page },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-ash border-t border-beige/10 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = currentPage === item.page;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.page)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-beige'
                  : 'text-beige/50 hover:text-beige/70'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
