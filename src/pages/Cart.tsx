import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/store';
import { toast } from 'sonner';
import type { Page } from '@/App';

interface CartProps {
  navigate: (page: Page, productId?: string) => void;
}

export default function Cart({ navigate }: CartProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = () => {
    toast.success('Checkout functionality coming soon!');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-beige pb-20">
        <div className="container-wide py-16 md:py-24">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-ash/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-ash/30" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-ash mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-ash/70 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button
              onClick={() => navigate('shop')}
              className="bg-ash text-beige hover:bg-ash-light"
            >
              Start Shopping
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige pb-20">
      {/* Header */}
      <div className="bg-beige-light border-b border-ash/10">
        <div className="container-wide py-8">
          <button
            onClick={() => navigate('shop')}
            className="flex items-center gap-2 text-ash/60 hover:text-ash transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </button>
        </div>
      </div>

      <div className="container-wide py-8 md:py-12">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ash mb-8">
          Shopping Cart ({cart.length} items)
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.product.id} className="bg-white">
                <CardContent className="p-4 md:p-6">
                  <div className="flex gap-4 md:gap-6">
                    {/* Image */}
                    <button
                      onClick={() => navigate('product', item.product.id)}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-beige-dark flex-shrink-0"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </button>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                          <button
                            onClick={() => navigate('product', item.product.id)}
                            className="font-display text-lg font-medium text-ash hover:text-ash-light transition-colors text-left"
                          >
                            {item.product.name}
                          </button>
                          <p className="text-ash/60 text-sm">{item.product.category}</p>
                          {item.customization && (
                            <div className="mt-2 text-sm text-ash/60">
                              {item.customization.material && (
                                <span className="mr-3">Material: {item.customization.material}</span>
                              )}
                              {item.customization.color && (
                                <span>Color: {item.customization.color}</span>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-ash">{formatPrice(item.product.price * item.quantity)}</p>
                          <p className="text-ash/60 text-sm">{formatPrice(item.product.price)} each</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        <div className="flex items-center border border-ash/20 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="p-2 hover:bg-ash/5"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 hover:bg-ash/5"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-ash/40 hover:text-brand-red transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <button
              onClick={clearCart}
              className="text-ash/60 hover:text-brand-red text-sm transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-white sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-semibold text-ash mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-ash/70">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-ash/70">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-ash/70">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-ash/10 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-display font-semibold text-ash">Total</span>
                    <span className="font-display text-xl font-semibold text-ash">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-ash text-beige hover:bg-ash-light py-6"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <p className="text-ash/50 text-xs text-center mt-4">
                  Shipping and taxes calculated at checkout
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
