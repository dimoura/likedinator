---
name: agent-1-parse-cv
description: Lê inputs/cv.txt e gera outputs/cv.json estruturado
---

instructions:
  - Verifique se o arquivo "outputs/cv.json" já existe. Se existir, encerre a execução sem realizar nenhuma ação.
  - Se não existir, leia o conteúdo do arquivo "inputs/cv.txt".
  - Leia o arquivo "prompts/parse_cv.md" e substitua a tag {{cv}} pelo conteúdo lido de "inputs/cv.txt".
  - Envie o prompt resultante para o modelo de linguagem e capture a resposta.
  - Extraia apenas o conteúdo JSON puro da resposta (removendo markdown como ```json).
  - Valide se a estrutura da string retornada é um JSON válido.
  - Se for válido, salve o resultado em "outputs/cv.json".
  - Se for inválido, lance um erro de execução e não salve o arquivo.