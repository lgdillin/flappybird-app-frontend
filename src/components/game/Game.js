


function Game() {
  this.model = new Model();
  this.view = new View(this.model);
  this.controller = new Controller(this.model, this.view);
}

Game.prototype.onTimer = function () {
  this.model.update();
  this.view.update();
};

// So the story goes...
let game = new Game();
let timer = setInterval(function() {
  game.onTimer();
}, 40);
