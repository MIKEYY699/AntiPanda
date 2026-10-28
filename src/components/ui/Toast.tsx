'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  tone?: 'success' | 'warning';
  onDismiss: () => void;
}

export default function Toast({ message, tone = 'success', onDismiss }: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;

  const isSuccess = tone === 'success';

  return (
    <div className="pointer-events-none fixed bottom-[calc(6rem+env(safe-area-inset-bottom))] right-4 z-[60] md:bottom-6" aria-live="polite">
      <div
        className={`toast-in pointer-events-auto flex items-center gap-3 rounded-xl border bg-card px-4 py-3 text-sm font-semibold text-card-foreground shadow-lg ${
          isSuccess ? 'border-success/40' : 'border-warning'
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 size={18} className="text-success" />
        ) : (
          <AlertTriangle size={18} className="text-warning" />
        )}
        <span>{message}</span>
        <button
          type="button"
          onClick={onDismiss}
          className="rounded-full p-0.5 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Dismiss notification"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}