const actualNumber = Math.floor(Math.random() * 100) + 1;

const prevGuess = (document.querySelector("#prev_guess").innerHTML = [
  "nothing",
]);
const remains = document.querySelector("#remains");
const submit = document.querySelector("#sbr");
const userGuess = document.querySelector("#guess");
const low_high = document.querySelector("low_high");
