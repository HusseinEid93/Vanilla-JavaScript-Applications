import Game from "./game.js";
import GameView from './gameView.js';

let game = new Game();
let gameView = new GameView(document.getElementById("app"));
gameView.update(game);


// Add functions to the gameView object 
gameView.onTileClick = (index) => {
   game.makeMove(index);
   gameView.update(game);
}

gameView.onRestartClick = () => {
   // Start a new game 
   game = new Game();
   gameView.update(game);
}

