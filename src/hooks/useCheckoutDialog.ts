import { useState, useCallback, useEffect } from 'react';

let openCheckoutCallback: (() => void) | null = null;

// Função para disparar evento begin_checkout no GA4
const trackBeginCheckout = () => {
  console.log('🔵 begin_checkout triggered');
  
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

  // Meta Pixel InitiateCheckout
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'InitiateCheckout', {
      value: 297.00,
      currency: 'BRL',
      content_name: 'Curso Informática na Prática',
      content_ids: ['curso-informatica'],
      num_items: 1
    });
    console.log('✅ Meta Pixel InitiateCheckout tracked');
  }
};

export const useCheckoutDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenCheckout = useCallback(() => {
    setIsOpen(true);
    trackBeginCheckout();
  }, []);

  // Always keep the callback updated
  useEffect(() => {
    openCheckoutCallback = handleOpenCheckout;
    return () => {
      openCheckoutCallback = null;
    };
  }, [handleOpenCheckout]);

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
