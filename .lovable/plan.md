# Plano: Otimizações de Conversão na Página Principal

## Avaliação geral

A página já está bem acima da média para conversão: vídeo de vendas no topo, aula demonstrativa real, quiz interativo, prova social (15.000+ alunos), professora apresentada, bônus, certificado, garantia, FAQ, CTA fixo no celular e modal de confirmação antes da Hotmart. A estrutura está boa — o que resta são ajustes finos de persuasão e medição.

## Melhorias propostas (por ordem de impacto)

### 1. Medir o que funciona (prioridade máxima)
Hoje não sabemos onde as pessoas abandonam. Sem isso, qualquer mudança é no escuro.
- Adicionar eventos de acompanhamento (Google Ads / Meta Pixel já existentes): `quiz_start`, `quiz_complete`, `video_aula_play`, `modal_aberto`, `clique_checkout`.
- Resultado: relatório claro de onde os visitantes travam, para decidir as próximas mudanças com dados.

### 2. Urgência real na oferta
- Adicionar um contador regressivo discreto na seção de preço (ex.: "Oferta de hoje termina em: 23:59:59") — reforça os 40% OFF + 4 bônus exclusivos que já existem.
- Alternativa mais leve: selo "Últimas vagas com bônus hoje" sem contador.

### 3. Prova social perto do botão de compra
- Repetir 1 ou 2 depoimentos curtos (nome + frase) dentro ou logo acima da seção de preço/oferta. Hoje os depoimentos ficam longe do momento da decisão.

### 4. Reforço no modal de confirmação
- Adicionar no modal uma frase curta de urgência: "Bônus disponíveis somente hoje" junto ao preço.

### 5. FAQ com foco em objeções de compra
- Garantir que o FAQ responda as 3 maiores dúvidas de quem hesita: "Nunca usei computador, consigo?", "Como recebo o acesso?", "E se eu não gostar?" — com respostas de 1-2 linhas (público de baixa letramento).

## O que NÃO mexer
- Estrutura das seções, quiz, vídeos, faixa azul e CTAs — já foram refinados e funcionam.

## Detalhes técnicos
- Eventos usam `src/lib/checkoutTracking.ts` e os pixels já carregados (Meta 787096354071974 / Google Ads).
- Contador regressivo: componente simples em `Pricing`, reinício diário à meia-noite (sem mentira de escassez falsa por visitante).
- Nada de captura de dados no quiz (mantém a regra atual).
- Verificação com `bunx tsgo --noEmit` e teste no celular via Playwright ao final.
