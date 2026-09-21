import { questions } from "./questions.js";

/**
 * ====================================================================
 * QuizWave — JavaScript Fundamentals
 * Modernized with Web Audio effects, confetti animations, keyboard
 * shortcuts, code syntax formatting, and structured state management.
 * ====================================================================
 */

/* ====================================================================
   1. Audio Synthesizer (Zero-dependency Web Audio API)
   ==================================================================== */
class AudioManager {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem("quizwave_muted") === "true";
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem("quizwave_muted", String(this.muted));
    return this.muted;
  }

  playSelect() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = "sine";
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.07);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  playCorrect() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Harmonious ascending triad: C5 (523Hz), E5 (659Hz), G5 (784Hz)
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = this.ctx.currentTime + idx * 0.06;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.12, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + 0.25);
    });
  }

  playWrong() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Low descending buzzy tone
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(230, now);
    osc.frequency.linearRampToValueAtTime(140, now + 0.22);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  playFanfare() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Triumphant multi-tone chord sweep
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = this.ctx.currentTime + idx * 0.08;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.16, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(start);
      osc.stop(start + 0.35);
    });
  }
}

/* ====================================================================
   2. Celebration Confetti Engine (Zero-dependency Canvas)
   ==================================================================== */
class ConfettiEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
    this.particles = [];
    this.animId = null;

    if (this.canvas) {
      window.addEventListener("resize", () => this.handleResize());
    }
  }

  handleResize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  fire() {
    if (!this.canvas || !this.ctx) return;
    this.handleResize();
    this.particles = [];

    const colors = ["#d9a94e", "#f0c775", "#14ccb8", "#9b6bff", "#f5934a", "#e94f9d"];
    const count = 130;

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.canvas.width * 0.5 + (Math.random() - 0.5) * 180,
        y: this.canvas.height * 0.45 + (Math.random() - 0.5) * 60,
        vx: (Math.random() - 0.5) * 14,
        vy: Math.random() * -12 - 4,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        decay: Math.random() * 0.007 + 0.006
      });
    }

    if (this.animId) cancelAnimationFrame(this.animId);
    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let activeParticles = 0;
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.vx *= 0.985; // air resistance
      p.rotation += p.rotationSpeed;
      p.opacity -= p.decay;

      if (p.opacity > 0 && p.y < this.canvas.height) {
        activeParticles++;
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.globalAlpha = Math.max(0, p.opacity);
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
        this.ctx.restore();
      }
    });

    if (activeParticles > 0) {
      this.animId = requestAnimationFrame(() => this.animate());
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

/* ====================================================================
   3. Syntax & Text Formatting Helpers
   ==================================================================== */
function formatCodeText(str) {
  if (!str) return "";
  // Escape HTML entities to prevent injection
  const escaped = str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Format markdown backtick code snippets: `code` -> <code class="code-pill">code</code>
  return escaped.replace(/`([^`]+)`/g, '<code class="code-pill">$1</code>');
}

/* ====================================================================
   4. Application State & Elements
   ==================================================================== */
const state = {
  currentIndex: 0,
  score: 0,
  hasAnswered: false,
  timeLeft: 300,
  timerInterval: null,
  activeScreen: "start-screen"
};

const audio = new AudioManager();
const confetti = new ConfettiEngine("confetti-canvas");

// DOM Elements
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const soundBtn = document.getElementById("sound-btn");
const questionHeading = document.getElementById("question-heading");
const optionButtons = document.querySelectorAll(".option");
const progressCount = document.querySelector(".progress-count strong");
const progressFill = document.querySelector(".progress-fill");
const progressTrack = document.querySelector(".progress-track");
const timerDisplay = document.querySelector(".progress-score");
const hintElement = document.querySelector(".hint");
const scoreValue = document.querySelector(".score-value");
const scoreMessage = document.querySelector(".score-message");

/* ====================================================================
   5. View Routing & Screen Transitions
   ==================================================================== */
function showScreen(screenClass) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.remove("active");
    screen.style.display = "none";
  });

  const target = document.querySelector("." + screenClass);
  if (target) {
    target.style.display = "block";
    target.classList.add("active");
    state.activeScreen = screenClass;
  }
}

/* ====================================================================
   6. Core Quiz Logic
   ==================================================================== */

/**
 * Render current question, options, progress, and button states
 */
function renderQuestion() {
  const q = questions[state.currentIndex];
  state.hasAnswered = false;

  // Render question text with syntax highlighting
  questionHeading.innerHTML = formatCodeText(q.questionText);

  // Update options
  optionButtons.forEach((btn, i) => {
    const textSpan = btn.querySelector(".option-text");
    if (textSpan) {
      textSpan.innerHTML = formatCodeText(q.options[i]);
    }
    btn.classList.remove("is-correct", "is-wrong");
    btn.disabled = false;
    btn.onclick = () => checkAnswer(i);
  });

  // Update progress indicator
  progressCount.textContent = state.currentIndex + 1;
  const percentDone = ((state.currentIndex + 1) / questions.length) * 100;
  progressFill.style.width = percentDone + "%";
  if (progressTrack) {
    progressTrack.setAttribute("aria-valuenow", Math.round(percentDone));
  }

  // Update Next button
  nextBtn.disabled = true;
  const labelSpan = nextBtn.querySelector(".btn-label");
  const isLastQuestion = state.currentIndex === questions.length - 1;
  if (labelSpan) {
    labelSpan.textContent = isLastQuestion ? "See Results" : "Next Question";
  }

  hintElement.textContent = "Select an option or press 1–4 / A–D";
}

/**
 * Handle user selection, update score, play sound/haptic feedback
 */
function checkAnswer(selectedIndex) {
  if (state.hasAnswered) return;
  state.hasAnswered = true;

  const q = questions[state.currentIndex];
  const isCorrect = selectedIndex === q.correctAnswer;

  // Haptic feedback (if supported on mobile devices)
  if (navigator.vibrate) {
    navigator.vibrate(isCorrect ? 35 : [50, 40, 50]);
  }

  // Lock buttons and highlight correct / chosen options
  optionButtons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correctAnswer) {
      btn.classList.add("is-correct");
    } else if (i === selectedIndex) {
      btn.classList.add("is-wrong");
    }
  });

  // Sound and score feedback
  if (isCorrect) {
    state.score++;
    audio.playCorrect();
    hintElement.textContent = "Correct! Press Enter ↵ to continue";
  } else {
    audio.playWrong();
    hintElement.textContent = "Incorrect. Press Enter ↵ to continue";
  }

  nextBtn.disabled = false;
}

/**
 * Display final results, trigger fanfare and confetti if pass mark met
 */
function showResults() {
  clearInterval(state.timerInterval);
  showScreen("results-screen");

  const percentage = Math.round((state.score / questions.length) * 100);

  scoreValue.innerHTML = `${state.score}<span class="score-total"> / ${questions.length}</span>`;

  let message;
  if (percentage < 50) {
    message = `${percentage}% — keep practicing!`;
  } else if (percentage < 70) {
    message = `${percentage}% — getting closer, keep going!`;
  } else {
    message = `${percentage}% — outstanding work! Above pass mark!`;
    audio.playFanfare();
    confetti.fire();
  }
  scoreMessage.textContent = message;
}

/* ====================================================================
   7. Timer Logic
   ==================================================================== */
function startTimer() {
  state.timeLeft = 300; // 5 minutes in seconds
  clearInterval(state.timerInterval);
  updateTimerDisplay();

  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    updateTimerDisplay();

    if (state.timeLeft <= 0) {
      clearInterval(state.timerInterval);
      showResults();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft % 60;
  const formatted = `${minutes}:${String(seconds).padStart(2, "0")}`;
  if (timerDisplay) {
    timerDisplay.textContent = formatted;
  }
}

/* ====================================================================
   8. Audio Toggle UI
   ==================================================================== */
function updateAudioUI() {
  if (!soundBtn) return;
  const icon = soundBtn.querySelector(".sound-icon");
  if (audio.muted) {
    soundBtn.classList.add("is-muted");
    soundBtn.setAttribute("title", "Sound Muted (Press M to unmute)");
    if (icon) icon.textContent = "🔇";
  } else {
    soundBtn.classList.remove("is-muted");
    soundBtn.setAttribute("title", "Sound Active (Press M to mute)");
    if (icon) icon.textContent = "🔊";
  }
}

/* ====================================================================
   9. Keyboard Navigation System
   ==================================================================== */
window.addEventListener("keydown", (e) => {
  // Ignore shortcuts if user is typing into an input or textarea
  const activeTag = document.activeElement ? document.activeElement.tagName : "";
  if (activeTag === "INPUT" || activeTag === "TEXTAREA") return;

  const key = e.key;

  // Toggle audio on 'M' or 'm'
  if (key === "m" || key === "M") {
    e.preventDefault();
    audio.toggleMute();
    updateAudioUI();
    return;
  }

  // Handle keys by active screen
  switch (state.activeScreen) {
    case "start-screen": {
      if (key === "Enter" || key === " ") {
        e.preventDefault();
        startBtn.click();
      }
      break;
    }

    case "question-screen": {
      // 1-4 or A-D option selection
      const keyMap = {
        "1": 0, "a": 0, "A": 0,
        "2": 1, "b": 1, "B": 1,
        "3": 2, "c": 2, "C": 2,
        "4": 3, "d": 3, "D": 3
      };

      if (!state.hasAnswered && key in keyMap) {
        e.preventDefault();
        const selectedOption = optionButtons[keyMap[key]];
        if (selectedOption && !selectedOption.disabled) {
          selectedOption.click();
        }
      } else if (state.hasAnswered && (key === "Enter" || key === " " || key === "ArrowRight")) {
        e.preventDefault();
        if (!nextBtn.disabled) {
          nextBtn.click();
        }
      }
      break;
    }

    case "results-screen": {
      if (key === "Enter" || key === " " || key === "r" || key === "R") {
        e.preventDefault();
        restartBtn.click();
      }
      break;
    }
  }
});

/* ====================================================================
   10. Event Listeners & Bootstrapping
   ==================================================================== */
startBtn.addEventListener("click", () => {
  audio.playSelect();
  showScreen("question-screen");
  renderQuestion();
  startTimer();
});

nextBtn.addEventListener("click", () => {
  audio.playSelect();
  state.currentIndex++;

  if (state.currentIndex >= questions.length) {
    showResults();
  } else {
    renderQuestion();
  }
});

restartBtn.addEventListener("click", () => {
  audio.playSelect();
  state.currentIndex = 0;
  state.score = 0;
  state.hasAnswered = false;
  showScreen("start-screen");
});

if (soundBtn) {
  soundBtn.addEventListener("click", () => {
    audio.toggleMute();
    updateAudioUI();
  });
}

// Initial state setup
updateAudioUI();
showScreen("start-screen");