import { useEffect } from 'react';

const HOTMART_CHECKOUT_URL = 'https://pay.hotmart.com/L103057645P?checkoutMode=2';

export const useHotmart = () => {
  useEffect(() => {
    // Load Hotmart widget script
    const script = document.createElement('script');
    script.src = 'https://static.hotmart.com/checkout/widget.min.js';
    script.async = true;
    document.head.appendChild(script);

    // Load Hotmart styles
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://static.hotmart.com/css/hotmart-fb.min.css';
    document.head.appendChild(link);

    return () => {
      // Cleanup if needed
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, []);
};

export const openHotmartCheckout = () => {
  // The Hotmart widget handles the modal checkout
  window.open(HOTMART_CHECKOUT_URL, '_blank');
};

// Make it globally accessible
if (typeof window !== 'undefined') {
  (window as any).openCheckout = openHotmartCheckout;
}
