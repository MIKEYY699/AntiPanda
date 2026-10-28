'use client';

import React, { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ShoppingBag, Utensils } from 'lucide-react';
import { useCart } from '@/components/CartContext';
import { activeRestaurant, coupons, addresses, paymentMethods, type Coupon } from '@/lib/mockData';
import EmptyState from '@/components/ui/EmptyState';
import Toast from '@/components/ui/Toast';
import CartLines from '@/app/cart-and-checkout/components/CartLines';
import CouponBox from '@/app/cart-and-checkout/components/CouponBox';
import AddressPicker from '@/app/cart-and-checkout/components/AddressPicker';
import PaymentPicker from '@/app/cart-and-checkout/components/PaymentPicker';
import OrderSummary from '@/app/cart-and-checkout/components/OrderSummary';
import OrderPlaced from '@/app/cart-and-checkout/components/OrderPlaced';

const TAX_RATE = 0.16;
const SERVICE_FEE = 35;

export default function CheckoutFlow() {
  const { lines, restaurant, subtotal, clearCart, itemCount } = useCart();
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [addressId, setAddressId] = useState(addresses[0].id);
  const [paymentId, setPaymentId] = useState(paymentMethods[0].id);
  const [placing, setPlacing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<{ ref: string; total: number; payment: string; address: string } | null>(null);
  const [toast, setToast] = useState<{ message: string; tone: 'success' | 'warning' } | null>(null);
  // Guard against duplicate submissions even if the button is hit twice in the same tick.
  const submitLock = useRef(false);

  const selectedAddress = addresses.find((a) => a.id === addressId) ?? addresses[0];
  const selectedPayment = paymentMethods.find((p) => p.id === paymentId) ?? paymentMethods[0];

  const totals = useMemo(() => {
    let discount = 0;
    if (appliedCoupon && subtotal >= appliedCoupon.minSpend) {
      discount =
        appliedCoupon.kind === 'fixed'
          ? appliedCoupon.value
          : Math.min(Math.round((subtotal * appliedCoupon.value) / 100), appliedCoupon.maxDiscount ?? Infinity);
    }
    discount = Math.min(discount, subtotal);
    const delivery = activeRestaurant.deliveryFee;
    const taxable = subtotal - discount;
    const tax = Math.round(taxable * TAX_RATE);
    const total = Math.max(0, taxable + delivery + tax + SERVICE_FEE);
    return { discount, delivery, tax, serviceFee: SERVICE_FEE, total };
  }, [appliedCoupon, subtotal]);

  const belowMinimum = subtotal < activeRestaurant.minOrder;
  const outOfZone = !activeRestaurant.zones.some((z) => selectedAddress.area.startsWith(z));
  const canPlace = lines.length > 0 && !belowMinimum && !outOfZone && selectedPayment.available && !placing;

  const handlePlaceOrder = () => {
    if (submitLock.current || !canPlace) return;
    submitLock.current = true;
    setPlacing(true);
    // Backend integration: POST /orders with an idempotency key; the server recalculates
    // prices, offers, stock and delivery coverage before accepting the order.
    setTimeout(() => {
      const ref = `DB-${Date.now().toString().slice(-6)}`;
      setPlacedOrder({
        ref,
        total: totals.total,
        payment: selectedPayment.label,
        address: `${selectedAddress.line}, ${selectedAddress.area}`,
      });
      clearCart();
      setPlacing(false);
      submitLock.current = false;
    }, 1400);
  };

  if (placedOrder) {
    return (
      <OrderPlaced
        reference={placedOrder.ref}
        total={placedOrder.total}
        paymentLabel={placedOrder.payment}
        address={placedOrder.address}
        restaurantName={activeRestaurant.name}
        etaMin={activeRestaurant.etaMin}
        etaMax={activeRestaurant.etaMax}
      />
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-10">
        <EmptyState
          icon={<ShoppingBag size={26} />}
          title="Your cart is empty"
          description="Pick a dish from a restaurant menu and it will show up here with its exact price, discount and delivery fee."
          actionLabel="Browse restaurants"
          actionHref="/"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            href="/restaurant-menu"
            className="mb-2 inline-flex items-center gap-1 text-xs font-bold text-muted-foreground transition-colors hover:text-primary"
          >
            <ChevronLeft size={14} />
            Back to menu
          </Link>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Checkout</h1>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Utensils size={14} className="text-primary" />
            <span className="tabular">{itemCount}</span> items from <span className="font-bold text-foreground">{restaurant?.name}</span>
          </p>
        </div>
        <p className="rounded-full bg-accent/10 px-4 py-2 text-xs font-bold text-accent">
          Prices are re-checked by the server when you place the order
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px]">
        <div className="min-w-0 space-y-6">
          <CartLines />
          <AddressPicker
            selectedId={addressId}
            onSelect={setAddressId}
            outOfZone={outOfZone}
            restaurantName={activeRestaurant.name}
            zones={activeRestaurant.zones}
          />
          <PaymentPicker selectedId={paymentId} onSelect={setPaymentId} />
          <CouponBox
            coupons={coupons}
            subtotal={subtotal}
            applied={appliedCoupon}
            onApply={(c) => {
              setAppliedCoupon(c);
              setToast({ message: `Coupon ${c.code} applied`, tone: 'success' });
            }}
            onRemove={() => setAppliedCoupon(null)}
          />
        </div>

        <OrderSummary
          subtotal={subtotal}
          discount={totals.discount}
          delivery={totals.delivery}
          tax={totals.tax}
          serviceFee={totals.serviceFee}
          total={totals.total}
          couponCode={appliedCoupon?.code ?? null}
          minOrder={activeRestaurant.minOrder}
          belowMinimum={belowMinimum}
          outOfZone={outOfZone}
          paymentUnavailable={!selectedPayment.available}
          paymentLabel={selectedPayment.label}
          placing={placing}
          canPlace={canPlace}
          onPlace={handlePlaceOrder}
        />
      </div>

      <Toast message={toast?.message ?? null} tone={toast?.tone} onDismiss={() => setToast(null)} />
    </div>
  );
}