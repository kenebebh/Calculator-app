const storageContainer = document.querySelector(".storage-container");
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
  constructor(prevOperationEl, currentOperationInput) {
    this.prevOperationEl = prevOperationEl;
    this.currentOperationInput = currentOperationInput;
    this.clear();
  }

  clear() {
    this.currentOperation = "";
    this.previousOperation = "";
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
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperation = this.currentOperation;
    this.currentOperation = "";
  }

  compute() {
    let computation;
    console.log(this.prevOperation);
    const prev = parseFloat(this.previousOperation);
    const current = parseFloat(this.currentOperation);
    console.log(prev, current);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperation = computation;
    this.operation = undefined;
    this.previousOperation = "";
  }

  updateDisplay() {
    this.currentOperationInput.value = this.currentOperation;
    this.prevOperationEl.innerText = this.previousOperation;
  }
}

const calculator = new CalculatorApp(prevOperationEl, currentOperationInput);
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
