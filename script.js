// Get the display element
const display = document.getElementById('display');

// Track current and previous input, and the operator
let currentInput = '';
let previousInput = '';
let operator = '';

// Add event listeners to buttons
document.querySelectorAll('.buttons button').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        const value = button.textContent;

        // Handle clear button
        if (action === 'clear') {
            clearDisplay();
        }
        // Handle delete button (backspace)
        else if (action === 'delete') {
            deleteLastInput();
        }
        // Handle equals button
        else if (action === 'equals') {
            calculate();
        }
        // Handle operators
        else if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            setOperator(action);
        }
        // Handle number and decimal input
        else {
            addToCurrentInput(value);
        }
    });
});

// Function to update display
function updateDisplay() {
    display.value = currentInput || '0';
}

// Function to clear the display and reset inputs
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay();
}

// Function to delete last character
function deleteLastInput() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

// Function to add numbers/decimal to current input
function addToCurrentInput(value) {
    if (value === '.' && currentInput.includes('.')) return;
    currentInput += value;
    updateDisplay();
}

// Function to set operator and store previous input
function setOperator(action) {
    if (currentInput === '') return;
    previousInput = currentInput;
    currentInput = '';
    operator = action;
}

// Function to perform calculation
function calculate() {
    if (previousInput === '' || currentInput === '' || operator === '') return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);
    let result;

    switch (operator) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            result = num1 / num2;
            break;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}
