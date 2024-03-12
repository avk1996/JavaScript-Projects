const sayMyName = function () {
  console.log("Heisenberg");
};

const changeText = function () {
  document.querySelector("h1").innerHTML = "Best JS Series";
};

// Now i want to stop the change in the middle
// we can do by clearTimeout
// step1: we set reference to setTimeout

const stopChangeName = setTimeout(changeText, 2000);

document.querySelector("#stop").addEventListener("click", function () {
  clearTimeout(stopChangeName);
  console.log("stop applied");
});
