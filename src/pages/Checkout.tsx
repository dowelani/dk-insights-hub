import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, MessageCircle, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useAuth } from '@/contexts/AuthContext';
import PriceTag from '@/components/shop/PriceTag';
import CurrencySwitcher from '@/components/shop/CurrencySwitcher';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalZAR, getTotalUSD, clearCart } = useCart();
  const { formatPrice, currency } = useCurrency();
  const { user, profile, session } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('payfast');
  const [showPaymentNotice, setShowPaymentNotice] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user || !session) {
      toast.error('Please login to complete your order');
      navigate('/auth');
      return;
    }

    if (paymentMethod === 'eft' || paymentMethod === 'paypal') {
      setShowPaymentNotice(true);
      return;
    }

    // PayFast payment
    setIsProcessing(true);

    try {
      // Create order in database first
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_zar: getTotalZAR(),
          total_usd: getTotalUSD(),
          payment_method: 'payfast',
          status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_title: item.product.title,
        quantity: item.quantity,
        price_zar: item.product.priceZAR * item.quantity,
        price_usd: item.product.priceUSD * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Call PayFast edge function
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke(
        'create-payfast-payment',
        {
          body: {
            orderId: order.id,
            totalZAR: getTotalZAR(),
            items: items.map((item) => ({
              title: item.product.title,
              quantity: item.quantity,
              priceZAR: item.product.priceZAR,
            })),
            customerEmail: profile?.email || user.email || '',
            customerName: `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() || 'Customer',
          },
        }
      );

      if (paymentError) throw paymentError;

      // Create and submit PayFast form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = paymentData.paymentUrl;

      // PayFast blocks being loaded inside iframes (like the preview window).
      // If we're in an iframe, open the payment in a new tab instead.
      let isInIframe = false;
      try {
        isInIframe = window.self !== window.top;
      } catch {
        isInIframe = true;
      }
      if (isInIframe) {
        form.target = '_blank';
      }

      Object.entries(paymentData.paymentData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      
      // Clear cart before redirect
      clearCart();
      
      form.submit();
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Failed to process payment');
      setIsProcessing(false);
    }
  };

  const handleWhatsAppOrder = async () => {
    if (!user || !session) {
      toast.error('Please login to complete your order');
      navigate('/auth');
      return;
    }

    setIsProcessing(true);

    try {
      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_zar: getTotalZAR(),
          total_usd: getTotalUSD(),
          payment_method: paymentMethod,
          status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_title: item.product.title,
        quantity: item.quantity,
        price_zar: item.product.priceZAR * item.quantity,
        price_usd: item.product.priceUSD * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Send WhatsApp message
      const phoneNumber = '27660462575';
      const orderItemsText = items
        .map((item) => `• ${item.product.title} × ${item.quantity} - ${formatPrice(item.product.priceZAR * item.quantity, item.product.priceUSD * item.quantity)}`)
        .join('\n');
      const total = currency === 'ZAR' ? `R${getTotalZAR().toFixed(2)}` : `$${getTotalUSD().toFixed(2)}`;
      
      const message = encodeURIComponent(
        `Hi! I'd like to place an order:\n\nOrder ID: ${order.id}\n\n${orderItemsText}\n\n*Total: ${total}*\n\nPayment Method: ${paymentMethod.toUpperCase()}\n\nPlease confirm availability and send payment details.`
      );
      
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
      
      clearCart();
      setShowPaymentNotice(false);
      navigate(`/order-summary?order_id=${order.id}`);
    } catch (error: any) {
      console.error('Order error:', error);
      toast.error(error.message || 'Failed to create order');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h1>
            <Button asChild>
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <section className="py-8 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <Button variant="ghost" size="sm" asChild className="mb-2">
                  <Link to="/cart" className="text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Cart
                  </Link>
                </Button>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                  <CreditCard className="w-8 h-8 text-primary" />
                  Checkout
                </h1>
              </div>
              <CurrencySwitcher />
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Payment Method */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                        <RadioGroupItem value="payfast" id="payfast" />
                        <Label htmlFor="payfast" className="flex-1 cursor-pointer">
                          <span className="font-medium">PayFast</span>
                          <span className="text-sm text-muted-foreground block">Pay securely with card, EFT, or SnapScan</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                        <RadioGroupItem value="eft" id="eft" />
                        <Label htmlFor="eft" className="flex-1 cursor-pointer">
                          <span className="font-medium">Manual EFT / Bank Transfer</span>
                          <span className="text-sm text-muted-foreground block">Order via WhatsApp for manual payment</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                          <span className="font-medium">PayPal</span>
                          <span className="text-sm text-muted-foreground block">Order via WhatsApp for PayPal payment</span>
                        </Label>
                      </div>
                    </RadioGroup>

                    {!user && (
                      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          <strong>Note:</strong> Please login or register to complete your purchase.
                        </p>
                        <Button 
                          variant="outline" 
                          className="mt-3"
                          onClick={() => navigate('/auth')}
                        >
                          Login / Register
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>
                    
                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.product.title} × {item.quantity}
                          </span>
                          <span className="font-medium">
                            {formatPrice(item.product.priceZAR * item.quantity, item.product.priceUSD * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span>{formatPrice(getTotalZAR(), getTotalUSD())}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Processing Fee</span>
                        <span>{formatPrice(0, 0)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-foreground">Total</span>
                        <PriceTag priceZAR={getTotalZAR()} priceUSD={getTotalUSD()} size="lg" />
                      </div>
                    </div>

                    <Button 
                      onClick={handlePlaceOrder}
                      className="w-full mt-6" 
                      variant="gradient" 
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Place Order'
                      )}
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      By placing this order, you agree to our Terms & Conditions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />

      {/* WhatsApp Order Dialog */}
      <Dialog open={showPaymentNotice} onOpenChange={setShowPaymentNotice}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              Complete Order via WhatsApp
            </DialogTitle>
            <DialogDescription className="pt-2">
              For {paymentMethod === 'eft' ? 'EFT/Bank Transfer' : 'PayPal'} payments, please complete your order via WhatsApp and we'll send you payment details.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button 
              variant="whatsapp" 
              size="lg" 
              onClick={handleWhatsAppOrder}
              className="w-full"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Order...
                </>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Order via WhatsApp
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowPaymentNotice(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;
