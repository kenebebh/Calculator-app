const storageContainer = document.querySelector(".storage-container");
const displayBar = document.querySelector(".display-bar");
const numberButtons = document.querySelectorAll(".btn-number");
const operatorButtons = document.querySelectorAll(".btn-operator");
const clearButton = document.querySelector(".btn-all-clear");
const deleteButton = document.querySelector(".btn-delete");
const numberSquaredButton = document.querySelector(".btn-square");
const squareRootButton = document.querySelector(".btn-square-root");
const equalsButton = document.querySelector(".btn-all-equals");

class CalculatorApp {
  constructor() {
    // this.clear();
  }

  // clear() {
  //     displayBar.value = ''
  // }

  displayNumber(number) {
    displayBar.value += number;
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;

    switch (this.operation) {
      case "+":
        console.log(Add);
        break;
      case "-":
        console.log(Subtract);
        break;
      case "x":
        console.log(Multiply);
        break;
      case "÷":
        console.log(Divide);
        break;
      default:
        return;
    }
  }
}

const calculator = new CalculatorApp();

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.displayNumber(button.innerText);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.displayNumber(button.innerText);
  });
});
