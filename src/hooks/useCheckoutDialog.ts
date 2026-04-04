import { useState } from 'react';

let openCheckoutCallback: (() => void) | null = null;

export const useCheckoutDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Register the callback when component mounts
  if (!openCheckoutCallback) {
    openCheckoutCallback = () => setIsOpen(true);
  }

  return {
    isOpen,
    openCheckout: () => setIsOpen(true),
    closeCheckout: () => setIsOpen(false),
  };
};

// Global function to open checkout from anywhere
export const openCheckout = () => {
  if (openCheckoutCallback) {
    openCheckoutCallback();
  }
};
