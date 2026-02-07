import { useState } from 'react';

let openCheckoutCallback: (() => void) | null = null;

// Função para disparar evento begin_checkout no GA4
const trackBeginCheckout = () => {
  const isProduction = window.location.hostname === 'informaticanapratica.com.br' || 
                       window.location.hostname === 'www.informaticanapratica.com.br';
  
  if (!isProduction) {
    console.log('GA4 begin_checkout skipped - not on production domain');
    return;
  }

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'begin_checkout', {
      currency: 'BRL',
      value: 297.00,
      items: [{
        item_id: 'curso-informatica',
        item_name: 'Curso Informática na Prática',
        price: 297.00,
        quantity: 1
      }]
    });
    console.log('✅ GA4 begin_checkout tracked');
  }
};

export const useCheckoutDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenCheckout = () => {
    setIsOpen(true);
    trackBeginCheckout();
  };

  // Register the callback when component mounts
  if (!openCheckoutCallback) {
    openCheckoutCallback = handleOpenCheckout;
  }

  return {
    isOpen,
    openCheckout: handleOpenCheckout,
    closeCheckout: () => setIsOpen(false),
  };
};

// Global function to open checkout from anywhere
export const openCheckout = () => {
  if (openCheckoutCallback) {
    openCheckoutCallback();
  }
};
