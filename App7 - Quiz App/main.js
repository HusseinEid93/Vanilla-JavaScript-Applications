const quizContainer = document.querySelector('.quiz-container');
const question = document.getElementById('question');
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');
const submitBtn = document.getElementById('submit');
const choices = document.querySelectorAll('.choice');


let score = 0;
let currentQuestionPosition = 0;
let currentQuestion;


function deselectChoices() {
   choices.forEach(choice => choice.checked = false);
}

function loadQuestion() {
   deselectChoices();
   submitBtn.classList.remove('active');

   currentQuestion = questions[currentQuestionPosition];

   question.innerText = currentQuestion.question;
   answer1.innerText = currentQuestion.a;
   answer2.innerText = currentQuestion.b;
   answer3.innerText = currentQuestion.c;
   answer4.innerText = currentQuestion.d;
}


// Initial call to load the first question
loadQuestion();

// Get the radio input that has been selected
function getSelected() {
   let answer = undefined;
   choices.forEach(choice => {
      if (choice.checked)
         answer = choice.id;
   })

   return answer;
}



choices.forEach(choice => choice.addEventListener('click', () => submitBtn.classList.add('active')));

document.querySelectorAll('label').forEach(label => label.addEventListener('click', () => submitBtn.classList.add('active')));


submitBtn.addEventListener('click', () => {
   const answer = getSelected();

   // If there exists an answer (if radio input is selected)
   if (answer) {

      if (answer === currentQuestion.correct)
         score++;


      currentQuestionPosition++;

      if (currentQuestionPosition < questions.length)
         loadQuestion();

      else {
         quizContainer.innerHTML = `
            <div class='final'> 
               <i class="fas fa-trophy fa-6x"></i>
               <h1>You Finished</h1>
               <p> Your score is <span>${score}</span> out of 5.</p>

               <button onclick='location.reload()'>reload the quiz</button>
            </div>
         `;
      }
   }

});