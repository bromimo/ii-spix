# Design: AI Cheatsheet Landing Page

**Date:** 2026-02-20
**Topic:** Шпаргалка по терминам курса «Нейрограмотность» (spix.ru/ai-lectures)

---

## Goal

Static landing page that serves as a cheat sheet for all AI/tech terms found across 5 lectures of the spix.ru/ai-lectures course. Wrapped in Docker for easy deployment.

---

## Architecture

- **Frontend:** Single `index.html` with embedded CSS and JS (no build step, no dependencies)
- **Server:** `nginx:alpine` Docker image serving static files
- **Orchestration:** `docker-compose.yml` exposing port 8080

```
ii-spix/
├── index.html          # Landing page (all-in-one)
├── nginx.conf          # Nginx config
├── Dockerfile          # FROM nginx:alpine
├── docker-compose.yml  # Port 8080 mapping
└── docs/
    └── plans/
        └── 2026-02-20-ai-cheatsheet-landing-design.md
```

---

## Content Structure

Terms organized into 8 categories from all 5 lectures:

1. 🧠 **AI-модели и платформы** — ChatGPT, Claude, Gemini, DeepSeek, etc.
2. 🛠 **Инструменты разработки** — Cursor, Claude Code, GitHub Copilot, etc.
3. 🐳 **DevOps / Контейнеры** — Docker, Kubernetes, CI/CD, Nginx, etc.
4. 🔗 **Сети / API / Архитектура** — REST, HTTP, JSON, DNS, VPS, etc.
5. 🎨 **Генерация медиа** — DALL-E, Midjourney, Sora, Runway, etc.
6. 📝 **Git и CI/CD** — ветки, pull request, pipelines, Argo CD, etc.
7. 🧪 **Тестирование** — unit, feature, e2e, 200 OK, etc.
8. 🤖 **Агенты и боты** — агент, субагент, heartbeat, skills, tools, etc.

---

## UI Design

- **Theme:** Dark (background #0d1117, text #e6edf3) — GitHub-dark inspired
- **Accent:** Cyan/neon (#58a6ff, #39d353)
- **Layout:** Full-width header → sticky category tabs → card grid
- **Search:** Live JS filter in the header, filters all cards as you type
- **Cards:** Term name (bold, accent color) + 1-2 sentence explanation in Russian
- **Typography:** System font stack (no external fonts needed)
- **Responsive:** CSS grid, works on mobile

---

## Docker Setup

```yaml
# docker-compose.yml
services:
  cheatsheet:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

```dockerfile
# Dockerfile
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

---

## Out of Scope

- No backend, no database
- No authentication
- No multi-language support
- No external CDN dependencies
