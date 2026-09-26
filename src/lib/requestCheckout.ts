export const CHECKOUT_MODAL_EVENT = "open-course-checkout";

export const requestCheckout = () => {
  window.dispatchEvent(new CustomEvent(CHECKOUT_MODAL_EVENT));
};
