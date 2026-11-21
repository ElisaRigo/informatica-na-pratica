# Project architecture
- Keep `/home-copia-2` and `/home-copia-3` on their own independent copied sales modules so future edits never change the current home or earlier backups.
- Keep the programs row in /informa local to that page so copying its presentation never links edits to /icone-2 or /info.
- Keep `/`, `/informa`, `/informatica`, and `/prof-elisa` on independent copied presentations from `/home-copia-3` (light theme), with distinct page-root stylesheet scopes, so future edits never alter sibling or historical pages.
- Keep experimental sales pages in independently routed page modules so comparing a new funnel never changes existing or historical pages.
- Keep the independence sales experience and its outcome selector in its own page folder, with theme tokens scoped to the page root, so interaction and design changes remain isolated.
- Keep /informa3 in its own copied page modules and scope its stylesheet to its page root so future edits do not affect earlier copies.
- Pass the opt-in `remarketingTop` presentation variant from /info (page file HomeAnterior2.tsx); shared historical pages keep the default top layout to prevent cross-page visual changes.
- Use existing Hotmart tracking helpers for purchase actions so checkout events remain consistent across sales variants.
- Scope experimental page theme tokens to its root class so design exploration does not change other pages.
- Keep highlighted-text contrast scoped by surface tone: dark sections must resolve `--primary` to a lighter value than light surfaces (via a CSS layer that unlayered theme scopes can still override), so highlight text stays readable on dark without washing out solid blue fills that carry white text.
- Keep page hero/cover images as local files under `public/images/` rather than CDN asset pointers, so they render in the sandbox preview and on the live site.- Keep /info and /informa on their own copied modules under `src/paginas/<page>/`, so edits to one page never change the other or the historical v2909 pages.

- Never emit purchase or sales conversions from a thank-you page visit; only the payment provider or a verified paid transaction may confirm a sale, preventing false purchases and reload duplicates.
- Pass page-specific headlines into the shared historical sales module as opt-in content, keeping edits isolated from sibling pages.
- Pass page-specific header logos as opt-in props to the shared historical sales module so sibling headers stay unchanged.
- Keep /informatica on its own copied module under `src/paginas/informatica/`, with the previous informatica page preserved at /informatica-copia, so edits never change the home (/) or historical pages.

- Keep `/versao-07-07` on its own copied presentation from the v0607 archive, not the repurposed `/versao-06-07` route, so historical restoration does not change existing pages.
- Keep `/versao-28-10` on its own copied presentation from the home snapshot at the end of October 28, 2026, so edits to the restoration never change the home or other archive routes.
- Keep `/versao-08-07` on its own copied presentation from the 07/07 page (no changes were saved between 07/07 and 25/07, so the 08/07 state is identical), so edits to the restoration never change sibling archive routes.
- Keep `/versao-17-07` on its own copied presentation and supporting presentation components from the July archive (no saves between July 6 and July 26), so edits never alter the home or sibling archives.
- Keep `/versao-17-06` on its own full snapshot under `src/versoes/v1706/` (last saved state before 17/06/2026, commit 52d9d8e6 of 15/06), with imports rewritten to the snapshot, so edits never change sibling archive routes.
