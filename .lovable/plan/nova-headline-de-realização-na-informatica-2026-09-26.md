# Nova headline de realização na /informatica

## Objetivo
Trocar o título do Hero da página de remarketing (`/informatica`) por uma frase de **realização**: o aluno se imaginando conseguindo — documentos, planilhas, e-mail — e a Profª Elisa garantindo que vai ensinar cada passo.

## Nova copy do Hero (arquivo: `src/pages/Remarketing.tsx`)

**Título (h1):**
> Imagine fazer seus documentos, planilhas e e-mails **sem depender de ninguém**.

- "sem depender de ninguém" destacado em cor primária (mesmo tratamento do destaque atual).

**Linha de apoio logo abaixo do título (substitui o texto que hoje fica abaixo do vídeo):**
> Eu vou te ensinar cada passo, com calma, até você conseguir.

**Parágrafo descritivo (abaixo do vídeo, trocado para não repetir "ensinar cada passo"):**
> O computador deixa de ser medo e vira parte do seu dia: trabalho, recados da família, contas e tudo mais.

## O que muda
1. h1 atual ("Ainda tem dúvida se vai conseguir? Deixa comigo: eu te mostro cada passo.") → novo título de realização.
2. Parágrafo atual ("Eu vou te ensinar cada clique com calma...") → linha "Eu vou te ensinar cada passo..." sobe para logo abaixo do título; o antigo parágrafo vira a frase de transformação acima.
3. Vídeo, selo verde de 40% OFF, card de preço e resto da página **não mudam**.

## Regras respeitadas
- Frase curta, direta e positiva (público com baixa letramento).
- Voz da Profª Elisa, sem falsa escassez, sem preço no título.

## Verificação
- `bunx tsgo --noEmit`
- Playwright mobile 392x852 no `/informatica` conferindo a ordem: título → vídeo → parágrafo → selo → preço.
