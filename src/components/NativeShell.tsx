'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Capacitor } from '@capacitor/core';

/**
 * Wires up native-only behaviour when the app runs inside the Capacitor
 * Android / iOS shell. Renders nothing and is a no-op in a normal browser.
 */
export default function NativeShell() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    document.documentElement.classList.add('native-app', `platform-${Capacitor.getPlatform()}`);

    let cancelled = false;

    (async () => {
      const [{ StatusBar, Style }, { SplashScreen }, { Keyboard }] = await Promise.all([
        import('@capacitor/status-bar'),
        import('@capacitor/splash-screen'),
        import('@capacitor/keyboard'),
      ]);
      if (cancelled) return;

      StatusBar.setStyle({ style: Style.Light }).catch(() => {});
      SplashScreen.hide().catch(() => {});

      if (Capacitor.getPlatform() === 'ios') {
        // Show the iOS "Done" bar above the keyboard for the address / instructions inputs.
        Keyboard.setAccessoryBarVisible({ isVisible: true }).catch(() => {});
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Android hardware back button: go back in history, or close the app from the home screen.
  useEffect(() => {
    if (Capacitor.getPlatform() !== 'android') return;

    let handle: { remove: () => Promise<void> } | undefined;
    let cancelled = false;

    import('@capacitor/app').then(({ App }) =>
      App.addListener('backButton', ({ canGoBack }) => {
        // Let an open dialog consume the back press first (Modal listens for Escape).
        const dialog = document.querySelector('[role="dialog"]');
        if (dialog) {
          document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
          return;
        }
        if (pathname !== '/' && canGoBack) {
          router.back();
        } else if (pathname !== '/') {
          router.replace('/');
        } else {
          App.exitApp();
        }
      }).then((h) => {
        if (cancelled) h.remove();
        else handle = h;
      })
    );

    return () => {
      cancelled = true;
      handle?.remove();
    };
  }, [pathname, router]);

  return null;
}
