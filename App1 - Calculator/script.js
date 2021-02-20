const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '.'];
const OPERATIONS = ['+', '-', '*', '/'];
const BUTTONS = document.querySelectorAll('button');


class Calculator {
   constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;

      this.currentOperandTextElement = currentOperandTextElement;

      this.clear();
   }

   clear() {
      this.previousOperand = '';
      this.currentOperand = '';
      this.operation = undefined;
   }

   delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
   }

   appendNumber(number) {
      if (number === '.' && this.currentOperand.includes(number)) {
         return;
      }
      this.currentOperand = this.currentOperand + number;
   }

   chooseOperation(operation) {
      if (this.currentOperand === '' && this.previousOperand === '')
         return;


      if (this.previousOperand !== '' && this.currentOperand !== '') {
         this.compute();
      }

      this.operation = operation;

      if (this.currentOperand === '' && this.previousOperand !== '') {
         this.previousOperand = parseFloat(this.previousOperand);
         this.updateDisplay();
         return;
      }

      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
   }

   compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(current)) return;
      switch (this.operation) {
         case '+': computation = prev + current;
            break;
         case '-': computation = prev - current;
            break;
         case '*': computation = prev * current;
            break;
         case '÷': computation = prev / current;
            break;
         default: return;
      }
      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = '';
   }


   getFormattedNumber(number) {
      const stringNumber = number.toString();
      const integerPart = stringNumber.split('.')[0];
      const decimalPart = stringNumber.split('.')[1];
      let formattedIntegerPart;
      if (integerPart === '')
         formattedIntegerPart = '';

      else
         formattedIntegerPart = parseFloat(integerPart).toLocaleString();
      if (decimalPart == undefined)
         return formattedIntegerPart;
      else
         return `${formattedIntegerPart}.${decimalPart}`;
   }

   updateDisplay() {
      this.currentOperandTextElement.innerText = this.getFormattedNumber(this.currentOperand);

      if (this.operation != undefined) {
         this.previousOperandTextElement.innerText = `${this.getFormattedNumber(this.previousOperand)} ${this.operation}`;
      }
      else
         this.previousOperandTextElement.innerText = '';
   }

}


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);



numberButtons.forEach(button => {
   button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
   });
});


operationButtons.forEach(button => {
   button.addEventListener('click', () => {
      calculator.chooseOperation(button.dataset.value);
      calculator.updateDisplay();
   });
});


equalsButton.addEventListener('click', () => {
   calculator.compute();
   calculator.updateDisplay();
});


allClearButton.addEventListener('click', () => {
   calculator.clear();
   calculator.updateDisplay();
});


deleteButton.addEventListener('click', () => {
   calculator.delete();
   calculator.updateDisplay();
});

/* ################################################ */

//TODO for keyboard inputs 

window.addEventListener('keydown', e => {
   const key = e.key;
   if (NUMBERS.includes(key)) {
      const target = document.querySelector(`[data-number='${key}']`);
      target.classList.add('active');
      target.click();
   }
   else if (OPERATIONS.includes(key)) {
      const target = document.querySelector(`[data-operation='${key}']`);
      target.classList.add('active');
      target.click();
   }
   else if (key === 'Enter') {
      const target = document.querySelector('[data-equals]');
      target.classList.add('active');
      target.click();
   }
   else if (key === 'Backspace') {
      document.querySelector('[data-delete]').classList.add('active');
      deleteButton.click();
   }
   else if (key === 'Escape') {
      document.querySelector('[data-all-clear]').classList.add('active');
      allClearButton.click();
   }
});


window.addEventListener('keyup', () => {
   BUTTONS.forEach(btn => btn.classList.remove('active'));
});