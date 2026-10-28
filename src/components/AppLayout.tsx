import React from 'react';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Topbar />
      <main className="mx-auto w-full max-w-screen-2xl flex-1 px-4 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-6 md:px-6 md:pb-12 xl:px-10 2xl:px-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}