const storageContainerEL = document.querySelector(".storage-container");
const currentOperationInput = document.querySelector(".current-operation");

const numberButtons = document.querySelectorAll(".btn-number");
const operatorButtons = document.querySelectorAll(".btn-operator");
const clearButton = document.querySelector(".btn-all-clear");
const deleteButton = document.querySelector(".btn-delete");
const equalsButton = document.querySelector(".btn-equals");

class CalculatorApp {
  #result;

  constructor(currentOperationInput, storageContainerEL) {
    this.currentOperationInput = currentOperationInput;
    this.storageContainerEL = storageContainerEL;
    this.clear();
  }

  clear() {
    this.currentOperation = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperation = this.currentOperation.toString().slice(0, -1);
  }

  displayNumber(number) {
    if (number === "." && this.currentOperation.includes(".")) return;
    this.currentOperation += number;
  }

  chooseOperation(operation) {
    if (this.currentOperationInput === "") return;
    this.operation = operation;

    switch (this.operation) {
      case "x2":
        this.#result = this.currentOperation ** 2;
        this.displayResult();
        break;
      case "√":
      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
        console.log(typeof Number(this.currentOperation.slice(-1)));
        if (isNaN(this.currentOperation.slice(-1))) return;
        this.currentOperation += operation;
        break;
      default:
        return;
    }
  }

  compute() {
    if (this.operation === "√") {
      this.currentOperation = this.currentOperation.toString().slice(1);
      this.#result = Math.sqrt(this.currentOperation);
      console.log(this.#result);
    } else {
      this.#result = eval(this.currentOperation);
    }

    console.log(this.#result);
  }

  updateDisplay() {
    this.currentOperationInput.value = this.currentOperation;
  }

  displayResult() {
    this.currentOperation = this.#result;
    this.currentOperationInput.value = this.currentOperation;
  }
}

const calculator = new CalculatorApp(currentOperationInput, storageContainerEL);
console.log(calculator);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.displayNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", function () {
  calculator.compute();
  calculator.updateDisplay();
  calculator.displayResult();
});

clearButton.addEventListener("click", function () {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", function () {
  calculator.delete();
  calculator.updateDisplay();
});

document.addEventListener("keydown", function (e) {
  console.log(e.key);

  switch (e.key) {
    case "Enter":
      e.preventDefault();
      calculator.compute();
      calculator.updateDisplay();
      break;
    case ".":
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      calculator.displayNumber(e.key);
      break;
    case "+":
    case "-":
    case "x":
    case "%":
    case "/":
      calculator.chooseOperation(e.key);
      break;
    case "=":
      calculator.compute();
      calculator.updateDisplay();
      break;
    case "Backspace":
      calculator.delete();
      calculator.updateDisplay();
      break;
    default:
      return;
  }
});
