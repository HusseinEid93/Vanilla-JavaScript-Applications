/* The only purpose of the wrapper is to prevent the user from missing up with the global variables defined below. */
(() => {
   const baseURL = 'https://opentdb.com/api.php?amount=1&type=multiple',
      containerElement = document.querySelector('.container'),
      form = document.querySelector('form'),
      questionElement = document.querySelector('.question'),
      optionsContainer = document.querySelector('.all-options'),
      submitBtn = document.querySelector('button[type="submit"]'),
      finishContinueBtns = document.querySelector('.finish-continue-btns'),
      finishBtn = finishContinueBtns.firstElementChild,
      continueBtn = finishContinueBtns.lastElementChild,
      scoreElement = document.querySelector('.scoreBoard .score-num'),
      answeredQuestionsElement = document.querySelector('.scoreBoard .answered-num'),
      resultContainer = containerElement.querySelector('.result'),
      placeholder = containerElement.querySelector('.placeholder');

   let question,
      answer,
      options,
      score = 0,
      answeredQuestions = 0,
      checkBoxes;

   document.addEventListener('DOMContentLoaded', quizApp);


   form.addEventListener('submit', e => {
      e.preventDefault();
      checkBoxes = Array.from(containerElement.querySelectorAll('input'));
      const selected = checkBoxes.filter(input => input.checked)[0];
      if (selected) {
         checkQuiz(selected);
         submitBtn.style.display = 'none';
         finishContinueBtns.style.display = 'grid';
      } else {
         return;
      }
   });


   finishBtn.addEventListener('click', finishQuiz);
   continueBtn.addEventListener('click', getNextQuiz);


   async function quizApp() {
      // Show the placeholder image 
      placeholder.classList.remove('hide');
      // Fetch the question and choices 
      const data = await fetchQuiz();
      question = data.question;
      answer = data.correct_answer;
      options = [...data.incorrect_answers];
      // Merge the correct answer with the wrong ones randomly
      options.splice(Math.floor(Math.random() * options.length + 1), 0, answer);

      generateMarkup(question, options);
   }

   async function fetchQuiz() {
      const response = await fetch(baseURL);
      const data = await response.json();
      return data.results[0];
   }


   function generateMarkup(question, options) {
      // Remove the placeholder image once the data is brought
      placeholder.classList.add('hide');
      questionElement.textContent = htmlDecode(question);
      optionsContainer.innerHTML = '';
      options.map((option, index) => {
         const item = document.createElement('div');
         item.className = 'option';
         item.innerHTML =
            `<input
            type="radio"
            id="option${index}"
            value="${option}"
            name="quiz"
            />
            <label for="option${index}">${option}</label>
            `;
         optionsContainer.appendChild(item);
      });
   }


   function checkQuiz(selectedAnswer) {
      answeredQuestions++;
      if (selectedAnswer.value === answer) {
         score++;
      }

      // Update the score board 
      scoreElement.textContent = score;
      answeredQuestionsElement.textContent = answeredQuestions;

      // Add the class .correct to the correct option
      checkBoxes.forEach(checkbox => {
         if (checkbox.value === answer)
            checkbox.parentElement.classList.add('correct');
      })
   }


   function finishQuiz() {
      resultContainer.innerHTML =
         `
         <i class="far fa-laugh-beam fa-4x"></i>
         <h1>
            ${score} / ${answeredQuestions}
         </h1>
         <button type="button">Play Again</button>
         `;
      resultContainer.classList.add('show');

      resultContainer.querySelector('button').addEventListener('click', playAgain);
   }

   async function getNextQuiz() {
      finishContinueBtns.style.display = 'none';
      // Re-load another question 
      await quizApp();
      submitBtn.style.display = 'block';
   }


   async function playAgain() {
      resultContainer.classList.remove('show');
      // Start playing again
      [score, answeredQuestions] = [0, 0];
      // Update the score board 
      scoreElement.textContent = '0';
      answeredQuestionsElement.textContent = '0';

      finishContinueBtns.style.display = 'none';
      await quizApp();
      submitBtn.style.display = 'block';
   }


   function htmlDecode(input) {
      const doc = new DOMParser().parseFromString(input, "text/html");
      return doc.body.textContent;
   }

})();