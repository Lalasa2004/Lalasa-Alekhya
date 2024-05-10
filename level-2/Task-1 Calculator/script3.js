const numberButtons = document.querySelectorAll(".button");
const inputBox = document.querySelector(".calculator-screen");
const para = document.getElementById("para");

let calculation = ""; // Variable to store the calculation process
let negativeFlag = false; // Flag to keep track of the negative symbol

function evaluateExpression(expression) {
  try {
    const withExplicitMultiplication = expression.replace(/([\d.]+)([(])/g, "$1*$2");
    const withoutPercentage = withExplicitMultiplication.replace(/%/g, "/100");
    const withDivideSymbol = withoutPercentage.replace(/÷/g, "/");
    const withExponentiationSymbol = withDivideSymbol.replace(/\^/g, "**");
    return Function(`'use strict'; return (${withExponentiationSymbol})`)();
  } catch (error) {
    console.error("Error evaluating expression:", error);
    return null;
  }
}

// Function to handle sign change
function handleSignChange() {
  if (inputBox.value === "") {
    inputBox.value = "-"; // Add "-" symbol if input box is empty
    calculation += "-";
  } else if (inputBox.value === "-") {
    inputBox.value = ""; // Remove "-" symbol if it's already present
    calculation = calculation.slice(0, -1);
  } else {
    const currentValue = parseFloat(inputBox.value);
    const newValue = -currentValue;
    inputBox.value = newValue; // Toggle the sign change for the current value
    calculation = calculation.slice(0, -currentValue.toString().length) + newValue;
  }
  para.innerText = calculation;
}

// Function to handle button clicks
function handler() {
  const buttonText = this.innerText;
  if (buttonText === "AC") {
    // Clear the calculator screen, calculation process, and paragraph content
    inputBox.value = "";
    calculation = "";
    para.innerText = "";
  } else if (buttonText === "C") {
    inputBox.value = inputBox.value.slice(0, -1); // Remove the last character from the input box
    calculation = calculation.slice(0, -1); // Remove the last character from the calculation process
    para.innerText = calculation;
  } else if (buttonText === "=") {
    const result = evaluateExpression(calculation);
    inputBox.value = result !== null ? result : "";
    para.innerText = calculation + " = " + inputBox.value;
  } else if (buttonText === "%") {
    const percentage = evaluateExpression(calculation) / 100;
    inputBox.value = percentage;
    calculation = percentage.toString();
    para.innerText = calculation;
  } else if (buttonText === ".") {
    if (!calculation.includes(".")) {
      inputBox.value += buttonText;
      calculation += buttonText;
      para.innerText = calculation;
    }
  } else if (buttonText === "√") {
    const sqrt = Math.sqrt(evaluateExpression(calculation));
    inputBox.value = sqrt;
    calculation = sqrt.toString();
    para.innerText = calculation;
  } else if (buttonText === "(" || buttonText === ")") {
    inputBox.value += buttonText;
    calculation += buttonText;
    para.innerText = calculation;
  } else if (buttonText === "÷" || buttonText === "^") {
    inputBox.value += buttonText;
    calculation += buttonText;
    para.innerText = calculation;
  } else if (buttonText === "+/-") {
    handleSignChange(); // Handle sign change button click
  } else {
    // Check if the input is a number or a valid operator (+, -, *, /)
    if (!isNaN(buttonText) || ["+", "-", "*", "/"].includes(buttonText)) {
      inputBox.value += buttonText;
      calculation += buttonText;
      para.innerText = calculation;
    }
  }
}

// Add click event listeners to number buttons
numberButtons.forEach(function (button) {
  button.addEventListener("click", handler);
});

// Add event listener for Enter key press
document.addEventListener("keydown", function (event) {
  const buttonText = event.key;
  if (buttonText === "Enter") {
    const result = evaluateExpression(calculation);
    inputBox.value = result !== null ? result : "";
    para.innerText = calculation + " = " + inputBox.value;
  } else if (
    !isNaN(buttonText) ||
    ["+", "-", "*", "/", ".", "%", "(", ")", "÷", "^"].includes(buttonText)
  ) {
    inputBox.value += buttonText;
    calculation += buttonText;
    para.innerText = calculation;
  }
});
