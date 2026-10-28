'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Ticket, X, Check } from 'lucide-react';
import { formatPKR, type Coupon } from '@/lib/mockData';

interface CouponBoxProps {
  coupons: Coupon[];
  subtotal: number;
  applied: Coupon | null;
  onApply: (coupon: Coupon) => void;
  onRemove: () => void;
}

interface CouponForm {
  code: string;
}

export default function CouponBox({ coupons, subtotal, applied, onApply, onRemove }: CouponBoxProps) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<CouponForm>({ defaultValues: { code: '' } });

  const submit = (values: CouponForm) => {
    const code = values.code.trim().toUpperCase();
    // Backend integration: validate coupon eligibility and usage limits on the server.
    const match = coupons.find((c) => c.code === code);
    if (!match) {
      setError('code', { message: `“${code}” isn't a valid code for this restaurant. Check the spelling and try again.` });
      return;
    }
    if (subtotal < match.minSpend) {
      setError('code', {
        message: `Add ${formatPKR(match.minSpend - subtotal)} more to use ${match.code} (minimum ${formatPKR(match.minSpend)}).`,
      });
      return;
    }
    onApply(match);
    reset();
  };

  return (
    <section aria-label="Coupon code" className="rounded-2xl border border-border bg-card p-5">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
        <Ticket size={18} className="text-primary" />
        Coupon code
      </h2>

      {applied ? (
        <div className="fade-in flex items-center justify-between gap-3 rounded-xl border border-success/40 bg-success/10 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-success text-success-foreground">
              <Check size={16} />
            </span>
            <div>
              <p className="text-sm font-bold">{applied.code} applied</p>
              <p className="text-xs text-muted-foreground">{applied.description}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove coupon ${applied.code}`}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-background hover:text-destructive"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(submit)} noValidate className="space-y-3">
          <div>
            <label htmlFor="coupon-code" className="mb-1 block text-sm font-bold">
              Have a code?
            </label>
            <div className="flex gap-2">
              <input
                id="coupon-code"
                type="text"
                autoComplete="off"
                placeholder="e.g. BITE10"
                {...register('code', {
                  required: 'Enter a coupon code first',
                  minLength: { value: 4, message: 'Coupon codes are at least 4 characters' },
                })}
                className={`min-w-0 flex-1 rounded-full border bg-background px-4 py-2.5 text-sm font-semibold uppercase outline-none transition-all placeholder:font-medium placeholder:normal-case placeholder:text-muted-foreground focus:ring-2 ${
                  errors.code
                    ? 'border-destructive focus:ring-destructive/20' :'border-border focus:border-primary focus:ring-primary/20'
                }`}
              />
              <button
                type="submit"
                className="rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background transition-all duration-150 hover:opacity-90 active:scale-95"
              >
                Apply
              </button>
            </div>
            {errors.code && <p className="mt-1.5 text-xs font-semibold text-destructive">{errors.code.message}</p>}
          </div>

          <div>
            <p className="mb-2 text-xs font-bold text-muted-foreground">Available for this order</p>
            <ul className="space-y-2">
              {coupons.map((c) => {
                const eligible = subtotal >= c.minSpend;
                return (
                  <li
                    key={c.code}
                    className={`flex items-center justify-between gap-3 rounded-xl border border-dashed px-4 py-2.5 ${
                      eligible ? 'border-primary/50' : 'border-border opacity-60'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-extrabold tracking-wide">{c.code}</p>
                      <p className="truncate text-xs text-muted-foreground">{c.description}</p>
                    </div>
                    <button
                      type="button"
                      disabled={!eligible}
                      onClick={() => onApply(c)}
                      className="shrink-0 rounded-full px-3 py-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:text-muted-foreground disabled:hover:bg-transparent"
                    >
                      {eligible ? 'Use' : 'Not eligible'}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </form>
      )}
    </section>
  );
}