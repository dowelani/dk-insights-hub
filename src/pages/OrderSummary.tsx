import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Download, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const OrderSummary = () => {
  // Mock order data for UI display
  const orderNumber = `DK-${Date.now().toString().slice(-8)}`;
  const orderDate = new Date().toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            {/* Success Message */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-accent" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">Order Confirmed!</h1>
              <p className="text-muted-foreground">
                Thank you for your order. We've received your request and will be in touch shortly.
              </p>
            </div>

            {/* Order Details Card */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                    <p className="font-semibold text-foreground">{orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                    <p className="font-semibold text-foreground">{orderDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                    <p className="font-semibold text-foreground">Credit Card</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent">
                      Processing
                    </span>
                  </div>
                </div>

                <Separator className="my-6" />

                <h3 className="font-semibold text-foreground mb-4">What happens next?</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Order Review</p>
                      <p className="text-sm text-muted-foreground">We'll review your order and prepare your project requirements.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Confirmation Email</p>
                      <p className="text-sm text-muted-foreground">You'll receive a detailed confirmation email with next steps.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Project Kickoff</p>
                      <p className="text-sm text-muted-foreground">We'll schedule a call to discuss your project in detail.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </Button>
              <Button variant="outline" className="flex-1">
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>

            <div className="mt-8 text-center">
              <Button asChild variant="gradient" size="lg">
                <Link to="/shop">
                  Continue Shopping
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default OrderSummary;
