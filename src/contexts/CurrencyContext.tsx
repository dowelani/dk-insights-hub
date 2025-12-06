import React, { createContext, useContext, useState, ReactNode } from 'react';

type Currency = 'ZAR' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (zarPrice: number, usdPrice: number) => string;
  getPrice: (zarPrice: number, usdPrice: number) => number;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>('ZAR');

  const symbol = currency === 'ZAR' ? 'R' : '$';

  const formatPrice = (zarPrice: number, usdPrice: number) => {
    const price = currency === 'ZAR' ? zarPrice : usdPrice;
    return `${symbol}${price.toLocaleString()}`;
  };

  const getPrice = (zarPrice: number, usdPrice: number) => {
    return currency === 'ZAR' ? zarPrice : usdPrice;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, getPrice, symbol }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
