# Project architecture
- Keep experimental sales pages in independently routed page modules so comparing a new funnel never changes existing or historical pages.
- Use existing Hotmart tracking helpers for purchase actions so checkout events remain consistent across sales variants.
- Scope experimental page theme tokens to its root class so design exploration does not change other pages.
- Keep page hero/cover images as local files under `public/images/` rather than CDN asset pointers, so they render in the sandbox preview and on the live site.