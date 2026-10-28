'use client';

import React from 'react';
import { SlidersHorizontal, Star, Tag, Clock, RotateCcw } from 'lucide-react';

export interface FilterState {
  openNow: boolean;
  hasOffer: boolean;
  minRating: number;
  maxTier: 1 | 2 | 3;
  sort: 'recommended' | 'rating' | 'eta' | 'fee';
}

interface RestaurantFiltersProps {
  filters: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
}

function Toggle({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-bold transition-all duration-150 active:scale-95 ${
        active ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card text-foreground hover:border-primary/40'
      }`}
    >
      {children}
    </button>
  );
}

export default function RestaurantFilters({ filters, onChange, onReset }: RestaurantFiltersProps) {
  const tierLabels: Record<number, string> = { 1: 'Rs', 2: 'Rs Rs', 3: 'Rs Rs Rs' };

  return (
    <div className="scrollbar-none -mx-4 flex items-center gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
      <span className="flex shrink-0 items-center gap-1.5 text-xs font-bold text-muted-foreground">
        <SlidersHorizontal size={14} />
        Filters
      </span>

      <Toggle active={filters.openNow} onClick={() => onChange({ ...filters, openNow: !filters.openNow })}>
        <Clock size={13} />
        Open now
      </Toggle>

      <Toggle active={filters.hasOffer} onClick={() => onChange({ ...filters, hasOffer: !filters.hasOffer })}>
        <Tag size={13} />
        Has offers
      </Toggle>

      <Toggle
        active={filters.minRating >= 4.5}
        onClick={() => onChange({ ...filters, minRating: filters.minRating >= 4.5 ? 0 : 4.5 })}
      >
        <Star size={13} />
        4.5+ rating
      </Toggle>

      <label className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-bold">
        <span className="text-muted-foreground">Price</span>
        <select
          value={filters.maxTier}
          onChange={(e) => onChange({ ...filters, maxTier: Number(e.target.value) as 1 | 2 | 3 })}
          className="bg-transparent py-0.5 text-xs font-bold outline-none"
          aria-label="Maximum price range"
        >
          {[1, 2, 3].map((t) => (
            <option key={`tier-${t}`} value={t}>
              Up to {tierLabels[t]}
            </option>
          ))}
        </select>
      </label>

      <label className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-bold">
        <span className="text-muted-foreground">Sort</span>
        <select
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value as FilterState['sort'] })}
          className="bg-transparent py-0.5 text-xs font-bold outline-none"
          aria-label="Sort restaurants"
        >
          <option value="recommended">Recommended</option>
          <option value="rating">Top rated</option>
          <option value="eta">Fastest delivery</option>
          <option value="fee">Lowest fee</option>
        </select>
      </label>

      <button
        type="button"
        onClick={onReset}
        className="flex shrink-0 items-center gap-1 px-2 py-2 text-xs font-bold text-muted-foreground transition-colors hover:text-primary"
      >
        <RotateCcw size={13} />
        Reset
      </button>
    </div>
  );
}