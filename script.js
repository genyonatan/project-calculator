let calcStates = {
  offState: "OFF",
  initialInputState: "FIRST INPUT",
  operandInputState: "OPERATOR INPUT",
  secondInputState: "SECOND INPUT",
};

let calData = {
  isDecimal: false,
  firstInput: 0,
  secondInput: 0,
  operator: "",
};

let calcState = calcStates.offState;
initialPrompt = "Click on Display to start";

const promptEl = document.querySelector("#promptEl");
promptEl.textContent = initialPrompt;
const displayEl = document.querySelector("#display");
const calBtns = document.querySelector(".calc-btns");
const operationBadge = document.querySelector("#operation");
operationBadge.style.display = "none";

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
      operationBadge.style.display = "none";
      displayEl.textContent = "";
      displayEl.classList.toggle("displayOn");
      break;
  }
});

calBtns.addEventListener("click", (e) => {
  if (e.target.classList.contains("numericBtns")) {
    switch (calcState) {
      case calcStates.initialInputState:
        let num = e.target.textContent;
        displayEl.textContent += num;
        break;

      case calcStates.secondInputState:
        let num2 = e.target.textContent;
        displayEl.textContent += num2;
        break;

      case calcStates.operandInputState:
        console.log("invalid input!");
        break;
    }
  }

  if (e.target.id === "equalsBtn") {
    switch (calcState) {
      case calcStates.initialInputState:
        if (!displayEl.textContent == "") {
          calData.firstInput = parseFloat(displayEl.textContent);
          displayEl.textContent = "";
          promptEl.textContent = "enter an operator:";
          calcState = calcStates.operandInputState;
          calData.isDecimal = false;
          operationBadge.textContent = `${calData.firstInput} `;
          operationBadge.style.display = "flex";
          console.log(calData.firstInput);
        } else {
          console.log("field empty!");
        }
        break;

      case calcStates.operandInputState:
        calData.operator = displayEl.textContent;
        displayEl.textContent = "";
        operationBadge.textContent = `${calData.firstInput} ${calData.operator} `;

        promptEl.textContent = "Enter the second number: ";
        calcState = calcStates.secondInputState;
        console.log(calData.operator);
        break;

      case calcStates.secondInputState:
        if (!displayEl.textContent == "") {
          calData.secondInput = parseFloat(displayEl.textContent);
          operationBadge.textContent += `${calData.secondInput} = `;
          displayEl.textContent = operate(
            calData.operator,
            calData.firstInput,
            calData.secondInput
          );
          calData.firstInput = parseFloat(displayEl.textContent);
          operationBadge.textContent += `${calData.firstInput}`;

          promptEl.textContent = "Solution :";
          calcState = calcStates.operandInputState;
          calData.isDecimal = false;
          console.log(calData.secondInput);
          console.log(`= ${calData.firstInput}`);
        } else {
          console.log("field empty!");
        }
        break;
    }
  }

  if (e.target.id === "dotBtn") {
    switch (calcState) {
      case calcStates.initialInputState:
        if (!calData.isDecimal) {
          displayEl.textContent += ".";
          isDecimal = true;
        } else {
          console.log("already Decimal!");
        }
        break;
      case calcStates.secondInputState:
        if (!calData.isDecimal) {
          displayEl.textContent += ".";
          isDecimal = true;
        } else {
          console.log("already Decimal!");
        }
        break;
    }
  }

  if (e.target.classList.contains("operator")) {
    switch (calcState) {
      case calcStates.operandInputState:
        displayEl.textContent = e.target.textContent;
        break;
    }
  }

  if (e.target.classList.contains("clearBtn")) {
    switch (calcState) {
      case calcStates.offState:
        console.log("switch it on first!");
        break;
      default:
        calData.firstInput = 0;
        calData.secondInput = 0;
        calData.isDecimal = false;
        calData.operator = "";

        displayEl.textContent = "";
        operationBadge.textContent = "";
        promptEl.textContent = "enter a number";
        calcState = calcStates.initialInputState;
        break;
    }
  }
});
