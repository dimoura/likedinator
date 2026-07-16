# Likedinator

Time de agentes de RH que pega um currículo em `.txt` e uma vaga em `.txt` e devolve um CV adaptado, bilíngue, em PDF, com um score de aderência à vaga. Roda 100% local (o PDF usa o Google Chrome que você já tem instalado).

## Fluxo

```
inputs/cv.txt  ─▶ agent-1-parse-cv  ─▶ outputs/cv.json ─┐
inputs/job.txt ─▶ agent-2-analyze-job ▶ outputs/job.json ┤
                                                         ▼
                              agent-3-strategist ─▶ outputs/strategy.json
                              (gaps + evidências + TOM + baseline score)
                                                         ▼
                              agent-4-writer ─▶ tailor_responses/cv_pt.md, cv_en.md,
                                                cover_letter_pt.md, cover_letter_en.md
                                                         ▼
                              agent-5-beautify ─▶ tailor_responses/*.html + *.pdf
                                                         ▼
                              agent-6-scorer  ─▶ outputs/score.json + relatório
```

## Como usar
1. Cole seu currículo em `inputs/cv.txt` e a vaga em `inputs/job.txt`.
2. (Opcional) Force o tom criando `inputs/tone.txt` com uma palavra: `startup`, `consultoria`, `corporativo` ou `neutro`. Sem esse arquivo, o time recomenda o tom sozinho.
3. Peça ao Claude Code: **"adapta meu CV"** (ou "tailor my CV", "nova vaga", "personaliza").
4. Os entregáveis aparecem em `tailor_responses/` (`.md` para colar/ATS e `.pdf` para enviar) e o score final em `outputs/score.json`.

## Tons
| Tom | Eixo | Quando |
|-----|------|--------|
| `startup` | resultado / ownership | ritmo acelerado, autonomia, impacto direto |
| `consultoria` | impacto de negócio | ROI, stakeholders, frameworks, resultado mensurável |
| `corporativo` | processo / escala | governança, compliance, liderança institucional |
| `neutro` | abrangente | equilíbrio entre resultado, pessoas e processo |

## Veracidade
Política **reenquadrar + inferência ampla**: realça e reescreve o que é real, assume skills adjacentes ancoradas em experiência concreta, e **nunca** inventa empregos, cargos, datas, diplomas ou métricas. Gaps reais aparecem no score, não viram mentira.

## Requisitos
- Google Chrome instalado (para gerar PDF). Nenhuma outra dependência.
- Node.js (para `scripts/html_to_pdf.mjs`). Python 3 (validação de JSON).

## Estrutura
```
.claude/agents/     6 agentes (parse-cv, analyze-job, strategist, writer, beautify, scorer)
scripts/            html_to_pdf.mjs  (HTML → PDF via Chrome headless)
inputs/             cv.txt, job.txt, tone.txt (opcional)
outputs/            cv.json, job.json, strategy.json, score.json
tailor_responses/   CVs e cartas em .md / .html / .pdf
```
