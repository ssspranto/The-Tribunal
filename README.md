# The Tribunal

A narrative-driven moral judgment game where your decisions shape a character's life trajectory. The AI profiles your decision-making patterns across 10 cases and generates a personalized psychological verdict on you—and the character whose fate you control.

**Play it, then discover what your choices reveal about how you judge others.**

---

## 🎮 Overview

You are a judge. A man named **Elias Voss**—a warehouse worker struggling to pay for his daughter's medical care—appears before you across 10 cases. Each verdict you deliver has consequences. Lenient rulings send him one way; harsh ones send him another. By case 10, his entire life trajectory will be shaped by your cumulative judgments.

The game is not a personality quiz. It's a story where **you** are the variable, and **he** is the outcome.

### Core Mechanics

- **Cases 1–8**: Pre-written narrative scenarios selected based on your previous verdicts (lenient arc vs. harsh arc)
- **Cases 9–10**: AI-generated, dynamically challenging cases engineered specifically for your moral profile
- **AI Profiling**: Silent tracking of your decision patterns across three dimensions:
  - **Framework**: Rule-based vs. outcome-based reasoning
  - **Leniency**: Strict vs. forgiving sentencing
  - **Empathy**: Logic-first vs. emotion-first decision-making
- **Dynamic Endings**: Two simultaneous narrative conclusions—Elias's fate and your psychological state—both shaped by your verdicts

---

## ✨ Features

### 🎭 Narrative Depth
- Elias is not a prop; he evolves visibly across all 10 cases
- Case scenarios branch into two distinct arcs (redemptive vs. spiral) based on verdict patterns
- Bridge narratives link each case, maintaining story continuity
- Avatar expression changes with Elias's emotional state

### 🤖 AI Integration
- **Cases 9–10** are generated in real-time using OpenRouter (Llama 3.1 70B)
- Cases are engineered to exploit your judicial tendencies and force moral contradictions
- Endings are generated dynamically with full awareness of your verdict history and moral profile
- All AI content respects the game's serious, literary tone

### 🌍 Localization
- Full support for **English** and **বাংলা (Bengali)**
- Language selection screen at game start
- All UI, narratives, and AI-generated content adapt to selected language
- Session language preference is saved across restarts

### 📊 Player Profiling (Silent)
- Moral archetype classification after all cases
- Detailed psychological analysis of your decision logic
- Profile comparison with other players (via ending stats)
- No scoring system—only reflection

### 💾 Persistent Sessions
- Game state saved to localStorage after every verdict
- Resume interrupted sessions or start fresh
- Language preference persists across sessions

### 🎨 Clean, Accessible UI
- Green and white theme optimized for readability
- Responsive design (mobile-friendly)
- Playfair Display headings, Hind Siliguri for Bengali text
- No external image dependencies (pure CSS/SVG)

---

## 🛠️ Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **AI Backend**: OpenRouter (Llama 3.1 70B via free tier)
- **Localization**: Custom context-based i18n system
- **State Management**: React hooks + localStorage
- **Fonts**: Google Fonts (Playfair Display, Hind Siliguri)

---

## 📋 Project Structure

```
src/
├── components/
│   ├── IntroScreen.jsx           # Game introduction and backstory
│   ├── LanguageSelectScreen.jsx  # Language selection (EN / BN)
│   ├── CaseCard.jsx              # Case narrative display
│   ├── VerdictPanel.jsx          # Verdict input (guilty/not guilty + severity)
│   ├── TransitionScreen.jsx      # Between-case narrative bridges
│   ├── LoadingScreen.jsx         # API loading states
│   ├── EndingScreen.jsx          # Split Elias + Judge ending display
│   └── EliasAvatar.jsx           # SVG avatar with expression states
│
├── context/
│   └── LanguageContext.jsx       # Language selection and translation provider
│
├── localization/
│   ├── languages.js              # Language metadata
│   ├── en.js                     # English UI strings
│   ├── bn.js                     # Bengali UI strings
│   └── index.js                  # Translation utilities
│
├── data/
│   ├── case1.js                  # Hardcoded Case 1 (English)
│   ├── case1BN.js                # Hardcoded Case 1 (Bengali)
│   ├── scenarioBanks.js          # 70 pre-written cases 2–8 (English, 10 per case)
│   ├── scenarioBanksBN.js        # 70 pre-written cases 2–8 (Bengali, 10 per case)
│   └── archetypes.js             # Judge archetype definitions
│
├── api/
│   ├── gemini.js                 # OpenRouter API client
│   ├── generateFinalCases.js     # Cases 9–10 generation prompt
│   └── generateEndings.js        # Endings generation prompt
│
├── hooks/
│   ├── useGameState.js           # Game state management
│   └── useProfileTracker.js      # Moral profile tracking logic
│
├── App.jsx                       # Main app component
├── main.jsx                      # React entry point
└── index.css                     # Global styles
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- OpenRouter API key (free tier available)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/the-tribunal.git
   cd the-tribunal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Add your OpenRouter API key**
   ```
   VITE_OPENROUTER_API_KEY=your_key_here
   ```
   
   Get a free key at [openrouter.ai](https://openrouter.ai) (no credit card required)

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 📖 How to Play

### Game Flow

1. **Language Selection**: Choose English or Bengali
2. **Introduction**: Meet Elias Voss and understand his situation
3. **Cases 1–8**: Judge each case
   - Read the scenario
   - Decide: Guilty or Not Guilty
   - If guilty, set severity (1–10)
   - (Optional) Explain your reasoning
   - Submit and watch Elias react
4. **Profile Reveal**: See your archetype and the contradictions the AI detected
5. **Cases 9–10**: Face AI-generated contradictions designed specifically for you
6. **Endings**: Read Elias's fate and yours simultaneously

### Core Rules

- **No right answers**: Every case has defensible verdicts on both sides
- **Silent profiling**: You won't see your scores until the very end
- **Consequences matter**: Your decisions literally shape what happens next
- **Time is recorded**: Response hesitation is tracked (but never shown to you)

---

## ⚙️ Configuration

### Model Selection

The project uses **Llama 3.1 70B** via OpenRouter's free tier. To change it:

1. Open `src/api/gemini.js`
2. Find the `MODEL` constant:
   ```js
   const MODEL = "meta-llama/llama-3.1-70b-instruct:free";
   ```
3. Replace with any OpenRouter model (see [available models](https://openrouter.ai/docs/models))

**Recommended alternatives** (all free):
- `mistralai/mixtral-8x7b-instruct:free`
- `google/gemma-2-27b-it:free`

### Theming

To change colors, edit `src/index.css`:

```css
:root {
  --bg-primary: #F5F7F5;      /* Page background */
  --bg-secondary: #FFFFFF;     /* Card background */
  --text-primary: #1A2E1A;     /* Main text */
  --accent-primary: #2D6A4F;   /* Buttons, headings */
  --accent-secondary: #52B788; /* Hover states */
}
```

---

## 🎯 API Integration

The project makes **exactly 2 API calls per full playthrough**:

1. **Case 9–10 generation** (after Case 8 verdict)
   - Input: 8-case history + player profile
   - Output: 2 complex moral dilemmas tailored to the player

2. **Endings generation** (after Case 10 verdict)
   - Input: 10-case history + final profile + verdict reasoning
   - Output: Elias's fate + Judge's psychological state

**No API calls are made for Cases 1–8** — they are pre-written and selected from scenario banks based on verdict patterns.

### Rate Limiting

OpenRouter's free tier is generous. With 2 calls per playthrough (~1.5 minutes per call):
- **2 concurrent playthroughs**: No issues
- **10 concurrent players**: No issues
- **50+ concurrent players**: May experience brief delays

For higher concurrency, upgrade to a paid OpenRouter tier or use a different model provider.

---

## 🧠 Moral Profiling Algorithm

After 10 cases, players are classified into one of 5 archetypes:

| Archetype | Characteristics |
|---|---|
| **The Iron Rule-Keeper** | High rule adherence, low empathy flexibility. Consistent, uncompromising. |
| **The Empathetic Override** | High outcome-sensitivity, high empathy. Context-driven, lenient. |
| **The Principled Pragmatist** | Balanced rule and outcome. Proportional sentencing. |
| **The Strict Consequentialist** | High rule enforcement, low emotion. Believe leniency sets dangerous precedents. |
| **The Contextual Judge** | Inconsistent patterns. Nuance-seeking or genuinely unpredictable. |

Archetypes are **not predictions of real-world morality**. They describe decision patterns within the constrained scenario space of the game.

---

## 🌐 Localization

### Supported Languages
- **English** (en)
- **বাংলা** (bn)

### Adding a New Language

1. Create `src/localization/xx.js` (where `xx` is the language code)
2. Copy the structure from `en.js` and translate all strings
3. Create `src/data/case1XX.js` and `src/data/scenarioBanksXX.js` with all case scenarios in the new language
4. Add the language to `src/localization/languages.js`:
   ```js
   xx: {
     code: "xx",
     name: "Language Name",
     nativeName: "Native name",
     direction: "ltr"
   }
   ```
5. Update `src/localization/index.js` to import and export the new language

---

## 📊 Data & Privacy

- **What is stored locally**: All game state (verdicts, reasoning, profile scores) via localStorage
- **What is sent to OpenRouter**: Only the case narratives and prompts needed to generate Cases 9–10 and endings
- **No personal data collection**: The game does not collect, store, or transmit identifying information
- **Open data**: Player profile data (archetype, stats) can be exported and shared via the "Copy summary" button

---

## 🔧 Development

### Running Tests
Currently no automated tests. Manual playtesting recommended across:
- Both languages (English and Bengali)
- Both arcs (lenient and harsh verdict patterns)
- Edge cases (all guilty vs. all not guilty)

### Building for Production
```bash
npm run build
```

Output: `dist/` folder, ready to deploy to any static host (Vercel, Netlify, GitHub Pages, etc.)

### Debugging

Enable verbose API logging:
```js
// In src/api/gemini.js, uncomment:
console.warn(`OpenRouter response:`, data);
```

Check localStorage at any time:
```js
console.log(JSON.parse(localStorage.getItem("tribunal_game_state")));
console.log(localStorage.getItem("tribunal_language"));
```

---

## ⚠️ Known Limitations

1. **JSON reliability**: Occasionally (< 1%), OpenRouter returns malformed JSON. The retry system handles this, but it adds 2–4 second latency.
2. **Narrative variance**: Llama 3.1 produces good prose but occasionally less literary than proprietary models. Tone consistency is 95%+.
3. **No offline mode**: Cases 9–10 and endings require an active API connection.
4. **Mobile keyboard**: On mobile, the severity slider can be finicky with touch input. Works but not ideal.

---

## 🎨 Design Inspiration

The visual and narrative design draws from:
- Dark courtroom procedurals (tone without the darkness)
- Interactive fiction / choice-based narrative games
- Psychological assessments (MBTI, Big Five) without the pseudoscience
- Literary fiction focused on moral ambiguity

The game intentionally avoids:
- Gamification (no points, no "winning")
- Judgment (no "your archetype is good/bad")
- Quick conclusions (endings require full engagement with all 10 cases)

---

## 📜 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) file for details.

You are free to use, modify, and distribute this project for personal and commercial purposes.

---

## 🤝 Contributing

Contributions are welcome. Areas where help is most useful:

- **New language translations** (localization/[xx].js + data files)
- **Scenario writing** (additional case banks or variants)
- **UI/UX improvements** (accessibility, mobile responsiveness, visual design)
- **Testing & bug reports** (edge cases, API failures, browser compatibility)

### Process

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please include:
- What changed and why
- Testing notes (especially for new scenarios or languages)
- Screenshots if UI changes

---

## 📧 Support & Feedback

- **Bug reports**: Open an issue with reproduction steps
- **Feature requests**: Discussions welcome in Issues
- **General questions**: Ask in Discussions tab

---

## 🎓 Educational Use

This project was designed as a student AI course project demonstrating:

- **Novel AI application**: Behavioural profiling through decision-making patterns (not sentiment analysis or classification)
- **Dynamic content generation**: AI-generated cases tailored to individual player profiles
- **Narrative systems**: Story branching based on player choices
- **Real-world grounding**: Parallel application in HR screening, ethics training, and psychological assessment

If you're using this as a reference for your own project, the key insight is: **the AI does not evaluate the player, it observes their patterns and mirrors them back.**

---

## 🙏 Credits

- **Concept & Design**: Original student AI course project
- **AI Models**: Llama 3.1 70B (Meta) via OpenRouter
- **Framework**: React 18 + Vite
- **Typography**: Playfair Display (Google Fonts), Hind Siliguri (Google Fonts)
- **Inspiration**: Moral philosophy, interactive fiction, behavioural psychology

---

## 📝 Citation

If you reference or build on this project, please cite:

```
The Tribunal: A Narrative-Driven Moral Judgment Game
With Dynamic AI-Generated Endings and Behavioural Profiling
https://github.com/yourusername/the-tribunal
```

---

## 🚀 Roadmap

Potential future enhancements:

- [ ] Multiplayer mode (compare archetypes with other judges)
- [ ] Export/share endings as images or PDFs
- [ ] Additional languages (Spanish, French, Hindi, etc.)
- [ ] Variant narrative scenarios (different protagonist, different legal system)
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard (anonymised archetype distribution, verdict patterns)
- [ ] Custom scenario editor (let players write their own cases)

---

## 💝 Thank You

Thanks for playing. The game works best when you take it seriously—not because the verdicts matter (they don't), but because the reflection does.

**What does your way of judging Elias Voss reveal about how you judge everyone else?**

---

**Made with curiosity about human judgment. Built with React, powered by Llama, hosted on your browser.**
