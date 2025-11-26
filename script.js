let calcStates = {
  offState: "OFF",
  initialInputState: "FIRST INPUT",
  secondInputState: "SECOND INPUT",
};

let calData = {
  isDecimal: false,
  firstInput: 0,
  secondInput: 0,
  operator: "",
};

let calcState = calcStates.offState;
initialPrompt = "Click The Power Button to start";

const promptEl = document.querySelector("#promptEl");
promptEl.textContent = initialPrompt;
const displayEl = document.querySelector("#display");
const calBtns = document.querySelector(".calc-btns");
const operationDisplay = document.querySelector("#operation");
const powerBtn = document.querySelector("#powerBtn");

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
      return Math.round(add(a, b) * 1000) / 1000;
    case "-":
      return Math.round(subtract(a, b) * 1000) / 1000;
    case "x":
      return Math.round(multiply(a, b) * 1000) / 1000;
    case "/":
      return Math.round(divide(a, b) * 1000) / 1000;
    default:
      alert("no operator selected!");
      break;
  }
}

powerBtn.addEventListener("click", () => {
  switch (calcState) {
    case calcStates.offState: // to turn the calculator On.
      displayEl.classList.add("displayOn");
      operationDisplay.classList.add("displayOn");
      promptEl.textContent = "enter a number";
      calcState = calcStates.initialInputState;
      break;
    default: //to turn the calculator Off.
      calcState = calcStates.offState;
      calData.firstInput = 0;
      calData.secondInput = 0;
      calData.isDecimal = false;
      calData.operator = "";
      promptEl.textContent = initialPrompt;
      displayEl.textContent = "";
      operationDisplay.textContent = "";
      displayEl.classList.remove("displayOn");
      operationDisplay.classList.remove("displayOn");
      break;
  }
});

calBtns.addEventListener("click", (e) => {
  if (e.target.classList.contains("numericBtns")) {
    if (displayEl.textContent.length <= 20) {
      switch (calcState) {
        case calcStates.initialInputState:
          let num = e.target.textContent;
          displayEl.textContent += num;
          promptEl.textContent = "press equal sign when done";
          break;

        case calcStates.secondInputState:
          let num2 = e.target.textContent;
          displayEl.textContent += num2;
          promptEl.textContent = "press equal sign when done";
          break;
      }
    }
  }

  if (e.target.id === "equalsBtn") {
    switch (calcState) {
      case calcStates.initialInputState:
        if (displayEl.textContent !== "") {
          calData.firstInput = parseFloat(displayEl.textContent);
          promptEl.textContent = "enter an operator";
          operationDisplay.textContent = calData.firstInput;
        } else {
          // calData.firstInput = 0;
          promptEl.textContent = "enter an operator";
          operationDisplay.textContent = calData.firstInput;
        }
        break;

      case calcStates.secondInputState:
        if (displayEl.textContent !== "") {
          calData.secondInput = parseFloat(displayEl.textContent);
          if (calData.operator == "/" && calData.secondInput == 0) {
            operationDisplay.textContent = "Error!";
            displayEl.textContent = "";
            calcState = calcStates.initialInputState;
            calData.firstInput = 0;
            calData.secondInput = 0;
            calData.isDecimal = false;
            calData.operator = "";
            promptEl.textContent = "enter a number :";
          } else {
            operationDisplay.textContent += ` ${calData.secondInput} = `;
            displayEl.textContent = operate(
              calData.operator,
              calData.firstInput,
              calData.secondInput
            );
            calData.firstInput = parseFloat(displayEl.textContent);

            operationDisplay.textContent += `${calData.firstInput}`;
            promptEl.textContent = `solution: `;
            displayEl.textContent = "";

            calcState = calcStates.initialInputState;
            calData.isDecimal = false;
            calData.operator = "";
            console.log(calData.secondInput);
            console.log(`= ${calData.firstInput}`);
          }
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
          calData.isDecimal = true;
        } else {
          console.log("already Decimal!");
        }
        break;
      case calcStates.secondInputState:
        if (!calData.isDecimal) {
          displayEl.textContent += ".";
          calData.isDecimal = true;
        } else {
          console.log("already Decimal!");
        }
        break;
    }
  }

  if (e.target.classList.contains("operator")) {
    switch (calcState) {
      case calcStates.initialInputState:
        if (displayEl.textContent !== "") {
          calData.firstInput = parseFloat(displayEl.textContent);
          calData.operator = e.target.textContent;

          displayEl.textContent = "";
          operationDisplay.textContent = `${calData.firstInput} ${calData.operator}`;
          promptEl.textContent = "enter the second number";

          calData.isDecimal = false;
          calcState = calcStates.secondInputState;
          console.log(calData.firstInput);
        } else {
          calData.operator = e.target.textContent;

          displayEl.textContent = "";
          operationDisplay.textContent = `${calData.firstInput} ${calData.operator}`;
          promptEl.textContent = "enter the second number";

          calData.isDecimal = false;
          calcState = calcStates.secondInputState;
          console.log(calData.firstInput);
        }
        break;

      case calcStates.secondInputState:
        if (displayEl.textContent !== "") {
          calData.secondInput = parseFloat(displayEl.textContent);
          if (calData.operator == "/" && calData.secondInput == 0) {
            operationDisplay.textContent = "Error can't divide by zero!";
            calcState = calcStates.initialInputState;
            calData.firstInput = 0;
            calData.secondInput = 0;
            calData.isDecimal = false;
            calData.operator = "";
            promptEl.textContent = "enter a number :";
          } else {
            operationDisplay.textContent = operate(
              calData.operator,
              calData.firstInput,
              calData.secondInput
            );
            calData.firstInput = parseFloat(operationDisplay.textContent);
            operationDisplay.textContent += ` ${e.target.textContent}`;
            promptEl.textContent = `solution: `;
            displayEl.textContent = "";

            calcState = calcStates.secondInputState;
            calData.isDecimal = false;
            calData.operator = e.target.textContent;
            console.log(calData.secondInput);
            console.log(`= ${calData.firstInput}`);
          }
        } else {
          calData.operator = e.target.textContent;
          operationDisplay.textContent = `${calData.firstInput} ${calData.operator}`;
        }
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
        operationDisplay.textContent = "";
        promptEl.textContent = "enter a number";
        calcState = calcStates.initialInputState;
        break;
    }
  }
});
