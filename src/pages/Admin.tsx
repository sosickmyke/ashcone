import { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Palette, 
  Building2, 
  LogOut,
  Search,
  MoreHorizontal,
  Check,
  X,
  Eye,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useApp, useAdmin } from '@/store';
import { products } from '@/data';
import { toast } from 'sonner';
import type { Page } from '@/App';
// Types imported as needed

interface AdminProps {
  navigate: (page: Page, productId?: string) => void;
}

const statusColors: Record<string, string> = {
  new: 'bg-brand-blue text-white',
  review: 'bg-brand-orange text-white',
  quote: 'bg-brand-green text-white',
  production: 'bg-ash text-beige',
  delivery: 'bg-purple-500 text-white',
  completed: 'bg-brand-green text-white',
  'pending': 'bg-brand-orange text-white',
  'confirmed': 'bg-brand-blue text-white',
  'processing': 'bg-ash text-beige',
  'shipped': 'bg-purple-500 text-white',
  'delivered': 'bg-brand-green text-white',
  'cancelled': 'bg-brand-red text-white',
};

export default function Admin({ navigate }: AdminProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const { state } = useApp();
  const { isAdmin, setAdmin } = useAdmin();
  const [loginPassword, setLoginPassword] = useState('');

  // Simple admin authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPassword === 'admin123') {
      setAdmin(true);
      toast.success('Welcome to Admin Dashboard');
    } else {
      toast.error('Invalid password');
    }
  };

  const handleLogout = () => {
    setAdmin(false);
    setLoginPassword('');
    navigate('home');
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-ash rounded-lg flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard className="w-8 h-8 text-beige" />
            </div>
            <CardTitle className="font-display text-2xl">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm text-ash/60 mb-2 block">Password</label>
                <Input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="bg-white"
                />
              </div>
              <Button type="submit" className="w-full bg-ash text-beige hover:bg-ash-light">
                Login
              </Button>
            </form>
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-2 text-ash/60 hover:text-ash mt-6 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = [
    { label: 'Total Products', value: products.length, icon: ShoppingBag },
    { label: 'Custom Requests', value: state.customRequests.length, icon: Palette },
    { label: 'Corporate Quotes', value: state.corporateRequests.length, icon: Building2 },
    { label: 'Total Orders', value: state.orders.length, icon: Users },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-ash/60 text-sm">{stat.label}</p>
                  <p className="font-display text-3xl font-semibold text-ash mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className="w-12 h-12 bg-ash/5 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-ash" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Recent Custom Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {state.customRequests.length === 0 ? (
              <p className="text-ash/60 text-center py-8">No custom requests yet</p>
            ) : (
              <div className="space-y-4">
                {state.customRequests.slice(0, 5).map((req) => (
                  <div key={req.id} className="flex items-center justify-between p-3 bg-beige-light rounded-lg">
                    <div>
                      <p className="font-medium text-ash">{req.furnitureType}</p>
                      <p className="text-ash/60 text-sm">{req.customerName}</p>
                    </div>
                    <Badge className={statusColors[req.status]}>
                      {req.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">Recent Corporate Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            {state.corporateRequests.length === 0 ? (
              <p className="text-ash/60 text-center py-8">No corporate quotes yet</p>
            ) : (
              <div className="space-y-4">
                {state.corporateRequests.slice(0, 5).map((req) => (
                  <div key={req.id} className="flex items-center justify-between p-3 bg-beige-light rounded-lg">
                    <div>
                      <p className="font-medium text-ash">{req.companyName}</p>
                      <p className="text-ash/60 text-sm">{req.projectType}</p>
                    </div>
                    <Badge className={statusColors[req.status]}>
                      {req.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCustomRequests = () => (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CardTitle className="font-display text-lg">Custom Furniture Requests</CardTitle>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ash/40" />
            <Input
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {state.customRequests.length === 0 ? (
          <div className="text-center py-16">
            <Palette className="w-16 h-16 text-ash/20 mx-auto mb-4" />
            <p className="text-ash/60">No custom requests yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ash/10">
                  <th className="text-left py-3 px-4 font-medium text-ash/60">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-ash/60">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-ash/60">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-ash/60">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-ash/60">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-ash/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.customRequests
                  .filter((req) =>
                    req.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    req.furnitureType.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((req) => (
                    <tr key={req.id} className="border-b border-ash/5 hover:bg-beige-light">
                      <td className="py-3 px-4 font-mono text-sm">{req.id}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-ash">{req.customerName}</p>
                          <p className="text-ash/60 text-sm">{req.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">{req.furnitureType}</td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(req.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={statusColors[req.status]}>
                          {req.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-2 hover:bg-ash/5 rounded-md">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast.info('View details coming soon')}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.info('Update status coming soon')}>
                              <Check className="w-4 h-4 mr-2" />
                              Update Status
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderCorporateQuotes = () => (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CardTitle className="font-display text-lg">Corporate Quote Requests</CardTitle>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ash/40" />
            <Input
              placeholder="Search quotes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {state.corporateRequests.length === 0 ? (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-ash/20 mx-auto mb-4" />
            <p className="text-ash/60">No corporate quotes yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ash/10">
                  <th className="text-left py-3 px-4 font-medium text-ash/60">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-ash/60">Company</th>
                  <th className="text-left py-3 px-4 font-medium text-ash/60">Project Type</th>
                  <th className="text-left py-3 px-4 font-medium text-ash/60">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-ash/60">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-ash/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.corporateRequests
                  .filter((req) =>
                    req.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    req.projectType.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((req) => (
                    <tr key={req.id} className="border-b border-ash/5 hover:bg-beige-light">
                      <td className="py-3 px-4 font-mono text-sm">{req.id}</td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-ash">{req.companyName}</p>
                          <p className="text-ash/60 text-sm">{req.contactName}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">{req.projectType}</td>
                      <td className="py-3 px-4">{req.location}</td>
                      <td className="py-3 px-4">
                        <Badge className={statusColors[req.status]}>
                          {req.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-2 hover:bg-ash/5 rounded-md">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast.info('View details coming soon')}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.info('Send quote coming soon')}>
                              <Check className="w-4 h-4 mr-2" />
                              Send Quote
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderProducts = () => (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CardTitle className="font-display text-lg">Products</CardTitle>
        <Button className="bg-ash text-beige hover:bg-ash-light">
          Add New Product
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ash/10">
                <th className="text-left py-3 px-4 font-medium text-ash/60">Product</th>
                <th className="text-left py-3 px-4 font-medium text-ash/60">Category</th>
                <th className="text-left py-3 px-4 font-medium text-ash/60">Price</th>
                <th className="text-left py-3 px-4 font-medium text-ash/60">Stock</th>
                <th className="text-left py-3 px-4 font-medium text-ash/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-ash/5 hover:bg-beige-light">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <span className="font-medium text-ash">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">
                    ₦{product.price.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <Badge className={product.inStock ? 'bg-brand-green text-white' : 'bg-brand-red text-white'}>
                      {product.inStock ? `${product.stockQuantity} in stock` : 'Out of stock'}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-ash/5 rounded-md">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast.info('Edit coming soon')}>
                          <Eye className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.info('Delete coming soon')} className="text-brand-red">
                          <X className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-beige">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-ash text-beige hidden lg:block z-50">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-beige rounded-lg flex items-center justify-center">
              <span className="text-ash font-display font-bold text-lg">A</span>
            </div>
            <div>
              <span className="font-display font-semibold">Ashcone</span>
              <span className="font-display font-light ml-1">Admin</span>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'products', label: 'Products', icon: ShoppingBag },
              { id: 'custom', label: 'Custom Requests', icon: Palette },
              { id: 'corporate', label: 'Corporate Quotes', icon: Building2 },
              { id: 'orders', label: 'Orders', icon: Users },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-beige text-ash'
                    : 'text-beige/70 hover:bg-beige/10 hover:text-beige'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-beige/70 hover:text-beige transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden bg-ash text-beige p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-beige rounded-lg flex items-center justify-center">
            <span className="text-ash font-display font-bold">A</span>
          </div>
          <span className="font-display font-semibold">Admin</span>
        </div>
        <button onClick={handleLogout}>
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 md:p-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-ash capitalize">
              {activeTab === 'custom' ? 'Custom Requests' : activeTab === 'corporate' ? 'Corporate Quotes' : activeTab}
            </h1>
            <button
              onClick={() => navigate('home')}
              className="text-ash/60 hover:text-ash text-sm"
            >
              View Website
            </button>
          </div>

          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'custom' && renderCustomRequests()}
          {activeTab === 'corporate' && renderCorporateQuotes()}
          {activeTab === 'orders' && (
            <Card>
              <CardContent className="p-16 text-center">
                <Users className="w-16 h-16 text-ash/20 mx-auto mb-4" />
                <p className="text-ash/60">Orders management coming soon</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
