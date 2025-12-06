import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Store, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/shop/ProductCard';
import CategoryFilter from '@/components/shop/CategoryFilter';
import CurrencySwitcher from '@/components/shop/CurrencySwitcher';
import { products, ProductCategory, ProductTier } from '@/data/products';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Button } from '@/components/ui/button';

const Shop = () => {
  const { currency } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedTier, setSelectedTier] = useState<ProductTier | 'all'>('all');
  
  const maxPrice = useMemo(() => {
    const prices = products.map((p) => (currency === 'ZAR' ? p.priceZAR : p.priceUSD));
    return Math.max(...prices);
  }, [currency]);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesTier = selectedTier === 'all' || product.tier === selectedTier;
      const price = currency === 'ZAR' ? product.priceZAR : product.priceUSD;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      return matchesCategory && matchesTier && matchesPrice;
    });
  }, [selectedCategory, selectedTier, priceRange, currency]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-subtle py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/" className="text-muted-foreground hover:text-foreground">
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Back to Home
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <Store className="w-8 h-8 text-primary" />
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">Shop</h1>
                </div>
                <p className="text-muted-foreground max-w-xl">
                  Explore our range of professional services and packages
                </p>
              </div>
              <CurrencySwitcher />
            </div>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-card p-6 rounded-lg border border-border mb-8">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedTier={selectedTier}
                onTierChange={setSelectedTier}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                maxPrice={maxPrice}
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No products match your filters</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedTier('all');
                    setPriceRange([0, maxPrice]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
