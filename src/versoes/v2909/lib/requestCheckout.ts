import { openHotmartCheckout } from "./checkoutTracking";

export const CHECKOUT_MODAL_EVENT = "open-course-checkout";

// O modal de checkout foi removido: todo CTA vai direto para o pagamento.
export const requestCheckout = () => {
  openHotmartCheckout();
};
