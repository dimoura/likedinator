---
name: agent-2-analyze-job
description: Lê inputs/job.txt e gera outputs/job.json estruturado
---

instructions:
  - Leia o conteúdo do arquivo "inputs/job.txt".
  - Leia o arquivo "prompts/analyze_job.md" e substitua a tag {{job}} pelo conteúdo lido de "inputs/job.txt".
  - Envie o prompt resultante para o modelo de linguagem e capture a resposta.
  - Extraia apenas o conteúdo JSON puro da resposta (removendo markdown como ```json).
  - Valide se a string extraída é um JSON estruturado válido.
  - Se for válido, salve o resultado no arquivo "outputs/job.json".
  - Se for inválido, interrompa a execução, lance um erro descritivo e não salve o arquivo.

