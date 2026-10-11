# AgriProtect — Smart Farming Companion

AgriProtect is a static, India-first farming companion for local demonstrations. It includes crop planning, soil and weather views, mandi-price examples, calculators, task reminders, expense tracking, and a bilingual farm assistant with voice support.

## Assistant and Voice Assistant

The Farm Assistant is a **local-only** command center with rule-based responses and browser-based voice support. It does **not** use any external AI, LLM, or backend service.

### Features
- **Bilingual support** — English and Hindi (`en-IN` and `hi-IN` locales)
- **Command-center interface** — Daily briefing, priority actions, farm context, category pills, quick prompts, and insights
- **Voice input** — Speak questions or commands using the browser Web Speech API
- **Voice output** — Responses can be read aloud with `speechSynthesis`
- **Command aliases** — Voice commands for navigation, theme, and language
- **Shared history** — Conversation history persists across widget and full page

### Supported Voice Commands
| Command | Action |
|---------|--------|
| `soil`, `soil health`, `मिट्टी` | Open Soil Health page |
| `crop`, `crop advisor`, `फसल` | Open Crop Advisor page |
| `calendar`, `crop calendar`, `कैलेंडर` | Open Crop Calendar page |
| `weather`, `मौसम` | Open Weather page |
| `disease`, `disease detection`, `रोग` | Open Disease Detection page |
| `market`, `market prices`, `बाजार` | Open Market Prices page |
| `profit`, `profit planner`, `मुनाफा` | Open Profit Planner page |
| `expense`, `expenses`, `खर्च` | Open Expense Tracker page |
| `task`, `tasks`, `कार्य` | Open Tasks page |
| `dark`, `डार्क` | Toggle dark mode |
| `light`, `लाइट` | Toggle light mode |
| `hindi`, `हिंदी` | Switch to Hindi |
| `english`, `इंग्लिश` | Switch to English |
| `refresh`, `reload`, `रिफ्रेश` | Refresh the page |
| `help`, `मदद` | Show available commands |

### Example Questions
- English: "How should I plan irrigation?", "What fertilizer should I use?", "How do I check my profit?"
- Hindi: "सिंचाई कैसे योजना बनाऊं?", "कितना उर्वरक उपयोग करूं?", "मेरा मुनाफा कैसे देखूं?"

### Browser Support
- Voice input requires `SpeechRecognition` or `webkitSpeechRecognition` (Chromium-based browsers)
- Voice output requires `speechSynthesis` (modern browsers)
- Text chat works in all browsers; voice is optional
- When voice is unavailable, users can type their questions

## Run locally

From PowerShell:

```powershell
cd "C:\Users\acer\OneDrive\Desktop\new project agriprotect"
python -m http.server 8080
```

Open `http://localhost:8080/index.html`.

The site uses local demo authentication. From `login.html`, use any 10-digit phone number and any non-empty password.

## Main pages

- `index.html` — public landing page
- `login.html` — local demo sign-in
- `dashboard.html` — farm overview and shortcuts
- `soil-health.html` — soil metrics demo
- `weather.html` — weather demo
- `crop-advisor.html` — crop recommendations
- `disease-detection.html` — local image preview and simulated analysis
- `crop-calendar.html` — calendar and crop tasks
- `market-prices.html` — demo mandi prices
- `profit-planner.html` — revenue, costs, profit, and break-even report with print support
- `expenses.html` — local expense tracker
- `tasks.html` — local task reminders
- `crop-comparison.html` — side-by-side crop estimates
- `harvest-planner.html` — harvest date and production estimate
- `irrigation-calculator.html` — water-use estimate
- `fertilizer-calculator.html` — demo N-P-K estimate
- `assistant.html` — English/Hindi local farm assistant with browser voice support
- `farmer-finance.html` — centralized financial management dashboard
- `settings.html` — comprehensive settings with profile, appearance, notifications, and preferences

## Assistant and voice limitations

The assistant is intentionally **local-only** in this version. It uses a rule-based response map and does not send farm questions, images, or credentials to an external AI service. A future provider-neutral `/api/assistant` endpoint can replace the local response function without exposing a provider key in the browser.

Voice input uses the browser Web Speech API when available (`SpeechRecognition` or `webkitSpeechRecognition`). Voice output uses `speechSynthesis`. English uses `en-IN` and Hindi uses `hi-IN`. Browsers without speech recognition keep the text assistant available and show a fallback message.

## Local data

Theme, language, demo session, profile, planner values, expenses, tasks, harvest plans, calculator inputs, and assistant history are stored in namespaced `localStorage` keys beginning with `agriii_`. Reset controls only clear the related feature data.

All weather, market, sensor, disease, yield, cost, and fertilizer values are illustrative demo values—not live data or agronomic prescriptions. Confirm decisions with local agricultural experts and current mandi information.

---

© 2026 AgriProtect. All rights reserved.
