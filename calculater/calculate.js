let currentInput = '0';
let previousInput = '';
let operation = null;

// Get DOM elements
const currentDisplay = document.querySelector('.current-operand');
const previousDisplay = document.querySelector('.previous-operand');

// Add event listeners to all buttons
document.querySelector('.calculator').addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        const button = e.target;
        const buttonValue = button.textContent;

        // Handle different button types
        if (button.classList.contains('number')) {
            handleNumber(buttonValue);
        } else if (button.classList.contains('operator')) {
            handleOperator(buttonValue);
        } else if (button.classList.contains('equals')) {
            handleEquals();
        } else if (button.classList.contains('ac')) {
            handleClear();
        } else if (button.classList.contains('del')) {
            handleDelete();
        }
    }
});

// Handle number inputs
function handleNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

// Handle operator buttons
function handleOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

// Handle equals button
function handleEquals() {
    calculate();
    operation = null;
}

// Handle clear button
function handleClear() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

// Handle delete button
function handleDelete() {
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

// Calculate result
function calculate() {
    if (!previousInput || !currentInput) return;
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    previousInput = '';
    updateDisplay();
}

// Update display
function updateDisplay() {
    currentDisplay.textContent = currentInput;
    if (operation) {
        previousDisplay.textContent = `${previousInput} ${operation}`;
    } else {
        previousDisplay.textContent = '';
    }
}

// Initialize calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    handleClear();
});