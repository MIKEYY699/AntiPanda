import React from 'react';
import Link from 'next/link';
import { Flame, Timer, Percent, Gift, ArrowRight, Soup } from 'lucide-react';
import VerifiedBadge from '@/components/ui/VerifiedBadge';
import AppImage from '@/components/ui/AppImage';

export default function DealsBento() {
  return (
    <section aria-label="Today's best deals">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">Deals ending soon</h2>
          <p className="text-sm text-muted-foreground">Offers set by the restaurants themselves · updated 22:08</p>
        </div>
        <span className="hidden items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary sm:flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Live
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {/* Hero tile */}
        <Link
          href="/restaurant-menu"
          className="group relative min-h-[260px] overflow-hidden rounded-3xl bg-foreground transition-transform duration-200 hover:-translate-y-0.5 md:col-span-2 lg:row-span-2 lg:min-h-[360px]">
          
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_4370d9ff2-1788987569234.png"
            alt="Double smash cheeseburger with melted cheddar and crinkle fries on a wooden board"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105" />
          
          <div className="scrim-bottom absolute inset-0" />
          <div className="absolute left-5 top-5 flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
              <Flame size={13} />
              Buy 1 Get 1
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-background px-3 py-1 text-xs font-bold text-foreground tabular">
              <Timer size={13} className="text-primary" />
              Ends in 2h 14m
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-background">
              Smash House Burgers
              <span className="rounded-full bg-background p-0.5">
                <VerifiedBadge />
              </span>
            </div>
            <h3 className="text-hero-xl max-w-md font-extrabold text-background">
              Two classics for the price of one
            </h3>
            <p className="mt-2 max-w-md text-sm text-background/80">
              Auto-applied on any Classic Smash. 25–35 min · Rs 99 delivery · delivered by the restaurant.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-bold text-foreground transition-all duration-150 group-hover:gap-3 group-active:scale-95">
              Order now
              <ArrowRight size={16} />
            </span>
          </div>
        </Link>

        {/* Tile 2 */}
        <Link
          href="/restaurant-menu"
          className="group flex flex-col justify-between rounded-3xl bg-secondary p-5 transition-transform duration-200 hover:-translate-y-0.5">
          
          <div className="flex items-start justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Percent size={18} />
            </span>
            <span className="text-xs font-bold text-muted-foreground tabular">Ends Sunday</span>
          </div>
          <div>
            <p className="text-3xl font-extrabold tabular">20% off</p>
            <p className="mt-1 text-sm font-semibold">BBQ platters at Bundu Khan Gulberg</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Min. order Rs 800 · Max saving Rs 600</p>
          </div>
        </Link>

        {/* Tile 3 */}
        <Link
          href="/restaurant-menu"
          className="olive-gradient group relative flex flex-col justify-between overflow-hidden rounded-3xl p-5 transition-transform duration-200 hover:-translate-y-0.5">
          
          <div className="blob-primary absolute inset-0" />
          <div className="relative flex items-start justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-background text-accent">
              <Gift size={18} />
            </span>
            <span className="rounded-full bg-background/20 px-2.5 py-0.5 text-xs font-bold text-accent-foreground">
              Free item
            </span>
          </div>
          <div className="relative">
            <p className="text-xl font-extrabold text-accent-foreground">Free brownie</p>
            <p className="mt-1 text-sm font-semibold text-accent-foreground">on orders over Rs 2,000</p>
            <p className="mt-0.5 text-xs text-accent-foreground/80">Sweet Tooth Atelier · 30–40 min</p>
          </div>
        </Link>

        {/* Tile 4 — alert / limited */}
        <Link
          href="/restaurant-menu"
          className="group flex flex-col justify-between rounded-3xl border border-warning bg-warning/15 p-5 transition-transform duration-200 hover:-translate-y-0.5">
          
          <div className="flex items-start justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning text-warning-foreground">
              <Soup size={18} />
            </span>
            <span className="rounded-full bg-destructive px-2.5 py-0.5 text-xs font-bold text-destructive-foreground tabular">
              Only 3 left
            </span>
          </div>
          <div>
            <p className="text-lg font-extrabold">Family Karahi + 4 Naan</p>
            <p className="mt-1 text-sm font-semibold tabular">Rs 2,799 <span className="text-muted-foreground line-through">Rs 3,450</span></p>
            <p className="mt-0.5 text-xs text-muted-foreground">Haveli Karahi Point · limited daily batch</p>
          </div>
        </Link>

        {/* Tile 5 */}
        <Link
          href="/restaurant-menu"
          className="group flex flex-col justify-between rounded-3xl border border-border bg-card p-5 transition-transform duration-200 hover:-translate-y-0.5">
          
          <div className="flex items-start justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Percent size={18} />
            </span>
            <span className="text-xs font-bold text-muted-foreground">Code WELCOME150</span>
          </div>
          <div>
            <p className="text-3xl font-extrabold tabular">Rs 150</p>
            <p className="mt-1 text-sm font-semibold">off your next order above Rs 700</p>
            <p className="mt-0.5 text-xs text-muted-foreground">New to DirectBite? Applies on any restaurant.</p>
          </div>
        </Link>
      </div>
    </section>);

}