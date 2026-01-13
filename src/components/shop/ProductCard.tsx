import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import PriceTag from './PriceTag';

interface ProductCardProps {
  product: Product;
}

const tierColors = {
  basic: 'bg-secondary text-secondary-foreground',
  standard: 'bg-primary text-primary-foreground',
  premium: 'bg-accent text-accent-foreground',
  extra: 'bg-muted text-muted-foreground',
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="animate-fade-in group relative flex flex-col h-full overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-elegant">
      {product.popular && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-accent text-accent-foreground flex items-center gap-1">
            <Star className="w-3 h-3" />
            Popular
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <Badge className={tierColors[product.tier]} variant="secondary">
            {product.tier.charAt(0).toUpperCase() + product.tier.slice(1)}
          </Badge>
        </div>
        <h3 className="text-lg font-semibold text-foreground mt-2 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
      </CardHeader>

      <CardContent className="flex-1 pt-0">
        <div className="mb-4">
          <PriceTag priceZAR={product.priceZAR} priceUSD={product.priceUSD} />
        </div>
        
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-4 flex flex-col gap-2">
        <Button
          onClick={() => addToCart(product)}
          className="w-full"
          variant="gradient"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
        <Button
          asChild
          variant="outline"
          className="w-full"
        >
          <Link to={`/shop/product/${product.id}`}>
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
