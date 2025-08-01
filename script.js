// ===== PART 1: JavaScript Basics =====

// Variables with different data types
const calculatorName = "JS Calculator"; // string
let currentInput = ""; // string
let previousInput = ""; // string
let operation = null; // null
let shouldResetScreen = false; // boolean
const operations = ["+", "-", "*", "/", "%"]; // array
const calculatorVersion = 1.0; // number

// DOM elements
const display = document.getElementById("display");
const output = document.getElementById("output");
const themeToggle = document.getElementById("themeToggle");
const runDemo = document.getElementById("runDemo");
const clearOutput = document.getElementById("clearOutput");
const equalsButton = document.getElementById("equals");
const numberButtons = document.querySelectorAll(".keypad button:not(.operator):not(#equals)");
const operatorButtons = document.querySelectorAll(".operator");

// ===== PART 2: Functions =====

// Function 1: Perform calculation
function calculate(a, operator, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    
    if (isNaN(a) || isNaN(b)) return "Error";

    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return b !== 0 ? a / b : "Error";
        case "%":
            return a % b;
        default:
            return b;
    }
}

// Function 2: Format output for display
function formatOutput(text, type = "info") {
    const timestamp = new Date().toLocaleTimeString();
    const typeIndicator = type === "error" ? "❌" : "ℹ️";
    const element = document.createElement("div");
    
    element.innerHTML = `<span class="timestamp">[${timestamp}]</span> ${typeIndicator} ${text}`;
    element.classList.add("output-item", type);
    
    return element;
}

// ===== PART 3: Loops =====

// Function to demonstrate loops
function demonstrateLoops() {
    // For loop
    const forLoopResult = [];
    for (let i = 1; i <= 5; i++) {
        forLoopResult.push(`Iteration ${i}`);
    }
    
    // While loop
    const whileLoopResult = [];
    let count = 1;
    while (count <= 3) {
        whileLoopResult.push(`Count: ${count}`);
        count++;
    }
    
    // Array forEach
    const fruits = ["Apple", "Banana", "Cherry"];
    const forEachResult = [];
    fruits.forEach((fruit, index) => {
        forEachResult.push(`${index + 1}. ${fruit}`);
    });
    
    return { forLoopResult, whileLoopResult, forEachResult };
}

// ===== PART 4: DOM Manipulation =====

// Initialize calculator
function initCalculator() {
    display.value = "0";
    output.innerHTML = "";
    appendOutput(`Welcome to ${calculatorName} v${calculatorVersion}`, "info");
}

// Append output to display area
function appendOutput(text, type = "info") {
    output.appendChild(formatOutput(text, type));
    output.scrollTop = output.scrollHeight;
}

// Update calculator display
function updateDisplay() {
    display.value = currentInput || "0";
}

// Handle number input
function handleNumber(number) {
    if (shouldResetScreen) {
        currentInput = "";
        shouldResetScreen = false;
    }
    
    if (number === "." && currentInput.includes(".")) return;
    
    currentInput = currentInput.toString() + number.toString();
    updateDisplay();
}

// Handle operator input
function handleOperator(op) {
    if (op === "C") {
        // Clear everything
        currentInput = "";
        previousInput = "";
        operation = null;
        updateDisplay();
        return;
    }
    
    if (op === "DEL") {
        // Delete last character
        currentInput = currentInput.toString().slice(0, -1);
        if (currentInput === "") currentInput = "0";
        updateDisplay();
        return;
    }
    
    if (currentInput === "") return;
    
    if (previousInput !== "") {
        const result = calculate(previousInput, operation, currentInput);
        appendOutput(`Calculation: ${previousInput} ${operation} ${currentInput} = ${result}`);
        currentInput = result;
        updateDisplay();
    }
    
    operation = op;
    previousInput = currentInput;
    shouldResetScreen = true;
}

// Handle equals button
function handleEquals() {
    if (operation === null || shouldResetScreen) return;
    
    if (operation === "/" && currentInput === "0") {
        appendOutput("Error: Division by zero", "error");
        currentInput = "Error";
        updateDisplay();
        return;
    }
    
    const result = calculate(previousInput, operation, currentInput);
    appendOutput(`Result: ${previousInput} ${operation} ${currentInput} = ${result}`);
    currentInput = result;
    operation = null;
    previousInput = "";
    shouldResetScreen = true;
    updateDisplay();
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    themeToggle.textContent = isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
    appendOutput(`Dark mode ${isDarkMode ? "enabled" : "disabled"}`);
}

// Run demo function
function runDemo() {
    appendOutput("===== Starting JavaScript Demo =====");
    
    // Show variables
    appendOutput(`Calculator Name: ${calculatorName}`);
    appendOutput(`Version: ${calculatorVersion}`);
    appendOutput(`Operations: ${operations.join(", ")}`);
    
    // Conditionals example
    const number = 7;
    if (number > 5) {
        appendOutput(`Conditional: ${number} is greater than 5`);
    } else {
        appendOutput(`Conditional: ${number} is 5 or less`);
    }
    
    // Function demo
    const area = calculate(10, "*", 5);
    appendOutput(`Function Demo: Area calculation (10 * 5) = ${area}`);
    
    // Loops demo
    appendOutput("Loop Demonstrations:");
    const loopResults = demonstrateLoops();
    
    appendOutput("For Loop Results:");
    loopResults.forLoopResult.forEach(result => {
        appendOutput(result);
    });
    
    appendOutput("While Loop Results:");
    loopResults.whileLoopResult.forEach(result => {
        appendOutput(result);
    });
    
    appendOutput("Array forEach Results:");
    loopResults.forEachResult.forEach(result => {
        appendOutput(result);
    });
    
    appendOutput("===== Demo Completed =====");
}

// ===== Event Listeners =====

// Theme toggle
themeToggle.addEventListener("click", toggleDarkMode);

// Number buttons
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        handleNumber(button.dataset.value);
        appendOutput(`Number pressed: ${button.dataset.value}`);
    });
});

// Operator buttons
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        handleOperator(button.dataset.value);
        if (button.dataset.value !== "C" && button.dataset.value !== "DEL") {
            appendOutput(`Operator selected: ${button.dataset.value}`);
        }
    });
});

// Equals button
equalsButton.addEventListener("click", handleEquals);

// Run demo button
runDemo.addEventListener("click", runDemo);

// Clear output button
clearOutput.addEventListener("click", () => {
    output.innerHTML = "";
    appendOutput("Output cleared");
});

// Initialize calculator on load
document.addEventListener("DOMContentLoaded", initCalculator);
