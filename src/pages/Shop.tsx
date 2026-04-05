import { useState, useMemo } from 'react';
import { Search, Filter, Grid3X3, LayoutList, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { products, categories } from '@/data';
import { useCart, useWishlist } from '@/store';
import { toast } from 'sonner';
import type { Page } from '@/App';

interface ShopProps {
  navigate: (page: Page, productId?: string) => void;
}

export default function Shop({ navigate }: ShopProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name' | 'newest'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [_showFilters, _setShowFilters] = useState(false);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategories, priceRange, sortBy]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlistToggle = (productId: string) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(productId);
      toast.success('Added to wishlist');
    }
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h4 className="font-display font-semibold text-ash mb-4">Categories</h4>
        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Checkbox
                checked={selectedCategories.includes(category.name)}
                onCheckedChange={() => handleCategoryToggle(category.name)}
              />
              <span className="text-ash/70 text-sm">{category.name}</span>
              <span className="text-ash/40 text-xs ml-auto">({category.productCount})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-display font-semibold text-ash mb-4">Price Range</h4>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          max={2000000}
          step={50000}
          className="mb-4"
        />
        <div className="flex items-center justify-between text-sm text-ash/70">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full border-ash text-ash hover:bg-ash hover:text-beige"
        onClick={() => {
          setSelectedCategories([]);
          setPriceRange([0, 2000000]);
          setSearchQuery('');
        }}
      >
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-beige pb-20">
      {/* Header */}
      <div className="bg-beige-light border-b border-ash/10">
        <div className="container-wide py-8 md:py-12">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-ash mb-4">
            Shop
          </h1>
          <p className="text-ash/70 max-w-xl">
            Discover our collection of handcrafted furniture, designed and made in Nigeria with premium materials.
          </p>
        </div>
      </div>

      <div className="container-wide py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h3 className="font-display text-lg font-semibold text-ash mb-6">Filters</h3>
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ash/40" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-ash/20"
                />
              </div>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden border-ash text-ash">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-beige">
                  <h3 className="font-display text-lg font-semibold text-ash mb-6">Filters</h3>
                  <FilterContent />
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-4 py-2 bg-white border border-ash/20 rounded-md text-ash text-sm focus:outline-none focus:ring-2 focus:ring-ash/20"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-ash/20 rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-ash text-beige' : 'bg-white text-ash'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-ash text-beige' : 'bg-white text-ash'}`}
                >
                  <LayoutList className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-ash/60 text-sm mb-6">
              Showing {filteredProducts.length} of {products.length} products
            </p>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-ash/60 text-lg">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4 border-ash text-ash"
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 2000000]);
                    setSearchQuery('');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-6'
                }
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`group bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-elevated transition-shadow ${
                      viewMode === 'list' ? 'flex gap-6' : ''
                    }`}
                  >
                    {/* Image */}
                    <button
                      onClick={() => navigate('product', product.id)}
                      className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-[3/4]'
                      }`}
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 custom-expo group-hover:scale-105"
                      />
                      {product.originalPrice && (
                        <Badge className="absolute top-3 left-3 bg-brand-red text-white border-0">
                          Sale
                        </Badge>
                      )}
                      {product.isCustomizable && (
                        <Badge className="absolute top-3 right-3 bg-ash text-beige border-0">
                          Customizable
                        </Badge>
                      )}
                    </button>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      <button
                        onClick={() => navigate('product', product.id)}
                        className="text-left"
                      >
                        <p className="text-ash/60 text-sm mb-1">{product.category}</p>
                        <h3 className="font-display text-lg font-medium text-ash group-hover:text-ash-light transition-colors mb-2">
                          {product.name}
                        </h3>
                        {viewMode === 'list' && (
                          <p className="text-ash/70 text-sm line-clamp-2 mb-3">
                            {product.description}
                          </p>
                        )}
                      </button>

                      <div className="mt-auto flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-ash">{formatPrice(product.price)}</p>
                          {product.originalPrice && (
                            <p className="text-ash/50 text-sm line-through">
                              {formatPrice(product.originalPrice)}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleWishlistToggle(product.id)}
                            className={`p-2 rounded-md transition-colors ${
                              isInWishlist(product.id)
                                ? 'bg-brand-red text-white'
                                : 'bg-beige text-ash hover:bg-ash hover:text-beige'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="p-2 bg-ash text-beige rounded-md hover:bg-ash-light transition-colors"
                          >
                            <ShoppingBag className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
