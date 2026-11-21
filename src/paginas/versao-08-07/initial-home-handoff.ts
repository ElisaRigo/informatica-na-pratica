/** Only the mounted home may replace the early HTML, not App's lazy-route fallback. */
export function finishInitialHome() {
  const initialHome = document.getElementById("initial-home");
  if (!initialHome || !document.documentElement.hasAttribute("data-initial-home")) return;

  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const videoRequested = document.documentElement.dataset.initialVideoRequested === "true";
  const checkoutRequested = document.documentElement.dataset.initialCheckoutRequested === "true";
  document.documentElement.removeAttribute("data-initial-home");
  document.documentElement.removeAttribute("data-initial-video-requested");
  document.documentElement.removeAttribute("data-initial-checkout-requested");
  initialHome.remove();
  // Removing the early HTML and revealing the full page happen before the next paint.
  window.scrollTo({ left: scrollX, top: scrollY, behavior: "instant" });
  if (videoRequested) {
    document.querySelector<HTMLElement>("[data-home-video-trigger]")?.click();
  }
  if (checkoutRequested) {
    document.querySelector<HTMLElement>("[data-home-checkout-trigger]")?.click();
  }
}