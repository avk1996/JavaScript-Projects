let change;
const startChange = function () {
  function titleChanger(str) {
    document.querySelector("h2").innerHTML = str + " " + Date.now();
  }

  change = setInterval(titleChanger, 100, "whats up");
  document.querySelector("h1").innerHTML = "you son of bit*h";
};

const stopChange = function () {
  clearInterval(change);
  console.log("clicked " + change);
  setTimeout(() => {
    document.querySelector("h1").innerHTML = "Don't press zat";
  }, 5000);
  document.querySelector("h1").innerHTML = "Thank you for your mercy my lord";
};

document.querySelector("#start").addEventListener("click", startChange);

document.querySelector("#stop").addEventListener("click", stopChange);
