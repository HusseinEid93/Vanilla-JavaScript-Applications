
const arrows =
    document.querySelectorAll('.fa-arrow-down');

const caution = document.querySelector('.caution');

arrows.forEach((arrow, index) => {
    arrow.addEventListener('click', () => {
        const input = arrow.previousElementSibling;
        const parent = arrow.parentElement;
        const nextFormChild = parent.nextElementSibling;


        if (input.type === 'text' && isUsernameValid(input)) {
            succeeded();
            caution.style.setProperty('opacity', 0);
            moveForward(parent, nextFormChild);
        }
        else if (input.type === 'email' && isEmailValid(input)) {
            succeeded();
            caution.style.setProperty('opacity', 0);
            moveForward(parent, nextFormChild);
        }
        else if (input.type === 'password' && isPasswordValid(input)) {
            succeeded();
            caution.style.setProperty('opacity', 0);
            moveForward(parent, nextFormChild);
        } else {
            failed(index);
            parent.classList.add('shake');

            /* Switch handles the caution text. */
            switch (index) {
                case 0: {
                    caution.textContent = 'The username must have at least 6 characters.';
                    caution.style.setProperty('opacity', 1);
                }
                    break;

                case 1: {
                    caution.textContent = 'The email entered is not valid.';
                    caution.style.setProperty('opacity', 1);
                }
                    break;

                case 2: {
                    caution.textContent = 'The password must have at least 6 characters with at least 1 digit.';
                    caution.style.setProperty('opacity', 1);
                }
                    break;
            }
        }


        /* To repeat the rotation of the input field over and over if the user enters consecutive wrong inputs.  */
        parent.addEventListener('animationend', () => {
            parent.classList.remove('shake');
        });
    });
});



function isUsernameValid(usernameInput) {
    if (usernameInput.value.length < 6) {
        return false;
    } else {
        return true;
    }
}


function isEmailValid(emailInput) {
    const validationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (validationRegex.test(emailInput.value)) {
        return true;
    } else {
        return false;
    }
}


/* We force the user to write a password with at least six characters including at least one number */
function isPasswordValid(passwordInput) {
    const validation = /[0-9]/g;
    if (validation.test(passwordInput.value) && passwordInput.value.length >= 6) {
        return true;
    } else {
        return false;
    }
}

function failed(parentIndex) {
    document.body.style.backgroundColor = 'rgb(189, 87, 87)';

    document.querySelectorAll(`form > div:nth-of-type(${parentIndex + 1}) i`).forEach(icon => icon.style.color = 'rgb(189,87,87)');
}



function succeeded() {
    document.body.style.backgroundColor = 'rgb(87, 189, 130)';
}


function moveForward(currentParent, nextParent) {
    currentParent.classList.remove('active');
    currentParent.classList.add('inactive');
    nextParent.classList.remove('inactive');
    nextParent.classList.add('active');
}
