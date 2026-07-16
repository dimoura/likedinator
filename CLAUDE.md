# Likedinator

Pipeline de RH que adapta um currículo a uma vaga específica: estrutura CV e vaga em JSON, diagnostica o encaixe, reescreve o CV em pt-BR e en-US (+ cover letters) com o tom certo, gera PDFs elegantes e dá um score de aderência.

## Como rodar (orquestração)
Quando o usuário pedir para adaptar o CV, execute o time **em ordem**, um agente por vez. Cada agente lê e escreve arquivos no disco; o output de um é input do próximo. **Nunca pule etapas.**

1. **agent-1-parse-cv** — `inputs/cv.txt` → `outputs/cv.json`
2. **agent-2-analyze-job** — `inputs/job.txt` → `outputs/job.json`
3. **agent-3-strategist** — cv.json + job.json → `outputs/strategy.json` (gap analysis, evidências, **recomenda o tom**, baseline score)
4. **agent-4-writer** — cv+job+strategy → `tailor_responses/cv_{pt,en}.md` + `cover_letter_{pt,en}.md`
5. **agent-5-beautify** — os `.md` → `tailor_responses/*.html` → `*.pdf` (Chrome headless)
6. **agent-6-scorer** — CV final + vaga → `outputs/score.json` + relatório de aderência (antes → depois)

No fim, mostre ao usuário: o tom escolhido (e por quê), o **score de aderência**, e os caminhos dos PDFs gerados.

Gatilhos: "adapta meu CV", "tailor my CV", "nova vaga", "personaliza", "roda o pipeline".

## Entradas
- `inputs/cv.txt` — currículo em texto livre (obrigatório).
- `inputs/job.txt` — descrição da vaga (obrigatório).
- `inputs/tone.txt` — **opcional**. Se contiver `startup`, `consultoria`, `corporativo` ou `neutro`, força o tom (override). Sem o arquivo, o agent-3 recomenda o tom automaticamente.

## Tons disponíveis
`startup` (resultado/ownership) · `consultoria` (impacto de negócio) · `corporativo` (institucional/processo) · `neutro` (equilibrado). Definições completas no agent-3 e agent-4.

## Política de veracidade
Nível: **reenquadrar + inferência ampla**. Realça e reescreve experiências reais, assume skills adjacentes ancoradas em experiência real, mas **nunca fabrica** empregadores, cargos, datas, diplomas ou métricas.

## PDF
Renderizado por `scripts/html_to_pdf.mjs` via Google Chrome em modo headless (sem dependências extras). Rode `node scripts/html_to_pdf.mjs` para converter todo `tailor_responses/*.html`.

## MCP de banco de dados
Este projeto não usa banco. Se algum acesso a banco for necessário no futuro, vale a regra do repositório `sonny_dreams`: use **exclusivamente** o MCP `identila-db`.
