"use strict";
const storageContainerEL = document.querySelector(".storage-container");
const currentOperationInput = document.querySelector(".current-operation");

const numberButtons = document.querySelectorAll(".btn-number");
const operatorButtons = document.querySelectorAll(".btn-operator");
const clearButton = document.querySelector(".btn-all-clear");
const deleteButton = document.querySelector(".btn-delete");
const equalsButton = document.querySelector(".btn-equals");

class CalculatorApp {
  // declaring our private fields
  // we would later use these fields to store important data in our calculator app
  #result;
  #operandStore;
  #answerStore;

  // The values we pass into the constructor function are values that are passed in the object that inherits this class, which we can then store the value in this class function and from there perform operations the passed in values
  constructor(currentOperationInput, storageContainerEL) {
    this.currentOperationInput = currentOperationInput;
    this.storageContainerEL = storageContainerEL;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  displayNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand += number;
  }

  chooseOperation(operation) {
    if (this.currentOperationInput === "") return;
    this.operation = operation;

    switch (this.operation) {
      case "x2":
        // if theres no number before the user presses the square button, return
        if (this.currentOperand.split(/[\+\-\/\*\^\%]/g) == "") return;
        this.currentOperand += "**2";
        break;
      case "√":
        this.currentOperand += operation;
        break;
      case "+":
      case "-":
      case "*":
      case "/":
      case "%":
        // this tests if the number before the operator key is pressed is a number or a parentheses, and if it is, then we display the operator
        if (/[0-9()]/.test(this.currentOperand.toString().slice(-1))) {
          this.currentOperand += operation;
        }
        break;
      default:
        return;
    }
  }

  compute() {
    if (this.operation === "√") {
      this.currentOperand = this.currentOperand.toString().slice(1);
      this.#result = Math.sqrt(this.currentOperand);
    } else {
      this.#result = eval(this.currentOperand);
    }

    this.#operandStore = this.currentOperand;
    this.#answerStore = this.#result;
    this.currentOperand = this.#result;
  }

  formatNumber(number) {
    const floatNumber = parseFloat(number);
    if (isNaN(floatNumber)) return;
    return floatNumber.toLocaleString(navigator.language);
  }

  updateDisplay() {
    this.currentOperationInput.value = this.currentOperand;
  }

  displayResult() {
    const html = `
    <div class="storage-elements flex justify-between">
      <div class="leftside">${this.#operandStore}</div>
      <div class="rightside"> = ${this.#answerStore}</div>
      </div> 
    `;
    this.currentOperationInput.value = this.formatNumber(this.#result);
    this.storageContainerEL.insertAdjacentHTML("beforeend", html);
  }
}

// Creating our calculator object from the class
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

// This is an event listener to the whole document so we could also operate the calculator using our keyboard
document.addEventListener("keydown", function (e) {
  console.log(e.key);

  switch (e.key) {
    case "Enter":
      e.preventDefault();
      calculator.compute();
      calculator.updateDisplay();
      calculator.displayResult();

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
