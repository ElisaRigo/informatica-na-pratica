import asyncio, json
from playwright.async_api import async_playwright

HOTMART = 'pay.hotmart.com/L103057645P'

async def main():
 async with async_playwright() as p:
  browser = await p.chromium.launch(headless=True)
  for width,height in [(393,813),(1280,1800)]:
   context = await browser.new_context(viewport={"width":width,"height":height})
   page = await context.new_page()
   errors=[]
   page.on('pageerror', lambda e: errors.append(str(e)))
   await page.goto('http://localhost:8080/aprender')
   await page.wait_for_timeout(3000)
   # Nenhum formulário/modal de checkout na página
   assert await page.locator('[role="dialog"]').count() == 0
   button = page.locator('button:has-text("SIM, QUERO COMEÇAR AGORA")').first
   await button.scroll_into_view_if_needed()
   async with context.expect_page() as new_page_info:
    await button.click()
   checkout = await new_page_info.value
   await checkout.wait_for_timeout(2000)
   assert HOTMART in checkout.url, checkout.url
   assert await page.locator('[role="dialog"]').count() == 0
   await checkout.screenshot(path=f'/tmp/browser/aprender-checkout/hotmart-{width}.png')
   print(json.dumps({'width':width,'opens_hotmart_directly':True,'no_checkout_modal':True,'errors':errors}))
   await page.close()
  await browser.close()
asyncio.run(main())
