"use strict";

// Theme Switching
const themeSwitch = document.querySelector(
  ".theme-switch input[type='checkbox']"
);

const switchTheme = function () {
  if (themeSwitch.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
};

themeSwitch.addEventListener("change", switchTheme);

// Calculator Logic

const keys = document.querySelectorAll("#calc span");
const operators = ["+", "-", "x", "÷"];
let decimalAdded = false;

// Add click event listener to each key
keys.forEach((key) => {
  key.addEventListener("click", handleClick);
});

// Handle key clicks
function handleClick(e) {
  e.preventDefault();

  const input = document.querySelector(".display");
  const inputValue = input.innerHTML;
  const keyValue = e.target.innerHTML;

  // Handle different key actions
  if (keyValue === "C") {
    clearInput(input);
  } else if (keyValue === "=") {
    evaluateExpression(inputValue, input);
  } else if (keyValue === "%" || keyValue === "+/-") {
    applySpecialOperation(inputValue, keyValue, input);
  } else if (keyValue === ".") {
    addDecimal(input);
  } else if (operators.indexOf(keyValue) !== -1) {
    handleOperator(keyValue, inputValue, input);
  } else {
    appendToInput(keyValue, input);
  }
}

// Clear the input
function clearInput(input) {
  input.innerHTML = "";
  decimalAdded = false;
}

// Evaluate the expression and display result
function evaluateExpression(expression, input) {
  let equation = expression;
  equation = equation.replace(/÷/g, "/").replace(/x/g, "*");

  const lastChar = equation.slice(-1);
  if (operators.indexOf(lastChar) !== -1 || lastChar === ".") {
    equation = equation.replace(/.$/, "");
  }

  if (equation) {
    input.innerHTML = eval(equation);
  }
}

// Apply special operations like % and +/-
function applySpecialOperation(value, operation, input) {
  if (operation === "%") {
    input.innerHTML = (parseFloat(value) / 100).toString();
  } else if (operation === "+/-") {
    input.innerHTML = (parseFloat(value) * -1).toString();
  }
  decimalAdded = false;
}

// Add decimal point to input
function addDecimal(input) {
  if (!decimalAdded) {
    appendToInput(".", input);
    decimalAdded = true;
  }
}

// Handle operator inputs
function handleOperator(operator, value, input) {
  const lastChar = value.slice(-1);

  if (value === "" || lastChar === "." || operators.indexOf(lastChar) !== -1) {
    input.innerHTML = value.replace(/.$/, operator);
  } else {
    appendToInput(operator, input);
  }
  decimalAdded = false;
}

// Append content to the input
function appendToInput(content, input) {
  input.innerHTML += content;
}
