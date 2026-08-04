import { questions } from "./questions.js";


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
  // hide every screen first
  document.querySelectorAll(".screen").forEach(screen => {
    screen.style.display = "none";
  });

  // show only the one requested
  document.querySelector("." + screenClass).style.display = "block";
}


 let start = document.querySelector(".js-btntab");

start.addEventListener("click", () => {
  showScreen("question-screen");
    renderQuestion();
});


let nextBtn = document.getElementById("next-btn");

nextBtn.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex >= questions.length) {
    showScreen("results-screen");
  } else {
    renderQuestion();
  }
});

showScreen("start-screen");
/*

// usage:
showScreen("start-screen");
showScreen("question-screen");
showScreen("results-screen"); */

