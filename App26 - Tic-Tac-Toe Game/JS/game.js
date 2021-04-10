export default class Game {
   constructor() {
      this.turn = "X";
      this.board = new Array(9).fill(null);
   }

   nextTurn() {
      this.turn = this.turn === "X" ? "O" : "X";
   }

   makeMove(index) {
      // Make a move only if the game is in progress 
      if (!this.isInProgress()) return;

      // Make a move to the target tile only if it is available
      if (this.board[index]) return;

      this.board[index] = this.turn;

      // If there is no winner, go to the next move 
      if (!this.findWinningCombinations())
         this.nextTurn();
   }

   findWinningCombinations() {
      const winningCombinations = [
         [0, 1, 2],
         [3, 4, 5],
         [6, 7, 8],
         [0, 3, 6],
         [1, 4, 7],
         [2, 5, 8],
         [0, 4, 8],
         [2, 4, 6]
      ];

      for (const combination of winningCombinations) {
         const [a, b, c] = combination;
         if (this.board[a] && (this.board[a] === this.board[b] && this.board[a] === this.board[c])) {
            return combination;
         }
      }
      // If no winning combination is matched 
      return null;
   }

   isInProgress() {
      return !this.findWinningCombinations() && this.board.includes(null);
   }

}