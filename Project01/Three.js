function changeTitle(str) {
  //   console.log("Abhishek at ", Date.now());
  document.querySelector("h1").innerHTML = str + " " + Date.now();
}

const stopMe = setInterval(changeTitle, 1000, "Hi");

document.querySelector("#stop").addEventListener("click", () => {
  clearInterval(stopMe);
});

document.querySelector("#start").addEventListener("click", () => {
  document.querySelector("h1").innerHTML = "You My Friend is the real HERO";
  clearInterval(stopMe);
});
