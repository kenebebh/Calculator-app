const storageContainer = document.querySelector(".storage-container");
const displayBar = document.querySelector(".display-bar");
const numberButtons = document.querySelectorAll(".btn-number");
const operatorButtons = document.querySelectorAll(".btn-operator");
const clearButton = document.querySelector(".btn-all-clear");
const deleteButton = document.querySelector(".btn-delete");
const numberSquaredButton = document.querySelector(".btn-square");
const squareRootButton = document.querySelector(".btn-square-root");
const equalsButton = document.querySelector(".btn-equals");
let prevOperand, currOperand;

console.log(numberSquaredButton.innerText, squareRootButton.innerHTML);

class CalculatorApp {
  constructor() {
    // this.clear();
  }

  // clear() {
  //     displayBar.value = ''
  // }

  displayNumber(number) {
    if (number === "." && displayBar.value.includes(".")) return;
    displayBar.value += number;
  }

  setOperation(operation) {
    this.operation = operation;
    this.compute();
  }

  //   chooseOperation(operation) {
  //     this.compute();
  //   }

  compute() {
    let computed;
    const calcthis = displayBar.value;
    const splitString = calcthis.match(/(?:\d+\.)?\d+/g);
    prevOperand = parseFloat(splitString[0]);
    currOperand = parseFloat(splitString[1]);
    switch (this.operation) {
      case "+":
        console.log(`Add`);
        computed = prevOperand + currOperand;
        console.log(computed);
        prevOperand = computed;
        break;
      case "-":
        console.log(`Subtract`);
        break;
      case "x":
        console.log(`Multiply`);
        break;
      case "÷":
        console.log(`Divide`);
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
    calculator.setOperation(button.innerText);
    // calculator.compute(button.innerText);
    calculator.displayNumber(button.innerText);
  });
});

equalsButton.addEventListener("click", function () {
  calculator.compute();
});
