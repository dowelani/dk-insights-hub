import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, User, Mail, Phone, MapPin, Building } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import PriceTag from '@/components/shop/PriceTag';
import CurrencySwitcher from '@/components/shop/CurrencySwitcher';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';

const checkoutSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name is too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name is too long'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  phone: z.string().min(1, 'Phone number is required').max(20, 'Phone number is too long'),
  company: z.string().max(100, 'Company name is too long').optional(),
  address: z.string().min(1, 'Street address is required').max(200, 'Address is too long'),
  city: z.string().min(1, 'City is required').max(100, 'City name is too long'),
  postalCode: z.string().min(1, 'Postal code is required').max(20, 'Postal code is too long'),
  country: z.string().min(1, 'Country is required').max(100, 'Country name is too long'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalZAR, getTotalUSD } = useCart();
  const { formatPrice } = useCurrency();
  const [paymentMethod, setPaymentMethod] = useState('eft');

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    console.log('Form submitted:', data, 'Payment method:', paymentMethod);
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
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
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="John" 
                                    autoComplete="given-name"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Doe" 
                                    autoComplete="family-name"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input 
                                    type="email" 
                                    placeholder="john@example.com" 
                                    className="pl-10"
                                    autoComplete="email"
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input 
                                    type="tel" 
                                    placeholder="+27 66 046 2575" 
                                    className="pl-10"
                                    autoComplete="tel"
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company (Optional)</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                  <Input 
                                    placeholder="Company Name" 
                                    className="pl-10"
                                    autoComplete="organization"
                                    {...field} 
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Street Address</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="123 Main Street"
                                  autoComplete="street-address"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Cape Town"
                                    autoComplete="address-level2"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="postalCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="8001"
                                    autoComplete="postal-code"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="South Africa"
                                  autoComplete="country-name"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                          <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex-1 cursor-pointer">
                              <span className="font-medium">Card Payment</span>
                              <span className="text-sm text-muted-foreground block">Pay with your card</span>
                            </Label>
                          </div>
                        </RadioGroup>
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
                          type="submit"
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
              </form>
            </Form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
