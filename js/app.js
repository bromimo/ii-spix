// ═══════════════════════════════════════════════════════
// PIP-BOY SVG ENGINE — VAULT BOY PERK ART GENERATOR
// ═══════════════════════════════════════════════════════

const G  = '#4dff91';   // phosphor green
const G2 = '#1a5c33';   // dim green
const BG = '#081408';   // screen dark

// Vault Boy base character (positioned left, accessories go right)
const VB = (la, ra, acc) => {
  const head  = `<circle cx="22" cy="13" r="8"/>`;
  const eyes  = `<circle cx="18" cy="11" r="1.5" fill="${G}" stroke="none"/><circle cx="26" cy="11" r="1.5" fill="${G}" stroke="none"/>`;
  const smile = `<path d="M17 16 Q22 20 27 16"/>`;
  const body  = `<path d="M10 28 Q14 21 22 20 Q30 21 34 28 L32 47 H12 Z"/>`;
  const num   = `<text x="22" y="39" font-size="7" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">101</text>`;
  const legs  = `<path d="M12 47 L9 62 M32 47 L35 62" stroke-width="2"/><path d="M5 62 L14 62 M31 62 L39 62" stroke-width="2.5"/>`;
  return head + eyes + smile + body + num + (la || `<path d="M10 29 L3 36 L7 40"/>`) + (ra || `<path d="M34 29 L41 35 L37 39"/>`) + legs + (acc || '');
};

// SVG wrapper
const ico = (c) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%" fill="none" stroke="${G}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="64" height="64" fill="${BG}"/>${c}</svg>`;

// Rank stars helper
function stars(n = 3) {
  return Array.from({length: 5}, (_, i) =>
    `<span class="star${i < n ? '' : ' off'}">★</span>`
  ).join('');
}

// ═══════════════════════════════════════════════════════
// PERK IMAGES — VAULT BOY ILLUSTRATIONS (104 terms)
// ═══════════════════════════════════════════════════════

const CATEGORIES = [
  {
    id: "models", icon: "🧠", title: "AI-модели и платформы",
    terms: [
      {
        term: "ChatGPT",
        def: "Чат-интерфейс от OpenAI поверх моделей GPT-4/GPT-4o. Самый популярный в мире AI-помощник для текста, кода и анализа.",
        rank: 5,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L48 18"/>`,
          `<rect x="44" y="4" width="18" height="13" rx="2"/><line x1="47" y1="8" x2="59" y2="8"/><line x1="47" y1="12" x2="56" y2="12"/><path d="M44 14 L40 20 L50 14" fill="${BG}"/>`
        ))
      },
      {
        term: "Claude",
        def: "AI-ассистент от Anthropic. Отличается большим контекстным окном и упором на безопасность. Модели: Claude Sonnet, Opus, Haiku.",
        rank: 5,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L50 22"/>`,
          `<circle cx="54" cy="16" r="7"/><circle cx="54" cy="16" r="3" fill="${G2}" stroke="${G}"/><line x1="59" y1="21" x2="63" y2="25" stroke-width="2.5"/>`
        ))
      },
      {
        term: "Gemini",
        def: "Мультимодальная AI-модель от Google. Умеет работать с текстом, изображениями, аудио и видео.",
        rank: 4,
        img: ico(
          `<circle cx="18" cy="20" r="10"/><circle cx="15" cy="18" r="1.5" fill="${G}" stroke="none"/><circle cx="22" cy="18" r="1.5" fill="${G}" stroke="none"/><path d="M13 23 Q18 27 23 23"/>` +
          `<circle cx="46" cy="20" r="10"/><circle cx="43" cy="18" r="1.5" fill="${G}" stroke="none"/><circle cx="50" cy="18" r="1.5" fill="${G}" stroke="none"/><path d="M41 23 Q46 27 51 23"/>` +
          `<path d="M28 20 L36 20" stroke-width="1"/><path d="M30 17 L26 20 L30 23" stroke-width="1"/><path d="M34 17 L38 20 L34 23" stroke-width="1"/>`+
          `<path d="M6 34 Q18 28 18 32 Q18 44 6 44 Z" stroke-width="1"/><path d="M58 34 Q46 28 46 32 Q46 44 58 44 Z" stroke-width="1"/>`
        )
      },
      {
        term: "GPT-4o",
        def: "Флагманская мультимодальная модель OpenAI. «o» = omni — принимает текст, изображения и голос, отвечает тем же.",
        rank: 5,
        img: ico(VB(
          `<path d="M10 29 L4 35"/>`,
          `<path d="M34 29 L48 28"/>`,
          `<circle cx="54" cy="28" r="6"/><path d="M54 22 L54 18 M54 34 L54 38 M48 28 L44 28" stroke-width="1"/><circle cx="54" cy="28" r="2" fill="${G}"/><path d="M48 20 Q44 14 48 10 Q52 6 56 10" stroke-width="1.5"/><path d="M48 16 Q44 12 48 8" stroke-width="1"/>`
        ))
      },
      {
        term: "GPT-4 Vision",
        def: "Версия GPT-4 с поддержкой анализа изображений. Умеет отвечать на вопросы по картинке.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L48 22"/>`,
          `<rect x="42" y="6" width="20" height="18" rx="2"/><path d="M50 15 m-5 0 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0"/><circle cx="50" cy="15" r="2" fill="${G}"/><path d="M42 9 L45 9 M62 9 L59 9" stroke-width="1"/>`
        ))
      },
      {
        term: "DeepSeek",
        def: "Серия открытых AI-моделей от китайской компании DeepSeek AI. Сопоставимы с GPT-4, но дешевле в использовании.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 38"/>`,
          `<path d="M34 29 L40 38"/>`,
          `<path d="M44 10 L52 10 L56 18 L56 30 L52 38 L44 38 L40 30 L40 18 Z" stroke-width="1.5"/><path d="M44 20 L52 20 M44 24 L52 24 M44 28 L50 28" stroke-width="1"/><path d="M48 38 L48 50 L42 56" stroke-width="1.5"/><text x="48" y="16" font-size="6" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">SEEK</text>`
        ))
      },
      {
        term: "Kimi",
        def: "AI-ассистент от компании Moonshot AI. Популярен в Китае, известен огромным контекстным окном (до 1M токенов).",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L46 20"/>`,
          `<path d="M46 14 Q52 4 58 14 Q60 20 54 22 Q50 18 46 14 Z"/><circle cx="52" cy="16" r="2" fill="${BG}" stroke="${G}"/><path d="M38 50 L44 44 M44 44 L52 52 M44 44 L44 36" stroke-width="1.5"/>`
        ))
      },
      {
        term: "Qwen",
        def: "Семейство языковых моделей от Alibaba. Открытый исходный код, мультиязычная поддержка.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 22"/>`,
          `<path d="M34 29 L40 22"/>`,
          `<path d="M48 8 L60 8 L60 20 L48 20 Z"/><path d="M50 8 L50 4 L58 4 L58 8"/><path d="M50 20 L48 26 M56 20 L58 26"/><path d="M48 26 L58 26"/><text x="54" y="16" font-size="6" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">QW</text><path d="M38 44 Q44 36 52 44 Q44 52 38 44 Z" stroke-width="1"/>`
        ))
      },
      {
        term: "ElevenLabs",
        def: "Платформа для клонирования голоса и синтеза речи. Генерирует реалистичную озвучку на 30+ языках.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 24"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<path d="M44 12 Q44 8 48 8 Q52 8 52 12 L52 22 Q52 26 48 26 Q44 26 44 22 Z"/><line x1="48" y1="26" x2="48" y2="30"/><path d="M42 30 L54 30"/><path d="M40 18 Q38 22 40 26" stroke-width="1.5"/><path d="M37 15 Q34 22 37 29" stroke-width="1"/><path d="M56 18 Q58 22 56 26" stroke-width="1.5"/><path d="M59 15 Q62 22 59 29" stroke-width="1"/>`
        ))
      },
      {
        term: "OpenAI TTS",
        def: "Text-to-Speech API от OpenAI. Преобразует текст в речь с выбором голоса и скорости.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L5 24"/>`,
          `<path d="M34 29 L44 28"/>`,
          `<path d="M46 22 L46 32 L54 36 L54 18 Z"/><path d="M54 22 Q60 22 60 28 Q60 34 54 34" stroke-width="1.5"/><path d="M54 18 Q64 18 64 28 Q64 38 54 38" stroke-width="1"/><line x1="38" y1="44" x2="58" y2="44" stroke-width="1"/><line x1="40" y1="48" x2="54" y2="48" stroke-width="1"/><line x1="38" y1="52" x2="50" y2="52" stroke-width="1"/>`
        ))
      },
      {
        term: "Whisper",
        def: "Открытая модель от OpenAI для распознавания речи (speech-to-text). Работает офлайн, поддерживает 90+ языков.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L5 36"/>`,
          `<path d="M34 29 L46 28"/>`,
          `<path d="M46 20 Q46 14 50 12 Q56 10 58 16 Q60 22 56 26 Q52 30 48 28 Q44 26 46 20 Z"/><path d="M50 10 Q50 4 56 4 Q62 4 62 10"/><path d="M38 44 Q42 40 48 42 Q54 44 52 50 Q50 56 44 54 Q38 52 38 44 Z" stroke-width="1"/>`
        ))
      },
      {
        term: "Deepgram",
        def: "Облачный сервис распознавания речи в реальном времени. Быстрее и дешевле Whisper в продакшен-нагрузке.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<rect x="40" y="10" width="22" height="14" rx="2"/><path d="M42 14 L44 14 M42 18 L48 18 M42 22 L46 22" stroke-width="1"/><path d="M56 14 Q62 14 62 20 Q62 24 58 24" stroke-width="1.5"/><path d="M42 28 L60 28 M44 32 L58 32 M46 36 L56 36 M48 40 L54 40" stroke-width="1"/>`
        ))
      },
      {
        term: "Realtime API",
        def: "API OpenAI для разговора с моделью в режиме реального времени (речь → речь без задержки).",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L4 26"/>`,
          `<path d="M34 29 L46 22"/>`,
          `<path d="M46 20 L52 14 L58 20 L52 26 Z"/><path d="M52 8 L52 12" stroke-width="2"/><path d="M52 26 L52 30" stroke-width="2"/><path d="M40 16 Q38 10 44 8" stroke-width="1.5"/><path d="M60 16 Q62 10 56 8" stroke-width="1.5"/><path d="M40 50 L60 50 M40 54 L56 54 M42 46 Q52 40 62 46" stroke-width="1"/>`
        ))
      },
      {
        term: "Groq",
        def: "Облачная платформа от Groq Inc для сверхбыстрого инференса LLM (специализированные чипы LPU).",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L8 40"/>`,
          `<path d="M34 29 L38 40"/>`,
          `<path d="M44 50 L44 24 L58 10 L62 14 L50 26 L50 50 Z"/><path d="M44 24 L50 26"/><path d="M44 30 L50 32 M44 36 L50 38 M44 42 L50 44" stroke-width="1"/><path d="M56 8 L62 8 L62 14" stroke-width="1.5"/>`
        ))
      },
      {
        term: "OpenClaw",
        def: "Платформа для создания автономных AI-ботов с памятью, личностью и множеством каналов (Telegram, Slack, Web).",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L44 22"/>`,
          `<path d="M44 14 L50 8 L56 14 L62 8"/><path d="M50 14 L50 28 Q50 34 44 36 Q38 38 38 44" stroke-width="1.5"/><circle cx="44" cy="38" r="4"/><path d="M40 38 L36 34 M48 38 L52 34 M44 42 L44 46" stroke-width="1.5"/>`
        ))
      }
    ]
  },

  {
    id: "dev-tools", icon: "🛠", title: "Инструменты разработки",
    terms: [
      {
        term: "Claude Code",
        def: "CLI-агент от Anthropic для разработки прямо в терминале. Читает файлы, пишет код, делает коммиты по команде.",
        rank: 5,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<rect x="38" y="8" width="24" height="22" rx="2"/><text x="50" y="17" font-size="6" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">&gt;_</text><line x1="40" y1="22" x2="60" y2="22"/><text x="50" y="28" font-size="5" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">claude</text>`
        ))
      },
      {
        term: "Cursor",
        def: "IDE на базе VS Code с встроенным AI-ассистентом. Умеет автодополнять код, рефакторить и отвечать на вопросы по проекту.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L46 20"/>`,
          `<rect x="40" y="6" width="22" height="20" rx="1"/><path d="M43 12 L55 12 M43 16 L52 16 M43 20 L50 20" stroke-width="1"/><path d="M56 20 L60 28 L52 28 Z" fill="${G}"/>`
        ))
      },
      {
        term: "GitHub Copilot",
        def: "Плагин для IDE от GitHub/Microsoft. Предлагает автодополнение кода прямо в редакторе на основе контекста файла.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 24"/>`,
          `<path d="M34 29 L40 22"/>`,
          `<circle cx="52" cy="16" r="10"/><path d="M44 20 Q48 10 52 10 Q56 10 60 20"/><circle cx="48" cy="20" r="2.5"/><circle cx="56" cy="20" r="2.5"/><path d="M48 22 Q52 26 56 22" stroke-width="1.5"/>`
        ))
      },
      {
        term: "Vibe Coding",
        def: "Подход к разработке: описываешь задачу на естественном языке, AI генерирует код. Ты — продюсер, AI — исполнитель.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L8 22"/>`,
          `<path d="M34 29 L36 22"/>`,
          `<path d="M44 14 Q44 8 48 6 Q54 4 56 10 Q58 16 54 18 Q50 20 46 18"/><path d="M50 6 L52 2"/><path d="M38 50 Q44 44 52 48 Q60 52 56 58" stroke-width="2"/><path d="M40 46 Q48 40 56 44" stroke-width="1"/>`
        ))
      },
      {
        term: "CLAUDE.md",
        def: "Файл-инструкция в корне проекта. Claude Code читает его при старте и следует указанным правилам (язык, фреймворк, стиль).",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L46 26"/>`,
          `<rect x="42" y="6" width="20" height="26" rx="2"/><line x1="45" y1="11" x2="59" y2="11"/><line x1="45" y1="15" x2="57" y2="15"/><line x1="45" y1="19" x2="59" y2="19"/><line x1="45" y1="23" x2="55" y2="23"/><path d="M54 6 L62 6 L62 14" stroke-width="1"/><path d="M52 28 L52 36 L44 36" stroke-width="1.5"/>`
        ))
      },
      {
        term: "Промпт (Prompt)",
        def: "Текстовый запрос к AI-модели. Качество результата сильно зависит от чёткости формулировки промпта.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L44 20"/>`,
          `<rect x="40" y="4" width="22" height="18" rx="3"/><path d="M40 18 L36 24 L44 18" fill="${BG}"/><text x="51" y="12" font-size="7" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">...</text><text x="51" y="18" font-size="5" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">PROMPT</text>`
        ))
      },
      {
        term: "Промпт-инжиниринг",
        def: "Искусство составлять запросы к AI так, чтобы получать точные, полезные и предсказуемые ответы.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L46 24"/>`,
          `<path d="M44 36 Q44 28 50 26 Q56 24 58 30 Q60 36 56 40 Q52 44 48 42"/><path d="M46 40 L42 50 L46 48 L44 58" stroke-width="2"/><circle cx="50" cy="34" r="3" fill="${G2}" stroke="${G}"/>`
        ))
      },
      {
        term: "Скиллы (Skills)",
        def: "В Claude Code — заготовленные инструкции для выполнения определённых задач (например, /commit, /review).",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<circle cx="52" cy="18" r="4"/><path d="M52 22 L52 28"/><path d="M46 28 L58 28"/><path d="M46 28 L44 36 M58 28 L60 36"/><path d="M44 36 L60 36"/><path d="M44 36 L42 44 M60 36 L62 44"/><text x="52" y="21" font-size="5" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">SK</text>`
        ))
      },
      {
        term: "Тулы (Tools)",
        def: "Инструменты, доступные AI-агенту: чтение файлов, выполнение bash-команд, поиск по коду, веб-поиск.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L46 22"/>`,
          `<path d="M46 24 L60 10 L62 12 L48 26"/><circle cx="44" cy="28" r="4"/><path d="M56 14 L60 10 L62 12 L58 16 Z" fill="${G2}"/><path d="M42 44 L46 40 L58 52 L54 56 Z"/><circle cx="56" cy="42" r="2"/>`
        ))
      },
      {
        term: "ТЗ (техническое задание)",
        def: "Детальное описание задачи для разработчика или AI-агента. Чем чётче ТЗ — тем лучше результат.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L46 26"/>`,
          `<rect x="40" y="6" width="22" height="30" rx="2"/><line x1="43" y1="11" x2="59" y2="11" stroke-width="1"/><line x1="43" y1="15" x2="57" y2="15" stroke-width="1"/><line x1="43" y1="19" x2="59" y2="19" stroke-width="1"/><line x1="43" y1="23" x2="55" y2="23" stroke-width="1"/><rect x="43" y="27" width="6" height="4" rx="1"/><path d="M52 29 L59 29" stroke-width="1"/>`
        ))
      }
    ]
  },

  {
    id: "devops", icon: "🐳", title: "DevOps / Контейнеры",
    terms: [
      {
        term: "Docker",
        def: "Платформа контейнеризации. Упаковывает приложение со всеми зависимостями в изолированный контейнер — работает одинаково везде.",
        rank: 5,
        img: ico(VB(
          `<path d="M10 29 L5 34"/>`,
          `<path d="M34 29 L44 24"/>`,
          `<path d="M40 36 Q48 26 58 30 Q66 34 58 42 Q48 50 36 44 Z"/><circle cx="50" cy="36" r="3" fill="${G2}" stroke="${G}"/><path d="M42 32 L44 28 L48 30"/><path d="M50 30 Q56 28 60 34"/>`
        ))
      },
      {
        term: "Docker Compose",
        def: "Инструмент для запуска нескольких Docker-контейнеров вместе. Конфигурируется через docker-compose.yml.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<rect x="40" y="8" width="14" height="10" rx="1"/><rect x="42" y="20" width="14" height="10" rx="1"/><rect x="40" y="32" width="14" height="10" rx="1"/><path d="M47 18 L47 20 M49 30 L49 32" stroke-width="1.5"/>`
        ))
      },
      {
        term: "Dockerfile",
        def: "Текстовый сценарий сборки Docker-образа. Описывает базовый образ, файлы и команды для подготовки окружения.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L46 26"/>`,
          `<rect x="40" y="6" width="22" height="28" rx="2"/><text x="51" y="13" font-size="5" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">FROM</text><line x1="42" y1="15" x2="60" y2="15"/><text x="51" y="21" font-size="5" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">COPY</text><text x="51" y="27" font-size="5" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">RUN</text><text x="51" y="31" font-size="5" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">EXPOSE</text>`
        ))
      },
      {
        term: "Docker-образ (image)",
        def: "Неизменяемый шаблон контейнера. Из одного образа можно запустить сколько угодно контейнеров.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<rect x="40" y="10" width="22" height="18" rx="2"/><path d="M44 14 L44 24 M48 12 L48 24 M52 14 L52 24 M56 12 L56 24 M60 14 L60 24" stroke-width="1"/><path d="M38 32 L42 36 L46 32 M50 36 L54 32 L58 36 L62 32" stroke-width="1.5"/>`
        ))
      },
      {
        term: "Контейнер",
        def: "Запущенный экземпляр Docker-образа. Изолированный процесс со своей файловой системой и сетью.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L42 26"/>`,
          `<rect x="38" y="10" width="24" height="30" rx="2"/><path d="M38 18 L62 18 M38 26 L62 26"/><circle cx="44" cy="40" r="2"/><circle cx="50" cy="40" r="2"/><circle cx="56" cy="40" r="2"/>`
        ))
      },
      {
        term: "Nginx",
        def: "Высокопроизводительный веб-сервер и обратный прокси. Раздаёт статику, балансирует нагрузку, проксирует запросы.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 24"/>`,
          `<path d="M44 10 L44 42 M62 10 L62 42"/><path d="M44 10 L62 42 M62 10 L44 42" stroke-width="1"/><path d="M38 16 Q44 12 50 14"/><path d="M56 14 Q62 12 68 16" stroke-width="1"/>`
        ))
      },
      {
        term: "Kubernetes (K8s)",
        def: "Система оркестрации контейнеров. Автоматически запускает, масштабирует и перезапускает контейнеры в кластере.",
        rank: 5,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L42 24"/>`,
          `<circle cx="52" cy="22" r="12"/><circle cx="52" cy="22" r="4"/><path d="M52 10 L52 6 M52 34 L52 38 M40 22 L36 22 M64 22 L68 22 M44 14 L41 11 M60 30 L63 33 M60 14 L63 11 M44 30 L41 33" stroke-width="1.5"/>`
        ))
      },
      {
        term: "kubectl",
        def: "Командная строка для управления Kubernetes-кластером. kubectl apply -f deployment.yml — применить конфигурацию.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<rect x="38" y="8" width="24" height="20" rx="2"/><text x="50" y="16" font-size="5" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">kubectl</text><text x="50" y="23" font-size="5" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">apply -f</text><path d="M40 44 L60 44 M40 48 L56 48" stroke-width="1"/>`
        ))
      },
      {
        term: "VPS",
        def: "Virtual Private Server — арендованный виртуальный сервер в облаке. Аналог своего компьютера, но в датацентре.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 22"/>`,
          `<path d="M44 6 Q52 2 60 6 Q64 10 60 14 Q52 18 44 14 Q40 10 44 6 Z"/><path d="M44 10 L44 18 M60 10 L60 18"/><rect x="42" y="18" width="20" height="12" rx="1"/><circle cx="46" cy="24" r="2"/><line x1="50" y1="24" x2="58" y2="24"/>`
        ))
      },
      {
        term: "Деплой (Deploy)",
        def: "Процесс публикации приложения на сервер. Финальный шаг разработки: код попадает к реальным пользователям.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L8 40"/>`,
          `<path d="M34 29 L38 40"/>`,
          `<path d="M50 56 L50 28 L46 32 M50 28 L54 32"/><path d="M44 50 Q50 44 56 50"/><path d="M46 56 Q50 52 54 56"/><path d="M42 44 L44 42 L56 42 L58 44 Q58 48 54 50 Q50 52 46 50 Q42 48 42 44 Z"/>`
        ))
      },
      {
        term: "Продакшен (Production)",
        def: "Живая среда, где работает реальное приложение для пользователей. В отличие от локальной разработки и staging.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<rect x="38" y="14" width="24" height="20" rx="2"/><path d="M42 18 L48 18 L48 30 M54 18 L60 18 M54 22 L58 22"/><path d="M38 34 Q50 42 62 34" stroke-width="1.5"/><path d="M42 44 L42 52 M58 44 L58 52 M42 52 L58 52" stroke-width="1.5"/>`
        ))
      },
      {
        term: "CI/CD",
        def: "Continuous Integration / Continuous Deployment — автоматизация сборки, тестирования и деплоя при каждом коммите.",
        rank: 5,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<path d="M38 28 L62 28"/><path d="M58 24 L62 28 L58 32" stroke-width="1.5"/><circle cx="42" cy="28" r="3" fill="${G2}" stroke="${G}"/><circle cx="50" cy="28" r="3" fill="${G2}" stroke="${G}"/><circle cx="58" cy="28" r="3" fill="${BG}" stroke="${G}"/><text x="42" y="44" font-size="5" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">BUILD</text><text x="50" y="44" font-size="5" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">TEST</text><text x="58" y="44" font-size="5" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">DEPLOY</text>`
        ))
      },
      {
        term: "Масштабирование",
        def: "Увеличение ресурсов для обработки большей нагрузки. Горизонтальное (больше серверов) или вертикальное (мощнее сервер).",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L8 40"/>`,
          `<path d="M34 29 L44 22"/>`,
          `<rect x="40" y="38" width="8" height="12" rx="1"/><rect x="50" y="28" width="8" height="22" rx="1"/><path d="M58 18 L58 6 L62 10 M58 6 L54 10" stroke-width="1.5"/><path d="M40 38 L62 38" stroke-width="1"/>`
        ))
      },
      {
        term: "Отказоустойчивость",
        def: "Способность системы продолжать работу при частичных отказах. Docker и K8s автоматически перезапускают упавшие сервисы.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L46 22"/>`,
          `<path d="M44 32 Q44 14 52 12 Q60 10 62 22 Q64 34 56 40 Q48 46 44 38 L44 32"/><path d="M52 28 L52 36 M48 32 L56 32" stroke-width="1.5"/>`
        ))
      }
    ]
  },

  {
    id: "network", icon: "🔗", title: "Сети / API / Архитектура",
    terms: [
      {
        term: "API",
        def: "Application Programming Interface — интерфейс для общения программ между собой. Ты отправляешь запрос, получаешь ответ.",
        rank: 5,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L46 28"/>`,
          `<path d="M46 22 L50 22 L50 34 L46 34"/><path d="M58 22 L54 22 L54 34 L58 34"/><line x1="50" y1="28" x2="54" y2="28" stroke-width="2"/><path d="M44 18 L48 18 Q52 18 52 22"/><path d="M60 18 L56 18 Q52 18 52 22"/>`
        ))
      },
      {
        term: "REST API",
        def: "Архитектурный стиль API на базе HTTP. Ресурсы адресуются URL-ами, действия — методами GET/POST/PUT/DELETE.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L44 24"/>`,
          `<rect x="38" y="8" width="24" height="30" rx="2"/><text x="50" y="15" font-size="5" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">GET</text><text x="50" y="21" font-size="5" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">POST</text><text x="50" y="27" font-size="5" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">PUT</text><text x="50" y="33" font-size="5" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">DELETE</text>`
        ))
      },
      {
        term: "HTTP",
        def: "Протокол передачи данных в вебе. Клиент отправляет запрос, сервер отвечает с кодом статуса (200, 404, 500...).",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L46 28"/>`,
          `<rect x="36" y="20" width="10" height="8" rx="1"/><rect x="54" y="20" width="10" height="8" rx="1"/><path d="M46 24 L54 24"/><path d="M50 20 L52 16 M50 28 L52 32" stroke-width="1.5"/><path d="M48 14 L52 14 M48 34 L52 34" stroke-width="1"/><text x="41" y="26" font-size="5" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">REQ</text><text x="59" y="26" font-size="5" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">RES</text>`
        ))
      },
      {
        term: "JSON",
        def: "JavaScript Object Notation — текстовый формат данных. Стандарт обмена данными в REST API и конфигах.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<text x="52" y="20" font-size="18" text-anchor="middle" fill="none" stroke="${G}" stroke-width="1.5" font-family="monospace">{ }</text><text x="52" y="32" font-size="7" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">JSON</text><path d="M40 44 L60 44 M40 48 L54 48" stroke-width="1"/>`
        ))
      },
      {
        term: "GET / POST / PUT / DELETE",
        def: "HTTP-методы: GET — получить, POST — создать, PUT — обновить, DELETE — удалить ресурс.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<rect x="38" y="6" width="11" height="7" rx="1"/><rect x="51" y="6" width="11" height="7" rx="1"/><rect x="38" y="15" width="11" height="7" rx="1"/><rect x="51" y="15" width="11" height="7" rx="1"/><text x="43" y="11" font-size="4" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">GET</text><text x="56" y="11" font-size="4" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">POST</text><text x="43" y="20" font-size="4" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">PUT</text><text x="56" y="20" font-size="4" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">DEL</text>`
        ))
      },
      {
        term: "DNS",
        def: "Domain Name System — телефонная книга интернета. Переводит доменное имя (spix.ru) в IP-адрес сервера.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L44 22"/>`,
          `<path d="M44 10 Q52 4 60 10 Q66 18 60 26 Q52 32 44 26 Q38 18 44 10 Z"/><line x1="44" y1="18" x2="60" y2="18" stroke-width="1"/><path d="M52 10 Q46 14 46 18 Q46 22 52 26" stroke-width="1"/><path d="M52 10 Q58 14 58 18 Q58 22 52 26" stroke-width="1"/><path d="M44 36 L50 44 L56 36" stroke-width="1.5"/>`
        ))
      },
      {
        term: "Обратный прокси (Reverse Proxy)",
        def: "Сервер-посредник перед приложением. Nginx как обратный прокси принимает запросы и передаёт их нужному сервису.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L42 26"/>`,
          `<path d="M40 20 L44 16 L48 20 L44 24 Z"/><path d="M36 20 L40 20 M48 20 L52 18 M48 20 L52 22"/><path d="M52 18 L58 14 L62 18"/><path d="M52 22 L58 26 L62 22"/><circle cx="58" cy="16" r="2"/><circle cx="58" cy="24" r="2"/>`
        ))
      },
      {
        term: "Клиент-серверная архитектура",
        def: "Разделение на клиента (браузер, приложение), который делает запросы, и сервер, который их обрабатывает.",
        rank: 3,
        img: ico(
          `<rect x="4" y="18" width="18" height="14" rx="2"/><rect x="6" y="32" width="14" height="4" rx="1"/><path d="M10 36 L10 40 M16 36 L16 40"/><rect x="42" y="14" width="20" height="18" rx="2"/><rect x="44" y="32" width="16" height="6" rx="1"/><path d="M22 26 L42 26"/><path d="M34 22 L42 26 L34 30" stroke-width="1.5"/><path d="M30 22 L22 26 L30 30" stroke-width="1.5"/>`
        )
      },
      {
        term: "SQL",
        def: "Structured Query Language — язык запросов к реляционным базам данных. SELECT, INSERT, UPDATE, DELETE.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<path d="M44 12 Q52 8 60 12 L60 22 Q52 26 44 22 Z"/><path d="M44 17 Q52 21 60 17" stroke-width="1"/><path d="M44 22 L44 32 M60 22 L60 32"/><path d="M44 27 Q52 31 60 27" stroke-width="1"/><path d="M44 32 Q52 36 60 32"/><text x="52" y="44" font-size="6" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">SELECT *</text>`
        ))
      },
      {
        term: "PostgreSQL",
        def: "Мощная реляционная база данных с открытым исходным кодом. Стандарт де-факто для серьёзных веб-проектов.",
        rank: 5,
        img: ico(VB(
          `<path d="M10 29 L5 34"/>`,
          `<path d="M34 29 L42 24"/>`,
          `<circle cx="54" cy="22" r="10"/><path d="M46 18 Q50 10 56 10 Q62 10 62 16"/><circle cx="50" cy="24" r="2.5"/><circle cx="58" cy="24" r="2.5"/><path d="M50 26 Q54 30 58 26"/><path d="M62 16 L62 26 L58 28"/>`
        ))
      },
      {
        term: "Redis",
        def: "Хранилище данных в оперативной памяти. Используется как кеш, очередь задач и хранилище сессий — очень быстрый.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 22"/>`,
          `<path d="M44 10 L52 4 L60 10 L52 16 Z" fill="${G2}" stroke="${G}"/><path d="M44 24 Q52 20 60 24 Q52 28 44 24 Z"/><path d="M44 10 L44 24 M60 10 L60 24"/><path d="M44 28 Q52 24 60 28 Q52 32 44 28 Z" stroke-width="1"/>`
        ))
      },
      {
        term: "SSH",
        def: "Secure Shell — протокол для безопасного удалённого подключения к серверу. ssh root@server — подключиться.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L46 22"/>`,
          `<circle cx="52" cy="14" r="6"/><path d="M52 20 L52 28 L46 34 L46 38 M52 28 L58 34"/><path d="M44 38 L48 38 M56 34 L60 34" stroke-width="2"/>`
        ))
      },
      {
        term: "Токен (API)",
        def: "Ключ аутентификации для API-запросов. Передаётся в заголовке, идентифицирует пользователя или приложение.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L5 34"/>`,
          `<path d="M34 29 L46 26"/>`,
          `<path d="M44 16 Q44 10 50 10 Q56 10 56 16 L56 22 Q56 28 50 28 Q44 28 44 22 Z"/><path d="M50 28 L50 36"/><path d="M44 36 L56 36"/><path d="M44 36 L40 44 M56 36 L60 44"/>`
        ))
      },
      {
        term: "Микросервисы",
        def: "Архитектура, где приложение разбито на маленькие независимые сервисы. Каждый деплоится и масштабируется отдельно.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<rect x="38" y="4" width="8" height="8" rx="1"/><rect x="48" y="4" width="8" height="8" rx="1"/><rect x="58" y="4" width="8" height="8" rx="1"/><rect x="48" y="22" width="8" height="8" rx="1"/><path d="M42 12 L52 22 M56 12 L52 22 M62 12 L56 22"/><path d="M52 30 L52 38"/>`
        ))
      },
      {
        term: "Мультимодальные модели",
        def: "AI-модели, которые работают с несколькими типами данных: текст, изображения, аудио, видео.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<rect x="40" y="6" width="8" height="8" rx="1"/><text x="44" y="12" font-size="6" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">T</text><rect x="52" y="6" width="8" height="8" rx="1"/><circle cx="56" cy="10" r="2" fill="${G2}" stroke="${G}"/><rect x="40" y="18" width="8" height="8" rx="1"/><path d="M42 22 L46 20 L46 24 Z" fill="${G}"/><rect x="52" y="18" width="8" height="8" rx="1"/><path d="M54 20 Q56 18 58 20 Q60 22 58 24 Q56 26 54 24" stroke-width="1"/><path d="M44 14 L44 18 M56 14 L56 18 M44 26 L52 26 M56 26 L60 22" stroke-width="1"/>`
        ))
      }
    ]
  },

  {
    id: "media", icon: "🎨", title: "Генерация медиа",
    terms: [
      {
        term: "DALL-E 3",
        def: "Модель генерации изображений от OpenAI. Интегрирована в ChatGPT, генерирует по текстовому описанию.",
        rank: 5,
        img: ico(VB(
          `<path d="M10 29 L5 34"/>`,
          `<path d="M34 29 L46 20"/>`,
          `<path d="M48 18 Q52 10 58 14 Q64 18 60 24 Q56 28 52 24"/><circle cx="55" cy="18" r="3" fill="${G2}" stroke="${G}"/><path d="M44 36 L62 36 L58 52 L48 52 Z"/><path d="M46 44 Q54 40 62 44" stroke-width="1"/>`
        ))
      },
      {
        term: "Midjourney",
        def: "Популярный генератор изображений. Работает через Discord, отличается художественным стилем и качеством.",
        rank: 5,
        img: ico(VB(
          `<path d="M10 29 L8 40"/>`,
          `<path d="M34 29 L38 40"/>`,
          `<path d="M40 56 L50 10 L60 56"/><path d="M44 44 L50 22 L56 44"/><path d="M42 50 L58 50" stroke-width="1"/>`
        ))
      },
      {
        term: "Stable Diffusion",
        def: "Открытая модель генерации изображений. Можно запускать локально, тонко настраивать, огромная экосистема.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L44 24"/>`,
          `<circle cx="52" cy="24" r="14"/><path d="M40 18 Q52 10 64 18"/><path d="M38 24 Q52 16 66 24"/><path d="M40 30 Q52 22 64 30"/><path d="M42 36 Q52 30 62 36"/>`
        ))
      },
      {
        term: "Flux",
        def: "Серия моделей генерации изображений от Black Forest Labs. Превосходит SD по качеству, открытый исходный код.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 22"/>`,
          `<path d="M42 8 Q60 8 60 28 Q60 48 42 48 Q52 28 42 8 Z"/><path d="M46 12 Q58 12 58 28 Q58 44 46 44"/>`
        ))
      },
      {
        term: "Sora",
        def: "Модель генерации видео от OpenAI. Создаёт реалистичные видеоролики по текстовому описанию.",
        rank: 5,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<rect x="38" y="12" width="22" height="18" rx="2"/><path d="M60 16 L64 14 L64 26 L60 24"/><circle cx="44" cy="21" r="3" fill="${G2}" stroke="${G}"/><path d="M44 18 L52 21 L44 24 Z" fill="${G}"/>`
        ))
      },
      {
        term: "Runway Gen-3",
        def: "Профессиональный инструмент генерации и редактирования видео с помощью AI. Популярен в кинопроизводстве.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 24"/>`,
          `<rect x="38" y="10" width="26" height="20" rx="2"/><path d="M42 14 L50 20 L42 26 Z" fill="${G}"/><path d="M38 34 L64 34 M40 38 L62 38 M42 42 L60 42" stroke-width="1"/>`
        ))
      },
      {
        term: "Kling",
        def: "Китайская модель генерации видео. Конкурирует с Sora по качеству и длине генерируемых роликов.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 24"/>`,
          `<path d="M50 8 Q60 8 60 18 Q60 28 50 28 Q40 28 40 18 Q40 8 50 8 Z"/><path d="M46 14 L50 18 L46 22 M54 14 L50 18 L54 22"/><path d="M46 32 L46 44 M54 32 L54 44 M46 44 L54 44"`
        ))
      },
      {
        term: "Pika",
        def: "Платформа для генерации коротких видео и анимации из изображений или текста.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 22"/>`,
          `<path d="M50 6 L56 18 L44 18 Z" fill="${G2}" stroke="${G}"/><path d="M50 18 L50 28"/><rect x="44" y="28" width="12" height="10" rx="2"/><path d="M44 40 Q50 44 56 40" stroke-width="1.5"/>`
        ))
      },
      {
        term: "Inpainting",
        def: "Редактирование части изображения с помощью AI. Закрашиваешь область — AI заполняет её по контексту.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L4 32"/>`,
          `<path d="M34 29 L46 20"/>`,
          `<rect x="40" y="8" width="22" height="22" rx="2"/><rect x="46" y="14" width="10" height="10" rx="1" fill="${G2}" stroke="${G}" stroke-dasharray="2 1"/><path d="M46 28 L48 32"/><circle cx="44" cy="36" r="4"/>`
        ))
      },
      {
        term: "Outpainting",
        def: "Расширение изображения за его границы. AI «дорисовывает» то, что могло бы быть за краями кадра.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L4 32"/>`,
          `<path d="M34 29 L46 24"/>`,
          `<rect x="44" y="14" width="14" height="14" rx="1"/><path d="M40 18 L44 18 M62 18 L58 18 M44 11 L44 14 M58 11 L58 14 M44 28 L44 32 M58 28 L58 32" stroke-width="1.5"/><path d="M38 14 L40 18 M38 28 L40 24 M60 14 L58 18 M60 28 L58 24" stroke-width="1"/>`
        ))
      },
      {
        term: "Style Transfer",
        def: "Перенос художественного стиля одного изображения на другое. Например, фото в стиле Ван Гога.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L44 24"/>`,
          `<rect x="38" y="8" width="12" height="12" rx="1"/><rect x="52" y="8" width="12" height="12" rx="1"/><path d="M50 14 L52 14 M42 18 Q50 22 52 18" stroke-width="1.5"/><path d="M42 22 Q48 30 56 22"/><path d="M40 10 Q44 6 48 10" stroke-width="1"/><path d="M54 10 Q58 6 62 10 Q58 14 54 10" stroke-width="1"/>`
        ))
      },
      {
        term: "Негативный промпт",
        def: "Список того, что НЕ должно быть на изображении. Пример: blurry, low quality, extra fingers.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<circle cx="52" cy="20" r="12"/><line x1="44" y1="12" x2="60" y2="28" stroke-width="3"/><line x1="44" y1="28" x2="60" y2="12" stroke-width="2"/>`
        ))
      },
      {
        term: "Seed (сид)",
        def: "Числовое значение для воспроизводимости генерации. Одинаковый seed + промпт = одинаковый результат.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 22"/>`,
          `<path d="M52 12 Q58 6 60 14 Q62 22 54 24 Q46 26 46 18 Q46 10 52 12 Z"/><path d="M52 24 L52 34"/><path d="M46 30 Q52 34 58 30"/><path d="M44 40 Q52 36 60 40"/>`
        ))
      },
      {
        term: "IP-Adapter",
        def: "Технология переноса внешности/стиля с референсного изображения в Stable Diffusion. Создаёт консистентных персонажей.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<circle cx="44" cy="16" r="5"/><path d="M38 26 Q38 22 44 21 Q50 22 50 26"/><path d="M50 20 L58 16"/><circle cx="60" cy="12" r="5"/><path d="M54 22 Q54 18 60 17 Q66 18 66 22"/>`
        ))
      },
      {
        term: "text2video / image2video",
        def: "Типы генерации видео: из текстового описания или из статичного изображения (анимация).",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<rect x="38" y="8" width="10" height="10" rx="1"/><text x="43" y="15" font-size="5" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">TXT</text><path d="M48 13 L54 13"/><path d="M52 10 L56 13 L52 16" stroke-width="1.5"/><rect x="54" y="8" width="10" height="10" rx="1"/><path d="M56 12 L60 10 L60 16 L56 14 Z" fill="${G2}" stroke="${G}"/><path d="M42 22 Q50 18 58 22 Q50 26 42 22 Z" stroke-width="1"/>`
        ))
      }
    ]
  },

  {
    id: "git", icon: "📝", title: "Git и CI/CD",
    terms: [
      {
        term: "Git",
        def: "Система контроля версий. Отслеживает изменения в коде, позволяет откатиться к любой точке истории проекта.",
        rank: 5,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 22"/>`,
          `<circle cx="52" cy="10" r="4"/><circle cx="44" cy="24" r="4"/><circle cx="60" cy="24" r="4"/><path d="M52 14 L48 20 M52 14 L56 20" stroke-width="1.5"/><path d="M44 28 L44 36 Q44 44 52 44"/><text x="52" y="48" font-size="5" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">main</text>`
        ))
      },
      {
        term: "Репозиторий (repo)",
        def: "Хранилище проекта в Git. Содержит все файлы и полную историю изменений.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<path d="M40 10 L54 10 L62 18 L62 46 L40 46 Z"/><path d="M54 10 L54 18 L62 18"/><line x1="44" y1="24" x2="58" y2="24" stroke-width="1"/><line x1="44" y1="29" x2="58" y2="29" stroke-width="1"/><line x1="44" y1="34" x2="54" y2="34" stroke-width="1"/>`
        ))
      },
      {
        term: "Ветка (branch)",
        def: "Независимая линия разработки. main — основная, feature/* — для новых функций, hotfix/* — для срочных правок.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 22"/>`,
          `<path d="M50 56 L50 30"/><circle cx="50" cy="26" r="4"/><path d="M50 30 L44 18"/><circle cx="44" cy="14" r="4"/><path d="M50 30 L60 22"/><circle cx="60" cy="18" r="4"/><text x="44" y="8" font-size="4" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">feat</text><text x="60" y="12" font-size="4" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">fix</text>`
        ))
      },
      {
        term: "Pull Request (PR)",
        def: "Запрос на слияние ветки в основную. Инструмент code review: коллеги смотрят код до мерджа.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 22"/>`,
          `<circle cx="44" cy="12" r="4"/><circle cx="60" cy="12" r="4"/><circle cx="52" cy="36" r="4"/><path d="M44 16 L48 32 M60 16 L56 32" stroke-width="1.5"/><path d="M48 32 L56 32"/><path d="M52 40 L52 50" stroke-width="1.5"/>`
        ))
      },
      {
        term: "Merge",
        def: "Слияние изменений из одной ветки в другую. Происходит после одобрения Pull Request.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 24"/>`,
          `<path d="M44 8 L44 28 Q44 36 52 38"/><path d="M60 8 L60 28 Q60 36 52 38"/><circle cx="52" cy="40" r="4"/><path d="M52 44 L52 54" stroke-width="1.5"/><path d="M40 8 L48 8 M56 8 L64 8" stroke-width="1"/>`
        ))
      },
      {
        term: "Code Review",
        def: "Проверка кода коллегами перед слиянием. Находит баги, улучшает качество, распространяет знания в команде.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L46 20"/>`,
          `<rect x="40" y="8" width="20" height="24" rx="2"/><line x1="43" y1="13" x2="57" y2="13" stroke-width="1"/><line x1="43" y1="17" x2="55" y2="17" stroke-width="1"/><line x1="43" y1="21" x2="57" y2="21" stroke-width="1"/><circle cx="52" cy="36" r="8"/><line x1="58" y1="42" x2="63" y2="47" stroke-width="2.5"/>`
        ))
      },
      {
        term: "GitHub / GitLab / Bitbucket",
        def: "Платформы для хостинга Git-репозиториев с веб-интерфейсом, PR, CI/CD и управлением задачами.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 22"/>`,
          `<circle cx="52" cy="22" r="12"/><path d="M44 18 Q48 10 52 10 Q56 10 60 18"/><circle cx="48" cy="22" r="2.5"/><circle cx="56" cy="22" r="2.5"/><path d="M48 24 Q52 28 56 24"/><path d="M52 32 L52 38 Q52 44 46 44"/>`
        ))
      },
      {
        term: "Пайплайн (Pipeline)",
        def: "Цепочка автоматических шагов при пуше кода: сборка → тесты → деплой. Описывается в YAML-файле.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<path d="M38 26 L62 26"/><path d="M58 22 L62 26 L58 30" stroke-width="1.5"/><circle cx="42" cy="26" r="3" fill="${G2}"/><circle cx="50" cy="26" r="3" fill="${G2}"/><circle cx="58" cy="26" r="3" fill="${BG}"/><text x="42" y="38" font-size="4" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">BUILD</text><text x="50" y="38" font-size="4" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">TEST</text><text x="58" y="38" font-size="4" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">SHIP</text>`
        ))
      },
      {
        term: "YAML",
        def: "Yet Another Markup Language — формат конфигурации. Используется в Docker Compose, CI/CD, Kubernetes.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<rect x="38" y="8" width="24" height="30" rx="2"/><text x="50" y="15" font-size="5" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">name:</text><text x="50" y="21" font-size="5" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">  app</text><text x="50" y="27" font-size="5" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">port:</text><text x="50" y="33" font-size="5" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">  8080</text>`
        ))
      },
      {
        term: "Argo CD",
        def: "GitOps-инструмент для автоматического деплоя в Kubernetes. Следит за репозиторием и синхронизирует кластер.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L42 24"/>`,
          `<path d="M42 10 Q52 4 62 10 L64 30 Q56 42 52 44 Q48 42 40 30 Z"/><path d="M44 18 Q52 12 60 18"/><circle cx="52" cy="26" r="5"/><path d="M52 21 L52 16 M52 31 L52 36"/><path d="M47 26 L42 26 M57 26 L62 26"/>`
        ))
      },
      {
        term: "GitOps",
        def: "Подход к деплою: Git-репозиторий — единственный источник истины. Любое изменение в коде = автодеплой.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 24"/>`,
          `<circle cx="44" cy="12" r="4"/><circle cx="60" cy="12" r="4"/><path d="M44 16 L60 16" stroke-width="1.5"/><path d="M52 16 L52 24"/><circle cx="52" cy="28" r="6"/><path d="M52 22 L52 16 M48 28 L44 24 M56 28 L60 24" stroke-width="1.5"/><circle cx="52" cy="28" r="2" fill="${G}"/>`
        ))
      },
      {
        term: "Bitbucket Pipelines",
        def: "CI/CD система внутри Bitbucket. Запускает тесты и деплой автоматически при коммите через bitbucket-pipelines.yml.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<path d="M40 10 Q44 6 52 6 Q60 6 64 10 L64 30 Q60 34 52 34 Q44 34 40 30 Z"/><path d="M44 20 L50 14 L56 20 L50 26 Z" fill="${G2}" stroke="${G}"/><path d="M46 40 L46 52 M58 40 L58 52 M46 46 L58 46" stroke-width="1.5"/>`
        ))
      }
    ]
  },

  {
    id: "testing", icon: "🧪", title: "Тестирование и качество кода",
    terms: [
      {
        term: "Unit-тесты",
        def: "Тесты отдельных функций/методов в изоляции. Быстрые, дешёвые, проверяют логику одного компонента.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L46 22"/>`,
          `<rect x="40" y="8" width="22" height="16" rx="2"/><text x="51" y="18" font-size="6" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">fn()</text><path d="M42 26 L52 36 L62 26"/><text x="52" y="46" font-size="6" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">✓ PASS</text>`
        ))
      },
      {
        term: "Feature-тесты",
        def: "Тесты поведения API или модуля. Например: POST /api/login → 200 OK + токен в ответе.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L44 24"/>`,
          `<rect x="38" y="8" width="24" height="20" rx="2"/><text x="50" y="15" font-size="5" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">POST /login</text><text x="50" y="23" font-size="6" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">200 OK</text><path d="M42 32 L58 32 M44 36 L56 36" stroke-width="1"/>`
        ))
      },
      {
        term: "E2E-тесты (End-to-End)",
        def: "Тесты через браузер от лица пользователя. click('Login') → see('Dashboard'). Медленные, но ловят настоящие баги.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L8 40"/>`,
          `<path d="M34 29 L38 40"/>`,
          `<path d="M40 44 L62 44"/><path d="M40 44 L40 36 L50 36 L50 44"/><path d="M40 40 L50 40" stroke-width="1"/><path d="M52 44 L58 36 L64 44"/><circle cx="40" cy="44" r="2" fill="${G}"/><circle cx="50" cy="44" r="2" fill="${G}"/><circle cx="62" cy="44" r="2" fill="${G}"/>`
        ))
      },
      {
        term: "Рефакторинг",
        def: "Улучшение структуры кода без изменения поведения. Убирает дублирование, большие классы, запутанную логику.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L46 20"/>`,
          `<path d="M46 24 L60 10 L62 12 L48 26"/><circle cx="44" cy="28" r="4"/><path d="M56 14 L62 10 L62 12 L58 16 Z" fill="${G2}"/><path d="M44 34 L60 34 M46 38 L58 38 M48 42 L56 42" stroke-width="1"/>`
        ))
      },
      {
        term: "Single Responsibility Principle",
        def: "Принцип: каждый класс/функция отвечает за одно. Большие функции — признак нарушения этого принципа.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<circle cx="52" cy="18" r="10"/><text x="52" y="22" font-size="10" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">1</text><path d="M40 34 L62 34"/><path d="M42 38 L50 38 M54 38 L60 38"/><path d="M52 28 L52 34" stroke-width="1.5"/>`
        ))
      },
      {
        term: "Копи-пейст (дублирование)",
        def: "Антипаттерн: один и тот же код в нескольких местах. Нужно вынести в функцию — так правки делаются в одном месте.",
        rank: 2,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L46 20"/>`,
          `<rect x="38" y="8" width="14" height="18" rx="2"/><rect x="42" y="12" width="14" height="18" rx="2"/><line x1="44" y1="16" x2="53" y2="16" stroke-width="1"/><line x1="44" y1="20" x2="53" y2="20" stroke-width="1"/><line x1="44" y1="24" x2="51" y2="24" stroke-width="1"/>`
        ))
      },
      {
        term: "Миграции (Migrations)",
        def: "Версионированные изменения схемы базы данных. Позволяют воспроизвести структуру БД на любом окружении.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L8 40"/>`,
          `<path d="M34 29 L38 40"/>`,
          `<path d="M40 20 Q48 16 48 26 Q48 36 40 32 M48 20 L56 16 Q62 18 62 26 Q62 34 54 32" stroke-width="1.5"/><path d="M38 46 L62 46 Q64 48 62 50 L38 50 Q36 48 38 46 Z"/><text x="50" y="50" font-size="5" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">v001</text>`
        ))
      },
      {
        term: "200 OK / 201 Created / 500 Error",
        def: "HTTP-коды статуса. 2xx — успех, 4xx — ошибка клиента, 5xx — ошибка сервера.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<rect x="38" y="6" width="24" height="9" rx="1" fill="${G2}"/><text x="50" y="13" font-size="6" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">200 OK</text><rect x="38" y="17" width="24" height="9" rx="1" fill="${G2}"/><text x="50" y="24" font-size="5" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">201 CREATED</text><rect x="38" y="28" width="24" height="9" rx="1"/><text x="50" y="35" font-size="5" text-anchor="middle" fill="#ff4d4d" font-family="monospace" stroke="none">500 ERROR</text>`
        ))
      },
      {
        term: "Jira / Confluence",
        def: "Инструменты Atlassian для управления задачами (Jira) и документации (Confluence). Стандарт в продуктовых командах.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 24"/>`,
          `<rect x="38" y="8" width="24" height="28" rx="2"/><line x1="38" y1="18" x2="62" y2="18" stroke-width="1"/><rect x="41" y="22" width="5" height="5" rx="1"/><rect x="41" y="29" width="5" height="5" rx="1"/><line x1="49" y1="24" x2="58" y2="24" stroke-width="1"/><line x1="49" y1="31" x2="56" y2="31" stroke-width="1"/><text x="50" y="14" font-size="5" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">BACKLOG</text>`
        ))
      }
    ]
  },

  {
    id: "agents", icon: "🤖", title: "Агенты и боты",
    terms: [
      {
        term: "AI-агент",
        def: "Программа, которая автономно выполняет задачи с помощью AI-модели. Может использовать инструменты, принимать решения.",
        rank: 5,
        img: ico(
          `<circle cx="32" cy="14" r="9"/><rect x="26" y="5" width="12" height="4" rx="1"/><circle cx="27" cy="12" r="2" fill="${G}" stroke="none"/><circle cx="37" cy="12" r="2" fill="${G}" stroke="none"/><path d="M27 18 Q32 22 37 18"/><rect x="20" y="24" width="24" height="18" rx="3"/><path d="M20 30 L16 30 M44 30 L48 30" stroke-width="2"/><path d="M24 34 L28 30 L32 34 L36 30 L40 34" stroke-width="1"/><path d="M24 42 L24 54 L40 54 L40 42" stroke-width="2"/><path d="M28 54 L28 60 M36 54 L36 60"/><path d="M24 60 L40 60" stroke-width="2"/>`
        )
      },
      {
        term: "Субагент (Sub-agent)",
        def: "Дочерний агент, запущенный основным агентом для параллельного решения подзадачи.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 24"/>`,
          `<circle cx="52" cy="18" r="6"/><circle cx="49" cy="16" r="1.5" fill="${G}" stroke="none"/><circle cx="55" cy="16" r="1.5" fill="${G}" stroke="none"/><path d="M49 20 Q52 23 55 20"/><rect x="46" y="25" width="12" height="10" rx="2"/><path d="M52 35 L52 42"/><path d="M46 42 L58 42" stroke-width="1.5"/><path d="M46 42 L44 50 M58 42 L60 50"/><path d="M34 28 L46 22" stroke-dasharray="2 2"/>`
        ))
      },
      {
        term: "Галлюцинация (Hallucination)",
        def: "Когда AI уверенно сообщает недостоверную информацию. Нужно верифицировать факты из внешних источников.",
        rank: 2,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 22"/>`,
          `<circle cx="54" cy="18" r="8"/><path d="M50 14 L52 18 L50 22 M58 14 L56 18 L58 22" stroke-width="1.5"/><path d="M50 18 L58 18" stroke-width="1"/><path d="M46 28 L48 32 L46 36 M62 28 L60 32 L62 36" stroke-width="1.5"/><text x="54" y="48" font-size="7" text-anchor="middle" fill="#ff4d4d" font-family="monospace" stroke="none">???</text>`
        ))
      },
      {
        term: "Контекст (Context)",
        def: "Вся информация, доступная модели при генерации ответа: история диалога, файлы, инструкции.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L44 24"/>`,
          `<rect x="40" y="6" width="22" height="30" rx="2"/><path d="M40 12 L62 12" stroke-width="1"/><path d="M43 16 L59 16 M43 20 L59 20 M43 24 L55 24" stroke-width="1"/><path d="M40 28 L62 28" stroke-width="1"/><text x="51" y="9" font-size="4" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">CONTEXT</text>`
        ))
      },
      {
        term: "Контекстное окно (Context Window)",
        def: "Максимальный объём информации, который модель может удержать в одном запросе. Измеряется в токенах.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 24"/>`,
          `<rect x="38" y="8" width="24" height="30" rx="2"/><path d="M40 14 L60 14 M40 20 L60 20 M40 26 L60 26 M40 32 L54 32" stroke-width="1"/><path d="M54 32 L62 32 L62 8 L54 8" stroke-width="1.5" stroke-dasharray="2 1"/>`
        ))
      },
      {
        term: "Токен",
        def: "Базовая единица текста для AI-модели. Примерно 0.75 слова. Цена API и лимиты измеряются в токенах.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L46 26"/>`,
          `<rect x="38" y="10" width="10" height="8" rx="1" fill="${G2}"/><rect x="50" y="10" width="10" height="8" rx="1" fill="${G2}"/><rect x="44" y="20" width="10" height="8" rx="1" fill="${G2}"/><text x="43" y="16" font-size="5" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">he</text><text x="55" y="16" font-size="5" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">llo</text><text x="49" y="26" font-size="5" text-anchor="middle" fill="${G}" font-family="monospace" stroke="none">!</text><path d="M40 36 L58 36 M40 40 L54 40" stroke-width="1"/>`
        ))
      },
      {
        term: "Инференс (Inference)",
        def: "Процесс генерации ответа моделью. Чем дольше инференс — тем медленнее ответ и выше стоимость.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<circle cx="52" cy="20" r="10"/><path d="M46 16 Q52 12 58 16 Q56 22 52 24 Q48 22 46 16 Z"/><circle cx="52" cy="24" r="2"/><path d="M52 26 L52 30"/><path d="M38 36 L66 36 M40 40 L62 40" stroke-width="1"/>`
        ))
      },
      {
        term: "Reasoning (рассуждение)",
        def: "Режим работы модели, при котором она «думает» перед ответом. Дольше и дороже, но точнее для сложных задач.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 22"/>`,
          `<circle cx="52" cy="18" r="10"/><path d="M46 14 L52 14 L52 18 L48 18 L48 22 L52 22" stroke-width="1.5"/><circle cx="52" cy="26" r="1.5" fill="${G}"/><path d="M40 36 L42 30 L46 36 L50 30 L54 36 L58 30 L62 36" stroke-width="1.5"/>`
        ))
      },
      {
        term: "Heartbeat",
        def: "В OpenClaw — регулярный «пульс» агента: агент сам инициирует действие без запроса пользователя.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 22"/>`,
          `<path d="M40 28 L44 22 L48 32 L52 16 L56 28 L60 24 L64 28"/><path d="M44 40 Q48 36 52 40 Q56 36 60 40 Q56 44 52 48 Q48 44 44 40 Z" fill="${G2}" stroke="${G}"/>`
        ))
      },
      {
        term: "Долгосрочная память",
        def: "Способность агента сохранять информацию между сессиями. Хранится в базе данных, а не в контексте.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 24"/>`,
          `<path d="M40 14 Q48 10 56 14 L56 26 Q48 30 40 26 Z"/><path d="M40 20 Q48 24 56 20" stroke-width="1"/><path d="M40 26 L40 36 M56 26 L56 36"/><path d="M40 36 Q48 40 56 36"/><path d="M40 32 Q48 36 56 32" stroke-width="1"/>`
        ))
      },
      {
        term: "Бенчмарк",
        def: "Стандартизированный тест для сравнения моделей. MMLU, HumanEval — примеры бенчмарков для LLM.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<path d="M38 46 L62 46"/><rect x="40" y="36" width="6" height="10" rx="1" fill="${G2}"/><rect x="48" y="28" width="6" height="18" rx="1" fill="${G2}"/><rect x="56" y="20" width="6" height="26" rx="1" fill="${G2}"/><path d="M40 36 Q48 20 60 16" stroke-width="1" stroke-dasharray="2 2"/>`
        ))
      },
      {
        term: "Open Source (открытый исходный код)",
        def: "Модели/инструменты с открытым кодом. Можно запустить локально, модифицировать, не платить за API.",
        rank: 4,
        img: ico(VB(
          `<path d="M10 29 L4 34"/>`,
          `<path d="M34 29 L46 22"/>`,
          `<path d="M50 8 Q50 4 54 4 Q58 4 58 8 L58 16 Q58 20 54 20 Q50 20 50 16 Z"/><path d="M50 16 L50 28 L44 34"/><path d="M58 16 L58 28 L62 34"/><path d="M44 34 L62 34" stroke-width="2"/>`
        ))
      },
      {
        term: "Rate Limits",
        def: "Ограничения на количество API-запросов в единицу времени. Превышение → ошибка 429 Too Many Requests.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L6 36"/>`,
          `<path d="M34 29 L44 22"/>`,
          `<path d="M40 38 Q52 22 64 38 Q52 54 40 38 Z"/><path d="M52 38 L52 28 L56 28" stroke-width="2"/><circle cx="52" cy="38" r="2" fill="${G}"/><path d="M44 42 L46 42 M58 42 L60 42" stroke-width="1"/><text x="52" y="52" font-size="5" text-anchor="middle" fill="${G2}" font-family="monospace" stroke="none">429</text>`
        ))
      },
      {
        term: "Транскрибация",
        def: "Перевод речи в текст. Speech-to-text. Whisper, Deepgram — инструменты для транскрибации.",
        rank: 3,
        img: ico(VB(
          `<path d="M10 29 L5 34"/>`,
          `<path d="M34 29 L44 26"/>`,
          `<path d="M42 16 Q42 10 46 8 Q52 6 54 12 Q56 18 52 22 Q48 26 44 22 Q42 20 42 16 Z"/><path d="M38 20 Q36 24 38 28" stroke-width="1.5"/><path d="M35 17 Q32 24 35 31" stroke-width="1"/><path d="M48 22 L48 32"/><path d="M42 32 L54 32"/><path d="M42 40 L62 40 M42 44 L58 44 M42 48 L54 48" stroke-width="1"/>`
        ))
      }
    ]
  }
];

// ═══════════════════════════════════════════════════════
// CATEGORY VAULT BOY IMAGES & TAB LABELS
// ═══════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════
// TERM → SVG FILE MAPPING
// ═══════════════════════════════════════════════════════

const TERM_IMGS = {
  // AI-модели
  "ChatGPT":                          "img/chat-gpt.svg",
  "Claude":                           "img/claude.svg",
  "Gemini":                           "img/gemini.svg",
  "GPT-4o":                           "img/gpt-4o.svg",
  "GPT-4 Vision":                     "img/gpt-4vision.svg",
  "DeepSeek":                         "img/deepseek.svg",
  "Kimi":                             "img/kimi.svg",
  "Qwen":                             "img/qwen.svg",
  "ElevenLabs":                       "img/elevenlabs.svg",
  "Whisper":                          "img/whisper.svg",
  "Groq":                             "img/groq.svg",
  "OpenClaw":                         "img/open-claw.svg",
  // Инструменты разработки
  "Claude Code":                      "img/claude-code.svg",
  "Cursor":                           "img/cursor.svg",
  "GitHub Copilot":                   "img/github-copilot.svg",
  "Vibe Coding":                      "img/vibe-coding.svg",
  "CLAUDE.md":                        "img/claude-md.svg",
  "Промпт (Prompt)":                  "img/prompt.svg",
  "Промпт-инжиниринг":                "img/prompt-ing.svg",
  "Скиллы (Skills)":                  "img/skills.svg",
  "Тулы (Tools)":                     "img/tools.svg",
  "ТЗ (техническое задание)":         "img/tz.svg",
  // DevOps
  "Docker":                           "img/docker.svg",
  "Docker Compose":                   "img/docker-compose.svg",
  "Dockerfile":                       "img/dockerfile.svg",
  "Docker-образ (image)":             "img/docker-img.svg",
  "Контейнер":                        "img/container.svg",
  "Nginx":                            "img/nginx.svg",
  "Kubernetes (K8s)":                 "img/kubernetes.svg",
  "kubectl":                          "img/kubectl.svg",
  "VPS":                              "img/vps.svg",
  "Деплой (Deploy)":                  "img/deploy.svg",
  "Продакшен (Production)":           "img/prod.svg",
  "CI/CD":                            "img/ci-cd.svg",
  // Сети / API
  "API":                              "img/api.svg",
  "REST API":                         "img/rest-api.svg",
  "HTTP":                             "img/http.svg",
  "JSON":                             "img/json.svg",
  "GET / POST / PUT / DELETE":        "img/get-post.svg",
  "DNS":                              "img/dns.svg",
  "Обратный прокси (Reverse Proxy)":  "img/revers-proxy.svg",
  "Клиент-серверная архитектура":     "img/client-server.svg",
  "SQL":                              "img/sql.svg",
  "PostgreSQL":                       "img/postgres-sql.svg",
  "Redis":                            "img/redis.svg",
  "SSH":                              "img/ssh.svg",
  "Токен (API)":                      "img/token.svg",
  // Генерация медиа
  "DALL-E 3":                         "img/dall-e.svg",
  "Midjourney":                       "img/midjourney.svg",
  "Stable Diffusion":                 "img/stabble-diff.svg",
  "Flux":                             "img/flux.svg",
  "Sora":                             "img/sora.svg",
  "Runway Gen-3":                     "img/runway.svg",
  "Kling":                            "img/kling.svg",
  "Pika":                             "img/pika.svg",
  "Inpainting":                       "img/impainting.svg",
  "Outpainting":                      "img/outpainting.svg",
  "Style Transfer":                   "img/style-transf.svg",
  "Негативный промпт":                "img/negativ-prompt.svg",
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
};

const CAT_META = [
  { label: 'МОДЕЛИ',   img: 'img/vb-models.svg'   },
  { label: 'ИНСТРУМ',  img: 'img/vb-devtools.svg'  },
  { label: 'DEVOPS',   img: 'img/vb-devops.svg'    },
  { label: 'СЕТИ',     img: 'img/vb-network.svg'   },
  { label: 'МЕДИА',    img: 'img/vb-media.svg'     },
  { label: 'GIT',      img: 'img/vb-git.svg'       },
  { label: 'ТЕСТЫ',    img: 'img/vb-testing.svg'   },
  { label: 'АГЕНТЫ',   img: 'img/vb-agents.svg'    },
];

// ═══════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════

const TOTAL_TERMS = CATEGORIES.reduce((s, c) => s + c.terms.length, 0);

let activeCatIdx  = 0;
let activeTermKey = null;
let query         = '';

// ═══════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════

function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function highlight(text, q) {
  if (!q) return text;
  return text.replace(new RegExp(`(${esc(q)})`, 'gi'), '<mark>$1</mark>');
}

// ═══════════════════════════════════════════════════════
// TABS
// ═══════════════════════════════════════════════════════

function renderTabs() {
  const nav = document.getElementById('nav-tabs');
  const tabs = CATEGORIES.map((cat, i) => {
    const label  = CAT_META[i]?.label || cat.title.slice(0, 6).toUpperCase();
    const active = (!query && i === activeCatIdx) ? 'true' : 'false';
    return `<button class="tab-btn" role="tab" aria-selected="${active}" data-idx="${i}">${label}</button>`;
  }).join('');
  nav.innerHTML =
    `<button class="cat-arrow" id="cat-prev" aria-label="Предыдущая категория">◀</button>` +
    tabs +
    `<button class="cat-arrow" id="cat-next" aria-label="Следующая категория">▶</button>`;

  // Always sync subnav with current active category
  const subnavCat = document.getElementById('subnav-cat');
  if (subnavCat) subnavCat.textContent = CATEGORIES[activeCatIdx].title.toUpperCase();
}

// ═══════════════════════════════════════════════════════
// VISIBLE TERMS
// ═══════════════════════════════════════════════════════

function getVisibleTerms() {
  if (query) {
    const results = [];
    CATEGORIES.forEach((cat, ci) => {
      cat.terms.forEach((t, ti) => {
        if (t.term.toLowerCase().includes(query) || t.def.toLowerCase().includes(query)) {
          results.push({ cat, catIdx: ci, term: t, termIdx: ti });
        }
      });
    });
    return results;
  }
  const cat = CATEGORIES[activeCatIdx];
  return cat.terms.map((t, ti) => ({ cat, catIdx: activeCatIdx, term: t, termIdx: ti }));
}

// ═══════════════════════════════════════════════════════
// LIST
// ═══════════════════════════════════════════════════════

function renderList() {
  const panel = document.getElementById('list-panel');
  const items = getVisibleTerms();

  if (items.length === 0) {
    panel.innerHTML = `<div class="no-results">&gt; DATA NOT FOUND</div>`;
    updateStatus(0);
    return;
  }

  const currentValid = items.some(x => `${x.catIdx}:${x.termIdx}` === activeTermKey);
  if (!currentValid) activeTermKey = `${items[0].catIdx}:${items[0].termIdx}`;

  panel.innerHTML = items.map(({ catIdx, term: t, termIdx }) => {
    const key = `${catIdx}:${termIdx}`;
    const sel = key === activeTermKey ? 'true' : 'false';
    return `<div class="list-item" role="option" aria-selected="${sel}" data-key="${key}" tabindex="0">
      <span class="list-term">${highlight(t.term, query)}</span>
      <span class="list-val">${termIdx + 1}</span>
    </div>`;
  }).join('');

  updateStatus(items.length);
}

// ═══════════════════════════════════════════════════════
// DETAIL
// ═══════════════════════════════════════════════════════

function renderDetail() {
  if (!activeTermKey) return;
  const [ci, ti] = activeTermKey.split(':').map(Number);
  const cat  = CATEGORIES[ci];
  const term = cat?.terms[ti];
  if (!term) return;

  const wrap   = document.getElementById('detail-img-wrap');
  const nameEl = document.getElementById('detail-name');
  const defEl  = document.getElementById('detail-def');

  // Per-term illustration: file SVG only
  const imgSrc = TERM_IMGS[term.term];
  wrap.innerHTML = imgSrc
    ? `<img src="${imgSrc}" alt="${term.term}">`
    : '';

  // Sub-nav: show full category title
  const subnavCat = document.getElementById('subnav-cat');
  if (subnavCat) subnavCat.textContent = cat.title.toUpperCase();

  // Name + definition
  nameEl.textContent = term.term;
  defEl.innerHTML = highlight(term.def, query);
}

// ═══════════════════════════════════════════════════════
// STATUS BAR
// ═══════════════════════════════════════════════════════

function updateStatus(visible) {
  const level = Math.max(1, Math.ceil((visible / TOTAL_TERMS) * 10));
  const cat   = CATEGORIES[activeCatIdx];
  const catCount = query ? '' : ` [${visible}]`;
  document.getElementById('status-hp').textContent    = `HP ${visible}/${TOTAL_TERMS}`;
  document.getElementById('status-sep').textContent   = `LEVEL ${level}`;
  document.getElementById('status-ap').textContent    = `AP 160/160`;
  document.getElementById('progress-bar').style.width = (visible / TOTAL_TERMS * 100).toFixed(1) + '%';
}

// ═══════════════════════════════════════════════════════
// FULL UPDATE
// ═══════════════════════════════════════════════════════

function update() {
  renderTabs();
  renderList();
  renderDetail();
}

// ═══════════════════════════════════════════════════════
// EVENTS
// ═══════════════════════════════════════════════════════

// ── Helper: switch category ──────────────────────────
function switchCat(dir) {
  activeCatIdx = (activeCatIdx + dir + CATEGORIES.length) % CATEGORIES.length;
  query        = '';
  document.getElementById('search').value = '';
  activeTermKey = null;
  update();
}

// ── Helper: move term selection ──────────────────────
function moveTerm(dir) {
  const items = [...document.querySelectorAll('.list-item')];
  if (!items.length) return;
  const cur  = items.findIndex(el => el.dataset.key === activeTermKey);
  const next = cur + dir;
  if (next < 0 || next >= items.length) return;
  activeTermKey = items[next].dataset.key;
  document.querySelectorAll('.list-item').forEach(el =>
    el.setAttribute('aria-selected', el.dataset.key === activeTermKey ? 'true' : 'false')
  );
  renderDetail();
  items[next].focus({ preventScroll: true });
  items[next].scrollIntoView({ block: 'nearest' });
}

// Tab bar clicks (tabs + arrow buttons)
document.getElementById('nav-tabs').addEventListener('click', e => {
  if (e.target.closest('#cat-prev')) { switchCat(-1); return; }
  if (e.target.closest('#cat-next')) { switchCat(+1); return; }
  const btn = e.target.closest('.tab-btn');
  if (!btn) return;
  activeCatIdx = parseInt(btn.dataset.idx, 10);
  query        = '';
  document.getElementById('search').value = '';
  activeTermKey = null;
  update();
});

// List item click
document.getElementById('list-panel').addEventListener('click', e => {
  const item = e.target.closest('.list-item');
  if (!item) return;
  activeTermKey = item.dataset.key;
  document.querySelectorAll('.list-item').forEach(el =>
    el.setAttribute('aria-selected', el.dataset.key === activeTermKey ? 'true' : 'false')
  );
  renderDetail();
});

// Global keyboard navigation
document.addEventListener('keydown', e => {
  // Don't hijack when typing in search
  if (e.target === document.getElementById('search')) return;

  switch (e.key) {
    case 'ArrowLeft':  e.preventDefault(); switchCat(-1);  break;
    case 'ArrowRight': e.preventDefault(); switchCat(+1);  break;
    case 'ArrowUp':    e.preventDefault(); moveTerm(-1);   break;
    case 'ArrowDown':  e.preventDefault(); moveTerm(+1);   break;
  }
});

// Search
document.getElementById('search').addEventListener('input', e => {
  query         = e.target.value.trim().toLowerCase();
  activeTermKey = null;
  update();
});

// ═══════════════════════════════════════════════════════
// INIT — pre-select first term so renderDetail never sees null
// ═══════════════════════════════════════════════════════

activeTermKey = '0:0';
update();
