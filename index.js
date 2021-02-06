const numbers = document.querySelectorAll(".number");
const decimal = document.querySelector(".decimal");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear");

let firstNum = "";
let secondNum = "";
let operator = "";

// Operations
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

//Operate
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
  }
}

function addNumberToScreen(e) {
  if (display.textContent === firstNum && secondNum === "") {
    display.textContent = "";
  }
  if (display.textContent !== "0") {
    display.textContent += e;
  } else {
    display.textContent = e;
  }
}

function isOperator(e) {
  if (firstNum !== "" && secondNum !== "") {
    display.textContent = roundToDecimal(
      operate(operator, parseFloat(firstNum), parseFloat(secondNum))
    );
    firstNum = display.textContent;
    display.textContent = "";
    secondNum = "";
    operator = "";
  } else if (firstNum !== "" && operator !== "") {
    secondNum = display.textContent;
    display.textContent = roundToDecimal(
      operate(operator, parseFloat(firstNum), parseFloat(secondNum))
    );
    firstNum = display.textContent;
    secondNum = "";
    operator = e;
  } else if (firstNum === "") {
    firstNum = display.textContent;
    operator = e;
    display.textContent = "";
  }
}

function result() {
  secondNum = display.textContent;
  if (operator === "/" && secondNum === "0") {
    clearAll();
  } else {
    display.textContent = roundToDecimal(
      operate(operator, parseFloat(firstNum), parseFloat(secondNum))
    );
    firstNum = display.textContent;
    secondNum = "";
    operator = "";
  }
}

function clearAll() {
  display.textContent = "0";
  firstNum = "";
  secondNum = "";
  operator = "";
}

function isDecimal(e) {
  // Check if the button clicked is a decimal
  if (display.textContent.includes(".")) return;
  display.textContent += e.target.value;
}

function roundToDecimal(e) {
  e *= 100000;
  e = Math.round(e);
  return e / 100000;
}

//DOM
numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    const clickedNum = e.target.value;
    addNumberToScreen(clickedNum);
  });
});

operators.forEach((button) => {
  button.addEventListener("click", (e) => {
    const operator = e.target.value;
    isOperator(operator);
  });
});

equals.addEventListener("click", result);

clearBtn.addEventListener("click", clearAll);

decimal.addEventListener("click", isDecimal);
