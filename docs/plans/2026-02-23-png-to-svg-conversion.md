# PNG → SVG Conversion & Term Image Mapping — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Convert 43 white-background PNG illustrations to phosphor-green transparent SVG files matching the existing `img/*.svg` format, then wire them into `TERM_IMGS` in `js/app.js`.

**Architecture:** Python + Pillow script (`tools/convert_png_to_svg.py`) processes every `img/*.png` in one pass — each pixel's brightness becomes its alpha (white→transparent, black→opaque), RGB is set to `#4dff91`. Output is base64-encoded PNG wrapped in a 310×310 SVG envelope identical to `img/json.svg`. `js/app.js` `TERM_IMGS` object receives 43 new entries mapping term names to the new SVG file paths.

**Tech Stack:** Python 3 + Pillow (already installed), plain text edit to `js/app.js`.

---

## Background: How images work in this project

- `js/app.js` exports `TERM_IMGS` — a plain object `{ "Term Name": "img/file.svg", … }`
- `renderDetail()` (line ~1314) does `<img src="${imgSrc}">` when a term is selected
- Existing `img/*.svg` are NOT vector SVGs — they're base64-encoded PNGs inside an SVG wrapper:
  ```xml
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 310">
    <image href="data:image/png;base64,..." width="310" height="310"/>
  </svg>
  ```
- Project color: `#4dff91` (phosphor green) on transparent background; app CSS background is `#081408`

---

### Task 1: Create the conversion script

**Files:**
- Create: `tools/convert_png_to_svg.py`

**Step 1: Create `tools/` directory and script**

```bash
mkdir -p tools
```

Create `tools/convert_png_to_svg.py` with this exact content:

```python
#!/usr/bin/env python3
"""
Convert all img/*.png (white bg, black art) to img/*.svg
Result: transparent bg, #4dff91 phosphor-green art, 310x310, base64 PNG in SVG wrapper.

Usage:
    python tools/convert_png_to_svg.py
"""

import base64
import io
from pathlib import Path
from PIL import Image

IMG_DIR = Path(__file__).parent.parent / "img"
OUT_W, OUT_H = 310, 310
GREEN = (0x4D, 0xFF, 0x91)

SVG_TEMPLATE = (
    '<svg xmlns="http://www.w3.org/2000/svg" '
    'viewBox="0 0 {w} {h}">'
    '<image href="data:image/png;base64,{b64}" width="{w}" height="{h}"/>'
    '</svg>'
)


def png_to_green_transparent(src: Path) -> bytes:
    """Return processed PNG bytes: white→transparent, black→#4dff91."""
    img = Image.open(src).convert("RGBA").resize((OUT_W, OUT_H), Image.LANCZOS)
    pixels = img.load()
    for y in range(OUT_H):
        for x in range(OUT_W):
            r, g, b, a = pixels[x, y]
            brightness = (r + g + b) // 3
            alpha = 255 - brightness          # white(255)→0, black(0)→255
            pixels[x, y] = (*GREEN, alpha)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return buf.getvalue()


def make_svg(png_bytes: bytes) -> str:
    b64 = base64.b64encode(png_bytes).decode("ascii")
    return SVG_TEMPLATE.format(w=OUT_W, h=OUT_H, b64=b64)


def main():
    pngs = sorted(IMG_DIR.glob("*.png"))
    if not pngs:
        print("No PNG files found in", IMG_DIR)
        return
    for src in pngs:
        dst = src.with_suffix(".svg")
        print(f"  {src.name} → {dst.name}", end=" ... ", flush=True)
        png_bytes = png_to_green_transparent(src)
        dst.write_text(make_svg(png_bytes), encoding="ascii")
        print("done")
    print(f"\nConverted {len(pngs)} files.")


if __name__ == "__main__":
    main()
```

**Step 2: Run a quick smoke test before processing all files**

```bash
python -c "
from PIL import Image
import io, base64
img = Image.new('RGBA', (4,4), (255,255,255,255))
from tools.convert_png_to_svg import png_to_green_transparent, make_svg
# test manually:
img2 = Image.new('RGB', (4,4), (255,255,255))
buf = io.BytesIO()
img2.save(buf, format='PNG')
buf.seek(0)

# simulate processing a white pixel
r,g,b = 255,255,255
brightness = (r+g+b)//3  # 255
alpha = 255 - brightness  # 0 → transparent
assert alpha == 0, 'White should become transparent'

# simulate processing a black pixel
r,g,b = 0,0,0
brightness = (r+g+b)//3  # 0
alpha = 255 - brightness  # 255 → opaque
assert alpha == 255, 'Black should become opaque'

print('Smoke test PASSED')
"
```

Expected output: `Smoke test PASSED`

**Step 3: Run the conversion script on all PNG files**

```bash
python tools/convert_png_to_svg.py
```

Expected output (43 lines, one per PNG):
```
  200ok.png → 200ok.svg ... done
  ai-agent.png → ai-agent.svg ... done
  ...
  yaml.png → yaml.svg ... done

Converted 43 files.
```

**Step 4: Visually verify one output SVG**

Open `img/memory.svg` in a browser or check its structure:

```bash
python -c "
content = open('img/memory.svg').read()
assert content.startswith('<svg xmlns='), 'Must start with SVG tag'
assert 'viewBox=\"0 0 310 310\"' in content, 'Must have 310x310 viewBox'
assert 'data:image/png;base64,' in content, 'Must have base64 PNG'
print('Structure OK, size:', len(content), 'bytes')
"
```

**Step 5: Commit the script and generated SVGs**

```bash
git add tools/convert_png_to_svg.py img/*.svg
git commit -m "feat: add PNG-to-SVG conversion script and generate 43 SVG files

Convert white-bg PNG illustrations to phosphor-green transparent SVGs
matching existing img/*.svg format (base64 PNG in 310x310 SVG wrapper).

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 2: Wire new SVGs into TERM_IMGS in js/app.js

**Files:**
- Modify: `js/app.js` — `TERM_IMGS` object (lines ~1129–1194)

**Step 1: Locate the end of TERM_IMGS**

Open `js/app.js` and find the closing `};` of `TERM_IMGS` (around line 1194, after `"Негативный промпт": "img/negativ-prompt.svg",`).

**Step 2: Add the 43 new entries before the closing `};`**

Insert the following block immediately before the `};` that closes `TERM_IMGS`:

```javascript
  // AI-модели (дополнительные)
  "OpenAI TTS":                       "img/openai-tts.svg",
  "Deepgram":                         "img/deepgram.svg",
  "Realtime API":                     "img/realtime-api.svg",
  // DevOps (дополнительные)
  "Масштабирование":                  "img/maschtab.svg",
  "Отказоустойчивость":               "img/otkaz.svg",
  "Микросервисы":                     "img/micro-services.svg",
  // Генерация медиа (дополнительные)
  "Мультимодальные модели":           "img/multimodal-models.svg",
  "Seed (сид)":                       "img/seed.svg",
  "IP-Adapter":                       "img/ip-adaptor.svg",
  "text2video / image2video":         "img/text2video.svg",
  // Git
  "Git":                              "img/git.svg",
  "Ветка (branch)":                   "img/branch.svg",
  "Pull Request (PR)":                "img/pull-request.svg",
  "Merge":                            "img/merge.svg",
  "Code Review":                      "img/code-review.svg",
  "GitHub / GitLab / Bitbucket":      "img/github.svg",
  "Пайплайн (Pipeline)":              "img/pipeline.svg",
  "YAML":                             "img/yaml.svg",
  "Argo CD":                          "img/argo-cd.svg",
  "GitOps":                           "img/git-ops.svg",
  // Тесты
  "Unit-тесты":                       "img/unit-tests.svg",
  "Feature-тесты":                    "img/feauture-tests.svg",
  "E2E-тесты (End-to-End)":           "img/e2e.svg",
  "Рефакторинг":                      "img/refactoring.svg",
  "Single Responsibility Principle":  "img/single-resp.svg",
  "Копи-пейст (дублирование)":        "img/copy-past.svg",
  "Миграции (Migrations)":            "img/migrations.svg",
  "200 OK / 201 Created / 500 Error": "img/200ok.svg",
  "Jira / Confluence":                "img/jira.svg",
  // AI-агенты и концепции
  "AI-агент":                         "img/ai-agent.svg",
  "Субагент (Sub-agent)":             "img/subagent.svg",
  "Галлюцинация (Hallucination)":     "img/hallucination.svg",
  "Контекст (Context)":               "img/context.svg",
  "Контекстное окно (Context Window)":"img/context-window.svg",
  "Токен":                            "img/token-2.svg",
  "Инференс (Inference)":             "img/inference.svg",
  "Reasoning (рассуждение)":          "img/reasoning.svg",
  "Heartbeat":                        "img/heartbeat.svg",
  "Долгосрочная память":              "img/memory.svg",
  "Бенчмарк":                        "img/benchmark.svg",
  "Open Source (открытый исходный код)": "img/opensource.svg",
  "Rate Limits":                      "img/rate-limits.svg",
  "Транскрибация":                    "img/trabscribation.svg",
```

**Step 3: Verify the entry count**

```bash
python -c "
import re
src = open('js/app.js', encoding='utf-8').read()
match = re.search(r'const TERM_IMGS = \{(.+?)\};', src, re.DOTALL)
entries = re.findall(r'\"[^\"]+\":\s*\"img/', match.group(1))
print('TERM_IMGS entries:', len(entries))
assert len(entries) >= 80, f'Expected 80+, got {len(entries)}'
print('Count OK')
"
```

Expected: `TERM_IMGS entries: 80` (or similar, ≥80)

**Step 4: Test in browser**

Open the app in a browser. Click on any of these terms and verify the image appears with green art on dark background:
- "Инференс (Inference)" → should show green robot illustration
- "Долгосрочная память" → should show green brain/memory illustration
- "Ветка (branch)" → should show green branch graph illustration

**Step 5: Commit**

```bash
git add js/app.js
git commit -m "feat: wire 43 PNG-based SVGs into TERM_IMGS

Maps all converted PNG illustrations to their corresponding terms.
2 terms remain without images: 'Репозиторий (repo)' and 'Bitbucket Pipelines'.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Summary

| Step | Action | Files |
|------|--------|-------|
| Task 1 | Create + run `tools/convert_png_to_svg.py` | `tools/convert_png_to_svg.py`, `img/*.svg` (43 new) |
| Task 2 | Add 43 entries to `TERM_IMGS` | `js/app.js` |

**Terms still without images after this plan:** `"Репозиторий (repo)"`, `"Bitbucket Pipelines"` — left for a future task.
