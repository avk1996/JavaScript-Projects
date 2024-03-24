const buttons = document.querySelectorAll("button");
let inputs = "";

Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    const selectChar = e.target.textContent;
    console.log(`clicked: ${e.target.textContent}`);
    inputs += e.target.textContent;
    if (selectChar === "=") {
      inputs = evaluates(inputs);
      inPutValue(inputs);
    } else if (selectChar === "DEL") {
      inputs = inputs.replace("DEL", "");
      const lastChar = inputs.slice(-1);
      console.log(lastChar);
      inputs = inputs.replace(lastChar, "");
      inPutValue(inputs);
    } else if (selectChar === "AC") {
      inPutValue("");
      inputs = "";
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

const evaluates = (string) => {
  string = string.replace("=", "");

  let operandOne = 0;
  let operandTwo = 0;

  let operation = [];
  if (string.includes("+")) {
    operation = string.split("+");
    console.log(operation);
    operandOne = parseFloat(operation[0]);
    operandTwo = parseFloat(operation[1]);
    return add(operandOne, operandTwo);
  } else if (string.includes("-")) {
    operation = string.split("-");
    console.log(operation);
    return difference(operation[0], operation[1]);
  } else if (string.includes("/")) {
    operation = string.split("/");
    console.log(operation);
    return division(operation[0], operation[1]).toPrecision(5);
  } else if (string.includes("*")) {
    operation = string.split("*");
    console.log(operation);
    return product(operation[0], operation[1]).toPrecision(5);
  } else {
    console.log("wrong");
  }
};
