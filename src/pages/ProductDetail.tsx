import { useState } from 'react';
import { ArrowLeft, Heart, ShoppingBag, Truck, Shield, Check, Star, Plus, Minus, Ruler, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '@/data';
import { useCart, useWishlist } from '@/store';
import { toast } from 'sonner';
import type { Page } from '@/App';

interface ProductDetailProps {
  productId: string;
  navigate: (page: Page, productId?: string) => void;
}

export default function ProductDetail({ productId, navigate }: ProductDetailProps) {
  const product = products.find((p) => p.id === productId);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState(product?.materials?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!product) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl text-ash mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('shop')} className="bg-ash text-beige">
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      material: selectedMaterial,
      color: selectedColor,
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product.id);
      toast.success('Added to wishlist');
    }
  };

  const handleCustomize = () => {
    navigate('custom');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-beige pb-20">
      {/* Breadcrumb */}
      <div className="bg-beige-light border-b border-ash/10">
        <div className="container-wide py-4">
          <button
            onClick={() => navigate('shop')}
            className="flex items-center gap-2 text-ash/60 hover:text-ash transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </button>
        </div>
      </div>

      <div className="container-wide py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-beige-dark">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-ash' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="secondary" className="bg-ash/10 text-ash">
                  {product.category}
                </Badge>
                {product.isCustomizable && (
                  <Badge className="bg-brand-green text-white">Customizable</Badge>
                )}
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-semibold text-ash mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-brand-orange text-brand-orange'
                          : 'text-ash/20'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-ash/60 text-sm">({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-semibold text-ash">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-ash/50 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-ash/70 leading-relaxed">{product.description}</p>

            {/* Customization Options */}
            {product.isCustomizable && (
              <div className="space-y-4 p-4 bg-beige-light rounded-lg">
                <h3 className="font-display font-semibold text-ash">Customization Options</h3>
                
                {product.materials && product.materials.length > 0 && (
                  <div>
                    <label className="text-sm text-ash/60 mb-2 block">Material</label>
                    <div className="flex flex-wrap gap-2">
                      {product.materials.map((material) => (
                        <button
                          key={material}
                          onClick={() => setSelectedMaterial(material)}
                          className={`px-4 py-2 rounded-md text-sm border transition-colors ${
                            selectedMaterial === material
                              ? 'bg-ash text-beige border-ash'
                              : 'bg-white text-ash border-ash/20 hover:border-ash'
                          }`}
                        >
                          {material}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.colors && product.colors.length > 0 && (
                  <div>
                    <label className="text-sm text-ash/60 mb-2 block">Color</label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 rounded-md text-sm border transition-colors ${
                            selectedColor === color
                              ? 'bg-ash text-beige border-ash'
                              : 'bg-white text-ash border-ash/20 hover:border-ash'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-ash/60">Quantity:</span>
              <div className="flex items-center border border-ash/20 rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-ash/5"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-ash/5"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-ash text-beige hover:bg-ash-light py-6"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={handleWishlistToggle}
                variant="outline"
                className={`py-6 ${
                  isInWishlist(product.id)
                    ? 'bg-brand-red text-white border-brand-red hover:bg-brand-red/90'
                    : 'border-ash text-ash hover:bg-ash hover:text-beige'
                }`}
              >
                <Heart className={`w-5 h-5 mr-2 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                {isInWishlist(product.id) ? 'Saved' : 'Save'}
              </Button>
              {product.isCustomizable && (
                <Button
                  onClick={handleCustomize}
                  variant="outline"
                  className="border-ash text-ash hover:bg-ash hover:text-beige py-6"
                >
                  <Palette className="w-5 h-5 mr-2" />
                  Customize
                </Button>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-ash/10">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-ash/60" />
                <span className="text-sm text-ash/70">Free Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-ash/60" />
                <span className="text-sm text-ash/70">2 Year Warranty</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-ash/60" />
                <span className="text-sm text-ash/70">Premium Materials</span>
              </div>
              <div className="flex items-center gap-3">
                <Ruler className="w-5 h-5 text-ash/60" />
                <span className="text-sm text-ash/70">Custom Sizes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="bg-beige-light border-b border-ash/10 w-full justify-start rounded-none h-auto p-0">
              <TabsTrigger
                value="specs"
                className="rounded-none px-6 py-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-ash"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="delivery"
                className="rounded-none px-6 py-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-ash"
              >
                Delivery Info
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none px-6 py-4 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-ash"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="specs" className="mt-6">
              <div className="bg-white rounded-lg p-6 md:p-8">
                <h3 className="font-display text-xl font-semibold text-ash mb-6">Product Specifications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-ash/10">
                      <span className="text-ash/60">{key}</span>
                      <span className="text-ash font-medium">{value}</span>
                    </div>
                  ))}
                </div>
                {product.dimensions && (
                  <div className="mt-6 pt-6 border-t border-ash/10">
                    <h4 className="font-display font-semibold text-ash mb-4">Dimensions</h4>
                    <div className="flex gap-8">
                      <div>
                        <span className="text-ash/60 text-sm">Width</span>
                        <p className="text-ash font-medium">{product.dimensions.width}{product.dimensions.unit}</p>
                      </div>
                      <div>
                        <span className="text-ash/60 text-sm">Height</span>
                        <p className="text-ash font-medium">{product.dimensions.height}{product.dimensions.unit}</p>
                      </div>
                      <div>
                        <span className="text-ash/60 text-sm">Depth</span>
                        <p className="text-ash font-medium">{product.dimensions.depth}{product.dimensions.unit}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="delivery" className="mt-6">
              <div className="bg-white rounded-lg p-6 md:p-8">
                <h3 className="font-display text-xl font-semibold text-ash mb-4">Delivery Information</h3>
                <p className="text-ash/70 leading-relaxed mb-6">
                  {product.deliveryInfo || 'Standard delivery applies to this product.'}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-brand-green mt-0.5" />
                    <div>
                      <h4 className="font-medium text-ash">Free Delivery</h4>
                      <p className="text-ash/60 text-sm">Within Lagos metropolis</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-brand-green mt-0.5" />
                    <div>
                      <h4 className="font-medium text-ash">Assembly Service</h4>
                      <p className="text-ash/60 text-sm">Professional assembly included for large items</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="bg-white rounded-lg p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl font-display font-semibold text-ash">{product.rating}</div>
                  <div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-brand-orange text-brand-orange'
                              : 'text-ash/20'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-ash/60 text-sm">Based on {product.reviews} reviews</p>
                  </div>
                </div>
                <p className="text-ash/60">Reviews coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-ash mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => navigate('product', product.id)}
                  className="group text-left"
                >
                  <div className="aspect-[3/4] rounded-lg overflow-hidden bg-beige-dark mb-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 custom-expo group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-display font-medium text-ash group-hover:text-ash-light transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-ash/60 text-sm">{formatPrice(product.price)}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
