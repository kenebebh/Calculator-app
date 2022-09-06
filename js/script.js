const storageContainerEL = document.querySelector(".storage-container");
const prevOperationEl = document.querySelector(".previous-operation");
const currentOperationInput = document.querySelector(".current-operation");

const numberButtons = document.querySelectorAll(".btn-number");
const operatorButtons = document.querySelectorAll(".btn-operator");
const clearButton = document.querySelector(".btn-all-clear");
const deleteButton = document.querySelector(".btn-delete");
const numberSquaredButton = document.querySelector(".btn-square");
const squareRootButton = document.querySelector(".btn-square-root");
const equalsButton = document.querySelector(".btn-equals");

class CalculatorApp {
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
    this.currentOperation += operation;
    this.operation = operation;
  }

  compute() {
    const result = eval(this.currentOperation);

    console.log(result);
  }

  updateDisplay() {
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
    // calculator.displayNumber(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", function () {
  calculator.compute();
  calculator.updateDisplay();
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
