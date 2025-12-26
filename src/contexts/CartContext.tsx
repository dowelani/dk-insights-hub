import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, getProductById } from '@/data/products';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  getTotalZAR: () => number;
  getTotalUSD: () => number;
  syncing: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const { user } = useAuth();

  // Load cart from database when user logs in
  useEffect(() => {
    if (user) {
      loadCartFromDatabase();
    } else {
      // Keep local cart when logged out
    }
  }, [user]);

  const loadCartFromDatabase = async () => {
    if (!user) return;
    
    setSyncing(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading cart:', error);
        return;
      }

      if (data && data.length > 0) {
        const cartItems: CartItem[] = [];
        for (const item of data) {
          const product = getProductById(item.product_id);
          if (product) {
            cartItems.push({ product, quantity: item.quantity });
          }
        }
        setItems(cartItems);
      }
    } finally {
      setSyncing(false);
    }
  };

  const syncCartToDatabase = async (newItems: CartItem[]) => {
    if (!user) return;

    try {
      // Delete all current cart items
      await supabase.from('cart_items').delete().eq('user_id', user.id);

      // Insert new cart items
      if (newItems.length > 0) {
        const cartData = newItems.map((item) => ({
          user_id: user.id,
          product_id: item.product.id,
          quantity: item.quantity,
        }));

        await supabase.from('cart_items').insert(cartData);
      }
    } catch (error) {
      console.error('Error syncing cart:', error);
    }
  };

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      let newItems: CartItem[];
      
      if (existingItem) {
        newItems = prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prev, { product, quantity: 1 }];
      }
      
      // Sync to database if logged in
      if (user) {
        syncCartToDatabase(newItems);
      }
      
      return newItems;
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => {
      const newItems = prev.filter((item) => item.product.id !== productId);
      
      if (user) {
        syncCartToDatabase(newItems);
      }
      
      return newItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems((prev) => {
      const newItems = prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      
      if (user) {
        syncCartToDatabase(newItems);
      }
      
      return newItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    
    if (user) {
      supabase.from('cart_items').delete().eq('user_id', user.id);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const getTotalZAR = () => {
    return items.reduce((sum, item) => sum + item.product.priceZAR * item.quantity, 0);
  };

  const getTotalUSD = () => {
    return items.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        getTotalZAR,
        getTotalUSD,
        syncing,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
