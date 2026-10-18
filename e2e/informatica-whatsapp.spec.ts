import { test, expect } from "../playwright-fixture";

test("WhatsApp is available before scrolling and remains available at the end", async ({ page }) => {
  await page.goto("http://localhost:8080/informatica");
  const contact = page.getByRole("link", { name: "Tire suas dúvidas no WhatsApp", exact: true });
  await expect(contact).toBeVisible();
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(contact).toBeInViewport();
});