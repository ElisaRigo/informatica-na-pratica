# Redesenhar a faixa de recado da /informatica (estilo copywriting)

## Objetivo
Trocar a faixa azul atual por um bloco de headline "cara de copy": recado da Profª Elisa com hierarquia de anúncio, ícone elegante e a palavra "computador" em destaque — bonito, elegante e persuasivo, sem cara de banner de promoção.

## Direção visual
- Fundo: passa de banda azul para o tema escuro da página (slate-900), com um brilho suave azul atrás — o texto ganha contraste de headline.
- Eyebrow no topo: selo pequeno "RECADO DA PROFª ELISA" com ícone de mensagem (MessageCircleHeart, Lucide), em cápsula azul translúcida.
- Headline central grande em branco, quebrando em 2 linhas:
  "Vou te ensinar a usar o **computador** de uma vez por todas!"
- "computador" destacado como copywriter faria: gradiente azul→ciano no texto com sublinhado fino luminoso (sem marca-texto grosso, que foi rejeitado).
- Toque final: aspas decorativas sutis (estilo citação) e uma linha divisória fina luminosa abaixo — reforça que é um recado pessoal.
- Espaçamento generoso (py-8 md:py-10), centralizado, funciona no mobile 392px.

## Mudanças técnicas
- Arquivo único: `src/pages/Remarketing.tsx`, seção do Hero (`div` com fundo `bg-primary` atual, linhas ~87-102).
- Ícone `MessageCircleHeart` adicionado ao import de lucide-react.
- Nada mais muda: texto exato mantido, seções vizinhas intocadas, home intacta.

## Verificação
- Playwright em mobile 392px (screenshot da faixa antes/depois).
- `bunx tsgo --noEmit` sem erros.
