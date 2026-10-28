import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Star, Clock, Bike, ShoppingBag, MapPin, Info, Store } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import VerifiedBadge from '@/components/ui/VerifiedBadge';
import Badge from '@/components/ui/Badge';
import { activeRestaurant, formatPKR } from '@/lib/mockData';

export default function RestaurantHeader() {
  const r = activeRestaurant;

  return (
    <section aria-label="Restaurant details" className="overflow-hidden rounded-3xl border border-border bg-card">
      <div className="relative h-48 bg-foreground md:h-60">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_2968a84be-1793139475849.jpeg"
          alt="Counter of freshly made smash burgers and fries at a busy burger kitchen"
          fill
          priority
          sizes="100vw"
          className="object-cover" />
        
        <div className="scrim-bottom absolute inset-0" />
        <Link
          href="/"
          className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-background px-3 py-1.5 text-xs font-bold text-foreground transition-all duration-150 hover:opacity-90 active:scale-95">
          
          <ChevronLeft size={14} />
          All restaurants
        </Link>
        <div className="absolute right-4 top-4">
          <Badge tone="success" className="bg-background">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Accepting orders
          </Badge>
        </div>
      </div>

      <div className="relative px-5 pb-5 md:px-8 md:pb-6">
        <div className="-mt-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-end gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-4 border-card bg-primary shadow-lg md:h-24 md:w-24">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_4be13c310-1793139473315.png"
                alt="Smash House Burgers logo showing a stacked cheeseburger"
                fill
                sizes="96px"
                className="object-cover" />
              
            </div>
            <div className="pb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">{r?.name}</h1>
                <VerifiedBadge showLabel size={20} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                American · Burgers · Fried Chicken · Shakes
              </p>
            </div>
          </div>

          <Link
            href="/cart-and-checkout"
            className="flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-bold transition-all duration-150 hover:border-primary hover:text-primary active:scale-95">
            
            <ShoppingBag size={16} />
            View cart
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-2xl bg-secondary p-3.5">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <Star size={13} className="fill-warning text-warning" />
              Rating
            </p>
            <p className="mt-1 text-lg font-extrabold tabular">
              {r?.rating?.toFixed(1)} <span className="text-xs font-semibold text-muted-foreground">({r?.reviewCount?.toLocaleString('en-US')})</span>
            </p>
          </div>
          <div className="rounded-2xl bg-secondary p-3.5">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <Clock size={13} />
              Restaurant ETA
            </p>
            <p className="mt-1 text-lg font-extrabold tabular">
              {r?.etaMin}–{r?.etaMax} min
            </p>
          </div>
          <div className="rounded-2xl bg-secondary p-3.5">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <Bike size={13} />
              Delivery fee
            </p>
            <p className="mt-1 text-lg font-extrabold tabular">{formatPKR(r?.deliveryFee)}</p>
          </div>
          <div className="rounded-2xl bg-secondary p-3.5">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <Store size={13} />
              Minimum order
            </p>
            <p className="mt-1 text-lg font-extrabold tabular">{formatPKR(r?.minOrder)}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 rounded-2xl border border-border bg-background p-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p className="flex items-start gap-2">
            <MapPin size={14} className="mt-0.5 shrink-0 text-primary" />
            <span>
              <span className="font-bold text-foreground">Delivers to your address</span> — Gulberg III is inside their zone (Gulberg III, DHA Phase 5, Cantt, Model Town). Open until {r?.closesAt}.
            </span>
          </p>
          <p className="flex items-start gap-2 md:max-w-sm">
            <Info size={14} className="mt-0.5 shrink-0 text-accent" />
            <span>
              This restaurant prepares and delivers your order itself. Delivery updates are reported by the restaurant.
            </span>
          </p>
        </div>
      </div>
    </section>);

}