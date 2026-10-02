# Project Architecture Rules

- Keep the home checkout prompt owned by `Index` so `/aprender` and other pages retain independent checkout behavior.
- Keep the home fixed bottom CTA (`FixedBottomCTA`) in `Index` only; it triggers past the section with id `primeira-sessao-valor` (Depoimentos em Áudio) and opens the same home checkout modal.