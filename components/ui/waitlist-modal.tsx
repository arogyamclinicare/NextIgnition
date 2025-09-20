'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function WaitlistModal({
  isOpen,
  onClose,
  children,
  title,
  className,
}: WaitlistModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div
          className='fixed inset-0 flex items-center justify-center p-2 sm:p-4 waitlist-modal-overlay'
          style={{
            zIndex: 2147483647,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='absolute inset-0 bg-black/50 backdrop-blur-sm'
            onClick={onClose}
            style={{ zIndex: 2147483646 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={cn(
              'relative w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden',
              'bg-[#fdf9f6] rounded-2xl sm:rounded-2xl shadow-2xl',
              'border border-gray-200',
              'mx-1 sm:mx-4', // Add horizontal margins for mobile
              'my-1 sm:my-4',  // Add vertical margins for mobile
              'min-h-[50vh]' // Ensure minimum height on mobile
            )}
            style={{ zIndex: 2147483647 }}
          >
            {/* Header */}
            {title && (
              <div className='flex items-center justify-between p-4 sm:p-6 border-b border-gray-200'>
                <h2 className='text-lg sm:text-2xl font-bold text-black'>{title}</h2>
                <button
                  onClick={onClose}
                  className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                >
                  <X className='w-5 h-5 text-gray-600' />
                </button>
              </div>
            )}

            {/* Content */}
            <div className='overflow-y-auto max-h-[calc(95vh-80px)] sm:max-h-[calc(90vh-80px)]'>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Add CSS to ensure modal is always on top
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isOpen) {
        const style = document.createElement('style');
        style.textContent = `
          .waitlist-modal-overlay {
            z-index: 2147483647 !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
          }
          
          /* Mobile-specific improvements */
          @media (max-width: 640px) {
            .waitlist-modal-overlay {
              padding: 8px !important;
            }
            
            /* Ensure form inputs are properly sized on mobile */
            .waitlist-modal-overlay input,
            .waitlist-modal-overlay select,
            .waitlist-modal-overlay textarea {
              font-size: 16px !important; /* Prevents zoom on iOS */
              -webkit-appearance: none;
              border-radius: 8px;
            }
            
            /* Ensure button is always visible */
            .waitlist-modal-overlay button[type="submit"] {
              position: sticky !important;
              bottom: 0 !important;
              z-index: 10 !important;
              margin-top: 16px !important;
            }
          }
        `;
        document.head.appendChild(style);

        return () => {
          document.head.removeChild(style);
        };
      }
    }
  }, [isOpen]);

  // Use portal to render modal at document.body level
  if (typeof window !== 'undefined') {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
}
