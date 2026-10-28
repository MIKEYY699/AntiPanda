import React from 'react';
import Link from 'next/link';
import { History, Heart, Star, Clock } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import VerifiedBadge from '@/components/ui/VerifiedBadge';
import { recentlyViewed, restaurants, favoriteIds } from '@/lib/mockData';

export default function RecentlyViewedStrip() {
  const favorites = restaurants?.filter((r) => favoriteIds?.includes(r?.id));

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
      <section aria-label="Recently viewed restaurants" className="space-y-4">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <History size={20} className="text-muted-foreground" />
          Recently viewed
        </h2>
        <div className="scrollbar-none -mx-4 flex gap-4 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
          {recentlyViewed?.map((r) => (
            <Link
              key={`recent-${r?.id}`}
              href="/restaurant-menu"
              className="group w-56 shrink-0 overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative h-28 bg-foreground">
                <AppImage
                  src={r?.image}
                  alt={r?.alt}
                  fill
                  sizes="224px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-1 p-3">
                <div className="flex items-center gap-1.5">
                  <h3 className="truncate text-sm font-bold">{r?.name}</h3>
                  {r?.verified ? <VerifiedBadge size={14} /> : null}
                </div>
                <p className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star size={11} className="fill-warning text-warning" />
                    <span className="tabular">{r?.rating?.toFixed(1)}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    <span className="tabular">
                      {r?.etaMin}–{r?.etaMax} min
                    </span>
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section aria-label="Favorite restaurants" className="space-y-4">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Heart size={20} className="fill-primary text-primary" />
          Your favorites
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
          {favorites?.map((r) => (
            <li key={`fav-${r?.id}`}>
              <Link
                href="/restaurant-menu"
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 transition-all duration-200 hover:border-primary/40 hover:shadow-sm"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-foreground">
                  <AppImage src={r?.image} alt={r?.alt} fill sizes="56px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{r?.name}</p>
                  <p
                    className={`text-xs font-semibold ${
                      r?.status === 'closed' ? 'text-muted-foreground' : r?.status === 'busy' ? 'text-foreground' : 'text-success'
                    }`}
                  >
                    {r?.status === 'closed' ? r?.opensAt : r?.status === 'busy' ? 'Busy right now' : 'Accepting orders'}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}