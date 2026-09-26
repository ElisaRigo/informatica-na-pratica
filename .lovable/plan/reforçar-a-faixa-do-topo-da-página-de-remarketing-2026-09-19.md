# Reforçar a faixa do topo da página de remarketing

## Objetivo
Tornar a faixa azul do topo da `/remarketing` mais específica, citando o benefício real da oferta para gerar leve urgência (sem falsa escassez).

## Mudança
Em `src/pages/Remarketing.tsx` (linha da faixa do Hero), trocar o texto:

- De: `💻 Que bom ter você de volta — sua condição especial continua disponível`
- Para: `💻 Sua condição de 40% OFF + 4 bônus exclusivos ainda está disponível`

Todo o restante da página permanece igual.

## Verificação
- `bunx tsgo --noEmit` para confirmar que não há erros.
- Conferência visual rápida no celular via Playwright, garantindo que a faixa continua em uma linha e legível.
