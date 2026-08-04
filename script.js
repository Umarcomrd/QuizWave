//import { questions } from "./questions";

let html = '';
let clickBtn = document.querySelector('js-btn');
clickBtn.addEventListener('click', () => {
  questions.forEach((quest) => {
 html +=
  `
    <section class="screen js-questions" id="question-screen" aria-labelledby="question-heading">
      <div class="progress-bar">
        <div class="progress-meta">
          <span class="progress-count">Question <strong>3</strong> of 10</span>
          <span class="progress-score">Score: 2</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:30%"></div>
        </div>
      </div>

      <h2 id="question-heading" class="question-text">
        Which method converts a JavaScript object into a JSON string?
      </h2>

      <ul class="options-list">
        <li>
          <button class="option" type="button" data-index="0">
            <span class="option-letter">A</span>
            <span class="option-text">JSON.parse()</span>
          </button>
        </li>
        <li>
          <button class="option is-selected" type="button" data-index="1">
            <span class="option-letter">B</span>
            <span class="option-text">JSON.stringify()</span>
          </button>
        </li>
        <li>
          <button class="option" type="button" data-index="2">
            <span class="option-letter">C</span>
            <span class="option-text">Object.toString()</span>
          </button>
        </li>
        <li>
          <button class="option" type="button" data-index="3">
            <span class="option-letter">D</span>
            <span class="option-text">Object.freeze()</span>
          </button>
        </li>
      </ul>

      <div class="stage-footer">
        <span class="hint">Select an option to continue</span>
        <button class="btn btn-primary" id="next-btn" type="button">Next Question</button>
      </div>
    </section>


  `
});


document.querySelector('js-questions').innerHTML = html;
});
