# Project architecture
- Route `/` and `/aprender` to the same page module so the current sales content stays identical without changing historical versions.
- Keep experimental sales pages in independently routed page modules so comparing a new funnel never changes existing or historical pages.
- Use existing Hotmart tracking helpers for purchase actions so checkout events remain consistent across sales variants.
- Scope experimental page theme tokens to its root class so design exploration does not change other pages.
- Keep highlighted-text contrast scoped by surface tone: dark sections must resolve `--primary` to a lighter value than light surfaces (via a CSS layer that unlayered theme scopes can still override), so highlight text stays readable on dark without washing out solid blue fills that carry white text.
- Keep page hero/cover images as local files under `public/images/` rather than CDN asset pointers, so they render in the sandbox preview and on the live site.