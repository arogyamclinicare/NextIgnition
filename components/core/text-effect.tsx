'use client';
// @ts-nocheck

import { cn } from '@/lib/utils';
import { motion, AnimatePresence, Transition, Variants } from 'motion/react';
import { useState, useEffect, Children } from 'react';

export type TextEffectProps = {
  children: React.ReactNode;
  className?: string;
  per?: 'char' | 'word';
  delay?: number;
  variants?: Variants;
  preset?: 'blur' | 'fade' | 'slide' | 'scale';
  trigger?: boolean;
};

export function TextEffect({
  children,
  className,
  per = 'char',
  delay = 0,
  variants,
  preset = 'fade',
  trigger = true,
}: TextEffectProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!trigger) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay, trigger]);

  const defaultVariants: Variants = {
    container: {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
        },
      },
    },
    item: {
      hidden: {
        opacity: 0,
        y: 20,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
        },
      },
    },
  };

  const presetVariants: Record<string, Variants> = {
    blur: {
      container: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.05 },
        },
      },
      item: {
        hidden: {
          opacity: 0,
          filter: 'blur(10px)',
          y: 20,
        },
        visible: {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          transition: { duration: 0.4 },
        },
      },
    },
    fade: {
      container: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.05 },
        },
      },
      item: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.3 },
        },
      },
    },
    slide: {
      container: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.05 },
        },
      },
      item: {
        hidden: {
          opacity: 0,
          x: -50,
        },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.3 },
        },
      },
    },
    scale: {
      container: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.05 },
        },
      },
      item: {
        hidden: {
          opacity: 0,
          scale: 0,
        },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.3 },
        },
      },
    },
  };

  const finalVariants = variants || presetVariants[preset] || defaultVariants;

  const text = typeof children === 'string' ? children : '';
  const items = per === 'char' ? text.split('') : text.split(' ');

  return (
    <div className={cn('relative inline-block', className)}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            variants={finalVariants.container}
            initial='hidden'
            animate='visible'
            exit='hidden'
            className='inline-flex flex-wrap'
          >
            {items.map((item, index) => (
              <motion.span
                key={index}
                variants={finalVariants.item}
                className='inline-block'
              >
                {item}
                {per === 'word' && index < items.length - 1 && ' '}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
