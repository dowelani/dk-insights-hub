import { categories, ProductCategory, ProductTier } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useCurrency } from '@/contexts/CurrencyContext';

interface CategoryFilterProps {
  selectedCategory: ProductCategory | 'all';
  onCategoryChange: (category: ProductCategory | 'all') => void;
  selectedTier: ProductTier | 'all';
  onTierChange: (tier: ProductTier | 'all') => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
}

const tiers: { id: ProductTier | 'all'; name: string }[] = [
  { id: 'all', name: 'All Tiers' },
  { id: 'basic', name: 'Basic' },
  { id: 'standard', name: 'Standard' },
  { id: 'premium', name: 'Premium' },
  { id: 'extra', name: 'Extras' },
];

const CategoryFilter = ({
  selectedCategory,
  onCategoryChange,
  selectedTier,
  onTierChange,
  priceRange,
  onPriceRangeChange,
  maxPrice,
}: CategoryFilterProps) => {
  const { symbol } = useCurrency();

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <Label className="text-sm font-medium text-foreground mb-3 block">Category</Label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('all')}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Tiers */}
      <div>
        <Label className="text-sm font-medium text-foreground mb-3 block">Package Tier</Label>
        <div className="flex flex-wrap gap-2">
          {tiers.map((tier) => (
            <Button
              key={tier.id}
              variant={selectedTier === tier.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => onTierChange(tier.id)}
            >
              {tier.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-sm font-medium text-foreground mb-3 block">
          Price Range: {symbol}{priceRange[0].toLocaleString()} - {symbol}{priceRange[1].toLocaleString()}
        </Label>
        <Slider
          value={priceRange}
          onValueChange={(value) => onPriceRangeChange(value as [number, number])}
          max={maxPrice}
          min={0}
          step={50}
          className="mt-2"
        />
      </div>
    </div>
  );
};

export default CategoryFilter;
