import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import PriceTag from './PriceTag';

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getTotalZAR, getTotalUSD } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
            <Button asChild onClick={() => setIsCartOpen(false)}>
              <Link to="/shop">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-4 bg-secondary/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{item.product.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-1">{item.product.description}</p>
                    <div className="mt-2">
                      <PriceTag priceZAR={item.product.priceZAR} priceUSD={item.product.priceUSD} size="sm" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex items-center gap-2">
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
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total</span>
                <PriceTag priceZAR={getTotalZAR()} priceUSD={getTotalUSD()} size="lg" />
              </div>
              
              <div className="flex flex-col gap-2">
                <Button asChild className="w-full" variant="gradient" onClick={() => setIsCartOpen(false)}>
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button asChild variant="outline" className="w-full" onClick={() => setIsCartOpen(false)}>
                  <Link to="/cart">View Cart</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
