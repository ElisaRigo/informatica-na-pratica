# Trocar o primeiro vídeo da página /informatica

## Resultado
- Substituir somente o primeiro vídeo da página `/informatica` pelo MP4 enviado.
- Manter a home e o segundo vídeo da página sem alterações.
- Usar como capa um quadro extraído exatamente em **00:20,17**.

## Implementação
1. Preparar uma versão otimizada do vídeo para internet, preservando imagem e áudio, com reprodução rápida e início progressivo.
2. Extrair a capa no instante **20,17 segundos** e otimizá-la para carregamento imediato.
3. Hospedar o vídeo e a capa no CDN do projeto, sem adicionar os arquivos pesados diretamente ao código.
4. Trocar o player atual do primeiro vídeo por um player nativo com controles, áudio, reprodução em linha e início ao toque.
5. Adaptar o enquadramento vertical do arquivo enviado ao espaço existente, sem distorcer ou cortar conteúdo importante.
6. Carregar primeiro apenas a capa; o vídeo completo começa a baixar quando a pessoa apertar o play, reduzindo o peso inicial da página.

## Verificação
- Conferir no computador e no celular se a capa corresponde ao instante solicitado.
- Testar play, áudio, controles, proporção e velocidade de início.
- Confirmar que apenas `/informatica` foi alterada e que a página continua sem erros.
