'use client';

import React from 'react';
import { Plus, Flame, Leaf, AlertCircle, Users } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import Badge from '@/components/ui/Badge';
import { formatPKR, type MenuItem } from '@/lib/mockData';

interface MenuItemCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

export default function MenuItemCard({ item, onAdd }: MenuItemCardProps) {
  const soldOut = item.stock === 'out';
  const hasOptions = Boolean(item.modifiers && item.modifiers.length > 0);
  const effective = item.promoPrice ?? item.price;

  return (
    <article
      className={`group flex gap-4 rounded-2xl border border-border bg-card p-4 transition-all duration-200 ${
        soldOut ? 'opacity-70' : 'hover:-translate-y-0.5 hover:shadow-md'
      }`}
    >
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            <h3 className="text-base font-bold">{item.name}</h3>
            {item.popular && <Badge tone="primary">Popular</Badge>}
            {item.stock === 'low' && <Badge tone="warning">Only {item.stockLeft} left</Badge>}
            {soldOut && <Badge tone="destructive">Sold out</Badge>}
          </div>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.description}</p>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold text-muted-foreground">
            {item.dietary.map((d) => (
              <span key={`${item.id}-diet-${d}`} className="flex items-center gap-1 text-accent">
                <Leaf size={11} />
                {d}
              </span>
            ))}
            {item.spice !== undefined && item.spice > 0 && (
              <span className="flex items-center gap-0.5 text-primary">
                {Array.from({ length: item.spice }).map((_, i) => (
                  <Flame key={`${item.id}-spice-${i + 1}`} size={11} />
                ))}
                Spicy
              </span>
            )}
            {item.serves && (
              <span className="flex items-center gap-1">
                <Users size={11} />
                {item.serves}
              </span>
            )}
          </div>
          {item.allergens.length > 0 && (
            <p className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
              <AlertCircle size={11} className="shrink-0" />
              Contains: {item.allergens.join(', ')}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold tabular">{formatPKR(effective)}</span>
            {item.promoPrice && (
              <>
                <span className="text-xs text-muted-foreground line-through tabular">{formatPKR(item.price)}</span>
                <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success tabular">
                  −{Math.round(((item.price - item.promoPrice) / item.price) * 100)}%
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="relative h-28 w-28 shrink-0 sm:h-32 sm:w-32">
        <div className="relative h-full w-full overflow-hidden rounded-xl bg-foreground">
          <AppImage
            src={item.image}
            alt={item.alt}
            fill
            sizes="128px"
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${soldOut ? 'grayscale' : ''}`}
          />
        </div>
        <button
          type="button"
          onClick={() => onAdd(item)}
          disabled={soldOut}
          aria-label={soldOut ? `${item.name} is sold out` : hasOptions ? `Customize and add ${item.name}` : `Add ${item.name} to cart`}
          className={`absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full px-4 py-1.5 text-xs font-bold shadow-md transition-all duration-150 ${
            soldOut
              ? 'cursor-not-allowed bg-muted text-muted-foreground'
              : 'bg-primary text-primary-foreground hover:opacity-90 active:scale-95'
          }`}
        >
          {soldOut ? (
            'Unavailable'
          ) : (
            <>
              <Plus size={13} />
              {hasOptions ? 'Customize' : 'Add'}
            </>
          )}
        </button>
      </div>
    </article>
  );
}