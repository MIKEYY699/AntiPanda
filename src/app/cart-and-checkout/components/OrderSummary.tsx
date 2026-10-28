'use client';

import React from 'react';
import { ShieldCheck, Bike, AlertTriangle, Loader2 } from 'lucide-react';
import { formatPKR } from '@/lib/mockData';

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  delivery: number;
  tax: number;
  serviceFee: number;
  total: number;
  couponCode: string | null;
  minOrder: number;
  belowMinimum: boolean;
  outOfZone: boolean;
  paymentUnavailable: boolean;
  paymentLabel: string;
  placing: boolean;
  canPlace: boolean;
  onPlace: () => void;
}

function Row({
  label,
  value,
  tone = 'default',
  strong = false,
}: {
  label: string;
  value: string;
  tone?: 'default' | 'success';
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={strong ? 'font-bold' : 'text-muted-foreground'}>{label}</span>
      <span className={`tabular ${strong ? 'text-lg font-extrabold' : 'font-semibold'} ${tone === 'success' ? 'text-success' : ''}`}>
        {value}
      </span>
    </div>
  );
}

export default function OrderSummary({
  subtotal,
  discount,
  delivery,
  tax,
  serviceFee,
  total,
  couponCode,
  minOrder,
  belowMinimum,
  outOfZone,
  paymentUnavailable,
  paymentLabel,
  placing,
  canPlace,
  onPlace,
}: OrderSummaryProps) {
  const blocker = belowMinimum
    ? `Add ${formatPKR(minOrder - subtotal)} more to reach the ${formatPKR(minOrder)} minimum order`
    : outOfZone
      ? 'Choose an address inside the delivery zone'
      : paymentUnavailable
        ? 'Choose an available payment method'
        : null;

  return (
    <aside aria-label="Order summary" className="lg:sticky lg:top-24 lg:self-start">
      <div className="space-y-4 rounded-2xl border border-border bg-card p-5">
        <h2 className="text-lg font-bold">Order summary</h2>

        <div className="space-y-2.5">
          <Row label="Subtotal" value={formatPKR(subtotal)} />
          {discount > 0 && <Row label={`Discount${couponCode ? ` (${couponCode})` : ''}`} value={`− ${formatPKR(discount)}`} tone="success" />}
          <Row label="Delivery fee" value={formatPKR(delivery)} />
          <Row label="GST (16%)" value={formatPKR(tax)} />
          <Row label="Service fee" value={formatPKR(serviceFee)} />
        </div>

        <div className="border-t border-border pt-4">
          <Row label="Total to pay" value={formatPKR(total)} strong />
          <p className="mt-1 text-right text-[11px] text-muted-foreground">
            {paymentLabel.startsWith('Cash') ? 'Pay the restaurant in cash on delivery' : `Charged to ${paymentLabel}`}
          </p>
          {discount > 0 && (
            <p className="mt-2 rounded-lg bg-success/10 px-3 py-2 text-center text-xs font-bold text-success tabular">
              You&apos;re saving {formatPKR(discount)} on this order
            </p>
          )}
        </div>

        {blocker && (
          <div className="fade-in flex items-start gap-2 rounded-xl bg-warning/20 p-3 text-xs font-semibold">
            <AlertTriangle size={14} className="mt-0.5 shrink-0" />
            <span>{blocker}</span>
          </div>
        )}

        <button
          type="button"
          onClick={onPlace}
          disabled={!canPlace}
          aria-busy={placing}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
        >
          {placing ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Placing order…
            </>
          ) : (
            <>Place order · {formatPKR(total)}</>
          )}
        </button>

        <ul className="space-y-2.5 text-xs text-muted-foreground">
          <li className="flex items-start gap-2">
            <Bike size={14} className="mt-0.5 shrink-0 text-accent" />
            <span>
              <span className="font-bold text-foreground">The restaurant delivers this order.</span> DirectBite has no rider
              fleet — you&apos;ll see status updates reported by the restaurant.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ShieldCheck size={14} className="mt-0.5 shrink-0 text-accent" />
            <span>
              Prices, offers and stock are re-validated by the server. If the restaurant rejects or doesn&apos;t respond within
              5 minutes, your order is cancelled automatically.
            </span>
          </li>
        </ul>
      </div>
    </aside>
  );
}