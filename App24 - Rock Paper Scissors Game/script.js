const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const playerScore = score.querySelector('.playerScore');
const computerScore = score.querySelector('.computerScore');
const result = document.getElementById('result');
const restartBtn = document.getElementById('restart');
const modal = document.querySelector('.modal');
const scoreBoard = {
   player: 0,
   computer: 0
};


function getComputerChoice() {
   const random = Math.random();
   if (random < 0.34)
      return 'rock'
   else if (random <= 0.67)
      return 'paper';
   else
      return 'scissors';
}


function getWinner(player, computer) {
   if (player === computer)
      return 'draw';
   else if (player === 'rock') {
      if (computer === 'paper')
         return 'computer';
      else
         return 'player';
   }
   else if (player === 'paper') {
      if (computer === 'scissors')
         return 'computer';
      else
         return 'player';
   }
   else if (player === 'scissors') {
      if (computer === 'rock')
         return 'computer';
      else
         return 'player';
   }
}


function showWinner(winner, computerChoice) {
   switch (winner) {
      case 'player': {
         scoreBoard.player++;
         result.innerHTML
            = `<h1 class="text-win">You Win</h1>
               <i class="fas fa-hand-${computerChoice} fa-10x"></i>
               <p>Computer Chose
                  <strong>${computerChoice}</strong>
               </p>`;
      }
         break;
      case 'computer': {
         scoreBoard.computer++;
         result.innerHTML
            = `<h1 class="text-lose">You Lose</h1>
               <i class="fas fa-hand-${computerChoice} fa-10x"></i>
               <p>Computer Chose
                  <strong>${computerChoice}</strong>
               </p>`;
      }
         break;
      default: {
         result.innerHTML
            = `<h1 class="text-draw">It is a Draw</h1>
               <i class="fas fa-hand-${computerChoice} fa-10x"></i>
               <p>Computer Chose
                  <strong>${computerChoice}</strong>
               </p>`;
      }
   }
   // Show the scores in the score board 
   playerScore.textContent = scoreBoard.player;
   computerScore.textContent = scoreBoard.computer;

   modal.classList.add('showModal');
}

// Main function 
function play(event) {
   restartBtn.style.display = 'block';
   const playerChoice = event.target.id;
   const computerChoice = getComputerChoice();
   const winner = getWinner(playerChoice, computerChoice);
   showWinner(winner, computerChoice);
}

modal.addEventListener('animationend', () => {
   modal.classList.remove('showModal');
});


restartBtn.addEventListener('click', e => {
   Object.keys(scoreBoard).forEach(key => scoreBoard[key] = 0);
   playerScore.textContent = '0';
   computerScore.textContent = '0';
   setTimeout(() => {
      e.target.style.display = 'none';
   }, 300);
});


choices.forEach(choice => choice.addEventListener('click', play));