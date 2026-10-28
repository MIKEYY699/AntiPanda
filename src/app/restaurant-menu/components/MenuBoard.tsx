'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, SearchX, ShoppingBag, Leaf } from 'lucide-react';
import { menuCategories, menuItems, activeRestaurant, formatPKR, type MenuItem } from '@/lib/mockData';
import { useCart } from '@/components/CartContext';
import MenuItemCard from '@/app/restaurant-menu/components/MenuItemCard';
import CustomizeModal, { type CustomizeResult } from '@/app/restaurant-menu/components/CustomizeModal';
import CartConflictDialog from '@/app/restaurant-menu/components/CartConflictDialog';
import EmptyState from '@/components/ui/EmptyState';
import Toast from '@/components/ui/Toast';

type PendingAdd = {
  item: MenuItem;
  result: CustomizeResult;
};

const restaurantRef = {
  id: activeRestaurant.id,
  name: activeRestaurant.name,
  slug: activeRestaurant.slug,
};

export default function MenuBoard() {
  const { addLine, forceReplace, itemCount, subtotal, restaurant, lines, lineTotal } = useCart();
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [query, setQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [customizing, setCustomizing] = useState<MenuItem | null>(null);
  const [conflict, setConflict] = useState<PendingAdd | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menuItems.filter((item) => {
      if (q && !`${item.name} ${item.description}`.toLowerCase().includes(q)) return false;
      if (vegOnly && !item.dietary.includes('Vegetarian') && !item.dietary.includes('Vegan')) return false;
      return true;
    });
  }, [query, vegOnly]);

  const grouped = useMemo(
    () =>
      menuCategories
        .map((cat) => ({ cat, items: filtered.filter((i) => i.categoryId === cat.id) }))
        .filter((g) => g.items.length > 0),
    [filtered]
  );

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const commitAdd = (item: MenuItem, result: CustomizeResult) => {
    const outcome = addLine(restaurantRef, {
      itemId: item.id,
      name: item.name,
      image: item.image,
      alt: item.alt,
      basePrice: item.promoPrice ?? item.price,
      modifiers: result.modifiers,
      instructions: result.instructions,
      quantity: result.quantity,
    });
    if (outcome === 'conflict') {
      setConflict({ item, result });
      return;
    }
    setToast(`${result.quantity} × ${item.name} added to cart`);
  };

  const handleQuickAdd = (item: MenuItem) => {
    if (item.stock === 'out') return;
    if (item.modifiers && item.modifiers.length > 0) {
      setCustomizing(item);
      return;
    }
    commitAdd(item, { modifiers: [], instructions: '', quantity: 1 });
  };

  const handleCustomized = (item: MenuItem, result: CustomizeResult) => {
    setCustomizing(null);
    commitAdd(item, result);
  };

  const confirmReplace = () => {
    if (!conflict) return;
    const { item, result } = conflict;
    forceReplace(restaurantRef, {
      itemId: item.id,
      name: item.name,
      image: item.image,
      alt: item.alt,
      basePrice: item.promoPrice ?? item.price,
      modifiers: result.modifiers,
      instructions: result.instructions,
      quantity: result.quantity,
    });
    setConflict(null);
    setToast('Cart replaced with items from Smash House Burgers');
  };

  const cartBelow = subtotal < activeRestaurant.minOrder;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
      <div className="min-w-0 space-y-5">
        <div className="sticky top-[calc(4rem+env(safe-area-inset-top))] z-30 -mx-4 space-y-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur md:mx-0 md:rounded-2xl md:border md:px-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <label htmlFor="menu-search" className="sr-only">
                Search this menu
              </label>
              <input
                id="menu-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search burgers, fries, shakes…"
                className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              type="button"
              onClick={() => setVegOnly((v) => !v)}
              aria-pressed={vegOnly}
              className={`flex shrink-0 items-center justify-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-bold transition-all duration-150 active:scale-95 ${
                vegOnly ? 'border-accent bg-accent/10 text-accent' : 'border-border bg-card text-foreground hover:border-accent/50'
              }`}
            >
              <Leaf size={14} />
              Vegetarian only
            </button>
          </div>

          <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1" role="tablist" aria-label="Menu categories">
            {menuCategories.map((cat) => {
              const active = cat.id === activeCategory;
              return (
                <button
                  key={`menucat-${cat.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all duration-150 active:scale-95 ${
                    active ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-muted'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {grouped.length === 0 ? (
          <EmptyState
            icon={<SearchX size={26} />}
            title="No dishes match your search"
            description="This menu doesn't have anything matching those words. Try a different dish name or clear the vegetarian filter."
            actionLabel="Clear search"
            onAction={() => {
              setQuery('');
              setVegOnly(false);
            }}
          />
        ) : (
          grouped.map(({ cat, items }) => (
            <section key={`group-${cat.id}`} id={cat.id} className="scroll-mt-52 space-y-3">
              <h2 className="flex items-baseline gap-2 text-lg font-bold">
                {cat.label}
                <span className="text-xs font-semibold text-muted-foreground tabular">{items.length} items</span>
              </h2>
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {items.map((item) => (
                  <MenuItemCard key={item.id} item={item} onAdd={handleQuickAdd} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      {/* Live mini-cart */}
      <aside className="hidden lg:block" aria-label="Your cart">
        <div className="sticky top-[calc(9rem+env(safe-area-inset-top))] space-y-4 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <ShoppingBag size={18} className="text-primary" />
              Your cart
            </h2>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary tabular">
              {itemCount} items
            </span>
          </div>

          {lines.length === 0 ? (
            <div className="rounded-xl bg-secondary p-5 text-center">
              <p className="text-sm font-bold">Your cart is empty</p>
              <p className="mt-1 text-xs text-muted-foreground">Add a burger to get started — delivery is arranged by the restaurant.</p>
            </div>
          ) : (
            <>
              <p className="text-xs text-muted-foreground">
                From <span className="font-bold text-foreground">{restaurant?.name}</span>
              </p>
              <ul className="max-h-72 space-y-3 overflow-y-auto pr-1">
                {lines.map((line) => (
                  <li key={line.lineId} className="flex items-start justify-between gap-3 text-sm">
                    <div className="min-w-0">
                      <p className="truncate font-bold">
                        <span className="tabular text-primary">{line.quantity}×</span> {line.name}
                      </p>
                      {line.modifiers.length > 0 && (
                        <p className="truncate text-xs text-muted-foreground">{line.modifiers.map((m) => m.label).join(', ')}</p>
                      )}
                    </div>
                    <span className="shrink-0 font-bold tabular">{formatPKR(lineTotal(line))}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 border-t border-border pt-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-bold tabular">{formatPKR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-semibold tabular">{formatPKR(activeRestaurant.deliveryFee)}</span>
                </div>
              </div>

              {cartBelow && (
                <div className="rounded-xl bg-warning/20 p-3 text-xs">
                  <p className="font-bold">Add {formatPKR(activeRestaurant.minOrder - subtotal)} more to reach the minimum order</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / activeRestaurant.minOrder) * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              <Link
                href="/cart-and-checkout"
                className={`flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition-all duration-150 active:scale-95 ${
                  cartBelow
                    ? 'bg-muted text-muted-foreground'
                    : 'bg-primary text-primary-foreground hover:opacity-90'
                }`}
              >
                {cartBelow ? 'Review cart' : 'Go to checkout'}
              </Link>
            </>
          )}
        </div>
      </aside>

      {/* Mobile cart bar */}
      {itemCount > 0 && (
        <Link
          href="/cart-and-checkout"
          className="slide-up fixed inset-x-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-40 flex items-center justify-between rounded-2xl bg-primary px-5 py-3.5 text-primary-foreground shadow-xl transition-all duration-150 active:scale-95 lg:hidden"
        >
          <span className="flex items-center gap-2 text-sm font-bold">
            <ShoppingBag size={18} />
            <span className="tabular">{itemCount}</span> items
          </span>
          <span className="text-sm font-extrabold tabular">View cart · {formatPKR(subtotal)}</span>
        </Link>
      )}

      <CustomizeModal item={customizing} onClose={() => setCustomizing(null)} onConfirm={handleCustomized} />

      <CartConflictDialog
        open={conflict !== null}
        currentRestaurant={restaurant?.name ?? 'another restaurant'}
        nextRestaurant={activeRestaurant.name}
        onCancel={() => setConflict(null)}
        onConfirm={confirmReplace}
      />

      <Toast message={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}