function colorChanger() {
  const hex = "0123456789ABCDEF";
  let colorRandom = "#";
  for (let index = 0; index < 6; index++) {
    colorRandom += hex[Math.floor(Math.random() * 16)];
  }
  console.log(colorRandom);
  return colorRandom;
}

document.getElementById("color-change").addEventListener("click", () => {
  const color = colorChanger();
  document.body.style.backgroundColor = color;
  document.getElementById("color-code").innerHTML = color;
  document.getElementById("color-code").style.color = color;
  document.getElementById("color-change").style.color = color;
});
