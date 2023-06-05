

// Model Constructor
function Model() {
  this.addTubeWhenZero = 45;
  this.maximumTubes = 0;
  this.bird = new Bird(this);
  this.hand = new Hand(this.bird);
  this.cloud = new Cloud(random);
  this.tube = new Tube(random);
  this.sprites = []; // We might need a linnked list instead

  this.sprites.push(this.cloud);
  this.sprites.push(this.bird);
  this.sprites.push(this.hand);
}

// Update the model
Model.prototype.update = function () {

  // Iterate the list of sprites
  for (var s in this.sprites) {
    if(s.update()) {
      
    }
    //if (sprites.hasOwnProperty(s)) { }
  }

  // If enough time has passed, and we don't have too many tubes,
  // add one and reset the timer
  if(this.addTubeWhenZero <= 0 && this.maximumTubes < 4) {
    t = new Tube(random);
    this.sprites.add(this.t);
    addTubeWhenZero = 45;
  }
  --addTubeWhenZero;

  if(this.bird.y_pos > 501) {
    System.exit(0);
    // Game Over!
  }
};

// flap yo wings
Model.prototype.onClick = function () {
  this.bird.flap();
};

// send in the Don
Model.prototype.sendChuck = function () {
  this.chuck = new Chuck(this, random);
  // add a chuck to the sprite list
  this.bird.energy -= 30;
};
