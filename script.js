// =======================
// Variables & Constants
// =======================

// Primitive data types
let greeting = "Hello from JavaScript!";
let numA = 5;
let numB = 3;
let isOn = true;
let notAvailable = null;

// Array and Object
const fruits = ["Apple", "Banana", "Cherry"];
const person = {
  name: "Tsegaye",
  age: 25,
  isStudent: true,
};

// DOM Elements
const outputArea = document.getElementById("output");
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const equalsBtn = document.getElementById("equals");
const demoBtn = document.getElementById("runDemo");
const clearOutputBtn = document.getElementById("clearOutput");
const themeToggle = document.getElementById("themeToggle");

// Calculator State
let currentInput = "";
let firstNumber = "";
let secondNumber = "";
let operator = "";

// =======================
// Functions
// =======================

// Main calculator function
function calculate(a, operator, b) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b !== 0 ? a / b : "Error: Divide by 0";
    default:
      return "Invalid operator";
  }
}

// Format message with timestamp
function formatOutput(text, type = "log") {
  const time = new Date().toLocaleTimeString();
  return `[${type.toUpperCase()} - ${time}] ${text}`;
}

// Append message to output area
function appendOutput(text, type = "log") {
  const message = document.createElement("div");
  message.textContent = formatOutput(text, type);
  outputArea.appendChild(message);
  outputArea.scrollTop = outputArea.scrollHeight;
}

// =======================
// Loops Demonstration
// =======================
function demonstrateLoops() {
  appendOutput("Demonstrating JavaScript Loops...");

  // For loop
  for (let i = 1; i <= 3; i++) {
    appendOutput(`For Loop ${i}`);
  }

  // While loop
  let j = 1;
  while (j <= 3) {
    appendOutput(`While Loop ${j}`);
    j++;
  }

  // forEach loop
  fruits.forEach((fruit) => {
    appendOutput(`Fruit: ${fruit}`);
  });
}

// =======================
// Event Handlers
// =======================

// Handle button clicks
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;

    if (!isNaN(value) || value === ".") {
      currentInput += value;
      display.value = currentInput;
    } else {
      if (firstNumber === "") {
        firstNumber = currentInput;
        operator = value;
        currentInput = "";
      } else if (currentInput !== "") {
        secondNumber = currentInput;
        const result = calculate(firstNumber, operator, secondNumber);
        appendOutput(`${firstNumber} ${operator} ${secondNumber} = ${result}`, "calc");
        display.value = result;
        firstNumber = result.toString();
        currentInput = "";
      }
    }
  });
});

// Clear calculator
clearBtn.addEventListener("click", () => {
  currentInput = "";
  firstNumber = "";
  secondNumber = "";
  operator = "";
  display.value = "";
});

// Delete last digit
deleteBtn.addEventListener("click", () => {
  currentInput = currentInput.slice(0, -1);
  display.value = currentInput;
});

// Calculate result
equalsBtn.addEventListener("click", () => {
  if (firstNumber !== "" && operator !== "" && currentInput !== "") {
    secondNumber = currentInput;
    const result = calculate(firstNumber, operator, secondNumber);
    appendOutput(`${firstNumber} ${operator} ${secondNumber} = ${result}`, "calc");
    display.value = result;
    firstNumber = result.toString();
    currentInput = "";
  }
});

// Run JavaScript demo
demoBtn.addEventListener("click", () => {
  appendOutput(greeting);
  appendOutput(`Sum: ${numA} + ${numB} = ${calculate(numA, "+", numB)}`);
  appendOutput(`User Name: ${person.name}`);
  appendOutput(`Fruits: ${fruits.join(", ")}`);
  demonstrateLoops();
});

// Clear the output log
clearOutputBtn.addEventListener("click", () => {
  outputArea.innerHTML = "";
});

// Toggle Dark/Light Theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");
  themeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});
