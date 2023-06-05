


function Chuck(model, random) {
  this.model = model;
  this.random = random;
  this.x_pos = -100;
  this.y_pos = (this.random(175) + 250);
  this.gravity = (this.random(14) - 15.5);
  this.xVel = (this.random(4) + 11.0);

  try {
    if(chuck_image === null)
      chuck_image = new Image();
      chuck_image.src = "chuck_norris.png";
  } catch(e) {
    e.printStackTrace(System.err);
  }
}

Chuck.prototype.update = function () {

  // Simulate gravity
  this.gravity = this.gravity + 0.2;
  this.y_pos = this.y_pos + this.gravity;

  this.x_pos = this.x_pos + this.xVel;

  if(judoKick()) {
    this.gravity = -4.5;
    this.xVel = -this.xVel;
  }

  if(x_pos > 585 || y_pos > 510)
    return true;
  return false;
};

Chuck.prototype.judoKick = function () {
  for (var s in sprites) {
    if(s.isTube()) {
      if(collisionBetween(this, s)) {

        // If the tube has already been hit, return false
        // as we want nothing to collide with a "dead" tube
        if(s.beenHit(xVel))
          return false;
        return true;
      }
    }
    // if (object.hasOwnProperty(s)) { }
  }
};
