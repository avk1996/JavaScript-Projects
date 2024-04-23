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
  const errorDiv = document.createElement("div");
  errorDiv.className = "wrongKey";
  console.log(errorDiv);
}
