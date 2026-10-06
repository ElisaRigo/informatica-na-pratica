import { useState, useCallback, useEffect } from "react";

const trackBeginCheckout = () => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "begin_checkout", {
      currency: "BRL",
      value: 297.0,
      items: [{
        item_id: "curso-informatica",
        item_name: "Curso Informática na Prática",
        price: 297.0,
        quantity: 1,
      }],
    });
  }
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "InitiateCheckout", {
      value: 297.0,
      currency: "BRL",
      content_name: "Curso Informática na Prática",
      content_ids: ["curso-informatica"],
      num_items: 1,
    });
  }
};

export const useLeadCaptureDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback(() => {
    setIsOpen(true);
    trackBeginCheckout();
  }, []);

  // Expõe window.openCheckout para todos os CTAs da página
  useEffect(() => {
    (window as any).openCheckout = openDialog;
    return () => {
      delete (window as any).openCheckout;
    };
  }, [openDialog]);

  return {
    isOpen,
    openDialog,
    closeDialog: () => setIsOpen(false),
  };
};
