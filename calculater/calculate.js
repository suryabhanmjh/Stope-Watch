let currentInput = '0';
let previousInput = '';
let operation = null;
let calculationHistory = [];

// Get DOM elements
const display = {
    current: document.querySelector('.current-operand'),
    previous: document.querySelector('.previous-operand')
};

// Add event listeners to all buttons
document.querySelector('.calculator').addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        const button = e.target;
        const value = button.textContent;

        if (button.classList.contains('number')) handleNumber(value);
        else if (button.classList.contains('operator')) handleOperator(value);
        else if (button.classList.contains('equals')) handleEquals();
        else if (button.classList.contains('ac')) handleClear();
        else if (button.classList.contains('del')) handleDelete();
    }
});

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') handleNumber(e.key);
    else if (['+', '-', '*', '/'].includes(e.key)) handleOperator(convertOperator(e.key));
    else if (e.key === 'Enter' || e.key === '=') handleEquals();
    else if (e.key === 'Backspace') handleDelete();
    else if (e.key === 'Escape') handleClear();
});

function convertOperator(key) {
    return key === '*' ? '×' : key === '/' ? '÷' : key;
}

// Handle number inputs
function handleNumber(num) {
    if (num === '.' && currentInput.includes('.')) return;
    currentInput = currentInput === '0' && num !== '.' ? num : currentInput + num;
    updateDisplay();
}

// Handle operator buttons
function handleOperator(op) {
    if (!currentInput) return;
    if (previousInput) calculate();
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

    try {
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
                if (current === 0) throw new Error('Division by zero');
                result = prev / current;
                break;
            default:
                return;
        }

        // Round to 8 decimal places to avoid floating point issues
        result = Math.round(result * 100000000) / 100000000;
        
        // Add calculation to history
        addToHistory(`${prev} ${operation} ${current} = ${result}`);
        
        currentInput = result.toString();
        previousInput = '';
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        previousInput = '';
        updateDisplay();
        setTimeout(() => handleClear(), 1500);
    }
}

// Add scientific functions
function handleScientific(operation) {
    if (currentInput === '') return;
    const number = parseFloat(currentInput);
    let result;

    switch (operation) {
        case 'sqrt':
            result = Math.sqrt(number);
            break;
        case 'square':
            result = number * number;
            break;
        case 'sin':
            result = Math.sin(number * Math.PI / 180);
            break;
        case 'cos':
            result = Math.cos(number * Math.PI / 180);
            break;
        case 'log':
            result = Math.log10(number);
            break;
    }

    currentInput = result.toString();
    addToHistory(`${operation}(${number}) = ${result}`);
    updateDisplay();
}

// Add history functionality
function addToHistory(calculation) {
    calculationHistory.unshift(calculation);
    if (calculationHistory.length > 10) {
        calculationHistory.pop();
    }
}

function showHistory() {
    if (calculationHistory.length === 0) {
        alert('No calculation history');
        return;
    }
    alert('Recent calculations:\n\n' + calculationHistory.join('\n'));
}

// Update display with formatting
function updateDisplay() {
    // Format large numbers with commas
    let formattedCurrent = formatNumber(currentInput);
    display.current.textContent = formattedCurrent;
    
    if (operation) {
        let formattedPrevious = formatNumber(previousInput);
        display.previous.textContent = `${formattedPrevious} ${operation}`;
    } else {
        display.previous.textContent = '';
    }
}

function formatNumber(num) {
    if (num === 'Error') return num;
    const [whole, decimal] = num.toString().split('.');
    const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decimal ? `${formattedWhole}.${decimal}` : formattedWhole;
}

// Add memory functions
let memoryValue = 0;

function handleMemory(action) {
    const current = parseFloat(currentInput);
    switch (action) {
        case 'M+':
            memoryValue += current;
            break;
        case 'M-':
            memoryValue -= current;
            break;
        case 'MR':
            currentInput = memoryValue.toString();
            updateDisplay();
            break;
        case 'MC':
            memoryValue = 0;
            break;
    }
}

// Tab switching functionality
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all tabs and modes
        document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.calculator-mode').forEach(mode => mode.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding mode
        button.classList.add('active');
        const modeClass = `${button.dataset.tab}-mode`;
        document.querySelector(`.${modeClass}`).classList.add('active');
    });
});

// Toggle history panel
document.querySelector('.history').addEventListener('click', () => {
    document.querySelector('.history-panel').classList.toggle('active');
});

// Initialize calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    handleClear();
});