# Plano: Aumentar conversão do checkout (muitos cliques, poucas compras)

## Diagnóstico

Hoje, ao clicar em qualquer CTA da home, o visitante cai **direto no formulário da Hotmart** (`window.open` para `pay.hotmart.com/...`). Problemas disso:

1. **Frio demais**: a pessoa vai da página de vendas direto para um formulário de pagamento pedindo tudo de uma vez, sem nenhum compromisso gradual.
2. **Zero captura de lead**: se a pessoa abandona na Hotmart, você não tem nome, e-mail nem telefone dela — impossível recuperar a venda.
3. **Formulário não preenchido**: a Hotmart aceita parâmetros de pré-preenchimento, mas hoje o link vai vazio — o aluno digita tudo do zero.
4. **Cegueira de dados**: você sabe que há checkouts, mas não sabe **quem** abandonou nem em que etapa.

## O que vamos fazer

### 1. Etapa de captura antes da Hotmart (principal mudança)
Ao clicar no CTA, abre um diálogo curto e amigável pedindo apenas **nome, e-mail e WhatsApp** (sem CPF, sem pedir pagamento ainda). Texto simples: "Falta pouco! Preencha para garantir sua vaga."

### 2. Redirecionar para a Hotmart já preenchida
Após preencher, o aluno é enviado para o checkout da Hotmart com os dados já preenchidos via parâmetros da URL (`name`, `email`, `phone`, `phoneac`). Ele só escolhe a forma de pagamento — muito menos atrito.

### 3. Salvar o lead para recuperação de vendas
Cada pessoa que preenche fica salva na tabela `leads` (já existe, com acesso só admin). Assim você pode:
- Ver quem abandonou o checkout
- Chamar no WhatsApp para recuperar a venda
- Futuramente: automação de recuperação (já existe plano de webhook Hotmart)

### 4. Rastreamento por etapa
Disparar eventos distintos para medir o funil:
- `begin_checkout` / `InitiateCheckout` ao abrir o diálogo
- `form_start` ao começar a digitar
- `lead` ao enviar os dados (antes de ir para a Hotmart)

Assim você descobre se o abandono é antes ou depois de chegar na Hotmart.

### 5. Elementos de confiança no diálogo
Reforçar no diálogo: preço R$ 297, garantia de 7 dias, acesso vitalício e "pagamento seguro" — para a pessoa chegar na Hotmart já decidida.

## Onde será aplicado
- Home (`/`) e `/aprender` — os dois pontos de entrada com CTA para a Hotmart.
- A página `/informatica` já tem fluxo próprio e não será tocada (independência mantida).

## Detalhes técnicos
- Reutilizar o padrão visual do `CursoCheckoutDialog` (dark, selos de confiança, validação de campos, máscara de telefone).
- Novo componente `LeadCaptureDialog` + hook `useLeadCaptureDialog` com função global `openCheckout` (mesma interface atual — nenhum CTA precisa mudar).
- Insert na tabela `leads` com `source='checkout'` (RLS já permite insert anônimo).
- Parâmetros Hotmart: `?name=...&email=...&phoneac=55&phone=...` além dos existentes.
- Eventos GA4/Meta Pixel mantidos e ampliados conforme item 4.

## Fora de escopo (podemos fazer depois)
- Webhook Hotmart para marcar conversão real de cada lead
- Automação de WhatsApp de recuperação de carrinho
- Teste A/B entre diálogo de captura vs. redirecionamento direto
