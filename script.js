import { questions } from "./questions.js";

// track the current index of the displayed question
let currentIndex = 0;

function renderQuestion() {
  const q = questions[currentIndex];

  // update the question text

  document.getElementById("question-heading").textContent = q.questionText;

  // update each existing button instead of creating new ones
  const optionButtons = document.querySelectorAll(".option");
  optionButtons.forEach((btn, i) => {
    btn.querySelector(".option-text").textContent = q.options[i];
    btn.classList.remove("is-selected"); // clear old selection styling
    btn.onclick = () => checkAnswer(i);
  });

  // update "Question X of 10"
  document.querySelector(".progress-count strong").textContent = currentIndex + 1;
}






function showScreen(screenClass) {
  // hide all screens so only one is visible at a time
  document.querySelectorAll(".screen").forEach(screen => {
    screen.style.display = "none";
  });

  // show the requested screen by its class name
  document.querySelector("." + screenClass).style.display = "block";
}

const start = document.querySelector(".js-btntab");
const nextBtn = document.getElementById("next-btn");

start.addEventListener("click", () => {
  // begin the quiz by showing the question screen and rendering the first question
  showScreen("question-screen");
  renderQuestion();
  startTimer();  
});

nextBtn.addEventListener("click", () => {
  // advance to the next question index
  currentIndex++;


  if (currentIndex >= questions.length) {
    // if there are no more questions, show the results screen
    showScreen("results-screen");
  } else {
    renderQuestion();
  }
});




 // quiz timer logic

let timeLeft = 300; // 5 minutes, in seconds
let timerInterval = null;

function startTimer() {
  timeLeft = 300; // reset to 5 minutes every time quiz starts
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showScreen("results-screen");
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formatted = minutes + ":" + String(seconds).padStart(2, "0");
  document.querySelector(".progress-score").textContent = formatted;
}





// initialize the app by displaying the start screen
showScreen("start-screen");
/*

// usage:
showScreen("start-screen");
showScreen("question-screen");
showScreen("results-screen"); */


