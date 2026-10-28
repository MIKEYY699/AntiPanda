import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '../styles/tailwind.css';
import { CartProvider } from '@/components/CartContext';
import NativeShell from '@/components/NativeShell';

const isMobileBuild = process.env.BUILD_TARGET === 'mobile';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Lay out edge-to-edge under notches / home indicators; components pad with env(safe-area-inset-*).
  viewportFit: 'cover',
  themeColor: '#FAF7F2',
  ...(isMobileBuild && { maximumScale: 1, userScalable: false }),
};

export const metadata: Metadata = {
  title: 'DirectBite — Order Straight From Local Restaurants',
  description:
    'DirectBite connects Lahore diners with verified restaurants that prepare and deliver every order themselves — no middleman fleet.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className={plusJakartaSans.className}>
        <CartProvider>{children}</CartProvider>
        <NativeShell />

        {/* Rocket builder preview/analytics scripts are web-only; keep them out of the native apps. */}
        {!isMobileBuild && (
          <>
            <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fdirectbite2270back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.21" />
            <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.3" />
          </>
        )}
      </body>
    </html>
  );
}