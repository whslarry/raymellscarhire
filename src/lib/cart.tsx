import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, AgroCartItem, AgroVegetable } from './supabase';
import { useAuth } from './auth';

type CartItem = {
  vegetable: AgroVegetable;
  quantity: number;
  cartItemId?: string;
};

type CartContextType = {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  loading: boolean;
  addToCart: (veg: AgroVegetable) => Promise<void>;
  removeFromCart: (vegetableId: string) => Promise<void>;
  updateQuantity: (vegetableId: string, qty: number) => Promise<void>;
  clearCart: () => Promise<void>;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user) { setItems([]); return; }
    const { data } = await supabase
      .from('agro_cart_items')
      .select('*, agro_vegetables(*)')
      .eq('user_id', user.id);

    if (data) {
      setItems(
        data.map((item: AgroCartItem) => ({
          vegetable: item.agro_vegetables as AgroVegetable,
          quantity: item.quantity,
          cartItemId: item.id,
        }))
      );
    }
  }, [user]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.vegetable.price_per_kg * i.quantity, 0);

  const addToCart = async (veg: AgroVegetable) => {
    if (!user) return;
    setLoading(true);
    const existing = items.find((i) => i.vegetable.id === veg.id);
    if (existing) {
      await updateQuantity(veg.id, existing.quantity + 1);
    } else {
      const { error } = await supabase.from('agro_cart_items').insert({
        user_id: user.id,
        vegetable_id: veg.id,
        quantity: 1,
      });
      if (!error) await fetchCart();
    }
    setLoading(false);
  };

  const removeFromCart = async (vegetableId: string) => {
    if (!user) return;
    const item = items.find((i) => i.vegetable.id === vegetableId);
    if (item?.cartItemId) {
      await supabase.from('agro_cart_items').delete().eq('id', item.cartItemId);
      await fetchCart();
    }
  };

  const updateQuantity = async (vegetableId: string, qty: number) => {
    if (!user) return;
    if (qty < 1) { await removeFromCart(vegetableId); return; }
    const item = items.find((i) => i.vegetable.id === vegetableId);
    if (item?.cartItemId) {
      await supabase.from('agro_cart_items').update({ quantity: qty }).eq('id', item.cartItemId);
      await fetchCart();
    }
  };

  const clearCart = async () => {
    if (!user) return;
    await supabase.from('agro_cart_items').delete().eq('user_id', user.id);
    setItems([]);
  };

  return (
    <CartContext.Provider value={{
      items, count, total, isOpen, loading,
      addToCart, removeFromCart, updateQuantity, clearCart,
      toggleCart: () => setIsOpen((o) => !o),
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
