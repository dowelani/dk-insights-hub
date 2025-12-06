import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getProductById, getProductsByCategory, categories } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import PriceTag from '@/components/shop/PriceTag';
import CurrencySwitcher from '@/components/shop/CurrencySwitcher';
import ProductCard from '@/components/shop/ProductCard';

const tierColors = {
  basic: 'bg-secondary text-secondary-foreground',
  standard: 'bg-primary text-primary-foreground',
  premium: 'bg-accent text-accent-foreground',
  extra: 'bg-muted text-muted-foreground',
};

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = id ? getProductById(id) : null;
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <Button asChild>
              <Link to="/shop">Back to Shop</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.category);
  const relatedProducts = getProductsByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <section className="py-8 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/shop" className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Shop
                </Link>
              </Button>
              <CurrencySwitcher />
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Product Image Placeholder */}
              <div className="bg-gradient-primary rounded-2xl aspect-square flex items-center justify-center">
                <div className="text-center text-primary-foreground">
                  <div className="w-24 h-24 mx-auto mb-4 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                    <Star className="w-12 h-12" />
                  </div>
                  <p className="text-lg font-medium opacity-80">{category?.name}</p>
                </div>
              </div>

              {/* Product Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge className={tierColors[product.tier]}>
                    {product.tier.charAt(0).toUpperCase() + product.tier.slice(1)}
                  </Badge>
                  {product.popular && (
                    <Badge className="bg-accent text-accent-foreground">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {product.title}
                </h1>
                
                <p className="text-lg text-muted-foreground mb-6">
                  {product.description}
                </p>

                <div className="mb-8">
                  <PriceTag priceZAR={product.priceZAR} priceUSD={product.priceUSD} size="lg" />
                </div>

                <Card className="mb-8">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-foreground mb-4">What's Included</h3>
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-accent" />
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1"
                    variant="gradient"
                    size="lg"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={() => {
                      handleAddToCart();
                      navigate('/checkout');
                    }}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 bg-secondary/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-foreground mb-8">Related Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
