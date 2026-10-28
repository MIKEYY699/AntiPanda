import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="hidden border-t border-border bg-card md:block">
      <div className="mx-auto flex w-full max-w-screen-2xl items-start justify-between gap-8 px-6 py-8 xl:px-10 2xl:px-16">
        <div className="max-w-sm">
          <div className="flex items-center gap-2">
            <AppLogo size={36} />
            <span className="text-lg font-extrabold tracking-tight">
              Direct<span className="text-primary">Bite</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            DirectBite connects you straight to local restaurants. Every restaurant prepares and delivers its own
            orders — we don&apos;t run a rider fleet.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm">
          <div>
            <p className="mb-3 font-bold">Order</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Browse restaurants
                </Link>
              </li>
              <li>
                <Link href="/restaurant-menu" className="transition-colors hover:text-foreground">
                  Today&apos;s menu
                </Link>
              </li>
              <li>
                <Link href="/cart-and-checkout" className="transition-colors hover:text-foreground">
                  Your cart
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-bold">Trust</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>Verified restaurant badge</li>
              <li>Itemised pricing, no surprise fees</li>
              <li>Restaurant-reported delivery updates</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © 2026 DirectBite Technologies (Pvt) Ltd. Lahore, Pakistan.
      </div>
    </footer>
  );
}