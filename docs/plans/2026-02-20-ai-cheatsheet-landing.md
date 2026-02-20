# AI Cheatsheet Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a static dark-theme landing page cheat sheet of all AI/tech terms from spix.ru/ai-lectures, served by Nginx in Docker.

**Architecture:** Single `index.html` with embedded CSS + JS (no dependencies, no build step). Nginx Alpine serves the file. Docker Compose exposes port 8080. Live search filters cards in-browser via vanilla JS.

**Tech Stack:** HTML5, CSS3 (CSS Grid, CSS custom properties), Vanilla JS, Nginx Alpine, Docker, Docker Compose

---

### Task 1: Project scaffold + Nginx config

**Files:**
- Create: `nginx.conf`
- Create: `Dockerfile`
- Create: `docker-compose.yml`

**Step 1: Create `nginx.conf`**

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    gzip on;
    gzip_types text/html text/css application/javascript;
}
```

**Step 2: Create `Dockerfile`**

```dockerfile
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
```

**Step 3: Create `docker-compose.yml`**

```yaml
services:
  cheatsheet:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

**Step 4: Verify files exist**

Run: `ls -la nginx.conf Dockerfile docker-compose.yml`
Expected: all three files listed

**Step 5: Commit**

```bash
git init
git add nginx.conf Dockerfile docker-compose.yml docs/
git commit -m "feat: scaffold nginx + docker setup"
```

---

### Task 2: Create `index.html` — structure and CSS

**Files:**
- Create: `index.html`

**Step 1: Create `index.html` with full HTML skeleton, CSS variables, and layout**

The file must be a single self-contained HTML file. Use this exact structure:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Шпаргалка — Нейрограмотность</title>
  <style>
    /* === CSS Variables === */
    :root {
      --bg: #0d1117;
      --bg2: #161b22;
      --bg3: #21262d;
      --border: #30363d;
      --text: #e6edf3;
      --muted: #8b949e;
      --accent: #58a6ff;
      --accent2: #3fb950;
      --tag-bg: #1f2937;
      --radius: 8px;
      --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    }

    /* === Reset === */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font);
      font-size: 15px;
      line-height: 1.6;
      min-height: 100vh;
    }

    /* === Header === */
    header {
      background: var(--bg2);
      border-bottom: 1px solid var(--border);
      padding: 24px 32px;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
    }

    .logo {
      font-size: 20px;
      font-weight: 700;
      color: var(--accent);
      white-space: nowrap;
    }

    .logo span { color: var(--text); }

    .search-wrap {
      flex: 1;
      min-width: 200px;
    }

    #search {
      width: 100%;
      background: var(--bg3);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      color: var(--text);
      font-size: 15px;
      padding: 10px 16px;
      outline: none;
      transition: border-color 0.15s;
    }

    #search:focus { border-color: var(--accent); }
    #search::placeholder { color: var(--muted); }

    .counter {
      color: var(--muted);
      font-size: 13px;
      white-space: nowrap;
    }

    /* === Main === */
    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 32px;
    }

    .intro {
      margin-bottom: 40px;
      padding: 20px 24px;
      background: var(--bg2);
      border: 1px solid var(--border);
      border-left: 3px solid var(--accent);
      border-radius: var(--radius);
      color: var(--muted);
      font-size: 14px;
    }

    .intro strong { color: var(--text); }

    /* === Category sections === */
    .category {
      margin-bottom: 48px;
    }

    .category-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 20px;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border);
    }

    .category-title .icon { font-size: 22px; }

    .category-count {
      font-size: 12px;
      font-weight: 500;
      background: var(--tag-bg);
      color: var(--muted);
      padding: 2px 8px;
      border-radius: 20px;
      margin-left: auto;
    }

    /* === Cards grid === */
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    }

    .card {
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 16px 20px;
      transition: border-color 0.15s, transform 0.1s;
    }

    .card:hover {
      border-color: var(--accent);
      transform: translateY(-1px);
    }

    .card-term {
      font-size: 15px;
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 6px;
      font-family: 'Courier New', monospace;
    }

    .card-def {
      font-size: 14px;
      color: var(--muted);
      line-height: 1.5;
    }

    /* === Hidden state === */
    .card.hidden { display: none; }
    .category.empty { display: none; }

    /* === No results === */
    #no-results {
      display: none;
      text-align: center;
      padding: 60px 20px;
      color: var(--muted);
    }

    #no-results.visible { display: block; }

    /* === Footer === */
    footer {
      text-align: center;
      padding: 32px;
      color: var(--muted);
      font-size: 13px;
      border-top: 1px solid var(--border);
      margin-top: 40px;
    }

    footer a { color: var(--accent); text-decoration: none; }

    /* === Responsive === */
    @media (max-width: 640px) {
      header { padding: 16px; }
      main { padding: 24px 16px; }
      .cards { grid-template-columns: 1fr; }
    }

    /* === Highlight search match === */
    mark {
      background: rgba(88, 166, 255, 0.2);
      color: var(--accent);
      border-radius: 2px;
      padding: 0 1px;
    }
  </style>
</head>
<body>

<header>
  <div class="header-inner">
    <div class="logo">⚡ <span>Нейрограмотность</span> — шпаргалка</div>
    <div class="search-wrap">
      <input type="search" id="search" placeholder="Поиск по терминам..." autocomplete="off" />
    </div>
    <div class="counter" id="counter"></div>
  </div>
</header>

<main>
  <div class="intro">
    <strong>Все термины курса «Нейрограмотность» (spix.ru/ai-lectures)</strong> — 5 лекций,
    8 категорий. Используй поиск, чтобы быстро найти нужное понятие.
  </div>

  <!-- CATEGORIES AND CARDS GO HERE — see Task 3 -->
  <div id="categories"></div>
  <div id="no-results">Ничего не найдено по запросу «<span id="query-display"></span>»</div>
</main>

<footer>
  Курс <a href="https://spix.ru/ai-lectures" target="_blank">Нейрограмотность</a> · spix.ru · 2026
</footer>

<!-- JS goes here — see Task 4 -->
</body>
</html>
```

**Step 2: Commit skeleton**

```bash
git add index.html
git commit -m "feat: html skeleton with dark theme css"
```

---

### Task 3: Populate all terms data + render cards

**Files:**
- Modify: `index.html` — add `<script>` with terms data and render logic before `</body>`

**Step 1: Add the full terms dataset and render function**

Replace the `<!-- JS goes here -->` comment with a single `<script>` block containing:

1. A `CATEGORIES` array of objects: `{ id, icon, title, terms: [{ term, def }] }`
2. A `render()` function that creates DOM from CATEGORIES
3. An initial call to `render()`

Here is the **complete terms dataset** (all terms from lectures 1–5, grouped):

```javascript
const CATEGORIES = [
  {
    id: "models",
    icon: "🧠",
    title: "AI-модели и платформы",
    terms: [
      { term: "ChatGPT", def: "Чат-интерфейс от OpenAI поверх моделей GPT-4/GPT-4o. Самый популярный в мире AI-помощник для текста, кода и анализа." },
      { term: "Claude", def: "AI-ассистент от Anthropic. Отличается большим контекстным окном и упором на безопасность. Модели: Claude Sonnet, Opus, Haiku." },
      { term: "Gemini", def: "Мультимодальная AI-модель от Google. Умеет работать с текстом, изображениями, аудио и видео." },
      { term: "GPT-4o", def: "Флагманская мультимодальная модель OpenAI. «o» = omni — принимает текст, изображения и голос, отвечает тем же." },
      { term: "GPT-4 Vision", def: "Версия GPT-4 с поддержкой анализа изображений. Умеет отвечать на вопросы по картинке." },
      { term: "DeepSeek", def: "Серия открытых AI-моделей от китайской компании DeepSeek AI. Сопоставимы с GPT-4, но дешевле в использовании." },
      { term: "Kimi", def: "AI-ассистент от компании Moonshot AI. Популярен в Китае, известен огромным контекстным окном (до 1M токенов)." },
      { term: "Qwen", def: "Семейство языковых моделей от Alibaba. Открытый исходный код, мультиязычная поддержка." },
      { term: "ElevenLabs", def: "Платформа для клонирования голоса и синтеза речи. Генерирует реалистичную озвучку на 30+ языках." },
      { term: "OpenAI TTS", def: "Text-to-Speech API от OpenAI. Преобразует текст в речь с выбором голоса и скорости." },
      { term: "Whisper", def: "Открытая модель от OpenAI для распознавания речи (speech-to-text). Работает офлайн, поддерживает 90+ языков." },
      { term: "Deepgram", def: "Облачный сервис распознавания речи в реальном времени. Быстрее и дешевле Whisper в продакшен-нагрузке." },
      { term: "Realtime API", def: "API OpenAI для разговора с моделью в режиме реального времени (речь → речь без задержки)." },
      { term: "Groq", def: "Облачная платформа от Groq Inc для сверхбыстрого инференса LLM (специализированные чипы LPU)." },
      { term: "OpenClaw", def: "Платформа для создания автономных AI-ботов с памятью, личностью и множеством каналов (Telegram, Slack, Web)." }
    ]
  },
  {
    id: "dev-tools",
    icon: "🛠",
    title: "Инструменты разработки",
    terms: [
      { term: "Claude Code", def: "CLI-агент от Anthropic для разработки прямо в терминале. Читает файлы, пишет код, делает коммиты по команде." },
      { term: "Cursor", def: "IDE на базе VS Code с встроенным AI-ассистентом. Умеет автодополнять код, рефакторить и отвечать на вопросы по проекту." },
      { term: "GitHub Copilot", def: "Плагин для IDE от GitHub/Microsoft. Предлагает автодополнение кода прямо в редакторе на основе контекста файла." },
      { term: "Vibe Coding", def: "Подход к разработке: описываешь задачу на естественном языке, AI генерирует код. Ты — продюсер, AI — исполнитель." },
      { term: "CLAUDE.md", def: "Файл-инструкция в корне проекта. Claude Code читает его при старте и следует указанным правилам (язык, фреймворк, стиль)." },
      { term: "Промпт (Prompt)", def: "Текстовый запрос к AI-модели. Качество результата сильно зависит от чёткости формулировки промпта." },
      { term: "Промпт-инжиниринг", def: "Искусство составлять запросы к AI так, чтобы получать точные, полезные и предсказуемые ответы." },
      { term: "Скиллы (Skills)", def: "В Claude Code — заготовленные инструкции для выполнения определённых задач (например, /commit, /review)." },
      { term: "Тулы (Tools)", def: "Инструменты, доступные AI-агенту: чтение файлов, выполнение bash-команд, поиск по коду, веб-поиск." },
      { term: "ТЗ (техническое задание)", def: "Детальное описание задачи для разработчика или AI-агента. Чем чётче ТЗ — тем лучше результат." }
    ]
  },
  {
    id: "devops",
    icon: "🐳",
    title: "DevOps / Контейнеры",
    terms: [
      { term: "Docker", def: "Платформа контейнеризации. Упаковывает приложение со всеми зависимостями в изолированный контейнер — работает одинаково везде." },
      { term: "Docker Compose", def: "Инструмент для запуска нескольких Docker-контейнеров вместе. Конфигурируется через docker-compose.yml." },
      { term: "Dockerfile", def: "Текстовый сценарий сборки Docker-образа. Описывает базовый образ, файлы и команды для подготовки окружения." },
      { term: "Docker-образ (image)", def: "Неизменяемый шаблон контейнера. Из одного образа можно запустить сколько угодно контейнеров." },
      { term: "Контейнер", def: "Запущенный экземпляр Docker-образа. Изолированный процесс со своей файловой системой и сетью." },
      { term: "Nginx", def: "Высокопроизводительный веб-сервер и обратный прокси. Раздаёт статику, балансирует нагрузку, проксирует запросы." },
      { term: "Kubernetes (K8s)", def: "Система оркестрации контейнеров. Автоматически запускает, масштабирует и перезапускает контейнеры в кластере." },
      { term: "kubectl", def: "Командная строка для управления Kubernetes-кластером. kubectl apply -f deployment.yml — применить конфигурацию." },
      { term: "VPS", def: "Virtual Private Server — арендованный виртуальный сервер в облаке. Аналог своего компьютера, но в датацентре." },
      { term: "Деплой (Deploy)", def: "Процесс публикации приложения на сервер. Финальный шаг разработки: код попадает к реальным пользователям." },
      { term: "Продакшен (Production)", def: "Живая среда, где работает реальное приложение для пользователей. В отличие от локальной разработки и staging." },
      { term: "CI/CD", def: "Continuous Integration / Continuous Deployment — автоматизация сборки, тестирования и деплоя при каждом коммите." },
      { term: "Масштабирование", def: "Увеличение ресурсов для обработки большей нагрузки. Горизонтальное (больше серверов) или вертикальное (мощнее сервер)." },
      { term: "Отказоустойчивость", def: "Способность системы продолжать работу при частичных отказах. Docker и K8s автоматически перезапускают упавшие сервисы." }
    ]
  },
  {
    id: "network",
    icon: "🔗",
    title: "Сети / API / Архитектура",
    terms: [
      { term: "API", def: "Application Programming Interface — интерфейс для общения программ между собой. Ты отправляешь запрос, получаешь ответ." },
      { term: "REST API", def: "Архитектурный стиль API на базе HTTP. Ресурсы адресуются URL-ами, действия — методами GET/POST/PUT/DELETE." },
      { term: "HTTP", def: "Протокол передачи данных в вебе. Клиент отправляет запрос, сервер отвечает с кодом статуса (200, 404, 500...)." },
      { term: "JSON", def: "JavaScript Object Notation — текстовый формат данных. Стандарт обмена данными в REST API и конфигах." },
      { term: "GET / POST / PUT / DELETE", def: "HTTP-методы: GET — получить, POST — создать, PUT — обновить, DELETE — удалить ресурс." },
      { term: "DNS", def: "Domain Name System — телефонная книга интернета. Переводит доменное имя (spix.ru) в IP-адрес сервера." },
      { term: "Обратный прокси (Reverse Proxy)", def: "Сервер-посредник перед приложением. Nginx как обратный прокси принимает запросы и передаёт их нужному сервису." },
      { term: "Клиент-серверная архитектура", def: "Разделение на клиента (браузер, приложение), который делает запросы, и сервер, который их обрабатывает." },
      { term: "SQL", def: "Structured Query Language — язык запросов к реляционным базам данных. SELECT, INSERT, UPDATE, DELETE." },
      { term: "PostgreSQL", def: "Мощная реляционная база данных с открытым исходным кодом. Стандарт де-факто для серьёзных веб-проектов." },
      { term: "Redis", def: "Хранилище данных в оперативной памяти. Используется как кеш, очередь задач и хранилище сессий — очень быстрый." },
      { term: "SSH", def: "Secure Shell — протокол для безопасного удалённого подключения к серверу. ssh root@server — подключиться." },
      { term: "Токен (API)", def: "Ключ аутентификации для API-запросов. Передаётся в заголовке, идентифицирует пользователя или приложение." },
      { term: "Микросервисы", def: "Архитектура, где приложение разбито на маленькие независимые сервисы. Каждый деплоится и масштабируется отдельно." },
      { term: "Мультимодальные модели", def: "AI-модели, которые работают с несколькими типами данных: текст, изображения, аудио, видео." }
    ]
  },
  {
    id: "media",
    icon: "🎨",
    title: "Генерация медиа",
    terms: [
      { term: "DALL-E 3", def: "Модель генерации изображений от OpenAI. Интегрирована в ChatGPT, генерирует по текстовому описанию." },
      { term: "Midjourney", def: "Популярный генератор изображений. Работает через Discord, отличается художественным стилем и качеством." },
      { term: "Stable Diffusion", def: "Открытая модель генерации изображений. Можно запускать локально, тонко настраивать, огромная экосистема." },
      { term: "Flux", def: "Серия моделей генерации изображений от Black Forest Labs. Превосходит SD по качеству, открытый исходный код." },
      { term: "Sora", def: "Модель генерации видео от OpenAI. Создаёт реалистичные видеоролики по текстовому описанию." },
      { term: "Runway Gen-3", def: "Профессиональный инструмент генерации и редактирования видео с помощью AI. Популярен в кинопроизводстве." },
      { term: "Kling", def: "Китайская модель генерации видео. Конкурирует с Sora по качеству и длине генерируемых роликов." },
      { term: "Pika", def: "Платформа для генерации коротких видео и анимации из изображений или текста." },
      { term: "Inpainting", def: "Редактирование части изображения с помощью AI. Закрашиваешь область — AI заполняет её по контексту." },
      { term: "Outpainting", def: "Расширение изображения за его границы. AI «дорисовывает» то, что могло бы быть за краями кадра." },
      { term: "Style Transfer", def: "Перенос художественного стиля одного изображения на другое. Например, фото в стиле Ван Гога." },
      { term: "Негативный промпт", def: "Список того, что НЕ должно быть на изображении. Пример: blurry, low quality, extra fingers." },
      { term: "Seed (сид)", def: "Числовое значение для воспроизводимости генерации. Одинаковый seed + промпт = одинаковый результат." },
      { term: "IP-Adapter", def: "Технология переноса внешности/стиля с референсного изображения в Stable Diffusion. Создаёт консистентных персонажей." },
      { term: "text2video / image2video", def: "Типы генерации видео: из текстового описания или из статичного изображения (анимация)." }
    ]
  },
  {
    id: "git",
    icon: "📝",
    title: "Git и CI/CD",
    terms: [
      { term: "Git", def: "Система контроля версий. Отслеживает изменения в коде, позволяет откатиться к любой точке истории проекта." },
      { term: "Репозиторий (repo)", def: "Хранилище проекта в Git. Содержит все файлы и полную историю изменений." },
      { term: "Ветка (branch)", def: "Независимая линия разработки. main — основная, feature/* — для новых функций, hotfix/* — для срочных правок." },
      { term: "Pull Request (PR)", def: "Запрос на слияние ветки в основную. Инструмент code review: коллеги смотрят код до мерджа." },
      { term: "Merge", def: "Слияние изменений из одной ветки в другую. Происходит после одобрения Pull Request." },
      { term: "Code Review", def: "Проверка кода коллегами перед слиянием. Находит баги, улучшает качество, распространяет знания в команде." },
      { term: "GitHub / GitLab / Bitbucket", def: "Платформы для хостинга Git-репозиториев с веб-интерфейсом, PR, CI/CD и управлением задачами." },
      { term: "Пайплайн (Pipeline)", def: "Цепочка автоматических шагов при пуше кода: сборка → тесты → деплой. Описывается в YAML-файле." },
      { term: "YAML", def: "Yet Another Markup Language — формат конфигурации. Используется в Docker Compose, CI/CD, Kubernetes." },
      { term: "Argo CD", def: "GitOps-инструмент для автоматического деплоя в Kubernetes. Следит за репозиторием и синхронизирует кластер." },
      { term: "GitOps", def: "Подход к деплою: Git-репозиторий — единственный источник истины. Любое изменение в коде = автодеплой." },
      { term: "Bitbucket Pipelines", def: "CI/CD система внутри Bitbucket. Запускает тесты и деплой автоматически при коммите через bitbucket-pipelines.yml." }
    ]
  },
  {
    id: "testing",
    icon: "🧪",
    title: "Тестирование и качество кода",
    terms: [
      { term: "Unit-тесты", def: "Тесты отдельных функций/методов в изоляции. Быстрые, дешёвые, проверяют логику одного компонента." },
      { term: "Feature-тесты", def: "Тесты поведения API или модуля. Например: POST /api/login → 200 OK + токен в ответе." },
      { term: "E2E-тесты (End-to-End)", def: "Тесты через браузер от лица пользователя. click('Login') → see('Dashboard'). Медленные, но ловят настоящие баги." },
      { term: "Рефакторинг", def: "Улучшение структуры кода без изменения поведения. Убирает дублирование, большие классы, запутанную логику." },
      { term: "Single Responsibility Principle", def: "Принцип: каждый класс/функция отвечает за одно. Большие функции — признак нарушения этого принципа." },
      { term: "Копи-пейст (дублирование)", def: "Антипаттерн: один и тот же код в нескольких местах. Нужно вынести в функцию — так правки делаются в одном месте." },
      { term: "Миграции (Migrations)", def: "Версионированные изменения схемы базы данных. Позволяют воспроизвести структуру БД на любом окружении." },
      { term: "200 OK / 201 Created / 500 Error", def: "HTTP-коды статуса. 2xx — успех, 4xx — ошибка клиента, 5xx — ошибка сервера." },
      { term: "Jira / Confluence", def: "Инструменты Atlassian для управления задачами (Jira) и документации (Confluence). Стандарт в продуктовых командах." }
    ]
  },
  {
    id: "agents",
    icon: "🤖",
    title: "Агенты и боты",
    terms: [
      { term: "AI-агент", def: "Программа, которая автономно выполняет задачи с помощью AI-модели. Может использовать инструменты, принимать решения." },
      { term: "Субагент (Sub-agent)", def: "Дочерний агент, запущенный основным агентом для параллельного решения подзадачи." },
      { term: "Галлюцинация (Hallucination)", def: "Когда AI уверенно сообщает недостоверную информацию. Нужно верифицировать факты из внешних источников." },
      { term: "Контекст (Context)", def: "Вся информация, доступная модели при генерации ответа: история диалога, файлы, инструкции." },
      { term: "Контекстное окно (Context Window)", def: "Максимальный объём информации, который модель может удержать в одном запросе. Измеряется в токенах." },
      { term: "Токен", def: "Базовая единица текста для AI-модели. Примерно 0.75 слова. Цена API и лимиты измеряются в токенах." },
      { term: "Инференс (Inference)", def: "Процесс генерации ответа моделью. Чем дольше инференс — тем медленнее ответ и выше стоимость." },
      { term: "Reasoning (рассуждение)", def: "Режим работы модели, при котором она «думает» перед ответом. Дольше и дороже, но точнее для сложных задач." },
      { term: "Heartbeat", def: "В OpenClaw — регулярный «пульс» агента: агент сам инициирует действие без запроса пользователя." },
      { term: "Долгосрочная память", def: "Способность агента сохранять информацию между сессиями. Хранится в базе данных, а не в контексте." },
      { term: "Бенчмарк", def: "Стандартизированный тест для сравнения моделей. MMLU, HumanEval — примеры бенчмарков для LLM." },
      { term: "Open Source (открытый исходный код)", def: "Модели/инструменты с открытым кодом. Можно запустить локально, модифицировать, не платить за API." },
      { term: "Rate Limits", def: "Ограничения на количество API-запросов в единицу времени. Превышение → ошибка 429 Too Many Requests." },
      { term: "Транскрибация", def: "Перевод речи в текст. Speech-to-text. Whisper, Deepgram — инструменты для транскрибации." }
    ]
  }
];
```

**Step 2: Add render and search functions**

After the CATEGORIES array, add:

```javascript
function renderAll(filter) {
  const container = document.getElementById('categories');
  container.innerHTML = '';
  let totalVisible = 0;

  CATEGORIES.forEach(cat => {
    const visibleTerms = filter
      ? cat.terms.filter(t =>
          t.term.toLowerCase().includes(filter) ||
          t.def.toLowerCase().includes(filter))
      : cat.terms;

    if (visibleTerms.length === 0) return;
    totalVisible += visibleTerms.length;

    const section = document.createElement('section');
    section.className = 'category';

    section.innerHTML = `
      <h2 class="category-title">
        <span class="icon">${cat.icon}</span>
        ${cat.title}
        <span class="category-count">${visibleTerms.length}</span>
      </h2>
      <div class="cards">
        ${visibleTerms.map(t => `
          <div class="card">
            <div class="card-term">${highlight(t.term, filter)}</div>
            <div class="card-def">${highlight(t.def, filter)}</div>
          </div>
        `).join('')}
      </div>
    `;
    container.appendChild(section);
  });

  const total = CATEGORIES.reduce((s, c) => s + c.terms.length, 0);
  document.getElementById('counter').textContent =
    filter ? `${totalVisible} из ${total}` : `${total} терминов`;

  const noResults = document.getElementById('no-results');
  if (totalVisible === 0 && filter) {
    document.getElementById('query-display').textContent = filter;
    noResults.classList.add('visible');
  } else {
    noResults.classList.remove('visible');
  }
}

function highlight(text, filter) {
  if (!filter) return text;
  const re = new RegExp(`(${filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(re, '<mark>$1</mark>');
}

// Search handler
document.getElementById('search').addEventListener('input', e => {
  renderAll(e.target.value.trim().toLowerCase() || null);
});

// Initial render
renderAll(null);
```

**Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add all terms data and card rendering with search"
```

---

### Task 4: Build and run Docker, verify it works

**Step 1: Build Docker image**

```bash
docker compose build
```
Expected: `=> exporting to image` — no errors

**Step 2: Start container**

```bash
docker compose up -d
```
Expected: `Container ... Started`

**Step 3: Verify page loads**

```bash
curl -s http://localhost:8080 | grep -o "Нейрограмотность"
```
Expected: `Нейрограмотность`

**Step 4: Check container is running**

```bash
docker compose ps
```
Expected: `cheatsheet ... running`

**Step 5: Commit**

```bash
git add .
git commit -m "feat: verified docker build and run on port 8080"
```

---

## Done

After Task 4 completes, the cheat sheet is live at **http://localhost:8080** with:
- ~115 terms across 8 categories
- Live search filtering
- Dark theme
- Docker + docker-compose
