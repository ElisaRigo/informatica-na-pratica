# Modal de matrícula mais persuasivo na /informatica

## Objetivo

Ajustar o modal que abre nos CTAs da página /informatica (remarketing) para falar a linguagem de remarketing e na voz da Profª Elisa, aumentando confiança e sensação de "condição reservada". O modal da home permanece exatamente como está hoje.

## Como funciona

O modal atual (`CourseEnrollmentDialog`) é compartilhado entre a home e a /informatica. Será adicionado um modo opcional de remarketing ao mesmo componente:

- Nova prop `variant`: `"default"` (atual, usado na home) ou `"remarketing"` (novo, usado só na /informatica).
- `Remarketing.tsx` passa `variant="remarketing"`; `VendasNovo.tsx` não muda nada.
- Estrutura, tamanhos e rolagem do modal permanecem como estão (já validados no celular).

## Textos do modo remarketing

- Selo topo: "Ambiente 100% seguro" (mantido).
- Título: "Que bom que você voltou! Falta só um passo para começar" — voz da Profª Elisa.
- Foto da Profª Elisa + frase "Eu vou estar com você passo a passo!" e avaliação de 5 estrelas (mantidos).
- Faixa verde de condição ativa: "Sua condição de 40% OFF + 4 bônus exclusivos continua ativa" — aversão à perda.
- Prova social com identificação: "+15.000 alunos também achavam que não iam conseguir".
- 4 benefícios (acesso imediato, garantia 7 dias, suporte humanizado, acesso vitalício) — mantidos.
- Garantia reforçada: "Se não gostar em 7 dias, devolvemos 100% do seu dinheiro. Risco zero."
- Preço: R$ 297 (de R$ 497), à vista ou em até 12x de R$ 30,72 — mantido.
- Frase de pagamento: "Pix, cartão ou boleto: você escolhe no próximo passo" — mantida.
- Segurança Hotmart — mantida.
- Botão verde: "Sim, quero aprender com você, Profª Elisa" — na voz dela, sem preço.

## Regras respeitadas

- CTAs sem preço; bônus sempre como "4 bônus exclusivos" (nunca "de graça"); sem falsa escassez.
- Modal continua sem cards de PIX/cartão/boleto; o pagamento segue na Hotmart.
- Nenhuma mudança no modal da home.

## Arquivos

- `src/components/CourseEnrollmentDialog.tsx` — adiciona a prop `variant` e os textos do modo remarketing.
- `src/pages/Remarketing.tsx` — usa `variant="remarketing"`.

## Verificação

- Checagem de tipos (`bunx tsgo --noEmit`).
- Teste no celular (Playwright, 392x668): abrir o modal pela /informatica conferindo os textos novos, rolagem e botão; conferir que o modal da home segue idêntico ao atual.
