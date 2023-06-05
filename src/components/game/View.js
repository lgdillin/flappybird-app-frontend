

// View Constructor
function View(controller, model) {
  this.controller = controller;
  this.model = model;
  this.canvas = document.getElementById("myCanvas");
}

// Update the screen
View.prototype.update = function () {
  // Draw window and background (?)
  let ctx = this.canvas.getContext("2d");
  ctx.clearRect(0, 0, 500, 500);

  // Draw Sprites
  ctx.drawImage(this.turtle, this.model.x_pos, this.model.y_pos);
  /*
  while(not at end of list)
    get the next sprite
    draw that sprite
  */

  // Draw energy bar
  ctx.setColor(new Color(0, 255, 0));
  ctx.fillRect(425, 200, 75, 2 * model.bird.energy);
  ctx.setColor(new Color(0, 0, 0));
  ctx.drawRect(424, 199, 76, 201);
};
