const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector(".result");
const allClearBtn = document.querySelector(".ac");
const clearBtn = document.querySelector('.clear');
const equalsBtn = document.querySelector(".equals");
const decimalBtn = document.querySelector('.decimal');

let result = null;
let firstNum = null;
let secondNum = null;
let currentOperator = null;

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
  }
}

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    setNumber(e.target.value);
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", (e) => {
    setOperator(e.target.value);
    if (e.target.value == '/' && display.textContent == '0') {
      alert("Can't divide by 0");
      clearAll();
      return false;
    }
  });
});

allClearBtn.addEventListener("click", clearAll);

equalsBtn.addEventListener("click", () => {
  if (display.textContent && firstNum && currentOperator) {
    displayResult();

    operators.forEach((operator) => {
      operator.disabled = true;
      operator.style.opacity = '0.5';
    });

    equalsBtn.classList.add("clicked");
  } else {
    return;
  }
});

decimalBtn.addEventListener('click', isDecimal);

clearBtn.addEventListener('click', backSpace);

window.addEventListener('keydown', keyPressed);


function setNumber(e) {
  if (equalsBtn.classList.contains("clicked")) {
    clearAll();

    operators.forEach((operator) => {
      operator.disabled = false;
      operator.style.opacity = '1';
    });

    equalsBtn.classList.remove("clicked");
  }
  if (display.textContent.length > 12) return;
  if (display.textContent && currentOperator && firstNum && secondNum) {
    firstNum = display.textContent;
    display.textContent = "";
  }
  if (!display.textContent) display.textContent = e;
  else display.textContent += e;
}

function setOperator(e) {
  if (equalsBtn.classList.contains("clicked")) {
    return;
  }
  if (display.textContent && !currentOperator) {
    currentOperator = e;
    firstNum = display.textContent;
    display.textContent = "";
  }
  if (display.textContent && firstNum && currentOperator) {
    displayResult(e);
  }
}

function clearAll() {
  display.textContent = "";
  result = null;
  firstNum = null;
  secondNum = null;
  currentOperator = null;

  operators.forEach((operator) => {
    operator.disabled = false;
    operator.style.opacity = '1';
  });
}

function displayResult(e) {
  secondNum = display.textContent;
  if (currentOperator == '/' && display.textContent == '0') {
    alert("Can't divide by 0");
    clearAll();
    return false;
  }
  result = operate(currentOperator, Number(firstNum), Number(secondNum));
  currentOperator = e;
  if (Array.from(String(result)).length > 10) {
    display.textContent = result.toPrecision(10);
  } else {
    display.textContent = result;
  }
  firstNum = display.textContent;
}

function isDecimal() {
  if (display.textContent.includes('.') || display.textContent == "") {
    return;
  } 
  else display.textContent += '.';
}

function backSpace() {
  display.textContent = display.textContent.slice(0, display.textContent.length - 1);
}

function keyPressed(e) {
  if (e.key >= 0 && e.key <= 9) setNumber(e.key);
  if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') setOperator(e.key);
  if (e.key == '.') isDecimal(e.key);
  if (firstNum != null && display.textContent != "" && e.key == '=' || e.key == 'Enter') {
    displayResult();
    equalsBtn.classList.add('clicked');
  };
  if (e.key == 'Backspace') backSpace();
  if (e.key == 'Escape') clearAll();
}