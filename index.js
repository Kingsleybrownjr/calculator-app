const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalsBtn = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-all-clear]");
const previousOperandEl = document.querySelector("[data-previous-operand]");
const currentOperandEl = document.querySelector("[data-current-operand]");

class Calculator {
	constructor(previousOperandEl, currentOperandEl) {
		this.previousOperandEl = previousOperandEl;
		this.currentOperandEl = currentOperandEl;
		this.clear();
	}

	clear() {
		this.currentOperand = "";
		this.previousOperand = "";
		this.operation = undefined;
	}

	delete() {
		this.currentOperand = String(this.currentOperand).slice(0, 1);
	}

	appendNumber(number) {
		if (number === "." && this.currentOperand.includes(".")) return;

		this.currentOperand = String(this.currentOperand) + String(number);
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
		const prev = +this.previousOperand;
		const current = +this.currentOperand;
		if (isNaN(prev) || isNaN(current)) return;

		switch (this.operation) {
			case "+":
				computation = prev + current;
				break;

			case "-":
				computation = prev - current;
				break;

			case "*":
				computation = prev * current;
				break;

			case "÷":
				computation = prev / current;
				break;
			default:
				return;
		}
		this.currentOperand = computation;
		this.operation = undefined;
		this.previousOperand = "";
	}

	getDisplayNumber(number) {
		const stringNumber = String(number);
		const integerDigits = +stringNumber.split(".")[0];
		const decimalDigits = stringNumber.split(".")[1];
		let integerDisplay;

		if (isNaN(integerDigits)) {
			integerDisplay = "";
		} else {
			integerDisplay = integerDigits.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
		}

		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}

	renderDisplay() {
		this.currentOperandEl.textContent = this.getDisplayNumber(
			this.currentOperand
		);

		if (this.operation != null) {
			this.previousOperandEl.textContent = `${this.getDisplayNumber(
				this.previousOperand
			)} ${this.operation}`;
		} else {
			this.previousOperandEl.textContent = "";
		}
	}
}

const calculator = new Calculator(previousOperandEl, currentOperandEl);

numberBtns.forEach(button => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.textContent);
		calculator.renderDisplay();
	});
});
operationBtns.forEach(button => {
	button.addEventListener("click", () => {
		calculator.chooseOperation(button.textContent);
		calculator.renderDisplay();
	});
});

equalsBtn.addEventListener("click", () => {
	calculator.compute();
	calculator.renderDisplay();
});

allClearBtn.addEventListener("click", () => {
	calculator.clear();
	calculator.renderDisplay();
});

deleteBtn.addEventListener("click", () => {
	calculator.delete();
	calculator.renderDisplay();
});
