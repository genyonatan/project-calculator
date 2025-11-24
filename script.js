let calcState = {
  offState: "OFF",
  initialInputState: "FIRST INPUT",
  operandInputState: "OPERATOR INPUT",
  secondInputState: "SECOND INPUT",
};

isDecimal = true;
initialPrompt = "Clcik on Display to start";

const promptEl = document.querySelector(".promptDiv");
promptEl.textContent = initialPrompt;
const displayEl = document.querySelector(".calculatory-display");
const calBtns = document.querySelector(".calc-btns");

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      alert("no operator selected!");
      break;
  }
}

const calcGrid = document.querySelector(".calc-btns");
const numericBtns = document.createElement(div);
