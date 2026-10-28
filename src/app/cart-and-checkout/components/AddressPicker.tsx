'use client';

import React from 'react';
import { MapPin, Home, Briefcase, Heart, AlertTriangle, Clock } from 'lucide-react';
import { addresses } from '@/lib/mockData';

interface AddressPickerProps {
  selectedId: string;
  onSelect: (id: string) => void;
  outOfZone: boolean;
  restaurantName: string;
  zones: string[];
}

const iconFor: Record<string, React.ReactNode> = {
  'addr-001': <Home size={16} />,
  'addr-002': <Briefcase size={16} />,
  'addr-003': <Heart size={16} />,
};

export default function AddressPicker({ selectedId, onSelect, outOfZone, restaurantName, zones }: AddressPickerProps) {
  return (
    <section aria-label="Delivery address" className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <MapPin size={18} className="text-primary" />
          Delivery address
        </h2>
        <button type="button" className="text-xs font-bold text-primary transition-opacity hover:opacity-80">
          + Add new
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        {addresses.map((addr) => {
          const checked = addr.id === selectedId;
          return (
            <label
              key={addr.id}
              className={`flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition-all duration-150 ${
                checked ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
              }`}
            >
              <span className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-bold">
                  <span className={checked ? 'text-primary' : 'text-muted-foreground'}>{iconFor[addr.id]}</span>
                  {addr.label}
                </span>
                <input
                  type="radio"
                  name="delivery-address"
                  checked={checked}
                  onChange={() => onSelect(addr.id)}
                  className="h-4 w-4 accent-primary"
                  aria-label={`Deliver to ${addr.label}`}
                />
              </span>
              <span className="text-xs text-muted-foreground">{addr.line}</span>
              <span className="text-xs font-semibold">{addr.area}</span>
              {addr.note && <span className="text-[11px] italic text-muted-foreground">Note: {addr.note}</span>}
              {addr.isDefault && (
                <span className="w-fit rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-secondary-foreground">
                  Default
                </span>
              )}
            </label>
          );
        })}
      </div>

      {outOfZone ? (
        <div className="fade-in mt-4 flex items-start gap-3 rounded-xl bg-destructive/10 p-4 text-sm">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-destructive" />
          <div>
            <p className="font-bold text-destructive">{restaurantName} doesn&apos;t deliver to this address</p>
            <p className="mt-0.5 text-xs text-foreground">
              Their delivery zones: {zones.join(', ')}. Choose a different address to continue.
            </p>
          </div>
        </div>
      ) : (
        <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Clock size={13} className="text-accent" />
          <span>
            Inside {restaurantName}&apos;s delivery zone · the restaurant arranges delivery and reports status updates
          </span>
        </p>
      )}
    </section>
  );
}