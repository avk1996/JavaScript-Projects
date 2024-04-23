const mainPage = document.querySelector(".errorArea");
const errorDiv = document.createElement("div");

const playSound = (e) => {
  // storing to referece audio in tag audio
  const audio = document.querySelector(`audio[data-key="${e.key}"]`);

  // for animating the key
  const key = document.querySelector(`.key[data-key="${e.key}"]`);

  // if key is not present in audio set
  if (!audio) {
    errorKeyPressed();
    return;
  }
  // console.log(audio);

  // rewind to start - to play over and over again
  audio.currentTime = 0;

  // to play sound
  audio.play();

  key.classList.add("playing");

  removeError();
};

window.addEventListener("keydown", playSound);

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  // console.log(e.propertyName);
  this.classList.remove("playing");
}

// we need to remove the playing class
const keys = document.querySelectorAll(".key");

keys.forEach((key) => {
  key.addEventListener("transitionend", removeTransition);
});

function errorKeyPressed() {
  console.log("Error key pressed");
  errorDiv.className = "wrongKey";

  errorDiv.innerHTML = `
  <h1>Wrong key pressed</h1>
  `;

  mainPage.appendChild(errorDiv);

  setTimeout(() => {
    mainPage.removeChild(errorDiv);
  }, 2000);

  console.log(errorDiv);
}

function removeError() {
  mainPage.removeChild(errorDiv);
}
