'use client';

import React from 'react';
import type { Category } from '@/lib/mockData';

interface CategoryChipsProps {
  items: Category[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function CategoryChips({ items, activeId, onSelect }: CategoryChipsProps) {
  return (
    <div className="scrollbar-none -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0" role="tablist" aria-label="Cuisine categories">
      {items.map((cat) => {
        const active = cat.id === activeId;
        return (
          <button
            key={`cat-${cat.id}`}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(cat.id)}
            className={`flex shrink-0 flex-col items-center gap-1.5 rounded-2xl border px-4 py-3 transition-all duration-150 active:scale-95 ${
              active
                ? 'border-primary bg-primary text-primary-foreground shadow-md'
                : 'border-border bg-card text-foreground hover:border-primary/40'
            }`}
          >
            <span className="text-2xl" aria-hidden="true">
              {cat.emoji}
            </span>
            <span className="text-xs font-bold">{cat.label}</span>
            <span className={`text-[10px] font-semibold tabular ${active ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
              {cat.count} places
            </span>
          </button>
        );
      })}
    </div>
  );
}