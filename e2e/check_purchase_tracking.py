"""Run with python3 e2e/check_purchase_tracking.py. No events reach providers."""
import asyncio
import json
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[1]

async def main():
    # Production-only effects must also be absent from historical copies.
    for source in [ROOT / 'src/pages/ThankYou.tsx', *ROOT.glob('src/versoes/*/pages/ThankYou.tsx')]:
        text = source.read_text()
        assert "'purchase'" not in text and "'Purchase'" not in text, source
        assert "'conversion'" not in text, source

    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        context = await browser.new_context(viewport={'width': 393, 'height': 851})
        async def block_tracking(route):
            if any(host in route.request.url for host in ['googletagmanager.com', 'google-analytics.com', 'facebook.net', 'facebook.com/tr']):
                await route.abort()
            else:
                await route.continue_()
        await context.route('**/*', block_tracking)
        page = await context.new_page()
        screenshots = Path('/tmp/browser/purchase-audit/screenshots')
        screenshots.mkdir(parents=True, exist_ok=True)
        for path in ['/', '/informatica']:
            await page.goto('http://localhost:8080' + path)
            await page.wait_for_timeout(3000)
            await page.evaluate('''() => {
                window.auditEvents = [];
                window.gtag = (...args) => window.auditEvents.push(args);
                window.fbq = (...args) => window.auditEvents.push(args);
            }''')
            assert await page.evaluate('window.auditEvents.length') == 0
            button = page.get_by_role('button', name='Quero começar agora!', exact=True).last
            await button.scroll_into_view_if_needed()
            async with context.expect_page() as popup:
                await button.click()
            checkout = await popup.value
            await checkout.wait_for_url('https://pay.hotmart.com/**', wait_until='commit')
            events = await page.evaluate('window.auditEvents')
            ga4 = [event for event in events if event[:2] == ['event', 'begin_checkout']]
            meta = [event for event in events if event[:2] == ['track', 'InitiateCheckout']]
            assert len(ga4) == 1 and len(meta) == 1, events
            assert ga4[0][2]['value'] == 297 and ga4[0][2]['currency'] == 'BRL'
            assert not any(event[1] in ['purchase', 'Purchase', 'conversion'] for event in events), events
            await page.screenshot(path=str(screenshots / ('home.png' if path == '/' else 'informatica.png')))
            print(json.dumps({'page': path, 'checkout_opens': True, 'events': [event[1] for event in events], 'false_purchases': 0}))
            await checkout.close()
        for path in ['/obrigados', '/obrigada']:
            for reload in [False, True]:
                if reload:
                    await page.reload()
                else:
                    await page.goto('http://localhost:8080' + path)
                await page.wait_for_timeout(5500)
                events = await page.evaluate('Array.from(window.dataLayer || [], x => Array.from(x)).filter(x => x[0] === "event")')
                assert not any(event[1] in ['purchase', 'Purchase', 'conversion'] for event in events), events
                assert page.url.endswith('/obrigados'), page.url
            print(json.dumps({'page': path, 'visit_and_reload_false_purchases': 0}))
        await browser.close()

asyncio.run(main())