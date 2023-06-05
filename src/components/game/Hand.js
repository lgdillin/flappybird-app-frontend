


function Hand(bird) {
  this.bird = bird;
  this.gotcha = false;
  this.x_pos = 10;
  this.y_pos = 550;

  try {
    if(open_hand === null) {
      open_hand = new Image();
      open_hand.src = "hand1.png";
    }

    if(closed_hand === null) {
      closed_hand = new Image();
      closed_hand.src = "hand2.png";
    }

  } catch(e) {
    e.printStackTrace(System.err);
  }
}

Hand.prototype.update = function () { grab(); };

Hand.prototype.grab = function () {
  this.x_pos = this.bird.x_pos + 5;
  if(this.bird.energy <= 0) {
    if(this.y_pos > this.bird.y_pos - 15 && y_pos < bird.y_pos + 15) {
      this.gotcha = true;
      this.y_pos = this.y_pos + 3;
      this.bird.y_pos = this.y_pos;
    } else {
      this.y_pos = this.y_pos - 5;
    }
  }
};
