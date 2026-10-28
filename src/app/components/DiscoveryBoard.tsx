'use client';

import React, { useMemo, useState } from 'react';
import { SearchX } from 'lucide-react';
import { categories, restaurants, favoriteIds } from '@/lib/mockData';
import CategoryChips from '@/app/components/CategoryChips';
import RestaurantFilters, { FilterState } from '@/app/components/RestaurantFilters';
import RestaurantCard from '@/app/components/RestaurantCard';
import EmptyState from '@/components/ui/EmptyState';
import { RestaurantCardSkeleton } from '@/components/ui/LoadingSkeleton';

const defaultFilters: FilterState = {
  openNow: false,
  hasOffer: false,
  minRating: 0,
  maxTier: 3,
  sort: 'recommended',
};

export default function DiscoveryBoard() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [favorites, setFavorites] = useState<string[]>(favoriteIds);
  const [loading, setLoading] = useState(false);

  const handleCategory = (id: string) => {
    setLoading(true);
    setActiveCategory(id);
    setTimeout(() => setLoading(false), 350);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  const visible = useMemo(() => {
    const label = categories.find((c) => c.id === activeCategory)?.label ?? 'All';
    let list = restaurants.filter((r) => {
      if (label !== 'All' && !r.cuisines.some((c) => c.toLowerCase().includes(label.toLowerCase().split(' ')[0]))) {
        return false;
      }
      if (filters.openNow && r.status === 'closed') return false;
      if (filters.hasOffer && !r.offer) return false;
      if (r.rating < filters.minRating) return false;
      if (r.priceTier > filters.maxTier) return false;
      return true;
    });
    if (filters.sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    if (filters.sort === 'eta') list = [...list].sort((a, b) => a.etaMin - b.etaMin);
    if (filters.sort === 'fee') list = [...list].sort((a, b) => a.deliveryFee - b.deliveryFee);
    return list;
  }, [activeCategory, filters]);

  const acceptingCount = visible.filter((r) => r.status !== 'closed').length;

  return (
    <section aria-label="Restaurants near you" className="space-y-5">
      <CategoryChips items={categories} activeId={activeCategory} onSelect={handleCategory} />

      <RestaurantFilters filters={filters} onChange={setFilters} onReset={() => setFilters(defaultFilters)} />

      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">Restaurants delivering to Gulberg III</h2>
          <p className="text-sm text-muted-foreground">
            <span className="tabular">{visible.length}</span> found ·{' '}
            <span className="tabular">{acceptingCount}</span> accepting orders now
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {['sk-a', 'sk-b', 'sk-c', 'sk-d', 'sk-e', 'sk-f', 'sk-g', 'sk-h'].map((k) => (
            <RestaurantCardSkeleton key={k} />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <EmptyState
          icon={<SearchX size={26} />}
          title="No restaurants match these filters"
          description="Try removing a filter or switching cuisine — some restaurants only deliver to certain areas."
          actionLabel="Clear all filters"
          onAction={() => {
            setFilters(defaultFilters);
            setActiveCategory('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {visible.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} isFavorite={favorites.includes(r.id)} onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      )}
    </section>
  );
}