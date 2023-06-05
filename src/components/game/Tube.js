

function Tube() {
  this.random = 0;
  this.gravity = -4.5;
  this.x_pos = 555;
  this.y_pos = 0;
  this.isKicked = false;
  this.tubeUpwards = false;

  try {
    if(tube_up_image === null) {
      tube_up_image = new Image();
      tube_up_image.src = "tube_up.png";
    }

    if(tube_down_image === null) {
      tube_down_image = new Image();
      tube_down_image.src = "tube_down.png";
    }

  } catch(e) {
    e.printStackTrace(System.err);
  }

  this.tubeUpwards = true;

  if(this.tubeUpwards) {
    this.y_pos = 0;
  } else {
    this.y_pos = 1;
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
