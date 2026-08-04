# QuizWave

A JavaScript quiz app that tests your knowledge of core JavaScript concepts — objects, JSON, template literals, and more. Built with plain HTML, CSS, and JavaScript (no frameworks).

**Status:** 🚧 In progress — question data and UI are in place, quiz navigation logic (moving between questions, showing results) is currently being built.

## Features (planned)

- [x] Question bank stored as a JS array of objects
- [x] Start screen, question screen, and results screen
- [ ] Dynamic question rendering (no page reload between questions)
- [ ] Score tracking
- [ ] Progress bar / "Question X of Y" indicator
- [ ] Final results screen with score summary

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (no libraries or frameworks)

## Project Structure

```
quizwave/
├── quiz.html       # Main HTML file
├── style.css       # Styling
├── questions.js    # Question bank (data only)
├── script.js       # Quiz logic (rendering, scoring, navigation)
└── README.md
```

*(Adjust the above to match your actual file names/structure.)*

## Getting Started

No build tools or installation required.

1. Clone the repo:
   ```bash
   git clone https://github.com/Umarcomrd/quizwave.git
   ```
2. Open `quiz.html` in your browser (or use a Live Server extension in VS Code).

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

## Roadmap

- Finish question navigation logic
- Add score tracking and results screen
- Polish styling and responsiveness
- (Optional) Add a timer per question
- (Optional) Deploy via GitHub Pages

## Author

**Umar** ([@Umarcomrd](https://github.com/Umarcomrd))
CS/IT student, building this as part of hands-on JavaScript practice.

## License

MIT
