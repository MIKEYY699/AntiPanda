'use client';

import React from 'react';
import { Banknote, CreditCard, Wallet, CreditCard as CardIcon, Lock } from 'lucide-react';
import { paymentMethods } from '@/lib/mockData';

interface PaymentPickerProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

const iconFor: Record<string, React.ReactNode> = {
  cod: <Banknote size={18} />,
  card: <CreditCard size={18} />,
  wallet: <Wallet size={18} />,
};

export default function PaymentPicker({ selectedId, onSelect }: PaymentPickerProps) {
  return (
    <section aria-label="Payment method" className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <CardIcon size={18} className="text-primary" />
          Payment method
        </h2>
        <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
          <Lock size={12} />
          Secure checkout
        </span>
      </div>

      <div className="space-y-3">
        {paymentMethods.map((pm) => {
          const checked = pm.id === selectedId;
          return (
            <label
              key={pm.id}
              className={`flex items-center gap-4 rounded-xl border p-4 transition-all duration-150 ${
                !pm.available
                  ? 'cursor-not-allowed border-border bg-muted opacity-70'
                  : checked
                    ? 'cursor-pointer border-primary bg-primary/5' :'cursor-pointer border-border hover:border-primary/40'
              }`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  checked && pm.available ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {iconFor[pm.type]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold">{pm.label}</span>
                <span className="block text-xs text-muted-foreground">{pm.detail}</span>
              </span>
              <input
                type="radio"
                name="payment-method"
                checked={checked}
                disabled={!pm.available}
                onChange={() => onSelect(pm.id)}
                className="h-4 w-4 accent-primary"
                aria-label={`Pay with ${pm.label}`}
              />
            </label>
          );
        })}
      </div>

      <p className="mt-4 rounded-xl bg-secondary px-4 py-3 text-xs text-secondary-foreground">
        Card payments are authorised only after the restaurant accepts your order. If it rejects or doesn&apos;t respond in
        <span className="font-bold tabular"> 5 minutes</span>, you are not charged.
      </p>
    </section>
  );
}