export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  description: string;
  specifications: Record<string, string>;
  images: string[];
  inStock: boolean;
  stockQuantity?: number;
  rating: number;
  reviews: number;
  isCustomizable: boolean;
  materials?: string[];
  colors?: string[];
  dimensions?: {
    width: number;
    height: number;
    depth: number;
    unit: string;
  };
  deliveryInfo?: string;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customization?: CustomizationOptions;
}

export interface CustomizationOptions {
  material?: string;
  color?: string;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  features?: string[];
  notes?: string;
}

export interface CustomFurnitureRequest {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  furnitureType: string;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
    unit: string;
  };
  material?: string;
  color?: string;
  features: string[];
  referenceImages: string[];
  notes: string;
  budget?: number;
  timeline?: string;
  status: 'new' | 'review' | 'quote' | 'production' | 'delivery' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  quote?: {
    amount: number;
    description: string;
    validUntil: Date;
  };
}

export interface CorporateQuoteRequest {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  projectType: string;
  projectSize: string;
  budgetRange: string;
  timeline: string;
  requirements: string;
  location: string;
  status: 'new' | 'review' | 'quoted' | 'accepted' | 'in-progress' | 'completed';
  createdAt: Date;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  email: string;
  phone: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: Address;
  orders: Order[];
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  images: string[];
  location: string;
  completionDate: Date;
  value?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  image?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
