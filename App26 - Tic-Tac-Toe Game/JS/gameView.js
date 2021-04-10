export default class GameView {
   constructor(root) {
      this.root = root;
      this.root.innerHTML = `
         <div class="header">
            <div class="header__turn"></div>
            <div class="header__status"></div>
            <button type="button" class="header__reset" title="Start a new game">
               <i class="material-icons">refresh</i>
            </button>
         </div>

         <div class="board">
            ${this.generateTiles()}
         </div>
      `;


      this.root.querySelectorAll('.board__tile').forEach(tile => {
         tile.addEventListener('click', () =>
            this.onTileClick(tile.dataset.index)
         );
      });

      this.root.querySelector('.header__reset').addEventListener('click', () =>
         this.onRestartClick()
      );

   }

   generateTiles() {
      let tiles = [];
      for (let i = 0; i <= 8; i++) {
         tiles.push(`<div class="board__tile" data-index=${i}></div>`);
      }
      return tiles.join("");
   }


   update(game) {
      this.updateTurn(game);
      this.updateStatus(game);
      this.updateBoard(game);
   }
   updateTurn(game) {
      this.root.querySelector('.header__turn').textContent = `${game.turn}'s turn`;
   }
   updateStatus(game) {
      let status = "In Progress";

      if (game.findWinningCombinations())
         status = `${game.turn} is the winner`;
      else if (!game.isInProgress())
         status = "It's a tie";

      this.root.querySelector('.header__status').textContent = status;
   }

   updateBoard(game) {
      const winningCombinations = game.findWinningCombinations();
      const tiles = this.root.querySelectorAll('.board__tile');
      tiles.forEach((tile, index) => {
         tile.classList.remove('board__tile--winner');
         tile.textContent = game.board[index];
         if (winningCombinations && winningCombinations.includes(index)) {
            tile.classList.add('board__tile--winner');
         }
      });
   }

}