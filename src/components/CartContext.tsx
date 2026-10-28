'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export interface CartLine {
  lineId: string;
  itemId: string;
  name: string;
  image: string;
  alt: string;
  basePrice: number;
  modifiers: {id: string;label: string;price: number;}[];
  instructions: string;
  quantity: number;
}

interface CartRestaurant {
  id: string;
  name: string;
  slug: string;
}

interface CartContextValue {
  restaurant: CartRestaurant | null;
  lines: CartLine[];
  addLine: (restaurant: CartRestaurant, line: Omit<CartLine, 'lineId'>) => 'added' | 'conflict';
  forceReplace: (restaurant: CartRestaurant, line: Omit<CartLine, 'lineId'>) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
  updateInstructions: (lineId: string, instructions: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  lineTotal: (line: CartLine) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

const seedRestaurant: CartRestaurant = {
  id: 'rest-003',
  name: 'Smash House Burgers',
  slug: 'smash-house-burgers'
};

// Seeded so the checkout screen has realistic data on first load.
const seedLines: CartLine[] = [
{
  lineId: 'line-seed-001',
  itemId: 'item-002',
  name: 'Double Smash Cheeseburger',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1df1d1d84-1772617161795.png",
  alt: 'Double smash cheeseburger with lettuce and melted cheddar',
  basePrice: 890,
  modifiers: [
  { id: 'ext-cheese', label: 'Extra cheddar slice', price: 60 },
  { id: 'sauce-chipotle', label: 'Chipotle mayo', price: 50 }],

  instructions: 'No pickles please',
  quantity: 2
},
{
  lineId: 'line-seed-002',
  itemId: 'item-008',
  name: 'Loaded Smash Fries',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_135eeb96f-1783430072778.png",
  alt: 'Crinkle fries loaded with cheese sauce and beef crumble',
  basePrice: 490,
  modifiers: [],
  instructions: '',
  quantity: 1
},
{
  lineId: 'line-seed-003',
  itemId: 'item-011',
  name: 'Biscoff Cookie Shake',
  image: "https://images.unsplash.com/photo-1562164143-8a9f06b11f47",
  alt: 'Tall milkshake topped with whipped cream and cookie crumbles',
  basePrice: 640,
  modifiers: [],
  instructions: '',
  quantity: 1
},
{
  lineId: 'line-seed-004',
  itemId: 'item-005',
  name: 'Crispy Chicken Stack',
  image: "https://images.unsplash.com/photo-1544120379-4428412e6568",
  alt: 'Crispy fried chicken sandwich with slaw and pickles',
  basePrice: 850,
  modifiers: [{ id: 'ext-jalapeno', label: 'Pickled jalapeños', price: 40 }],
  instructions: '',
  quantity: 1
}];


let lineCounter = 100;
function nextLineId(): string {
  lineCounter += 1;
  return `line-${lineCounter}`;
}

export function CartProvider({ children }: {children: React.ReactNode;}) {
  const [restaurant, setRestaurant] = useState<CartRestaurant | null>(seedRestaurant);
  const [lines, setLines] = useState<CartLine[]>(seedLines);

  const lineTotal = useCallback((line: CartLine) => {
    const modTotal = line.modifiers.reduce((sum, m) => sum + m.price, 0);
    return (line.basePrice + modTotal) * line.quantity;
  }, []);

  const mergeOrAppend = useCallback((existing: CartLine[], incoming: Omit<CartLine, 'lineId'>): CartLine[] => {
    const signature = (l: {itemId: string;modifiers: {id: string;}[];instructions: string;}) =>
    `${l.itemId}|${l.modifiers.
    map((m) => m.id).
    sort().
    join(',')}|${l.instructions}`;
    const target = signature(incoming);
    const match = existing.find((l) => signature(l) === target);
    if (match) {
      return existing.map((l) =>
      l.lineId === match.lineId ? { ...l, quantity: l.quantity + incoming.quantity } : l
      );
    }
    return [...existing, { ...incoming, lineId: nextLineId() }];
  }, []);

  const addLine = useCallback(
    (rest: CartRestaurant, line: Omit<CartLine, 'lineId'>): 'added' | 'conflict' => {
      if (restaurant && restaurant.id !== rest.id && lines.length > 0) {
        return 'conflict';
      }
      setRestaurant(rest);
      setLines((prev) => mergeOrAppend(prev, line));
      return 'added';
    },
    [restaurant, lines.length, mergeOrAppend]
  );

  const forceReplace = useCallback((rest: CartRestaurant, line: Omit<CartLine, 'lineId'>) => {
    setRestaurant(rest);
    setLines([{ ...line, lineId: nextLineId() }]);
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    setLines((prev) =>
    quantity <= 0 ?
    prev.filter((l) => l.lineId !== lineId) :
    prev.map((l) => l.lineId === lineId ? { ...l, quantity } : l)
    );
  }, []);

  const removeLine = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((l) => l.lineId !== lineId));
  }, []);

  const updateInstructions = useCallback((lineId: string, instructions: string) => {
    setLines((prev) => prev.map((l) => l.lineId === lineId ? { ...l, instructions } : l));
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
    setRestaurant(null);
  }, []);

  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + lineTotal(l), 0), [lines, lineTotal]);

  const value = useMemo<CartContextValue>(
    () => ({
      restaurant,
      lines,
      addLine,
      forceReplace,
      updateQuantity,
      removeLine,
      updateInstructions,
      clearCart,
      itemCount,
      subtotal,
      lineTotal
    }),
    [restaurant, lines, addLine, forceReplace, updateQuantity, removeLine, updateInstructions, clearCart, itemCount, subtotal, lineTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}