import { useCurrency } from '@/contexts/CurrencyContext';

interface PriceTagProps {
  priceZAR: number;
  priceUSD: number;
  size?: 'sm' | 'md' | 'lg';
}

const PriceTag = ({ priceZAR, priceUSD, size = 'md' }: PriceTagProps) => {
  const { formatPrice } = useCurrency();

  const sizeClasses = {
    sm: 'text-lg font-semibold',
    md: 'text-2xl font-bold',
    lg: 'text-3xl font-bold',
  };

  return (
    <span className={`${sizeClasses[size]} text-primary`}>
      {formatPrice(priceZAR, priceUSD)}
    </span>
  );
};

export default PriceTag;
