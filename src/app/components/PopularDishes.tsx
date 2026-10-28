import React from 'react';
import Link from 'next/link';
import { Star, Flame } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import { popularDishes, formatPKR } from '@/lib/mockData';

export default function PopularDishes() {
  return (
    <section aria-label="Popular dishes this week" className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Flame size={20} className="text-primary" />
            Popular dishes this week
          </h2>
          <p className="text-sm text-muted-foreground">Most ordered across Lahore in the last 7 days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {popularDishes?.map((dish) => (
          <Link
            key={dish?.id}
            href="/restaurant-menu"
            className="group flex gap-4 rounded-2xl border border-border bg-card p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-foreground">
              <AppImage
                src={dish?.image}
                alt={dish?.alt}
                fill
                sizes="112px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
              <div>
                <h3 className="truncate text-sm font-bold">{dish?.name}</h3>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{dish?.restaurant}</p>
                <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold">
                  <Star size={12} className="fill-warning text-warning" />
                  <span className="tabular">{dish?.rating?.toFixed(1)}</span>
                  <span className="font-medium text-muted-foreground">· {dish?.orders}</span>
                </p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-base font-extrabold tabular">{formatPKR(dish?.promoPrice ?? dish?.price)}</span>
                {dish?.promoPrice && (
                  <>
                    <span className="text-xs text-muted-foreground line-through tabular">{formatPKR(dish?.price)}</span>
                    <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success tabular">
                      Save {formatPKR(dish?.price - dish?.promoPrice)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}