'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { ReactNode } from 'react';

export type TextShimmerProps = {
  children: ReactNode;
  className?: string;
  duration?: number;
};

export function TextShimmer({ 
  children, 
  className, 
  duration = 1.5 
}: TextShimmerProps) {
  return (
    <motion.span
      className={cn(
        'inline-block bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-[length:200%_100%] bg-clip-text text-transparent',
        'animate-shimmer',
        className
      )}
      style={{
        '--base-color': 'rgb(17 24 39)',
        '--base-gradient-color': 'rgb(75 85 99)',
        animationDuration: `${duration}s`,
      } as React.CSSProperties}
    >
      {children}
    </motion.span>
  );
}
