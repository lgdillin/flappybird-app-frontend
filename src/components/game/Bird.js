


function Bird(model) {
  this.model = model;
  this.flapped = false;
  this.gravity = -6.5;
  this.x_pos = 10;
  this.y_pos = 250;
  this.energy = 100;

  try {
    if(bird_image_up === null) {
      bird_image_up = new Image();
      bird_image_up.src = "bird1.png";
    }

    if(bird_image_down === null) {
      bird_image_down = new Image();
      bird_image_down.src = "bird2.png";
    }
  } catch(e) {
    e.printStackTrace(System.err);
    System.exit(1);
  }
}

Bird.prototype.update = function () {

  // Allow the bird to recharge energy so long as it has more than 0,
  // and cap the energy at 100
  if(this.energy > 0) {
    this.energy += 1;

    this.gravity = this.gravity + 0.4;
    this.y_pos = this.y_pos + this.gravity;
    --this.flapCounter;

    if(loseEnergy() && this.allowDamageWhenZero <= 0) {
      this.energy = this.energy - 65;
      this.allowDamageWhenZero = 25;
    }
    --this.allowDamageWhenZero;

    // Keep the energy levels from going out of bounds
    if(this.energy > 100)
      this.energy = 100;
    } else if (this.energy < 0)
      this.energy = 0;

    // Simulate a game "ceiling"
    if(this.y_pos < 0) {
      this.y_pos = 0;
      this.gravity = 0;
    }

    return false;
};

Bird.prototype.flap = function () {
  if(this.energy > 0) {
    this.gravity = this.gravity - 4.5;
    this.y_pos = this.y_pos - this.gravity;
    this.flapCounter = 3;
  } else
    this.energy = 0;
};

Bird.prototype.loseEnergy = function () {
  // While each thing in the list doesn't return a collision
};
