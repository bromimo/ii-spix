# Design: PNG → SVG Conversion & Term Image Mapping

**Date:** 2026-02-23
**Project:** ii-spix (Pip-Boy AI Literacy Cheat Sheet)

## Problem

43 PNG files exist in `img/` (white background, black cartoon illustrations) that need to be:
1. Converted to the same SVG format used by existing `img/*.svg` files
2. Colorized to match the project's phosphor green theme (`#4dff91`)
3. Mapped to their corresponding terms in `TERM_IMGS` in `js/app.js`

Additionally, 2 terms have no image at all: `"Репозиторий (repo)"` and `"Bitbucket Pipelines"`.

## Existing SVG Format

Existing `img/*.svg` files are PNGs encoded as base64 and wrapped in SVG:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 310">
  <image href="data:image/png;base64,..." width="310" height="310"/>
</svg>
```

## Color Scheme

- Primary: `#4dff91` (phosphor green, matches `const G` in `app.js`)
- Background: transparent (app CSS background `#081408` shows through)

## Conversion Algorithm (per pixel)

Source PNGs: white background, bold black cartoon illustrations.

```
brightness = (R + G + B) / 3
alpha      = 255 - brightness   # white(255) → transparent(0), black(0) → opaque(255)
R, G, B    = 0x4d, 0xFF, 0x91  # phosphor green for all pixels
```

Anti-aliasing is preserved via the alpha channel (grey pixels become semi-transparent green).

## Tool

Python + Pillow (already installed). Script: `tools/convert_png_to_svg.py`.

**Steps:**
1. Scan `img/*.png`
2. Open → RGBA → apply pixel transform → resize to 310×310 (LANCZOS)
3. Save to temp bytes buffer → base64 encode
4. Write SVG wrapper to `img/{stem}.svg`

## Term → SVG Mapping (43 entries to add to TERM_IMGS)

| PNG file              | Term in CATEGORIES                         | SVG file                    |
|-----------------------|--------------------------------------------|-----------------------------|
| `200ok.png`           | `"200 OK / 201 Created / 500 Error"`       | `img/200ok.svg`             |
| `ai-agent.png`        | `"AI-агент"`                               | `img/ai-agent.svg`          |
| `argo-cd.png`         | `"Argo CD"`                                | `img/argo-cd.svg`           |
| `benchmark.png`       | `"Бенчмарк"`                               | `img/benchmark.svg`         |
| `branch.png`          | `"Ветка (branch)"`                         | `img/branch.svg`            |
| `code-review.png`     | `"Code Review"`                            | `img/code-review.svg`       |
| `context.png`         | `"Контекст (Context)"`                     | `img/context.svg`           |
| `context-window.png`  | `"Контекстное окно (Context Window)"`      | `img/context-window.svg`    |
| `copy-past.png`       | `"Копи-пейст (дублирование)"`              | `img/copy-past.svg`         |
| `deepgram.png`        | `"Deepgram"`                               | `img/deepgram.svg`          |
| `e2e.png`             | `"E2E-тесты (End-to-End)"`                 | `img/e2e.svg`               |
| `feauture-tests.png`  | `"Feature-тесты"`                          | `img/feauture-tests.svg`    |
| `git.png`             | `"Git"`                                    | `img/git.svg`               |
| `github.png`          | `"GitHub / GitLab / Bitbucket"`            | `img/github.svg`            |
| `git-ops.png`         | `"GitOps"`                                 | `img/git-ops.svg`           |
| `hallucination.png`   | `"Галлюцинация (Hallucination)"`           | `img/hallucination.svg`     |
| `heartbeat.png`       | `"Heartbeat"`                              | `img/heartbeat.svg`         |
| `inference.png`       | `"Инференс (Inference)"`                   | `img/inference.svg`         |
| `ip-adaptor.png`      | `"IP-Adapter"`                             | `img/ip-adaptor.svg`        |
| `jira.png`            | `"Jira / Confluence"`                      | `img/jira.svg`              |
| `maschtab.png`        | `"Масштабирование"`                        | `img/maschtab.svg`          |
| `memory.png`          | `"Долгосрочная память"`                    | `img/memory.svg`            |
| `merge.png`           | `"Merge"`                                  | `img/merge.svg`             |
| `micro-services.png`  | `"Микросервисы"`                           | `img/micro-services.svg`    |
| `migrations.png`      | `"Миграции (Migrations)"`                  | `img/migrations.svg`        |
| `multimodal-models.png`| `"Мультимодальные модели"`               | `img/multimodal-models.svg` |
| `openai-tts.png`      | `"OpenAI TTS"`                             | `img/openai-tts.svg`        |
| `opensource.png`      | `"Open Source (открытый исходный код)"`    | `img/opensource.svg`        |
| `otkaz.png`           | `"Отказоустойчивость"`                     | `img/otkaz.svg`             |
| `pipeline.png`        | `"Пайплайн (Pipeline)"`                    | `img/pipeline.svg`          |
| `pull-request.png`    | `"Pull Request (PR)"`                      | `img/pull-request.svg`      |
| `rate-limits.png`     | `"Rate Limits"`                            | `img/rate-limits.svg`       |
| `realtime-api.png`    | `"Realtime API"`                           | `img/realtime-api.svg`      |
| `reasoning.png`       | `"Reasoning (рассуждение)"`                | `img/reasoning.svg`         |
| `refactoring.png`     | `"Рефакторинг"`                            | `img/refactoring.svg`       |
| `seed.png`            | `"Seed (сид)"`                             | `img/seed.svg`              |
| `single-resp.png`     | `"Single Responsibility Principle"`        | `img/single-resp.svg`       |
| `subagent.png`        | `"Субагент (Sub-agent)"`                   | `img/subagent.svg`          |
| `text2video.png`      | `"text2video / image2video"`               | `img/text2video.svg`        |
| `token-2.png`         | `"Токен"` *(second token term)*            | `img/token-2.svg`           |
| `trabscribation.png`  | `"Транскрибация"`                          | `img/trabscribation.svg`    |
| `unit-tests.png`      | `"Unit-тесты"`                             | `img/unit-tests.svg`        |
| `yaml.png`            | `"YAML"`                                   | `img/yaml.svg`              |

## Terms Without Images (no PNG available)

- `"Репозиторий (repo)"` — no matching PNG file
- `"Bitbucket Pipelines"` — no matching PNG file

## Files to Change

| File | Action |
|------|--------|
| `tools/convert_png_to_svg.py` | Create — Python conversion script |
| `js/app.js` | Edit — add 43 entries to `TERM_IMGS` object |

## Out of Scope

- Vectorization (true SVG paths) — not needed, existing SVGs use PNG-in-SVG
- New illustrations for Репозиторий and Bitbucket Pipelines — separate task
- Removing existing PNG files after conversion — keep originals as source files
