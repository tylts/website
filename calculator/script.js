let firstNum = 0;
let secondNum;
let operator;
let displayValue = document.querySelector('#display');

let clearDisplayNextInput = true;
let operationChain = false;
let equalsChain = false;
let secondNumIsNext = false;

const numberBtns = document.querySelectorAll('.number-button');
const clearBtn = document.querySelector('.clear-button');
const operatorBtns = document.querySelectorAll('.operator-button');
const signToggle = document.querySelector('.sign-toggle');
const equalsBtn = document.querySelector('#equals');
const decimalBtn = document.querySelector('.decimal-button');
const percentBtn = document.querySelector('.percent-button');

addEventListener('keydown', (e) => {
  e.preventDefault();
  keyboardInput(e.key, e.code);
});

function keyboardInput(key, code) {
  // Percent Input
  if (key === '%') {
    percentFunction();
  }

  // Clear Keyboard Input (Esc key)
  if (key === 'Escape') {
    clearCalc();
  }

  // Sign Toggle Input
  if (code === 'Minus') {
    if (displayValue.textContent === '0') return;

    if (Number(displayValue.textContent) > 0) {
      displayValue.textContent = `-${displayValue.textContent}`;
    } else {
      displayValue.textContent = displayValue.textContent.slice(1);
    }

    if (secondNum) {
      secondNum = Number(displayValue.textContent);
    }
    return;
  }

  // Number Inputs
  if (/^[0-9]+$/.test(key)) {
    if (displayValue.textContent === '0') displayValue.textContent = '';
    if (clearDisplayNextInput === true) {
      displayValue.textContent = '';
      clearDisplayNextInput = false;
    }
    if (firstNum || secondNum === 0) {
      displayValue.textContent += key;
      secondNum = Number(displayValue.textContent);
      return;
    }
    displayValue.textContent += key;
    return;
  }

  // Operator Input
  if (/[+*\/-]/g.test(key)) {
    if (key === '/') key = '÷';
    if (key === '*') key = '×';
    if (operationChain === true) {
      secondNum = Number(displayValue.textContent);
      displayValue.textContent = Number(
        operate(firstNum, secondNum, operator).toFixed(7)
      );
      console.log(firstNum, operator, secondNum);
      operator = key;
    }

    if (operator != null) {
      operator = key;
      firstNum = Number(displayValue.textContent);
      if (displayValue.textContent === 'divide by 0? lol') firstNum = 0;
      operationChain = true;
      clearDisplayNextInput = true;
      equalsChain = false;
      return;
    }
    firstNum = Number(displayValue.textContent);
    secondNumIsNext = true;
    operator = key;
    clearDisplayNextInput = true;
    operationChain = true;
    equalsChain = false;
  }

  // Enter Key Input
  if (key === 'Enter') {
    if (isNaN(firstNum) || isNaN(secondNum) || !operator) {
      console.log(firstNum, operator, secondNum);
      clearCalc();
      displayValue.textContent = 'You messed up.';
      console.log('triggered in equals');
      return;
    }
    if (equalsChain) {
      let constantNum = secondNum;
      firstNum = Number(displayValue.textContent);
      displayValue.textContent = Number(
        operate(firstNum, constantNum, operator).toFixed(7)
      );
      return;
    }

    console.log(firstNum, operator, secondNum);
    displayValue.textContent = Number(
      operate(firstNum, secondNum, operator).toFixed(7)
    );
    operate(firstNum, secondNum, operator);
    clearDisplayNextInput = true;
    operationChain = false;
    equalsChain = true;
    secondNumIsNext = false;
  }

  // Decimal Input
  if (/\./.test(key)) {
    decimalFunction();
  }

  // Delete Input
  if (key == 'Backspace') {
    displayValue.textContent = displayValue.textContent.slice(0, -1);
    if (displayValue.textContent.length === 0) displayValue.textContent = 0;
  }
}

// Event listeners

numberBtns.forEach((e) => e.addEventListener('click', numberFunction(e)));
decimalBtn.addEventListener('click', decimalFunction);
operatorBtns.forEach((e) => e.addEventListener('click', operatorFunction(e)));
percentBtn.addEventListener('click', percentFunction);
clearBtn.addEventListener('click', clearCalc);
signToggle.addEventListener('click', signToggleFunction);
equalsBtn.addEventListener('click', equalsFunction);

function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  return a / b;
}

function operate(a, b, operator) {
  if (b === 0 && operator === '÷') {
    clearCalc();
    displayValue.textContent = 'divide by 0? lol';
    return 0;
  }

  if (isNaN(a) || isNaN(b) || !operator) {
    clearCalc();
    displayValue.textContent = 'You messed up.';
    console.log('triggered in operate()');
    return;
  }
  switch (operator) {
    case '+':
      return addition(a, b);
    case '-':
      return subtraction(a, b);
    case '×':
      return multiplication(a, b);
    case '÷':
      return division(a, b);
  }
}

function clearCalc() {
  displayValue.textContent = '0';
  firstNum = 0;
  secondNum = undefined;
  operator = undefined;
  equalsChain = false;
  clearDisplayNextInput = true;
  operationChain = false;
  secondNumIsNext = false;
}

function numberFunction(e) {
  e.addEventListener('click', () => {
    if (displayValue.textContent === '0') displayValue.textContent = '';
    if (clearDisplayNextInput === true) {
      displayValue.textContent = '';
      clearDisplayNextInput = false;
    }
    if (firstNum || secondNum === 0) {
      displayValue.textContent += e.textContent;
      secondNum = Number(displayValue.textContent);
      return;
    }
    displayValue.textContent += e.textContent;
  });
}

function decimalFunction() {
  if (
    displayValue.textContent.includes('.') &&
    clearDisplayNextInput === false
  ) {
    return;
  }

  if (clearDisplayNextInput === true) {
    displayValue.textContent = '0.';
    clearDisplayNextInput = false;
    return;
  }
  displayValue.textContent += decimalBtn.textContent;
}

function operatorFunction(e) {
  e.addEventListener('click', () => {
    if (operationChain === true) {
      secondNum = Number(displayValue.textContent);
      displayValue.textContent = Number(
        operate(firstNum, secondNum, operator).toFixed(7)
      );
      console.log(firstNum, operator, secondNum);
      operator = e.textContent;
    }

    if (operator != null) {
      operator = e.textContent;
      firstNum = Number(displayValue.textContent);
      if (displayValue.textContent === 'divide by 0? lol') firstNum = 0;
      operationChain = true;
      clearDisplayNextInput = true;
      equalsChain = false;
      return;
    }
    firstNum = Number(displayValue.textContent);
    secondNumIsNext = true;
    operator = e.textContent;
    clearDisplayNextInput = true;
    operationChain = true;
    equalsChain = false;
  });
}

function percentFunction() {
  if (!clearDisplayNextInput) {
    if (firstNum === 100) {
      secondNum = Number(((firstNum / 100) * secondNum).toFixed(7));
    }

    if (operator === '+' || operator === '-') {
      secondNum = Number(((secondNum / 100) * firstNum).toFixed(7));
      displayValue.textContent = secondNum;
      clearDisplayNextInput = true;
      console.log(firstNum, operator, secondNum);
      secondNumIsNext = false;
      return;
    }

    if (operator === '×' || operator === '÷') {
      displayValue.textContent = Number(secondNum / 100);
      clearDisplayNextInput = true;
      secondNum = Number(displayValue.textContent);
      console.log(firstNum, operator, secondNum);
      secondNumIsNext = false;
      return;
    }
  }

  if (secondNumIsNext) {
    if (operator === '+' || operator === '-') {
      console.log(`Second Num is ${secondNum}`);
      console.log((secondNum / 100) * firstNum);
      displayValue.textContent = Number(
        ((secondNum / 100) * firstNum).toFixed(7)
      );
      secondNum = Number(displayValue.textContent);
      return;
    }

    if (operator === '×' || operator === '÷') {
      console.log((secondNum / 100) * firstNum);
      displayValue.textContent = Number((secondNum / 100).toFixed(7));
      secondNum = Number(displayValue.textContent);
      return;
    }
  }
  firstNum = Number((displayValue.textContent / 100).toFixed(7));
  displayValue.textContent = firstNum;
}

function signToggleFunction() {
  if (displayValue.textContent === '0') return;

  Number(displayValue.textContent) > 0
    ? (displayValue.textContent = `-${displayValue.textContent}`)
    : (displayValue.textContent = displayValue.textContent.slice(1));

  if (secondNum) {
    secondNum = Number(displayValue.textContent);
  }
}

function equalsFunction() {
  if (isNaN(firstNum) || isNaN(secondNum) || !operator) {
    console.log(firstNum, operator, secondNum);
    clearCalc();
    displayValue.textContent = 'You messed up.';
    console.log('triggered in equals');
    return;
  }
  if (equalsChain) {
    let constantNum = secondNum;
    firstNum = Number(displayValue.textContent);
    displayValue.textContent = Number(
      operate(firstNum, constantNum, operator).toFixed(7)
    );
    return;
  }

  console.log(firstNum, operator, secondNum);
  displayValue.textContent = Number(
    operate(firstNum, secondNum, operator).toFixed(7)
  );
  operate(firstNum, secondNum, operator);
  clearDisplayNextInput = true;
  operationChain = false;
  equalsChain = true;
  secondNumIsNext = false;
}
