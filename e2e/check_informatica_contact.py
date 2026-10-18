import asyncio, json
from playwright.async_api import async_playwright

async def main():
 async with async_playwright() as p:
  browser = await p.chromium.launch(headless=True)
  for width,height in [(393,813),(1280,1800)]:
   page = await browser.new_page(viewport={"width":width,"height":height})
   errors=[]
   page.on('pageerror', lambda e: errors.append(str(e)))
   await page.goto('http://localhost:8080/informatica')
   button=page.get_by_role('link',name='Tire suas dúvidas no WhatsApp',exact=True)
   await button.wait_for(state='visible')
   assert await page.evaluate('window.scrollY') == 0
   href=await button.get_attribute('href')
   assert 'phone=5545988287082' in href
   from urllib.parse import urlparse,parse_qs
   assert parse_qs(urlparse(href).query)['text'][0]=='Olá, professora Elisa! Vi no site as informações do curso, mas ainda tenho dúvidas. Pode me ajudar?'
   await page.screenshot(path=f'/tmp/browser/whats-always/top-{width}.png')
   section=page.locator('section[aria-labelledby="prazo-aprendizagem"]')
   await section.scroll_into_view_if_needed()
   assert await button.is_visible()
   await section.screenshot(path=f'/tmp/browser/whats-always/end-{width}.png')
   assert await page.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
   print(json.dumps({'width':width,'button_visible_top_and_end':True,'message_matches_home':True,'errors':errors}))
   await page.close()
  await browser.close()
asyncio.run(main())
