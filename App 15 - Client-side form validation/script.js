const form = document.querySelector('form');
const inputs = document.querySelectorAll('form input:not([type="submit"])');
const password = document.getElementById('password');
const passwordAgain = document.getElementById('password-verification');
let switchPasswordType = true;
let switchVerificationType = true;



form.addEventListener('submit', e => {
   e.preventDefault();

   checkInputs();
});


function checkInputs() {

   inputs.forEach((input, index) => {
      const value = input.value.trim();

      const errorMessage =
         index === 0 ? 'Username cannot be blank'
            : index === 1 ? 'Email cannot be blank'
               : index === 2 ? 'Password cannot be blank'
                  : "Password verification cannot be blank";

      if (value === '') {
         setError(input, errorMessage);
      } else {
         if (index === 1 && !isEmail(value)) {
            setError(input, 'Email is not valid');
            return;
         }

         else if (index === 3 && input.value != password.value) {
            setError(input, 'Passwords don’t match');
            return;
         }

         setSuccess(input);
      }
   });

}


function setError(input, message) {
   const formControl = input.closest('.form-control');
   const errorMessage = formControl.querySelector('small');

   formControl.className = 'form-control error';
   errorMessage.innerText = message;
}


function setSuccess(input) {
   const formControl = input.closest('.form-control');
   formControl.className = 'form-control success';
}



function isEmail(email) {
   return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}


inputs.forEach(input => {
   input.addEventListener('input', () => {
      input.closest('.form-control').className = 'form-control';
   });
})


password.addEventListener('input', () => {
   password.closest('.form-control').className = 'form-control showPassword';
});



passwordAgain.addEventListener('input', () => {
   passwordAgain.closest('.form-control').className = 'form-control showPassword';
});



password.closest('.form-control').querySelector('i:last-of-type').addEventListener('click', () => {
   if (switchPasswordType)
      password.setAttribute('type', 'text');
   else
      password.setAttribute('type', 'password');

   switchPasswordType = !switchPasswordType;
});


passwordAgain.closest('.form-control').querySelector('i:last-of-type').addEventListener('click', () => {
   if (switchVerificationType)
      passwordAgain.setAttribute('type', 'text');
   else
      passwordAgain.setAttribute('type', 'password');

   switchVerificationType = !switchVerificationType;
});