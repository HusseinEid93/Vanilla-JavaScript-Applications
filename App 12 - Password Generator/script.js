const passwordElement = document.getElementById('password');
const copyElement = document.getElementById('copy');
const passwordLengthElement = document.getElementById('password-length');
const upElement = document.getElementById('up');
const downElement = document.getElementById('down');
const upperElement = document.getElementById('upper');
const lowerElement = document.getElementById('lower');
const numberElement = document.getElementById('number');
const symbolElement = document.getElementById('symbol');
const generateBtnElement = document.querySelector('button.generate');


// Define all constants 
const UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUZWXYZ';
const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuzwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+=';



upElement.addEventListener('click', () => {
   const currentNumber = passwordLengthElement.value;
   if (currentNumber >= 40)
      return;

   else
      passwordLengthElement.value = +currentNumber + 1;
});


downElement.addEventListener('click', () => {
   const currentNumber = passwordLengthElement.value;
   if (currentNumber <= 4)
      return;

   else
      passwordLengthElement.value = +currentNumber - 1;
});




function getUpperCase() {
   return UPPERCASE_LETTERS[Math.floor(Math.random() * UPPERCASE_LETTERS.length)];
}

function getLowerCase() {
   return LOWERCASE_LETTERS[Math.floor(Math.random() * LOWERCASE_LETTERS.length)];
}

function getNumber() {
   return NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
}

function getSymbol() {
   return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}


// The main function 
function getRandomCharacter() {
   const randomCharacters = [];
   if (upperElement.checked)
      randomCharacters.push(getUpperCase());

   if (lowerElement.checked)
      randomCharacters.push(getLowerCase());

   if (numberElement.checked)
      randomCharacters.push(getNumber());

   if (symbolElement.checked)
      randomCharacters.push(getSymbol());

   // Return a random array element or an empty string if no checkbox is checked. 
   return randomCharacters.length > 0 ? randomCharacters[Math.floor(Math.random() * randomCharacters.length)] : "";
}



function shuffleString(str) {
   let array = str.split("");
   for (let i = array.length - 1; i > 0; i--) {
      // Generate random index lower then the current one 
      const j = Math.floor(Math.random() * i);
      const jthElement = array[j];
      array[j] = array[i];
      array[i] = jthElement;
   }

   return array.join('');
}


function generatePassword() {
   const len = passwordLengthElement.value;
   let password = '';

   // Make sure the generated password contains at least one uppercase letter, lowercase letter, number, symbol if the corresponding checkbox is checked. 

   if (upperElement.checked)
      password += getUpperCase();
   if (lowerElement.checked)
      password += getLowerCase();
   if (numberElement.checked)
      password += getNumber();
   if (symbolElement.checked)
      password += getSymbol();


   // Add the remaining characters to the generated password (if we need more) .
   for (let i = password.length + 1; i <= len; i++) {
      password += getRandomCharacter();
   }

   passwordElement.innerText = shuffleString(password);
}


generateBtnElement.addEventListener('click', generatePassword);




function copyPassword() {
   const password = passwordElement.innerText;
   const input = document.createElement('input');
   input.value = password;
   document.body.appendChild(input);

   input.select();
   document.execCommand('copy');
   input.remove();
}

copyElement.addEventListener('click', copyPassword);