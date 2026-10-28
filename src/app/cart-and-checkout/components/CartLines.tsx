'use client';

import React, { useState } from 'react';
import { Minus, Plus, Trash2, MessageSquare, Check } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';
import { useCart } from '@/components/CartContext';
import { formatPKR } from '@/lib/mockData';

export default function CartLines() {
  const { lines, updateQuantity, removeLine, updateInstructions, lineTotal } = useCart();
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleRemove = (lineId: string) => {
    setRemovingId(lineId);
    setTimeout(() => {
      removeLine(lineId);
      setRemovingId(null);
    }, 250);
  };

  return (
    <section aria-label="Items in your cart" className="rounded-2xl border border-border bg-card p-5">
      <h2 className="mb-4 text-lg font-bold">Your items</h2>
      <ul className="divide-y divide-border">
        {lines.map((line) => {
          const unit = line.basePrice + line.modifiers.reduce((s, m) => s + m.price, 0);
          const isRemoving = removingId === line.lineId;
          const isEditing = editingId === line.lineId;
          return (
            <li
              key={line.lineId}
              className={`overflow-hidden py-4 transition-all duration-300 first:pt-0 last:pb-0 ${
                isRemoving ? 'max-h-0 py-0 opacity-0' : 'max-h-96 opacity-100'
              }`}
            >
              <div className="flex gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-foreground">
                  <AppImage src={line.image} alt={line.alt} fill sizes="80px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold">{line.name}</h3>
                      {line.modifiers.length > 0 && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {line.modifiers.map((m) => m.label).join(' · ')}
                        </p>
                      )}
                      {line.instructions && !isEditing && (
                        <p className="mt-1 flex items-center gap-1 text-xs italic text-muted-foreground">
                          <MessageSquare size={11} />
                          “{line.instructions}”
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 text-sm font-extrabold tabular">{formatPKR(lineTotal(line))}</span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center rounded-full border border-border">
                      <button
                        type="button"
                        onClick={() => updateQuantity(line.lineId, line.quantity - 1)}
                        aria-label={`Decrease quantity of ${line.name}`}
                        className="rounded-full p-2 transition-colors hover:bg-muted active:scale-90"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-7 text-center text-sm font-bold tabular">{line.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(line.lineId, Math.min(10, line.quantity + 1))}
                        disabled={line.quantity >= 10}
                        aria-label={`Increase quantity of ${line.name}`}
                        className="rounded-full p-2 transition-colors hover:bg-muted active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground tabular">{formatPKR(unit)} each</p>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setEditingId(isEditing ? null : line.lineId)}
                        className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <MessageSquare size={13} />
                        {line.instructions ? 'Edit note' : 'Add note'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemove(line.lineId)}
                        aria-label={`Remove ${line.name} from cart`}
                        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive active:scale-90"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="fade-in mt-3 flex gap-2">
                      <label htmlFor={`note-${line.lineId}`} className="sr-only">
                        Instructions for {line.name}
                      </label>
                      <input
                        id={`note-${line.lineId}`}
                        type="text"
                        value={line.instructions}
                        onChange={(e) => updateInstructions(line.lineId, e.target.value.slice(0, 140))}
                        placeholder="e.g. no pickles, extra napkins"
                        className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-all duration-150 active:scale-95"
                      >
                        <Check size={13} />
                        Done
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}