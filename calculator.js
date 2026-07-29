const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
  display.textContent = displayValue;
}

function resetCalculator() {
  displayValue = '0';
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay();
}

function handleDigit(digit) {
  if (waitingForSecondOperand) {
    displayValue = digit;
    waitingForSecondOperand = false;
  } else if (displayValue === '0' || displayValue === 'Error') {
    displayValue = digit;
  } else {
    displayValue += digit;
  }
  updateDisplay();
}

function handleDecimal() {
  if (displayValue === 'Error') {
    displayValue = '0.';
  } else if (!displayValue.includes('.')) {
    displayValue = waitingForSecondOperand ? '0.' : displayValue + '.';
    waitingForSecondOperand = false;
  }
  updateDisplay();
}

function performCalculation(secondOperand) {
  const first = firstOperand;
  const second = secondOperand;

  if (operator === '+') {
    return first + second;
  }
  if (operator === '−') {
    return first - second;
  }
  if (operator === '×') {
    return first * second;
  }
  if (operator === '÷') {
    if (second === 0) {
      return 'Error';
    }
    return first / second;
  }
  return second;
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(displayValue);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = performCalculation(inputValue);
    displayValue = String(result);
    firstOperand = result === 'Error' ? null : parseFloat(displayValue);
  }

  operator = nextOperator;
  waitingForSecondOperand = true;
  updateDisplay();
}

function handleEquals() {
  if (operator === null || waitingForSecondOperand) {
    return;
  }

  const result = performCalculation(parseFloat(displayValue));
  displayValue = String(result);
  firstOperand = result === 'Error' ? null : parseFloat(displayValue);
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay();
}

function handleBackspace() {
  if (displayValue === 'Error') {
    displayValue = '0';
  } else if (displayValue.length <= 1) {
    displayValue = '0';
  } else {
    displayValue = displayValue.slice(0, -1);
  }
  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;

    if (action === 'digit') {
      handleDigit(button.dataset.value);
      return;
    }

    if (action === 'decimal') {
      handleDecimal();
      return;
    }

    if (action === 'operator') {
      handleOperator(button.dataset.operator);
      return;
    }

    if (action === 'equals') {
      handleEquals();
      return;
    }

    if (action === 'clear') {
      resetCalculator();
      return;
    }

    if (action === 'backspace') {
      handleBackspace();
    }
  });
});

updateDisplay();
