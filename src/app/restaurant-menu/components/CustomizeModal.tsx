'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import AppImage from '@/components/ui/AppImage';
import { formatPKR, type MenuItem } from '@/lib/mockData';

export interface CustomizeResult {
  modifiers: { id: string; label: string; price: number }[];
  instructions: string;
  quantity: number;
}

interface CustomizeModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onConfirm: (item: MenuItem, result: CustomizeResult) => void;
}

export default function CustomizeModal({ item, onClose, onConfirm }: CustomizeModalProps) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [instructions, setInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (!item) return;
    const initial: Record<string, string[]> = {};
    (item.modifiers ?? []).forEach((group) => {
      initial[group.id] = group.required && !group.multiple ? [group.options[0].id] : [];
    });
    setSelected(initial);
    setInstructions('');
    setQuantity(1);
    setSubmitting(false);
    setShowErrors(false);
  }, [item]);

  const chosenModifiers = useMemo(() => {
    if (!item) return [];
    const out: { id: string; label: string; price: number }[] = [];
    (item.modifiers ?? []).forEach((group) => {
      (selected[group.id] ?? []).forEach((optId) => {
        const opt = group.options.find((o) => o.id === optId);
        if (opt) out.push({ id: opt.id, label: opt.label, price: opt.price });
      });
    });
    return out;
  }, [item, selected]);

  if (!item) return null;

  const base = item.promoPrice ?? item.price;
  const modTotal = chosenModifiers.reduce((s, m) => s + m.price, 0);
  const total = (base + modTotal) * quantity;
  const maxQty = item.stock === 'low' && item.stockLeft ? item.stockLeft : 10;

  const missingRequired = (item.modifiers ?? []).filter((g) => g.required && (selected[g.id] ?? []).length === 0);

  const toggleOption = (groupId: string, optionId: string, multiple: boolean) => {
    setSelected((prev) => {
      const current = prev[groupId] ?? [];
      if (multiple) {
        return {
          ...prev,
          [groupId]: current.includes(optionId) ? current.filter((id) => id !== optionId) : [...current, optionId],
        };
      }
      return { ...prev, [groupId]: [optionId] };
    });
  };

  const handleSubmit = () => {
    if (missingRequired.length > 0) {
      setShowErrors(true);
      return;
    }
    setSubmitting(true);
    // Backend integration: validate stock + price server-side before adding to cart.
    setTimeout(() => {
      onConfirm(item, { modifiers: chosenModifiers, instructions: instructions.trim(), quantity });
    }, 350);
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={item.name}
      footer={
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border border-border">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="rounded-full p-2.5 transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center text-sm font-bold tabular">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
              disabled={quantity >= maxQty}
              aria-label="Increase quantity"
              className="rounded-full p-2.5 transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="flex min-w-0 flex-1 items-center justify-between rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-95 disabled:opacity-70"
          >
            {submitting ? (
              <span className="mx-auto flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Adding…
              </span>
            ) : (
              <>
                <span>Add to cart</span>
                <span className="tabular">{formatPKR(total)}</span>
              </>
            )}
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="relative h-40 overflow-hidden rounded-xl bg-foreground">
          <AppImage src={item.image} alt={item.alt} fill sizes="512px" className="object-cover" />
        </div>
        <p className="text-sm text-muted-foreground">{item.description}</p>

        {item.stock === 'low' && (
          <p className="rounded-xl bg-warning/20 px-3 py-2 text-xs font-bold">
            Only {item.stockLeft} left today — quantity is capped to avoid overselling.
          </p>
        )}

        {(item.modifiers ?? []).map((group) => {
          const hasError = showErrors && group.required && (selected[group.id] ?? []).length === 0;
          return (
            <fieldset key={group.id} className="space-y-2">
              <legend className="flex w-full items-center justify-between">
                <span className="text-sm font-bold">{group.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    group.required ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {group.required ? 'Required' : group.multiple ? 'Optional · pick any' : 'Optional'}
                </span>
              </legend>
              <div className="space-y-2">
                {group.options.map((opt) => {
                  const checked = (selected[group.id] ?? []).includes(opt.id);
                  return (
                    <label
                      key={opt.id}
                      className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm transition-all duration-150 ${
                        checked ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type={group.multiple ? 'checkbox' : 'radio'}
                          name={`${item.id}-${group.id}`}
                          checked={checked}
                          onChange={() => toggleOption(group.id, opt.id, group.multiple)}
                          className="h-4 w-4 accent-primary"
                        />
                        <span className="font-semibold">{opt.label}</span>
                      </span>
                      <span className="text-xs font-bold text-muted-foreground tabular">
                        {opt.price > 0 ? `+ ${formatPKR(opt.price)}` : 'Included'}
                      </span>
                    </label>
                  );
                })}
              </div>
              {hasError && <p className="text-xs font-semibold text-destructive">Please choose an option for “{group.label}”.</p>}
            </fieldset>
          );
        })}

        <div className="space-y-2">
          <label htmlFor="item-instructions" className="text-sm font-bold">
            Special instructions
          </label>
          <p className="text-xs text-muted-foreground">The restaurant will try to accommodate, but it isn&apos;t guaranteed.</p>
          <textarea
            id="item-instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value.slice(0, 140))}
            rows={3}
            placeholder="e.g. no onions, sauce on the side"
            className="w-full resize-none rounded-xl border border-border bg-background p-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <p className="text-right text-[11px] text-muted-foreground tabular">{instructions.length}/140</p>
        </div>
      </div>
    </Modal>
  );
}