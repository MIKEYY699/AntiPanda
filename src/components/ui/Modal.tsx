'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidthClass?: string;
}

export default function Modal({ open, onClose, title, children, footer, maxWidthClass = 'max-w-lg' }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        aria-label="Close dialog"
        className="fade-in absolute inset-0 bg-foreground/50"
        onClick={onClose}
      />
      <div
        className={`modal-in relative flex max-h-[calc(92vh-env(safe-area-inset-top))] w-full flex-col overflow-hidden rounded-t-2xl pb-[env(safe-area-inset-bottom)] sm:pb-0 bg-card text-card-foreground shadow-2xl sm:rounded-2xl ${maxWidthClass}`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
        {footer && <div className="border-t border-border bg-card px-5 py-4">{footer}</div>}
      </div>
    </div>
  );
}