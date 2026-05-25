---
name: agent-3-tailor
description: Usa cv.json + job.json para gerar CVs e cover letters
---

instructions:
  - Leia o conteúdo de "outputs/cv.json" e "outputs/job.json".
  - Verifique se o arquivo "inputs/tone.txt" existe.
    - Se existir, leia o seu conteúdo para definir a variável {{tone}}.
    - Se não existir, defina a variável {{tone}} como "consulting".
  - Leia o arquivo "prompts/tailor_cv.md" e substitua as variáveis {{cv}}, {{job}} e {{tone}} pelos respectivos valores.
  - Envie o prompt ao modelo de linguagem, exigindo que a resposta venha estruturada em formato JSON contendo quatro chaves: "cv_en", "cv_pt", "cover_letter_en" e "cover_letter_pt".
  - Extraia e valide o JSON de retorno do modelo.
  - Garanta que o diretório "tailor_responses/" exista (crie-o se necessário).
  - Salve o conteúdo de cada chave nos seus respectivos arquivos dentro de "tailor_responses/":
    - cv_en.txt
    - cv_pt.txt
    - cover_letter_en.txt
    - cover_letter_pt.txt
  - Se o retorno não for um JSON válido ou faltar alguma das chaves, lance um erro e aborte a gravação.
