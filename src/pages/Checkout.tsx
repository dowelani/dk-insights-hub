import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, User, Mail, Phone, MapPin, Building } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import PriceTag from '@/components/shop/PriceTag';
import CurrencySwitcher from '@/components/shop/CurrencySwitcher';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalZAR, getTotalUSD, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePlaceOrder = () => {
    // UI only - navigate to order summary
    navigate('/order-summary');
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
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" className="mt-1.5" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <div className="relative mt-1.5">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="email" type="email" placeholder="john@example.com" className="pl-10" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative mt-1.5">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="phone" type="tel" placeholder="+27 66 046 2575" className="pl-10" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Billing Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Billing Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="company">Company (Optional)</Label>
                      <div className="relative mt-1.5">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="company" placeholder="Company Name" className="pl-10" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" placeholder="123 Main Street" className="mt-1.5" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Cape Town" className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input id="postalCode" placeholder="8001" className="mt-1.5" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" placeholder="South Africa" className="mt-1.5" />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
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
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          <span className="font-medium">Credit/Debit Card</span>
                          <span className="text-sm text-muted-foreground block">Visa, Mastercard, Amex</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                        <RadioGroupItem value="eft" id="eft" />
                        <Label htmlFor="eft" className="flex-1 cursor-pointer">
                          <span className="font-medium">EFT / Bank Transfer</span>
                          <span className="text-sm text-muted-foreground block">Direct bank transfer</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                          <span className="font-medium">PayPal</span>
                          <span className="text-sm text-muted-foreground block">Pay with your PayPal account</span>
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === 'card' && (
                      <div className="mt-6 space-y-4 pt-6 border-t border-border">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1.5" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" className="mt-1.5" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" className="mt-1.5" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" placeholder="John Doe" className="mt-1.5" />
                        </div>
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
                    >
                      Place Order
                    </Button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      By placing your order, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
