# QuizWave

A JavaScript quiz app that tests your knowledge of core JavaScript concepts — objects, JSON, template literals, and more. Built with plain HTML, CSS, and JavaScript (no frameworks).

**Status:** ✅ Complete — question data, UI, and navigation logic are all working.

## Features

- [x] Question bank stored as a JS array of objects
- [x] Start screen, question screen, and results screen
- [x] Dynamic question rendering (no page reload between questions)
- [x] Score tracking
- [x] Progress bar / "Question X of Y" indicator
- [x] Final results screen with score summary and percentage message
- [x] Correct/wrong answer highlighting, answers lock after first click
- [x] "Next" disabled until an option is picked
- [x] Restart resets score, question index, and view
- [x] 5-minute countdown timer — auto-submits to results at 0:00
- [x] Code syntax highlighting & monospace styling for code snippets
- [x] Web Audio API sound effects (select, correct chime, wrong buzzer, victory fanfare) with mute toggle (`M`)
- [x] Full keyboard navigation (`1`–`4`, `A`–`D`, `Enter`, `Space`, `R`, `M`)
- [x] Canvas celebration confetti on scoring $\ge 70\%$
- [x] Smooth CSS screen transitions and micro-interactions (shake on wrong, pop on correct)

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (no libraries or frameworks)

## Project Structure

```
quizwave/
├── index.html      # Main HTML file
├── style.css       # Styling
├── questions.js    # Question bank (data only)
├── script.js       # Quiz logic (rendering, scoring, navigation)
└── README.md
```

## Getting Started

No build tools or installation required.

1. Clone the repo:
   ```bash
   git clone https://github.com/Umarcomrd/quizwave.git
   ```
2. Open `index.html` in your browser (or use a Live Server extension in VS Code).

Note: `script.js` uses `import`/`export`, so `index.html` must be served over `http(s)://` (Live Server, `npx serve`, etc.) rather than opened directly via `file://`.

## How It Works

Questions are stored in a `questions` array, where each question object has this shape:

```javascript
{
  questionText: "Which method converts a JavaScript object into a JSON string?",
  options: ["JSON.parse()", "JSON.stringify()", "Object.toString()", "Object.freeze()"],
  correctAnswer: 1 // index of the correct option in the options array
}
```

The app tracks the current question with an index, renders one question at a time, and updates the score as the user answers.

## Stretch Ideas (not yet done)

- Shuffle question/option order each playthrough
- Store high score in localStorage
- "Review Answers" screen
- Multiple quiz categories

## Author

**Umar** ([@Umarcomrd](https://github.com/Umarcomrd))
CS/IT student, building this as part of hands-on JavaScript practice.

## License

MIT