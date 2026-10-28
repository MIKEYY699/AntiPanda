import React from 'react';
import AppLayout from '@/components/AppLayout';
import RestaurantHeader from '@/app/restaurant-menu/components/RestaurantHeader';
import OffersRow from '@/app/restaurant-menu/components/OffersRow';
import MenuBoard from '@/app/restaurant-menu/components/MenuBoard';

export default function RestaurantMenuPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <RestaurantHeader />
        <OffersRow />
        <MenuBoard />
      </div>
    </AppLayout>
  );
}