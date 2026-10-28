'use client';

import React, { useState } from 'react';
import { MapPin, Search, ChevronDown, Check, Clock } from 'lucide-react';
import { addresses } from '@/lib/mockData';

export default function AddressSearchBar() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(addresses?.[0]?.id);
  const [query, setQuery] = useState('');

  const selected = addresses?.find((a) => a?.id === selectedId) ?? addresses?.[0];

  return (
    <section className="space-y-4" aria-label="Delivery address and search">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">Good evening, Hira 👋</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">What are you craving tonight?</h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock size={14} className="text-accent" />
            <span className="tabular">94</span> restaurants are accepting orders to your address right now
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-left shadow-sm transition-all duration-150 hover:border-primary/50 active:scale-[0.99] lg:w-80"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MapPin size={18} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold text-muted-foreground">Deliver to · {selected?.label}</span>
              <span className="block truncate text-sm font-bold">{selected?.line}</span>
            </span>
            <ChevronDown size={18} className={`text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
          </button>

          {open && (
            <div className="modal-in absolute right-0 z-30 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-card shadow-xl lg:w-96">
              <ul>
                {addresses?.map((addr) => (
                  <li key={addr?.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedId(addr?.id);
                        setOpen(false);
                      }}
                      className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted"
                    >
                      <MapPin size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold">{addr?.label}</span>
                        <span className="block truncate text-xs text-muted-foreground">{addr?.line}</span>
                      </span>
                      {addr?.id === selectedId && <Check size={16} className="mt-0.5 text-accent" />}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="w-full border-t border-border px-4 py-3 text-left text-sm font-bold text-primary transition-colors hover:bg-muted"
              >
                + Add a new address
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="relative">
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <label htmlFor="home-search" className="sr-only">
          Search restaurants or dishes
        </label>
        <input
          id="home-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e?.target?.value)}
          placeholder="Search restaurants, dishes or cuisines — try “smash burger” or “halwa puri”"
          className="w-full rounded-2xl border border-border bg-card py-3.5 pl-11 pr-4 text-sm shadow-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </section>
  );
}