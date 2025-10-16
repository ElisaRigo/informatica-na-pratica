import { createContext, useContext, useState, ReactNode } from "react";

interface CheckoutContextType {
  showCheckout: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  const openCheckout = () => setShowCheckout(true);
  const closeCheckout = () => setShowCheckout(false);

  return (
    <CheckoutContext.Provider value={{ showCheckout, openCheckout, closeCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }
  return context;
};
