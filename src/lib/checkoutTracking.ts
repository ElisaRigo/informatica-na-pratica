const CHECKOUT_URL =
  "https://pay.hotmart.com/L103057645P?bid=1751676498498&paymentMethod=credit_card";

const PIXEL_FLUSH_MS = 400;

const createEventId = () =>
  crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const openHotmartCheckout = (url: string = CHECKOUT_URL) => {
  const newTab = window.open("about:blank", "_blank");
  const eventID = createEventId();

  try {
    if ((window as any).gtag) {
      (window as any).gtag("event", "begin_checkout", {
        currency: "BRL",
        value: 297,
        transaction_id: eventID,
        items: [
          {
            item_id: "curso-informatica",
            item_name: "Curso Informática na Prática",
            price: 297,
            quantity: 1,
          },
        ],
      });
    }
  } catch (error) {
    console.warn("[tracking] gtag failed", error);
  }

  try {
    if ((window as any).fbq) {
      (window as any).fbq(
        "track",
        "InitiateCheckout",
        {
          value: 297,
          currency: "BRL",
          content_name: "Curso Informática na Prática",
          content_category: "curso-online",
          content_type: "product",
          content_ids: ["curso-informatica"],
          num_items: 1,
        },
        { eventID },
      );
    }
  } catch (error) {
    console.warn("[tracking] fbq failed", error);
  }

  const goToCheckout = () => {
    if (newTab && !newTab.closed) {
      newTab.location.href = url;
      return;
    }

    window.location.href = url;
  };

  window.setTimeout(goToCheckout, PIXEL_FLUSH_MS);
};