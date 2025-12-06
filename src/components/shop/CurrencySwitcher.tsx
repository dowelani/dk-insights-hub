import { useCurrency } from '@/contexts/CurrencyContext';
import { Button } from '@/components/ui/button';

const CurrencySwitcher = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
      <Button
        variant={currency === 'ZAR' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setCurrency('ZAR')}
        className="text-xs px-3"
      >
        ZAR
      </Button>
      <Button
        variant={currency === 'USD' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setCurrency('USD')}
        className="text-xs px-3"
      >
        USD
      </Button>
    </div>
  );
};

export default CurrencySwitcher;
