'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Star, Bike, Clock, Tag, Moon } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import VerifiedBadge from '@/components/ui/VerifiedBadge';
import Badge from '@/components/ui/Badge';
import { formatPKR, type Restaurant } from '@/lib/mockData';

interface RestaurantCardProps {
  restaurant: Restaurant;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function RestaurantCard({ restaurant, isFavorite, onToggleFavorite }: RestaurantCardProps) {
  const r = restaurant;
  const closed = r.status === 'closed';

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
        closed ? 'opacity-90' : ''
      }`}
    >
      <Link href="/restaurant-menu" className="block" aria-label={`Open ${r.name} menu`}>
        <div className="relative h-40 overflow-hidden bg-foreground">
          <AppImage
            src={r.image}
            alt={r.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${closed ? 'grayscale' : ''}`}
          />
          <div className="scrim-bottom absolute inset-x-0 bottom-0 h-16" />
          {closed && (
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/60">
              <span className="flex items-center gap-2 rounded-full bg-background px-4 py-2 text-xs font-bold text-foreground">
                <Moon size={14} />
                Closed · {r.opensAt}
              </span>
            </div>
          )}
          {r.offer && !closed && (
            <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
              <Tag size={12} />
              {r.offer}
            </span>
          )}
          {r.status === 'busy' && (
            <span className="absolute left-3 top-3">
              <Badge tone="warning">Busy · +10 min</Badge>
            </span>
          )}
        </div>
      </Link>

      <button
        type="button"
        onClick={() => onToggleFavorite(r.id)}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? `Remove ${r.name} from favorites` : `Save ${r.name} to favorites`}
        className="absolute right-3 top-3 rounded-full bg-background p-2 shadow transition-all duration-150 hover:scale-110 active:scale-90"
      >
        <Heart size={16} className={isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'} />
      </button>

      <div className="space-y-3 p-4">
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-base font-bold">{r.name}</h3>
            {r.verified ? <VerifiedBadge /> : null}
          </div>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {r.cuisines.join(' · ')} · {'Rs '.repeat(r.priceTier).trim()}
          </p>
          {!r.verified && <p className="mt-1 text-[11px] font-semibold text-muted-foreground">Verification pending</p>}
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-semibold">
          <span className="flex items-center gap-1">
            <Star size={13} className="fill-warning text-warning" />
            <span className="tabular">{r.rating.toFixed(1)}</span>
            <span className="font-medium text-muted-foreground tabular">({r.reviewCount.toLocaleString('en-US')})</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} className="text-muted-foreground" />
            <span className="tabular">
              {r.etaMin}–{r.etaMax} min
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Bike size={13} className="text-muted-foreground" />
            <span className="tabular">{formatPKR(r.deliveryFee)}</span>
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3 text-xs">
          <span className="font-semibold text-muted-foreground">
            Min. order <span className="tabular text-foreground">{formatPKR(r.minOrder)}</span>
          </span>
          <span className={`font-bold ${closed ? 'text-muted-foreground' : r.status === 'busy' ? 'text-foreground' : 'text-success'}`}>
            {closed ? 'Not accepting' : r.status === 'busy' ? 'Busy mode' : 'Accepting orders'}
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground">
          Delivers to {r.zones.slice(0, 2).join(', ')}
          {r.zones.length > 2 ? ` +${r.zones.length - 2} more` : ''} · closes {r.closesAt}
        </p>
      </div>
    </article>
  );
}