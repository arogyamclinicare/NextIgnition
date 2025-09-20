'use client';

import { useEffect } from 'react';

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Add keyboard navigation support
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip to main content
      if (
        event.key === 'Tab' &&
        event.shiftKey &&
        event.target === document.body
      ) {
        const skipLink = document.getElementById('skip-to-main');
        if (skipLink) {
          skipLink.focus();
        }
      }

      // Close modals with Escape
      if (event.key === 'Escape') {
        const modals = document.querySelectorAll('[role="dialog"]');
        modals.forEach(modal => {
          const closeButton = modal.querySelector(
            '[aria-label*="close"], [aria-label*="Close"]'
          );
          if (closeButton && document.activeElement === modal) {
            (closeButton as HTMLElement).click();
          }
        });
      }
    };

    // Add focus management
    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement;

      // Add focus indicators
      if (target.matches('button, a, input, textarea, select, [tabindex]')) {
        target.classList.add('focus-visible');
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      const target = event.target as HTMLElement;
      target.classList.remove('focus-visible');
    };

    // Add ARIA live region for announcements
    const addLiveRegion = () => {
      const existingLiveRegion = document.getElementById('aria-live-region');
      if (!existingLiveRegion) {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'aria-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
      }
    };

    // Announce page changes
    const announcePageChange = (message: string) => {
      const liveRegion = document.getElementById('aria-live-region');
      if (liveRegion) {
        liveRegion.textContent = message;
      }
    };

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    // Initialize accessibility features
    addLiveRegion();

    // Add skip link if it doesn't exist
    const skipLink = document.getElementById('skip-to-main');
    if (!skipLink) {
      const link = document.createElement('a');
      link.id = 'skip-to-main';
      link.href = '#main-content';
      link.textContent = 'Skip to main content';
      link.className =
        'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50';
      document.body.insertBefore(link, document.body.firstChild);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  return <>{children}</>;
}

// Utility function to announce messages to screen readers
export function announceToScreenReader(message: string) {
  const liveRegion = document.getElementById('aria-live-region');
  if (liveRegion) {
    liveRegion.textContent = message;
  }
}

// Utility function to manage focus
export function manageFocus(element: HTMLElement | null) {
  if (element) {
    element.focus();
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}
