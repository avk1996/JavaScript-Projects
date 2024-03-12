const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;
  let results = document.getElementById("result");
  if (height === "" || height < 0 || isNaN(height)) {
    results.innerHTML = "please give a valid height";
  } else if (weight === "" || weight < 0 || isNaN(weight)) {
    results.innerHTML = "please give a valid weight";
  } else {
    const bmi = (weight / (height * height)).toFixed(2);
    let index = "";
    let bgColor = "white";
    if (bmi <= 18.5) {
      index = "Underweight";
      bgColor = "red";
    } else if (bmi <= 25 && bmi > 18.5) {
      index = "Healthy";
      bgColor = "green";
    } else if (bmi > 25 && bmi <= 30) {
      index = "Overweight";
      bgColor = "yellow";
    } else if (bmi > 30) {
      index = "Obesity";
      bgColor = "coral";
    }
    results.innerHTML = `<div style="background-color: ${bgColor};width: fit-content;">Answer: ${bmi} ${index}</div>`;
  }
});
