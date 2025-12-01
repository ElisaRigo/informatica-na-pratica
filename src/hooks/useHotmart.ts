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

    // Create hidden anchor for Hotmart widget
    const anchor = document.createElement('a');
    anchor.id = 'hotmart-checkout-anchor';
    anchor.href = HOTMART_CHECKOUT_URL;
    anchor.className = 'hotmart-fb hotmart__button-checkout';
    anchor.style.display = 'none';
    anchor.onclick = () => false;
    document.body.appendChild(anchor);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
      if (link.parentNode) link.parentNode.removeChild(link);
      if (anchor.parentNode) anchor.parentNode.removeChild(anchor);
    };
  }, []);
};

export const openHotmartCheckout = () => {
  const anchor = document.getElementById('hotmart-checkout-anchor');
  if (anchor) {
    anchor.click();
  }
};

// Make it globally accessible
if (typeof window !== 'undefined') {
  (window as any).openCheckout = openHotmartCheckout;
}
