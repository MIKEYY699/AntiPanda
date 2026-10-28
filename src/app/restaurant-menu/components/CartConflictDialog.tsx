'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import Modal from '@/components/ui/Modal';

interface CartConflictDialogProps {
  open: boolean;
  currentRestaurant: string;
  nextRestaurant: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function CartConflictDialog({
  open,
  currentRestaurant,
  nextRestaurant,
  onCancel,
  onConfirm,
}: CartConflictDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title="Start a new cart?"
      maxWidthClass="max-w-md"
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-bold transition-all duration-150 hover:bg-muted active:scale-95"
          >
            Keep current cart
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-all duration-150 hover:opacity-90 active:scale-95"
          >
            Replace with {nextRestaurant}
          </button>
        </div>
      }
    >
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-warning/25">
          <ShoppingBag size={20} />
        </span>
        <div className="space-y-2 text-sm">
          <p>
            Your cart already has items from <span className="font-bold">{currentRestaurant}</span>. Each order can only come
            from one restaurant, because that restaurant prepares and delivers it.
          </p>
          <p className="text-muted-foreground">
            Replacing the cart will remove the existing items and start a new order from {nextRestaurant}.
          </p>
        </div>
      </div>
    </Modal>
  );
}