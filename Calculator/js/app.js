const buttons = document.querySelectorAll("button");
let inputs = "";

Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    const selectChar = e.target.textContent;
    console.log(`clicked: ${e.target.textContent}`);
    inputs += e.target.textContent;
    if (selectChar === "=") {
      let result = 0;
      const operandOne = inputs[0];
      const operator = inputs[1];
      const operandTwo = inputs[2];
      console.log(`${operandOne}, ${operator}, ${operandTwo}`);
      if (operator === "+") {
        result = add(operandOne, operandTwo);
      } else if (operator === "-") {
        result = difference(operandOne, operandTwo);
      } else if (operator === "*") {
        result = product(operandOne, operandTwo);
      } else if (operator === "/") {
        result = division(operandOne, operandTwo).toPrecision(4);
      }
      console.log("result: " + result);
      inPutValue(result);
    } else if (selectChar === "DEL") {
    } else if (selectChar === "AC") {
      inPutValue("");
    } else {
      inPutValue(inputs);
    }
  });
});

const inPutValue = (data) => {
  document.querySelector("input").value = data;
};
const add = (a, b) => {
  console.log("you pressed addition");
  return parseFloat(a + b);
};
const difference = (a, b) => {
  console.log("you pressed difference");
  return parseFloat(a - b);
};
const product = (a, b) => {
  console.log("you pressed product");
  return parseFloat(a * b);
};
const division = (a, b) => {
  console.log("you pressed division");
  return parseFloat(a / b);
};
