"use strict";

// Selecting elements
// Players
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
// Scores
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
// Current scores
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
// Dice
const diceEl = document.querySelector(".dice");
// Buttons
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// On first  page load
init();

// Dice roll
btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("hidden");
    // Roll != 1 : add to score
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      // Roll = 1 : reset current score and switch player
    } else {
      switchPlayer();
    }
  }
});

// Holding score
btnHold.addEventListener("click", function () {
  if (playing) {
    // Add score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if score >= 100
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Reset current score and switch player
      switchPlayer();
    }
  }
});

// New game
btnNew.addEventListener("click", init);
