'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Home, UtensilsCrossed, Bell, MapPin } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import { useCart } from '@/components/CartContext';
import { formatPKR } from '@/lib/mockData';
import Icon from '@/components/ui/AppIcon';


const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/restaurant-menu', label: 'Menu', icon: UtensilsCrossed },
  { href: '/cart-and-checkout', label: 'Cart', icon: ShoppingBag },
];

export default function Topbar() {
  const pathname = usePathname();
  const { itemCount, subtotal } = useCart();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between gap-4 px-4 md:px-6 xl:px-10 2xl:px-16">
          <Link href="/" className="flex items-center gap-2" aria-label="DirectBite home">
            <AppLogo size={40} />
            <span className="hidden text-xl font-extrabold tracking-tight text-foreground sm:block">
              Direct<span className="text-primary">Bite</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navItems?.map((item) => {
              const active = pathname === item?.href;
              const Icon = item?.icon;
              return (
                <Link
                  key={`nav-${item?.label}`}
                  href={item?.href}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
                    active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon size={16} />
                  {item?.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground lg:flex">
              <MapPin size={13} className="text-primary" />
              Delivering to Gulberg III
            </div>
            <button
              type="button"
              className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Notifications, 2 unread"
            >
              <Bell size={20} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
            </button>
            <Link
              href="/cart-and-checkout"
              className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-95"
            >
              <ShoppingBag size={16} />
              <span className="tabular">{itemCount}</span>
              <span className="hidden tabular sm:inline">· {formatPKR(subtotal)}</span>
            </Link>
          </div>
        </div>
      </header>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card pb-[env(safe-area-inset-bottom)] md:hidden"
        aria-label="Mobile primary"
      >
        <ul className="grid grid-cols-3">
          {navItems?.map((item) => {
            const active = pathname === item?.href;
            const Icon = item?.icon;
            return (
              <li key={`tab-${item?.label}`}>
                <Link
                  href={item?.href}
                  className={`flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition-colors ${
                    active ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <span className="relative">
                    <Icon size={20} />
                    {item?.label === 'Cart' && itemCount > 0 && (
                      <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground tabular">
                        {itemCount}
                      </span>
                    )}
                  </span>
                  {item?.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}