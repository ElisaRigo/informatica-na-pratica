# Plano: Reduzir abandono no checkout + medir o funil por etapa

## Problema

Hoje o CTA joga o aluno direto no formulário da Hotmart, que pede tudo de uma vez e assusta. Além disso, você não sabe em que etapa cada pessoa desiste.

## Solução

### 1. Etapa leve antes da Hotmart
Ao clicar no CTA, abre um diálogo curto no seu site pedindo só **nome, e-mail e WhatsApp** — com preço (12x R$ 30,72 ou R$ 297 à vista), garantia de 7 dias, acesso vitalício e selo de segurança. Nada de CPF nem pagamento nessa etapa.

### 2. Hotmart já preenchida
Ao continuar, o aluno é enviado para o checkout da Hotmart com os dados preenchidos via parâmetros da URL (`name`, `email`, `phoneac=55`, `phone`). Ele só escolhe a forma de pagamento — bem menos atrito.

### 3. Lead salvo para recuperação
Cada pessoa que preenche fica salva na tabela `leads` (já existe, visível só para admin). Se abandonar, você tem o WhatsApp para recuperar a venda.

### 4. Medição do funil por etapa
Eventos distintos em GA4 e Meta Pixel para você enxergar onde o aluno desiste:
- `begin_checkout` / `InitiateCheckout` — clicou no CTA
- `form_start` — começou a preencher
- `lead` / `Lead` — enviou os dados (indo para a Hotmart)
- Compra — medido na Hotmart/`/obrigada` como hoje

## Onde será aplicado
- Home (`/`) e `/aprender`.
- `/informatica` mantém seu fluxo próprio, intocada.

## Detalhes técnicos
- Novo `LeadCaptureDialog` + hook com função global `openCheckout` (mesma interface atual — nenhum CTA precisa mudar).
- Visual segue o padrão do checkout atual: tema escuro, selos de confiança, máscara de telefone, validação simples, botão verde arredondado.
- Insert na tabela `leads` com `source='checkout'` (a permissão de insert anônimo já existe).
- Link Hotmart atual mantido, apenas acrescentando os parâmetros de pré-preenchimento.

## Fora de escopo (próximos passos possíveis)
- Webhook Hotmart para marcar quais leads compraram de fato
- Automação de WhatsApp de recuperação de carrinho
