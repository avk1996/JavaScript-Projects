document.querySelector("h1").innerHTML = "Press 'start' to change color";
function colorRandom() {
  const hex = "0123456789ABCDE";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color = color + hex[Math.floor(Math.random() * 16)];
  }
  return color;
}

let color;

function startColorChange() {
  if (!color) {
    color = setInterval(() => {
      document.body.style.backgroundColor = colorRandom();
    }, 100);
  }
  document.querySelector("h1").innerHTML = "Press 'stop' to change color";
}
function stopColorChange() {
  clearInterval(color);
  document.querySelector("h1").innerHTML = "Press 'start' to change color";
  color = null;
}

document.querySelector("#start").addEventListener("click", startColorChange);
document.querySelector("#stop").addEventListener("click", stopColorChange);
