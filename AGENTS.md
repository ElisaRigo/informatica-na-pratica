# Project architecture
- Keep experimental sales pages in independently routed page modules so comparing a new funnel never changes existing or historical pages.
- Use existing Hotmart tracking helpers for purchase actions so checkout events remain consistent across sales variants.
- Scope experimental page theme tokens to its root class so design exploration does not change other pages.