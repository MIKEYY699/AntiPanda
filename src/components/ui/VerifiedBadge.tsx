import React from 'react';
import { BadgeCheck } from 'lucide-react';

interface VerifiedBadgeProps {
  showLabel?: boolean;
  size?: number;
}

export default function VerifiedBadge({ showLabel = false, size = 16 }: VerifiedBadgeProps) {
  return (
    <span
      className="inline-flex items-center gap-1 text-accent"
      title="Verified by DirectBite — identity and business documents checked"
    >
      <BadgeCheck size={size} className="shrink-0" aria-hidden="true" />
      {showLabel && <span className="text-xs font-semibold">Verified</span>}
      <span className="sr-only">Verified restaurant</span>
    </span>
  );
}