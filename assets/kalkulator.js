// Menyiapkan variabel awal
const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: false,
  waitingForSecondNumber: false
};

// fungsi untuk update display
function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

// fungsi untuk mereset calculator
function clearCalculator() {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = false;
  calculator.waitingForSecondNumber = false;
}

// fungsi untuk inputan
function inputDigit(digit) {
  if (calculator.displayNumber === "0") {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

// mengambil seluruh elemen button
const buttons = document.querySelectorAll(".button");
// lakukan perulangan untuk menyesuaikan elemen target
for (let button of buttons) {
  button.addEventListener("click", function(event) {
    //mendapatkan objek elemen yang diklik
    const targetEl = event.target;

    if (targetEl.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return;
    }

    inputDigit(targetEl.innerText);
    updateDisplay();
  });
}
