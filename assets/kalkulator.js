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
  /**
   * jika waitingForSecondNumber bernilai true dan nilai displayNumber === firstNumber
   * yang artinya singkatnya "apakah operator baru saja ditetapkan ?"
   * jika benar maka displayNumber yang sebelumnya akan dihapus ketika tombol angka pada kalkulator kembali ditekan, dan displayNumber sekarang adalah angka yang baru saja ditekan dan angka ini akan dipergunakan untuk kalkulasi
   */

  if (
    calculator.waitingForSecondNumber &&
    calculator.firstNumber === calculator.displayNumber
  ) {
    calculator.displayNumber = digit;
  } else {
    /** jika angka awal pada display adalah 0
     * maka update dengan angka yang baru inputkan
     * (else) jika tidak lakukan penambahan digit
     */
    if (calculator.displayNumber === "0") {
      calculator.displayNumber = digit;
    } else {
      calculator.displayNumber += digit;
    }
  }
}

// mengambil seluruh elemen button
const buttons = document.querySelectorAll(".button");
// lakukan perulangan untuk menyesuaikan elemen target
for (let button of buttons) {
  button.addEventListener("click", function(event) {
    //mendapatkan objek elemen yang diklik
    const targetEl = event.target;

    /**
     * Jika yang diklik adalah button dengan class clear
     * maka reset calculator dengan fungsi clearCalculator()
     * lalu update layar display dengan fungsi updateDisplay()
     * dan terakhir return supaya langsung mengembalikan hasil dan tidak menjalankan perintah dibawahnya
     */
    if (targetEl.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return;
    }

    /**
     * Jika yang diklik adalah button dengan class negative
     * maka panggil fungsi inverseNumber() untuk memberikan negative pada angka
     * lalu update layar display dengan fungsi updateDisplay()
     * dan terakhir return supaya langsung mengembalikan hasil dan tidak menjalankan perintah dibawahnya
     */
    if (targetEl.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
      return;
    }

    /**
     * Jika yang diklik adalah button dengan class operator
     * maka panggil fungsi handleOperator(targetEl.innerText)
     * argumen target.innerText untuk mendapatkan operator yang di klik, ex: - +
     * lalu update layar display dengan fungsi updateDisplay()
     * dan terakhir return supaya langsung mengembalikan hasil dan tidak menjalankan perintah dibawahnya
     */
    if (targetEl.classList.contains("operator")) {
      handleOperator(targetEl.innerText);
      updateDisplay();
      return;
    }

    /**
     * Jika yang diklik adalah button dengan class equals
     * maka panggil fungsi performCalculation() untuk melakukan operasi aritmatika
     * lalu update layar display dengan fungsi updateDisplay()
     * dan terakhir return supaya langsung mengembalikan hasil dan tidak menjalankan perintah dibawahnya
     */
    if (targetEl.classList.contains("equals")) {
      performCalculation();
      updateDisplay();
      return;
    }

    /**
     * jika yang diklik adalah selain button clear,negative,operator,equals maka panggil fungsi untuk inputan yaitu inputDigit()
     * lalu update layar display dengan fungsi updateDisplay()
     */
    inputDigit(targetEl.innerText);
    updateDisplay();
  });
}

// fungsi untuk menjadikan angka menjadi negative/positive
function inverseNumber() {
  if (calculator.displayNumber === 0) {
    return;
  }

  calculator.displayNumber = calculator.displayNumber * -1;
}

// fungsi untuk menghandle operator
function handleOperator(operator) {
  /**
   * jika waitingForSecondNumber bernilai false
   * Secara prinsip fungsi ini bertujuan untuk menyimpan operator dan firstNumber dengan nilai displayNumber saat ini pada object calculator
   *  hanya jika properti waitingForSecondNumber bernilai false
   *
   */
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    /**
     * Namun jika waitingForSecondNumber bernilai true
     * browser akan menampilkan alert() dengan pesan “Operator sudah ditetapkan”
     */
  } else {
    alert("Operator Sudah Ditetapkan");
  }
}

// fungsi untuk melakukan operasi kalkulasi
function performCalculation() {
  // jika firsnumber/operator masih null (kosong)
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("Anda belum menetapkan operator");
    return;
  }

  // buat variabel untuk menampung hasil
  let result = 0;

  // jika operator adalah +
  if (calculator.operator === "+") {
    result =
      parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);

    // jika operator adalah -
  } else {
    result =
      parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }

  // masukkan nilai hasil(result) ke displayNumber
  calculator.displayNumber = result;
}
