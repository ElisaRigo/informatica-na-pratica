// Helper único para abrir o checkout da Hotmart garantindo que
// os pixels (Meta + GA4) tenham tempo de enviar os eventos antes
// da troca de aba. Resolve o problema de InitiateCheckout faltando
// no Meta quando o navegador mata a request ao abrir _blank.

const CHECKOUT_URL =
  "https://pay.hotmart.com/L103057645P?bid=1751676498498&paymentMethod=credit_card";

const PIXEL_FLUSH_MS = 400; // tempo seguro para fbq enviar via XHR

const uuid = () =>
  (crypto as any)?.randomUUID?.() ??
  `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const openHotmartCheckout = (url: string = CHECKOUT_URL) => {
  // 1) Abrir a aba SINCRONAMENTE no clique (evita popup-blocker)
  const newTab = window.open("about:blank", "_blank");

  const eventID = uuid();

  // 2) Disparar GA4
  try {
    if ((window as any).gtag) {
      (window as any).gtag("event", "begin_checkout", {
        currency: "BRL",
        value: 297.0,
        transaction_id: eventID,
        items: [
          {
            item_id: "curso-informatica",
            item_name: "Curso Informática na Prática",
            price: 297.0,
            quantity: 1,
          },
        ],
      });
    }
  } catch (e) {
    console.warn("[tracking] gtag failed", e);
  }

  // 3) Disparar Meta Pixel com eventID (para futura dedup com CAPI)
  try {
    if ((window as any).fbq) {
      (window as any).fbq(
        "track",
        "InitiateCheckout",
        {
          value: 297.0,
          currency: "BRL",
          content_name: "Curso Informática na Prática",
          content_category: "curso-online",
          content_type: "product",
          content_ids: ["curso-informatica"],
          num_items: 1,
        },
        { eventID }
      );
      console.log("[tracking] Meta InitiateCheckout fired", eventID);
    } else {
      console.warn("[tracking] fbq não carregado ainda");
    }
  } catch (e) {
    console.warn("[tracking] fbq failed", e);
  }

  // 4) Dar tempo do pixel sair antes de navegar a nova aba
  const go = () => {
    if (newTab && !newTab.closed) {
      newTab.location.href = url;
    } else {
      // Bloqueado: navega na mesma aba (não perde a venda)
      window.location.href = url;
    }
  };

  setTimeout(go, PIXEL_FLUSH_MS);
};
