# Retoques de conversão na página /informatica

## Contexto verificado
- O círculo do topo **não está quebrado**: no site publicado a foto da Profª Elisa carrega normalmente (verificado por captura do site no ar). O nome "cortado" apareceu só no meu teste local, porque a foto não é servida no ambiente de teste. **Nenhuma mudança necessária nesse item** — vou explicar isso na entrega.

## Mudanças a aplicar em `src/pages/Remarketing.tsx`

### 1. Áudios dos alunos: trocar o texto genérico
- Card do Antonio (2º áudio): trocar "Continuação do depoimento" por um texto que dê vontade de ouvir, ex.: **"Continua o recado dele — vale ouvir até o fim"** (sem inventar fatos sobre o conteúdo, já que não posso ouvir o áudio; se ao ouvir o áudio o tema for outro, ajusto o texto).
- Revisar os outros dois rótulos no mesmo tom, sem prometer conteúdo específico que não confirmei.

### 2. Lembrete de garantia no meio da página
- Logo depois dos depoimentos escritos (seção "Eu já ajudei pessoas..."), antes de "Para quem é o curso", criar um bloco compacto no mesmo estilo visual da página:
  - Ícone de escudo (ShieldCheck, cor de sucesso) + título curto e positivo, ex.: **"Você não corre risco nenhum"**
  - Uma linha simples: "Entre, veja as aulas com calma. Se em 7 dias não for para você, devolvemos todo o seu dinheiro."
  - Botão verde padrão da página (mesmo CTA de matrícula, abre o modal atual), ex.: **"Quero começar sem risco"**
- Sem preço no botão, sem falsa escassez, texto curto para baixo letramento.

## Verificação
- `bunx tsgo --noEmit` sem erros.
- Playwright no celular (392×852) e no computador (1280×1800): confirmar o bloco de garantia logo após os depoimentos escritos e os novos textos nos áudios, sem quebrar o visual atual.
