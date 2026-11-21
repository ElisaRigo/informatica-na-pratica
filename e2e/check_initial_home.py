"""Regression checks for the early HTML-to-application handoff."""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright


async def main():
    screenshots = Path('/tmp/browser/initial-home')
    screenshots.mkdir(parents=True, exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        for width, height in [(320, 813), (393, 813), (1280, 1800)]:
            page = await browser.new_page(viewport={'width': width, 'height': height})
            errors = []
            page.on('pageerror', lambda error: errors.append(str(error)))
            gate = asyncio.Event()

            async def delay(route):
                await gate.wait()
                await route.continue_()

            await page.route('**/src/main.tsx', delay)
            await page.goto('http://localhost:8080/', wait_until='commit')
            await page.locator('#initial-home').wait_for(state='visible')
            await page.evaluate('document.fonts.ready')
            # The page can scroll before the application arrives and must keep that position.
            await page.evaluate('window.scrollTo(0, 70)')
            scroll_before = await page.evaluate('window.scrollY')
            if width < 768:
                assert scroll_before > 0
            await page.screenshot(path=str(screenshots / f'verified-early-{width}.png'))
            # A visitor's early video click must survive the application handoff.
            await page.locator('#initial-home .initial-video').dispatch_event('click')
            gate.set()
            await page.locator('#root .versao0807-header').wait_for(state='visible')
            assert await page.evaluate('window.scrollY') == scroll_before
            await page.locator('#root .versao0807-hero iframe').wait_for()
            assert await page.locator('#initial-home').count() == 0
            assert not errors, errors
            await page.screenshot(path=str(screenshots / f'verified-ready-{width}.png'))
            print(f'{width}: early video click and scroll preserved; no runtime errors')
            await page.close()

        page = await browser.new_page(viewport={'width': 1280, 'height': 1800})
        await page.goto('http://localhost:8080/home-anterior')
        assert await page.evaluate("!document.documentElement.hasAttribute('data-initial-home')")
        assert not await page.locator('#initial-home').is_visible()
        print('Historical page: early home not displayed')
        await browser.close()


asyncio.run(main())