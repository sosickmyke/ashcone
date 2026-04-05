import { useState, useEffect } from 'react';
import { AppProvider } from '@/store';
import { companyInfo } from '@/data';
import { Toaster } from '@/components/ui/sonner';

// Pages
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import CustomFurniture from '@/pages/CustomFurniture';
import Corporate from '@/pages/Corporate';
import Projects from '@/pages/Projects';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Cart from '@/pages/Cart';
import Admin from '@/pages/Admin';

// Components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import WhatsAppButton from '@/components/WhatsAppButton';

export type Page = 
  | 'home' 
  | 'shop' 
  | 'product' 
  | 'custom' 
  | 'corporate' 
  | 'projects' 
  | 'about' 
  | 'contact' 
  | 'cart' 
  | 'admin';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigate = (page: Page, productId?: string) => {
    setCurrentPage(page);
    if (productId) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigate={navigate} />;
      case 'shop':
        return <Shop navigate={navigate} />;
      case 'product':
        return selectedProductId ? (
          <ProductDetail productId={selectedProductId} navigate={navigate} />
        ) : (
          <Shop navigate={navigate} />
        );
      case 'custom':
        return <CustomFurniture navigate={navigate} />;
      case 'corporate':
        return <Corporate navigate={navigate} />;
      case 'projects':
        return <Projects navigate={navigate} />;
      case 'about':
        return <About navigate={navigate} />;
      case 'contact':
        return <Contact navigate={navigate} />;
      case 'cart':
        return <Cart navigate={navigate} />;
      case 'admin':
        return <Admin navigate={navigate} />;
      default:
        return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-beige grain-overlay">
      <Navbar currentPage={currentPage} navigate={navigate} />
      <main className="pt-16 md:pt-20">
        {renderPage()}
      </main>
      <Footer navigate={navigate} />
      {isMobile && <MobileNav currentPage={currentPage} navigate={navigate} />}
      <WhatsAppButton phone={companyInfo.whatsapp} />
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
