'use client';

import React, { useState } from 'react';
import { Percent, Timer, Gift, Copy, Check } from 'lucide-react';
import { offers, type Offer } from '@/lib/mockData';

const toneClasses: Record<Offer['tone'], string> = {
  primary: 'hero-gradient text-primary-foreground',
  accent: 'olive-gradient text-accent-foreground',
  warning: 'bg-warning text-warning-foreground',
};

const toneIcon: Record<Offer['tone'], React.ReactNode> = {
  primary: <Percent size={18} />,
  accent: <Timer size={18} />,
  warning: <Gift size={18} />,
};

export default function OffersRow() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = (code: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => undefined);
    }
    setCopied(code);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <section aria-label="Active offers" className="space-y-3">
      <h2 className="text-lg font-bold">Offers from this restaurant</h2>
      <div className="scrollbar-none -mx-4 flex gap-4 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
        {offers.map((offer) => (
          <article
            key={offer.id}
            className={`relative w-72 shrink-0 overflow-hidden rounded-2xl p-4 md:w-auto ${toneClasses[offer.tone]}`}
          >
            <div className="blob-primary absolute inset-0" />
            <div className="relative flex items-start justify-between gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-background text-foreground">
                {toneIcon[offer.tone]}
              </span>
              <span className="rounded-full bg-background px-2.5 py-0.5 text-[11px] font-bold text-foreground tabular">
                {offer.expiresIn}
              </span>
            </div>
            <h3 className="relative mt-3 text-base font-extrabold">{offer.title}</h3>
            <p className="relative mt-1 text-xs opacity-90">{offer.description}</p>
            {offer.code && (
              <button
                type="button"
                onClick={() => copyCode(offer.code as string)}
                className="relative mt-3 flex items-center gap-2 rounded-full border border-dashed border-current px-3 py-1.5 text-xs font-bold transition-all duration-150 active:scale-95"
              >
                {copied === offer.code ? <Check size={13} /> : <Copy size={13} />}
                {copied === offer.code ? 'Copied!' : offer.code}
              </button>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}