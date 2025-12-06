import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import PriceTag from '@/components/shop/PriceTag';
import CurrencySwitcher from '@/components/shop/CurrencySwitcher';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotalZAR, getTotalUSD, clearCart } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <section className="py-8 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <Button variant="ghost" size="sm" asChild className="mb-2">
                  <Link to="/shop" className="text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Continue Shopping
                  </Link>
                </Button>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  <ShoppingBag className="w-8 h-8 text-primary" />
                  Shopping Cart
                </h1>
              </div>
              <CurrencySwitcher />
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
                <p className="text-muted-foreground mb-8">Start shopping to add items to your cart</p>
                <Button asChild variant="gradient" size="lg">
                  <Link to="/shop">Browse Products</Link>
                </Button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground">
                      {items.length} {items.length === 1 ? 'Item' : 'Items'}
                    </h2>
                    <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground hover:text-destructive">
                      Clear Cart
                    </Button>
                  </div>

                  {items.map((item) => (
                    <Card key={item.product.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Product Image Placeholder */}
                          <div className="w-full sm:w-24 h-24 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl text-primary-foreground font-bold">
                              {item.product.title.charAt(0)}
                            </span>
                          </div>

                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-semibold text-foreground">{item.product.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{item.product.description}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive"
                                onClick={() => removeFromCart(item.product.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                              <PriceTag 
                                priceZAR={item.product.priceZAR * item.quantity} 
                                priceUSD={item.product.priceUSD * item.quantity} 
                                size="md" 
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Order Summary */}
                <div>
                  <Card className="sticky top-24">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Subtotal</span>
                          <span>{formatPrice(getTotalZAR(), getTotalUSD())}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                          <span>Discount</span>
                          <span>-{formatPrice(0, 0)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-foreground">Total</span>
                          <PriceTag priceZAR={getTotalZAR()} priceUSD={getTotalUSD()} size="lg" />
                        </div>
                      </div>

                      <Button asChild className="w-full mt-6" variant="gradient" size="lg">
                        <Link to="/checkout">Proceed to Checkout</Link>
                      </Button>

                      <Button asChild variant="outline" className="w-full mt-3">
                        <Link to="/shop">Continue Shopping</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
