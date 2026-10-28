import React from 'react';
import AppLayout from '@/components/AppLayout';
import CheckoutFlow from '@/app/cart-and-checkout/components/CheckoutFlow';

export default function CartAndCheckoutPage() {
  return (
    <AppLayout>
      <CheckoutFlow />
    </AppLayout>
  );
}