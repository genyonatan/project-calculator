let calcStates = {
  offState: "OFF",
  initialInputState: "FIRST INPUT",
  operandInputState: "OPERATOR INPUT",
  secondInputState: "SECOND INPUT",
};

let calcState = calcStates.offState;
isDecimal = true;
initialPrompt = "Clcik on Display to start";

const promptEl = document.querySelector(".promptDiv");
promptEl.textContent = initialPrompt;
const displayEl = document.querySelector(".calculator-display");
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

displayEl.addEventListener("click", () => {
  switch (calcState) {
    case calcStates.offState: // to turn the calculator On.
      displayEl.classList.add("displayOn");
      promptEl.textContent = "enter a number";
      calcState = calcStates.initialInputState;
      break;
    default: //to turn the calculator Off.
      calcState = calcStates.offState;
      promptEl.textContent = initialPrompt;
      displayEl.classList.toggle("displayOn");
      break;
  }
});

calBtns.addEventListener("click", () => {});
