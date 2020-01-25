const calculator = {
  displayNumber: '0',
  operator: null,
  firstNumber: false,
  waitingForSecondNumber: false
};

function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator() {
  calculator.displayNumber = '0';
  calculator.operator = null;
  calculator.firstNumber = false;
  calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
  if (calculator.displayNumber === '0') {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
  button.addEventListener('click', function (event) {

    //mendapatkan objek elemen yang diklik
    const targetEl = event.target;

    if (targetEl.classList.contains('clear')) {
      clearCalculator();
      updateDisplay();
      return;
    }

    inputDigit(targetEl.innerText);
    updateDisplay();
  });
};