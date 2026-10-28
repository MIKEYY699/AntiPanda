'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Clock, ChefHat, PackageCheck, Bike, Home, MapPin, CreditCard, Timer } from 'lucide-react';
import { formatPKR } from '@/lib/mockData';
import Icon from '@/components/ui/AppIcon';


interface OrderPlacedProps {
  reference: string;
  total: number;
  paymentLabel: string;
  address: string;
  restaurantName: string;
  etaMin: number;
  etaMax: number;
}

const steps = [
  { id: 'step-placed', label: 'Order placed', hint: 'Sent to the restaurant', icon: CheckCircle2 },
  { id: 'step-accepted', label: 'Restaurant accepts', hint: 'Waiting for confirmation', icon: Clock },
  { id: 'step-preparing', label: 'Preparing', hint: 'Your food is being made', icon: ChefHat },
  { id: 'step-ready', label: 'Ready', hint: 'Packed and ready to leave', icon: PackageCheck },
  { id: 'step-delivery', label: 'Out for delivery', hint: 'Restaurant delivery staff', icon: Bike },
  { id: 'step-delivered', label: 'Delivered', hint: 'Enjoy your meal', icon: Home },
];

export default function OrderPlaced({ reference, total, paymentLabel, address, restaurantName, etaMin, etaMax }: OrderPlacedProps) {
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    // Backend integration: subscribe to the order status stream (restaurant-reported updates).
    const accept = setTimeout(() => setAccepted(true), 6000);
    return () => {
      clearInterval(timer);
      clearTimeout(accept);
    };
  }, []);

  const mins = Math.floor(secondsLeft / 60);
  const secs = (secondsLeft % 60).toString().padStart(2, '0');
  const currentIndex = accepted ? 2 : 1;

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-4">
      <div className="slide-up rounded-3xl bg-accent p-8 text-center text-accent-foreground">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-background text-accent">
          <CheckCircle2 size={34} />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold md:text-3xl">Order sent to {restaurantName}!</h1>
        <p className="mt-2 text-sm opacity-90">
          Reference <span className="font-extrabold tracking-wide tabular">{reference}</span> · Estimated{' '}
          <span className="font-bold tabular">
            {etaMin}–{etaMax} min
          </span>{' '}
          once accepted
        </p>
      </div>

      {!accepted ? (
        <div className="fade-in flex items-center gap-3 rounded-2xl border border-warning bg-warning/15 p-4 text-sm">
          <Timer size={20} className="shrink-0" />
          <p>
            Waiting for <span className="font-bold">{restaurantName}</span> to accept. If they don&apos;t respond in{' '}
            <span className="font-extrabold tabular">
              {mins}:{secs}
            </span>
            , the order is cancelled and you won&apos;t be charged.
          </p>
        </div>
      ) : (
        <div className="fade-in flex items-center gap-3 rounded-2xl border border-success/40 bg-success/10 p-4 text-sm">
          <CheckCircle2 size={20} className="shrink-0 text-success" />
          <p>
            <span className="font-bold">{restaurantName} accepted your order</span> and has started preparing it. They will arrange delivery themselves.
          </p>
        </div>
      )}

      <section aria-label="Order progress" className="rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-5 text-lg font-bold">Order progress</h2>
        <ol className="space-y-0">
          {steps.map((step, i) => {
            const done = i < currentIndex;
            const active = i === currentIndex;
            const Icon = step.icon;
            return (
              <li key={step.id} className="relative flex gap-4 pb-6 last:pb-0">
                {i < steps.length - 1 && (
                  <span
                    className={`absolute left-5 top-10 h-[calc(100%-2.5rem)] w-0.5 transition-colors duration-500 ${
                      done ? 'bg-accent' : 'bg-border'
                    }`}
                  />
                )}
                <span
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                    done
                      ? 'bg-accent text-accent-foreground'
                      : active
                        ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon size={18} />
                </span>
                <div className="pt-1.5">
                  <p className={`text-sm font-bold ${!done && !active ? 'text-muted-foreground' : ''}`}>{step.label}</p>
                  <p className="text-xs text-muted-foreground">{active ? 'In progress · ' : ''}{step.hint}</p>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-5 rounded-xl bg-secondary px-4 py-3 text-xs text-secondary-foreground">
          Delivery status is reported by {restaurantName}. DirectBite does not operate its own riders and does not show live GPS tracking.
        </p>
      </section>

      <section aria-label="Order details" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <CreditCard size={13} />
            Total · payment
          </p>
          <p className="mt-1 text-lg font-extrabold tabular">{formatPKR(total)}</p>
          <p className="text-xs text-muted-foreground">{paymentLabel}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 sm:col-span-2">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <MapPin size={13} />
            Delivering to
          </p>
          <p className="mt-1 text-sm font-bold">{address}</p>
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="flex flex-1 items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-95"
        >
          Back to home
        </Link>
        <Link
          href="/restaurant-menu"
          className="flex flex-1 items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-bold transition-all duration-150 hover:bg-muted active:scale-95"
        >
          Order something else
        </Link>
      </div>
    </div>
  );
}