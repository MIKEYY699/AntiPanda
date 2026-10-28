import React from 'react';
import AppLayout from '@/components/AppLayout';
import AddressSearchBar from '@/app/components/AddressSearchBar';
import DealsBento from '@/app/components/DealsBento';
import DiscoveryBoard from '@/app/components/DiscoveryBoard';
import PopularDishes from '@/app/components/PopularDishes';
import RecentlyViewedStrip from '@/app/components/RecentlyViewedStrip';

export default function HomeScreenPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <AddressSearchBar />
        <DealsBento />
        <DiscoveryBoard />
        <PopularDishes />
        <RecentlyViewedStrip />
      </div>
    </AppLayout>
  );
}