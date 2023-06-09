

//
// Load all images first
//
let cloud_image, open_hand_image, closed_hand_image,
    tube_up_image, tube_down_image,
    bird_up_image, bird_down_image, chuck_image;

// Get Image Data
try {
  cloud_image = new Image();
  cloud_image.src = "cloud.png";

  bird_up_image = new Image();
  bird_up_image.src = "bird1.png";

  bird_down_image = new Image();
  bird_down_image.src = "bird2.png";

  open_hand_image = new Image();
  open_hand_image.src = "hand1.png";

  closed_hand_image = new Image();
  closed_hand_image.src = "hand2.png";

  tube_up_image = new Image();
  tube_up_image.src = "tube_up.png";

  tube_down_image = new Image();
  tube_down_image.src = "tube_down.png";

  chuck_image = new Image();
  chuck_image.src = "chuck_norris.png";

} catch (e) {
  console.log(e);
}

//
// Collision Detection
//
function collisionDetected(a, b) {

  if(a.x_pos + a.imageW < b.x_pos) // right -> left collision
    return false;
  if(a.x_pos > b.x_pos + b.imageW) // left -> right collision
    return false;
  if(a.y_pos + a.imageH < b.y_pos) // bottom -> top collision
    return false;
  if(a.y_pos > b.y_pos + b.imageH) // top -> bottom collision
    return false;

  console.log("HIT!");
  return true;
}



// ******************************
// ********* Random *************
// ******************************

// Returns a value between 0 and "max" (inclusive)
function intRandom(max) {
  return Math.random() * max;
}

function boolRandom() {
  if(Math.random() > 0.5)
    return true;
  else
    return false;
}



// ******************************
// ******* Cloud ****************
// ******************************
function Cloud() {
  this.x_pos = 575;
  this.y_pos = 0;
}

Cloud.prototype.update = function () {
  this.x_pos = this.x_pos - 2;

  if(this.x_pos < -501) {
    this.x_pos = 501;
    this.y_pos = intRandom(250) + 50;
  }
};

Cloud.prototype.returnImage = function () { return cloud_image; };



// ******************************
// ******* Hand *****************
// ******************************
function Hand(bird) {
  this.bird = bird;
  this.gotcha = false;
  this.x_pos = 10;
  this.y_pos = 550;
}

Hand.prototype.update = function () { this.grab(); };

Hand.prototype.grab = function () {
  this.x_pos = this.bird.x_pos + 5;
  if(this.bird.energy <= 0) {
    if(this.y_pos > this.bird.y_pos - 15 && this.y_pos < this.bird.y_pos + 15) {
      this.gotcha = true;
      this.y_pos = this.y_pos + 3;
      this.bird.y_pos = this.y_pos;
    } else {
      this.y_pos = this.y_pos - 5;
    }
  }
};

Hand.prototype.returnImage = function () {
  if(this.gotcha)
    return closed_hand_image;
  else
    return open_hand_image;
};



// ******************************
// *********** Tube *************
// ******************************
function Tube() {
  this.gravity = -4.5;
  this.x_pos = 555;
  this.y_pos = 0;
  this.isKicked = false;
  this.tubeUpwards = false;

  if(boolRandom()) {
    this.tubeUpwards = true;
    this.y_pos = intRandom(115) + 250;
  } else {
    this.y_pos = intRandom(115) - 250;
  }
}

Tube.prototype.update = function () {
  if(this.isKicked) {
    this.x_pos = this.x_pos + this.xVel;
    this.gravity = this.gravity + 0.4;
    this.y_pos = this.y_pos + this.gravity;
  } else
    this.x_pos = this.x_pos - 6;

  if(this.x_pos < -56)
    return true;
  return false;
};

Tube.prototype.beenHit = function (x) {
  this.xVel = x;

  // Fire off if the tube hasn't been hit until now
  if(!this.isKicked) {
    this.isKicked = true;
    return false;
  }
  return true;
};

Tube.prototype.returnImage = function () {
  this.imageW = tube_up_image.naturalWidth;
  this.imageH = tube_up_image.naturalHeight;
  if(this.tubeUpwards)
    return tube_up_image;
  else
    return tube_down_image;
};

// ******************************
// ********** Bird **************
// ******************************
function Bird(model) {
  this.model = model;
  this.flapped = false;
  this.allowDamageWhenZero = 0;
  this.gravity = -6.5;
  this.x_pos = 10;
  this.y_pos = 250;
  this.energy = 100;
}

Bird.prototype.update = function () {

  // Allow the bird to recharge energy so long as it has more than 0,
  // and cap the energy at 100
  if(this.energy > 0) {
    this.energy += 1;

    this.gravity = this.gravity + 0.4;
    this.y_pos = this.y_pos + this.gravity;
    --this.flapCounter;

    if(this.loseEnergy() && this.allowDamageWhenZero <= 0) {
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
    this.up = true;
  } else
    this.energy = 0;
};

Bird.prototype.loseEnergy = function () {
  for (let i = 0; i < this.model.sprites.length; ++i) {
    if(this.model.sprites[i] instanceof Tube) {
      if(collisionDetected(this, this.model.sprites[i])) {
        return true;
      }
    }
  }
  return false;

};

Bird.prototype.returnImage = function () {
  this.imageW = bird_up_image.naturalWidth;
  this.imageH = bird_up_image.naturalHeight;
  if(this.flapCounter > 0)
    return bird_up_image;
  else
    return bird_down_image;
};


// ******************************
// ******* Chuck ****************
// ******************************
function Chuck(model) {
  this.model = model;
  this.x_pos = -100;
  this.y_pos = (intRandom(175) + 250);
  this.gravity = (intRandom(14) - 15.5);
  this.xVel = (intRandom(4) + 11.0);
}

Chuck.prototype.update = function () {

  // Simulate gravity
  this.gravity = this.gravity + 0.2;
  this.y_pos = this.y_pos + this.gravity;

  this.x_pos = this.x_pos + this.xVel;

  if(this.judoKick()) {
    this.gravity = -4.5;
    this.xVel = -this.xVel;
  }

  if(this.x_pos > 501 || this.y_pos > 501)
    return true;
  return false;
};

Chuck.prototype.judoKick = function () {
  for (let i = 0; i < this.model.sprites.length; ++i) {
    if(this.model.sprites[i] instanceof Tube) {
      if(collisionDetected(this, this.model.sprites[i])) {

        // If the tube has already been hit, return false
        // as we want nothing to collide with a "dead" tube
        if(this.model.sprites[i].beenHit(this.xVel))
          return false;
        return true;
      }
    }
  }
};

Chuck.prototype.returnImage = function () {
  this.imageW = chuck_image.naturalWidth;
  this.imageH = chuck_image.naturalHeight;
  return chuck_image;
};

// ******************************
// ******* Model ****************
// ******************************
function Model() {
  this.addTubeWhenZero = 45;
  this.maximumTubes = 0;
  this.bird = new Bird(this);
  this.hand = new Hand(this.bird);
  this.cloud = new Cloud();
  this.sprites = [];

  this.sprites.push(this.cloud);
  this.sprites.push(this.bird);
  this.sprites.push(this.hand);
}

// Update the model
Model.prototype.update = function () {

  // Iterate the list of sprites
  for (let i = 0; i < this.sprites.length; ++i) {
    if(this.sprites[i].update()) {
      this.sprites.splice(i, 1);
    }
  }

  // If enough time has passed, and we don't have too many tubes,
  // add one and reset the timer
  if(this.addTubeWhenZero <= 0 && this.maximumTubes < 4) {
    this.t = new Tube();
    this.sprites.push(this.t);
    this.addTubeWhenZero = 45;
  }
  --this.addTubeWhenZero;

  if(this.bird.y_pos > 501) {
    console.log("GAME OVER");
  }
};

// flap yo wings
Model.prototype.onClick = function () {
  this.bird.flap();
};

// send in the Chuck
Model.prototype.sendChuck = function () {
  this.chuck = new Chuck(this);
  this.sprites.push(this.chuck);
  this.bird.energy -= 30;
};


// ******************************
// *********** View *************
// ******************************
function View(model) {
  this.model = model;
  this.canvas = document.getElementById("myCanvas");
}

// Draw the game to the screen
View.prototype.update = function () {
  let ctx = this.canvas.getContext("2d");
  ctx.clearRect(0, 0, 500, 500);
  ctx.fillStyle="#80FFFF";
  ctx.fillRect(0, 0, 500, 500);

  // Draw Sprites
  for (let i = 0; i < this.model.sprites.length; ++i) {
    // JS won't always load the image if you place the method call inline
    //so sometimes we need to put it in a variable first.
    let img = this.model.sprites[i].returnImage();
    ctx.drawImage(img, this.model.sprites[i].x_pos, this.model.sprites[i].y_pos);
  }

  // Draw energy bar
  ctx.strokeRect(425, 200, 76, 201);

  ctx.fillStyle="#00FF00";
  ctx.fill();
  ctx.fillRect(425, 200, 75, 2 * this.model.bird.energy);
};


// ******************************
// ******* Controller ***********
// ******************************
function Controller(model, view) {
  this.model = model;
  this.view = view;
  let self = this;

  view.canvas.addEventListener("click", function(event) { self.onClick(event); });
  view.canvas.addEventListener("contextmenu", function(event) { self.onClick(event); });
}

Controller.prototype.onClick = function (event) {
  if(event.which === 1) // 1 == LMB
    this.model.onClick();
  else if(event.which === 3) //  3 == RMB
    this.model.sendChuck();
};



// ******************************
// ******* Game *****************
// ******************************
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
